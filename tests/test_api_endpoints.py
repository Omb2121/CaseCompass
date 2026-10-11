"""
Integration tests for FastAPI endpoints verifying all required routes,
CORS headers, mandatory disclaimers, and OpenAPI docs.
"""

from fastapi.testclient import TestClient
from backend.api.main import app
from backend.core.models import MANDATORY_DISCLAIMER

client = TestClient(app)


def test_root_and_health():
    res = client.get("/")
    assert res.status_code == 200
    assert res.json()["disclaimer"] == MANDATORY_DISCLAIMER

    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json()["status"] == "healthy"


def test_openapi_docs():
    res = client.get("/docs")
    assert res.status_code == 200
    res_json = client.get("/openapi.json")
    assert res_json.status_code == 200


def test_cases_endpoints():
    res = client.get("/api/cases")
    assert res.status_code == 200
    assert len(res.json()) >= 1

    res = client.get("/api/cases/case-sunita-001")
    assert res.status_code == 200
    assert res.json()["id"] == "case-sunita-001"

    res = client.post("/api/cases", json={"label": "New Case", "language": "en"})
    assert res.status_code == 200
    assert res.json()["label"] == "New Case"


def test_timeline_endpoint():
    res = client.get("/api/cases/case-sunita-001/timeline")
    assert res.status_code == 200
    data = res.json()
    assert len(data) >= 5


def test_documents_endpoint():
    res = client.get("/api/cases/case-sunita-001/documents")
    assert res.status_code == 200
    data = res.json()
    assert len(data) >= 5


def test_flags_and_dismiss():
    res = client.get("/api/cases/case-sunita-001/flags")
    assert res.status_code == 200
    flags = res.json()
    assert len(flags) >= 7

    res = client.patch(
        "/api/cases/case-sunita-001/flags/flag-r1-001/dismiss",
        json={"note": "Confirmed order was not pronounced"}
    )
    assert res.status_code == 200
    assert res.json()["dismissed"] is True


def test_item_review_and_derive():
    res = client.patch(
        "/api/items/item-001/review",
        json={"status": "confirmed"}
    )
    assert res.status_code == 200
    assert res.json()["user_status"] == "confirmed"

    res = client.post(
        "/api/items/item-003/derive",
        json={"user_rule": "4 weeks from 12 March = 9 April"}
    )
    assert res.status_code == 200
    assert res.json()["derived"] is True


def test_ask_endpoint():
    # Record lookup
    res = client.post(
        "/api/cases/case-sunita-001/ask",
        json={"query": "When is the next hearing?", "language": "en"}
    )
    assert res.status_code == 200

    # Prediction / advice query (must refuse)
    res_refusal = client.post(
        "/api/cases/case-sunita-001/ask",
        json={"query": "Will the accused get bail?", "language": "en"}
    )
    assert res_refusal.status_code == 200
    assert res_refusal.json()["is_refusal"] is True
    assert "District Legal Services Authority" in res_refusal.json()["answer"]


def test_exports_and_trust_report():
    res = client.get("/api/cases/case-sunita-001/export/ics")
    assert res.status_code == 200
    assert "VCALENDAR" in res.text

    res = client.get("/api/cases/case-sunita-001/export/summary")
    assert res.status_code == 200
    assert res.json()["disclaimer"] == MANDATORY_DISCLAIMER

    res = client.get("/api/cases/case-sunita-001/trust-report")
    assert res.status_code == 200
    assert res.json()["hallucinated_deadlines"] == 0


def test_audit_and_glossary():
    res = client.get("/api/cases/case-sunita-001/audit")
    assert res.status_code == 200

    res = client.post("/api/cases/case-sunita-001/audit/verify")
    assert res.status_code == 200
    assert res.json()["valid"] is True

    res = client.get("/api/glossary")
    assert res.status_code == 200
    assert "adjournment" in res.json()
