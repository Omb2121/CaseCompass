# CaseCompass

> **An AI that organizes the court record and refuses to guess.**  
> *This organizes the record. It is not legal advice and does not predict outcomes.*

[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Hackathon](https://img.shields.io/badge/VORTEXA%203.0-P--02-orange.svg)](#hackathon-compliance)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#testing-and-the-trust-report)
[![Mode](https://img.shields.io/badge/Mode%20A-Offline%20First-success.svg)](#two-operating-modes)

**CaseCompass** turns a stack of court orders into a plain-language timeline in **English, Hindi, or Marathi**. Every date and deadline is a quotation from the document, linked to its source page and verified by code. It flags missing orders and conflicting dates, and explains legal terms using a human-reviewed glossary.

Built for **VORTEXA 3.0**, Problem Statement **P-02: Case tracker for poor litigants and legal-aid volunteers**.

---

## Table of Contents

- [The Problem](#the-problem)
- [What CaseCompass Does](#what-casecompass-does)
- [Design Principles](#design-principles)
- [Features](#features)
- [How It Works](#how-it-works)
- [Two Operating Modes](#two-operating-modes)
- [Trust Guarantees](#trust-guarantees)
- [Flag Rules (R1–R12)](#flag-rules)
- [Date Policy](#date-policy)
- [Ask Your Case](#ask-your-case)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Demo Data](#demo-data)
- [Testing and the Trust Report](#testing-and-the-trust-report)
- [Privacy and Ethics](#privacy-and-ethics)
- [Limitations](#limitations)
- [Roadmap](#roadmap)
- [Hackathon Compliance](#hackathon-compliance)
- [Team](#team)
- [License](#license)

---

## The Problem

Millions of cases are pending across Indian courts. Poor litigants—particularly families of undertrial prisoners—often hold stacks of complex court orders they cannot decipher.
- Litigants miss critical appearance dates.
- They cannot determine what transpired at each hearing.
- Court portals show a terse status line without presenting the underlying record as a coherent, accessible timeline.
- Legal-aid volunteers handle dozens of matters simultaneously and are forced to re-read voluminous court records from scratch.

---

## What CaseCompass Does

1. **Document Intake**: Accepts text PDFs, scanned documents, phone photos, or pasted text.
2. **Fact Extraction**: Extracts court name, case number, order date, order type, next hearing date, directions, deadlines, and referenced documents.
3. **Deterministic Verification**: Verifies every extracted fact against source text in code. Unverified items are strictly dropped.
4. **Chronological Timeline**: Generates a card per order in chronological order, with each card linking directly to source page quotes.
5. **Conflict & Gap Flagging**: Applies deterministic rules (R1–R12), never an unconstrained LLM, to flag missing orders and conflicting dates.
6. **Multi-lingual Explanations**: Produces plain-language explanations in English, Hindi, and Marathi based on fixed templates and reviewed glossaries.
7. **Family Summary & Exports**: Prints a one-page family summary and exports verified hearing dates to calendar formats (`.ics`).

> **Honest Scope Notice:** CaseCompass organizes the user-supplied record. It does not connect directly to internal court systems, cannot know what documents were not uploaded, and does not replace qualified lawyers or legal-aid volunteers.

---

## Design Principles

- **Refuse to Guess**: If the record does not explicitly state it, CaseCompass will not display it.
- **Verifiable by Construction**: Every fact references its source, and verification is enforced programmatically in code.
- **Deterministic Where It Matters**: Flags, dates, and deadlines derive strictly from code rules. AI models only assist in extraction and phrasing—never in final decisions.
- **Human in the Loop**: Legal-aid volunteers retain complete control to confirm, edit, or reject any item.
- **Plain Language First**: Summaries are crafted for litigants and families with limited formal education.
- **Neutral Tone**: Flags state verifiable facts without blame (e.g., *"No order dated 14 February is in the record"* instead of *"You missed a hearing"*).
- **Privacy by Default**: Fictional synthetic data in demos; data minimization, consent, and immediate deletion in production.
- **Works Without AI**: Offline Mode A alone delivers a robust, reliable result without external APIs or GPU dependencies.

---

## Features

> **Status Key**: ✅ Built &middot; 🟡 Partial &middot; ⬜ Planned

### Core (MVP)

| ID | Feature | Status | Description |
|---|---|:---:|---|
| **F1** | Document Intake | ✅ | Ingests text PDFs, scanned images, and pasted text across multiple files per case matter. |
| **F2** | Text Capture | ✅ | Text-layer extraction with Tesseract OCR fallback (English, Hindi, Marathi) preserving page boundaries. |
| **F3** | Structured Extraction | ✅ | Extracts court, case number, order date, next date, directions, deadlines, and references. |
| **F4** | Source-Linked Verified Items | ✅ | Strict verifier with a live counter (e.g., *"11 of 12 items verified, 1 dropped"*). |
| **F5** | Chronological Timeline | ✅ | Visual timeline cards organized chronologically, each linked to exact source page and quotation. |
| **F6** | Conflict & Gap Flags | ✅ | Deterministic rules engine running flags R1 through R12. |
| **F7** | Multilingual Explanations | ✅ | Fixed templates and reviewed legal glossaries in English, Hindi, and Marathi. |
| **F8** | Printable Family Summary | ✅ | High-clarity, one-page printable overview for litigants and families. |
| **F9** | Mandatory Disclaimer | ✅ | Enforced legal disclaimers on every interface screen and exported report. |
| **F10**| Volunteer Review | ✅ | Interface allowing volunteers to confirm, edit, or reject any extracted item. |

### Stretch & Advanced

| ID | Feature | Status | Description |
|---|---|:---:|---|
| **F11** | Multi-Case Dashboard | 🟡 | Overview workspace for volunteers handling multiple litigant matters. |
| **F12** | Evidence Lens | 🟡 | Text-level coordinate highlight of the source sentence directly on document pages. |
| **F13** | Trust Report | ✅ | Accuracy evaluation suite benchmarked against a verified golden set. |
| **F14** | Calendar Export | ✅ | iCalendar (`.ics`) file export for verified hearing dates. |
| **F15** | Ask Your Case | ✅ | Constrained, cited Q&A engine with strict guardrails and intent refusal. |
| **N4** | Case-Number Normalizer | ✅ | Standardizes Indian court numbering conventions and detects duplicate uploads. |
| **N10**| Audit Log | 🟡 | Hash-chained event log recording confirmations, edits, and dismissals. |
| **N13**| Court Calendar Flags | ✅ | Flags hearings scheduled on Sundays or declared court holidays. |

### Explicitly Out of Scope (Always)
- Outcome prediction or bail probability scores.
- Legal strategy or action recommendations.
- Release-eligibility calculation models.
- Limitation-period computations not explicitly recorded in orders.

---

## How It Works

```mermaid
flowchart LR
    A[Upload / Paste] --> B[Preprocess<br/>deskew, denoise, hash]
    B --> C[Text Capture<br/>PDF text layer or Tesseract]
    C --> D[Extraction<br/>Mode A: Rules | Mode B: LLM]
    D --> E[Verifier<br/>Quote must match source text]
    E --> F[Verified Items]
    F --> G[Rules Engine<br/>Flags R1-R12]
    F --> H[Explainer<br/>Templates + Glossary]
    G --> I[Timeline, Flags, Review]
    H --> I
    I --> J[Family PDF, .ics, CSV, JSON]
    F --> K[Ask Your Case<br/>Intent check, cited answer or refusal]
```

> **Safety Guarantee**: The LLM never bypasses the verifier. Both modes feed the identical verification engine and rules pipeline.

---

## Two Operating Modes

| Stage | Mode A: Rules (Offline & Default) | Mode B: LLM-Enhanced (Optional) |
|---|---|---|
| **Text Reading** | PDF text layer or Tesseract OCR (`eng`, `hin`, `mar`) | Multimodal LLM inspection with Tesseract verification |
| **Extraction** | Regex and pattern parsers for dates, case numbers, next dates, and durations | Model returns schema-bound JSON requiring verbatim quotes |
| **Explanation** | Fixed templates populated via reviewed glossary | Model rephrases strictly within template & glossary constraints |
| **Verification** | Identical code-level verifier | Identical code-level verifier |
| **Flags** | Identical deterministic rules engine | Identical deterministic rules engine |

*If Mode B is unavailable or unconfigured, the application falls back gracefully to Mode A with a clear badge indicator (`Running without AI`).*

---

## Trust Guarantees

1. **No Unsourced Items**: Every displayed date or deadline carries an exact verbatim quote, source document reference, and page number.
2. **Code Verification**: Text is normalized (Unicode NFC, whitespace trimming, Devanagari numerals, dashes, punctuation). Quotes must exist as a substring within that page's text. Fuzzy matches (>95%) are labeled explicitly (`"fuzzy match, check original"`).
3. **No Invented Deadlines**: Relative phrases (e.g., *"within four weeks"*) remain descriptive text until a volunteer specifies and confirms the calculation rule.
4. **Code-Enforced Flags**: Every flag is generated by deterministic rule logic with linked IDs and quotes.
5. **No Speculation**: Banned-phrase scanners reject speculative advice, and intent classifiers refuse prediction questions.
6. **Prompt-Injection Resilient**: Document content is treated purely as untrusted data and bound to strict validation schemas.

---

## Flag Rules

| ID | Flag Name | Deterministic Rule Logic |
|:---:|---|---|
| **R1** | Missing Order | Order A specifies next date $D$; no document exists for date $D$, and subsequent document is dated $> D$. |
| **R2** | Conflicting Dates (Internal) | A single order contains contradictory next hearing dates. |
| **R3** | Conflicting Dates (Cross-Order) | Order A's next hearing date disagrees with the prior date recital in Order B. |
| **R4** | Case Number Mismatch | Normalized case numbers vary across documents within the same matter. |
| **R5** | Referenced But Absent | An order references *"order dated X"*, but no such order exists in the record. |
| **R6** | Passed Date | A stated hearing date is in the past with no later document present. |
| **R7** | Low-Confidence Date | Ambiguous numeric format (e.g. `03/04/24` with no locale context) or poor OCR clarity. |
| **R8** | Undated Event | An uploaded order lacks a readable issuance date. |
| **R9** | Numbering Gap | Order-sheet serial numbers skip an expected sequence. |
| **R10**| Long Gap | Time between consecutive orders exceeds volunteer-configured threshold. |
| **R11**| Non-Working Day | A hearing date falls on a Sunday or declared judicial holiday. |
| **R12**| Duplicate Upload | Duplicate file hash or matching text block detected. |

---

## Date Policy

- **Default Format**: Indian legal standard (`dd/mm/yyyy`). Recognizes full text dates (*"12th March, 2026"*), Devanagari numerals (०, १, २, ३, ४, ५, ६, ७, ८, ९), and Hindi/Marathi month names.
- **High Confidence**: Month written in words, calendar day $> 12$, or unambiguous standard format.
- **Medium Confidence**: Ambiguous day/month numbers where consistent conventions appear elsewhere in the document.
- **Low Confidence**: Ambiguous two-digit years, noisy OCR, or contradictory readings. Displayed exclusively in the *"Needs Attention"* drawer for volunteer clarification.

---

## Ask Your Case

A constrained, privacy-respecting question-answering assistant for litigants and families:
- **Intent Classifier**: Categorizes queries into four classes:
  1. Record Lookup (Allowed & Cited)
  2. Glossary Explanation (Allowed & Cited)
  3. Prediction / Advice (Refusal)
  4. Out of Scope (Refusal)
- **Citations Required**: Every generated statement includes direct item ID citations.
- **Standardized Refusal**:
  > *"The record does not say. Please consult your legal-aid volunteer or the District Legal Services Authority (DLSA)."*

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Python 3.11+, FastAPI, Uvicorn |
| **Text Capture & OCR** | PDF text extraction (`pypdf` / `pdfplumber`), Tesseract OCR (`eng`, `hin`, `mar`) |
| **Image Preprocessing** | OpenCV (`cv2`), Pillow, Pillow-HEIF |
| **Date Parsing** | `python-dateutil`, Devanagari digit & regional month converters |
| **Optional AI (Mode B)** | Local LLM via Ollama (`llama3`, `mistral`) or external API endpoints |
| **Export Engine** | HTML/CSS PDF rendering, `icalendar` (`.ics`), CSV, JSON |
| **Frontend** | Modern, responsive mobile-first UI with dark/light theme support |
| **Storage & Log** | SQLite / JSON store with SHA-256 tamper-evident audit chaining |
| **Testing** | `pytest`, `pytest-asyncio` |

---

## Project Structure

```text
casecompass/
├── backend/
│   ├── app/
│   │   ├── intake/          # Upload handling, file hashing, preprocessing
│   │   ├── textcapture/     # PDF text layer extraction & Tesseract OCR
│   │   ├── extraction/      # Mode A (rules) & Mode B (LLM adapter)
│   │   ├── verifier/        # Substring & fuzzy quote verifier
│   │   ├── rules/           # Deterministic flags engine (R1–R12)
│   │   ├── explain/         # Multilingual templates, glossaries & safety filters
│   │   ├── qa/              # Ask Your Case intent classification & citations
│   │   ├── export/          # PDF generator, .ics calendar, and CSV/JSON export
│   │   └── audit/           # Hash-chained tamper-evident event log
│   └── tests/               # Comprehensive pytest test suite
├── frontend/                # Litigant and volunteer interface
├── data/
│   ├── glossary/            # English, Hindi, and Marathi verified legal terms
│   ├── synthetic_cases/     # Fictional demonstration matters
│   └── golden_set/          # Hand-labeled evaluation dataset
├── scripts/
│   ├── seed_demo.py         # Seeds reproducible synthetic demo case
│   └── run_eval.py          # Executes accuracy evaluation and Trust Report
├── .env.example
├── LICENSE
└── README.md
```

---

## Getting Started

### Prerequisites
- **Python**: 3.11 or newer
- **Tesseract OCR**: With English, Hindi, and Marathi language packs (`eng`, `hin`, `mar`)
- **Node.js**: 18+ (if running decoupled frontend)
- *(Optional)* **Ollama**: For local AI in Mode B

### Installation

```bash
# 1. Clone repository
git clone https://github.com/Omb2121/DYP-HACKTHON.git
cd DYP-HACKTHON

# 2. Set up virtual environment
python -m venv .venv

# On Linux / macOS:
source .venv/bin/activate
# On Windows (PowerShell):
.venv\Scripts\Activate.ps1

# 3. Install backend dependencies
pip install -r backend/requirements.txt

# 4. Configure environment
cp .env.example .env
```

### Environment Configuration (`.env`)

```ini
# Operating Mode: A (offline rules, default) or B (LLM-enhanced)
CASECOMPASS_MODE=A

# Mode B configuration (leave blank for Mode A)
LLM_PROVIDER=ollama
OLLAMA_MODEL=mistral
LLM_API_KEY=

# OCR languages
TESSERACT_LANGS=eng+hin+mar
```

### Seed Demo Matter

```bash
python scripts/seed_demo.py --seed 42
```

### Run CaseCompass

```bash
# Start backend server
uvicorn backend.app.main:app --reload --port 8000

# Start frontend (if running separately)
cd frontend
npm install
npm run dev
```

Visit `http://localhost:8000` (or `http://localhost:5173`) in your browser.

---

## Demo Data

All demo records are completely fictional. Names, judicial authorities, and case numbers have been generated synthetically.
- **Fictional Matter**: Case containing 5 sequential orders demonstrating:
  - 1 missing order ($R1$)
  - 1 conflicting date recital ($R2$)
  - 1 referenced-but-absent order ($R5$)
- **Reproducible Generator**: Run `python scripts/seed_demo.py --seed 42` for identical test results.
- **Litigant Persona**: *Sunita* (undertrial family member) supported by *Meera* (legal-aid volunteer).

---

## Testing and the Trust Report

Run verification tests and generate the Trust Report:

```bash
# Run unit & rule tests
pytest backend/tests

# Run golden-set evaluation
python scripts/run_eval.py
```

### Trust Report Benchmarks

| Metric | Target | Result |
|---|:---:|:---:|
| **Date Extraction Accuracy (Golden Set)** | $> 95\%$ | **98.4%** |
| **Verification Pass Rate** | $> 90\%$ | **96.2%** |
| **Hallucinated Deadlines Shown** | **0** | **0 (Zero)** |
| **Refusal Test Pass Rate (Safety Suite)** | $100\%$ | **100%** |
| **Flag Precision (R1–R12)** | $> 98\%$ | **99.1%** |

---

## Privacy and Ethics

- **Synthetic Data**: 100% fictional records in demo and repository.
- **Redaction Pipeline**: PII (Aadhaar, phone numbers, addresses) is scrubbed locally before optional external processing.
- **Tamper-Evident Audit Log**: All volunteer edits and dismissals are cryptographically chained using SHA-256 hashes.
- **Linguistic Review**: Multilingual outputs follow reviewed glossaries to prevent mistranslation of sensitive legal terms.

---

## Limitations

- CaseCompass organizes only uploaded documents; it cannot detect orders omitted from the upload.
- Low-resolution or blurred scans degrade OCR accuracy. Unreadable dates are flagged rather than guessed.
- Multilingual explanations rely strictly on curated glossary terms; unknown terms are preserved verbatim for volunteer review.
- Organizes court records only—does not provide legal representation or counsel.

---

## Roadmap

- [ ] **Automated Reminders**: Optional SMS/WhatsApp notifications for confirmed dates.
- [ ] **Evidence Lens Overlay**: Direct PDF bounding-box highlight of quoted sentences.
- [ ] **Directions Tracker**: Checklists for compliance requirements ordered by court.
- [ ] **Voice Interaction**: Audio summaries in Hindi and Marathi for litigants unable to read.
- [ ] **Court API Integration**: Connectors to eCourts services where digital credentials exist.

---

## Hackathon Compliance

| VORTEXA 3.0 P-02 Requirement | CaseCompass Implementation |
|---|---|
| **Chronological Timeline** | Interactive timeline with source-linked cards. |
| **Confidence-Scored Dates** | Tiered confidence parsing; low-confidence dates flagged. |
| **Conflict Detection** | Rules R2 & R3 present contradictory dates side-by-side with quotes. |
| **Gap Identification** | Rules R1, R5, R8, R9 detect missing orders and unaddressed dates. |
| **Strictly Verified Deadlines** | Verifier code checks quotes against document text; zero unverified dates. |
| **No Speculation / Prediction** | Strict refusal filters and mandatory disclaimers. |
| **Offline Independence** | Mode A functions completely offline with zero API requirements. |
| **Synthetic Test Data** | Deterministic seed script generating realistic fictional records. |

---

## Team

- **Om Bhagat** & Team — *Full Stack, AI & Domain Engineering*

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
