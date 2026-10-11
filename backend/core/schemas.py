from datetime import datetime, date
from typing import List, Optional, Literal, Dict, Any
from pydantic import BaseModel, Field


class PageText(BaseModel):
    page_num: int
    raw_text: str
    line_offsets: List[Dict[str, Any]] = Field(default_factory=list)


class DocumentContent(BaseModel):
    doc_id: str
    filename: str
    sha256: str
    page_count: int
    pages: List[PageText]
    is_digital_text: bool
    ingested_at: datetime = Field(default_factory=datetime.utcnow)


class RawExtractedCase(BaseModel):
    court_name: Optional[str] = None
    case_number: Optional[str] = None
    cnr: Optional[str] = None
    parties: Optional[str] = None
    order_date: Optional[str] = None  # YYYY-MM-DD
    order_type: Optional[str] = None
    statutory_sections: List[str] = Field(default_factory=list)
    next_hearing_date: Optional[str] = None  # YYYY-MM-DD
    hearing_purpose: Optional[str] = None
    directions_and_conditions: List[str] = Field(default_factory=list)
    source_quotes: Dict[str, str] = Field(
        default_factory=dict,
        description="Verbatim quotes from document supporting each extracted field"
    )


class EvidenceLens(BaseModel):
    page_number: int
    character_start: int
    character_end: int
    line_number: int
    matched_quote: str
    match_type: Literal["exact", "fuzzy", "dropped"]
    confidence_score: float
    rationale: str


class VerifiedFact(BaseModel):
    field_name: str
    value: Any
    is_verified: bool
    evidence: Optional[EvidenceLens] = None


class VerifiedOrder(BaseModel):
    order_id: str
    doc_id: str
    court_name: Optional[str] = None
    case_number: Optional[str] = None
    cnr: Optional[str] = None
    parties: Optional[str] = None
    order_date: Optional[str] = None
    order_type: Optional[str] = None
    statutory_sections: List[str] = Field(default_factory=list)
    next_hearing_date: Optional[str] = None
    hearing_purpose: Optional[str] = None
    directions_and_conditions: List[str] = Field(default_factory=list)
    
    # Audit & Verification breakdown
    verified_facts: List[VerifiedFact] = Field(default_factory=list)
    dropped_facts: List[Dict[str, Any]] = Field(default_factory=list)
    verification_stats: Dict[str, Any] = Field(default_factory=dict)
    
    # Explanations in multiple languages
    plain_explanation_en: Optional[str] = None
    plain_explanation_hi: Optional[str] = None
    plain_explanation_mr: Optional[str] = None
    reply_text: Optional[str] = None


class DiscrepancyFlag(BaseModel):
    rule_id: str  # e.g., R1, R2, R3, R4, R5
    title: str
    description: str
    severity: Literal["low", "medium", "high", "critical"]
    related_orders: List[str] = Field(default_factory=list)
    citations: List[str] = Field(default_factory=list)
    detected_at: datetime = Field(default_factory=datetime.utcnow)


class CitationChip(BaseModel):
    document_name: str
    page_number: int
    line_number: int
    exact_quote: str


class AskResponse(BaseModel):
    intent: Literal["record_lookup", "glossary_lookup", "refusal_legal_advice", "refusal_out_of_bounds"]
    answer: str
    citations: List[CitationChip] = Field(default_factory=list)
    refusal_reason: Optional[str] = None
    language: str = "en"


class TrustReport(BaseModel):
    case_id: str
    total_claims_extracted: int
    total_verified_claims: int
    total_dropped_claims: int
    verification_rate_percent: float
    flag_count: int
    flags: List[DiscrepancyFlag] = Field(default_factory=list)
    zero_hallucination_guarantee_met: bool
    generated_at: datetime = Field(default_factory=datetime.utcnow)
