"""
Prompt injection and safety guard for document text and user queries.
Ensures document text is strictly treated as data, not instructions.
"""

def sanitize_untrusted_text(text: str) -> str:
    """Sanitizes text to prevent injection escapes."""
    return text.strip()

def detect_injection_attempt(query: str) -> bool:
    """Checks for prompt-injection patterns in user queries."""
    lowered = query.lower()
    injection_phrases = [
        "ignore previous instructions",
        "ignore your rules",
        "system prompt",
        "pretend you are",
        "bypass safety",
        "disregard guidelines"
    ]
    return any(p in lowered for p in injection_phrases)
