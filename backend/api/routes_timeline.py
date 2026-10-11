"""
Case timeline endpoints.
"""

from fastapi import APIRouter
from typing import List
from backend.core.models import TimelineEntry
from .fixtures_loader import load_fixture

router = APIRouter(prefix="/api/cases/{case_id}/timeline", tags=["timeline"])

@router.get("", response_model=List[TimelineEntry])
def get_case_timeline(case_id: str):
    data = load_fixture("timeline.json")
    return [TimelineEntry.model_validate(entry) for entry in data]
