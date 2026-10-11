"""
Trust report endpoints.
"""

from fastapi import APIRouter
from backend.core.models import TrustReport
from .fixtures_loader import load_fixture

router = APIRouter(prefix="/api/cases/{case_id}/trust-report", tags=["trust"])

@router.get("", response_model=TrustReport)
def get_case_trust_report(case_id: str):
    data = load_fixture("trust_report.json")
    data["case_id"] = case_id
    return TrustReport.model_validate(data)
