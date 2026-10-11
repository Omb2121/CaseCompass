/**
 * CaseCompass — Landing Page
 * Matches Google Stitch Screen: "CaseCompass — Landing Page & Marketing Portal"
 * Includes Multi-Provider Login (Google, Phone, Email) & Sample Credentials
 */

export function renderLandingPage() {
  const isAuth = localStorage.getItem('casecompass_auth') === 'true';
  const currentUser = localStorage.getItem('casecompass_user') || 'Meera';

  return `
    <div class="landing-wrapper">
      <!-- 1. Sticky Landing Header Navigation -->
      <header class="landing-nav" id="landing-navbar">
        <a href="#/" class="landing-nav__brand" title="CaseCompass Home" style="display:flex;align-items:center;gap:12px;text-decoration:none;">
          <img alt="CaseCompass Logo" class="landing-nav__brand-img" src="/casecompass-logo.png"
               style="height:3.25rem;max-height:52px;width:auto;display:block;object-fit:contain;">
          <div style="display:flex;flex-direction:column;line-height:1.15;">
            <span style="font-family:'Archivo Black', 'Source Serif 4', sans-serif;font-size:1.375rem;font-weight:800;letter-spacing:-0.02em;color:#ffffff;">CaseCompass</span>
            <span style="font-size:0.6875rem;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#94a3b8;">From Court Orders to Clarity</span>
          </div>
        </a>

        <nav class="landing-nav__links">
          <a href="#how-it-works" class="landing-nav__link">How it Works</a>
          <a href="#features" class="landing-nav__link">Features</a>
          <a href="#deep-audit" class="landing-nav__link">Potential Impact</a>
          <a href="#ethical-design" class="landing-nav__link">Trust & Privacy</a>
          <a href="#legal-aid" class="landing-nav__link">Legal Aid</a>
        </nav>

        <div class="landing-nav__actions" id="nav-actions-container">
          <div class="lang-selector" id="lang-btn" title="Select Language">
            <span class="material-symbols-outlined" style="font-size:16px;">language</span>
            <span>English</span>
            <span class="material-symbols-outlined" style="font-size:14px;">expand_more</span>
          </div>

          <a href="#/login" class="btn btn--ghost btn--sm" id="btn-landing-login" style="font-weight:700;color:var(--primary);padding:8px 18px;text-decoration:none;border-radius:8px;">
            Log In
          </a>
          <a href="#/signup" class="btn btn--primary btn--sm" id="btn-landing-signup" style="font-weight:700;padding:8px 20px;border-radius:8px;text-decoration:none;">
            Sign Up
          </a>
        </div>
      </header>

      <!-- 2. Hero Section with Supreme Court Background -->
      <section class="landing-hero-wrapper">
        <div class="landing-hero">
          <div class="hero-left">
            <div class="hero-pill-badge">
              <span class="hero-pill-badge__dot"></span>
              <span>Indian Legal Record Intelligence &middot; AI-Assisted, Human-Verified</span>
            </div>
            <h1 class="hero-title">
              From Court Orders<br>to <span class="highlight">Clarity.</span>
            </h1>
            <p class="hero-desc">
              CaseCompass helps legal-aid volunteers and families organize court documents, follow case timelines with clarity, and understand important statutory deadlines.
            </p>
            <div class="hero-cta-group">
              <a href="javascript:void(0)" class="btn-hero-primary" id="btn-hero-explore" style="text-decoration:none;display:inline-flex;align-items:center;gap:8px;">
                <span>Enter Workspace</span>
                <span class="material-symbols-outlined" style="font-size:18px;">arrow_forward</span>
              </a>
            </div>
            <div class="hero-trust-bullets">
              <div class="hero-trust-bullet">
                <span class="material-symbols-outlined">check_circle</span>
                <span><strong>Grounded Source Information:</strong> Direct page and line citations for every fact</span>
              </div>
              <div class="hero-trust-bullet">
                <span class="material-symbols-outlined">check_circle</span>
                <span><strong>Zero Hallucination Tolerance</strong> &middot; Audited Indian Legal Precedents</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Feature Ribbon (4 Pillars) -->
      <section class="feature-ribbon">
        <div class="feature-ribbon__grid">
          <div class="ribbon-item">
            <div class="ribbon-item__icon">
              <span class="material-symbols-outlined" style="font-size:20px;">find_in_page</span>
            </div>
            <div>
              <div class="ribbon-item__title">Source-Bound Information</div>
              <div class="ribbon-item__desc">Every extracted detail links directly back to the original scanned page.</div>
            </div>
          </div>
          <div class="ribbon-item">
            <div class="ribbon-item__icon">
              <span class="material-symbols-outlined" style="font-size:20px;">translate</span>
            </div>
            <div>
              <div class="ribbon-item__title">Bilingual by Default</div>
              <div class="ribbon-item__desc">Bilingual support across English, Marathi, Hindi, and regional legal filings.</div>
            </div>
          </div>
          <div class="ribbon-item">
            <div class="ribbon-item__icon">
              <span class="material-symbols-outlined" style="font-size:20px;">lock_clock</span>
            </div>
            <div>
              <div class="ribbon-item__title">Audit-Trail Protection</div>
              <div class="ribbon-item__desc">Immutable cryptographic hashes guarantee zero tampering with evidence.</div>
            </div>
          </div>
          <div class="ribbon-item">
            <div class="ribbon-item__icon">
              <span class="material-symbols-outlined" style="font-size:20px;">short_text</span>
            </div>
            <div>
              <div class="ribbon-item__title">Plain Language Summaries</div>
              <div class="ribbon-item__desc">Complex judicial orders translated into understandable clarity for families.</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. Problem Section -->
      <section class="landing-section" id="how-it-works">
        <div class="section-heading-centered">
          <span class="section-label-pill">The Problem We Solve</span>
          <h2>Court documents can be difficult to follow.</h2>
          <p>
            Disorganized filings, unstructured PDF scans, and technical legal jargon create unnecessary barriers for legal-aid teams. CaseCompass organizes the verifiable record so that important details are never lost.
          </p>
        </div>

        <div class="problem-grid">
          <div class="problem-card">
            <div class="problem-card__icon">
              <span class="material-symbols-outlined" style="font-size:24px;">folder_off</span>
            </div>
            <h3 class="problem-card__title">Cluttered Documents</h3>
            <p class="problem-card__desc">
              Multiple file versions, poor scans, duplicate filings, and scattered annexures make it nearly impossible to organize into one unified case record.
            </p>
            <a class="problem-card__link auth-protected-link" data-target="#/upload">
              <span>How we track document order</span>
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </a>
          </div>

          <div class="problem-card">
            <div class="problem-card__icon">
              <span class="material-symbols-outlined" style="font-size:24px;">gavel</span>
            </div>
            <h3 class="problem-card__title">Complex Legal Language</h3>
            <p class="problem-card__desc">
              Judicial orders filled with archaic legal jargon confuse non-lawyers and families seeking justice when trying to understand statutory conditions.
            </p>
            <a class="problem-card__link auth-protected-link" data-target="#/ask">
              <span>Plain language translations</span>
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </a>
          </div>

          <div class="problem-card">
            <div class="problem-card__icon">
              <span class="material-symbols-outlined" style="font-size:24px;">calendar_month</span>
            </div>
            <h3 class="problem-card__title">Unclear Status and Dates</h3>
            <p class="problem-card__desc">
              Hearing adjournments, order revisions, and procedural steps become tangled, causing missed deadlines and procedural confusion.
            </p>
            <a class="problem-card__link auth-protected-link" data-target="#/timeline">
              <span>Procedural timeline clarity</span>
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      <!-- 6. 4-Step Workflow with Legal Desk Background -->
      <section class="workflow-section-wrapper" id="workflow-steps">
        <div class="workflow-inner-container">
          <div class="section-heading-centered">
            <span class="section-label-pill">Workflow in Four Steps</span>
            <h2>A clearer way to work with case records.</h2>
            <p>
              Designed for speed and fidelity. Move from raw court files to verified intelligence in seconds.
            </p>
          </div>

          <div class="workflow-grid">
            <div class="workflow-card">
              <div class="workflow-card__step">01</div>
              <h3 class="workflow-card__title">Upload Documents</h3>
              <p class="workflow-card__desc">
                Bulk intake of court orders, chargesheets, bail applications, and police notices.
              </p>
              <span class="badge badge--neutral" style="font-size:0.6875rem;">Drop Case Files</span>
            </div>

            <div class="workflow-card">
              <div class="workflow-card__step">02</div>
              <h3 class="workflow-card__title">Extract & Normalise</h3>
              <p class="workflow-card__desc">
                CNR numbers, hearing dates, IPC sections, and judicial officers detected automatically.
              </p>
              <span class="badge badge--neutral" style="font-size:0.6875rem;">OCR & Metadata</span>
            </div>

            <div class="workflow-card">
              <div class="workflow-card__step">03</div>
              <h3 class="workflow-card__title">Verify & Record</h3>
              <p class="workflow-card__desc">
                Human reviewer inspects machine extractions against the source PDF page with evidence lens.
              </p>
              <span class="badge badge--neutral" style="font-size:0.6875rem;">Human-in-the-Loop</span>
            </div>

            <div class="workflow-card">
              <div class="workflow-card__step">04</div>
              <h3 class="workflow-card__title">Understand Timeline</h3>
              <p class="workflow-card__desc">
                Chronological case proceedings, next hearing purpose, and actionable checklist ready.
              </p>
              <span class="badge badge--neutral" style="font-size:0.6875rem;">Clear Schedule</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. Complete Toolset (7 Tabs Showcase) -->
      <section class="landing-section" id="features">
        <div class="section-heading-centered" style="margin-bottom:2.5rem;">
          <span class="section-label-pill">Complete Toolset</span>
          <h2>Everything organized around the case record.</h2>
          <p>
            A comprehensive suite designed to empower legal-aid advocates, paralegals, and concerned families.
          </p>
        </div>

        <div class="toolset-grid">
          <!-- 1. Cases -->
          <div class="toolset-card">
            <div class="toolset-card__header">
              <div class="toolset-card__icon">
                <span class="material-symbols-outlined">folder</span>
              </div>
              <span class="badge badge--neutral">Core</span>
            </div>
            <h3 class="toolset-card__title">1. Cases</h3>
            <p class="toolset-card__desc">
              Track active matters, filter dockets by CNR, jurisdiction, or status, and access organized dossiers.
            </p>
            <button class="toolset-card__btn auth-protected-link" data-target="#/cases">
              <span>Explore Cases Module</span>
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </button>
          </div>

          <!-- 2. Upload -->
          <div class="toolset-card">
            <div class="toolset-card__header">
              <div class="toolset-card__icon">
                <span class="material-symbols-outlined">cloud_upload</span>
              </div>
              <span class="badge badge--neutral">Intake</span>
            </div>
            <h3 class="toolset-card__title">2. Upload</h3>
            <p class="toolset-card__desc">
              Bulk document ingestion with optical character recognition, file categorization, and queue tracking.
            </p>
            <button class="toolset-card__btn auth-protected-link" data-target="#/upload">
              <span>Explore Upload System</span>
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </button>
          </div>

          <!-- 3. Timeline -->
          <div class="toolset-card">
            <div class="toolset-card__header">
              <div class="toolset-card__icon" style="background:#eff4ff;color:#2563eb;">
                <span class="material-symbols-outlined">timeline</span>
              </div>
              <span class="badge badge--processing">High Priority</span>
            </div>
            <h3 class="toolset-card__title">3. Timeline</h3>
            <p class="toolset-card__desc">
              Chronological reconstruction of case history, orders, hearings, and procedural milestones.
            </p>
            <button class="toolset-card__btn auth-protected-link" data-target="#/timeline">
              <span>Check Timeline Feature</span>
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </button>
          </div>

          <!-- 4. Review -->
          <div class="toolset-card">
            <div class="toolset-card__header">
              <div class="toolset-card__icon" style="background:#fef3c7;color:#b45309;">
                <span class="material-symbols-outlined">find_in_page</span>
              </div>
              <span class="badge badge--pending">Evidence Lens</span>
            </div>
            <h3 class="toolset-card__title">4. Review</h3>
            <p class="toolset-card__desc">
              Evidence verification lens comparing extracted metadata against original scanned document pages.
            </p>
            <button class="toolset-card__btn auth-protected-link" data-target="#/review">
              <span>Explore Review Pipeline</span>
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </button>
          </div>

          <!-- 5. Ask -->
          <div class="toolset-card">
            <div class="toolset-card__header">
              <div class="toolset-card__icon">
                <span class="material-symbols-outlined">forum</span>
              </div>
              <span class="badge badge--neutral">Q&A</span>
            </div>
            <h3 class="toolset-card__title">5. Ask</h3>
            <p class="toolset-card__desc">
              Grounded natural language query engine strictly bound to uploaded docket records with page citations.
            </p>
            <button class="toolset-card__btn auth-protected-link" data-target="#/ask">
              <span>Explore Grounded Q&A</span>
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </button>
          </div>

          <!-- 6. Summary -->
          <div class="toolset-card">
            <div class="toolset-card__header">
              <div class="toolset-card__icon">
                <span class="material-symbols-outlined">summarize</span>
              </div>
              <span class="badge badge--neutral">Executive</span>
            </div>
            <h3 class="toolset-card__title">6. Summary</h3>
            <p class="toolset-card__desc">
              Plain language syntheses, procedural briefs, pre-hearing checklists, and case health metrics.
            </p>
            <button class="toolset-card__btn auth-protected-link" data-target="#/summary">
              <span>Explore Case Summaries</span>
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </button>
          </div>

          <!-- 7. Trust Ledger -->
          <div class="toolset-card toolset-card--full">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;">
              <div style="display:flex;align-items:center;gap:16px;">
                <div class="toolset-card__icon" style="background:#d1fae5;color:#047857;width:48px;height:48px;">
                  <span class="material-symbols-outlined" style="font-size:26px;">verified_user</span>
                </div>
                <div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <h3 class="toolset-card__title" style="margin-bottom:0;">7. Trust & Integrity Ledger</h3>
                    <span class="badge badge--verified">Tamper-Proof</span>
                  </div>
                  <p class="toolset-card__desc" style="margin-bottom:0;margin-top:4px;">
                    Cryptographic SHA-256 digests, tamper detection, and immutable chain of custody audit logs.
                  </p>
                </div>
              </div>
              <button class="btn btn--primary btn--sm auth-protected-link" data-target="#/trust" style="padding:10px 20px;">
                <span>View Trust Ledger</span>
                <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. Deep Audit Split Section -->
      <section class="deep-audit-section" id="deep-audit">
        <div class="deep-audit-container">
          <div>
            <span class="section-label-pill">Deep Audit Feature</span>
            <h2 style="font-family:var(--font-headline);font-size:2.25rem;font-weight:800;color:#0F2A4A;line-height:1.2;margin-bottom:1rem;">
              Every important detail should lead back to its source.
            </h2>
            <p style="font-size:1rem;color:#64748b;line-height:1.6;margin-bottom:1.75rem;">
              CaseCompass pairs machine-extracted facts with the original document page. Click on any date, charge, or condition to reveal the underlying court record.
            </p>
            <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:2rem;">
              <div style="display:flex;align-items:flex-start;gap:12px;">
                <span class="material-symbols-outlined" style="color:#2563eb;margin-top:2px;">fingerprint</span>
                <div>
                  <strong style="color:#0F2A4A;font-size:0.9375rem;">Cryptographic Source Ingestion</strong>
                  <div style="font-size:0.8125rem;color:#64748b;">Every PDF is fingerprinted with SHA-256 before analysis.</div>
                </div>
              </div>
              <div style="display:flex;align-items:flex-start;gap:12px;">
                <span class="material-symbols-outlined" style="color:#2563eb;margin-top:2px;">format_quote</span>
                <div>
                  <strong style="color:#0F2A4A;font-size:0.9375rem;">Document and Line-Level Citing</strong>
                  <div style="font-size:0.8125rem;color:#64748b;">Citations link directly to the specific page and line of the court order.</div>
                </div>
              </div>
              <div style="display:flex;align-items:flex-start;gap:12px;">
                <span class="material-symbols-outlined" style="color:#2563eb;margin-top:2px;">flag</span>
                <div>
                  <strong style="color:#0F2A4A;font-size:0.9375rem;">Clear Flags for Missing Information</strong>
                  <div style="font-size:0.8125rem;color:#64748b;">Discrepancies and unverified claims are highlighted in amber.</div>
                </div>
              </div>
            </div>
            <button class="btn btn--primary auth-protected-link" data-target="#/review" style="padding:10px 22px;">
              <span>Try Interactive Source Demo</span>
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </button>
          </div>

          <!-- Right: Visual Citation Match Card -->
          <div class="card" style="padding:20px;background:#ffffff;box-shadow:0 15px 30px rgba(15, 42, 74, 0.08);border:1px solid #cbd5e1;">
            <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e2e8f0;padding-bottom:12px;margin-bottom:16px;">
              <span style="font-size:0.75rem;font-weight:700;color:#0F2A4A;text-transform:uppercase;">Evidence Lens Verification</span>
              <span class="badge badge--verified">100% Page Match</span>
            </div>
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px;margin-bottom:14px;">
              <div style="font-size:0.75rem;font-weight:700;color:#1e40af;margin-bottom:4px;">Machine Extraction (Summary):</div>
              <div style="font-size:0.875rem;color:#1e293b;">
                "Accused Ramesh Kumar Sharma directed to furnish personal bond of ₹25,000/- with one solvent surety."
              </div>
            </div>
            <div style="background:#fafafa;border:1px dashed #cbd5e1;border-radius:8px;padding:14px;font-family:var(--font-headline);font-size:0.875rem;line-height:1.7;color:#334155;">
              <div style="font-size:0.6875rem;color:#64748b;font-family:var(--font-body);margin-bottom:4px;">Scanned Order Copy · Page 3, Lines 14–17:</div>
              "...It is hereby ordered that the applicant accused <mark style="background:#fef08a;padding:2px 4px;border-radius:3px;">Ramesh Kumar Sharma be admitted to bail upon executing a personal recognizance bond in the sum of Rs. 25,000/-</mark> (Rupees Twenty Five Thousand only)..."
            </div>
          </div>
        </div>
      </section>

      <!-- 9. Ethical & Responsible Design -->
      <section class="landing-section" id="ethical-design">
        <div class="section-heading-centered">
          <span class="section-label-pill">Ethical & Responsible Design</span>
          <h2>Clarity without losing sight of the evidence.</h2>
          <p>
            CaseCompass does not replace legal judgment; it gives legal-aid workers verifiable ground truth.
          </p>
        </div>

        <div class="ethical-grid">
          <div class="ethical-card">
            <div class="ethical-card__icon" style="background:#eff6ff;color:#2563eb;">
              <span class="material-symbols-outlined">rule</span>
            </div>
            <h3 style="font-family:var(--font-headline);font-size:1.125rem;font-weight:700;color:#0F2A4A;margin-bottom:6px;">
              Zero Hallucination
            </h3>
            <p style="font-size:0.8125rem;color:#64748b;line-height:1.5;">
              Strict retrieval grounding ensures the system never invents facts, sections, or rulings.
            </p>
          </div>

          <div class="ethical-card">
            <div class="ethical-card__icon" style="background:#ecfdf5;color:#059669;">
              <span class="material-symbols-outlined">how_to_reg</span>
            </div>
            <h3 style="font-family:var(--font-headline);font-size:1.125rem;font-weight:700;color:#0F2A4A;margin-bottom:6px;">
              Human Review
            </h3>
            <p style="font-size:0.8125rem;color:#64748b;line-height:1.5;">
              All automated extractions require human advocate sign-off before entering court dockets.
            </p>
          </div>

          <div class="ethical-card">
            <div class="ethical-card__icon" style="background:#fef3c7;color:#b45309;">
              <span class="material-symbols-outlined">warning_amber</span>
            </div>
            <h3 style="font-family:var(--font-headline);font-size:1.125rem;font-weight:700;color:#0F2A4A;margin-bottom:6px;">
              Visible Uncertainty
            </h3>
            <p style="font-size:0.8125rem;color:#64748b;line-height:1.5;">
              Ambiguous handwriting or damaged scans are explicitly flagged with confidence alerts.
            </p>
          </div>

          <div class="ethical-card">
            <div class="ethical-card__icon" style="background:#f8fafc;color:#0F2A4A;">
              <span class="material-symbols-outlined">shield_person</span>
            </div>
            <h3 style="font-family:var(--font-headline);font-size:1.125rem;font-weight:700;color:#0F2A4A;margin-bottom:6px;">
              Responsible Data Access
            </h3>
            <p style="font-size:0.8125rem;color:#64748b;line-height:1.5;">
              Sensitive party names, juvenile records, and domestic filings are protected with strict access control.
            </p>
          </div>
        </div>

        <!-- 10. Legal-Aid Support Banner -->
        <div class="legal-aid-banner" id="legal-aid">
          <div style="max-width:680px;">
            <div style="font-size:0.75rem;font-weight:700;color:#2563eb;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">
              PUBLIC LEGAL ACCESS
            </div>
            <h3 style="font-family:var(--font-headline);font-size:1.5rem;font-weight:700;color:#0F2A4A;margin-bottom:8px;">
              Looking for legal-aid support?
            </h3>
            <p style="font-size:0.875rem;color:#64748b;line-height:1.5;">
              CaseCompass helps organize information from court documents. If you are seeking pro-bono representation, you can contact the National Legal Services Authority (NALSA) or your State Legal Services Authority.
            </p>
          </div>
          <button class="btn btn--primary" id="btn-legal-aid-portal" style="padding:12px 24px;border-radius:8px;">
            <span class="material-symbols-outlined" style="font-size:18px;">open_in_new</span>
            <span>Explore Legal-Aid Resources</span>
          </button>
        </div>
      </section>

      <!-- 13. Comprehensive Footer -->
      <footer class="landing-footer">
        <div class="landing-footer__inner">
          <div class="footer-col">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
              <img src="/casecompass-icon.png" style="height:36px;width:36px;object-fit:contain;" alt="CaseCompass Logo">
              <strong style="font-size:1.375rem;color:#ffffff;font-family:'Archivo Black', 'Abril Fatface', sans-serif;letter-spacing:-0.02em;">CaseCompass</strong>
            </div>
            <p style="font-size:0.8125rem;color:#94a3b8;line-height:1.5;max-width:320px;">
              From Court Orders to Clarity. Empowering Indian legal-aid advocates and families with auditable court docket intelligence.
            </p>
          </div>

          <div class="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><a class="auth-protected-link" data-target="#/cases" style="cursor:pointer;">Cases Dossier</a></li>
              <li><a class="auth-protected-link" data-target="#/upload" style="cursor:pointer;">Document Intake</a></li>
              <li><a class="auth-protected-link" data-target="#/timeline" style="cursor:pointer;">Procedural Timeline</a></li>
              <li><a class="auth-protected-link" data-target="#/review" style="cursor:pointer;">Evidence Review Lens</a></li>
              <li><a class="auth-protected-link" data-target="#/trust" style="cursor:pointer;">Trust & Verification</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Resources & Help</h4>
            <ul>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#legal-aid">NALSA Legal Aid Directory</a></li>
              <li><a href="#deep-audit">Citation Standards</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Legal & Ethics</h4>
            <ul>
              <li><a href="#ethical-design">Zero-Hallucination Policy</a></li>
              <li><a href="#ethical-design">Data Privacy & Sovereignty</a></li>
              <li><a href="#ethical-design">Chain of Custody Standard</a></li>
              <li><a href="#/">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div class="landing-footer__disclaimer">
          <div>
            &copy; 2026 CaseCompass Project. Built for Indian Legal Record Verification.
          </div>
          <div>
            <strong>Disclaimer:</strong> CaseCompass is a document intelligence tool for record organization. It does not provide legal advice or predict outcomes.
          </div>
        </div>
      </footer>

      <!-- 14. Authentication Modal (Google / Phone / Email & Sample Credentials) -->
      <div class="login-modal-overlay" id="login-modal-overlay">
        <div class="login-modal">
          <!-- 🔒 Login Needed Alert Banner -->
          <div id="modal-login-needed-banner" style="display:none;padding:12px 16px;border-radius:10px;margin-bottom:1.25rem;background:#fef3c7;border:1.5px solid #fde68a;color:#92400e;align-items:flex-start;gap:12px;">
            <div style="width:34px;height:34px;border-radius:8px;background:#fef08a;display:flex;align-items:center;justify-content:center;color:#b45309;flex-shrink:0;">
              <span class="material-symbols-outlined" style="font-size:22px;">lock</span>
            </div>
            <div>
              <div style="font-size:0.9375rem;font-weight:800;color:#92400e;display:flex;align-items:center;gap:6px;">
                <span>Login Needed</span>
                <span class="badge" style="background:#fee2e2;color:#b91c1c;font-size:0.6875rem;padding:1px 6px;">Access Restricted</span>
              </div>
              <div style="font-size:0.8125rem;color:#b45309;margin-top:3px;line-height:1.45;">
                Without logging in or signing up, the workspace must not open. Please log in or sign up below to access court dockets.
              </div>
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.25rem;">
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <div style="width:28px;height:28px;border-radius:6px;background:#0F2A4A;display:flex;align-items:center;justify-content:center;color:white;">
                  <span class="material-symbols-outlined" style="font-size:16px;">lock</span>
                </div>
                <h3 id="modal-heading-title" style="font-family:var(--font-headline);font-size:1.375rem;font-weight:700;color:#0F2A4A;">
                  Log In to CaseCompass
                </h3>
              </div>
              <p id="modal-subheading-text" style="font-size:0.8125rem;color:#64748b;">
                Authentication required to access case files & verified dockets
              </p>
            </div>
            <button id="btn-close-login" style="background:none;border:none;cursor:pointer;color:#64748b;padding:4px;border-radius:6px;" aria-label="Close dialog">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Log in / Sign up Mode Switcher -->
          <div class="auth-mode-tabs">
            <button class="auth-mode-tab active" id="tab-mode-login" type="button">Log In</button>
            <button class="auth-mode-tab" id="tab-mode-signup" type="button">Sign Up</button>
          </div>

          <!-- Method 1: Google Single Sign-on -->
          <button type="button" class="btn-google-auth" id="btn-auth-google">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span id="google-auth-btn-label">Continue with Google</span>
          </button>

          <div class="auth-divider">
            <span>Or choose method</span>
          </div>

          <!-- Method 2 & 3 Selector Tabs -->
          <div class="auth-method-selector">
            <button class="auth-method-pill active" id="btn-select-email" type="button">
              <span class="material-symbols-outlined" style="font-size:16px;">mail</span>
              <span>Email</span>
            </button>
            <button class="auth-method-pill" id="btn-select-phone" type="button">
              <span class="material-symbols-outlined" style="font-size:16px;">smartphone</span>
              <span>Phone OTP</span>
            </button>
          </div>

          <!-- Form A: Email & Password -->
          <form id="auth-email-form" style="display:flex;flex-direction:column;gap:12px;">
            <div id="signup-extra-fields" style="display:none;flex-direction:column;gap:12px;">
              <div>
                <label style="font-size:0.8125rem;font-weight:600;color:#0F2A4A;display:block;margin-bottom:4px;">
                  Full Name
                </label>
                <input type="text" id="signup-fullname" placeholder="Adv. Meera Deshmukh" style="width:100%;">
              </div>
              <div>
                <label style="font-size:0.8125rem;font-weight:600;color:#0F2A4A;display:block;margin-bottom:4px;">
                  Affiliation / Clinic
                </label>
                <input type="text" id="signup-org" placeholder="DLSA Pune Legal Aid Clinic" style="width:100%;">
              </div>
            </div>

            <div>
              <label style="font-size:0.8125rem;font-weight:600;color:#0F2A4A;display:block;margin-bottom:4px;">
                Email Address
              </label>
              <input type="email" id="auth-email-input" placeholder="name@legalaid.org" required style="width:100%;">
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
                <label style="font-size:0.8125rem;font-weight:600;color:#0F2A4A;">
                  Password
                </label>
                <a href="javascript:void(0)" id="link-forgot-pw" style="font-size:0.75rem;color:#2563eb;text-decoration:none;">Forgot?</a>
              </div>
              <input type="password" id="auth-password-input" placeholder="••••••••••••" required style="width:100%;">
            </div>

            <button type="submit" class="btn btn--primary" id="btn-submit-email" style="margin-top:4px;padding:12px;width:100%;font-weight:600;border-radius:8px;">
              <span id="btn-submit-email-label">Sign In with Email</span>
              <span class="material-symbols-outlined" style="font-size:18px;">arrow_forward</span>
            </button>
          </form>

          <!-- Form B: Phone Number & OTP -->
          <form id="auth-phone-form" style="display:none;flex-direction:column;gap:12px;">
            <div>
              <label style="font-size:0.8125rem;font-weight:600;color:#0F2A4A;display:block;margin-bottom:4px;">
                Mobile Phone Number (India)
              </label>
              <div style="display:flex;gap:8px;">
                <span style="display:flex;align-items:center;padding:0 12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;font-size:0.875rem;font-weight:600;color:#475569;">+91</span>
                <input type="tel" id="auth-phone-input" placeholder="98765 43210" pattern="[0-9]{10}" style="flex:1;">
                <button type="button" class="btn btn--secondary btn--sm" id="btn-send-otp" style="white-space:nowrap;">
                  Send OTP
                </button>
              </div>
            </div>

            <div id="otp-group" style="display:none;">
              <label style="font-size:0.8125rem;font-weight:600;color:#0F2A4A;display:block;margin-bottom:4px;">
                Enter 6-digit OTP
              </label>
              <div style="display:flex;gap:8px;">
                <input type="text" id="auth-otp-input" placeholder="123456" maxlength="6" style="letter-spacing:0.25em;font-size:1.125rem;font-weight:700;text-align:center;width:100%;">
              </div>
              <div style="font-size:0.6875rem;color:#059669;margin-top:4px;display:flex;align-items:center;gap:4px;">
                <span class="material-symbols-outlined" style="font-size:14px;">check_circle</span>
                <span>Sample OTP sent: <strong>123456</strong></span>
              </div>
            </div>

            <button type="submit" class="btn btn--primary" id="btn-submit-phone" style="margin-top:4px;padding:12px;width:100%;font-weight:600;border-radius:8px;">
              <span>Verify & Sign In</span>
              <span class="material-symbols-outlined" style="font-size:18px;">arrow_forward</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  `;
}

export function initLandingPage() {
  // 1. Authentication Modal Controls
  let modal = document.getElementById('login-modal-overlay');
  const loginBtn = document.getElementById('btn-landing-login');
  const signupBtn = document.getElementById('btn-landing-signup');
  const closeBtn = document.getElementById('btn-close-login');
  const heroExploreBtn = document.getElementById('btn-hero-explore');
  const landingLogoutBtn = document.getElementById('btn-landing-logout');

  function openAuthModal(mode = 'login', isLoginNeeded = false) {
    modal = document.getElementById('login-modal-overlay');
    if (modal) {
      // Move modal to body so no parent container can ever interfere with fixed positioning
      if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
      }
      const banner = document.getElementById('modal-login-needed-banner');
      if (banner) {
        banner.style.display = isLoginNeeded ? 'flex' : 'none';
      }
      const heading = document.getElementById('modal-heading-title');
      if (heading) {
        heading.textContent = isLoginNeeded ? 'Login Needed' : (mode === 'signup' ? 'Create CaseCompass Account' : 'Log In to CaseCompass');
      }
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      setAuthMode(mode);
    }
  }

  function closeAuthModal() {
    modal = document.getElementById('login-modal-overlay');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  loginBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/login';
  });
  signupBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/signup';
  });
  closeBtn?.addEventListener('click', closeAuthModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeAuthModal();
  });

  // Hero explore button: Without logging in or signing up the workspace MUST NOT open
  heroExploreBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    if (localStorage.getItem('casecompass_auth') === 'true') {
      window.location.hash = '#/cases';
    } else {
      // Without logging in or signing up, the workspace must not open!
      openAuthModal('login', true);
    }
  });

  // Toolset explore links: Without logging in or signing up the workspace MUST NOT open
  document.querySelectorAll('.auth-protected-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target') || '#/cases';
      if (localStorage.getItem('casecompass_auth') === 'true') {
        window.location.hash = target;
      } else {
        // Without logging in or signing up, the workspace must not open!
        openAuthModal('login', true);
      }
    });
  });

  // If redirected from workspace attempt without logging in or signing up
  if (sessionStorage.getItem('show_login_needed_popup') === 'true') {
    sessionStorage.removeItem('show_login_needed_popup');
    openAuthModal('login', true);
  }

  // Logout from Landing Navbar
  landingLogoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('casecompass_auth');
    localStorage.removeItem('casecompass_user');
    window.location.reload();
  });

  // Switch between Log In and Sign Up tab modes
  const tabLogin = document.getElementById('tab-mode-login');
  const tabSignup = document.getElementById('tab-mode-signup');
  const modalTitle = document.getElementById('modal-heading-title');
  const modalSubtitle = document.getElementById('modal-subheading-text');
  const signupFields = document.getElementById('signup-extra-fields');
  const submitEmailBtnLabel = document.getElementById('btn-submit-email-label');
  const googleBtnLabel = document.getElementById('google-auth-btn-label');

  function setAuthMode(mode) {
    if (mode === 'signup') {
      tabLogin?.classList.remove('active');
      tabSignup?.classList.add('active');
      if (modalTitle) modalTitle.textContent = 'Create CaseCompass Account';
      if (modalSubtitle) modalSubtitle.textContent = 'Join verified legal-aid clinics and public advocates';
      if (signupFields) signupFields.style.display = 'flex';
      if (submitEmailBtnLabel) submitEmailBtnLabel.textContent = 'Create Account';
      if (googleBtnLabel) googleBtnLabel.textContent = 'Sign up with Google';
    } else {
      tabSignup?.classList.remove('active');
      tabLogin?.classList.add('active');
      if (modalTitle) modalTitle.textContent = 'Log In to CaseCompass';
      if (modalSubtitle) modalSubtitle.textContent = 'Authentication required to access case files & verified dockets';
      if (signupFields) signupFields.style.display = 'none';
      if (submitEmailBtnLabel) submitEmailBtnLabel.textContent = 'Sign In with Email';
      if (googleBtnLabel) googleBtnLabel.textContent = 'Continue with Google';
    }
  }

  tabLogin?.addEventListener('click', () => setAuthMode('login'));
  tabSignup?.addEventListener('click', () => setAuthMode('signup'));

  // Switch between Email and Phone methods
  const btnSelectEmail = document.getElementById('btn-select-email');
  const btnSelectPhone = document.getElementById('btn-select-phone');
  const emailForm = document.getElementById('auth-email-form');
  const phoneForm = document.getElementById('auth-phone-form');

  btnSelectEmail?.addEventListener('click', () => {
    btnSelectEmail.classList.add('active');
    btnSelectPhone?.classList.remove('active');
    if (emailForm) emailForm.style.display = 'flex';
    if (phoneForm) phoneForm.style.display = 'none';
  });

  btnSelectPhone?.addEventListener('click', () => {
    btnSelectPhone.classList.add('active');
    btnSelectEmail?.classList.remove('active');
    if (emailForm) emailForm.style.display = 'none';
    if (phoneForm) phoneForm.style.display = 'flex';
  });

  // Successful Login Handler
  function completeAuth(userName = 'Authenticated User', userRole = 'user', email = '') {
    localStorage.setItem('casecompass_auth', 'true');
    localStorage.setItem('casecompass_user', userName);
    if (email) localStorage.setItem('casecompass_user_email', email);
    localStorage.setItem('casecompass_role', userRole);
    closeAuthModal();
    if (modal && modal.parentElement === document.body) {
      modal.remove();
    }
    window.location.hash = '#/cases';
  }

  // Google Login click: Redirect to authentic Google Account Sign-In
  document.getElementById('btn-auth-google')?.addEventListener('click', () => {
    closeAuthModal();
    if (modal && modal.parentElement === document.body) {
      modal.remove();
    }
    window.location.hash = '#/login?portal=user&google=1';
  });

  // Email form submit
  emailForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawEmail = document.getElementById('auth-email-input')?.value?.trim();
    const signupName = document.getElementById('signup-fullname')?.value?.trim();
    const email = rawEmail || 'citizen@casecompass.app';
    let name = signupName || (email.split('@')[0] || 'Citizen Litigant');
    // Clean name formatting
    name = name.replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    completeAuth(name, 'user', email);
  });

  // Phone OTP Flow
  const btnSendOtp = document.getElementById('btn-send-otp');
  const otpGroup = document.getElementById('otp-group');
  btnSendOtp?.addEventListener('click', () => {
    const phone = document.getElementById('auth-phone-input')?.value;
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (otpGroup) otpGroup.style.display = 'block';
    const otpInput = document.getElementById('auth-otp-input');
    if (otpInput) otpInput.value = '123456';
  });

  phoneForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const otp = document.getElementById('auth-otp-input')?.value;
    if (!otp) {
      alert('Please enter the OTP (sample OTP: 123456)');
      return;
    }
    completeAuth('Meera (Verified Phone)');
  });


  // Forgot password
  document.getElementById('link-forgot-pw')?.addEventListener('click', () => {
    alert('Password reset instructions sent to registered email address.');
  });

  // Legal Aid portal
  document.getElementById('btn-legal-aid-portal')?.addEventListener('click', () => {
    alert('Connecting to National Legal Services Authority (NALSA) portal resources (nalsa.gov.in)...');
  });

  // Language selector
  document.getElementById('lang-btn')?.addEventListener('click', () => {
    const lang = prompt('Select display language:\n1. English\n2. Marathi (मराठी)\n3. Hindi (हिन्दी)', '1');
    if (lang === '2') alert('Language switched to Marathi (मराठी). UI translated.');
    else if (lang === '3') alert('Language switched to Hindi (हिन्दी). UI translated.');
  });
}
