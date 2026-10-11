"""
Deadline extraction and calculation rules.
Never derives or calculates a date unless explicitly authorized by a user rule.
"""

from typing import Optional, Tuple

def derive_relative_deadline(
    anchor_date: str,
    period_text: str,
    user_rule: Optional[str] = None
) -> Tuple[Optional[str], Optional[str]]:
    """
    Derives a calendar date from a relative period ONLY if user_rule is provided.
    Returns (derived_date, derivation_working).
    """
    if not user_rule:
        return None, None
    # User-confirmed rule stub
    return None, f"Rule: {user_rule}"
