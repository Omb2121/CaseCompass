"""
Automated validation of all API fixture JSON files against strict Pydantic v2 schemas.
Verifies all master requirements and edge-case representations.
"""

import json
from pathlib import Path
import pytest

from backend.core.models import (
    Case,
    Document,
    Flag,
    Item,
    TimelineEntry,
    TrustReport,
    AskResponse,
    SandboxResult,
)

FIXTURES_DIR = Path(__file__).parent.parent / "backend" / "api" / "fixtures"


def load_fixture_data(filename: str):
    path = FIXTURES_DIR / filename
    assert path.exists(), f"Fixture file {filename} does not exist"
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def test_cases_fixture():
    data = load_fixture_data("cases.json")
    assert isinstance(data, list)
    assert len(data) > 0
    for item in data:
        case = Case.model_validate(item)
        assert case.id
        assert case.language in ["en", "hi", "mr"]


def test_case_detail_fixture():
    data = load_fixture_data("case_detail.json")
    case = Case.model_validate(data)
    assert case.id == "case-sunita-001"


def test_documents_fixture():
    data = load_fixture_data("documents.json")
    assert isinstance(data, list)
    assert len(data) >= 5
    for item in data:
        doc = Document.model_validate(item)
        assert doc.id
        assert doc.case_id


def test_flags_fixture():
    data = load_fixture_data("flags.json")
    assert isinstance(data, list)
    flags = [Flag.model_validate(f) for f in data]

    flag_rule_ids = {f.rule_id for f in flags}
    required_rules = {"R1", "R3", "R5", "R7", "R9", "R11", "R12"}
    assert required_rules.issubset(flag_rule_ids), f"Missing rules: {required_rules - flag_rule_ids}"

    dismissed = [f for f in flags if f.dismissed]
    assert len(dismissed) >= 1, "Must contain at least one dismissed flag"
    assert dismissed[0].dismissal_note is not None


def test_timeline_fixture():
    data = load_fixture_data("timeline.json")
    assert isinstance(data, list)
    entries = [TimelineEntry.model_validate(e) for e in data]

    # Verify dated entries vs undated entry
    dated_entries = [e for e in entries if not e.is_undated and e.order_date is not None]
    undated_entries = [e for e in entries if e.is_undated and e.order_date is None]
    assert len(dated_entries) >= 4, f"Expected at least 4 dated entries, got {len(dated_entries)}"
    assert len(undated_entries) >= 1, f"Expected at least 1 undated entry, got {len(undated_entries)}"

    # Collect all items
    all_items = []
    for e in entries:
        all_items.extend(e.items)

    # 1. Relative deadline with null value
    relative_null = [it for it in all_items if it.kind == "relative_period" and it.date is None]
    assert len(relative_null) >= 1, "Must have at least one relative deadline with a null value"

    # 2. User-rule-derived deadline
    derived_items = [it for it in all_items if it.derived and it.date is not None]
    assert len(derived_items) >= 1, "Must have at least one user-rule-derived deadline"
    assert derived_items[0].derivation_working is not None
    assert derived_items[0].derivation_rule is not None

    # 3. Fuzzy-matched item
    fuzzy_items = [it for it in all_items if it.match_type == "fuzzy" and it.verified]
    assert len(fuzzy_items) >= 1, "Must have at least one fuzzy-matched verified item"

    # 4. Dropped item
    dropped_items = [it for it in all_items if it.match_type == "dropped" and not it.verified]
    assert len(dropped_items) >= 1, "Must have at least one dropped unverified item"
    assert dropped_items[0].drop_reason is not None


def test_trust_report_fixture():
    data = load_fixture_data("trust_report.json")
    report = TrustReport.model_validate(data)
    assert report.total_items_extracted > 0
    assert report.items_verified > 0
    assert report.hallucinated_deadlines == 0


def test_ask_response_fixture():
    data = load_fixture_data("ask_response.json")
    ask = AskResponse.model_validate(data)
    assert ask.case_id
    assert ask.answer


def test_sandbox_result_fixture():
    data = load_fixture_data("sandbox_result.json")
    result = SandboxResult.model_validate(data)
    assert result.status in ["passed", "failed", "error"]
    assert result.verified_count >= 1
