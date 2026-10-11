"""
Glossary retrieval endpoints.
"""

from fastapi import APIRouter
from typing import Dict, Any
from backend.core.templates import GLOSSARY

router = APIRouter(prefix="/api/glossary", tags=["glossary"])

@router.get("")
def get_glossary() -> Dict[str, Any]:
    return GLOSSARY
