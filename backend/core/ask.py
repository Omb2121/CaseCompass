import re
from typing import List, Optional
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

GLOSSARY_QUESTION_PATTERNS = [
    r'\b(what does|what is|meaning of|define)\s+([a-zA-Z\s]+)\b'
]


def classify_question_intent(question: str) -> str:
    """Classifies user query into safe or refused intent."""
    q_lower = question.lower()

    # 1. Out of Bounds / Legal Advice / Outcome Prediction
    for pat in REFUSAL_PROMPT_PATTERNS:
        if re.search(pat, q_lower):
            return "refusal_legal_advice"

    # 2. Glossary lookup
    for pat in GLOSSARY_QUESTION_PATTERNS:
        if re.search(pat, q_lower):
            return "glossary_lookup"

    # 3. Default: Record Lookup
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

    # Hard Refusal
    if intent == "refusal_legal_advice":
        return AskResponse(
            intent="refusal_legal_advice",
            answer=STANDARDIZED_LEGAL_ADVICE_REFUSAL,
            citations=[],
            refusal_reason="Legal advice or judicial outcome prediction is strictly prohibited.",
            language=language
        )

    # Glossary Lookup
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

    # Grounded Record Lookup
    q_lower = question.lower()
    citations: List[CitationChip] = []
    answers: List[str] = []

    # Check for next hearing date question
    if any(k in q_lower for k in ["next date", "next hearing", "when is the hearing", "hearing date"]):
        found_date = None
        for o in reversed(orders):
            if o.next_hearing_date:
                found_date = o.next_hearing_date
                # Find matching verified evidence
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

    # Check for conditions / bail terms
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

    # Check for case number / CNR
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
        # Fallback record lookup
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
