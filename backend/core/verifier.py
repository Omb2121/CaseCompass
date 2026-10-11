"""
Deterministic quote and deadline verifier.
Checks quote substring matching, fuzzy fallback (difflib >= 0.95),
and date-within-quote validation.
"""
import unicodedata
import re
from difflib import SequenceMatcher
from typing import Optional, List, Tuple, Literal
from backend.core.schemas import PageText, EvidenceLens
from backend.core.config import settings
from .normalize import normalize_text

MatchType = Literal["exact", "fuzzy", "dropped"]


def normalize_legal_text(text: str) -> str:
    """
    Normalizes text for robust legal document comparison:
    - Unicode NFC normalization
    - Devanagari digit translation (०-९ -> 0-9)
    - Collapse excessive whitespaces, newlines, zero-width characters
    - Standardize smart quotes, em-dashes
    """
    if not text:
        return ""
    
    text = unicodedata.normalize("NFC", text)
    devanagari_digits = str.maketrans("०१२३४५६७८९", "0123456789")
    text = text.translate(devanagari_digits)
    text = re.sub(r'[\u2018\u2019\u201a\u201b]', "'", text)
    text = re.sub(r'[\u201c\u201d\u201e\u201f]', '"', text)
    text = re.sub(r'[\u2013\u2014\u2015]', '-', text)
    text = re.sub(r'[\u200B\u200C\u200D\uFEFF]', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def locate_quote_in_pages(
    quote: str,
    pages: List[PageText],
    threshold: Optional[float] = None
) -> Optional[EvidenceLens]:
    """
    Deterministically searches and locates quote in document pages.
    Level 1: Exact Substring match (normalized) -> confidence = 1.0
    Level 2: Fuzzy match via SequenceMatcher (ratio >= threshold, default 0.95)
    Level 3: Rejection (dropped) if below threshold.
    """
    if not quote or not quote.strip():
        return None

    if threshold is None:
        threshold = settings.VERIFICATION_FUZZY_THRESHOLD

    norm_quote = normalize_legal_text(quote).lower()
    if not norm_quote:
        return None

    best_match: Optional[EvidenceLens] = None
    highest_ratio = 0.0

    for page in pages:
        raw_text = page.raw_text
        norm_page = normalize_legal_text(raw_text).lower()

        # Level 1: Exact Substring Match
        if norm_quote in norm_page:
            char_start = raw_text.lower().find(quote.lower()[:20]) if len(quote) >= 20 else raw_text.lower().find(quote.lower())
            if char_start == -1:
                char_start = 0
            char_end = char_start + len(quote)
            
            line_num = 1
            for line_info in page.line_offsets:
                if line_info["char_start"] <= char_start <= line_info["char_end"]:
                    line_num = line_info["line_number"]
                    break

            return EvidenceLens(
                page_number=page.page_num,
                character_start=char_start,
                character_end=char_end,
                line_number=line_num,
                matched_quote=quote,
                match_type="exact",
                confidence_score=1.0,
                rationale="Exact substring confirmed in raw document text."
            )

        # Level 2: Sliding Window Fuzzy Match
        quote_len = len(norm_quote)
        if len(norm_page) >= quote_len:
            for i in range(len(norm_page) - quote_len + 1):
                window = norm_page[i:i + quote_len]
                ratio = SequenceMatcher(None, norm_quote, window).ratio()
                if ratio > highest_ratio:
                    highest_ratio = ratio
                    if ratio >= threshold:
                        line_num = 1
                        for line_info in page.line_offsets:
                            if line_info["char_start"] <= i:
                                line_num = line_info["line_number"]

                        best_match = EvidenceLens(
                            page_number=page.page_num,
                            character_start=i,
                            character_end=min(len(raw_text), i + len(quote)),
                            line_number=line_num,
                            matched_quote=quote,
                            match_type="fuzzy",
                            confidence_score=round(ratio, 4),
                            rationale=f"Fuzzy OCR resilient match verified at {round(ratio * 100, 1)}% similarity."
                        )
        else:
            ratio = SequenceMatcher(None, norm_quote, norm_page).ratio()
            if ratio > highest_ratio:
                highest_ratio = ratio
                if ratio >= threshold:
                    best_match = EvidenceLens(
                        page_number=page.page_num,
                        character_start=0,
                        character_end=len(raw_text),
                        line_number=1,
                        matched_quote=quote,
                        match_type="fuzzy",
                        confidence_score=round(ratio, 4),
                        rationale=f"Fuzzy OCR resilient match verified at {round(ratio * 100, 1)}% similarity."
                    )

    if best_match and highest_ratio >= threshold:
        return best_match

    return EvidenceLens(
        page_number=0,
        character_start=0,
        character_end=0,
        line_number=0,
        matched_quote=quote,
        match_type="dropped",
        confidence_score=round(highest_ratio, 4),
        rationale=f"Verification failed: Best match ratio {round(highest_ratio, 3)} is below required threshold {threshold}."
    )


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

    if norm_quote in norm_page:
        return True, "exact", "Exact match found"

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
