"""
Item review and derivation endpoints.
"""

from fastapi import APIRouter
from backend.core.models import Item, ReviewItemRequest, DeriveDeadlineRequest

router = APIRouter(prefix="/api/items", tags=["items"])

@router.patch("/{item_id}/review", response_model=Item)
def review_item(item_id: str, req: ReviewItemRequest):
    return Item(
        id=item_id,
        document_id="doc-001",
        kind="stated_date",
        description="Reviewed court item",
        date=req.edited_date or "2026-02-14",
        quote="Matter is adjourned to 14.02.2026 for framing of charges.",
        page_no=1,
        verified=True,
        derived=False,
        user_status=req.status,
        confidence="high",
        match_type="exact"
    )

@router.post("/{item_id}/derive", response_model=Item)
def derive_deadline(item_id: str, req: DeriveDeadlineRequest):
    return Item(
        id=item_id,
        document_id="doc-004",
        kind="relative_period",
        description="User-derived compliance deadline",
        date="2026-04-09",
        quote="Parties directed to furnish compliance within four weeks.",
        page_no=1,
        verified=True,
        derived=True,
        user_status="confirmed",
        confidence="high",
        match_type="exact",
        derivation_working="four weeks from 12 March = 9 April",
        derivation_rule=req.user_rule
    )
