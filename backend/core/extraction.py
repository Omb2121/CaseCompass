import re
import json
import logging
from typing import Optional, List, Dict, Any
from dateutil import parser as date_parser

from backend.core.schemas import RawExtractedCase, DocumentContent
from backend.core.config import settings

logger = logging.getLogger(__name__)

# Indian court patterns
CNR_REGEX = r'[A-Z]{4}\d{2}[-\s]?\d{6}[-\s]?\d{4}'
CASE_NUM_REGEX = r'(?:Special|Criminal|Civil|Sessions|Bail|Cri\.?\s*Appln\.?|R\.?C\.?C\.?|C\.?C\.?)\s*(?:Case|Application|No\.?)?\s*[:\.]?\s*(\d+[\s\/\-]+\d{2,4})'
DATE_PATTERNS = [
    r'(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})',
    r'(\d{1,2}(?:st|nd|rd|th)?\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[,\s]+\d{4})'
]
STATUTORY_PATTERNS = [
    r'(?:Section|Sec\.?|u\/s|U\/s|under\s+section)\s*(\d+[A-Za-z]?(?:\s*,\s*\d+[A-Za-z]?)*)\s*(?:of\s+)?(IPC|CrPC|CPC|NDPS|POCSO|MCOC|Negotiable\s+Instruments\s+Act)?',
    r'(IPC\s*§?\s*\d+[A-Za-z]?)',
    r'(CrPC\s*§?\s*\d+[A-Za-z]?)'
]


def parse_indian_date(date_str: str) -> Optional[str]:
    """Parses date string into standardized YYYY-MM-DD."""
    if not date_str:
        return None
    try:
        # Standard day-first for Indian dates
        dt = date_parser.parse(date_str, dayfirst=True)
        return dt.strftime("%Y-%m-%d")
    except Exception:
        return None


def extract_with_rules(doc: DocumentContent) -> RawExtractedCase:
    """Mode A: Deterministic Regex and Dictionary Extraction."""
    full_text = " ".join([p.raw_text for p in doc.pages])
    lines = [line.strip() for p in doc.pages for line in p.raw_text.split("\n") if line.strip()]
    
    court_name = None
    case_number = None
    cnr = None
    parties = None
    order_date = None
    order_type = None
    statutory_sections = []
    next_hearing_date = None
    hearing_purpose = None
    directions: List[str] = []
    source_quotes: Dict[str, str] = {}

    # 1. Court Name (usually top lines)
    for line in lines[:8]:
        if any(keyword in line.upper() for keyword in ["COURT", "JUDICIAL MAGISTRATE", "SESSIONS JUDGE", "HIGH COURT", "TRIBUNAL"]):
            court_name = line
            source_quotes["court_name"] = line
            break

    # 2. CNR / Case Number
    cnr_match = re.search(CNR_REGEX, full_text)
    if cnr_match:
        cnr = cnr_match.group(0).strip()
        source_quotes["cnr"] = cnr_match.group(0)

    case_match = re.search(CASE_NUM_REGEX, full_text, re.IGNORECASE)
    if case_match:
        case_number = case_match.group(0).strip()
        source_quotes["case_number"] = case_match.group(0)

    # 3. Parties (e.g. State vs. XYZ or ABC v/s XYZ)
    for line in lines:
        if re.search(r'\b(vs\.?|v\/s|versus|against)\b', line, re.IGNORECASE):
            parties = line
            source_quotes["parties"] = line
            break

    # 4. Order Date
    for line in lines:
        if any(term in line.lower() for term in ["order dated", "dated", "passed on", "date:"]):
            for pat in DATE_PATTERNS:
                m = re.search(pat, line, re.IGNORECASE)
                if m:
                    parsed = parse_indian_date(m.group(0))
                    if parsed:
                        order_date = parsed
                        source_quotes["order_date"] = line
                        break
            if order_date:
                break

    # 5. Order Type
    order_types = ["Bail Application", "Chargesheet", "Framing of Charges", "Interim Protection", "Adjournment", "Final Order", "Summons", "Warrant"]
    for ot in order_types:
        if re.search(r'\b' + re.escape(ot) + r'\b', full_text, re.IGNORECASE):
            order_type = ot
            # grab sentence
            match = re.search(r'([^.\n]*?' + re.escape(ot) + r'[^.\n]*)', full_text, re.IGNORECASE)
            if match:
                source_quotes["order_type"] = match.group(0).strip()
            break

    # 6. Statutory Sections
    for pat in STATUTORY_PATTERNS:
        for m in re.finditer(pat, full_text, re.IGNORECASE):
            sec_text = m.group(0).strip()
            if sec_text not in statutory_sections:
                statutory_sections.append(sec_text)
                if "statutory_sections" not in source_quotes:
                    source_quotes["statutory_sections"] = sec_text

    # 7. Next Hearing Date
    next_keywords = ["stand over to", "next date", "listed on", "posted to", "adjourned to", "call on"]
    for line in lines:
        if any(kw in line.lower() for kw in next_keywords):
            for pat in DATE_PATTERNS:
                m = re.search(pat, line, re.IGNORECASE)
                if m:
                    parsed = parse_indian_date(m.group(0))
                    if parsed:
                        next_hearing_date = parsed
                        source_quotes["next_hearing_date"] = line
                        break
            if next_hearing_date:
                break

    # 8. Directions and conditions
    direction_patterns = [
        r'(?:accused is released on bail|furnish personal bond of Rs\.?\s*[\d,]+)',
        r'(?:surety of like amount)',
        r'(?:shall attend police station[^\.\n]*)',
        r'(?:shall not tamper with evidence[^\.\n]*)'
    ]
    for pat in direction_patterns:
        m = re.search(pat, full_text, re.IGNORECASE)
        if m:
            cond = m.group(0).strip()
            directions.append(cond)
            if "directions_and_conditions" not in source_quotes:
                source_quotes["directions_and_conditions"] = cond

    return RawExtractedCase(
        court_name=court_name,
        case_number=case_number,
        cnr=cnr,
        parties=parties,
        order_date=order_date,
        order_type=order_type,
        statutory_sections=statutory_sections,
        next_hearing_date=next_hearing_date,
        hearing_purpose=hearing_purpose,
        directions_and_conditions=directions,
        source_quotes=source_quotes
    )


def extract_with_llm(doc: DocumentContent) -> RawExtractedCase:
    """Mode B: LLM Adapter (Gemini with zero-hallucination constraint, fallback to Rules)."""
    if not settings.GEMINI_API_KEY or settings.RUNNING_WITHOUT_AI:
        logger.info("Using Mode A Rules extraction (AI disabled or key not provided).")
        return extract_with_rules(doc)

    full_text = "\n".join([f"--- Page {p.page_num} ---\n{p.raw_text}" for p in doc.pages])

    prompt = f"""You are an audited Indian Legal Clerk AI. Your job is to extract structured case items from the provided court order text.
CRITICAL CONSTRAINTS:
1. Extract facts strictly present in the text. DO NOT extrapolate, assume, or invent details.
2. For EVERY extracted fact, you MUST include the exact, verbatim "source_quote" from the document.
3. If a hearing date or bail condition is absent, set the field to null. DO NOT guess.
4. Output must strictly conform to this JSON structure:
{{
  "court_name": string or null,
  "case_number": string or null,
  "cnr": string or null,
  "parties": string or null,
  "order_date": "YYYY-MM-DD" or null,
  "order_type": string or null,
  "statutory_sections": [string],
  "next_hearing_date": "YYYY-MM-DD" or null,
  "hearing_purpose": string or null,
  "directions_and_conditions": [string],
  "source_quotes": {{
    "court_name": "exact verbatim quotation",
    "case_number": "exact verbatim quotation",
    "cnr": "exact verbatim quotation",
    "parties": "exact verbatim quotation",
    "order_date": "exact verbatim quotation",
    "order_type": "exact verbatim quotation",
    "next_hearing_date": "exact verbatim quotation",
    "directions_and_conditions": "exact verbatim quotation"
  }}
}}

COURT ORDER TEXT:
{full_text[:12000]}
"""

    try:
        from google import genai
        client = genai.Client(api_key=settings.GEMINI_API_KEY)
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        resp_text = response.text.strip()
        # Clean markdown code blocks if returned
        if resp_text.startswith("```json"):
            resp_text = resp_text[7:]
        if resp_text.startswith("```"):
            resp_text = resp_text[3:]
        if resp_text.endswith("```"):
            resp_text = resp_text[:-3]

        parsed_json = json.loads(resp_text.strip())
        return RawExtractedCase(**parsed_json)
    except Exception as e:
        logger.warning(f"LLM extraction error: {e}. Falling back to Mode A Rules.")
        return extract_with_rules(doc)
