"""
Ask Your Case Q&A endpoints.
"""

from fastapi import APIRouter
from backend.core.models import AskRequest, AskResponse
from backend.core.ask import answer_case_query
from .fixtures_loader import load_fixture

router = APIRouter(prefix="/api/cases/{case_id}/ask", tags=["ask"])

@router.post("", response_model=AskResponse)
def ask_case(case_id: str, req: AskRequest):
    # Route through the deterministic intent & safety answerer
    return answer_case_query(
        case_id=case_id,
        query=req.query,
        language=req.language,
        verified_items=[],
        flags=[]
    )
