"""
Ask Your Case Q&A module.
Constrained strictly to verified items, flags, and glossary.
Refuses prediction and advice.
"""
import re
from typing import List, Optional
from .models import AskResponse as LegacyAskResponse, Item, Flag
from .templates import REFUSAL_MESSAGES
from .injection_guard import detect_injection_attempt
from backend.core.schemas import VerifiedOrder, AskResponse, CitationChip
from backend.core.explain import explain_legal_term

STANDARDIZED_LEGAL_ADVICE_REFUSAL = (
    "CaseCompass organizes the verifiable record. It is not legal advice and cannot "
    "predict judicial outcomes or bail chances. Please consult a qualified advocate or "
    "your local District Legal Services Authority (DLSA)."
)

REFUSAL_PROMPT_PATTERNS = [
    r'\b(will i get bail|can i get bail|chances of bail|will he get bail|bail chances)\b',
    r'\b(will i win|can i win|outcome|judge\'s mind|what are my chances|chances of winning)\b',
    r'\b(legal advice|what should i do|recommend a strategy|how to escape|fight this|how to fight)\b',
    r'\b(jailbreak|ignore previous instructions|act as a lawyer|defense lawyer|give counsel|as my lawyer)\b'
]

PREDICTION_WORDS = [
    "likely", "probably", "chance", "chances", "outcome", "win", "bail?",
    "will be granted", "expect", "should", "recommend",
    "संभावना", "शायद", "चाहिए",
    "शक्यता", "कदाचित", "पाहिजे"
]

GLOSSARY_QUESTION_PATTERNS = [
    r'\b(what does|what is|meaning of|define)\s+([a-zA-Z\s]+)\b'
]


def classify_question_intent(question: str) -> str:
    """Classifies user query into safe or refused intent."""
    q_lower = question.lower()

    if detect_injection_attempt(question):
        return "refusal_legal_advice"

    for pat in REFUSAL_PROMPT_PATTERNS:
        if re.search(pat, q_lower):
            return "refusal_legal_advice"

    if any(w in q_lower for w in PREDICTION_WORDS):
        return "refusal_legal_advice"

    for pat in GLOSSARY_QUESTION_PATTERNS:
        if re.search(pat, q_lower):
            return "glossary_lookup"

    return "record_lookup"


def answer_case_question(
    question: str,
    orders: List[VerifiedOrder],
    language: str = "en"
) -> AskResponse:
    """
    Evaluates grounded Q&A with hard guardrails:
    - Zero legal advice or prediction
    - Strict citation chips for all factual answers
    """
    intent = classify_question_intent(question)

    if intent == "refusal_legal_advice":
        return AskResponse(
            intent="refusal_legal_advice",
            answer=STANDARDIZED_LEGAL_ADVICE_REFUSAL,
            citations=[],
            refusal_reason="Legal advice or judicial outcome prediction is strictly prohibited.",
            language=language
        )

    if intent == "glossary_lookup":
        for pat in GLOSSARY_QUESTION_PATTERNS:
            m = re.search(pat, question.lower())
            if m:
                term = m.group(2).strip()
                explanation = explain_legal_term(term, lang=language)
                if explanation:
                    return AskResponse(
                        intent="glossary_lookup",
                        answer=f"Definition of '{term}': {explanation}",
                        citations=[],
                        language=language
                    )

    q_lower = question.lower()
    citations: List[CitationChip] = []
    answers: List[str] = []

    if any(k in q_lower for k in ["next date", "next hearing", "when is the hearing", "hearing date"]):
        found_date = None
        for o in reversed(orders):
            if o.next_hearing_date:
                found_date = o.next_hearing_date
                for fact in o.verified_facts:
                    if fact.field_name == "next_hearing_date" and fact.evidence:
                        citations.append(CitationChip(
                            document_name=o.doc_id,
                            page_number=fact.evidence.page_number,
                            line_number=fact.evidence.line_number,
                            exact_quote=fact.evidence.matched_quote
                        ))
                answers.append(f"According to court order {o.order_id}, the next hearing date is {found_date}.")
                break
        if not found_date:
            answers.append("The uploaded record does not state a future hearing date.")

    elif any(k in q_lower for k in ["condition", "bail condition", "surety", "bond", "reporting"]):
        found_conds = []
        for o in orders:
            if o.directions_and_conditions:
                found_conds.extend(o.directions_and_conditions)
                for fact in o.verified_facts:
                    if fact.field_name == "directions_and_conditions" and fact.evidence:
                        citations.append(CitationChip(
                            document_name=o.doc_id,
                            page_number=fact.evidence.page_number,
                            line_number=fact.evidence.line_number,
                            exact_quote=fact.evidence.matched_quote
                        ))
        if found_conds:
            answers.append(f"The recorded conditions are: {'; '.join(found_conds)}.")
        else:
            answers.append("No specific conditions or bail directions are recorded in the docket.")

    elif any(k in q_lower for k in ["case number", "cnr", "which court", "court name"]):
        c_names = [o.court_name for o in orders if o.court_name]
        c_nums = [o.case_number for o in orders if o.case_number]
        resp_parts = []
        if c_names:
            resp_parts.append(f"Court: {c_names[0]}")
        if c_nums:
            resp_parts.append(f"Case No: {c_nums[0]}")
        answers.append("; ".join(resp_parts) if resp_parts else "Case details are unrecorded in current documents.")

    else:
        answers.append(
            "The record does not specifically state the answer to this question. "
            "Please check the uploaded orders directly or ask your legal-aid volunteer."
        )

    return AskResponse(
        intent="record_lookup",
        answer=" ".join(answers),
        citations=citations,
        language=language
    )


def answer_case_query(
    case_id: str,
    query: str,
    language: str,
    verified_items: List[Item],
    flags: List[Flag]
) -> LegacyAskResponse:
    """Answers a question or returns fixed refusal for legacy fixtures."""
    lowered = query.lower()
    
    if detect_injection_attempt(query) or any(w in lowered for w in PREDICTION_WORDS):
        return LegacyAskResponse(
            case_id=case_id,
            query=query,
            intent="prediction_or_advice",
            is_refusal=True,
            answer=REFUSAL_MESSAGES.get(language, REFUSAL_MESSAGES["en"]),
            citations=[],
            language=language
        )

    return LegacyAskResponse(
        case_id=case_id,
        query=query,
        intent="record_lookup",
        is_refusal=False,
        answer=f"Verified records organized for query: {query}",
        citations=[item.id for item in verified_items[:2]],
        language=language
    )
