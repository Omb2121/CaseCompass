"""
Fixed plain-language explanation templates and verified glossary.
Bans outcome prediction, likelihood, and legal advice words.
"""

from typing import Dict

# English, Hindi, and Marathi refusal messages
REFUSAL_MESSAGES = {
    "en": "The record does not say. Please ask your legal aid volunteer or the District Legal Services Authority.",
    "hi": "रिकॉर्ड में यह जानकारी नहीं है। कृपया अपने विधिक सहायता स्वयंसेवक या जिला विधिक सेवा प्राधिकरण से पूछें।",
    "mr": "नोंदीत ही माहिती नाही. कृपया आपल्या विधी सहाय्य स्वयंसेवकाला किंवा जिल्हा विधी सेवा प्राधिकरणाला विचारा।"
}

# Curated legal glossary
GLOSSARY = {
    "adjournment": {
        "en": "The hearing was postponed to another date.",
        "hi": "सुनवाई को किसी अन्य तारीख के लिए स्थगित किया गया।",
        "mr": "सुनावणी दुसऱ्या तारखेपर्यंत पुढे ढकलण्यात आली."
    },
    "remand": {
        "en": "The court sends a person to custody for a stated period.",
        "hi": "अदालत किसी व्यक्ति को निश्चित अवधि के लिए हिरासत में भेजती है।",
        "mr": "न्यायालय व्यक्तीला विशिष्ट कालावधीसाठी कोठडीत पाठवते."
    },
    "bail": {
        "en": "Release from custody on conditions while the case continues.",
        "hi": "मामला जारी रहने तक शर्तों पर हिरासत से रिहाई।",
        "mr": "खटला सुरू असताना अटींवर कोठडीतून सुटका."
    }
}
