"""
Documents management, upload, and Mode A processing endpoints.
"""

import uuid
from typing import List, Optional, Dict
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, Query, status
from pydantic import BaseModel

from backend.core.models import Document
from backend.core.schemas import DocumentContent, VerifiedOrder
from backend.core.textcapture import extract_from_pdf, extract_from_image, extract_from_plain_text
from backend.core.extraction import extract_with_rules, extract_with_llm
from backend.core.pipeline import verify_and_construct_order
from backend.core.auditlog import audit_logger
from .deps import verify_api_key
from .fixtures_loader import load_fixture

router = APIRouter(prefix="/api/cases/{case_id}", tags=["documents"])

# Shared in-memory / persistent buffers for uploaded documents and processed orders
STORE_DOCUMENTS: Dict[str, DocumentContent] = {}
STORE_CASE_DOCUMENTS: Dict[str, List[Document]] = {}
STORE_CASE_ORDERS: Dict[str, List[VerifiedOrder]] = {}

MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024  # 25 MB limit
ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".tiff", ".bmp", ".txt"}


class DocumentUploadResponse(BaseModel):
    id: str
    doc_id: str
    case_id: str
    filename: str
    order_date: Optional[str] = None
    order_type: str = "hearing"
    court: Optional[str] = None
    case_number: Optional[str] = None
    ocr_confidence: float = 1.0
    file_hash: str
    pages_count: int = 1
    created_at: str
    reply_text: str


class ProcessResponse(BaseModel):
    order_id: str
    case_id: str
    doc_id: str
    court_name: Optional[str] = None
    case_number: Optional[str] = None
    order_date: Optional[str] = None
    order_type: Optional[str] = None
    next_hearing_date: Optional[str] = None
    verified_claims_count: int
    dropped_claims_count: int
    plain_explanation_en: Optional[str] = None
    plain_explanation_hi: Optional[str] = None
    plain_explanation_mr: Optional[str] = None
    reply_text: str
    disclaimer: str = "This organizes the record. It is not legal advice and does not predict outcomes."


def _validate_file_upload(filename: str, content: bytes) -> str:
    if len(content) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty."
        )
    if len(content) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds maximum allowed size of {MAX_FILE_SIZE_BYTES // (1024*1024)}MB."
        )
    dot_idx = filename.rfind(".")
    ext = filename[dot_idx:].lower() if dot_idx != -1 else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported file extension '{ext}'. Allowed extensions: {', '.join(sorted(ALLOWED_EXTENSIONS))}"
        )
    return ext


@router.get("/documents", response_model=List[Document])
def list_documents(case_id: str, _: str = Depends(verify_api_key)):
    # If case has uploaded documents in runtime buffer, return those merged with fixtures
    fixture_docs = [Document.model_validate(doc) for doc in load_fixture("documents.json")]
    custom_docs = STORE_CASE_DOCUMENTS.get(case_id, [])
    return custom_docs + fixture_docs


@router.post("/documents", response_model=DocumentUploadResponse)
@router.post("/documents/upload", response_model=DocumentUploadResponse)
async def upload_document(
    case_id: str,
    file: Optional[UploadFile] = File(None),
    pasted_text: Optional[str] = Form(None),
    _: str = Depends(verify_api_key)
):
    """
    POST /api/cases/{case_id}/documents
    Accepts multipart document file or photo upload.
    Validates file type and size, calculates SHA-256 fingerprint, performs text capture,
    and returns document metadata with backend-generated reply_text.
    """
    doc_id = str(uuid.uuid4())[:8]

    if file:
        file_bytes = await file.read()
        filename = file.filename or f"upload_{doc_id}"
        ext = _validate_file_upload(filename, file_bytes)

        if ext == ".pdf":
            doc_content = extract_from_pdf(file_bytes, filename, doc_id)
        elif ext == ".txt":
            doc_content = extract_from_plain_text(file_bytes.decode("utf-8", errors="replace"), filename, doc_id)
        else:
            doc_content = extract_from_image(file_bytes, filename, doc_id)
    elif pasted_text:
        if not pasted_text.strip():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Pasted text cannot be empty.")
        filename = f"pasted_{doc_id}.txt"
        doc_content = extract_from_plain_text(pasted_text, filename, doc_id)
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Either file or pasted_text must be provided.")

    STORE_DOCUMENTS[doc_id] = doc_content

    # Check readability of captured text
    total_chars = sum(len(p.raw_text.strip()) for p in doc_content.pages)
    if total_chars == 0 and not doc_content.is_digital_text:
        reply_msg = (
            f"Document received ('{doc_content.filename}', {doc_content.page_count} page(s)), "
            "but the image appears unreadable or blurred. Please upload a clearer photograph or scanned document."
        )
    else:
        reply_msg = (
            f"Successfully received document '{doc_content.filename}' ({doc_content.page_count} page(s)). "
            f"Cryptographic fingerprint (SHA-256): {doc_content.sha256[:16]}... "
            "Ready for processing."
        )

    # Record in case document store
    doc_meta = Document(
        id=doc_id,
        case_id=case_id,
        filename=doc_content.filename,
        order_date=None,
        order_type="hearing",
        court=None,
        case_number=None,
        ocr_confidence=0.95 if doc_content.is_digital_text else 0.85,
        file_hash=doc_content.sha256,
        pages_count=doc_content.page_count,
        created_at=doc_content.ingested_at.isoformat()
    )
    if case_id not in STORE_CASE_DOCUMENTS:
        STORE_CASE_DOCUMENTS[case_id] = []
    STORE_CASE_DOCUMENTS[case_id].append(doc_meta)

    # Audit log entry
    audit_logger.log_event("DOCUMENT_UPLOADED", {
        "case_id": case_id,
        "doc_id": doc_id,
        "filename": doc_content.filename,
        "sha256": doc_content.sha256,
        "pages": doc_content.page_count
    })

    return DocumentUploadResponse(
        id=doc_id,
        doc_id=doc_id,
        case_id=case_id,
        filename=doc_content.filename,
        order_date=doc_meta.order_date,
        order_type=doc_meta.order_type,
        court=doc_meta.court,
        case_number=doc_meta.case_number,
        ocr_confidence=doc_meta.ocr_confidence,
        file_hash=doc_content.sha256,
        pages_count=doc_content.page_count,
        created_at=doc_meta.created_at,
        reply_text=reply_msg
    )


@router.post("/process", response_model=ProcessResponse)
async def process_document(
    case_id: str,
    mode: str = Query("A", pattern="^[AB]$"),
    doc_id: Optional[str] = Query(None),
    _: str = Depends(verify_api_key)
):
    """
    POST /api/cases/{case_id}/process?mode=A
    Runs the Mode A (deterministic rules & verifier) pipeline.
    Preserves confidence handling, source citations, and volunteer-review requirements.
    Returns backend-generated reply_text for Telegram delivery.
    """
    target_doc: Optional[DocumentContent] = None

    if doc_id:
        target_doc = STORE_DOCUMENTS.get(doc_id)
        if not target_doc:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Document '{doc_id}' not found.")
    else:
        # Find latest uploaded document for this case
        case_docs = STORE_CASE_DOCUMENTS.get(case_id, [])
        if case_docs:
            latest_id = case_docs[-1].id
            target_doc = STORE_DOCUMENTS.get(latest_id)

    # If no document was uploaded in runtime, extract from sample fixture text
    if not target_doc:
        sample_text = (
            "IN THE COURT OF CHIEF JUDICIAL MAGISTRATE, PUNE\n"
            "Special Criminal Case No. 420/2024\n"
            "ORDER DATED: 15/03/2024\n"
            "The accused is released on bail upon furnishing personal bond of Rs. 25,000 with one surety.\n"
            "Matter stand over to 10/04/2024 for framing of charges."
        )
        target_doc = extract_from_plain_text(sample_text, f"docket_{case_id}.txt", "doc_default")
        STORE_DOCUMENTS["doc_default"] = target_doc

    # Mode A uses deterministic rule-based extraction
    if mode == "A":
        raw_extracted = extract_with_rules(target_doc)
    else:
        raw_extracted = extract_with_llm(target_doc)

    order_id = f"ORD_{target_doc.doc_id}"
    verified_order = verify_and_construct_order(target_doc, raw_extracted, order_id)

    if case_id not in STORE_CASE_ORDERS:
        STORE_CASE_ORDERS[case_id] = []
    STORE_CASE_ORDERS[case_id].append(verified_order)

    # Construct backend-generated reply_text
    stats = verified_order.verification_stats
    verified_count = stats.get("verified_count", 0)
    dropped_count = stats.get("dropped_count", 0)
    pages = target_doc.page_count

    parts = [
        f"Order processed: {pages} page(s) received.",
        f"Verified facts: {verified_count}.",
    ]
    if dropped_count > 0:
        parts.append(f"{dropped_count} unverified claim(s) flagged for volunteer review.")
    if verified_order.next_hearing_date:
        parts.append(f"Next scheduled date: {verified_order.next_hearing_date}.")
    if verified_order.plain_explanation_en:
        parts.append(f"Summary: {verified_order.plain_explanation_en}")

    reply_text = " ".join(parts)

    return ProcessResponse(
        order_id=order_id,
        case_id=case_id,
        doc_id=target_doc.doc_id,
        court_name=verified_order.court_name,
        case_number=verified_order.case_number,
        order_date=verified_order.order_date,
        order_type=verified_order.order_type,
        next_hearing_date=verified_order.next_hearing_date,
        verified_claims_count=verified_count,
        dropped_claims_count=dropped_count,
        plain_explanation_en=verified_order.plain_explanation_en,
        plain_explanation_hi=verified_order.plain_explanation_hi,
        plain_explanation_mr=verified_order.plain_explanation_mr,
        reply_text=reply_text
    )
