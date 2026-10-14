"""
CaseCompass — Authentication Utilities
JWT session tokens, role determination from server-side allowlist.
Never trust role from client. Never log tokens or document text.
"""

import uuid
import hashlib
from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import JWTError, jwt
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from backend.core.config import settings


# ------- Role resolution (server-side allowlist) -------

def resolve_role(email: str) -> str:
    """Determine role from server-side env-var allowlists. Never from client."""
    lower = email.lower()
    if lower in settings.admin_emails_list:
        return 'admin'
    if lower in settings.judge_emails_list:
        return 'judge'
    return 'user'


# ------- Google ID token verification -------

def verify_google_id_token(credential: str) -> dict:
    """
    Verify a Google ID token (credential from GIS callback).
    Raises ValueError on any failure. Never trusts client-supplied role.
    Returns: {sub, email, name, picture, email_verified}
    """
    if not settings.GOOGLE_CLIENT_ID:
        raise ValueError("GOOGLE_CLIENT_ID is not configured on this server.")
    
    try:
        request = google_requests.Request()
        payload = id_token.verify_oauth2_token(
            credential,
            request,
            settings.GOOGLE_CLIENT_ID,
            clock_skew_in_seconds=60
        )
    except Exception as exc:
        raise ValueError(f"Google token verification failed: {exc}") from exc
    
    # Mandatory checks
    if payload.get('iss') not in ('accounts.google.com', 'https://accounts.google.com'):
        raise ValueError("Invalid token issuer.")
    if payload.get('aud') != settings.GOOGLE_CLIENT_ID:
        raise ValueError("Token audience mismatch.")
    if not payload.get('email_verified'):
        raise ValueError("Google account email is not verified.")
    if not payload.get('email'):
        raise ValueError("Token missing email claim.")
    
    return {
        'sub': payload['sub'],
        'email': payload['email'],
        'name': payload.get('name', payload['email'].split('@')[0]),
        'picture': payload.get('picture', ''),
        'email_verified': payload.get('email_verified', False),
    }


# ------- JWT session token -------

def create_session_token(user_id: str, email: str, role: str, is_demo: bool = False) -> str:
    """Create a signed JWT session token."""
    now = datetime.now(timezone.utc)
    expire = now + timedelta(hours=settings.JWT_EXPIRE_HOURS)
    payload = {
        'sub': user_id,          # internal user ID
        'email': email,
        'role': role,
        'is_demo': is_demo,
        'iat': now,
        'exp': expire,
        'jti': str(uuid.uuid4()),  # unique token ID
    }
    return jwt.encode(payload, settings.SESSION_SECRET, algorithm=settings.JWT_ALGORITHM)


def decode_session_token(token: str) -> dict:
    """
    Decode and validate a session JWT.
    Raises JWTError on failure.
    """
    try:
        payload = jwt.decode(
            token,
            settings.SESSION_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )
        return payload
    except JWTError as exc:
        raise ValueError(f"Invalid session token: {exc}") from exc


# ------- Demo account helpers -------

DEMO_ACCOUNTS = [
    {'email': 'demo.citizen@casecompass.demo', 'name': 'Demo Citizen', 'role': 'user', 'sub': 'demo_citizen_001'},
    {'email': 'demo.admin@casecompass.demo', 'name': 'Demo Court Admin', 'role': 'admin', 'sub': 'demo_admin_001'},
    {'email': 'demo.judge@casecompass.demo', 'name': 'Demo Presiding Judge', 'role': 'judge', 'sub': 'demo_judge_001'},
]

def get_demo_account(role: str) -> Optional[dict]:
    """Return a demo account for the given role, or None if not found."""
    for acc in DEMO_ACCOUNTS:
        if acc['role'] == role:
            return acc
    return DEMO_ACCOUNTS[0]  # fallback to citizen


# ------- Audit helpers -------

def hash_for_audit(value: str) -> str:
    """SHA-256 hash for audit chain. Never use for passwords."""
    return hashlib.sha256(value.encode()).hexdigest()
