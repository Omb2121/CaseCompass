"""
SQLite database integration for CaseCompass.
Persists cases, documents, pages, extracted items, flags, audit logs, and settings.
"""

import sqlite3
import os
from typing import Generator

DB_PATH = os.environ.get("CASECOMPASS_DB_PATH", "casecompass.db")

def get_connection(db_path: str = DB_PATH) -> sqlite3.Connection:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

def init_db(db_path: str = DB_PATH) -> None:
    """Initializes SQLite tables and indexes."""
    conn = get_connection(db_path)
    cursor = conn.cursor()

    cursor.executescript("""
    CREATE TABLE IF NOT EXISTS cases (
        id TEXT PRIMARY KEY,
        label TEXT NOT NULL,
        language TEXT NOT NULL DEFAULT 'en',
        case_number TEXT,
        created_at TEXT NOT NULL,
        documents_count INTEGER DEFAULT 0,
        flags_count INTEGER DEFAULT 0,
        metadata_json TEXT
    );

    CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        case_id TEXT NOT NULL,
        filename TEXT NOT NULL,
        order_date TEXT,
        order_type TEXT NOT NULL DEFAULT 'hearing',
        court TEXT,
        case_number TEXT,
        ocr_confidence REAL DEFAULT 1.0,
        file_hash TEXT,
        pages_count INTEGER DEFAULT 1,
        created_at TEXT,
        metadata_json TEXT,
        FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS pages (
        id TEXT PRIMARY KEY,
        document_id TEXT NOT NULL,
        page_no INTEGER NOT NULL,
        text TEXT NOT NULL,
        image_path TEXT,
        FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY,
        document_id TEXT NOT NULL,
        kind TEXT NOT NULL,
        description TEXT NOT NULL,
        date TEXT,
        quote TEXT NOT NULL,
        page_no INTEGER DEFAULT 1,
        verified INTEGER NOT NULL DEFAULT 1,
        derived INTEGER NOT NULL DEFAULT 0,
        user_status TEXT NOT NULL DEFAULT 'unreviewed',
        confidence TEXT NOT NULL DEFAULT 'high',
        match_type TEXT NOT NULL DEFAULT 'exact',
        derivation_working TEXT,
        derivation_rule TEXT,
        metadata_json TEXT,
        FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS flags (
        id TEXT PRIMARY KEY,
        case_id TEXT NOT NULL,
        type TEXT NOT NULL,
        rule_id TEXT NOT NULL,
        severity TEXT NOT NULL,
        message TEXT NOT NULL,
        related_item_ids_json TEXT,
        dismissed INTEGER NOT NULL DEFAULT 0,
        dismissal_note TEXT,
        created_at TEXT,
        FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
        id TEXT PRIMARY KEY,
        case_id TEXT,
        event_type TEXT NOT NULL,
        prev_hash TEXT NOT NULL,
        current_hash TEXT NOT NULL,
        actor TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        payload_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value_json TEXT NOT NULL,
        updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_documents_case_id ON documents(case_id);
    CREATE INDEX IF NOT EXISTS idx_pages_document_id ON pages(document_id);
    CREATE INDEX IF NOT EXISTS idx_items_document_id ON items(document_id);
    CREATE INDEX IF NOT EXISTS idx_flags_case_id ON flags(case_id);
    CREATE INDEX IF NOT EXISTS idx_audit_case_id ON audit_logs(case_id);
    """)

    conn.commit()
    conn.close()

def get_db() -> Generator[sqlite3.Connection, None, None]:
    conn = get_connection()
    try:
        yield conn
    finally:
        conn.close()
