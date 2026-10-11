"""
CaseCompass FastAPI Application.
Configures CORS for http://localhost:5173, initializes SQLite DB,
attaches all endpoint routers, and guarantees mandatory disclaimer in responses.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.core.models import MANDATORY_DISCLAIMER
from .db import init_db
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


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite database on startup
    init_db()
    yield


app = FastAPI(
    title="CaseCompass Backend API",
    description=f"AI-powered court-document organizer. {MANDATORY_DISCLAIMER}",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
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


@app.get("/")
def root():
    return {
        "service": "CaseCompass Backend",
        "status": "online",
        "disclaimer": MANDATORY_DISCLAIMER
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "database": "sqlite_initialized",
        "disclaimer": MANDATORY_DISCLAIMER
    }
