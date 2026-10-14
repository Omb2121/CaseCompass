"""
CaseCompass — Authentication Routes
POST /api/auth/google  — verify Google ID token, return session JWT
POST /api/auth/demo    — demo login (only when DEMO_MODE=true)
POST /api/auth/logout  — invalidate session (client must discard token)
GET  /api/auth/me      — return current user info from session
"""

import uuid
import logging
from datetime import datetime, timezone
from typing import Optional, Literal

from fastapi import APIRouter, Depends, HTTPException, status, Request
from pydantic import BaseModel, EmailStr, field_validator

from backend.core.config import settings
from backend.core.models import MANDATORY_DISCLAIMER
from .db import get_db
from .auth_utils import (
    verify_google_id_token,
    resolve_role,
    create_session_token,
    decode_session_token,
    get_demo_account,
    DEMO_ACCOUNTS,
)

logger = logging.getLogger(__name__)
router = APIRouter(prefix='/api/auth', tags=['auth'])


# ------- Pydantic request/response models -------

class GoogleAuthRequest(BaseModel):
    credential: str  # Google ID token from GIS
    requested_portal: Literal['user', 'admin', 'judge'] = 'user'  # hint only; server decides role
    
    @field_validator('credential')
    @classmethod
    def credential_not_empty(cls, v: str) -> str:
        if not v or len(v) < 10:
            raise ValueError('credential must be a valid Google ID token')
        return v


class DemoAuthRequest(BaseModel):
    role: Literal['user', 'admin', 'judge'] = 'user'


class AuthResponse(BaseModel):
    token: str
    user_id: str
    email: str
    name: str
    role: str
    is_demo: bool
    disclaimer: str = MANDATORY_DISCLAIMER


class MeResponse(BaseModel):
    user_id: str
    email: str
    name: str
    role: str
    is_demo: bool
    disclaimer: str = MANDATORY_DISCLAIMER


# ------- Helper: get current user from Bearer token -------

def get_current_user(request: Request) -> dict:
    """Extract and validate the session JWT from Authorization header."""
    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Authentication required. Please sign in.',
            headers={'WWW-Authenticate': 'Bearer'},
        )
    token = auth_header[7:]
    try:
        payload = decode_session_token(token)
        return payload
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Session expired or invalid. Please sign in again.',
            headers={'WWW-Authenticate': 'Bearer'},
        )


def require_role(required_role: str):
    """Dependency factory for role-based access control."""
    def _check(current_user: dict = Depends(get_current_user)):
        if current_user.get('role') != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f'Access denied. This endpoint requires the {required_role} role.',
            )
        return current_user
    return _check


# ------- Helper: find or create user in DB -------

def upsert_user(conn, google_sub: str, email: str, name: str, picture: str, role: str, is_demo: bool = False) -> str:
    """Find or create user by google_sub. Return user_id."""
    now = datetime.now(timezone.utc).isoformat()
    cursor = conn.cursor()
    
    row = cursor.execute(
        'SELECT id, role FROM users WHERE google_sub = ?', (google_sub,)
    ).fetchone()
    
    if row:
        user_id = row['id']
        # Update last login and name/picture
        cursor.execute(
            'UPDATE users SET last_login_at = ?, name = ?, picture = ? WHERE id = ?',
            (now, name, picture, user_id)
        )
    else:
        user_id = str(uuid.uuid4())
        cursor.execute(
            '''INSERT INTO users (id, google_sub, email, name, picture, role, email_verified, is_demo, created_at, last_login_at)
               VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?)''',
            (user_id, google_sub, email, name, picture, role, 1 if is_demo else 0, now, now)
        )
    
    conn.commit()
    return user_id


# ------- Routes -------

@router.post('/google', response_model=AuthResponse)
def auth_google(body: GoogleAuthRequest, db=Depends(get_db)):
    """
    Verify Google ID token and create a session.
    The server determines role from the allowlist — never from the client.
    """
    # Verify with Google
    try:
        ginfo = verify_google_id_token(body.credential)
    except ValueError as exc:
        # Log failure (no token content)
        logger.warning('Google auth failed: %s', str(exc))
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Google authentication failed. Please try again.',
        )
    
    email = ginfo['email']
    role = resolve_role(email)  # server-side; ignores requested_portal for role
    
    # Warn if user tried to get a privileged portal they are not entitled to
    if body.requested_portal in ('admin', 'judge') and role == 'user':
        logger.info('Role escalation attempt: %s tried portal=%s, granted=user', email, body.requested_portal)
    
    # Find or create user
    user_id = upsert_user(
        db,
        google_sub=ginfo['sub'],
        email=email,
        name=ginfo['name'],
        picture=ginfo['picture'],
        role=role,
        is_demo=False
    )
    
    # Log success (no tokens or document text)
    logger.info('auth.login.success email=%s role=%s user_id=%s', email, role, user_id)
    
    token = create_session_token(user_id, email, role, is_demo=False)
    
    return AuthResponse(
        token=token,
        user_id=user_id,
        email=email,
        name=ginfo['name'],
        role=role,
        is_demo=False,
    )


@router.post('/demo', response_model=AuthResponse)
def auth_demo(body: DemoAuthRequest, db=Depends(get_db)):
    """
    Demo login — only available when DEMO_MODE=true.
    Sessions are clearly tagged demo=true and limited to sample data.
    """
    if not settings.DEMO_MODE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='Demo mode is not enabled on this server.',
        )
    
    acc = get_demo_account(body.role)
    user_id = upsert_user(
        db,
        google_sub=acc['sub'],
        email=acc['email'],
        name=acc['name'],
        picture='',
        role=acc['role'],
        is_demo=True
    )
    
    logger.info('auth.demo.login role=%s user_id=%s', acc['role'], user_id)
    
    token = create_session_token(user_id, acc['email'], acc['role'], is_demo=True)
    
    return AuthResponse(
        token=token,
        user_id=user_id,
        email=acc['email'],
        name=acc['name'],
        role=acc['role'],
        is_demo=True,
    )


@router.post('/logout')
def auth_logout(current_user: dict = Depends(get_current_user)):
    """
    Logout endpoint. Client must discard the token.
    (JWT is stateless; for full revocation, add a token blocklist.)
    """
    logger.info('auth.logout user_id=%s', current_user.get('sub'))
    return {'message': 'Signed out successfully. Discard your session token.'}


@router.get('/me', response_model=MeResponse)
def auth_me(current_user: dict = Depends(get_current_user), db=Depends(get_db)):
    """Return current authenticated user info."""
    user_id = current_user.get('sub')
    row = db.execute('SELECT email, name, role, is_demo FROM users WHERE id = ?', (user_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found.')
    return MeResponse(
        user_id=user_id,
        email=row['email'],
        name=row['name'],
        role=row['role'],
        is_demo=bool(row['is_demo']),
    )
