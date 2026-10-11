"""
Ask Your Case Q&A endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException
from backend.core.models import AskRequest, AskResponse
from backend.core.ask import answer_case_query
from .deps import verify_api_key
from .fixtures_loader import load_fixture

router = APIRouter(prefix="/api/cases/{case_id}/ask", tags=["ask"])

@router.post("", response_model=AskResponse)
def ask_case(case_id: str, req: AskRequest, _: str = Depends(verify_api_key)):
    user_query = req.get_query()
    if not user_query.strip():
        raise HTTPException(status_code=400, detail="Query or question cannot be empty.")
    
    # Route through the deterministic intent & safety answerer
    return answer_case_query(
        case_id=case_id,
        query=user_query,
        language=req.language,
        verified_items=[],
        flags=[]
    )
