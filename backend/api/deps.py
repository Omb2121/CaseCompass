"""
FastAPI dependency injection utilities.
"""

from fastapi import Security, HTTPException, status
from fastapi.security import APIKeyHeader
from backend.core.config import settings
from .db import get_db

api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

def verify_api_key(api_key: str = Security(api_key_header)) -> str:
    """
    Validates X-API-Key header.
    If CASECOMPASS_API_KEY is configured in settings/environment,
    requests missing or presenting an invalid key are rejected with 401.
    """
    expected_key = settings.CASECOMPASS_API_KEY
    if not expected_key:
        # If no key configured, allow request (development mode)
        return api_key or ""
    
    if not api_key or api_key != expected_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing X-API-Key header."
        )
    return api_key

# Re-export db dependency and verify_api_key
__all__ = ["get_db", "verify_api_key"]
