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

    # Project directories
    DATA_DIR: str = "data"
    AUDIT_LOG_FILE: str = "data/audit/audit_chain.json"


settings = Settings()
