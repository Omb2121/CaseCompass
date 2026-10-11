"""
Tamper-evident audit log with SHA-256 hash chaining.
Covers uploads, confirmations, edits, dismissals, and exports.
"""

import hashlib
import json
from typing import Dict, Any, Optional

def compute_event_hash(prev_hash: str, event_data: Dict[str, Any]) -> str:
    """Computes SHA-256 hash chained to the previous block hash."""
    canonical_payload = json.dumps(event_data, sort_keys=True)
    combined = f"{prev_hash}:{canonical_payload}".encode("utf-8")
    return hashlib.sha256(combined).hexdigest()
