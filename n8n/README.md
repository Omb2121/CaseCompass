# CaseCompass Feature 2: Secure WhatsApp Front Door Using n8n & FastAPI

This directory contains importable n8n workflows and configuration guides for **WhatsApp** and **Telegram** Front Door intake channels.

---

## 1. Overview & Architecture (WhatsApp Front Door)

The WhatsApp Front Door provides a direct, accessible intake channel for authorized legal-aid litigants and volunteers to:
1. Submit court order photographs (PNG/JPEG)
2. Upload digital/scanned court order documents (PDF)
3. Ask questions about the configured case dossier in plain language (English, Hindi, Marathi)
4. Receive backend-verified, zero-hallucination responses directly in WhatsApp

### System Architecture
```
WhatsApp User (Litigant / Volunteer)
  │
  ▼
WhatsApp Cloud API / Twilio Webhook
  │
  ▼  (HTTPS Webhook via Public Tunnel / URL)
n8n WhatsApp Trigger (Webhook node: /webhook/whatsapp-front-door)
  │
  ▼
Config & Phone Number Allowlist Check ("Allowed sender?")
  │
  ├── [Unauthorized] ──► Ignored silently (Zero case exposure)
  │
  └── [Authorized] ──► Switch Message Type
                         │
                         ├── Photo / Document:
                         │     1. Fetch Media URL from WhatsApp Cloud API
                         │     2. Download binary media stream
                         │     3. HTTP Request: POST /api/cases/{case_id}/documents
                         │     4. HTTP Request: POST /api/cases/{case_id}/process?mode=A
                         │     5. WhatsApp Reply: Returns exact backend reply_text
                         │
                         ├── Text Question:
                         │     1. HTTP Request: POST /api/cases/{case_id}/ask
                         │     2. WhatsApp Reply: Returns exact backend reply_text / refusal
                         │
                         └── Unsupported Type:
                               1. WhatsApp Reply: Safe operational notice
```

**Non-Negotiable Rule**: All legal-document interpretation, fact extraction, verification, outcome refusal guardrails, and reply wording remain strictly inside the CaseCompass FastAPI backend. n8n acts exclusively as a secure transport and orchestration layer.

---

## 2. Files Provided

- **[`n8n/wf2-whatsapp-front-door.json`](wf2-whatsapp-front-door.json)**: Importable n8n workflow for **WhatsApp Front Door** (Meta Cloud API & Twilio compatible).
- **[`n8n/wf2-telegram-front-door.json`](wf2-telegram-front-door.json)**: Importable n8n workflow for **Telegram Front Door** (if multi-channel intake is desired).

---

## 3. WhatsApp Integration Options in n8n

### Option A: Meta WhatsApp Cloud API (Recommended official API)
1. Sign in to [developers.facebook.com](https://developers.facebook.com).
2. Create an App of type **Business** and add the **WhatsApp** product.
3. In WhatsApp > Getting Started, obtain:
   - **Temporary Access Token** (or create a System User Permanent Access Token).
   - **Phone Number ID** (e.g., `105938472910...`).
   - Test recipient phone number (must be verified in development).
4. Configure the Webhook in Meta App Dashboard:
   - Callback URL: `https://<YOUR_TUNNEL_URL>/webhook/whatsapp-front-door`
   - Verify Token: Any string configured for the challenge handshake.
   - Subscribed Webhook Fields: `messages`.

### Option B: Twilio for WhatsApp
1. In Twilio Console, navigate to **Messaging** > **Try WhatsApp**.
2. Activate your WhatsApp Sandbox.
3. Under Sandbox Settings, set the incoming webhook URL to:
   `https://<YOUR_TUNNEL_URL>/webhook/whatsapp-front-door` with HTTP POST.

---

## 4. Configuring Credentials in n8n

### A. WhatsApp Cloud API Token (Header Auth)
1. In n8n, navigate to **Credentials** > **New Credential**.
2. Select **Header Auth**.
3. Configure:
   - **Name**: `Authorization`
   - **Value**: `Bearer <YOUR_WHATSAPP_SYSTEM_USER_TOKEN>`
4. Name the credential: `WhatsApp Cloud API Token`.

### B. CaseCompass Backend API Key (Header Auth)
1. In n8n, navigate to **Credentials** > **New Credential**.
2. Select **Header Auth**.
3. Configure:
   - **Name**: `X-API-Key`
   - **Value**: Value of `CASECOMPASS_API_KEY` from your `.env` file (e.g. `casecompass-demo-secret-key-123`).
4. Name the credential: `CaseCompass Backend API Key`.

---

## 5. Importing & Activating the Workflow in n8n

1. In n8n (opened in Chrome), navigate to **Workflows**.
2. Click **... (top right)** > **Import from File**.
3. Select `n8n/wf2-whatsapp-front-door.json`.
4. Double-click the **Config** node and set:
   - `ALLOWED_PHONE_NUMBER`: Your authorized mobile number including country code (e.g., `919876543210`).
   - `WHATSAPP_PHONE_NUMBER_ID`: Your Meta Phone Number ID.
   - `BACKEND_BASE_URL`: `http://127.0.0.1:8000` (or `http://host.docker.internal:8000` if n8n is running in Docker).
   - `DEFAULT_CASE_ID`: `case-sunita-001`.
   - `DEFAULT_LANGUAGE`: `en` (or `hi`, `mr`).
5. Link the credentials to the corresponding HTTP Request nodes:
   - `Upload`, `Process`, `Ask` -> `CaseCompass Backend API Key`.
   - `Fetch Media URL`, `Download Media`, `WhatsApp Reply for document responses`, `WhatsApp Reply for question responses`, `WhatsApp Reply for unsupported message` -> `WhatsApp Cloud API Token`.
6. Click **Save** and toggle the workflow to **Active**.

---

## 6. Webhook & Public Tunnel Setup

WhatsApp requires a publicly reachable HTTPS webhook address.

### Using Cloudflare Tunnel
```bash
cloudflared tunnel --url http://localhost:5678
```

### Using ngrok
```bash
ngrok http 5678
```

Copy the generated HTTPS URL (e.g., `https://xyz.ngrok-free.app`) and set it in your Meta App Webhook / Twilio Sandbox configuration:
```
https://xyz.ngrok-free.app/webhook/whatsapp-front-door
```

---

## 7. Testing & Verification

1. **Question Lookup**: Send `When is the next hearing?` on WhatsApp.
   - The bot responds with the verified next hearing date and courtroom citations from the docket record.
2. **Outcome Prediction Refusal**: Send `Will the accused get bail?` on WhatsApp.
   - The bot returns the fixed refusal: *"CaseCompass organizes the verifiable record. It is not legal advice and cannot predict judicial outcomes or bail chances. Please consult a qualified advocate or your local District Legal Services Authority (DLSA)."*
3. **Document / Photo Upload**: Send a court order document (PDF) or take a picture of an order sheet.
   - The bot downloads the file, calls the backend Mode A processing pipeline, and returns the verified facts and next dates.
4. **Unauthorized Senders**: Messages from non-allowlisted phone numbers are dropped immediately without returning any case data.
