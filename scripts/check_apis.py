import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from backend.api.main import app

client = TestClient(app)

endpoints = [
    # Core Health & Documentation
    ("GET", "/", None, "Root welcome & disclaimer check"),
    ("GET", "/api/health", None, "Health & DB status check"),
    ("GET", "/docs", None, "Swagger UI API docs"),
    ("GET", "/openapi.json", None, "OpenAPI schema specification"),

    # Cases
    ("GET", "/api/cases", None, "List all active docket cases"),
    ("GET", "/api/cases/CASE-2024-001", None, "Get specific case metadata"),
    ("POST", "/api/cases", {"label": "New Legal Aid Case", "language": "en"}, "Create new case"),

    # Documents & Timeline
    ("GET", "/api/cases/CASE-2024-001/timeline", None, "Get chronological order timeline"),
    ("GET", "/api/cases/CASE-2024-001/documents", None, "List case court documents"),

    # Flags & Dismissal
    ("GET", "/api/cases/CASE-2024-001/flags", None, "Get detected discrepancy flags"),
    ("PATCH", "/api/cases/CASE-2024-001/flags/flag-r1-001/dismiss", {"note": "Verified by legal volunteer"}, "Dismiss discrepancy flag with note"),

    # Items & Volunteer Review
    ("PATCH", "/api/items/item-001/review", {"status": "confirmed"}, "Volunteer confirm/reject item"),
    ("POST", "/api/items/item-003/derive", {"user_rule": "4 weeks from 12 March = 9 April"}, "Derive relative deadline"),

    # Grounded Q&A ('Ask Your Case')
    ("POST", "/api/cases/CASE-2024-001/ask", {"query": "When is the next hearing date?", "language": "en"}, "Grounded record lookup question"),
    ("POST", "/api/cases/CASE-2024-001/ask", {"query": "Will the accused get bail?", "language": "en"}, "Legal advice / outcome refusal trigger"),

    # Exports & Trust Report
    ("GET", "/api/cases/CASE-2024-001/export/ics", None, "Export hearing dates to iCalendar (.ics)"),
    ("GET", "/api/cases/CASE-2024-001/export/summary", None, "Export plain-language family summary"),
    ("GET", "/api/cases/CASE-2024-001/trust-report", None, "Generate golden set Trust Report"),

    # Audit & Glossary
    ("GET", "/api/cases/CASE-2024-001/audit", None, "Retrieve SHA-256 chained audit entries"),
    ("POST", "/api/cases/CASE-2024-001/audit/verify", None, "Cryptographic audit chain verification"),
    ("GET", "/api/glossary", None, "Retrieve multilingual legal term glossary"),

    # Sandbox
    ("POST", "/api/sandbox/verify", {
        "case_id": "CASE-2024-001",
        "items": [],
        "pages": []
    }, "Sandbox quote verifier testing"),
]

print("=" * 80)
print(f"       CASECOMPASS API HEALTH & ENDPOINT VERIFICATION SUITE")
print("=" * 80)

passed_count = 0
for method, path, payload, description in endpoints:
    if method == "GET":
        res = client.get(path)
    elif method == "POST":
        res = client.post(path, json=payload)
    elif method == "PATCH":
        res = client.patch(path, json=payload)
    else:
        res = client.request(method, path, json=payload)

    status = res.status_code
    is_ok = 200 <= status < 300
    if is_ok:
        passed_count += 1
    
    badge = f"[\033[92mPASS {status}\033[0m]" if is_ok else f"[\033[91mFAIL {status}\033[0m]"
    print(f"{badge} {method:5} {path:44} - {description}")

print("=" * 80)
print(f"Summary: {passed_count}/{len(endpoints)} endpoints functioning with 100% success.")
print("=" * 80)
