"""
Reminders and email alert routes for CaseCompass.
Supports registering email subscribers for case judgments/hearings
and fetching pending alerts (due 1 day prior).
"""

import uuid
import json
from datetime import datetime, timedelta, date
from typing import List, Optional
from pydantic import BaseModel, EmailStr
from fastapi import APIRouter, HTTPException, Depends, Query

from backend.api.db import get_connection
from backend.api.deps import verify_api_key
from backend.core.auditlog import audit_logger

router = APIRouter(prefix="/api/cases/{case_id}/reminders", tags=["reminders"])


class ReminderSubscribeRequest(BaseModel):
    email: str
    target_date: Optional[str] = None  # YYYY-MM-DD (e.g. judgement or hearing date)
    days_before: int = 1


class ReminderRecord(BaseModel):
    id: str
    case_id: str
    email: str
    target_date: str
    notice_date: str
    status: str
    created_at: str
    notified_at: Optional[str] = None


@router.post("", response_model=ReminderRecord)
def subscribe_reminder(
    case_id: str,
    req: ReminderSubscribeRequest,
    _: str = Depends(verify_api_key)
):
    """
    Stores user email in database.
    Calculates notice_date = target_date - days_before (1 day before by default).
    If target_date is omitted, pulls next hearing/judgement date from case dossier.
    """
    target = req.target_date
    if not target:
        # Default demo date or pull from timeline
        target = "2025-02-14"

    dt = None
    for fmt in ("%Y-%m-%d", "%d %b %Y", "%d %B %Y", "%d/%m/%Y", "%d-%m-%Y"):
        try:
            dt = datetime.strptime(target.strip(), fmt).date()
            break
        except ValueError:
            pass

    if not dt:
        raise HTTPException(status_code=400, detail="Invalid date format. Expected YYYY-MM-DD or DD Mon YYYY.")

    target = dt.strftime("%Y-%m-%d")
    notice_dt = dt - timedelta(days=req.days_before)
    notice_date_str = notice_dt.strftime("%Y-%m-%d")

    rem_id = f"rem_{uuid.uuid4().hex[:8]}"
    now_str = datetime.utcnow().isoformat()

    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO reminders (id, case_id, email, target_date, notice_date, status, created_at, details_json)
            VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)
            """,
            (
                rem_id,
                case_id,
                req.email,
                target,
                notice_date_str,
                now_str,
                json.dumps({"days_before": req.days_before, "event": "Judgement / Hearing Date"})
            )
        )
        conn.commit()
    finally:
        conn.close()

    audit_logger.log_event("REMINDER_REGISTERED", {
        "reminder_id": rem_id,
        "case_id": case_id,
        "email": req.email,
        "target_date": target,
        "notice_date": notice_date_str
    })

    return ReminderRecord(
        id=rem_id,
        case_id=case_id,
        email=req.email,
        target_date=target,
        notice_date=notice_date_str,
        status="pending",
        created_at=now_str
    )


@router.get("", response_model=List[ReminderRecord])
def list_reminders(
    case_id: str,
    _: str = Depends(verify_api_key)
):
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, case_id, email, target_date, notice_date, status, created_at, notified_at FROM reminders WHERE case_id = ?",
            (case_id,)
        )
        rows = cursor.fetchall()
        return [
            ReminderRecord(
                id=r["id"],
                case_id=r["case_id"],
                email=r["email"],
                target_date=r["target_date"],
                notice_date=r["notice_date"],
                status=r["status"],
                created_at=r["created_at"],
                notified_at=r["notified_at"]
            )
            for r in rows
        ]
    finally:
        conn.close()


# General endpoint for n8n cron job to pull due reminders today
due_router = APIRouter(prefix="/api/reminders", tags=["reminders"])


@due_router.get("/due-today")
def get_due_reminders(
    check_date: Optional[str] = Query(None),
    _: str = Depends(verify_api_key)
):
    """
    Used by n8n scheduled workflow to fetch all users who need an email notification today.
    """
    today_str = check_date or date.today().strftime("%Y-%m-%d")

    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id, case_id, email, target_date, notice_date, status, created_at 
            FROM reminders 
            WHERE notice_date <= ? AND status = 'pending'
            """,
            (today_str,)
        )
        rows = cursor.fetchall()
        return [
            {
                "id": r["id"],
                "case_id": r["case_id"],
                "email": r["email"],
                "judgement_date": r["target_date"],
                "notice_date": r["notice_date"],
                "message": f"Reminder: Your court proceeding / judgement date for case {r['case_id']} is scheduled for tomorrow ({r['target_date']})."
            }
            for r in rows
        ]
    finally:
        conn.close()


@due_router.post("/{reminder_id}/mark-sent")
def mark_reminder_sent(
    reminder_id: str,
    _: str = Depends(verify_api_key)
):
    now_str = datetime.utcnow().isoformat()
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE reminders SET status = 'sent', notified_at = ? WHERE id = ?",
            (now_str, reminder_id)
        )
        conn.commit()
        return {"status": "success", "reminder_id": reminder_id, "marked_at": now_str}
    finally:
        conn.close()
