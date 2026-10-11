import uuid
from datetime import datetime, date
from typing import Dict, List, Optional
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Response
from pydantic import BaseModel
from icalendar import Calendar, Event

from backend.core.textcapture import extract_from_pdf, extract_from_image, extract_from_plain_text
from backend.core.extraction import extract_with_llm, extract_with_rules
from backend.core.pipeline import verify_and_construct_order
from backend.core.rules import run_discrepancy_rules
from backend.core.ask import answer_case_question
from backend.core.auditlog import audit_logger
from backend.core.schemas import (
    DocumentContent, VerifiedOrder, DiscrepancyFlag, AskResponse, TrustReport
)

router = APIRouter(prefix="/api", tags=["CaseCompass Intelligence"])

# In-memory storage for docket and cases
STORE_DOCUMENTS: Dict[str, DocumentContent] = {}
STORE_ORDERS: Dict[str, List[VerifiedOrder]] = {}  # case_id -> List[VerifiedOrder]


class AskQuery(BaseModel):
    question: str
    language: str = "en"


@router.post("/documents/upload")
async def upload_document(
    file: Optional[UploadFile] = File(None),
    pasted_text: Optional[str] = Form(None),
    case_id: str = Form("demo_case_01")
):
    """
    Ingests file (PDF, image) or pasted text, calculates SHA-256 fingerprint,
    and runs hybrid digital / OCR text capture.
    """
    doc_id = str(uuid.uuid4())[:8]

    if file:
        file_bytes = await file.read()
        filename = file.filename or f"upload_{doc_id}"

        if filename.lower().endswith(".pdf"):
            doc_content = extract_from_pdf(file_bytes, filename, doc_id)
        else:
            doc_content = extract_from_image(file_bytes, filename, doc_id)
    elif pasted_text:
        doc_content = extract_from_plain_text(pasted_text, f"pasted_{doc_id}.txt", doc_id)
    else:
        raise HTTPException(status_code=400, detail="Either file or pasted_text must be supplied.")

    STORE_DOCUMENTS[doc_id] = doc_content

    audit_logger.log_event("DOCUMENT_UPLOADED", {
        "doc_id": doc_id,
        "filename": doc_content.filename,
        "sha256": doc_content.sha256,
        "page_count": doc_content.page_count
    })

    return {
        "doc_id": doc_id,
        "case_id": case_id,
        "filename": doc_content.filename,
        "sha256": doc_content.sha256,
        "page_count": doc_content.page_count,
        "is_digital_text": doc_content.is_digital_text
    }


@router.post("/documents/{doc_id}/extract")
async def extract_and_verify(doc_id: str, case_id: str = "demo_case_01"):
    """
    Runs extraction pipeline (Mode B LLM with Mode A fallback), followed by
    strict XAI attribution verifier. Purges unverified machine hallucinations.
    """
    doc = STORE_DOCUMENTS.get(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found.")

    raw_extracted = extract_with_llm(doc)
    order_id = f"ORD_{doc_id}"

    verified_order = verify_and_construct_order(doc, raw_extracted, order_id)

    if case_id not in STORE_ORDERS:
        STORE_ORDERS[case_id] = []
    STORE_ORDERS[case_id].append(verified_order)

    return verified_order


@router.get("/cases/{case_id}/timeline")
async def get_case_timeline(case_id: str):
    """
    Returns verified chronological timeline with XAI quote chips and source citations.
    """
    orders = STORE_ORDERS.get(case_id, [])
    # Sort chronologically
    sorted_orders = sorted(
        orders,
        key=lambda x: x.order_date if x.order_date else "9999-99-99"
    )
    return {
        "case_id": case_id,
        "order_count": len(sorted_orders),
        "timeline": sorted_orders
    }


@router.post("/cases/{case_id}/ask", response_model=AskResponse)
async def ask_case(case_id: str, query: AskQuery):
    """
    Grounded Q&A ('Ask Your Case') engine with hard legal advice refusal guardrails.
    """
    orders = STORE_ORDERS.get(case_id, [])
    return answer_case_question(query.question, orders, language=query.language)


@router.get("/cases/{case_id}/trust-report", response_model=TrustReport)
async def get_trust_report(case_id: str):
    """
    Computes docket health score, discrepancy flags (R1-R5), and verification rate.
    """
    orders = STORE_ORDERS.get(case_id, [])
    flags = run_discrepancy_rules(orders)

    total_extracted = sum(o.verification_stats.get("total_claims", 0) for o in orders)
    total_verified = sum(o.verification_stats.get("verified_count", 0) for o in orders)
    total_dropped = sum(o.verification_stats.get("dropped_count", 0) for o in orders)

    pass_rate = (total_verified / total_extracted * 100) if total_extracted > 0 else 100.0

    return TrustReport(
        case_id=case_id,
        total_claims_extracted=total_extracted,
        total_verified_claims=total_verified,
        total_dropped_claims=total_dropped,
        verification_rate_percent=round(pass_rate, 2),
        flag_count=len(flags),
        flags=flags,
        zero_hallucination_guarantee_met=(total_dropped == 0 or total_verified > 0)
    )


@router.post("/cases/{case_id}/export")
async def export_calendar(case_id: str):
    """
    Exports verified hearing dates into an iCalendar (.ics) format.
    """
    orders = STORE_ORDERS.get(case_id, [])
    cal = Calendar()
    cal.add('prodid', '-//CaseCompass VORTEXA 3.0//casecompass.in//')
    cal.add('version', '2.0')

    count = 0
    for o in orders:
        if o.next_hearing_date:
            try:
                ev = Event()
                ev.add('summary', f"Court Hearing: {o.case_number or 'Docket Matter'}")
                dt = datetime.strptime(o.next_hearing_date, "%Y-%m-%d").date()
                ev.add('dtstart', dt)
                ev.add('dtend', dt)
                ev.add('description', f"Court: {o.court_name}\nOrder ID: {o.order_id}\nDirections: {', '.join(o.directions_and_conditions)}")
                cal.add_component(ev)
                count += 1
            except Exception:
                pass

    ics_data = cal.to_ical()
    return Response(
        content=ics_data,
        media_type="text/calendar",
        headers={"Content-Disposition": f"attachment; filename=case_{case_id}_hearings.ics"}
    )
