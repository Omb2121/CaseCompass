import pytest
from backend.core.textcapture import extract_from_plain_text, compute_sha256
from backend.core.schemas import RawExtractedCase, DocumentContent, PageText
from backend.core.verifier import normalize_legal_text, locate_quote_in_pages
from backend.core.pipeline import verify_and_construct_order
from backend.core.rules import run_discrepancy_rules
from backend.core.ask import classify_question_intent, answer_case_question, STANDARDIZED_LEGAL_ADVICE_REFUSAL
from backend.core.explain import explain_legal_term, generate_plain_language_summary


SAMPLE_ORDER_TEXT = """
IN THE COURT OF CHIEF JUDICIAL MAGISTRATE, PUNE
Special Criminal Case No. 420/2024
CNR: MHPU01-004291-2024

State of Maharashtra
      v/s
Ramesh S. Patil

ORDER DATED: 15/03/2024
The applicant is charged under Section 420, 468 of IPC.
The accused is released on bail upon furnishing personal bond of Rs. 25,000 with one surety of like amount.
Accused shall attend police station every Monday.
Matter stand over to 10/04/2024 for framing of charges.
"""


def test_sha256_cryptographic_fingerprint():
    data = b"CaseCompass Court Order Test"
    digest = compute_sha256(data)
    assert len(digest) == 64
    assert digest == compute_sha256(data)


def test_text_normalization():
    # Test Devanagari numerals conversion and quotation marks
    raw = "आदेश दिनांक: १५/०३/२०२४ ‘bail’"
    normalized = normalize_legal_text(raw)
    assert "15/03/2024" in normalized
    assert "'bail'" in normalized


def test_verifier_exact_and_fuzzy_matches():
    doc = extract_from_plain_text(SAMPLE_ORDER_TEXT, "test_order.txt", "doc_01")
    
    # Exact quote test
    quote_exact = "accused is released on bail upon furnishing personal bond of Rs. 25,000"
    evidence_exact = locate_quote_in_pages(quote_exact, doc.pages)
    assert evidence_exact is not None
    assert evidence_exact.match_type == "exact"
    assert evidence_exact.confidence_score == 1.0

    # Fuzzy match test (simulating minor OCR noise)
    quote_noisy = "accused is releascd on bail upon turnishing personal bond of Rs. 25,000"
    evidence_fuzzy = locate_quote_in_pages(quote_noisy, doc.pages, threshold=0.90)
    assert evidence_fuzzy is not None
    assert evidence_fuzzy.match_type == "fuzzy"
    assert evidence_fuzzy.confidence_score >= 0.90


def test_verifier_purges_synthetic_hallucination():
    doc = extract_from_plain_text(SAMPLE_ORDER_TEXT, "test_order.txt", "doc_01")
    
    # Fake/hallucinated quote not present in order text
    invented_quote = "The accused shall deposit passport with the American Embassy and pay 1 Crore rupees fine"
    evidence = locate_quote_in_pages(invented_quote, doc.pages, threshold=0.95)
    assert evidence is not None
    assert evidence.match_type == "dropped"

    # Verify pipeline drops invented claim
    raw_extracted = RawExtractedCase(
        court_name="IN THE COURT OF CHIEF JUDICIAL MAGISTRATE, PUNE",
        order_date="2024-03-15",
        next_hearing_date="2024-04-10",
        directions_and_conditions=["The accused shall deposit passport with the American Embassy"],
        source_quotes={
            "court_name": "IN THE COURT OF CHIEF JUDICIAL MAGISTRATE, PUNE",
            "order_date": "ORDER DATED: 15/03/2024",
            "next_hearing_date": "Matter stand over to 10/04/2024",
            "directions_and_conditions": invented_quote
        }
    )

    verified_order = verify_and_construct_order(doc, raw_extracted, "ORD_TEST_01")
    # Assert that the invented claim is dropped completely from verified directions
    assert "The accused shall deposit passport with the American Embassy" not in verified_order.directions_and_conditions
    assert len(verified_order.dropped_facts) >= 1
    assert any(d["field_name"] == "directions_and_conditions" for d in verified_order.dropped_facts)


def test_rules_discrepancy_r1_and_r5():
    # R5: Internal contradiction where next date is before order date
    doc = extract_from_plain_text(SAMPLE_ORDER_TEXT, "test.txt", "doc_01")
    raw = RawExtractedCase(
        order_date="2024-05-20",
        next_hearing_date="2024-05-10",  # Prior to order date!
        source_quotes={}
    )
    order_contradict = verify_and_construct_order(doc, raw, "ORD_ERR")
    order_contradict.order_date = "2024-05-20"
    order_contradict.next_hearing_date = "2024-05-10"

    flags = run_discrepancy_rules([order_contradict])
    assert any(f.rule_id == "R5" for f in flags)


def test_ask_guardrails_refusal():
    # Test illegal outcome / prediction questions
    forbidden_questions = [
        "Will I get bail?",
        "What are my chances of winning this case?",
        "Give me legal advice on how to fight this",
        "Can you act as my defense lawyer?"
    ]

    for q in forbidden_questions:
        intent = classify_question_intent(q)
        assert intent == "refusal_legal_advice"
        resp = answer_case_question(q, [])
        assert resp.answer == STANDARDIZED_LEGAL_ADVICE_REFUSAL
        assert len(resp.citations) == 0


def test_multilingual_glossary():
    # English, Hindi, Marathi definitions
    assert "release" in explain_legal_term("bail", "en").lower()
    assert "जमानत" in explain_legal_term("bail", "hi")
    assert "जामिन" in explain_legal_term("bail", "mr")
