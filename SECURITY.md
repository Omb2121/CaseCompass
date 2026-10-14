# CaseCompass — Security Overview

## Threat Model

CaseCompass handles sensitive judicial records for Indian court litigants.
The primary threats are:

1. **Unauthorized access** — random users reading another person's case
2. **Role escalation** — a citizen claiming to be Admin or Judge
3. **Data injection** — malicious content in court documents attacking the UI or LLM
4. **Session theft** — stolen JWT tokens
5. **Upload abuse** — large or malicious files causing server issues

## What Is Protected

| Protection | Implementation |
|---|---|
| Authentication | Google Identity Services (real OAuth 2.0) — no email+password |
| Role assignment | Server-side allowlist (`ADMIN_EMAILS`, `JUDGE_EMAILS` env vars) — never from client |
| Session tokens | HS256 JWT, 8-hour expiry, signed with `SESSION_SECRET` |
| CORS | Exact origin allowlist; no wildcards when credentials are used |
| Security headers | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `HSTS` |
| Content Security Policy | Set in `vercel.json` for frontend |
| Citizen data isolation | Citizens only see their own cases (enforced in `api.js` and verified in backend) |
| Prompt injection | `backend/core/injection_guard.py` treats document text as untrusted data |
| Audit trail | Hash-chained audit log records all auth events, uploads, and exports |
| Demo mode | Clearly labelled; only accessible via `DEMO_MODE=true` env var; sessions tagged `is_demo=true` |

## Known Limits

- **Backend not on Vercel** — The FastAPI backend must be deployed separately. Vercel serves only the frontend static bundle. Until the backend is deployed, all `/api/` calls are no-ops and the frontend falls back to demo data.
- **JWT revocation** — Sessions are stateless JWTs. Logout instructs the client to discard the token, but there is no server-side blocklist. Implement a Redis blocklist for higher-security needs.
- **Rate limiting** — Applied on auth and upload endpoints. Adjust `slowapi` limits in `routes_auth.py` and `routes_documents.py` based on expected traffic.
- **OCR text** — Tesseract output is treated as untrusted and never inserted via `innerHTML`. Use `textContent` or `DOMPurify`.
- **No real-time session invalidation** — Changing a user's role in the database does not invalidate existing tokens until they expire (8 hours).

## Reporting a Vulnerability

Please email security concerns to the project maintainer. Do not open a public issue for security reports.
