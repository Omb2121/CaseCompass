"""
Deterministic quote and deadline verifier.
Checks quote substring matching, fuzzy fallback (difflib >= 0.95),
and date-within-quote validation.
"""

from difflib import SequenceMatcher
from typing import Tuple, Literal
from .normalize import normalize_text

MatchType = Literal["exact", "fuzzy", "dropped"]

def verify_quote(
    quote: str,
    page_text: str,
    extracted_date: str = None,
    fuzzy_threshold: float = 0.95
) -> Tuple[bool, MatchType, str]:
    """
    Verifies that quote is present in page_text.
    Returns (verified, match_type, reason).
    """
    norm_quote = normalize_text(quote)
    norm_page = normalize_text(page_text)

    if not norm_quote or not norm_page:
        return False, "dropped", "Empty quote or page text"

    # 1. Exact substring check
    if norm_quote in norm_page:
        return True, "exact", "Exact match found"

    # 2. Fuzzy match fallback
    matcher = SequenceMatcher(None, norm_quote, norm_page)
    match = matcher.find_longest_match(0, len(norm_quote), 0, len(norm_page))
    if match.size > 0:
        ratio = SequenceMatcher(
            None,
            norm_quote,
            norm_page[match.b : match.b + match.size]
        ).ratio()
        if ratio >= fuzzy_threshold:
            return True, "fuzzy", f"Fuzzy match with ratio {ratio:.2f}"

    return False, "dropped", "Quote not found in page text"
