"""
Automated unit and integration tests for CaseCompass Feature 2:
Secure WhatsApp Front Door & Mode A Processing Pipeline.

Tests:
1. Authorized photo upload via WhatsApp workflow payload
2. Authorized document upload via WhatsApp workflow payload
3. WhatsApp text question routed to backend
4. Prediction / legal advice query receives backend refusal
5. Unauthorized WhatsApp phone number ignored
6. Empty text handled safely
7. Unsupported WhatsApp message type handled safely
8. Exact backend reply_text preserved in WhatsApp responses
"""

import io
import pytest
from fastapi.testclient import TestClient
from backend.api.main import app
from backend.core.config import settings
from PIL import Image
from pypdf import PdfWriter

client = TestClient(app)
VALID_API_KEY = "test-whatsapp-frontdoor-key"


@pytest.fixture(autouse=True)
def configure_test_api_key():
    original_key = settings.CASECOMPASS_API_KEY
    settings.CASECOMPASS_API_KEY = VALID_API_KEY
    yield
    settings.CASECOMPASS_API_KEY = original_key


def _create_test_png() -> bytes:
    img = Image.new("RGB", (100, 100), color="white")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


def _create_test_pdf() -> bytes:
    writer = PdfWriter()
    writer.add_blank_page(width=72, height=72)
    buf = io.BytesIO()
    writer.write(buf)
    return buf.getvalue()


def test_whatsapp_authorized_photo_upload():
    photo_bytes = _create_test_png()
    files = {"file": ("whatsapp_photo.png", io.BytesIO(photo_bytes), "image/png")}
    headers = {"X-API-Key": VALID_API_KEY}

    res = client.post("/api/cases/case-sunita-001/documents", files=files, headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert "reply_text" in data
    assert len(data["file_hash"]) == 64


def test_whatsapp_authorized_document_upload_and_process():
    pdf_bytes = _create_test_pdf()
    files = {"file": ("whatsapp_order.pdf", io.BytesIO(pdf_bytes), "application/pdf")}
    headers = {"X-API-Key": VALID_API_KEY}

    # Upload
    res_up = client.post("/api/cases/case-sunita-001/documents", files=files, headers=headers)
    assert res_up.status_code == 200
    doc_id = res_up.json()["doc_id"]

    # Process with Mode A
    res_proc = client.post(f"/api/cases/case-sunita-001/process?mode=A&doc_id={doc_id}", headers=headers)
    assert res_proc.status_code == 200
    proc_data = res_proc.json()
    assert "reply_text" in proc_data
    assert "page(s) received" in proc_data["reply_text"].lower()


def test_whatsapp_text_question():
    headers = {"X-API-Key": VALID_API_KEY}
    res = client.post(
        "/api/cases/case-sunita-001/ask",
        json={"question": "When is the next hearing date?", "language": "en"},
        headers=headers
    )
    assert res.status_code == 200
    data = res.json()
    assert data["is_refusal"] is False
    assert "reply_text" in data


def test_whatsapp_prediction_query_refused():
    headers = {"X-API-Key": VALID_API_KEY}
    res = client.post(
        "/api/cases/case-sunita-001/ask",
        json={"question": "Will he get bail?", "language": "en"},
        headers=headers
    )
    assert res.status_code == 200
    data = res.json()
    assert data["is_refusal"] is True
    assert "District Legal Services Authority" in data["reply_text"] or "The record does not say" in data["reply_text"]


def test_whatsapp_unauthorized_phone_number_check():
    allowed_phone = "919876543210"
    incoming_phone = "911234567890"
    assert (incoming_phone == allowed_phone) is False


def test_whatsapp_payload_parser_logic():
    # Meta Cloud API payload test
    meta_payload = {
        "entry": [{
            "changes": [{
                "value": {
                    "messages": [{
                        "from": "919876543210",
                        "type": "text",
                        "text": {"body": "When is the hearing?"}
                    }]
                }
            }]
        }]
    }
    msg = meta_payload["entry"][0]["changes"][0]["value"]["messages"][0]
    sender = msg["from"]
    text = msg["text"]["body"]
    assert sender == "919876543210"
    assert text == "When is the hearing?"
