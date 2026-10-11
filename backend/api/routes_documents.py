"""
Documents management and upload endpoints.
"""

from fastapi import APIRouter, UploadFile, File
from typing import List
from backend.core.models import Document
from .fixtures_loader import load_fixture

router = APIRouter(prefix="/api/cases/{case_id}/documents", tags=["documents"])

@router.get("", response_model=List[Document])
def list_documents(case_id: str):
    data = load_fixture("documents.json")
    return [Document.model_validate(doc) for doc in data]

@router.post("/upload", response_model=Document)
async def upload_document(case_id: str, file: UploadFile = File(...)):
    # Accepts file upload with python-multipart
    return Document(
        id="doc-uploaded-001",
        case_id=case_id,
        filename=file.filename or "uploaded_order.pdf",
        order_date="2026-10-11",
        order_type="hearing",
        court="District Court, Pune",
        case_number="CR.A. 123/2024",
        ocr_confidence=0.97,
        file_hash="uploadhash1234567890abcdef1234567890abcdef1234567890abcdef123456",
        pages_count=1,
        created_at="2026-10-11T12:00:00Z"
    )
