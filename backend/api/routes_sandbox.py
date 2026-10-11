"""
Sandbox testing and quote verification endpoints (non-persistent).
"""

from fastapi import APIRouter
from backend.core.models import SandboxResult, SandboxRequest
from .fixtures_loader import load_fixture

router = APIRouter(prefix="/api/sandbox", tags=["sandbox"])

@router.post("/verify", response_model=SandboxResult)
def verify_sandbox(req: SandboxRequest):
    data = load_fixture("sandbox_result.json")
    return SandboxResult.model_validate(data)
