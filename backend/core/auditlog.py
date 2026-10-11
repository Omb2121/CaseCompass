"""
Tamper-evident audit log with SHA-256 hash chaining.
Covers uploads, confirmations, edits, dismissals, and exports.
"""
import os
import json
import hashlib
from datetime import datetime
from typing import Dict, Any, List, Optional
from backend.core.config import settings


def compute_event_hash(prev_hash: str, event_data: Dict[str, Any]) -> str:
    """Computes SHA-256 hash chained to the previous block hash."""
    canonical_payload = json.dumps(event_data, sort_keys=True)
    combined = f"{prev_hash}:{canonical_payload}".encode("utf-8")
    return hashlib.sha256(combined).hexdigest()


class AuditLogger:
    def __init__(self, log_path: str = settings.AUDIT_LOG_FILE):
        self.log_path = log_path
        os.makedirs(os.path.dirname(self.log_path), exist_ok=True)
        if not os.path.exists(self.log_path):
            with open(self.log_path, "w", encoding="utf-8") as f:
                json.dump([], f)

    def log_event(self, action: str, details: Dict[str, Any]) -> Dict[str, Any]:
        """Appends a cryptographically hash-chained event to the audit ledger."""
        with open(self.log_path, "r", encoding="utf-8") as f:
            try:
                ledger: List[Dict[str, Any]] = json.load(f)
            except Exception:
                ledger = []

        prev_hash = ledger[-1]["current_hash"] if ledger else "GENESIS_HASH_CASECOMPASS"
        
        timestamp = datetime.utcnow().isoformat()
        event_payload = {
            "index": len(ledger) + 1,
            "timestamp": timestamp,
            "action": action,
            "details": details,
            "previous_hash": prev_hash
        }

        current_hash = compute_event_hash(prev_hash, event_payload)
        event_payload["current_hash"] = current_hash

        ledger.append(event_payload)
        with open(self.log_path, "w", encoding="utf-8") as f:
            json.dump(ledger, f, indent=2)

        return event_payload


audit_logger = AuditLogger()
