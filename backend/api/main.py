"""
CaseCompass FastAPI Application.
Configures CORS for allowed origins, initializes SQLite DB,
attaches all endpoint routers, and guarantees mandatory disclaimer in responses.
"""

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from backend.core.models import MANDATORY_DISCLAIMER
from backend.core.config import settings
from .db import init_db
from .routes_auth import router as auth_router
from .routes_cases import router as cases_router
from .routes_timeline import router as timeline_router
from .routes_documents import router as documents_router
from .routes_flags import router as flags_router
from .routes_items import router as items_router
from .routes_ask import router as ask_router
from .routes_export import router as export_router
from .routes_trust import router as trust_router
from .routes_sandbox import router as sandbox_router
from .routes_audit import router as audit_router
from .routes_glossary import router as glossary_router
from .routes_reminders import router as reminders_router, due_router

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(name)s %(message)s'
)

# Rate limiter
limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title='CaseCompass Backend API',
    description=f'AI-powered court-document organizer. {MANDATORY_DISCLAIMER}',
    version='2.0.0',
    lifespan=lifespan
)

# Attach rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS — exact allowlist, no wildcards
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allow_headers=['Authorization', 'Content-Type', 'X-CSRF-Token'],
)

# Security headers middleware
@app.middleware('http')
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Permissions-Policy'] = 'camera=(), microphone=(), geolocation=()'
    # HSTS — only set on production HTTPS
    if request.url.scheme == 'https':
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response

# Register routers
app.include_router(auth_router)
app.include_router(cases_router)
app.include_router(timeline_router)
app.include_router(documents_router)
app.include_router(flags_router)
app.include_router(items_router)
app.include_router(ask_router)
app.include_router(export_router)
app.include_router(trust_router)
app.include_router(sandbox_router)
app.include_router(audit_router)
app.include_router(glossary_router)
app.include_router(reminders_router)
app.include_router(due_router)


@app.get('/')
def root():
    return {
        'service': 'CaseCompass Backend',
        'status': 'online',
        'disclaimer': MANDATORY_DISCLAIMER
    }


@app.get('/api/health')
def health():
    return {
        'status': 'healthy',
        'database': 'sqlite_initialized',
        'disclaimer': MANDATORY_DISCLAIMER
    }
