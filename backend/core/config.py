import os
from typing import Literal
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    # API Keys & Providers
    GEMINI_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    LLM_PROVIDER: Literal["gemini", "openai", "offline_rules"] = "gemini"

    # Execution Modes & Parameters
    RUNNING_WITHOUT_AI: bool = False
    OCR_LANGUAGE_PACKS: str = "eng+mar+hin"
    VERIFICATION_FUZZY_THRESHOLD: float = 0.95
    MAX_OCR_PAGES: int = 50

    # Security & API Auth
    CASECOMPASS_API_KEY: str = ""

    # Google OAuth
    GOOGLE_CLIENT_ID: str = ""

    # Session / JWT
    SESSION_SECRET: str = "change-me-in-production-use-long-random-string"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_HOURS: int = 8

    # Role allowlists (comma-separated emails)
    ADMIN_EMAILS: str = ""
    JUDGE_EMAILS: str = ""

    # Demo mode (set true only for demo/hackathon)
    DEMO_MODE: bool = False

    # CORS / Allowed origins (comma-separated)
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173,https://casecompass-seven.vercel.app"

    # n8n webhook secret
    N8N_WEBHOOK_SECRET: str = ""

    # Project directories
    DATA_DIR: str = "data"
    AUDIT_LOG_FILE: str = "data/audit/audit_chain.json"

    @property
    def admin_emails_list(self) -> list[str]:
        return [e.strip().lower() for e in self.ADMIN_EMAILS.split(',') if e.strip()]

    @property
    def judge_emails_list(self) -> list[str]:
        return [e.strip().lower() for e in self.JUDGE_EMAILS.split(',') if e.strip()]

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(',') if o.strip()]


settings = Settings()
