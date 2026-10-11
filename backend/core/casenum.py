"""
Case number normalization for Indian courts.
Normalizes variations like 'Cr.A. 123/2024' and 'Criminal Appeal No. 123 of 2024'.
"""

import re

def normalize_case_number(case_num: str) -> str:
    """Normalizes case number string to a standard format."""
    if not case_num:
        return ""
    cleaned = re.sub(r'\s+', ' ', case_num.strip().upper())
    cleaned = cleaned.replace("CRIMINAL APPEAL", "CR.A.")
    cleaned = cleaned.replace(" OF ", "/")
    cleaned = cleaned.replace(" NO. ", " ")
    cleaned = cleaned.replace(" NO ", " ")
    return cleaned
