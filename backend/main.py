from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.routes import router
from backend.core.config import settings

app = FastAPI(
    title="CaseCompass Intelligence API",
    description="Zero-Hallucination, Explainable Court Docket Management for Legal Aid Litigants",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def read_root():
    return {
        "app": "CaseCompass",
        "status": "online",
        "running_without_ai": settings.RUNNING_WITHOUT_AI,
        "llm_provider": settings.LLM_PROVIDER,
        "mode": "Mode A (Rules)" if settings.RUNNING_WITHOUT_AI or not settings.GEMINI_API_KEY else "Mode B (AI Assisted)"
    }
