import json
import os
from typing import Dict, Any, Optional

# Verified multilingual legal terms dictionary (English, Hindi, Marathi)
LEGAL_GLOSSARY: Dict[str, Dict[str, str]] = {
    "bail": {
        "en": "Temporary release of an accused person awaiting trial, usually upon deposit of financial security.",
        "hi": "मुकदमे की सुनवाई पूरी होने तक आरोपी को जमानत पर सशर्त रिहा करना।",
        "mr": "खटल्याचा निकाल लागेपर्यंत आरोपीची जामिनावर केलेली सशर्त तात्पुरती मुक्तता."
    },
    "chargesheet": {
        "en": "Final police investigation report submitted to the magistrate listing alleged crimes and evidence.",
        "hi": "पुलिस द्वारा जांच पूरी होने के बाद अदालत में पेश किया गया आरोप पत्र।",
        "mr": "पोलिसांनी तपास पूर्ण झाल्यानंतर न्यायालयात दाखल केलेला अंतिम दोषारोपपत्र."
    },
    "surety": {
        "en": "A person who undertakes legal responsibility for another's appearance in court.",
        "hi": "जमानतदार - वह व्यक्ति जो अदालत में किसी दूसरे की हाजिरी की कानूनी जिम्मेदारी लेता है।",
        "mr": "जामीनदार - न्यायालयात आरोपीच्या उपस्थितीची कायदेशीर हमी देणारी व्यक्ती."
    },
    "adjournment": {
        "en": "Postponement of a court hearing to a specified future date.",
        "hi": "अदालत की सुनवाई को अगली तय तारीख तक के लिए स्थगित करना।",
        "mr": "न्यायालयातील सुनावणी पुढील ठराविक तारखेपर्यंत पुढे ढकलणे."
    },
    "framing of charges": {
        "en": "Formal stage where the court formally reads out specific offenses the accused must face trial for.",
        "hi": "अदालत द्वारा आरोपी के खिलाफ औपचारिक रूप से आरोपों का तय किया जाना।",
        "mr": "न्यायालयाने आरोपीविरुद्ध औपचारिकपणे आरोप निश्चित करण्याचा टप्पा."
    },
    "interim protection": {
        "en": "Temporary court protection granted until the next hearing date.",
        "hi": "अदालत द्वारा अगली तारीख तक दी गई अंतरिम राहत या सुरक्षा।",
        "mr": "न्यायालयाने पुढील सुनावणीपर्यंत दिलेले तात्पुरते संरक्षण."
    }
}


def explain_legal_term(term: str, lang: str = "en") -> Optional[str]:
    """Retrieves verified explanation from human-reviewed glossary."""
    normalized_term = term.strip().lower()
    for key, translations in LEGAL_GLOSSARY.items():
        if key in normalized_term or normalized_term in key:
            return translations.get(lang, translations.get("en"))
    return None


def generate_plain_language_summary(
    order_type: Optional[str],
    order_date: Optional[str],
    next_date: Optional[str],
    conditions: list,
    lang: str = "en"
) -> str:
    """Generates plain language summary using deterministic reviewed templates."""
    if lang == "hi":
        parts = []
        if order_date:
            parts.append(f"आदेश दिनांक: {order_date}।")
        if order_type:
            parts.append(f"आदेश प्रकार: {order_type}।")
        if next_date:
            parts.append(f"अगली सुनवाई की तारीख: {next_date}।")
        if conditions:
            parts.append(f"शर्तें: {', '.join(conditions)}।")
        return " ".join(parts) if parts else "अभिलेख में विवरण अनुपलब्ध।"
        
    elif lang == "mr":
        parts = []
        if order_date:
            parts.append(f"आदेश दिनांक: {order_date}.")
        if order_type:
            parts.append(f"आदेश प्रकार: {order_type}.")
        if next_date:
            parts.append(f"पुढील सुनावणीची तारीख: {next_date}.")
        if conditions:
            parts.append(f"अटी: {', '.join(conditions)}.")
        return " ".join(parts) if parts else "नोंदीमध्ये तपशील उपलब्ध नाही."

    else:
        # English template
        parts = []
        if order_date:
            parts.append(f"The court passed an order on {order_date}.")
        if order_type:
            parts.append(f"Matter category: {order_type}.")
        if next_date:
            parts.append(f"The next hearing is listed for {next_date}.")
        if conditions:
            parts.append(f"Conditions imposed: {'; '.join(conditions)}.")
        return " ".join(parts) if parts else "No detailed particulars recorded."
