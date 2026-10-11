"""
Text normalization utilities for CaseCompass.
Performs Unicode NFC normalization, whitespace collapsing,
zero-width removal, and Devanagari digit mapping.
"""

import unicodedata
import re

DEVANAGARI_DIGITS = {
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
}

def normalize_text(text: str) -> str:
    """Normalize text for exact/fuzzy quote verification."""
    if not text:
        return ""
    # Unicode NFC normalization
    norm = unicodedata.normalize("NFC", text)
    # Remove zero-width characters
    norm = re.sub(r'[\u200B-\u200D\uFEFF]', '', norm)
    # Map Devanagari digits to ASCII digits
    for dev_digit, ascii_digit in DEVANAGARI_DIGITS.items():
        norm = norm.replace(dev_digit, ascii_digit)
    # Unify quotes and dashes
    norm = re.sub(r'[\u2018\u2019\u201A\u201B`]', "'", norm)
    norm = re.sub(r'[\u201C\u201D\u201E\u201F]', '"', norm)
    norm = re.sub(r'[\u2013\u2014\u2212]', '-', norm)
    # Collapse multiple whitespace characters into a single space
    norm = re.sub(r'\s+', ' ', norm).strip()
    return norm
