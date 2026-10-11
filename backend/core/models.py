"""
CaseCompass Core Pydantic v2 Models.
Adheres strictly to the Master Document, Prompt 0, and Addenda.
Rejects unexpected fields (extra="forbid").
"""

from typing import Any, Dict, List, Literal, Optional
from pydantic import BaseModel, ConfigDict, Field


MANDATORY_DISCLAIMER = (
    "This organizes the record. It is not legal advice and does not predict outcomes."
)


class BaseSchema(BaseModel):
    model_config = ConfigDict(extra="forbid")


class Item(BaseSchema):
    """
    Extracted court order item (deadline, direction, hearing date, or referenced document).
    """
    id: str
    document_id: str
    kind: Literal[
        "stated_date",
        "relative_period",
        "unclear",
        "direction",
        "hearing",
        "referenced_document",
        "other",
    ]
    description: str
    date: Optional[str] = None  # YYYY-MM-DD or null
    quote: str
    page_no: int = 1
    verified: bool
    derived: bool = False
    user_status: Literal["unreviewed", "confirmed", "edited", "rejected"] = "unreviewed"
    confidence: Literal["high", "medium", "low"] = "high"
    match_type: Literal["exact", "fuzzy", "dropped", "manual"] = "exact"
    drop_reason: Optional[str] = None
    derivation_working: Optional[str] = None
    derivation_rule: Optional[str] = None


class Flag(BaseSchema):
    """
    Deterministic rule flag (R1-R12).
    """
    id: str
    case_id: str
    type: Literal["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11", "R12"]
    rule_id: Literal["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11", "R12"]
    severity: Literal["needs_attention", "information"]
    message: str
    related_item_ids: List[str] = Field(default_factory=list)
    dismissed: bool = False
    dismissal_note: Optional[str] = None
    created_at: Optional[str] = None


class Page(BaseSchema):
    """
    Individual page of a court order document.
    """
    id: str
    document_id: str
    page_no: int
    text: str
    image_path: Optional[str] = None


class Document(BaseSchema):
    """
    Uploaded court order or filing.
    """
    id: str
    case_id: str
    filename: str
    order_date: Optional[str] = None  # YYYY-MM-DD or null
    order_type: Literal[
        "hearing",
        "adjournment",
        "bail",
        "remand",
        "notice",
        "summons",
        "interim",
        "final",
        "other",
    ] = "hearing"
    court: Optional[str] = None
    case_number: Optional[str] = None
    ocr_confidence: float = 1.0
    file_hash: Optional[str] = None
    pages_count: int = 1
    created_at: Optional[str] = None


class TimelineEntry(BaseSchema):
    """
    Timeline item for the case chronology.
    """
    id: str
    case_id: str
    document_id: Optional[str] = None
    order_date: Optional[str] = None  # YYYY-MM-DD or null
    order_type: Optional[str] = None
    court: Optional[str] = None
    title: str
    summary_en: str
    summary_hi: Optional[str] = None
    summary_mr: Optional[str] = None
    next_date: Optional[str] = None
    items: List[Item] = Field(default_factory=list)
    flags: List[Flag] = Field(default_factory=list)
    page_no: Optional[int] = None
    quote: Optional[str] = None
    is_undated: bool = False


class Case(BaseSchema):
    """
    Court matter / case profile.
    """
    id: str
    label: str
    language: Literal["en", "hi", "mr"] = "en"
    case_number: Optional[str] = None
    created_at: str
    documents_count: int = 0
    flags_count: int = 0


class TrustReport(BaseSchema):
    """
    System verification accuracy, refusal rate, and trust metrics.
    """
    case_id: Optional[str] = None
    total_items_extracted: int
    items_verified: int
    items_dropped: int
    verification_rate: float
    hallucinated_deadlines: int = 0
    refusal_pass_rate: float
    languages_supported: List[Literal["en", "hi", "mr"]]
    flags_detected: int
    summary: str


class AskResponse(BaseSchema):
    """
    Response schema for 'Ask Your Case'.
    """
    case_id: str
    query: str
    intent: Literal["record_lookup", "glossary_lookup", "prediction_or_advice", "out_of_scope"]
    is_refusal: bool
    answer: str
    reply_text: Optional[str] = None
    citations: List[str] = Field(default_factory=list)
    language: Literal["en", "hi", "mr"]


class SandboxResult(BaseSchema):
    """
    Result of deterministic verification / sandbox execution.
    """
    status: Literal["passed", "failed", "error"]
    verified_count: int
    dropped_count: int
    details: List[Dict[str, str]] = Field(default_factory=list)
    execution_time_ms: float = 0.0


class AuditEntry(BaseSchema):
    """
    Tamper-evident audit log entry with hash chain.
    """
    id: str
    case_id: Optional[str] = None
    event_type: str
    prev_hash: str
    current_hash: str
    actor: str
    timestamp: str
    payload: Dict[str, Any] = Field(default_factory=dict)


class AuditVerificationResult(BaseSchema):
    valid: bool
    total_events: int
    broken_index: Optional[int] = None
    reason: Optional[str] = None


# Operational / Request schemas
class AskRequest(BaseSchema):
    query: Optional[str] = None
    question: Optional[str] = None
    language: Literal["en", "hi", "mr"] = "en"

    def get_query(self) -> str:
        return self.query or self.question or ""


class FlagDismissRequest(BaseSchema):
    note: str


class ReviewItemRequest(BaseSchema):
    status: Literal["confirmed", "edited", "rejected"]
    edited_date: Optional[str] = None
    note: Optional[str] = None


class DeriveDeadlineRequest(BaseSchema):
    user_rule: str


class CaseCreateRequest(BaseSchema):
    label: str
    language: Literal["en", "hi", "mr"] = "en"
    case_number: Optional[str] = None


class SandboxRequest(BaseSchema):
    case_id: Optional[str] = None
    items: List[Item] = Field(default_factory=list)
    pages: List[Page] = Field(default_factory=list)
