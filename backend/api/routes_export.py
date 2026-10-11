"""
Export endpoints (.ics, JSON, summary).
"""

from fastapi import APIRouter, Response
from typing import Dict, Any
from backend.core.models import MANDATORY_DISCLAIMER
from backend.core.ics_export import generate_ics_calendar
from .fixtures_loader import load_fixture

router = APIRouter(prefix="/api/cases/{case_id}/export", tags=["export"])

@router.get("/ics")
def export_ics(case_id: str):
    # Returns .ics calendar with verified dates only
    sample_ics = generate_ics_calendar("State v. Ramesh", [])
    return Response(
        content=sample_ics,
        media_type="text/calendar",
        headers={"Content-Disposition": f"attachment; filename=case_{case_id}.ics"}
    )

@router.get("/summary")
def export_family_summary(case_id: str) -> Dict[str, Any]:
    case_data = load_fixture("case_detail.json")
    flags_data = load_fixture("flags.json")
    timeline_data = load_fixture("timeline.json")

    return {
        "case_id": case_id,
        "label": case_data.get("label"),
        "case_number": case_data.get("case_number"),
        "disclaimer": MANDATORY_DISCLAIMER,
        "next_date": "2026-02-14",
        "next_date_quote": "Matter is adjourned to 14.02.2026 for framing of charges.",
        "timeline_count": len(timeline_data),
        "active_flags_count": sum(1 for f in flags_data if not f.get("dismissed")),
        "legal_aid_contact": {
            "helpline": "15100",
            "body": "District Legal Services Authority (DLSA)",
            "service": "Free legal aid for eligible litigants"
        }
    }
