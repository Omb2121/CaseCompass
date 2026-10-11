"""
iCalendar (.ics) export generator for verified court dates only.
Excludes unverified dates and predictions.
"""

from typing import List
from .models import Item

def generate_ics_calendar(case_label: str, verified_items: List[Item]) -> str:
    """Generates RFC 5545 iCalendar format containing only verified dates."""
    lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//CaseCompass//Court Calendar//EN",
        "CALSCALE:GREGORIAN"
    ]
    for item in verified_items:
        if item.verified and item.date:
            date_clean = item.date.replace("-", "")
            lines.extend([
                "BEGIN:VEVENT",
                f"SUMMARY:Court Date: {case_label}",
                f"DESCRIPTION:{item.description}\\nQuote: {item.quote}",
                f"DTSTART;VALUE=DATE:{date_clean}",
                f"DTEND;VALUE=DATE:{date_clean}",
                "STATUS:CONFIRMED",
                "END:VEVENT"
            ])
    lines.append("END:VCALENDAR")
    return "\r\n".join(lines)
