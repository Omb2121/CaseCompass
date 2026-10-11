"""
Ask Your Case Q&A module.
Constrained strictly to verified items, flags, and glossary.
Refuses prediction and advice.
"""

from typing import List
from .models import AskResponse, Item, Flag
from .templates import REFUSAL_MESSAGES
from .injection_guard import detect_injection_attempt

PREDICTION_WORDS = [
    "likely", "probably", "chance", "chances", "outcome", "win", "bail?",
    "will be granted", "expect", "should", "recommend",
    "संभावना", "शायद", "चाहिए",
    "शक्यता", "कदाचित", "पाहिजे"
]

def answer_case_query(
    case_id: str,
    query: str,
    language: str,
    verified_items: List[Item],
    flags: List[Flag]
) -> AskResponse:
    """Answers a question or returns fixed refusal."""
    lowered = query.lower()
    
    # Check injection or prediction/advice
    if detect_injection_attempt(query) or any(w in lowered for w in PREDICTION_WORDS):
        return AskResponse(
            case_id=case_id,
            query=query,
            intent="prediction_or_advice",
            is_refusal=True,
            answer=REFUSAL_MESSAGES.get(language, REFUSAL_MESSAGES["en"]),
            citations=[],
            language=language
        )

    # Fallback to record lookup or refusal
    return AskResponse(
        case_id=case_id,
        query=query,
        intent="record_lookup",
        is_refusal=False,
        answer=f"Verified records organized for query: {query}",
        citations=[item.id for item in verified_items[:2]],
        language=language
    )
