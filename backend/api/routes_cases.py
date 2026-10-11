"""
Case management endpoints.
"""

from fastapi import APIRouter, HTTPException
from typing import List
from backend.core.models import Case, CaseCreateRequest
from .fixtures_loader import load_fixture

router = APIRouter(prefix="/api/cases", tags=["cases"])

@router.get("", response_model=List[Case])
def list_cases():
    data = load_fixture("cases.json")
    return [Case.model_validate(c) for c in data]

@router.get("/{case_id}", response_model=Case)
def get_case(case_id: str):
    data = load_fixture("case_detail.json")
    if data["id"] != case_id:
        # Default fallback for demo fixture
        data["id"] = case_id
    return Case.model_validate(data)

@router.post("", response_model=Case)
def create_case(req: CaseCreateRequest):
    return Case(
        id="case-new-001",
        label=req.label,
        language=req.language,
        case_number=req.case_number,
        created_at="2026-10-11T12:00:00Z",
        documents_count=0,
        flags_count=0
    )
