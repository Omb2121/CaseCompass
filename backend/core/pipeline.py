from typing import List, Dict, Any, Tuple
from backend.core.schemas import (
    DocumentContent, RawExtractedCase, VerifiedOrder, VerifiedFact, EvidenceLens
)
from backend.core.verifier import locate_quote_in_pages
from backend.core.explain import generate_plain_language_summary
from backend.core.auditlog import audit_logger


def verify_and_construct_order(
    doc: DocumentContent,
    extracted: RawExtractedCase,
    order_id: str
) -> VerifiedOrder:
    """
    Takes raw machine extraction, runs strict quote verifier on every field,
    drops unverified items, and builds the XAI verified order.
    """
    verified_facts: List[VerifiedFact] = []
    dropped_facts: List[Dict[str, Any]] = []

    fields_to_check = [
        ("court_name", extracted.court_name),
        ("case_number", extracted.case_number),
        ("cnr", extracted.cnr),
        ("parties", extracted.parties),
        ("order_date", extracted.order_date),
        ("order_type", extracted.order_type),
        ("next_hearing_date", extracted.next_hearing_date),
        ("hearing_purpose", extracted.hearing_purpose),
    ]

    verified_values: Dict[str, Any] = {}

    for field_name, value in fields_to_check:
        if value is not None:
            # Check if source quote exists
            quote = extracted.source_quotes.get(field_name) or str(value)
            evidence = locate_quote_in_pages(quote, doc.pages)

            if evidence and evidence.match_type in ["exact", "fuzzy"]:
                verified_facts.append(VerifiedFact(
                    field_name=field_name,
                    value=value,
                    is_verified=True,
                    evidence=evidence
                ))
                verified_values[field_name] = value
            else:
                dropped_facts.append({
                    "field_name": field_name,
                    "claimed_value": value,
                    "claimed_quote": quote,
                    "reason": "Quote not matched in raw document text (Hallucination dropped)"
                })
                verified_values[field_name] = None
        else:
            verified_values[field_name] = None

    # Verify statutory sections
    verified_sections = []
    for sec in extracted.statutory_sections:
        quote = extracted.source_quotes.get("statutory_sections") or sec
        evidence = locate_quote_in_pages(quote, doc.pages)
        if evidence and evidence.match_type in ["exact", "fuzzy"]:
            verified_sections.append(sec)
        else:
            dropped_facts.append({
                "field_name": "statutory_sections",
                "claimed_value": sec,
                "reason": "Statute citation not confirmed in document"
            })

    # Verify directions and conditions
    verified_directions = []
    for cond in extracted.directions_and_conditions:
        quote = extracted.source_quotes.get("directions_and_conditions") or cond
        evidence = locate_quote_in_pages(quote, doc.pages)
        if evidence and evidence.match_type in ["exact", "fuzzy"]:
            verified_directions.append(cond)
            verified_facts.append(VerifiedFact(
                field_name="directions_and_conditions",
                value=cond,
                is_verified=True,
                evidence=evidence
            ))
        else:
            dropped_facts.append({
                "field_name": "directions_and_conditions",
                "claimed_value": cond,
                "reason": "Condition unverified against source text"
            })

    total_claims = len(verified_facts) + len(dropped_facts)
    verification_stats = {
        "total_claims": total_claims,
        "verified_count": len(verified_facts),
        "dropped_count": len(dropped_facts),
        "pass_rate": round(len(verified_facts) / total_claims, 4) if total_claims > 0 else 1.0
    }

    # Generate plain language explanations in en, hi, mr
    order_date = verified_values.get("order_date")
    order_type = verified_values.get("order_type")
    next_date = verified_values.get("next_hearing_date")

    summary_en = generate_plain_language_summary(order_type, order_date, next_date, verified_directions, "en")
    summary_hi = generate_plain_language_summary(order_type, order_date, next_date, verified_directions, "hi")
    summary_mr = generate_plain_language_summary(order_type, order_date, next_date, verified_directions, "mr")

    order = VerifiedOrder(
        order_id=order_id,
        doc_id=doc.doc_id,
        court_name=verified_values.get("court_name"),
        case_number=verified_values.get("case_number"),
        cnr=verified_values.get("cnr"),
        parties=verified_values.get("parties"),
        order_date=order_date,
        order_type=order_type,
        statutory_sections=verified_sections,
        next_hearing_date=next_date,
        hearing_purpose=verified_values.get("hearing_purpose"),
        directions_and_conditions=verified_directions,
        verified_facts=verified_facts,
        dropped_facts=dropped_facts,
        verification_stats=verification_stats,
        plain_explanation_en=summary_en,
        plain_explanation_hi=summary_hi,
        plain_explanation_mr=summary_mr
    )

    # Log to cryptographic audit chain
    audit_logger.log_event("ORDER_VERIFICATION_COMPLETE", {
        "order_id": order_id,
        "doc_id": doc.doc_id,
        "stats": verification_stats
    })

    return order
