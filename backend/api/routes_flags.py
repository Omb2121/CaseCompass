"""
Flags endpoints.
"""

from fastapi import APIRouter, HTTPException
from typing import List
from backend.core.models import Flag, FlagDismissRequest
from .fixtures_loader import load_fixture

router = APIRouter(prefix="/api/cases/{case_id}/flags", tags=["flags"])

@router.get("", response_model=List[Flag])
def get_case_flags(case_id: str):
    data = load_fixture("flags.json")
    return [Flag.model_validate(f) for f in data]

@router.patch("/{flag_id}/dismiss", response_model=Flag)
def dismiss_flag(case_id: str, flag_id: str, req: FlagDismissRequest):
    data = load_fixture("flags.json")
    for f in data:
        if f["id"] == flag_id:
            f["dismissed"] = True
            f["dismissal_note"] = req.note
            return Flag.model_validate(f)
    # If not found in fixture, return a dismissed instance
    return Flag(
        id=flag_id,
        case_id=case_id,
        type="R1",
        rule_id="R1",
        severity="needs_attention",
        message="Dismissed flag",
        related_item_ids=[],
        dismissed=True,
        dismissal_note=req.note
    )
