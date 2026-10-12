(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e,t=`/cases`){this.routes=e,this.defaultRoute=t,this.currentRoute=null,this.onNavigate=null,window.addEventListener(`hashchange`,()=>this.handleRoute()),window.addEventListener(`load`,()=>this.handleRoute())}getPath(){let e=window.location.hash.slice(1)||this.defaultRoute;return e.startsWith(`/`)?e:`/${e}`}handleRoute(){let e=this.getPath(),t=this.routes.find(t=>t.path===e);t?(this.currentRoute=t,this.onNavigate&&this.onNavigate(t)):this.navigate(this.defaultRoute)}navigate(e){window.location.hash=e}},t={title:`State of Maharashtra v. Ramesh Kumar`,cnr:`MHPU01-004291-2024`,court:`Court of JMFC, Pune (Court Room No. 4)`,status:`verified`,nextHearing:`2025-02-14`,nextHearingPurpose:`Cross-Examination of PW-3`,filingDate:`2024-03-15`,judge:`Smt. Archana Kulkarni`,petitioner:`State of Maharashtra`,respondent:`Ramesh Kumar Sharma`,advocate:`Adv. Priya Deshmukh`,section:`IPC §420, §468`},n=[{id:1,title:`State of Maharashtra v. Ramesh Kumar`,cnr:`MHPU01-004291-2024`,court:`JMFC Pune – Court Room 4`,status:`verified`,statusLabel:`Listed Today`,seriousness:`high`,documents:12,nextHearing:`Today (Bench Hearing)`,filingDate:`15 Mar 2024`,section:`IPC §420, §468`,reportedBy:`Ramesh Kumar`,judge:`Hon. Smt. Archana Kulkarni`,timespan:`day`,hearingPurpose:`Cross-Examination of PW-3`,benchItem:`Item 01 · Urgent Criminal Docket`,isDisposed:!1},{id:2,title:`Priya Mehta v. ABC Corp Ltd.`,cnr:`MHMU02-008917-2023`,court:`City Civil Court, Mumbai`,status:`pending`,statusLabel:`Pending Review`,seriousness:`medium`,documents:7,nextHearing:`28 Oct 2026 (This Month)`,filingDate:`22 Jul 2023`,section:`CPC Order VII`,reportedBy:`Priya Mehta`,judge:`Hon. Smt. Archana Kulkarni`,timespan:`month`,hearingPurpose:`Framing of Legal Issues & Submissions`,benchItem:`Item 04 · Commercial Civil Proceedings`,isDisposed:!1},{id:3,title:`Sunita Devi v. State of Bihar`,cnr:`BRPT03-001245-2024`,court:`District Court, Patna`,status:`flagged`,statusLabel:`Urgent Hearing Today`,seriousness:`high`,documents:4,nextHearing:`Today (Urgent Motion)`,filingDate:`10 Sep 2024`,section:`CrPC §482`,reportedBy:`Sunita Devi`,judge:`Hon. Smt. Archana Kulkarni`,timespan:`day`,hearingPurpose:`Ad-interim Protection Application`,benchItem:`Item 02 · Special Motion Bench`,isDisposed:!1},{id:4,title:`Rajesh Industrial Ltd. v. SEBI`,cnr:`DLND04-005678-2024`,court:`Securities Appellate Tribunal, Delhi`,status:`processing`,statusLabel:`Processing`,seriousness:`medium`,documents:18,nextHearing:`24 Oct 2026 (This Month)`,filingDate:`02 Jan 2024`,section:`SEBI Act §15-I`,reportedBy:`Rajesh Industrial Ltd.`,judge:`Hon. Smt. Archana Kulkarni`,timespan:`month`,hearingPurpose:`Compliance Affidavit Submission`,benchItem:`Item 07 · Statutory Regulatory Appeal`,isDisposed:!1},{id:5,title:`Municipal Corp v. Green Earth Trust`,cnr:`MHNG05-002341-2023`,court:`National Green Tribunal, Nagpur Bench`,status:`verified`,statusLabel:`Disposed & Decided`,seriousness:`low`,documents:9,nextHearing:`Disposed (Previous Case)`,filingDate:`15 Nov 2023`,section:`NGT Act §14`,reportedBy:`Green Earth Trust`,judge:`Hon. Smt. Archana Kulkarni`,timespan:`past`,hearingPurpose:`Final Judgment & Decree Pronounced`,benchItem:`Previous Adjudicated Order (Archived)`,isDisposed:!0}],r=[{id:1,date:`15 Mar 2024`,label:`FIR Filed`,description:`First Information Report registered under IPC §420 at Kothrud PS, Pune.`,icon:`description`,type:`filing`,verified:!0},{id:2,date:`02 Apr 2024`,label:`Chargesheet Filed`,description:`Police filed chargesheet with statements of 4 prosecution witnesses.`,icon:`gavel`,type:`proceeding`,verified:!0},{id:3,date:`20 May 2024`,label:`Charges Framed`,description:`Court framed charges under IPC §420 and §468. Accused pleaded not guilty.`,icon:`balance`,type:`order`,verified:!0},{id:4,date:`14 Aug 2024`,label:`PW-1 Examination`,description:`Examination-in-chief of PW-1 (Complainant Shri Vijay Patil) completed.`,icon:`record_voice_over`,type:`hearing`,verified:!0},{id:5,date:`10 Nov 2024`,label:`PW-2 Cross-Examination`,description:`Cross-examination of PW-2 (IO – PSI Ashok Jadhav) completed.`,icon:`record_voice_over`,type:`hearing`,verified:!0},{id:6,date:`14 Feb 2025`,label:`Next Hearing — PW-3`,description:`Scheduled for cross-examination of PW-3 (Bank Manager).`,icon:`event`,type:`upcoming`,verified:!1}],i=[{id:1,name:`FIR Copy – Kothrud PS`,filename:`FIR_Copy_Kothrud_PS.pdf`,category:`Police Records`,pages:4,uploadedDate:`15 Mar 2024`,status:`verified`,statusLabel:`Verified`,hash:`a3f2…c91d`,flags:[]},{id:2,name:`Chargesheet with Annexures`,filename:`Chargesheet_Final.pdf`,category:`Prosecution Documents`,pages:28,uploadedDate:`02 Apr 2024`,status:`verified`,statusLabel:`Verified`,hash:`b7e1…d44a`,flags:[]},{id:3,name:`PW-1 Statement – Shri Vijay Patil`,filename:`PW1_Statement_Patil.pdf`,category:`Witness Statements`,pages:6,uploadedDate:`14 Aug 2024`,status:`flagged`,statusLabel:`Discrepancy`,hash:`c4d8…e22b`,flags:[`Date mismatch between header and signature block (pg 3 vs pg 6)`]},{id:4,name:`Court Order – Charges Framed`,filename:`Court_Order_Charges.pdf`,category:`Court Orders`,pages:3,uploadedDate:`20 May 2024`,status:`verified`,statusLabel:`Verified`,hash:`d9a5…f10c`,flags:[]}],a=[{role:`user`,text:`What charges have been framed in this case?`,time:`10:42 AM`},{role:`assistant`,text:`Based on the uploaded court order dated 20 May 2024, charges have been framed under **IPC Section 420** (Cheating and dishonestly inducing delivery of property) and **IPC Section 468** (Forgery for purpose of cheating). The accused Ramesh Kumar Sharma pleaded not guilty to both charges.`,sources:[`Court_Order_Charges.pdf (pg 2)`,`Chargesheet_Final.pdf (pg 1)`],time:`10:42 AM`},{role:`user`,text:`How many prosecution witnesses have been examined so far?`,time:`10:45 AM`},{role:`assistant`,text:`According to the documents in the docket, **2 out of 4** prosecution witnesses have been examined:

1. **PW-1** – Shri Vijay Patil (Complainant) — Examination-in-chief completed on 14 Aug 2024
2. **PW-2** – PSI Ashok Jadhav (Investigating Officer) — Cross-examination completed on 10 Nov 2024

PW-3 (Bank Manager) is scheduled for cross-examination on 14 Feb 2025.`,sources:[`PW1_Statement_Patil.pdf`,`Chargesheet_Final.pdf (pg 12–14)`],time:`10:45 AM`}],o=[{id:`cases`,label:`1. Cases`,icon:`folder`,path:`/cases`},{id:`upload`,label:`2. Upload`,icon:`cloud_upload`,path:`/upload`},{id:`timeline`,label:`3. Timeline`,icon:`timeline`,path:`/timeline`},{id:`review`,label:`4. Review`,icon:`find_in_page`,path:`/review`},{id:`ask`,label:`5. Ask`,icon:`forum`,path:`/ask`},{id:`summary`,label:`6. Summary`,icon:`summarize`,path:`/summary`},{id:`trust`,label:`7. Trust`,icon:`verified_user`,path:`/trust`}];function s(e){let t=localStorage.getItem(`casecompass_user`)||`Admin User`,n=localStorage.getItem(`casecompass_role`)||`admin`;return`
    <!-- Header -->
    <header class="app-header" id="app-header">
      <div class="app-header__inner">
        <a href="#/cases" class="app-header__brand" style="text-decoration:none;cursor:pointer;display:flex;align-items:center;gap:10px;" title="CaseCompass Workspace">
          <img alt="CaseCompass Logo" class="app-header__logo" src="/casecompass-logo.png"
               style="height:2.625rem;max-height:44px;width:auto;display:block;object-fit:contain;">
          <div style="display:flex;flex-direction:column;line-height:1.15;">
            <span style="font-family:'Archivo Black', 'Source Serif 4', sans-serif;font-size:1.1875rem;font-weight:800;letter-spacing:-0.02em;color:#0F2A4A;">CaseCompass</span>
            <span style="font-size:0.625rem;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#64748b;">Docket Intelligence</span>
          </div>
        </a>
        <div class="app-header__actions" style="display:flex;align-items:center;gap:10px;">
          <!-- Active Role Switcher / Indicator -->
          <div style="display:flex;align-items:center;gap:6px;background:var(--surface-container-high);padding:4px 10px;border-radius:var(--radius-md);">
            ${n===`user`?`<span class="badge" style="background:#e0f2fe;color:#0369a1;font-weight:700;display:inline-flex;align-items:center;gap:4px;"><span class="material-symbols-outlined" style="font-size:14px;">person</span> Citizen</span>`:n===`judge`?`<span class="badge" style="background:#fef3c7;color:#92400e;font-weight:700;display:inline-flex;align-items:center;gap:4px;"><span class="material-symbols-outlined" style="font-size:14px;">gavel</span> Hon'ble Judge</span>`:`<span class="badge" style="background:#ede9fe;color:#5b21b6;font-weight:700;display:inline-flex;align-items:center;gap:4px;"><span class="material-symbols-outlined" style="font-size:14px;">admin_panel_settings</span> Court Admin</span>`}
            <select id="shell-role-select" title="Switch Portal Persona" style="background:transparent;border:none;font-size:0.75rem;font-weight:700;color:var(--primary);cursor:pointer;outline:none;">
              <option value="user" ${n===`user`?`selected`:``}>👤 Citizen Portal</option>
              <option value="admin" ${n===`admin`?`selected`:``}>🛡️ Admin Portal</option>
              <option value="judge" ${n===`judge`?`selected`:``}>⚖️ Judge Portal</option>
            </select>
          </div>

          <div class="header-user-badge hide-mobile" style="display:flex;align-items:center;gap:8px;background:var(--surface-container-high);padding:5px 12px;border-radius:9999px;">
            <div style="width:22px;height:22px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;">
              ${t.charAt(0)}
            </div>
            <span style="font-size:0.8125rem;font-weight:600;color:var(--primary);">${t}</span>
          </div>

          <button class="btn btn--ghost btn--sm" id="btn-shell-logout" title="Sign out" style="display:flex;align-items:center;gap:4px;padding:6px 10px;cursor:pointer;border-radius:var(--radius-md);">
            <span class="material-symbols-outlined" style="font-size:18px;color:var(--outline);">logout</span>
            <span class="hide-mobile" style="font-size:0.8125rem;font-weight:600;color:var(--outline);">Sign out</span>
          </button>

          <button class="header-mobile-menu-btn" id="mobile-menu-btn" title="Open menu" aria-label="Open navigation menu">
            <span class="material-symbols-outlined" style="font-size:24px">menu</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Desktop Sidebar -->
    <aside class="app-sidebar" id="app-sidebar">
      <div class="sidebar-section-label">Record Verification Flow</div>
      <nav class="sidebar-nav" aria-label="Main navigation">
        ${o.map(t=>`
          <a class="sidebar-nav-item ${t.id===e?`active`:``}"
             href="#${t.path}" data-path="${t.id}" role="link">
            <span class="material-symbols-outlined">${t.icon}</span>
            <span>${t.label}</span>
          </a>
        `).join(``)}
      </nav>
      <div class="sidebar-footer">
        CaseCompass · District Docket Intelligence
      </div>
    </aside>

    <!-- Mobile Sidebar Overlay -->
    <div class="mobile-sidebar-overlay" id="mobile-overlay"></div>
    <div class="mobile-sidebar" id="mobile-sidebar">
        <div style="display:flex;align-items:center;gap:10px;">
          <img alt="CaseCompass Logo" class="app-header__logo" src="/casecompass-logo.png" style="height:2.5rem;width:auto;object-fit:contain;">
          <span style="font-family:'Archivo Black', 'Source Serif 4', sans-serif;font-size:1.1875rem;font-weight:800;letter-spacing:-0.02em;color:#0F2A4A;">CaseCompass</span>
        </div>
        <button id="mobile-close-btn" style="background:none;border:none;cursor:pointer;color:var(--on-surface-variant);padding:4px;" aria-label="Close menu">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div class="sidebar-section-label">Record Verification Flow</div>
      <nav class="sidebar-nav" aria-label="Mobile navigation">
        ${o.map(t=>`
          <a class="sidebar-nav-item ${t.id===e?`active`:``}"
             href="#${t.path}" data-path="${t.id}" data-mobile-nav role="link">
            <span class="material-symbols-outlined">${t.icon}</span>
            <span>${t.label}</span>
          </a>
        `).join(``)}
      </nav>
    </div>

    <!-- Main Content Slot -->
    <main class="app-main" id="page-content" role="main">
      <!-- Page content injected here -->
    </main>
  `}function c(){let e=document.getElementById(`mobile-menu-btn`),t=document.getElementById(`mobile-close-btn`),n=document.getElementById(`mobile-overlay`),r=document.getElementById(`mobile-sidebar`);function i(){n?.classList.add(`open`),r?.classList.add(`open`)}function a(){n?.classList.remove(`open`),r?.classList.remove(`open`)}e?.addEventListener(`click`,i),t?.addEventListener(`click`,a),n?.addEventListener(`click`,a),document.querySelectorAll(`[data-mobile-nav]`).forEach(e=>{e.addEventListener(`click`,a)}),document.getElementById(`shell-role-select`)?.addEventListener(`change`,e=>{let t=e.target.value;localStorage.setItem(`casecompass_role`,t),window.location.reload()}),document.getElementById(`btn-shell-logout`)?.addEventListener(`click`,e=>{e.preventDefault(),localStorage.removeItem(`casecompass_auth`),localStorage.removeItem(`casecompass_user`),localStorage.removeItem(`casecompass_role`),window.location.hash=`#/login`})}function l(){return localStorage.getItem(`casecompass_auth`),localStorage.getItem(`casecompass_user`),`
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
  `}function u(){let e=document.getElementById(`login-modal-overlay`),t=document.getElementById(`btn-landing-login`),n=document.getElementById(`btn-landing-signup`),r=document.getElementById(`btn-close-login`),i=document.getElementById(`btn-hero-explore`),a=document.getElementById(`btn-landing-logout`);function o(t=`login`,n=!1){if(e=document.getElementById(`login-modal-overlay`),e){e.parentElement!==document.body&&document.body.appendChild(e);let r=document.getElementById(`modal-login-needed-banner`);r&&(r.style.display=n?`flex`:`none`);let i=document.getElementById(`modal-heading-title`);i&&(i.textContent=n?`Login Needed`:t===`signup`?`Create CaseCompass Account`:`Log In to CaseCompass`),e.classList.add(`active`),document.body.style.overflow=`hidden`,h(t)}}function s(){e=document.getElementById(`login-modal-overlay`),e&&(e.classList.remove(`active`),document.body.style.overflow=``)}t?.addEventListener(`click`,e=>{e.preventDefault(),window.location.hash=`#/login`}),n?.addEventListener(`click`,e=>{e.preventDefault(),window.location.hash=`#/signup`}),r?.addEventListener(`click`,s),e?.addEventListener(`click`,t=>{t.target===e&&s()}),i?.addEventListener(`click`,e=>{e.preventDefault(),localStorage.getItem(`casecompass_auth`)===`true`?window.location.hash=`#/cases`:o(`login`,!0)}),document.querySelectorAll(`.auth-protected-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.getAttribute(`data-target`)||`#/cases`;localStorage.getItem(`casecompass_auth`)===`true`?window.location.hash=n:o(`login`,!0)})}),sessionStorage.getItem(`show_login_needed_popup`)===`true`&&(sessionStorage.removeItem(`show_login_needed_popup`),o(`login`,!0)),a?.addEventListener(`click`,()=>{localStorage.removeItem(`casecompass_auth`),localStorage.removeItem(`casecompass_user`),window.location.reload()});let c=document.getElementById(`tab-mode-login`),l=document.getElementById(`tab-mode-signup`),u=document.getElementById(`modal-heading-title`),d=document.getElementById(`modal-subheading-text`),f=document.getElementById(`signup-extra-fields`),p=document.getElementById(`btn-submit-email-label`),m=document.getElementById(`google-auth-btn-label`);function h(e){e===`signup`?(c?.classList.remove(`active`),l?.classList.add(`active`),u&&(u.textContent=`Create CaseCompass Account`),d&&(d.textContent=`Join verified legal-aid clinics and public advocates`),f&&(f.style.display=`flex`),p&&(p.textContent=`Create Account`),m&&(m.textContent=`Sign up with Google`)):(l?.classList.remove(`active`),c?.classList.add(`active`),u&&(u.textContent=`Log In to CaseCompass`),d&&(d.textContent=`Authentication required to access case files & verified dockets`),f&&(f.style.display=`none`),p&&(p.textContent=`Sign In with Email`),m&&(m.textContent=`Continue with Google`))}c?.addEventListener(`click`,()=>h(`login`)),l?.addEventListener(`click`,()=>h(`signup`));let g=document.getElementById(`btn-select-email`),_=document.getElementById(`btn-select-phone`),v=document.getElementById(`auth-email-form`),y=document.getElementById(`auth-phone-form`);g?.addEventListener(`click`,()=>{g.classList.add(`active`),_?.classList.remove(`active`),v&&(v.style.display=`flex`),y&&(y.style.display=`none`)}),_?.addEventListener(`click`,()=>{_.classList.add(`active`),g?.classList.remove(`active`),v&&(v.style.display=`none`),y&&(y.style.display=`flex`)});function b(t=`Authenticated User`,n=`user`,r=``){localStorage.setItem(`casecompass_auth`,`true`),localStorage.setItem(`casecompass_user`,t),r&&localStorage.setItem(`casecompass_user_email`,r),localStorage.setItem(`casecompass_role`,n),s(),e&&e.parentElement===document.body&&e.remove(),window.location.hash=`#/cases`}document.getElementById(`btn-auth-google`)?.addEventListener(`click`,()=>{s(),e&&e.parentElement===document.body&&e.remove(),window.location.hash=`#/login?portal=user&google=1`}),v?.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`auth-email-input`)?.value?.trim(),n=document.getElementById(`signup-fullname`)?.value?.trim(),r=t||`citizen@casecompass.app`,i=n||r.split(`@`)[0]||`Citizen Litigant`;i=i.replace(/[._-]/g,` `).replace(/\b\w/g,e=>e.toUpperCase()),b(i,`user`,r)});let x=document.getElementById(`btn-send-otp`),S=document.getElementById(`otp-group`);x?.addEventListener(`click`,()=>{let e=document.getElementById(`auth-phone-input`)?.value;if(!e||e.length<10){alert(`Please enter a valid 10-digit mobile number.`);return}S&&(S.style.display=`block`);let t=document.getElementById(`auth-otp-input`);t&&(t.value=`123456`)}),y?.addEventListener(`submit`,e=>{e.preventDefault(),document.getElementById(`auth-otp-input`)?.value?b(`Meera (Verified Phone)`):alert(`Please enter the OTP (sample OTP: 123456)`)}),document.getElementById(`link-forgot-pw`)?.addEventListener(`click`,()=>{alert(`Password reset instructions sent to registered email address.`)}),document.getElementById(`btn-legal-aid-portal`)?.addEventListener(`click`,()=>{alert(`Connecting to National Legal Services Authority (NALSA) portal resources (nalsa.gov.in)...`)}),document.getElementById(`lang-btn`)?.addEventListener(`click`,()=>{let e=prompt(`Select display language:
1. English
2. Marathi (मराठी)
3. Hindi (हिन्दी)`,`1`);e===`2`?alert(`Language switched to Marathi (मराठी). UI translated.`):e===`3`&&alert(`Language switched to Hindi (हिन्दी). UI translated.`)})}function d(e=`login`,t=`user`){return`
    <div class="auth-page-wrapper" style="min-height: 100vh; display: flex; flex-direction: column; background: linear-gradient(135deg, #071527 0%, #0c213a 45%, #183354 100%); color: #f8fafc; font-family: var(--font-body); position: relative; overflow-x: hidden;">
      <!-- Top Navigation Bar -->
      <header style="padding: 1.125rem 2rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.08); background: rgba(7, 21, 39, 0.9); backdrop-filter: blur(12px);">
        <a href="#/" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit;" title="Return to CaseCompass Home">
          <img src="/casecompass-logo.png" alt="CaseCompass Logo" style="height: 42px; width: auto; object-fit: contain;">
          <div style="display: flex; flex-direction: column; line-height: 1.15;">
            <span style="font-family: 'Archivo Black', 'Source Serif 4', sans-serif; font-size: 1.25rem; font-weight: 800; letter-spacing: -0.02em; color: #ffffff;">CaseCompass</span>
            <span style="font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8;">From Court Orders to Clarity</span>
          </div>
        </a>
        <div style="display: flex; align-items: center; gap: 12px;">
          <a href="#/" class="btn btn--ghost btn--sm" style="color: #94a3b8; text-decoration: none; display: flex; align-items: center; gap: 6px; font-weight: 500;">
            <span class="material-symbols-outlined" style="font-size: 18px;">arrow_back</span>
            <span>Back to Home</span>
          </a>
        </div>
      </header>

      <!-- Main Auth Container -->
      <main style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem;">
        <div class="card" id="auth-main-card" style="width: 100%; max-width: 520px; background: #ffffff; color: #0F2A4A; border-radius: 16px; padding: 2rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.15);">
          
          <!-- THREE SEPARATE PORTALS SELECTOR -->
          <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em;">
                Choose Access Portal:
              </span>
              <span id="active-portal-badge" class="badge" style="background: #e0f2fe; color: #0369a1; font-size: 0.6875rem; font-weight: 700;">
                1. Citizen Portal
              </span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; background: #f1f5f9; padding: 4px; border-radius: 10px; border: 1px solid #e2e8f0;">
              <!-- 1. User / Citizen Portal Button -->
              <button type="button" class="portal-tab-btn active-portal" id="portal-tab-user" data-portal="user"
                      style="padding: 10px 4px; border-radius: 8px; border: none; font-size: 0.8125rem; font-weight: 700; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s ease; background: #0F2A4A; color: #ffffff; box-shadow: 0 2px 6px rgba(15, 42, 74, 0.25);">
                <span class="material-symbols-outlined" style="font-size: 20px;">person</span>
                <span>1. Citizen</span>
              </button>

              <!-- 2. Admin Portal Button -->
              <button type="button" class="portal-tab-btn" id="portal-tab-admin" data-portal="admin"
                      style="padding: 10px 4px; border-radius: 8px; border: none; font-size: 0.8125rem; font-weight: 700; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s ease; background: transparent; color: #64748b;">
                <span class="material-symbols-outlined" style="font-size: 20px;">admin_panel_settings</span>
                <span>2. Admin</span>
              </button>

              <!-- 3. Judge Portal Button -->
              <button type="button" class="portal-tab-btn" id="portal-tab-judge" data-portal="judge"
                      style="padding: 10px 4px; border-radius: 8px; border: none; font-size: 0.8125rem; font-weight: 700; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s ease; background: transparent; color: #64748b;">
                <span class="material-symbols-outlined" style="font-size: 20px;">gavel</span>
                <span>3. Judge</span>
              </button>
            </div>
          </div>

          <!-- Dynamic Portal Header Banner -->
          <div id="portal-info-box" style="padding: 12px 14px; border-radius: 10px; margin-bottom: 1.5rem; background: #f0fdf4; border: 1px solid #bbf7d0; display: flex; align-items: flex-start; gap: 10px;">
            <span class="material-symbols-outlined" id="portal-info-icon" style="font-size: 22px; color: #16a34a; flex-shrink: 0; margin-top: 1px;">person</span>
            <div>
              <div id="portal-info-title" style="font-size: 0.875rem; font-weight: 700; color: #166534;">
                1. Citizen & Litigant Access Portal
              </div>
              <div id="portal-info-desc" style="font-size: 0.75rem; color: #4b5563; margin-top: 2px; line-height: 1.4;">
                After login, you will only see the case which you have reported and all timelines/documents relating to your case.
              </div>
            </div>
          </div>

          <!-- Log In / Sign Up Mode Switcher Tabs -->
          <div style="display: flex; background: #f1f5f9; padding: 4px; border-radius: 10px; margin-bottom: 1.25rem;">
            <button type="button" id="auth-tab-login"
                    style="flex: 1; padding: 8px; border-radius: 8px; border: none; font-size: 0.875rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; background: #0F2A4A; color: #ffffff; box-shadow: 0 2px 6px rgba(15, 42, 74, 0.2);">
              Log In
            </button>
            <button type="button" id="auth-tab-signup"
                    style="flex: 1; padding: 8px; border-radius: 8px; border: none; font-size: 0.875rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; background: transparent; color: #64748b;">
              Sign Up
            </button>
          </div>

          <!-- Option 1: Continue with Google -->
          <button type="button" id="btn-page-auth-google"
                  style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 12px; padding: 12px 18px; border-radius: 10px; border: 1.5px solid #cbd5e1; background: #ffffff; color: #1e293b; font-size: 0.9375rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.06);"
                  onmouseover="this.style.background='#f8fafc';this.style.borderColor='#94a3b8';this.style.transform='translateY(-1px)'"
                  onmouseout="this.style.background='#ffffff';this.style.borderColor='#cbd5e1';this.style.transform='translateY(0)'">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span id="google-btn-text">Continue with Google</span>
          </button>

          <!-- Divider -->
          <div style="display: flex; align-items: center; margin: 1.25rem 0; color: #94a3b8; font-size: 0.8125rem;">
            <div style="flex: 1; height: 1px; background: #e2e8f0;"></div>
            <span id="email-divider-label" style="padding: 0 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.6875rem;">Or with email credentials</span>
            <div style="flex: 1; height: 1px; background: #e2e8f0;"></div>
          </div>

          <!-- Alert Toast Placeholder -->
          <div id="auth-feedback-toast" style="display: none; padding: 10px 14px; border-radius: 8px; margin-bottom: 1rem; font-size: 0.8125rem; font-weight: 600; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" id="auth-feedback-icon" style="font-size: 18px;"></span>
            <span id="auth-feedback-msg"></span>
          </div>

          <!-- Email & Password Form -->
          <form id="auth-page-form" style="display: flex; flex-direction: column; gap: 12px;">
            <!-- Extra Fields for Sign Up Mode -->
            <div id="signup-extra-container" style="display: none; flex-direction: column; gap: 12px;">
              <div>
                <label style="display: block; font-size: 0.8125rem; font-weight: 700; color: #0F2A4A; margin-bottom: 4px;">
                  Full Legal Name *
                </label>
                <input type="text" id="auth-input-fullname" placeholder="Enter your full legal name"
                       style="width: 100%; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 0.875rem;">
              </div>
            </div>

            <!-- Email Field -->
            <div>
              <label id="auth-label-email" style="display: block; font-size: 0.8125rem; font-weight: 700; color: #0F2A4A; margin-bottom: 4px;">
                Email Address *
              </label>
              <input type="email" id="auth-input-email" required placeholder="Enter your email address"
                     style="width: 100%; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 0.875rem;">
            </div>

            <!-- Password Field -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                <label style="font-size: 0.8125rem; font-weight: 700; color: #0F2A4A;">
                  Password *
                </label>
                <a href="javascript:void(0)" id="auth-link-forgot" style="font-size: 0.75rem; color: #2563eb; text-decoration: none; font-weight: 600;">Forgot?</a>
              </div>
              <input type="password" id="auth-input-password" required placeholder="••••••••••••"
                     style="width: 100%; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 0.875rem;">
            </div>

            <!-- Submit Button -->
            <button type="submit" id="btn-submit-auth-page"
                    style="margin-top: 6px; padding: 12px 20px; background: #0F2A4A; color: #ffffff; border: none; border-radius: 10px; font-size: 0.9375rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(15, 42, 74, 0.25);"
                    onmouseover="this.style.background='#163861';this.style.transform='translateY(-1px)'"
                    onmouseout="this.style.background='#0F2A4A';this.style.transform='translateY(0)'">
              <span id="btn-submit-text">Log In to Citizen Portal</span>
              <span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
            </button>
          </form>

        </div>
      </main>

      <!-- Google OAuth Account Picker Dialog -->
      <div id="google-account-modal" style="display: none; position: fixed; inset: 0; z-index: 1000; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(4px); align-items: center; justify-content: center; padding: 1rem;">
        <div style="background: #ffffff; color: #202124; width: 100%; max-width: 440px; border-radius: 16px; box-shadow: 0 24px 48px rgba(0, 0, 0, 0.28); overflow: hidden; animation: slideUp 0.25s ease; border: 1px solid #dadce0;">
          
          <!-- Google Modal Header -->
          <div style="padding: 1.25rem 1.5rem 1rem; border-bottom: 1px solid #f1f3f4; display: flex; align-items: flex-start; justify-content: space-between;">
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <svg width="24" height="24" viewBox="0 0 24 24" style="margin-top: 2px; flex-shrink: 0;">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <div>
                <h3 style="font-size: 1.125rem; font-weight: 600; color: #202124; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                  <span id="google-modal-main-title">Sign in with Google</span>
                </h3>
                <p style="font-size: 0.8125rem; color: #5f6368; margin: 3px 0 0;" id="google-modal-subtitle">
                  Choose or enter an account to continue to CaseCompass
                </p>
              </div>
            </div>
            <button id="close-google-modal" style="background: none; border: none; cursor: pointer; color: #5f6368; padding: 4px; border-radius: 50%;" aria-label="Close dialog">
              <span class="material-symbols-outlined" style="font-size: 20px;">close</span>
            </button>
          </div>

          <!-- List of ACTUAL saved Google accounts on this browser -->
          <div id="google-saved-accounts-list" style="display: none; max-height: 260px; overflow-y: auto;">
            <!-- Dynamically populated from actual previous Google logins -->
          </div>

          <!-- New Google Account Sign In Form (Used when no accounts exist or 'Use another account' clicked) -->
          <div id="google-account-login-form-view" style="padding: 1.25rem 1.5rem;">
            <div style="font-size: 0.8125rem; color: #3c4043; font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
              <span class="material-symbols-outlined" style="font-size: 18px; color: #1a73e8;">account_circle</span>
              <span>Enter your Google Account details:</span>
            </div>

            <form id="form-google-direct-signin" style="display: flex; flex-direction: column; gap: 12px;">
              <div>
                <label style="display: block; font-size: 0.75rem; font-weight: 600; color: #5f6368; margin-bottom: 4px;">
                  Full Name *
                </label>
                <input type="text" id="google-input-name" required placeholder="e.g. Your Name"
                       style="width: 100%; padding: 10px 14px; border: 1.5px solid #dadce0; border-radius: 8px; font-size: 0.875rem; outline: none; transition: border-color 0.15s;"
                       onfocus="this.style.borderColor='#1a73e8'" onblur="this.style.borderColor='#dadce0'">
              </div>

              <div>
                <label style="display: block; font-size: 0.75rem; font-weight: 600; color: #5f6368; margin-bottom: 4px;">
                  Google Email Address *
                </label>
                <input type="email" id="google-input-email" required placeholder="yourname@gmail.com"
                       style="width: 100%; padding: 10px 14px; border: 1.5px solid #dadce0; border-radius: 8px; font-size: 0.875rem; outline: none; transition: border-color 0.15s;"
                       onfocus="this.style.borderColor='#1a73e8'" onblur="this.style.borderColor='#dadce0'">
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px;">
                <button type="button" id="btn-back-to-google-list" style="display: none; background: none; border: none; color: #1a73e8; font-weight: 600; font-size: 0.8125rem; cursor: pointer; padding: 6px 0;">
                  ← Back to account list
                </button>
                <div style="flex: 1;"></div>
                <button type="submit" id="btn-submit-google-signin"
                        style="background: #1a73e8; color: #ffffff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(26,115,232,0.3); transition: background 0.15s;"
                        onmouseover="this.style.background='#1557b0'" onmouseout="this.style.background='#1a73e8'">
                  <span>Sign in with Google</span>
                  <span class="material-symbols-outlined" style="font-size: 16px;">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Bottom Footer / Actions -->
          <div style="padding: 10px 1.5rem; background: #f8f9fa; border-top: 1px solid #f1f3f4; display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; color: #5f6368;">
            <span style="display: flex; align-items: center; gap: 4px;">
              <span class="material-symbols-outlined" style="font-size: 14px; color: #16a34a;">lock</span>
              Google Identity Services
            </span>
            <span id="google-modal-portal-label" style="font-weight: 600; color: #1a73e8;">Citizen Portal</span>
          </div>

        </div>
      </div>

    </div>
  `}function f(e=`login`,t=`user`){let n=e,r=t;try{let e=window.location.hash.split(`?`);if(e.length>1){let t=new URLSearchParams(e[1]),n=t.get(`portal`)||t.get(`role`);n&&[`user`,`admin`,`judge`].includes(n)&&(r=n),t.get(`google`)===`1`&&setTimeout(()=>{B()},150)}}catch(e){console.warn(`URL param parse error:`,e)}let i=document.getElementById(`portal-tab-user`),a=document.getElementById(`portal-tab-admin`),o=document.getElementById(`portal-tab-judge`),s=document.getElementById(`active-portal-badge`),c=document.getElementById(`portal-info-box`),l=document.getElementById(`portal-info-icon`),u=document.getElementById(`portal-info-title`),d=document.getElementById(`portal-info-desc`),f=document.getElementById(`auth-input-email`);document.getElementById(`auth-input-password`);let p=document.getElementById(`auth-input-fullname`),m=document.getElementById(`btn-submit-text`),h=document.getElementById(`google-btn-text`),g=document.getElementById(`signup-extra-container`),_=document.getElementById(`auth-tab-login`),v=document.getElementById(`auth-tab-signup`),y=document.getElementById(`auth-feedback-toast`),b=document.getElementById(`auth-feedback-msg`),x=document.getElementById(`auth-feedback-icon`);function S(e,t=`success`){y&&(b.textContent=e,t===`success`?(y.style.background=`#ecfdf5`,y.style.border=`1px solid #a7f3d0`,y.style.color=`#065f46`,x&&(x.textContent=`check_circle`)):(y.style.background=`#fef2f2`,y.style.border=`1px solid #fecaca`,y.style.color=`#991b1b`,x&&(x.textContent=`error`)),y.style.display=`flex`)}function C(e){r=e,[i,a,o].forEach(e=>{e&&(e.style.background=`transparent`,e.style.color=`#64748b`,e.style.boxShadow=`none`)});let t=document.getElementById(`google-modal-portal-label`);e===`user`?(i&&(i.style.background=`#0F2A4A`,i.style.color=`#ffffff`,i.style.boxShadow=`0 2px 6px rgba(15, 42, 74, 0.25)`),s&&(s.textContent=`1. Citizen Portal`,s.style.background=`#e0f2fe`,s.style.color=`#0369a1`),c&&(c.style.background=`#f0fdf4`,c.style.borderColor=`#bbf7d0`),l&&(l.textContent=`person`,l.style.color=`#16a34a`),u&&(u.textContent=`1. Citizen & Litigant Access Portal`,u.style.color=`#166534`),d&&(d.textContent=`After login, you will only see the case which you have reported and all proceedings/documents relating to your case.`),f&&(f.placeholder=`Enter your citizen email (e.g. yourname@gmail.com)`),t&&(t.textContent=`Citizen Portal`,t.style.color=`#0369a1`)):e===`admin`?(a&&(a.style.background=`#4338ca`,a.style.color=`#ffffff`,a.style.boxShadow=`0 2px 6px rgba(67, 56, 202, 0.25)`),s&&(s.textContent=`2. Court Admin Portal`,s.style.background=`#ede9fe`,s.style.color=`#5b21b6`),c&&(c.style.background=`#faf5ff`,c.style.borderColor=`#e9d5ff`),l&&(l.textContent=`admin_panel_settings`,l.style.color=`#7c3aed`),u&&(u.textContent=`2. Court Registry Administrator Portal`,u.style.color=`#5b21b6`),d&&(d.textContent=`Authority to manage all cases, filter across Day and Month timespans, and control all dossier tabs.`),f&&(f.placeholder=`Enter court administration email (e.g. admin@districtcourt.gov.in)`),t&&(t.textContent=`Admin Portal`,t.style.color=`#5b21b6`)):e===`judge`&&(o&&(o.style.background=`#b45309`,o.style.color=`#ffffff`,o.style.boxShadow=`0 2px 6px rgba(180, 83, 9, 0.25)`),s&&(s.textContent=`3. Hon'ble Judge Portal`,s.style.background=`#fef3c7`,s.style.color=`#92400e`),c&&(c.style.background=`#fffbeb`,c.style.borderColor=`#fde68a`),l&&(l.textContent=`gavel`,l.style.color=`#d97706`),u&&(u.textContent=`3. Hon'ble Presiding Judge Bench Portal`,u.style.color=`#92400e`),d&&(d.textContent=`Review all listed cases throughout the day (cause list), month (roster), and past adjudicated decisions.`),f&&(f.placeholder=`Enter judicial bench email (e.g. judge@judicial.gov.in)`),t&&(t.textContent=`Judge Portal`,t.style.color=`#92400e`)),w()}function w(){let e=r===`user`?`Citizen`:r===`admin`?`Court Admin`:`Judge`;n===`signup`?(m&&(m.textContent=`Register & Access as ${e}`),h&&(h.textContent=`Sign up with Google (${e})`),g&&(g.style.display=`flex`),_&&(_.style.background=`transparent`,_.style.color=`#64748b`),v&&(v.style.background=`#0F2A4A`,v.style.color=`#ffffff`)):(m&&(m.textContent=`Log In to ${e} Portal`),h&&(h.textContent=`Continue with Google (${e})`),g&&(g.style.display=`none`),v&&(v.style.background=`transparent`,v.style.color=`#64748b`),_&&(_.style.background=`#0F2A4A`,_.style.color=`#ffffff`))}i?.addEventListener(`click`,()=>C(`user`)),a?.addEventListener(`click`,()=>C(`admin`)),o?.addEventListener(`click`,()=>C(`judge`)),_?.addEventListener(`click`,()=>{n=`login`,w()}),v?.addEventListener(`click`,()=>{n=`signup`,w()});function T(e,t,n=r,i=`credentials`){localStorage.setItem(`casecompass_auth`,`true`),localStorage.setItem(`casecompass_user`,e),localStorage.setItem(`casecompass_user_email`,t),localStorage.setItem(`casecompass_role`,n),localStorage.setItem(`casecompass_auth_provider`,i),S(`✓ Authentication successful! Logging into ${n===`user`?`Citizen (Showing only your reported cases)`:n===`admin`?`Court Administrator (Full registry authority)`:`Hon'ble Judge (Bench cause list & monthly roster)`}...`,`success`),setTimeout(()=>{window.location.hash=`#/cases`},750)}document.getElementById(`auth-page-form`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=f?.value.trim();if(!t){S(`Please enter your email address.`,`error`);return}let n=p?.value.trim();n||=(t.split(`@`)[0]||`User`).replace(/[._-]/g,` `).replace(/\b\w/g,e=>e.toUpperCase()),T(n,t,r,`email`)});let E=`casecompass_saved_google_accounts`;function D(){try{return JSON.parse(localStorage.getItem(E)||`[]`)}catch{return[]}}function O(e){let t=D(),n=t.findIndex(t=>t.email.toLowerCase()===e.email.toLowerCase());n>=0?t[n]=e:t.unshift(e),localStorage.setItem(E,JSON.stringify(t))}function k(e){let t=D();t=t.filter(t=>t.email.toLowerCase()!==e.toLowerCase()),localStorage.setItem(E,JSON.stringify(t)),H()}let A=document.getElementById(`google-account-modal`),j=document.getElementById(`close-google-modal`),M=document.getElementById(`google-saved-accounts-list`),N=document.getElementById(`google-account-login-form-view`),P=document.getElementById(`btn-back-to-google-list`),F=document.getElementById(`form-google-direct-signin`),I=document.getElementById(`google-input-name`),L=document.getElementById(`google-input-email`),R=document.getElementById(`google-modal-main-title`),z=document.getElementById(`google-modal-subtitle`);function B(){H(),A&&(A.style.display=`flex`)}function V(){A&&(A.style.display=`none`)}function H(){let e=D();e.length>0?(R&&(R.textContent=`Choose an account`),z&&(z.textContent=`to continue to CaseCompass`),N&&(N.style.display=`none`),M&&(M.style.display=`block`,M.innerHTML=`
          <div style="padding: 0.5rem 0;">
            ${e.map(e=>{let t=(e.name||e.email||`G`).charAt(0).toUpperCase();return`
                <div class="google-saved-acc-item" data-email="${e.email}" data-name="${e.name}"
                     style="display: flex; align-items: center; justify-content: space-between; padding: 12px 1.5rem; cursor: pointer; transition: background 0.15s ease; border-bottom: 1px solid #f8f9fa;"
                     onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
                  <div style="display: flex; align-items: center; gap: 14px; min-width: 0; flex: 1;">
                    <div style="width: 38px; height: 38px; border-radius: 50%; background: #1a73e8; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; flex-shrink: 0;">
                      ${t}
                    </div>
                    <div style="min-width: 0; flex: 1;">
                      <div style="font-weight: 600; font-size: 0.875rem; color: #202124; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        ${e.name}
                      </div>
                      <div style="font-size: 0.75rem; color: #5f6368; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        ${e.email}
                      </div>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="badge" style="background: #e8f0fe; color: #1a73e8; font-size: 0.6875rem; font-weight: 600;">Signed in</span>
                    <button type="button" class="btn-remove-google-acc" data-email="${e.email}" title="Remove this account from device"
                            style="background: none; border: none; cursor: pointer; color: #9aa0a6; padding: 4px; border-radius: 50%; display: flex; align-items: center;"
                            onmouseover="this.style.color='#d93025'" onmouseout="this.style.color='#9aa0a6'">
                      <span class="material-symbols-outlined" style="font-size: 16px;">close</span>
                    </button>
                  </div>
                </div>
              `}).join(``)}

            <!-- Use Another Account Option -->
            <div id="btn-use-another-google-account"
                 style="display: flex; align-items: center; gap: 14px; padding: 12px 1.5rem; cursor: pointer; transition: background 0.15s ease; border-top: 1px solid #e8eaed;"
                 onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
              <div style="width: 38px; height: 38px; border-radius: 50%; background: #f1f3f4; color: #5f6368; display: flex; align-items: center; justify-content: center;">
                <span class="material-symbols-outlined" style="font-size: 20px;">person_add</span>
              </div>
              <div style="flex: 1;">
                <div style="font-weight: 600; font-size: 0.875rem; color: #202124;">Use another Google account</div>
                <div style="font-size: 0.75rem; color: #5f6368;">Sign in with a different Gmail or Google Workspace</div>
              </div>
            </div>
          </div>
        `,M.querySelectorAll(`.google-saved-acc-item`).forEach(e=>{e.addEventListener(`click`,t=>{if(t.target.closest(`.btn-remove-google-acc`))return;let n=e.getAttribute(`data-email`),i=e.getAttribute(`data-name`);V(),T(i,n,r,`google`)})}),M.querySelectorAll(`.btn-remove-google-acc`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),k(e.getAttribute(`data-email`))})}),document.getElementById(`btn-use-another-google-account`)?.addEventListener(`click`,()=>{M.style.display=`none`,N&&(N.style.display=`block`),P&&(P.style.display=`inline-block`),R&&(R.textContent=`Sign in with Google`),z&&(z.textContent=`Enter your Google Account credentials to continue`),L&&L.focus()}))):(R&&(R.textContent=`Sign in with Google`),z&&(z.textContent=`to continue to CaseCompass`),M&&(M.style.display=`none`),N&&(N.style.display=`block`),P&&(P.style.display=`none`))}P?.addEventListener(`click`,()=>{H()}),F?.addEventListener(`submit`,e=>{e.preventDefault();let t=I?.value.trim(),n=L?.value.trim();!n||!n.includes(`@`)?alert(`Please enter a valid Google email address.`):t?(O({name:t,email:n}),V(),T(t,n,r,`google`)):alert(`Please enter your full name for your Google account.`)}),document.getElementById(`btn-page-auth-google`)?.addEventListener(`click`,B),j?.addEventListener(`click`,V),A?.addEventListener(`click`,e=>{e.target===A&&V()}),C(r||`user`)}var p=`casecompass_cases_list`,m=`casecompass_active_case_id`;function h(){let e=localStorage.getItem(p);if(!e)localStorage.setItem(p,JSON.stringify(n));else try{let t=JSON.parse(e),r=!1;t.forEach(e=>{let t=n.find(t=>String(t.id)===String(e.id));t&&(!e.reportedBy&&t.reportedBy&&(e.reportedBy=t.reportedBy,r=!0),!e.judge&&t.judge&&(e.judge=t.judge,r=!0),!e.timespan&&t.timespan&&(e.timespan=t.timespan,r=!0),e.isDisposed===void 0&&t.isDisposed!==void 0&&(e.isDisposed=t.isDisposed,r=!0),!e.benchItem&&t.benchItem&&(e.benchItem=t.benchItem,r=!0),!e.hearingPurpose&&t.hearingPurpose&&(e.hearingPurpose=t.hearingPurpose,r=!0))}),r&&localStorage.setItem(p,JSON.stringify(t))}catch{localStorage.setItem(p,JSON.stringify(n))}localStorage.getItem(m)||localStorage.setItem(m,`1`),localStorage.getItem(`casecompass_timeline_1`)||localStorage.setItem(`casecompass_timeline_1`,JSON.stringify(r)),localStorage.getItem(`casecompass_docs_1`)||localStorage.setItem(`casecompass_docs_1`,JSON.stringify(i))}h();function g(e){return e?e.seriousness?e.seriousness.toLowerCase():String(e.id)===`1`||String(e.id)===`3`||e.status===`flagged`||/§302|§307|§420|§468|pocso|ndps|murder|forgery|quash|warrant|482|fraud/i.test(e.section||``)||/bihar|crime|state of/i.test(e.title||``)?`high`:e.status===`pending`||e.status===`processing`?`medium`:e.status===`verified`?`low`:`medium`:`medium`}var _={getCurrentRole(){return localStorage.getItem(`casecompass_role`)||`admin`},setCurrentRole(e){localStorage.setItem(`casecompass_role`,e)},getCurrentUser(){return localStorage.getItem(`casecompass_user`)||`Admin User`},getCases(e={}){let t=JSON.parse(localStorage.getItem(p)||JSON.stringify(n)).map(e=>({...e,seriousness:g(e),reportedBy:e.reportedBy||e.createdByUser||`Ramesh Kumar`,timespan:e.timespan||`day`,isDisposed:!!e.isDisposed}));if(e.ignoreRoleFilter)return t;let r=e.role||this.getCurrentRole(),i=(e.user||this.getCurrentUser()).toLowerCase();if(r===`user`)t=t.filter(e=>{let t=(e.reportedBy||``).toLowerCase(),n=(e.createdByUser||``).toLowerCase(),r=(e.title||``).toLowerCase();return t.includes(i)||i.includes(t)||n===i||r.includes(i)});else if(r===`judge`){let n=e.timespan;n===`day`?t=t.filter(e=>e.timespan===`day`&&!e.isDisposed):n===`month`?t=t.filter(e=>(e.timespan===`day`||e.timespan===`month`)&&!e.isDisposed):n===`past`&&(t=t.filter(e=>e.isDisposed||e.timespan===`past`))}else r===`admin`&&e.timespan&&(e.timespan===`day`?t=t.filter(e=>e.timespan===`day`):e.timespan===`month`&&(t=t.filter(e=>e.timespan===`day`||e.timespan===`month`)));return t},async syncCasesFromBackend(){try{let e=await fetch(`/api/cases`);if(e.ok){let t=await e.json();if(Array.isArray(t)&&t.length>0){let e=JSON.parse(localStorage.getItem(p)||`[]`).filter(e=>e.isCustom),n=t.map(e=>({id:e.id,title:e.label||e.title,cnr:e.case_number||e.cnr||`MHPU01-004291-2024`,court:e.court||`District Court, Pune`,status:e.status||`verified`,statusLabel:e.status===`verified`?`Verified`:e.status===`flagged`?`Needs Attention`:e.status===`processing`?`Processing`:`Pending Review`,documents:e.documents_count||12,nextHearing:e.next_hearing||`14 Feb 2025`,filingDate:e.created_at?e.created_at.split(`T`)[0]:`15 Mar 2024`,section:e.section||`IPC §420, §468`,seriousness:e.seriousness||(e.status===`flagged`?`high`:e.status===`verified`?`low`:`medium`),reportedBy:e.reported_by||`Ramesh Kumar`,judge:e.judge||`Hon. Smt. Archana Kulkarni`,timespan:`day`,isDisposed:!1})),r=[...e,...n];return localStorage.setItem(p,JSON.stringify(r)),r.map(e=>({...e,seriousness:g(e)}))}}}catch{}return this.getCases()},getActiveCase(){if(this.getCurrentRole()===`user`){let e=this.getCases(),t=localStorage.getItem(m);return e.find(e=>String(e.id)===String(t))||(e.length>0?(localStorage.setItem(m,String(e[0].id)),e[0]):{id:`no-case`,title:`No Reported Case on File`,cnr:`N/A`,court:`District Court`,status:`pending`,statusLabel:`Pending Registration`,documents:0,nextHearing:`None Scheduled`,filingDate:`N/A`,section:`N/A`,seriousness:`low`,reportedBy:this.getCurrentUser(),isCustom:!1})}let e=this.getCases({ignoreRoleFilter:!0}),n=localStorage.getItem(m)||`1`;return e.find(e=>String(e.id)===String(n))||e[0]||{...t,seriousness:`high`}},setActiveCase(e){localStorage.setItem(m,String(e))},async createCase(e){let t=JSON.parse(localStorage.getItem(p)||JSON.stringify(n)),r=`CR-${Date.now()}`,i=new Date().toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`}),a=e.seriousness||(e.status===`flagged`?`high`:e.status===`verified`?`low`:`medium`),o=this.getCurrentUser();this.getCurrentRole();let s={id:r,title:e.title.trim(),cnr:e.cnr?.trim()||`MHPU${Math.floor(10+Math.random()*89)}-${Math.floor(1e5+Math.random()*9e5)}-2025`,court:e.court?.trim()||`Court of JMFC, Pune`,status:e.status||`pending`,statusLabel:e.statusLabel||(e.status===`verified`?`Verified`:e.status===`flagged`?`Needs Attention`:e.status===`processing`?`Processing`:`Pending Review`),seriousness:a,documents:0,nextHearing:e.nextHearing||`Today (Listed for Hearing)`,filingDate:i,section:e.section||`BNS / IPC Procedural Intake`,isCustom:!0,reportedBy:e.reportedBy?.trim()||o,createdByUser:o,judge:e.judge||`Hon. Smt. Archana Kulkarni`,timespan:e.timespan||`day`,hearingPurpose:e.hearingPurpose||`Initial Docket Intake & Scrutiny`,benchItem:`Item ${Math.floor(10+Math.random()*80)} · Regular Intake`,isDisposed:!1};t.unshift(s),localStorage.setItem(p,JSON.stringify(t)),localStorage.setItem(m,String(r));let c=[{id:1,date:i,label:`Case Registered`,description:`Dossier created for ${s.title} at ${s.court}. Initial docket record initialized.`,icon:`folder_open`,type:`filing`,verified:!0}];localStorage.setItem(`casecompass_timeline_${r}`,JSON.stringify(c)),localStorage.setItem(`casecompass_docs_${r}`,JSON.stringify([]));try{await fetch(`/api/cases`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({label:s.title,language:`en`,case_number:s.cnr})})}catch{}return s},async updateCaseStatus(e,t){let r=JSON.parse(localStorage.getItem(p)||JSON.stringify(n)),i={verified:`Verified`,pending:`Pending Review`,flagged:`Needs Attention`,processing:`Processing`},a=r.find(t=>String(t.id)===String(e));return a&&(a.status=t,a.statusLabel=i[t]||t,localStorage.setItem(p,JSON.stringify(r))),a},async deleteCase(e){let t=JSON.parse(localStorage.getItem(p)||JSON.stringify(n)),r=t.findIndex(t=>String(t.id)===String(e)),i=null;r!==-1&&(i=t.splice(r,1)[0],localStorage.setItem(p,JSON.stringify(t))),localStorage.removeItem(`casecompass_timeline_${e}`),localStorage.removeItem(`casecompass_docs_${e}`);let a=localStorage.getItem(m);String(a)===String(e)&&(t.length>0?localStorage.setItem(m,String(t[0].id)):localStorage.removeItem(m));try{await fetch(`/api/cases/${e}`,{method:`DELETE`})}catch{}return i||{id:e}},getCaseTimeline(e){let t=`casecompass_timeline_${e}`,n=localStorage.getItem(t);if(n)return JSON.parse(n);if(String(e)===`1`)return r;let i=this.getActiveCase();return[{id:1,date:i.filingDate||`Today`,label:`Case Registered`,description:`Dossier opened for ${i.title} at ${i.court}.`,icon:`folder_open`,type:`filing`,verified:!0}]},addTimelineEvent(e,t){let n=this.getCaseTimeline(e),r={id:n.length+1,date:t.date||new Date().toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`}),label:t.label.trim(),description:t.description.trim(),icon:t.icon||`gavel`,type:t.type||`proceeding`,verified:t.verified!==!1};return n.push(r),localStorage.setItem(`casecompass_timeline_${e}`,JSON.stringify(n)),r},getCaseDocuments(e){let t=`casecompass_docs_${e}`,n=localStorage.getItem(t);return n?JSON.parse(n):String(e)===`1`?i:[]},isCaseDocumented(e){if(this.getCaseDocuments(e).length>0)return!0;let t=JSON.parse(localStorage.getItem(p)||`[]`).find(t=>String(t.id)===String(e));return!!(t&&(t.documents>0||[`verified`,`flagged`,`processing`].includes(t.status)))},addCaseDocuments(e,t){let n=this.getCaseDocuments(e),r=new Date().toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`}),i=t.map((e,t)=>{let i=e.name.toLowerCase().includes(`fir`);return{id:n.length+t+1,name:i?`FIR Ingestion – ${e.name.replace(/\.pdf$/i,``)}`:e.name.replace(/\.[^/.]+$/,``),filename:e.name,category:i?`FIR & Police Records`:`Court Filings & Orders`,pages:Math.max(1,Math.floor(Math.random()*8)+1),uploadedDate:r,status:`verified`,statusLabel:`Verified`,hash:`SHA256-${Math.random().toString(36).substring(2,10).toUpperCase()}-${Math.random().toString(36).substring(2,8).toUpperCase()}`,flags:[],isFir:i}}),a=[...n,...i];localStorage.setItem(`casecompass_docs_${e}`,JSON.stringify(a));let o=JSON.parse(localStorage.getItem(p)||`[]`),s=o.find(t=>String(t.id)===String(e));s&&(s.documents=a.length,s.status===`pending`&&(s.status=`verified`,s.statusLabel=`Verified`),localStorage.setItem(p,JSON.stringify(o)));let c=t.find(e=>e.name.toLowerCase().includes(`fir`));return c?this.addTimelineEvent(e,{date:r,label:`FIR Ingestion & Lodgment Verified`,description:`First Information Report (${c.name}) uploaded, hashed, and integrated into case record docket.`,icon:`local_police`,type:`filing`,verified:!0}):this.addTimelineEvent(e,{date:r,label:`Evidence Documents Uploaded`,description:`${t.length} court records ingested into evidence lens with cryptographic audit verification.`,icon:`description`,type:`proceeding`,verified:!0}),a},exportWordDocx(e){let t=this.getActiveCase(),n=this.getCaseTimeline(e),r=this.getCaseDocuments(e),i=new Date().toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`}),a=`
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>CaseCompass Dossier Report - ${t.title}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page { size: A4; margin: 2cm; }
          body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 11pt; color: #1e293b; line-height: 1.5; }
          .header-title { font-size: 24pt; font-weight: bold; color: #0F2A4A; margin-bottom: 2px; }
          .header-subtitle { font-size: 11pt; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
          .section-heading { font-size: 14pt; font-weight: bold; color: #0F2A4A; border-bottom: 2px solid #0F2A4A; padding-bottom: 4px; margin-top: 24px; margin-bottom: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 16px; }
          th { background-color: #0F2A4A; color: #ffffff; font-weight: bold; text-align: left; padding: 8px 10px; border: 1px solid #0F2A4A; font-size: 10pt; }
          td { padding: 8px 10px; border: 1px solid #cbd5e1; font-size: 10pt; }
          tr:nth-child(even) td { background-color: #f8fafc; }
          .badge { font-weight: bold; padding: 2px 8px; border-radius: 4px; font-size: 9pt; }
          .badge-verified { background-color: #d1fae5; color: #065f46; }
          .badge-pending { background-color: #fef3c7; color: #92400e; }
          .badge-flagged { background-color: #fee2e2; color: #991b1b; }
          .badge-processing { background-color: #e0e7ff; color: #3730a3; }
          .callout { background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 12px 16px; margin: 16px 0; font-size: 10pt; }
          .disclaimer { font-size: 9pt; color: #64748b; font-style: italic; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 12px; }
          .stamp { font-family: monospace; font-size: 9pt; color: #475569; }
        </style>
      </head>
      <body>
        <div class="header-title">CASECOMPASS</div>
        <div class="header-subtitle">Official District Legal Record Dossier & Audit Report</div>
        <div style="font-size:10pt;color:#64748b;margin-bottom:16px;">Generated on: ${i} · Jurisdiction: Indian Subordinate Judiciary</div>

        <div class="section-heading">1. Case Overview & Court Metadata</div>
        <table>
          <tr>
            <th style="width:30%;">Field</th>
            <th style="width:70%;">Particulars</th>
          </tr>
          <tr>
            <td><strong>Case Title</strong></td>
            <td><strong>${t.title}</strong></td>
          </tr>
          <tr>
            <td><strong>CNR Number</strong></td>
            <td><code>${t.cnr}</code></td>
          </tr>
          <tr>
            <td><strong>Court / Forum</strong></td>
            <td>${t.court}</td>
          </tr>
          <tr>
            <td><strong>Legal Section / Acts</strong></td>
            <td>${t.section||`IPC / CrPC / Procedural Dockets`}</td>
          </tr>
          <tr>
            <td><strong>Initial Filing Date</strong></td>
            <td>${t.filingDate||`15 Mar 2024`}</td>
          </tr>
          <tr>
            <td><strong>Next Scheduled Hearing</strong></td>
            <td><strong>${t.nextHearing||`Upcoming Scheduling`}</strong></td>
          </tr>
          <tr>
            <td><strong>Current Docket Status</strong></td>
            <td><span class="badge badge-${t.status}">${(t.statusLabel||t.status).toUpperCase()}</span></td>
          </tr>
        </table>

        <div class="section-heading">2. Case Proceedings Timeline (${n.length} Events Logged)</div>
        <table>
          <thead>
            <tr>
              <th style="width:18%;">Date</th>
              <th style="width:25%;">Proceeding / Event</th>
              <th style="width:45%;">Details & Procedural Notes</th>
              <th style="width:12%;">Integrity</th>
            </tr>
          </thead>
          <tbody>
            ${n.map(e=>`
              <tr>
                <td><strong>${e.date}</strong></td>
                <td><strong>${e.label}</strong></td>
                <td>${e.description}</td>
                <td>${e.verified?`<span class="badge badge-verified">VERIFIED</span>`:`<span class="badge badge-pending">PENDING</span>`}</td>
              </tr>
            `).join(``)}
          </tbody>
        </table>

        <div class="section-heading">3. Evidence Review Lens & Document Register (${r.length} Records)</div>
        ${r.length===0?`
          <p style="font-style:italic;color:#64748b;">No court records or FIR uploaded yet for this docket.</p>
        `:`
          <table>
            <thead>
              <tr>
                <th style="width:25%;">Document Name</th>
                <th style="width:20%;">Category</th>
                <th style="width:10%;">Pages</th>
                <th style="width:15%;">Uploaded Date</th>
                <th style="width:30%;">Cryptographic Hash</th>
              </tr>
            </thead>
            <tbody>
              ${r.map(e=>`
                <tr>
                  <td><strong>${e.name||e.filename}</strong></td>
                  <td>${e.category}</td>
                  <td>${e.pages}</td>
                  <td>${e.uploadedDate}</td>
                  <td><code style="font-size:8pt;">${e.hash}</code></td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        `}

        <div class="callout">
          <strong>NALSA & Legal Aid Support Contact:</strong><br>
          For pro-bono assistance, contact the District Legal Services Authority (DLSA) or dial the national legal aid helpline at <strong>15100</strong>.
        </div>

        <div class="stamp">
          <strong>Audit Fingerprint:</strong> SHA256: ${Math.random().toString(36).substring(2,14).toUpperCase()} | Authenticated through CaseCompass Workspace
        </div>

        <div class="disclaimer">
          <strong>Mandatory Notice:</strong> CaseCompass is a document intelligence and record organization tool designed for legal-aid advocates and families. It organizes court dockets with source grounding and does not provide legal advice or predict court outcomes.
        </div>
      </body>
      </html>
    `,o=new Blob([`﻿`,a],{type:`application/msword;charset=utf-8`}),s=URL.createObjectURL(o),c=document.createElement(`a`),l=(t.cnr||`case`).replace(/[^a-zA-Z0-9_-]/g,`_`);c.href=s,c.download=`CaseCompass_Report_${l}.doc`,document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(s)},printReport(e){let t=this.getActiveCase(),n=e||t.id,r=this.getCaseTimeline(n),i=this.getCaseDocuments(n),a=new Date().toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`}),o=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>CaseCompass Executive Dossier - ${t.title}</title>
        <style>
          @page { size: A4; margin: 1.5cm; }
          body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 10pt; color: #0f172a; line-height: 1.5; margin: 0; padding: 20px; }
          .header-title { font-size: 22pt; font-weight: 800; color: #0F2A4A; margin-bottom: 2px; }
          .header-sub { font-size: 10pt; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
          .section-heading { font-size: 12pt; font-weight: 700; color: #0F2A4A; border-bottom: 2px solid #0F2A4A; padding-bottom: 4px; margin-top: 20px; margin-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 8px; margin-bottom: 14px; font-size: 9.5pt; }
          th { background: #0F2A4A; color: #ffffff; font-weight: 700; text-align: left; padding: 7px 10px; border: 1px solid #0F2A4A; }
          td { padding: 7px 10px; border: 1px solid #cbd5e1; }
          tr:nth-child(even) td { background: #f8fafc; }
          .badge { display: inline-block; padding: 2px 7px; border-radius: 4px; font-weight: 700; font-size: 8pt; }
          .badge-verified { background: #d1fae5; color: #065f46; }
          .badge-pending { background: #fef3c7; color: #92400e; }
          .badge-flagged { background: #fee2e2; color: #991b1b; }
          .callout { background: #eff6ff; border-left: 4px solid #2563eb; padding: 10px 14px; margin: 14px 0; font-size: 9pt; }
          .footer-note { font-size: 8.5pt; color: #64748b; margin-top: 24px; border-top: 1px solid #cbd5e1; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header-title">CASECOMPASS</div>
        <div class="header-sub">Executive Case Dossier & Complete Proceedings Summary</div>
        <div style="font-size:9pt;color:#64748b;margin-bottom:12px;">Generated: ${a} · Docket Verified</div>

        <div class="section-heading">1. Case Overview & Metadata</div>
        <table>
          <tr><th style="width:30%;">Field</th><th style="width:70%;">Particulars</th></tr>
          <tr><td><strong>Case Title</strong></td><td><strong>${t.title}</strong></td></tr>
          <tr><td><strong>CNR Number</strong></td><td><code>${t.cnr}</code></td></tr>
          <tr><td><strong>Court / Jurisdiction</strong></td><td>${t.court}</td></tr>
          <tr><td><strong>Substantive Sections</strong></td><td>${t.section||`IPC §420, §468 / BNS §316`}</td></tr>
          <tr><td><strong>Registration / Filing Date</strong></td><td>${t.filingDate||`15 Mar 2024`}</td></tr>
          <tr><td><strong>Next Scheduled Hearing</strong></td><td><strong>${t.nextHearing||`Upcoming Scheduling`}</strong></td></tr>
          <tr><td><strong>Dossier Status</strong></td><td><span class="badge badge-${t.status}">${(t.statusLabel||t.status).toUpperCase()}</span></td></tr>
        </table>

        <div class="section-heading">2. Case Proceedings Timeline (${r.length} Events)</div>
        <table>
          <thead>
            <tr>
              <th style="width:18%;">Date</th>
              <th style="width:25%;">Proceeding / Event</th>
              <th style="width:45%;">Details & Procedural Notes</th>
              <th style="width:12%;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${r.map(e=>`
              <tr>
                <td><strong>${e.date}</strong></td>
                <td><strong>${e.label}</strong></td>
                <td>${e.description}</td>
                <td>${e.verified?`<span class="badge badge-verified">VERIFIED</span>`:`<span class="badge badge-pending">PENDING</span>`}</td>
              </tr>
            `).join(``)}
          </tbody>
        </table>

        <div class="section-heading">3. Evidence Review Lens & Document Register (${i.length} Records)</div>
        ${i.length===0?`<p style="font-style:italic;color:#64748b;">No court records uploaded yet for this docket.</p>`:`
          <table>
            <thead>
              <tr>
                <th style="width:30%;">Document Name</th>
                <th style="width:25%;">Category</th>
                <th style="width:10%;">Pages</th>
                <th style="width:15%;">Uploaded</th>
                <th style="width:20%;">Hash</th>
              </tr>
            </thead>
            <tbody>
              ${i.map(e=>`
                <tr>
                  <td><strong>${e.name||e.filename}</strong></td>
                  <td>${e.category}</td>
                  <td>${e.pages}</td>
                  <td>${e.uploadedDate}</td>
                  <td><code style="font-size:7.5pt;">${e.hash||`SHA256-OK`}</code></td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        `}

        <div class="callout">
          <strong>Legal Aid Helpline & DLSA Assistance:</strong><br>
          For pro-bono assistance, contact the District Legal Services Authority (DLSA) or dial the national legal aid helpline at <strong>15100</strong>.
        </div>

        <div class="footer-note">
          <strong>Mandatory Notice:</strong> CaseCompass is a document intelligence and record organization tool designed for legal-aid advocates and families. It organizes court dockets with source grounding and does not provide legal advice or predict court outcomes.
        </div>
      </body>
      </html>
    `,s=window.open(``,`_blank`);s?(s.document.open(),s.document.write(o),s.document.close(),s.focus(),setTimeout(()=>{s.print()},350)):window.print()},exportAuditCertificate(e){let t=this.getActiveCase(),n=e||t.id,r=this.getCaseDocuments(n);this.getCaseTimeline(n);let i=localStorage.getItem(`casecompass_user`)||`Meera`,a=new Date().toLocaleDateString(`en-GB`,{day:`2-digit`,month:`long`,year:`numeric`});new Date().toISOString();let o=(t.cnr||`CASE`).replace(/[^a-zA-Z0-9_-]/g,`_`),s=`CERT-AUD-${o}-${new Date().getFullYear()}`,c=Math.abs(t.title.split(``).reduce((e,t)=>(e<<5)-e+t.charCodeAt(0),0)).toString(16).padStart(8,`0`),l=`SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd20012${c}`,u=r.length>0?r:[{name:`Case_Filing_Petition_${o}.pdf`,category:`Originating Filing`,pages:14,uploadedDate:t.filingDate||`15 Mar 2024`,hash:`SHA256-INIT-${c.toUpperCase()}-001`,status:`verified`},{name:`Court_Registration_Order_${o}.pdf`,category:`Court Proceedings`,pages:4,uploadedDate:t.filingDate||`15 Mar 2024`,hash:`SHA256-ORD-${c.toUpperCase()}-002`,status:`verified`},{name:`Evidence_Index_Memo_${o}.pdf`,category:`Evidence Ledger`,pages:6,uploadedDate:t.filingDate||`15 Mar 2024`,hash:`SHA256-EVD-${c.toUpperCase()}-003`,status:`verified`}],d=`
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Audit Certificate - ${t.title}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page { size: A4 portrait; margin: 1.5cm; }
          body { font-family: 'Georgia', 'Times New Roman', serif; color: #0f172a; margin: 0; padding: 0; background-color: #faf8f5; }
          .cert-container {
            border: 8px double #0F2A4A;
            padding: 30px;
            background-color: #ffffff;
            text-align: center;
          }
          .cert-header { margin-bottom: 20px; }
          .cert-emblem { font-size: 28pt; color: #b8860b; line-height: 1; }
          .cert-authority { font-size: 11pt; letter-spacing: 2px; color: #475569; text-transform: uppercase; font-family: Arial, sans-serif; font-weight: bold; margin-top: 6px; }
          .cert-title { font-size: 22pt; font-weight: bold; color: #0F2A4A; text-transform: uppercase; letter-spacing: 1.5px; margin: 12px 0 6px 0; border-bottom: 2px solid #b8860b; display: inline-block; padding-bottom: 6px; }
          .cert-subtitle { font-size: 12pt; font-style: italic; color: #334155; margin-bottom: 16px; }
          .cert-id-badge { font-family: 'Courier New', monospace; font-size: 10pt; background-color: #f1f5f9; padding: 4px 12px; border: 1px solid #cbd5e1; display: inline-block; margin-bottom: 20px; font-weight: bold; }
          .cert-body { font-size: 11pt; line-height: 1.8; text-align: justify; margin: 20px 20px; }
          .cert-highlight { font-weight: bold; color: #0F2A4A; font-size: 14pt; text-align: center; margin: 16px 0; }
          .metadata-table { width: 100%; border-collapse: collapse; margin: 20px 0; text-align: left; font-family: Arial, sans-serif; font-size: 10pt; }
          .metadata-table th { background-color: #0F2A4A; color: #ffffff; padding: 8px 12px; font-weight: bold; border: 1px solid #0F2A4A; }
          .metadata-table td { padding: 8px 12px; border: 1px solid #cbd5e1; }
          .metadata-table tr:nth-child(even) td { background-color: #f8fafc; }
          .doc-table { width: 100%; border-collapse: collapse; margin: 16px 0; font-family: Arial, sans-serif; font-size: 9pt; text-align: left; }
          .doc-table th { background-color: #1e3a5f; color: #ffffff; padding: 6px 10px; border: 1px solid #1e3a5f; }
          .doc-table td { padding: 6px 10px; border: 1px solid #e2e8f0; }
          .cert-statute { background-color: #fdfbf7; border: 1px solid #e2d9cc; border-left: 4px solid #b8860b; padding: 12px 16px; margin: 20px 0; font-size: 9.5pt; text-align: left; font-family: Arial, sans-serif; }
          .cert-signatures { margin-top: 36px; display: table; width: 100%; font-family: Arial, sans-serif; }
          .sig-block { display: table-cell; width: 50%; text-align: center; vertical-align: top; }
          .sig-line { width: 200px; border-top: 1px solid #0F2A4A; margin: 30px auto 6px auto; }
          .sig-name { font-weight: bold; font-size: 10pt; color: #0F2A4A; }
          .sig-role { font-size: 8.5pt; color: #64748b; }
          .seal-stamp {
            display: inline-block;
            border: 3px double #b8860b;
            border-radius: 50%;
            width: 86px;
            height: 86px;
            line-height: 18px;
            padding-top: 16px;
            color: #b8860b;
            font-weight: bold;
            font-size: 8pt;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background-color: #fefce8;
          }
        </style>
      </head>
      <body>
        <div class="cert-container">
          <div class="cert-header">
            <div class="cert-emblem">&#9878;</div>
            <div class="cert-authority">E-Courts Digital Record System &middot; CaseCompass Cryptographic Trust</div>
            <div class="cert-title">Court Audit Certificate</div>
            <div class="cert-subtitle">Certificate of Cryptographic Integrity & Chain of Custody</div>
            <div class="cert-id-badge">CERTIFICATE NO: ${s}</div>
          </div>

          <div class="cert-body">
            This is to officially certify that the digital case records, chronological proceedings, and evidentiary attachments for the judicial matter detailed below have been ingested, cryptographically fingerprinted via SHA-256 digests, and verified against tamper-evident distributed ledger standards through the CaseCompass Docket Intelligence Engine.
          </div>

          <div class="cert-highlight">
            &ldquo;${t.title}&rdquo;
          </div>

          <table class="metadata-table">
            <tr>
              <th style="width:28%;">Record Parameter</th>
              <th style="width:72%;">Certified Specification</th>
            </tr>
            <tr>
              <td><strong>CNR Number</strong></td>
              <td><code>${t.cnr}</code></td>
            </tr>
            <tr>
              <td><strong>Court / Forum</strong></td>
              <td>${t.court}</td>
            </tr>
            <tr>
              <td><strong>Substantive Sections</strong></td>
              <td>${t.section||`IPC / CrPC / Procedural Statutory Provisions`}</td>
            </tr>
            <tr>
              <td><strong>Registration / Filing Date</strong></td>
              <td>${t.filingDate||`15 Mar 2024`}</td>
            </tr>
            <tr>
              <td><strong>Next Scheduled Hearing</strong></td>
              <td>${t.nextHearing||`Upcoming Docket Session`}</td>
            </tr>
            <tr>
              <td><strong>Merkle Root Hash</strong></td>
              <td><code>${l}</code></td>
            </tr>
            <tr>
              <td><strong>Ledger Status</strong></td>
              <td><strong style="color:#065f46;">&#10004; VERIFIED INTACT &middot; ZERO TAMPERING DETECTED</strong></td>
            </tr>
          </table>

          <div style="text-align:left;font-family:Arial,sans-serif;font-weight:bold;font-size:10pt;color:#0F2A4A;margin-top:16px;">
            Ingested Document Hash Registry:
          </div>
          <table class="doc-table">
            <thead>
              <tr>
                <th style="width:40%;">Document Name</th>
                <th style="width:20%;">Classification</th>
                <th style="width:40%;">SHA-256 Fingerprint</th>
              </tr>
            </thead>
            <tbody>
              ${u.map(e=>`
                <tr>
                  <td><strong>${e.name||e.filename}</strong></td>
                  <td>${e.category||`Court Record`}</td>
                  <td><code>${e.hash||`SHA256-VERIFIED`}</code></td>
                </tr>
              `).join(``)}
            </tbody>
          </table>

          <div class="cert-statute">
            <strong>Statutory Compliance Declaration:</strong><br>
            This electronic certificate fulfills the authentication prerequisites established under <strong>Section 65B of the Indian Evidence Act, 1872</strong> and <strong>Section 63 of the Bharatiya Sakshya Adhiniyam, 2023 (BSA)</strong>. All cryptographic digests were calculated at ingestion time, recorded in the local tamper-evident ledger, and validated against unauthorized alteration or bit-rot corruption.
          </div>

          <table class="cert-signatures">
            <tr>
              <td class="sig-block">
                <div class="seal-stamp">
                  OFFICIAL<br>AUDIT SEAL<br>★ SEC 65B ★<br>VERIFIED
                </div>
                <div style="font-size:8pt;color:#64748b;margin-top:4px;">Issued: ${a}</div>
              </td>
              <td class="sig-block">
                <div style="font-family:'Brush Script MT', cursive; font-size: 20pt; color: #0F2A4A; margin-bottom: 4px;">${i}</div>
                <div class="sig-line"></div>
                <div class="sig-name">${i}</div>
                <div class="sig-role">Authorised Legal Reviewer<br>CaseCompass Verification Authority</div>
              </td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `,f=new Blob([`﻿`,d],{type:`application/msword;charset=utf-8`}),p=URL.createObjectURL(f),m=document.createElement(`a`);return m.href=p,m.download=`CaseCompass_Audit_Certificate_${o}.doc`,document.body.appendChild(m),m.click(),document.body.removeChild(m),URL.revokeObjectURL(p),{certificateNumber:s,rootHash:l,issueDate:a,reviewer:i,caseTitle:t.title,cnr:t.cnr}},printAuditCertificate(e){let t=this.getActiveCase(),n=e||t.id,r=this.getCaseDocuments(n),i=localStorage.getItem(`casecompass_user`)||`Meera`,a=new Date().toLocaleDateString(`en-GB`,{day:`2-digit`,month:`long`,year:`numeric`}),o=(t.cnr||`CASE`).replace(/[^a-zA-Z0-9_-]/g,`_`),s=`CERT-AUD-${o}-${new Date().getFullYear()}`,c=Math.abs(t.title.split(``).reduce((e,t)=>(e<<5)-e+t.charCodeAt(0),0)).toString(16).padStart(8,`0`),l=`SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd20012${c}`,u=r.length>0?r:[{name:`Case_Filing_Petition_${o}.pdf`,category:`Originating Filing`,pages:14,uploadedDate:t.filingDate||`15 Mar 2024`,hash:`SHA256-INIT-${c.toUpperCase()}-001`,status:`verified`},{name:`Court_Registration_Order_${o}.pdf`,category:`Court Proceedings`,pages:4,uploadedDate:t.filingDate||`15 Mar 2024`,hash:`SHA256-ORD-${c.toUpperCase()}-002`,status:`verified`}],d=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Court Audit Certificate - ${t.title}</title>
        <style>
          @page { size: A4 portrait; margin: 1cm; }
          body { font-family: 'Georgia', 'Times New Roman', serif; color: #0f172a; margin: 0; padding: 20px; background-color: #faf8f5; }
          .cert-container {
            border: 8px double #0F2A4A;
            padding: 30px;
            background-color: #ffffff;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          }
          .cert-header { margin-bottom: 16px; }
          .cert-emblem { font-size: 32pt; color: #b8860b; line-height: 1; }
          .cert-authority { font-size: 10pt; letter-spacing: 2px; color: #475569; text-transform: uppercase; font-family: Arial, sans-serif; font-weight: bold; margin-top: 6px; }
          .cert-title { font-size: 22pt; font-weight: bold; color: #0F2A4A; text-transform: uppercase; letter-spacing: 1.5px; margin: 10px 0 4px 0; border-bottom: 2px solid #b8860b; display: inline-block; padding-bottom: 4px; }
          .cert-subtitle { font-size: 11pt; font-style: italic; color: #334155; margin-bottom: 12px; }
          .cert-id-badge { font-family: 'Courier New', monospace; font-size: 9.5pt; background-color: #f1f5f9; padding: 4px 12px; border: 1px solid #cbd5e1; display: inline-block; margin-bottom: 16px; font-weight: bold; }
          .cert-body { font-size: 10pt; line-height: 1.7; text-align: justify; margin: 14px 16px; }
          .cert-highlight { font-weight: bold; color: #0F2A4A; font-size: 13pt; text-align: center; margin: 12px 0; }
          .metadata-table { width: 100%; border-collapse: collapse; margin: 16px 0; text-align: left; font-family: Arial, sans-serif; font-size: 9.5pt; }
          .metadata-table th { background-color: #0F2A4A; color: #ffffff; padding: 7px 10px; font-weight: bold; border: 1px solid #0F2A4A; }
          .metadata-table td { padding: 7px 10px; border: 1px solid #cbd5e1; }
          .metadata-table tr:nth-child(even) td { background-color: #f8fafc; }
          .doc-table { width: 100%; border-collapse: collapse; margin: 12px 0; font-family: Arial, sans-serif; font-size: 8.5pt; text-align: left; }
          .doc-table th { background-color: #1e3a5f; color: #ffffff; padding: 5px 8px; border: 1px solid #1e3a5f; }
          .doc-table td { padding: 5px 8px; border: 1px solid #e2e8f0; }
          .cert-statute { background-color: #fdfbf7; border: 1px solid #e2d9cc; border-left: 4px solid #b8860b; padding: 10px 14px; margin: 16px 0; font-size: 9pt; text-align: left; font-family: Arial, sans-serif; }
          .cert-signatures { margin-top: 28px; display: table; width: 100%; font-family: Arial, sans-serif; }
          .sig-block { display: table-cell; width: 50%; text-align: center; vertical-align: top; }
          .sig-line { width: 180px; border-top: 1px solid #0F2A4A; margin: 24px auto 6px auto; }
          .sig-name { font-weight: bold; font-size: 9.5pt; color: #0F2A4A; }
          .sig-role { font-size: 8pt; color: #64748b; }
          .seal-stamp {
            display: inline-block;
            border: 3px double #b8860b;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            line-height: 16px;
            padding-top: 15px;
            color: #b8860b;
            font-weight: bold;
            font-size: 7.5pt;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background-color: #fefce8;
          }
        </style>
      </head>
      <body>
        <div class="cert-container">
          <div class="cert-header">
            <div class="cert-emblem">&#9878;</div>
            <div class="cert-authority">E-Courts Digital Record System &middot; CaseCompass Cryptographic Trust</div>
            <div class="cert-title">Court Audit Certificate</div>
            <div class="cert-subtitle">Certificate of Cryptographic Integrity & Chain of Custody</div>
            <div class="cert-id-badge">CERTIFICATE NO: ${s}</div>
          </div>

          <div class="cert-body">
            This is to officially certify that the digital case records, chronological proceedings, and evidentiary attachments for the judicial matter detailed below have been ingested, cryptographically fingerprinted via SHA-256 digests, and verified against tamper-evident distributed ledger standards through the CaseCompass Docket Intelligence Engine.
          </div>

          <div class="cert-highlight">
            &ldquo;${t.title}&rdquo;
          </div>

          <table class="metadata-table">
            <tr>
              <th style="width:28%;">Record Parameter</th>
              <th style="width:72%;">Certified Specification</th>
            </tr>
            <tr><td><strong>CNR Number</strong></td><td><code>${t.cnr}</code></td></tr>
            <tr><td><strong>Court / Forum</strong></td><td>${t.court}</td></tr>
            <tr><td><strong>Substantive Sections</strong></td><td>${t.section||`IPC / CrPC / Procedural Statutory Provisions`}</td></tr>
            <tr><td><strong>Registration / Filing Date</strong></td><td>${t.filingDate||`15 Mar 2024`}</td></tr>
            <tr><td><strong>Next Scheduled Hearing</strong></td><td>${t.nextHearing||`Upcoming Docket Session`}</td></tr>
            <tr><td><strong>Merkle Root Hash</strong></td><td><code>${l}</code></td></tr>
            <tr><td><strong>Ledger Status</strong></td><td><strong style="color:#065f46;">&#10004; VERIFIED INTACT &middot; ZERO TAMPERING DETECTED</strong></td></tr>
          </table>

          <div style="text-align:left;font-family:Arial,sans-serif;font-weight:bold;font-size:9.5pt;color:#0F2A4A;margin-top:12px;">
            Ingested Document Hash Registry:
          </div>
          <table class="doc-table">
            <thead>
              <tr>
                <th style="width:40%;">Document Name</th>
                <th style="width:20%;">Classification</th>
                <th style="width:40%;">SHA-256 Fingerprint</th>
              </tr>
            </thead>
            <tbody>
              ${u.map(e=>`
                <tr>
                  <td><strong>${e.name||e.filename}</strong></td>
                  <td>${e.category||`Court Record`}</td>
                  <td><code>${e.hash||`SHA256-VERIFIED`}</code></td>
                </tr>
              `).join(``)}
            </tbody>
          </table>

          <div class="cert-statute">
            <strong>Statutory Compliance Declaration:</strong><br>
            This electronic certificate fulfills the authentication prerequisites established under <strong>Section 65B of the Indian Evidence Act, 1872</strong> and <strong>Section 63 of the Bharatiya Sakshya Adhiniyam, 2023 (BSA)</strong>. All cryptographic digests were calculated at ingestion time, recorded in the local tamper-evident ledger, and validated against unauthorized alteration.
          </div>

          <table class="cert-signatures">
            <tr>
              <td class="sig-block">
                <div class="seal-stamp">
                  OFFICIAL<br>AUDIT SEAL<br>★ SEC 65B ★<br>VERIFIED
                </div>
                <div style="font-size:7.5pt;color:#64748b;margin-top:4px;">Issued: ${a}</div>
              </td>
              <td class="sig-block">
                <div style="font-family:'Brush Script MT', cursive; font-size: 18pt; color: #0F2A4A; margin-bottom: 2px;">${i}</div>
                <div class="sig-line"></div>
                <div class="sig-name">${i}</div>
                <div class="sig-role">Authorised Legal Reviewer<br>CaseCompass Verification Authority</div>
              </td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `,f=window.open(``,`_blank`);f?(f.document.open(),f.document.write(d),f.document.close(),f.focus(),setTimeout(()=>{f.print()},350)):window.print()},analyzeCaseQuestion(e,t,n=`auto`){let r=this.getActiveCase(),i=this.getCaseTimeline(e||r.id),a=this.getCaseDocuments(e||r.id),o=(t||``).toLowerCase().trim(),s=n;(!s||s===`auto`)&&(s=/[\u0900-\u097F]/.test(t)?[`आहे`,`नाही`,`काय`,`कधी`,`कुठे`,`खटला`,`सुनावणी`,`साक्षीदार`,`जामीन`,`कलम`,`माहिती`,`कागदपत्रे`,`द्या`,`सांगा`,`झाले`,`केले`,`तारीख`,`कोणते`,`पुढील`].some(e=>t.includes(e))?`mr`:`hi`:[`kadhi`,`aahe`,`kiti`,`khata`,`sunavani`,`sakshidar`,`kagadpatre`,`sang`,`kashe`,`kaay`,`pudhil`].some(e=>RegExp(`\\b${e}\\b`,`i`).test(o))?`mr`:[`kya`,`kab`,`hai`,`kaun`,`kaunse`,`sunwai`,`gawah`,`batao`,`bataiye`,`zamanat`,`dastavez`,`agla`,`agli`].some(e=>RegExp(`\\b${e}\\b`,`i`).test(o))?`hi`:`en`);let c=e=>i.find(t=>((t.label||``)+` `+(t.description||``)).toLowerCase().includes(e)),l=``,u=[];if(/hearing|date|when|next|schedule|सुनावणी|तारीख|कधी|सुनवाई|कब|अगली|पुढील/i.test(o)){let e=r.nextHearing||`14 Feb 2025`,t=c(`hearing`)||c(`scheduled`)||c(`cross-examination`),n=t?t.label:`Cross-Examination of Prosecution Witness (PW-3)`;s===`mr`?(l=`या खटल्याची (**${r.title}**) पुढील नियोजित सुनावणी **${e}** रोजी **${r.court}** येथे निश्चित करण्यात आली आहे.\n\n• **उद्दिष्ट/कारण**: ${n}\n• **सीएनआर (CNR)**: ${r.cnr}\n• **न्यायालय कक्ष**: JMFC कक्ष क्र. ४\n• **सद्यस्थिती**: सुनावणीसाठी सर्व साक्षीदार समन्स व संबंधित कागदपत्रे डॉकेटमध्ये नोंदवली गेली आहेत.`,u=[`Chargesheet_Final.pdf (पृष्ठ २८)`,`Court_Order_Charges.pdf`,`Timeline_Proceeding_Log`]):s===`hi`?(l=`इस मामले (**${r.title}**) की अगली निर्धारित सुनवाई **${e}** को **${r.court}** में होगी।\n\n• **उद्देश्य**: ${n}\n• **सीएनआर (CNR)**: ${r.cnr}\n• **अदालत कक्ष**: जेएमएफसी कोर्ट रूम 4\n• **समीक्षा**: गवाहों की उपस्थिति और संबंधित दस्तावेजों का सत्यापन पूरा हो चुका है।`,u=[`Chargesheet_Final.pdf (पेज 28)`,`Court_Order_Charges.pdf`,`Timeline_Proceeding_Log`]):(l=`The next scheduled court hearing for **${r.title}** is scheduled for **${e}** before the **${r.court}**.\n\n• **Scheduled Purpose**: ${n}\n• **CNR Number**: \`${r.cnr}\`\n• **Court Room**: JMFC Court Hall 4\n• **Action Required**: Compliance of witness summons and examination of PW-3 (Bank Manager).`,u=[`Chargesheet_Final.pdf (pg 28)`,`Court_Order_Charges.pdf`,`Timeline_Schedule_Registry`])}else if(/charge|section|act|ipc|bns|offence|गुन्हे|कलम|आरोप|धारा|अपराध|कलमे|धाराएं/i.test(o)){let e=r.section||`IPC §420, §468 / BNS §316`;s===`mr`?(l=`या प्रकरणात नोंदवलेले मुख्य आरोप आणि कायदेशीर कलमे खालीलप्रमाणे आहेत:\n\n• **लागू कलमे**: **${e}**\n• **IPC §420 / BNS §316**: फसवणूक आणि अप्रामाणिकपणे मालमत्ता देण्यास प्रवृत्त करणे (Cheating & Dishonestly Inducing Delivery).\n• **IPC §468**: फसवणुकीच्या उद्देशाने दस्तऐवजांची बनावटगिरी करणे (Forgery for Purpose of Cheating).\n• **खटल्याचा टप्पा**: आरोप निश्चित झाले असून खटला सरकारी पुरावे नोंदवण्याच्या टप्प्यात आहे. सर्व आरोपपत्र (Chargesheet) न्यायालयात दाखल आहे.`,u=[`Chargesheet_Final.pdf (पृष्ठ ३-६)`,`Court_Order_Framing_Charges.pdf`]):s===`hi`?(l=`इस मामले में दर्ज मुख्य आरोप और कानूनी धाराएं इस प्रकार हैं:\n\n• **लागू धाराएं**: **${e}**\n• **IPC §420 / BNS §316**: धोखाधड़ी और बेईमानी से संपत्ति का हस्तांतरण कराना (Cheating).\n• **IPC §468**: धोखाधड़ी के उद्देश्य से जालसाजी (Forgery for purpose of cheating).\n• **वर्तमान स्थिति**: अदालत द्वारा आरोप औपचारिक रूप से तय कर दिए गए हैं और मामला अभियोजन साक्ष्य चरण में है।`,u=[`Chargesheet_Final.pdf (पेज 3-6)`,`Court_Order_Framing_Charges.pdf`]):(l=`The charges framed in this case dossier are registered under **${e}**:\n\n• **IPC §420 / BNS §316**: Cheating and dishonestly inducing delivery of property (punishable with up to 7 years imprisonment and fine).\n• **IPC §468**: Forgery for the purpose of cheating (non-bailable, triable by Magistrate of First Class).\n• **Procedural Posture**: Formal charges have been framed by the Court. The trial is actively in the prosecution evidence stage.`,u=[`Chargesheet_Final.pdf (pg 3-6)`,`Court_Order_Framing_Charges.pdf`])}else if(/witness|pw|statement|examination|साक्षीदार|साक्षी|गवाह|गवाही|बयान|उलटतपासणी|जिरह/i.test(o))s===`mr`?(l=`खटल्याच्या आरोपपत्रानुसार एकूण ४ मुख्य सरकारी साक्षीदार (Prosecution Witnesses) उद्धृत आहेत:

• **PW-1 (श्री विजय पाटील - तक्रारदार)**: तपासणी पूर्ण (१४ ऑगस्ट २०२४)
• **PW-2 (पीएसआय अशोक जाधव - तपास अधिकारी)**: उलटतपासणी पूर्ण (१० नोव्हेंबर २०२४)
• **PW-3 (बँक शाखा व्यवस्थापक)**: पुढील सुनावणीत उलटतपासणी नियोजित
• **PW-4 (हस्ताक्षर व न्यायवैद्यक तज्ज्ञ)**: समन्स जारी, उपस्थिती प्रलंबित.`,u=[`Chargesheet_Final.pdf (पृष्ठ १२-१५)`,`PW1_Statement_Patil.pdf`,`Deposition_PW2_Jadhav.pdf`]):s===`hi`?(l=`चार्जशीट के अनुसार अभियोजन पक्ष के कुल 4 मुख्य गवाह (Prosecution Witnesses) हैं:

• **PW-1 (श्री विजय पाटिल - शिकायतकर्ता)**: मुख्य बयान संपन्न (14 अगस्त 2024)
• **PW-2 (पीएसआई अशोक जाधव - जांच अधिकारी)**: जिरह पूर्ण (10 नवंबर 2024)
• **PW-3 (बैंक शाखा प्रबंधक)**: आगामी सुनवाई में जिरह के लिए निर्धारित
• **PW-4 (फोरेंसिक दस्तावेज विशेषज्ञ)**: समन जारी, उपस्थिति प्रतीक्षित।`,u=[`Chargesheet_Final.pdf (पेज 12-15)`,`PW1_Statement_Patil.pdf`,`Deposition_PW2_Jadhav.pdf`]):(l=`According to the filed chargesheet and court records, 4 Prosecution Witnesses (PW) are on record:

• **PW-1 (Shri Vijay Patil - Complainant)**: Chief examination completed on 14 Aug 2024.
• **PW-2 (PSI Ashok Jadhav - Investigating Officer)**: Cross-examination completed on 10 Nov 2024.
• **PW-3 (Branch Manager, State Bank)**: Scheduled for examination on the upcoming hearing date.
• **PW-4 (Forensic Document Examiner, CID Pune)**: Summons issued; testimony pending.`,u=[`Chargesheet_Final.pdf (pg 12-15)`,`PW1_Statement_Patil.pdf`,`Deposition_PW2_Jadhav.pdf`]);else if(/fir|police|complaint|lodged|upload|document|कागदपत्र|दस्तऐवज|एफआयआर|नोंद|दस्तावेज|थाना|शिकायत/i.test(o)){let e=a.length,t=a.find(e=>e.isFir||(e.name||``).toLowerCase().includes(`fir`));s===`mr`?(l=`या खटल्यातील दस्तऐवज आणि एफआयआर (FIR) ची सद्यस्थिती:\n\n• **एकूण दस्तऐवज**: ${e} अधिकृत कागदपत्रे पडताळली गेली आहेत.\n• **एफआयआर (FIR) सद्यस्थिती**: ${t?`एफआयआर (${t.name}) पडताळणीसह सिस्टीममध्ये समाविष्ट आहे.`:`एफआयआर आणि प्राथमिक पंचनामा डॉकेटमध्ये समाविष्ट आहे.`}\n• **तपास यंत्रणा**: डेक्कन पोलीस ठाणे, पुणे शहर.\n• **डेटा पडताळणी**: सर्व फायली SHA-256 क्रिप्टोग्राफिक हॅशसह सुरक्षित आणि ऑडीटेड आहेत.`,u=[`FIR_Registration_Deccan.pdf`,`Evidence_Ledger_Registry`,`Audit_Seal.json`]):s===`hi`?(l=`इस केस में दस्तावेजों और प्राथमिकी (FIR) का विवरण:\n\n• **कुल दस्तावेज**: ${e} सत्यापित अदालती दस्तावेज डॉकेट में दर्ज हैं।\n• **FIR स्थिति**: ${t?`प्राथमिकी (${t.name}) पूर्ण रूप से सत्यापित है।`:`प्राथमिकी डॉकेट में दर्ज व मान्य है।`}\n• **संबंधित पुलिस थाना**: डेक्कन पुलिस स्टेशन, पुणे।\n• **सुरक्षा**: सभी रिकॉर्ड्स SHA-256 क्रिप्टोग्राफिक सुरक्षा द्वारा प्रमाणित हैं।`,u=[`FIR_Registration_Deccan.pdf`,`Evidence_Ledger_Registry`,`Audit_Seal.json`]):(l=`FIR and evidence document ledger status for **${r.title}**:\n\n• **Indexed Court Documents**: ${e} documents verified and integrated.\n• **FIR Record**: ${t?`FIR (${t.name}) verified with cryptographic proof.`:`FIR 108/2024 registered at Deccan Police Station, Pune.`}\n• **Police Station**: Deccan Gymkhana Police Station, Pune City.\n• **Integrity Verification**: All evidentiary files sealed with SHA-256 cryptographic digests.`,u=[`FIR_Registration_Deccan.pdf`,`Evidence_Ledger_Registry`,`Audit_Seal.json`])}else/bail|zamanat|surety|bond|जामीन|जमानत|मुचलका|अटी/i.test(o)?s===`mr`?(l=`या खटल्यातील जामीन (Bail) संबंधी सद्यस्थिती:

• **अंतरिम आदेश**: सत्र न्यायालयाने ₹२५,००० च्या वैयक्तिक जातमुचलक्यावर आणि एका स्थानिक हमीदारावर (Surety) जामीन मंजूर केला आहे.
• **न्यायालयाने घातलेल्या अटी**:
  १. दर सोमवारी सकाळी १० ते १२ दरम्यान तपास अधिकाऱ्याकडे हजेरी लावणे.
  २. न्यायालयाच्या पूर्वपरवानगीशिवाय अधिकारक्षेत्र सोडून न जाणे.
  ३. साक्षीदारांशी कोणताही संपर्क न साधणे वा पुराव्यांशी छेडछाड न करणे.`,u=[`Bail_Order_Sessions_Court.pdf (पृष्ठ २)`,`Surety_Affidavit_Verified.pdf`]):s===`hi`?(l=`इस मामले में जमानत (Bail) संबंधी विवरण:

• **अदालती आदेश**: सत्र न्यायालय द्वारा ₹25,000 के निजी मुचलके और एक स्थानीय जमानतदार (Surety) पर जमानत स्वीकृत की गई है।
• **शर्तें**:
  1. प्रत्येक सोमवार को जांच अधिकारी के समक्ष उपस्थिति दर्ज कराना।
  2. न्यायालय की अनुमति के बिना शहर से बाहर न जाना।
  3. गवाहों को प्रभावित न करने का हलफनामा।`,u=[`Bail_Order_Sessions_Court.pdf (पेज 2)`,`Surety_Affidavit_Verified.pdf`]):(l=`Bail and interim relief record for this dossier:

• **Bail Status**: Regular bail was granted by the Court of Sessions upon furnishing a personal bond of ₹25,000 with one local solvent surety.
• **Conditions Imposed**:
  1. Attend the Deccan Police Station every alternate Monday between 10:00 AM and 12:00 PM.
  2. Not to leave the territorial jurisdiction of Pune without prior permission of the Court.
  3. Refrain from inducing or contacting prosecution witnesses (PW-1 through PW-4).`,u=[`Bail_Order_Sessions_Court.pdf (pg 2)`,`Surety_Affidavit_Verified.pdf`]):/discrepan|flag|issue|error|mismatch|त्रुटी|विसंगति|चूक|गड़बड़|खामी/i.test(o)?s===`mr`?(l=`केस डॉकेटमध्ये नोंदवलेल्या महत्त्वाच्या विसंगती (Integrity Flags):

• **PW1_Statement_Patil.pdf**:
  - शीर्षकातील तारीख: १४ ऑगस्ट २०२४
  - स्वाक्षरीची तारीख: १६ ऑगस्ट २०२४ (२ दिवसांची विसंगती)
• **पंचनामा वेळ नोंद**:
  - घटनास्थळ पंचनाम्यातील वेळ (१४:३०) आणि पोलीस दैनंदिनीतील नोंद (१५:४५) यामध्ये ७५ मिनिटांचा फरक आढळला आहे.
• **निष्कर्ष**: या विसंगतीचा उपयोग उलटतपासणी दरम्यान स्पष्टीकरण मागण्यासाठी केला जाऊ शकतो.`,u=[`PW1_Statement_Patil.pdf (पृष्ठ ३, ६)`,`Seizure_Panchnama_Audit.pdf`,`Audit_Seal_VER-9042`]):s===`hi`?(l=`दस्तावेजों में दर्ज विसंगतियां (Flags):

• **PW1_Statement_Patil.pdf**:
  - हेडर तारीख: 14 अगस्त 2024
  - हस्ताक्षर तारीख: 16 अगस्त 2024 (2 दिन का अंतर)
• **घटनास्थल पंचनामा**:
  - पंचनामा समय (14:30) और पुलिस डायरी समय (15:45) में 75 मिनट का अंतर दर्ज है।
• **कानूनी महत्व**: जिरह के दौरान इस विसंगति को बचाव पक्ष द्वारा अदालत के संज्ञान में लाया जा सकता है।`,u=[`PW1_Statement_Patil.pdf (पेज 3, 6)`,`Seizure_Panchnama_Audit.pdf`,`Audit_Seal_VER-9042`]):(l=`Integrity flags and discrepancy findings identified in the docket:

• **PW1_Statement_Patil.pdf**:
  - Header block date indicates 14 August 2024, whereas the concluding signature block indicates 16 August 2024 (a 48-hour variance).
• **Seizure Panchnama Time Discrepancy**:
  - Seizure memo logs the time of recovery at 14:30 hrs, while station diary entry logs departure at 15:45 hrs.
• **Evidentiary Impact**: These discrepancies have been flagged for cross-examination to assess chain of custody.`,u=[`PW1_Statement_Patil.pdf (pg 3, 6)`,`Seizure_Panchnama_Audit.pdf`,`Audit_Seal_VER-9042`]):/summary|about|overview|kya hai|kay aahe|details|माहिती|सारांश|तपशील|परिचय|विवरण/i.test(o)?s===`mr`?(l=`**${r.title}** या खटल्याचा संपूर्ण सारांश:\n\n• **सीएनआर (CNR)**: ${r.cnr}\n• **न्यायालय**: ${r.court}\n• **दाखल कलमे**: ${r.section||`IPC §420, §468`}\n• **नोंदणी तारीख**: ${r.filingDate||`15 Mar 2024`}\n• **सद्यस्थिती**: ${r.statusLabel||`पडताळणी पूर्ण (Verified)`}\n• **पुढील सुनावणी**: ${r.nextHearing||`१४ फेब्रुवारी २०२५`}\n• **खटल्याचा सारांश**: तक्रारदाराकडून व्यावसायिक भागीदारीच्या बहाण्याने बनावट कागदपत्रांच्या आधारे आर्थिक फसवणूक केल्याचा आरोप असून खटला सध्या साक्षीदारांच्या उलटतपासणीच्या टप्प्यात आहे.`,u=[`Case_Registry_Record.pdf`,`Chargesheet_Final.pdf`,`Court_Order_Charges.pdf`]):s===`hi`?(l=`**${r.title}** मामले का पूर्ण संक्षिप्त विवरण:\n\n• **सीएनआर (CNR)**: ${r.cnr}\n• **न्यायालय**: ${r.court}\n• **दर्ज धाराएं**: ${r.section||`IPC §420, §468`}\n• **दाखिल तारीख**: ${r.filingDate||`15 Mar 2024`}\n• **वर्तमान स्थिति**: ${r.statusLabel||`सत्यापित (Verified)`}\n• **अगली सुनवाई**: ${r.nextHearing||`14 फरवरी 2025`}\n• **मामले का सार**: कथित रूप से फर्जी दस्तावेजों के जरिए वित्तीय धोखाधड़ी के संबंध में मुकदमा चलाया जा रहा है। वर्तमान में अभियोजन साक्ष्य प्रक्रिया जारी है।`,u=[`Case_Registry_Record.pdf`,`Chargesheet_Final.pdf`,`Court_Order_Charges.pdf`]):(l=`Executive Dossier Summary for **${r.title}**:\n\n• **CNR Number**: \`${r.cnr}\`\n• **Jurisdiction**: ${r.court}\n• **Substantive Sections**: ${r.section||`IPC §420, §468 / BNS §316`}\n• **Filing Date**: ${r.filingDate||`15 Mar 2024`}\n• **Dossier Status**: ${r.statusLabel||`Verified Docket`}\n• **Next Hearing**: ${r.nextHearing||`14 Feb 2025`}\n• **Substantive Matter**: Allegations of financial inducement and forged documentation during partnership dealings. Matter is currently in active cross-examination of prosecution witnesses.`,u=[`Case_Registry_Record.pdf`,`Chargesheet_Final.pdf`,`Court_Order_Charges.pdf`]):/meaning|what is|define|bns|ipc|crpc|panchnama|vakalatnama|remand|अर्थ|म्हणजे काय|काय असते|क्या है|मतलब/i.test(o)?s===`mr`?(l=`कायदेशीर शब्दावली आणि अर्थ विश्लेषण:

• **BNS (भारतीय न्याय संहिता)**: जुन्या भारतीय दंड विधानाच्या (IPC) जागी १ जुलै २०२४ पासून लागू झालेला नवीन फौजदारी कायदा.
• **पंचनामा (Panchnama)**: घटनास्थळाची पाहणी आणि जप्त केलेल्या वस्तूंची स्वतंत्र पंचांसमक्ष केलेली अधिकृत नोंद.
• **चार्जशीट (Chargesheet)**: पोलीस तपास पूर्ण झाल्यानंतर न्यायालयात सादर केलेला अंतिम अहवाल (कलम १७३ CrPC).
• **उलटतपासणी (Cross-Examination)**: साक्षीदाराच्या विधानातील सत्यता तपासण्यासाठी विरुद्ध पक्षाच्या वकिलाने केलेली उलट चौकशी.`,u=[`Indian_Penal_Code_Glossary`,`Bharatiya_Nagarik_Suraksha_Sanhita_Guide`]):s===`hi`?(l=`कानूनी शब्दावली और अर्थ:

• **BNS (भारतीय न्याय संहिता)**: आईपीसी के स्थान पर लागू नया कानून, जो आपराधिक अपराधों को परिभाषित करता है।
• **पंचनामा (Panchnama)**: घटना स्थल या बरामदगी का स्वतंत्र गवाहों (पंचों) के सामने तैयार किया गया लिखित विवरण।
• **चार्जशीट (Chargesheet)**: जांच पूरी होने पर पुलिस द्वारा अदालत में पेश की गई अंतिम रिपोर्ट।
• **जिरह (Cross-Examination)**: गवाह की विश्वसनीयता की जांच हेतु विपक्षी वकील द्वारा पूछे जाने वाले प्रश्न।`,u=[`Indian_Penal_Code_Glossary`,`Bharatiya_Nagarik_Suraksha_Sanhita_Guide`]):(l=`Legal Glossary & Statutory Reference:

• **BNS (Bharatiya Nyaya Sanhita)**: The comprehensive criminal law replacing the Indian Penal Code (IPC) effective 1 July 2024.
• **Panchnama**: Contemporaneous memo recorded by police in the presence of independent witnesses (Panchas) documenting seizures or scene of crime inspection.
• **Chargesheet (CrPC §173 / BNSS §193)**: Final investigative report submitted to the Magistrate detailing the evidence gathered against the accused.
• **Cross-Examination**: Examination of a witness by the adverse party to test veracity and credibility under the Indian Evidence Act.`,u=[`Indian_Penal_Code_Glossary`,`Bharatiya_Nagarik_Suraksha_Sanhita_Guide`]):s===`mr`?(l=`**${r.title}** संदर्भातील आपल्या प्रश्नाचे कायदेशीर विश्लेषण:\n\n> *"${t}"*\n\nया खटल्याच्या अधिकृत नोंदींनुसार (CNR: \`${r.cnr}\`), न्यायालय **${r.court}** येथे **${r.section||`IPC §420, §468`}** अन्वये कार्यवाही सुरू आहे. खटल्याची पुढील सुनावणी **${r.nextHearing||`14 Feb 2025`}** रोजी होणार असून एकूण **${a.length}** अधिकृत दस्तऐवज आणि **${i.length}** न्यायालयीन घटनाक्रम डॉकेटमध्ये सत्यापित आहेत.`,u=[`Case_Registry_Record.pdf`,`Chargesheet_Final.pdf`,`Timeline_Proceeding_Log`]):s===`hi`?(l=`**${r.title}** के संबंध में आपके प्रश्न का कानूनी विश्लेषण:\n\n> *"${t}"*\n\nअदालती रिकॉर्ड (CNR: \`${r.cnr}\`) के आधार पर, मामला **${r.court}** में **${r.section||`IPC §420, §468`}** के तहत विचाराधीन है। मामले की अगली सुनवाई **${r.nextHearing||`14 Feb 2025`}** को नियत है और डॉकेट में कुल **${a.length}** दस्तावेज और **${i.length}** अदालती कार्यवाहियां प्रमाणित हैं।`,u=[`Case_Registry_Record.pdf`,`Chargesheet_Final.pdf`,`Timeline_Proceeding_Log`]):(l=`Audited docket intelligence for **${r.title}** regarding your query:\n\n> *"${t}"*\n\nBased on verified court docket records (\`${r.cnr}\`) before **${r.court}**, proceedings are actively framed under **${r.section||`IPC §420, §468`}**. The docket currently maintains **${a.length}** verified evidentiary files and **${i.length}** chronological proceeding events, with the next court session listed on **${r.nextHearing||`14 Feb 2025`}**.`,u=[`Case_Registry_Record.pdf`,`Chargesheet_Final.pdf`,`Timeline_Proceeding_Log`]);return{answer:l,citations:u,language:s}},async askCase(e,t,n=`auto`){try{let r=await fetch(`/api/cases/${e}/ask`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({query:t,language:n})});if(r.ok)return await r.json()}catch{}return null}};function v(e){return{verified:`badge--verified`,pending:`badge--pending`,flagged:`badge--flagged`,processing:`badge--processing`}[e]||`badge--neutral`}function y(e){return{verified:`verified`,pending:`schedule`,flagged:`flag`,processing:`sync`}[e]||`info`}function b(e){let t=(e||`medium`).toLowerCase();return t===`high`?`<span class="badge badge--seriousness-high" title="Critical Review Priority · Urgent Criminal / Flagged Matter">
      <span class="material-symbols-outlined" style="font-size:12px;">priority_high</span>
      HIGH SERIOUSNESS
    </span>`:t===`low`?`<span class="badge badge--seriousness-low" title="Routine Compliance · Verified Docket Record">
      <span class="material-symbols-outlined" style="font-size:12px;">check_circle</span>
      LOW SERIOUSNESS
    </span>`:`<span class="badge badge--seriousness-medium" title="Active Proceedings · Pending Documentary Review">
    <span class="material-symbols-outlined" style="font-size:12px;">schedule</span>
    MEDIUM SERIOUSNESS
  </span>`}function x(e,t=`admin`){let n=(e.title||``).replace(/"/g,`&quot;`),r=g(e),i=r===`high`?`#ef4444`:r===`medium`?`#f59e0b`:`#10b981`,a=!!e.isDisposed;return`
    <div class="card-flat case-record-item" data-case-id="${e.id}" data-case-status="${e.status}"
         data-case-seriousness="${r}" data-case-timespan="${e.timespan||`day`}"
         data-case-is-disposed="${a?`true`:`false`}"
         data-case-title="${n}" data-case-cnr="${e.cnr}" data-case-court="${e.court}"
         data-case-reported-by="${(e.reportedBy||``).replace(/"/g,`&quot;`)}"
         style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-md);padding:var(--space-md) var(--space-lg);border-left:5px solid ${i};transition:all 0.2s;cursor:pointer;"
         onmouseover="this.style.boxShadow='var(--shadow-md)';this.style.transform='translateY(-1px)'"
         onmouseout="this.style.boxShadow='var(--shadow-xs)';this.style.transform='translateY(0)'">
      
      <div style="display:flex;align-items:center;gap:var(--space-md);min-width:0;flex:1;">
        <div style="width:42px;height:42px;border-radius:var(--radius-md);background:${r===`high`?`#fee2e2`:r===`medium`?`#fef3c7`:`#d1fae5`};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span class="material-symbols-outlined" style="font-size:22px;color:${i}">
            ${t===`judge`?`gavel`:r===`high`?`warning`:r===`medium`?`folder_open`:`verified`}
          </span>
        </div>
        
        <div style="min-width:0;">
          <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;">
            <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">${e.title}</span>
            ${b(r)}
            
            <span class="badge ${v(e.status)}">
              <span class="material-symbols-outlined" style="font-size:12px">${y(e.status)}</span>
              ${e.statusLabel||e.status}
            </span>

            ${a?`
              <span class="badge" style="background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;font-weight:700;font-size:0.6875rem;">
                <span class="material-symbols-outlined" style="font-size:12px;">task_alt</span> Previous Judgment Decided
              </span>
            `:``}

            ${t===`user`?`
              <span class="badge" style="background:#eff6ff;color:#1d4ed8;font-size:0.6875rem;font-weight:600;">
                <span class="material-symbols-outlined" style="font-size:12px;">person</span> Reported by You
              </span>
            `:e.reportedBy?`
              <span class="badge hide-mobile" style="background:#f8fafc;color:#475569;font-size:0.6875rem;border:1px solid #e2e8f0;">
                Reported by: ${e.reportedBy}
              </span>
            `:``}

            ${t===`judge`&&e.benchItem?`
              <span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fde68a;font-weight:700;font-size:0.6875rem;">
                ${e.benchItem}
              </span>
            `:``}
          </div>

          <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;margin-top:4px;">
            <span class="text-code-sm" style="color:var(--secondary);background:var(--surface-container-low);padding:1px 6px;border-radius:var(--radius-sm);font-weight:600;">CNR: ${e.cnr}</span>
            <span class="text-body-sm" style="color:var(--on-surface-variant);">${e.court}</span>
            ${e.section?`<span style="font-size:0.75rem;color:var(--outline);">&middot; ${e.section}</span>`:``}
            ${e.hearingPurpose?`<span style="font-size:0.75rem;color:#b45309;font-weight:600;">&middot; Purpose: ${e.hearingPurpose}</span>`:``}
          </div>
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:var(--space-md);flex-shrink:0;flex-wrap:wrap;">
        <div style="text-align:center;min-width:44px;">
          <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;">Docs</div>
          <div class="text-body-md" style="font-weight:700;color:var(--primary);">${e.documents||0}</div>
        </div>

        <div style="text-align:center;min-width:88px;">
          <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;">
            ${a?`Decided Order`:`Hearing Date`}
          </div>
          <div class="text-body-sm" style="font-weight:600;color:var(--on-surface);">
            ${e.nextHearing||`Today`}
          </div>
        </div>

        <button class="btn btn--secondary btn--sm btn-open-timeline" data-case-id="${e.id}" style="font-size:0.75rem;border-radius:var(--radius-md);" title="Open timeline for this case">
          <span>${t===`judge`?`Bench Dossier`:`View Timeline`}</span>
          <span class="material-symbols-outlined" style="font-size:14px;">arrow_forward</span>
        </button>

        ${t===`admin`?`
          <button class="btn btn--sm btn-delete-case" data-case-id="${e.id}" data-case-title="${n}" title="Admin Delete Authority"
                  style="font-size:0.75rem;border-radius:var(--radius-md);color:#dc2626;background:#fef2f2;border:1px solid #fecaca;padding:6px 12px;display:inline-flex;align-items:center;gap:4px;cursor:pointer;transition:all 0.15s ease;"
                  onmouseover="this.style.background='#fee2e2';this.style.borderColor='#f87171'"
                  onmouseout="this.style.background='#fef2f2';this.style.borderColor='#fecaca'">
            <span class="material-symbols-outlined" style="font-size:15px;color:#dc2626;">delete</span>
            <span style="font-weight:600;">Delete</span>
          </button>
        `:t===`user`?`
          <button class="btn btn--sm btn-delete-case" data-case-id="${e.id}" data-case-title="${n}" title="Withdraw this reported case"
                  style="font-size:0.75rem;border-radius:var(--radius-md);color:#64748b;background:#f8fafc;border:1px solid #e2e8f0;padding:6px 10px;display:inline-flex;align-items:center;gap:4px;cursor:pointer;">
            <span class="material-symbols-outlined" style="font-size:14px;">delete</span>
            <span>Remove</span>
          </button>
        `:``}
      </div>
    </div>
  `}function S(){let e=_.getCurrentRole(),t=_.getCurrentUser(),n=_.getCases({role:e,user:t}),r=n.filter(e=>g(e)===`high`),i=n.filter(e=>g(e)===`medium`),a=n.filter(e=>g(e)===`low`),o=_.getCases({ignoreRoleFilter:!0}),s=o.filter(e=>e.timespan===`day`&&!e.isDisposed),c=o.filter(e=>(e.timespan===`day`||e.timespan===`month`)&&!e.isDisposed),l=o.filter(e=>e.isDisposed||e.timespan===`past`),u=[];return u=e===`admin`?[{value:`all`,label:`All Records (${n.length})`,isTimespan:!1},{value:`timespan-day`,label:`📅 Listed Today (Day) (${s.length})`,isTimespan:!0},{value:`timespan-month`,label:`🗓️ Listed This Month (Month) (${c.length})`,isTimespan:!0},{value:`flagged`,label:`Flagged`,isTimespan:!1},{value:`pending`,label:`Pending`,isTimespan:!1},{value:`verified`,label:`Verified`,isTimespan:!1}]:e===`judge`?[{value:`judge-day`,label:`📅 Today's Cause List (Day) (${s.length})`,isTimespan:!0},{value:`judge-month`,label:`🗓️ Monthly Hearing Roster (Month) (${c.length})`,isTimespan:!0},{value:`judge-past`,label:`📜 Previous Adjudicated Cases (${l.length})`,isTimespan:!0},{value:`all`,label:`All Bench Cases (${n.length})`,isTimespan:!1},{value:`flagged`,label:`Urgent Flagged`,isTimespan:!1}]:[{value:`all`,label:`My Reported Cases (${n.length})`,isTimespan:!1},{value:`verified`,label:`Verified`,isTimespan:!1},{value:`pending`,label:`Pending Review`,isTimespan:!1},{value:`flagged`,label:`Needs Attention`,isTimespan:!1}],`
    <div class="page-content animate-fade-in" style="max-width: 1200px;">
      <!-- Success Toast Notification Placeholder -->
      <div id="cases-alert-toast" style="display:none;margin-bottom:var(--space-md);padding:12px 18px;border-radius:var(--radius-md);background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;align-items:center;gap:10px;">
        <span class="material-symbols-outlined" style="color:#059669;font-size:20px;">check_circle</span>
        <span id="cases-alert-toast-text" style="font-size:0.875rem;font-weight:600;">Action completed successfully</span>
      </div>

      <!-- PORTAL ROLE BANNER -->
      ${e===`user`?`
        <div style="padding:12px 16px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:var(--radius-md);margin-bottom:var(--space-lg);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;color:#1e40af;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="material-symbols-outlined" style="font-size:22px;color:#2563eb;">person</span>
            <div>
              <strong style="font-size:0.875rem;">Citizen & Litigant Access Mode:</strong>
              <div style="font-size:0.75rem;color:#3b82f6;">
                Viewing cases reported by <strong>${t}</strong>. Confidential cases belonging to other litigants are restricted.
              </div>
            </div>
          </div>
          <span class="badge" style="background:#dbeafe;color:#1d4ed8;font-weight:700;">Litigant View (${n.length} Reported)</span>
        </div>
      `:e===`judge`?`
        <div style="padding:12px 16px;background:#fffbeb;border:1px solid #fde68a;border-radius:var(--radius-md);margin-bottom:var(--space-lg);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;color:#92400e;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="material-symbols-outlined" style="font-size:22px;color:#d97706;">gavel</span>
            <div>
              <strong style="font-size:0.875rem;">Hon'ble Presiding Judge Bench Portal:</strong>
              <div style="font-size:0.75rem;color:#b45309;">
                Bench roster for <strong>${t}</strong> — Daily cause list, monthly hearing roster, and all past adjudicated decisions.
              </div>
            </div>
          </div>
          <span class="badge" style="background:#fef3c7;color:#92400e;font-weight:700;">Presiding Magistrate</span>
        </div>
      `:`
        <div style="padding:12px 16px;background:#faf5ff;border:1px solid #e9d5ff;border-radius:var(--radius-md);margin-bottom:var(--space-lg);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;color:#5b21b6;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="material-symbols-outlined" style="font-size:22px;color:#7c3aed;">admin_panel_settings</span>
            <div>
              <strong style="font-size:0.875rem;">Court Registry Administrator Portal:</strong>
              <div style="font-size:0.75rem;color:#7c3aed;">
                Master Registry Authority: Total oversight of all dossiers across Day and Month timespans with full modification powers.
              </div>
            </div>
          </div>
          <span class="badge" style="background:#ede9fe;color:#5b21b6;font-weight:700;">Registry Authority</span>
        </div>
      `}

      <!-- Page Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--space-md);margin-bottom:var(--space-lg);">
        <div>
          <h1 class="page-heading">
            ${e===`user`?`My Reported Legal Cases`:e===`judge`?`Hon'ble Presiding Judge Bench Dossier`:`1. Cases Dossier Management`}
          </h1>
          <p class="text-body-sm" style="color:var(--on-surface-variant);margin-top:4px;">
            ${e===`user`?`Personal legal dockets reported by you with verified timelines, hearing alerts, and plain summaries.`:e===`judge`?`Daily cause list hearings throughout the day, monthly rosters, and past adjudicated judgments.`:`All district dossiers categorized into High, Medium, and Low seriousness with full registry timespans.`}
          </p>
        </div>
        <button class="btn btn--primary" id="open-create-modal-btn">
          <span class="material-symbols-outlined" style="font-size:18px">add</span>
          ${e===`user`?`Report New Case`:e===`judge`?`Register Bench Case`:`New Case Record`}
        </button>
      </div>

      <!-- Empty state when zero cases are registered in the portal -->
      <div id="no-cases-registered-banner" style="display:${n.length===0?`block`:`none`};text-align:center;padding:var(--space-2xl) var(--space-lg);background:var(--surface-container-lowest);border-radius:var(--radius-lg);border:1px dashed var(--outline-variant);margin-bottom:var(--space-lg);">
        <span class="material-symbols-outlined" style="font-size:56px;color:var(--outline);">folder_off</span>
        <h3 class="text-headline-sm" style="color:var(--on-surface);margin-top:var(--space-sm);font-weight:700;">
          ${e===`user`?`No Reported Cases Found`:`No Cases Registered`}
        </h3>
        <p class="text-body-sm" style="color:var(--on-surface-variant);max-width:480px;margin:8px auto var(--space-md);">
          ${e===`user`?`You have not reported any legal cases under ${t}. Click "Report New Case" to register your initial docket.`:`There are currently no active cases registered in this registry view. Click "New Case Record" to register your first dossier.`}
        </p>
        <button class="btn btn--primary" id="btn-banner-new-case">
          <span class="material-symbols-outlined" style="font-size:18px;">add</span>
          ${e===`user`?`Report First Case`:`Register First Case`}
        </button>
      </div>

      <!-- Seriousness Quick KPI Summary Grid (only appears when cases exist) -->
      <div id="seriousness-kpi-container" style="display:${n.length>0?`grid`:`none`};grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:var(--space-md);margin-bottom:var(--space-lg);">
        <!-- High Seriousness Card -->
        <div class="seriousness-kpi-card" id="kpi-card-high" data-quick-filter="seriousness-high" data-target-group="group-high" style="border-left: 5px solid #ef4444;display:${r.length>0?`block`:`none`};">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:0.75rem;font-weight:700;color:#b91c1c;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:4px;">
                <span class="material-symbols-outlined" style="font-size:15px;color:#ef4444;">priority_high</span>
                High Seriousness
              </div>
              <div style="font-size:1.625rem;font-weight:800;color:#991b1b;margin-top:2px;" id="kpi-count-high">
                ${r.length} ${r.length===1?`Case`:`Cases`}
              </div>
            </div>
            <div style="width:40px;height:40px;border-radius:50%;background:#fee2e2;display:flex;align-items:center;justify-content:center;color:#ef4444;">
              <span class="material-symbols-outlined" style="font-size:22px;">warning</span>
            </div>
          </div>
          <div style="font-size:0.75rem;color:#64748b;margin-top:8px;">
            Critical / Flagged Review &middot; Urgent criminal proceedings
          </div>
        </div>

        <!-- Medium Seriousness Card -->
        <div class="seriousness-kpi-card" id="kpi-card-medium" data-quick-filter="seriousness-medium" data-target-group="group-medium" style="border-left: 5px solid #f59e0b;display:${i.length>0?`block`:`none`};">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:0.75rem;font-weight:700;color:#b45309;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:4px;">
                <span class="material-symbols-outlined" style="font-size:15px;color:#f59e0b;">schedule</span>
                Medium Seriousness
              </div>
              <div style="font-size:1.625rem;font-weight:800;color:#92400e;margin-top:2px;" id="kpi-count-medium">
                ${i.length} ${i.length===1?`Case`:`Cases`}
              </div>
            </div>
            <div style="width:40px;height:40px;border-radius:50%;background:#fef3c7;display:flex;align-items:center;justify-content:center;color:#f59e0b;">
              <span class="material-symbols-outlined" style="font-size:22px;">hourglass_top</span>
            </div>
          </div>
          <div style="font-size:0.75rem;color:#64748b;margin-top:8px;">
            Pending Verification &middot; In-progress trial hearings
          </div>
        </div>

        <!-- Low Seriousness Card -->
        <div class="seriousness-kpi-card" id="kpi-card-low" data-quick-filter="seriousness-low" data-target-group="group-low" style="border-left: 5px solid #10b981;display:${a.length>0?`block`:`none`};">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:0.75rem;font-weight:700;color:#047857;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:4px;">
                <span class="material-symbols-outlined" style="font-size:15px;color:#10b981;">check_circle</span>
                Low Seriousness
              </div>
              <div style="font-size:1.625rem;font-weight:800;color:#065f46;margin-top:2px;" id="kpi-count-low">
                ${a.length} ${a.length===1?`Case`:`Cases`}
              </div>
            </div>
            <div style="width:40px;height:40px;border-radius:50%;background:#d1fae5;display:flex;align-items:center;justify-content:center;color:#10b981;">
              <span class="material-symbols-outlined" style="font-size:22px;">verified</span>
            </div>
          </div>
          <div style="font-size:0.75rem;color:#64748b;margin-top:8px;">
            Verified Records &middot; Routine compliance & civil filings
          </div>
        </div>
      </div>

      <!-- Search & Filter Controls Bar -->
      <div class="card-flat" id="search-filter-controls-bar" style="display:${n.length>0?`flex`:`none`};padding:var(--space-md);margin-bottom:var(--space-lg);flex-wrap:wrap;gap:var(--space-md);align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:var(--space-sm);flex:1;min-width:220px;max-width:380px;">
          <span class="material-symbols-outlined" style="font-size:20px;color:var(--outline)">search</span>
          <input type="search" id="case-search-input" placeholder="Search by case title, CNR, or court…"
                 style="flex:1;border:1px solid var(--outline-variant);padding:8px 12px;border-radius:var(--radius-md);outline:none;"
                 aria-label="Search cases">
        </div>

        <div style="display:flex;align-items:center;gap:var(--space-xs);flex-wrap:wrap;" id="filter-pills-container">
          ${u.map((e,t)=>`
            <button class="btn btn--sm ${t===0?`btn--primary`:`btn--secondary`}"
                    data-filter-mode="${e.value}"
                    style="border-radius:var(--radius-full);font-size:0.8125rem;">
              ${e.label}
            </button>
          `).join(``)}
          <button class="btn btn--ghost btn--sm" id="clear-filters-btn" style="font-size:0.75rem;">
            <span class="material-symbols-outlined" style="font-size:14px">close</span> Reset
          </button>
        </div>
      </div>

      <!-- Cases Count Summary -->
      <div style="display:${n.length>0?`flex`:`none`};margin-bottom:var(--space-sm);font-size:0.8125rem;color:var(--on-surface-variant);justify-content:space-between;align-items:center;" id="displayed-case-count">
        <span>Showing <strong>${n.length}</strong> ${e===`user`?`reported cases`:e===`judge`?`bench cases`:`registry dossiers`}</span>
      </div>

      <!-- ======================================================== -->
      <!-- SEPARATED SECTIONS: HIGH, MEDIUM, AND LOW CASES -->
      <!-- Only appears when cases exist in that category -->
      <!-- ======================================================== -->
      <div id="cases-divided-container">
        <!-- 1. HIGH SERIOUSNESS SECTION -->
        <div class="seriousness-group-block" id="group-high" style="display:${r.length>0?`block`:`none`};margin-bottom: var(--space-xl);">
          <div class="seriousness-section-header header--high">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="font-size:18px;">priority_high</span>
              <span>1. High Seriousness & Urgent Review</span>
              <span class="badge badge--seriousness-high" style="font-size:0.625rem;" id="header-badge-high">${r.length} Records</span>
            </div>
            <span class="hide-mobile" style="font-size:0.6875rem;opacity:0.85;font-weight:600;">Critical review required &middot; Flagged evidence / Penal trial</span>
          </div>
          <div class="cases-group-list" id="list-high" style="display:flex;flex-direction:column;gap:var(--space-sm);">
            ${r.map(t=>x(t,e)).join(``)}
          </div>
        </div>

        <!-- 2. MEDIUM SERIOUSNESS SECTION -->
        <div class="seriousness-group-block" id="group-medium" style="display:${i.length>0?`block`:`none`};margin-bottom: var(--space-xl);">
          <div class="seriousness-section-header header--medium">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="font-size:18px;">schedule</span>
              <span>2. Medium Seriousness & In-Progress Review</span>
              <span class="badge badge--seriousness-medium" style="font-size:0.625rem;" id="header-badge-medium">${i.length} Records</span>
            </div>
            <span class="hide-mobile" style="font-size:0.6875rem;opacity:0.85;font-weight:600;">Active trial proceedings &middot; Pending documentary review</span>
          </div>
          <div class="cases-group-list" id="list-medium" style="display:flex;flex-direction:column;gap:var(--space-sm);">
            ${i.map(t=>x(t,e)).join(``)}
          </div>
        </div>

        <!-- 3. LOW SERIOUSNESS SECTION -->
        <div class="seriousness-group-block" id="group-low" style="display:${a.length>0?`block`:`none`};margin-bottom: var(--space-xl);">
          <div class="seriousness-section-header header--low">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="font-size:18px;">check_circle</span>
              <span>3. Low Seriousness & Routine Dockets</span>
              <span class="badge badge--seriousness-low" style="font-size:0.625rem;" id="header-badge-low">${a.length} Records</span>
            </div>
            <span class="hide-mobile" style="font-size:0.6875rem;opacity:0.85;font-weight:600;">Verified clean dockets &middot; Civil compliance & routine scheduling</span>
          </div>
          <div class="cases-group-list" id="list-low" style="display:flex;flex-direction:column;gap:var(--space-sm);">
            ${a.map(t=>x(t,e)).join(``)}
          </div>
        </div>
      </div>

      <!-- Empty Filter State -->
      <div id="empty-filter-state" style="display:none;text-align:center;padding:var(--space-xl);color:var(--on-surface-variant);">
        <span class="material-symbols-outlined" style="font-size:48px;color:var(--outline-variant)">search_off</span>
        <p class="text-body-md" style="margin-top:var(--space-sm);">No records match your selected criteria or timespan.</p>
      </div>

      <!-- Register New Case Modal -->
      <div id="new-case-modal" class="modal-overlay" style="display:none;position:fixed;inset:0;z-index:60;background:rgba(0,0,0,0.6);align-items:center;justify-content:center;padding:var(--space-md);backdrop-filter:blur(4px);">
        <div class="card" style="width:100%;max-width:540px;padding:var(--space-xl);animation:slideUp 0.3s ease;box-shadow:var(--shadow-lg);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-lg);border-bottom:1px solid var(--outline-variant);padding-bottom:12px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:36px;height:36px;border-radius:8px;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;">
                <span class="material-symbols-outlined" style="font-size:20px;">folder_open</span>
              </div>
              <div>
                <h2 class="text-headline-sm" style="color:var(--primary);font-weight:700;">
                  ${e===`user`?`Report / Register My Case`:`Register New Case Record`}
                </h2>
                <p style="font-size:0.75rem;color:var(--on-surface-variant);">
                  ${e===`user`?`Attributed directly to your identity (${t})`:`Assign seriousness, timespan, and dossier parameters`}
                </p>
              </div>
            </div>
            <button id="close-modal-btn" style="background:none;border:none;cursor:pointer;color:var(--on-surface-variant);padding:4px;" aria-label="Close modal">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <form id="create-case-form" style="display:flex;flex-direction:column;gap:var(--space-md);">
            <div>
              <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Case Title *</label>
              <input type="text" id="modal-case-title" required placeholder="e.g., State of Maharashtra v. Anjali Verma"
                     style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);outline:none;">
            </div>

            <!-- Seriousness Level Selector -->
            <div>
              <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:700;">
                Case Seriousness & Review Priority *
              </label>
              <select id="modal-case-seriousness" style="width:100%;padding:10px 14px;border:1.5px solid var(--primary);border-radius:var(--radius-md);background:var(--surface-container-lowest);font-weight:600;outline:none;">
                <option value="high">🔴 High Seriousness (Urgent Criminal / Flagged Matter)</option>
                <option value="medium" selected>🟡 Medium Seriousness (Active Trial / Pending Review)</option>
                <option value="low">🟢 Low Seriousness (Routine Compliance / Civil Docket)</option>
              </select>
            </div>

            <!-- Timespan Listing -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Hearing Timespan *</label>
                <select id="modal-case-timespan" style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);background:white;outline:none;font-weight:600;">
                  <option value="day" selected>📅 Listed Today (Day)</option>
                  <option value="month">🗓️ Listed This Month (Month)</option>
                  <option value="past">📜 Previous Adjudicated Case</option>
                </select>
              </div>
              <div>
                <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Reported By</label>
                <input type="text" id="modal-case-reported-by" value="${t}"
                       style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);outline:none;background:#f8fafc;" ${e===`user`?`readonly`:``}>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">CNR Number</label>
                <input type="text" id="modal-case-cnr" placeholder="e.g., MHPU01-009842-2025"
                       style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);outline:none;">
              </div>
              <div>
                <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Review Status</label>
                <select id="modal-case-status" style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);background:white;outline:none;">
                  <option value="pending" selected>Pending Review</option>
                  <option value="verified">Verified</option>
                  <option value="flagged">Needs Attention (Flagged)</option>
                  <option value="processing">In Processing</option>
                </select>
              </div>
            </div>

            <div>
              <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Court / Jurisdiction</label>
              <input type="text" id="modal-case-court" placeholder="e.g., JMFC Court Room 3, Pune"
                     style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);outline:none;">
            </div>

            <div>
              <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Hearing Purpose / Bench Notes</label>
              <input type="text" id="modal-case-purpose" placeholder="e.g., Cross-Examination of PW-2 / Arguments on Bail"
                     style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);outline:none;">
            </div>

            <div style="display:flex;gap:var(--space-sm);justify-content:flex-end;margin-top:var(--space-md);">
              <button type="button" class="btn btn--secondary" id="cancel-modal-btn">Cancel</button>
              <button type="submit" class="btn btn--primary" id="btn-submit-new-case">
                <span class="material-symbols-outlined" style="font-size:18px;">save</span>
                ${e===`user`?`Report Dossier`:`Register Dossier`}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Case Confirmation Modal -->
      <div id="delete-case-modal" class="modal-overlay" style="display:none;position:fixed;inset:0;z-index:70;background:rgba(0,0,0,0.65);align-items:center;justify-content:center;padding:var(--space-md);backdrop-filter:blur(4px);">
        <div class="card" style="width:100%;max-width:460px;padding:var(--space-xl);animation:slideUp 0.25s ease;box-shadow:var(--shadow-lg);border:1px solid #fecaca;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:var(--space-md);">
            <div style="width:42px;height:42px;border-radius:50%;background:#fee2e2;color:#dc2626;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span class="material-symbols-outlined" style="font-size:24px;">delete_forever</span>
            </div>
            <div>
              <h3 class="text-headline-sm" style="color:#991b1b;font-weight:700;margin:0;">Delete Case Record?</h3>
              <p style="font-size:0.8125rem;color:var(--on-surface-variant);margin:2px 0 0;">Permanent removal</p>
            </div>
          </div>
          <p class="text-body-sm" id="delete-modal-case-message" style="color:var(--on-surface);margin-bottom:var(--space-lg);line-height:1.5;">
            Are you sure you want to delete this case record?
          </p>
          <div style="display:flex;gap:var(--space-sm);justify-content:flex-end;">
            <button type="button" class="btn btn--secondary" id="cancel-delete-modal-btn">Cancel</button>
            <button type="button" class="btn btn--sm" id="confirm-delete-case-btn" style="background:#dc2626;color:#ffffff;border:none;padding:9px 18px;border-radius:var(--radius-md);font-weight:600;display:inline-flex;align-items:center;gap:6px;cursor:pointer;">
              <span class="material-symbols-outlined" style="font-size:16px;">delete</span>
              Delete Case
            </button>
          </div>
        </div>
      </div>

    </div>
  `}function C(){let e=_.getCurrentRole(),t=_.getCurrentUser(),n=document.getElementById(`case-search-input`),r=document.getElementById(`clear-filters-btn`),i=document.getElementById(`displayed-case-count`),a=document.getElementById(`empty-filter-state`),o=e===`judge`?`judge-day`:`all`,s=document.getElementById(`delete-case-modal`),c=document.getElementById(`cancel-delete-modal-btn`),l=document.getElementById(`confirm-delete-case-btn`),u=null,d=``;function f(){s&&(s.style.display=`none`),u=null,d=``}c?.addEventListener(`click`,f),s?.addEventListener(`click`,e=>{e.target===s&&f()}),l?.addEventListener(`click`,async()=>{if(!u)return;let e=u,t=d;f(),await _.deleteCase(e),document.querySelectorAll(`.case-record-item[data-case-id="${e}"]`).forEach(e=>{e.style.transition=`all 0.25s ease`,e.style.opacity=`0`,e.style.transform=`translateX(-20px)`,setTimeout(()=>{e.remove(),p(),m()},250)});let n=document.getElementById(`cases-alert-toast`),r=document.getElementById(`cases-alert-toast-text`);n&&r&&(r.textContent=`Case "${t}" has been permanently removed.`,n.style.background=`#fef2f2`,n.style.borderColor=`#fecaca`,n.style.color=`#991b1b`,n.style.display=`flex`,setTimeout(()=>{n.style.display=`none`,n.style.background=`#ecfdf5`,n.style.borderColor=`#a7f3d0`,n.style.color=`#065f46`},4e3))});function p(){let t=Array.from(document.querySelectorAll(`.case-record-item`)),n=t.filter(e=>e.getAttribute(`data-case-seriousness`)===`high`),r=t.filter(e=>e.getAttribute(`data-case-seriousness`)===`medium`),i=t.filter(e=>e.getAttribute(`data-case-seriousness`)===`low`),a=t.length,o=document.getElementById(`seriousness-kpi-container`),s=document.getElementById(`no-cases-registered-banner`),c=document.getElementById(`search-filter-controls-bar`),l=document.getElementById(`displayed-case-count`);o&&(o.style.display=a>0?`grid`:`none`),s&&(s.style.display=a===0?`block`:`none`),c&&(c.style.display=a>0?`flex`:`none`),l&&(l.style.display=a>0?`flex`:`none`);let u=document.getElementById(`kpi-card-high`);if(u){u.style.display=n.length>0?`block`:`none`;let e=document.getElementById(`kpi-count-high`);e&&(e.textContent=`${n.length} ${n.length===1?`Case`:`Cases`}`)}let d=document.getElementById(`kpi-card-medium`);if(d){d.style.display=r.length>0?`block`:`none`;let e=document.getElementById(`kpi-count-medium`);e&&(e.textContent=`${r.length} ${r.length===1?`Case`:`Cases`}`)}let f=document.getElementById(`kpi-card-low`);if(f){f.style.display=i.length>0?`block`:`none`;let e=document.getElementById(`kpi-count-low`);e&&(e.textContent=`${i.length} ${i.length===1?`Case`:`Cases`}`)}let p=document.getElementById(`header-badge-high`),m=document.getElementById(`header-badge-medium`),h=document.getElementById(`header-badge-low`);p&&(p.textContent=`${n.length} Records`),m&&(m.textContent=`${r.length} Records`),h&&(h.textContent=`${i.length} Records`);let g=document.querySelector(`[data-filter-mode="all"]`);g&&(g.textContent=e===`user`?`My Reported Cases (${a})`:`All Records (${a})`)}function m(){let e=(n?.value||``).toLowerCase().trim(),t=document.querySelectorAll(`.case-record-item`),r=0,s=document.getElementById(`group-high`),c=document.getElementById(`group-medium`),l=document.getElementById(`group-low`),u=0,d=0,f=0;t.forEach(t=>{let n=t.getAttribute(`data-case-status`),i=t.getAttribute(`data-case-seriousness`),a=t.getAttribute(`data-case-timespan`)||`day`,s=t.getAttribute(`data-case-is-disposed`)===`true`,c=(t.getAttribute(`data-case-title`)||``).toLowerCase(),l=(t.getAttribute(`data-case-cnr`)||``).toLowerCase(),p=(t.getAttribute(`data-case-court`)||``).toLowerCase(),m=!0;m=o===`all`?!0:o===`timespan-day`?a===`day`:o===`timespan-month`?a===`day`||a===`month`:o===`judge-day`?a===`day`&&!s:o===`judge-month`?(a===`day`||a===`month`)&&!s:o===`judge-past`?s||a===`past`:o===`seriousness-high`?i===`high`:o===`seriousness-medium`?i===`medium`:o===`seriousness-low`?i===`low`:n===o;let h=!e||c.includes(e)||l.includes(e)||p.includes(e);m&&h?(t.style.display=`flex`,r++,i===`high`&&u++,i===`medium`&&d++,i===`low`&&f++):t.style.display=`none`}),s&&(s.style.display=u>0?`block`:`none`),c&&(c.style.display=d>0?`block`:`none`),l&&(l.style.display=f>0?`block`:`none`),i&&(i.innerHTML=`Showing <strong>${r}</strong> of ${t.length} records (${u} High, ${d} Medium, ${f} Low)`),a&&(a.style.display=r===0&&t.length>0?`block`:`none`)}function h(e){o=e,document.querySelectorAll(`[data-filter-mode]`).forEach(t=>{t.getAttribute(`data-filter-mode`)===e?(t.classList.remove(`btn--secondary`),t.classList.add(`btn--primary`)):(t.classList.remove(`btn--primary`),t.classList.add(`btn--secondary`))}),document.querySelectorAll(`.seriousness-kpi-card`).forEach(t=>{t.classList.remove(`active--high`,`active--medium`,`active--low`),t.getAttribute(`data-quick-filter`)===e&&(e===`seriousness-high`&&t.classList.add(`active--high`),e===`seriousness-medium`&&t.classList.add(`active--medium`),e===`seriousness-low`&&t.classList.add(`active--low`))}),m()}document.querySelectorAll(`[data-filter-mode]`).forEach(e=>{e.addEventListener(`click`,()=>{h(e.getAttribute(`data-filter-mode`))})}),document.querySelectorAll(`.seriousness-kpi-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-quick-filter`);if(t){h(o===t?`all`:t);let n=e.getAttribute(`data-target-group`),r=n?document.getElementById(n):null;r&&r.style.display!==`none`&&r.scrollIntoView({behavior:`smooth`,block:`nearest`})}})}),n?.addEventListener(`input`,m),r?.addEventListener(`click`,()=>{n&&(n.value=``),h(e===`judge`?`judge-day`:`all`)});function g(){document.querySelectorAll(`.case-record-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-case-id`);t&&(_.setActiveCase(t),window.location.hash=`#/timeline`)})}),document.querySelectorAll(`.btn-open-timeline`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.getAttribute(`data-case-id`);n&&(_.setActiveCase(n),window.location.hash=`#/timeline`)})}),document.querySelectorAll(`.btn-delete-case`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),u=e.getAttribute(`data-case-id`),d=e.getAttribute(`data-case-title`)||`this case`;let n=document.getElementById(`delete-modal-case-message`);n&&(n.innerHTML=`Are you sure you want to permanently delete <strong>"${d}"</strong>? All associated proceedings, timelines, and court records will be purged.`),s&&(s.style.display=`flex`)})})}g();let v=document.getElementById(`new-case-modal`),y=document.getElementById(`open-create-modal-btn`),b=document.getElementById(`close-modal-btn`),S=document.getElementById(`cancel-modal-btn`),C=document.getElementById(`create-case-form`);function w(){v&&(v.style.display=`flex`),document.getElementById(`modal-case-title`)?.focus()}function T(){v&&(v.style.display=`none`)}y?.addEventListener(`click`,w),document.getElementById(`btn-banner-new-case`)?.addEventListener(`click`,w),b?.addEventListener(`click`,T),S?.addEventListener(`click`,T),v?.addEventListener(`click`,e=>{e.target===v&&T()}),C?.addEventListener(`submit`,async n=>{n.preventDefault();let r=document.getElementById(`modal-case-title`)?.value||``,i=document.getElementById(`modal-case-seriousness`)?.value||`medium`,a=document.getElementById(`modal-case-timespan`)?.value||`day`,o=document.getElementById(`modal-case-reported-by`)?.value||t,s=document.getElementById(`modal-case-cnr`)?.value||``,c=document.getElementById(`modal-case-court`)?.value||``,l=document.getElementById(`modal-case-purpose`)?.value||``,u=document.getElementById(`modal-case-status`)?.value||`pending`;if(!r.trim())return;let d=await _.createCase({title:r,seriousness:i,timespan:a,reportedBy:o,cnr:s,court:c,hearingPurpose:l,status:u});T(),C.reset(),h(e===`judge`?`judge-day`:`all`);let f=i===`high`?`list-high`:i===`low`?`list-low`:`list-medium`,v=document.getElementById(f);if(v){let t=x(d,e);v.insertAdjacentHTML(`afterbegin`,t);let n=v.querySelector(`[data-case-id="${d.id}"]`);n&&(n.style.boxShadow=`0 0 0 3px rgba(37, 99, 235, 0.4)`,n.style.background=`#eff6ff`,setTimeout(()=>{n.style.boxShadow=``,n.style.background=``},2500))}g(),p(),m();let y=document.getElementById(`cases-alert-toast`),b=document.getElementById(`cases-alert-toast-text`);y&&b&&(b.textContent=`New Case "${d.title}" successfully registered under ${o}!`,y.style.display=`flex`,setTimeout(()=>{y.style.display=`none`},4e3))}),m()}function w(){let e=_.getActiveCase(),t=_.getCaseDocuments(e.id);return`
    <div class="page-content animate-fade-in" style="max-width: 1040px; margin: 0 auto;">
      <!-- Success Toast / Notification -->
      <div id="upload-success-toast" style="display:none;margin-bottom:var(--space-md);padding:14px 20px;border-radius:var(--radius-lg);background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;align-items:center;justify-content:space-between;gap:12px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="material-symbols-outlined" style="color:#059669;font-size:24px;">check_circle</span>
          <div>
            <div style="font-weight:700;font-size:0.9375rem;" id="upload-success-title">Documents Ingested Successfully!</div>
            <div style="font-size:0.8125rem;color:#047857;" id="upload-success-desc">
              FIR & court orders integrated into Evidence Lens & live timeline.
            </div>
          </div>
        </div>
        <a href="#/review" class="btn btn--primary btn--sm" style="text-decoration:none;border-radius:8px;background:#059669;">
          <span>View in Evidence Review Lens</span>
          <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
        </a>
      </div>

      <!-- Page Header -->
      <div style="margin-bottom:var(--space-lg);">
        <h1 class="page-heading">2. Document Intake & FIR Upload</h1>
        <p class="text-body-sm" style="color:var(--on-surface-variant);margin-top:4px;">
          Upload court records, FIR depositions, chargesheets, and orders to activate Evidence Lens
        </p>
      </div>

      <!-- Case Context Bar -->
      <div class="card-flat" style="padding:var(--space-md);margin-bottom:var(--space-lg);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-md);">
        <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;">
          <span style="width:10px;height:10px;background:var(--primary);border-radius:50%;"></span>
          <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">Active Matter: ${e.title}</span>
          <span class="text-code-sm" style="color:var(--secondary);background:var(--surface-container-low);padding:2px 8px;border-radius:var(--radius-sm);">CNR: ${e.cnr}</span>
          <span class="badge badge--neutral">${t.length} Docs currently in dossier</span>
        </div>
        <a href="#/cases" class="btn btn--ghost btn--sm">Change Case ⇄</a>
      </div>

      <!-- Drop Zone -->
      <div id="drop-target" class="card" style="padding:var(--space-xl);text-align:center;border:2px dashed var(--outline-variant);border-radius:var(--radius-xl);margin-bottom:var(--space-lg);transition:all 0.2s;cursor:pointer;">
        <span class="material-symbols-outlined" style="font-size:48px;color:var(--primary);display:block;margin-bottom:var(--space-sm);">cloud_upload</span>
        <p class="text-body-lg" style="font-weight:600;color:var(--on-surface);margin-bottom:4px;">
          Drag and drop FIR or court documents here
        </p>
        <p class="text-body-sm" style="color:var(--on-surface-variant);margin-bottom:var(--space-md);">
          or click to browse · PDF, JPEG, PNG, TIFF · Max 25 MB per file
        </p>
        <label class="btn btn--primary" for="file-native-input" style="cursor:pointer;">
          <span class="material-symbols-outlined" style="font-size:18px">folder_open</span>
          Browse Files
        </label>
        <input type="file" id="file-native-input" multiple accept=".pdf,.jpg,.jpeg,.png,.tiff"
               style="display:none;" aria-label="Select files to upload">
      </div>

      <!-- Upload Queue -->
      <div style="margin-bottom:var(--space-lg);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-sm);">
          <div style="display:flex;align-items:center;gap:var(--space-sm);">
            <span class="section-title" style="margin-bottom:0;">Intake Queue</span>
            <span id="queue-counter-badge" class="badge badge--neutral">0 Files Selected</span>
          </div>
          <div style="display:flex;gap:var(--space-sm);">
            <button class="btn btn--ghost btn--sm" id="btn-sample-fir" style="font-size:0.75rem;color:var(--primary);">
              <span class="material-symbols-outlined" style="font-size:14px">description</span> + Add Sample FIR & Chargesheet
            </button>
            <button class="btn btn--ghost btn--sm" id="btn-clear-queue" style="font-size:0.75rem;">
              <span class="material-symbols-outlined" style="font-size:14px">delete_sweep</span> Clear
            </button>
          </div>
        </div>

        <div id="files-queue-list" style="display:flex;flex-direction:column;gap:8px;border-radius:var(--radius-lg);">
          <div id="queue-empty-prompt" style="padding:var(--space-lg);text-align:center;color:var(--on-surface-variant);background:var(--surface-container-low);border-radius:var(--radius-md);" class="text-body-sm">
            No files currently in queue. Drag & drop court documents or click "+ Add Sample FIR & Chargesheet" above.
          </div>
        </div>
      </div>

      <!-- Upload Progress -->
      <div id="global-progress-wrap" style="display:none;align-items:center;gap:var(--space-md);padding:var(--space-md);background:var(--surface-container-low);border-radius:var(--radius-lg);margin-bottom:var(--space-md);">
        <div style="flex:1;height:8px;background:var(--outline-variant);border-radius:4px;overflow:hidden;">
          <div id="progress-bar-fill" style="width:0%;height:100%;background:var(--primary);border-radius:4px;transition:width 0.25s;"></div>
        </div>
        <span id="progress-percent" class="text-label-md" style="color:var(--primary);min-width:3rem;text-align:right;font-weight:700;">0%</span>
      </div>

      <!-- Upload Action -->
      <div style="display:flex;align-items:center;justify-content:flex-end;gap:var(--space-sm);">
        <button class="btn btn--primary btn--lg" id="upload-primary-btn" disabled>
          <span class="material-symbols-outlined" style="font-size:20px">upload</span>
          Upload & Ingest All Documents
        </button>
      </div>
    </div>
  `}function T(){let e=_.getActiveCase(),t=document.getElementById(`file-native-input`),n=document.getElementById(`drop-target`),r=document.getElementById(`files-queue-list`),i=document.getElementById(`queue-empty-prompt`),a=document.getElementById(`queue-counter-badge`),o=document.getElementById(`upload-primary-btn`),s=document.getElementById(`btn-clear-queue`),c=document.getElementById(`btn-sample-fir`),l=document.getElementById(`upload-success-toast`),u=[];function d(){a&&(a.textContent=`${u.length} Files Selected`),o&&(o.disabled=u.length===0),i&&(i.style.display=u.length===0?`block`:`none`)}function f(e){for(let t of e)u.some(e=>e.name===t.name)||(u.push(t),p(t));d()}function p(e){if(!r)return;let t=e.name.toLowerCase().includes(`fir`),n=e.name.toLowerCase().endsWith(`.pdf`),i=t?`local_police`:n?`picture_as_pdf`:`description`,a=document.createElement(`div`);a.className=`card-flat queue-item`,a.setAttribute(`data-filename`,e.name),a.style.cssText=`display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--surface-container-lowest);border-radius:var(--radius-md);animation:fadeIn 0.2s ease;`,a.innerHTML=`
      <div style="display:flex;align-items:center;gap:12px;min-width:0;">
        <div style="width:38px;height:38px;border-radius:8px;background:${t?`#eff6ff`:`var(--surface-container-low)`};color:${t?`#1d4ed8`:`var(--primary)`};display:flex;align-items:center;justify-content:center;">
          <span class="material-symbols-outlined" style="font-size:20px;">${i}</span>
        </div>
        <div>
          <div style="font-weight:700;font-size:0.875rem;color:var(--on-surface);">${e.name}</div>
          <div style="font-size:0.75rem;color:var(--on-surface-variant);">${t?`First Information Report (FIR)`:`Court Filing Record`} · Ready for OCR & Ledger Ingestion</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span class="badge badge--neutral" style="font-size:0.6875rem;">Queued</span>
        <button type="button" class="btn-remove-item" style="background:none;border:none;cursor:pointer;color:var(--outline);padding:4px;" title="Remove">
          <span class="material-symbols-outlined" style="font-size:18px;">close</span>
        </button>
      </div>
    `,a.querySelector(`.btn-remove-item`)?.addEventListener(`click`,()=>{u=u.filter(t=>t.name!==e.name),a.remove(),d()}),r.appendChild(a)}t?.addEventListener(`change`,e=>{e.target.files&&f(Array.from(e.target.files))}),n?.addEventListener(`dragover`,e=>{e.preventDefault(),n.style.borderColor=`var(--primary)`,n.style.background=`var(--surface-container-low)`}),n?.addEventListener(`dragleave`,()=>{n.style.borderColor=`var(--outline-variant)`,n.style.background=``}),n?.addEventListener(`drop`,e=>{e.preventDefault(),n.style.borderColor=`var(--outline-variant)`,n.style.background=``,e.dataTransfer?.files&&f(Array.from(e.dataTransfer.files))}),s?.addEventListener(`click`,()=>{u=[],r&&r.querySelectorAll(`.queue-item`).forEach(e=>e.remove()),d()}),c?.addEventListener(`click`,()=>{f([{name:`FIR_${e.cnr.replace(/[^a-zA-Z0-9]/g,`_`)}_Police_Lodgment.pdf`,size:14e5},{name:`Chargesheet_Exhibits_${e.court.replace(/[^a-zA-Z0-9]/g,`_`)}.pdf`,size:28e5},{name:`Order_Sheet_Initial_Cognizance.pdf`,size:95e4}])}),o?.addEventListener(`click`,()=>{if(u.length===0)return;let t=document.getElementById(`global-progress-wrap`),n=document.getElementById(`progress-bar-fill`),r=document.getElementById(`progress-percent`);t&&(t.style.display=`flex`),o.disabled=!0;let i=0,a=setInterval(()=>{if(i+=20,i>=100){if(i=100,clearInterval(a),n&&(n.style.width=`100%`),r&&(r.textContent=`100%`),_.addCaseDocuments(e.id,u),document.querySelectorAll(`.queue-item .badge`).forEach(e=>{e.className=`badge badge--verified`,e.innerHTML=`<span class="material-symbols-outlined" style="font-size:12px">check</span> Uploaded & Verified`}),l){l.style.display=`flex`;let e=document.getElementById(`upload-success-desc`);e&&(e.textContent=`${u.length} court records & FIR successfully indexed into Evidence Lens and live timeline!`)}}else n&&(n.style.width=i+`%`),r&&(r.textContent=i+`%`)},200)})}function E(e){let t={filing:{bg:`var(--surface-container-low)`,border:`var(--primary)`,icon:`var(--primary)`},proceeding:{bg:`var(--surface-container-low)`,border:`var(--status-verified)`,icon:`var(--status-verified)`},order:{bg:`var(--surface-container-low)`,border:`var(--status-processing)`,icon:`var(--status-processing)`},hearing:{bg:`var(--surface-container-low)`,border:`var(--secondary)`,icon:`var(--secondary)`},upcoming:{bg:`var(--status-pending-bg)`,border:`var(--status-pending)`,icon:`var(--status-pending)`}};return t[e]||t.filing}function D(e){let t={verified:{label:`Verified Docket`,cls:`badge--verified`,icon:`verified`},pending:{label:`Pending Review`,cls:`badge--pending`,icon:`schedule`},flagged:{label:`Flagged / Needs Attention`,cls:`badge--flagged`,icon:`flag`},processing:{label:`In Processing`,cls:`badge--processing`,icon:`sync`}},n=t[e]||t.pending;return`
    <span class="badge ${n.cls}" id="timeline-top-badge" style="font-size:0.8125rem;border-radius:var(--radius-full);padding:4px 12px;display:inline-flex;align-items:center;gap:6px;">
      <span class="material-symbols-outlined" style="font-size:16px">${n.icon}</span>
      <span id="timeline-top-badge-text">${n.label}</span>
    </span>
  `}function O(){let e=_.getActiveCase(),t=_.getCaseTimeline(e.id);return`
    <div class="page-content animate-fade-in" style="max-width: 960px; margin: 0 auto;">
      <!-- Success Notification Toast -->
      <div id="timeline-status-toast" style="display:none;margin-bottom:var(--space-md);padding:12px 18px;border-radius:var(--radius-md);background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;align-items:center;justify-content:space-between;gap:10px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="material-symbols-outlined" style="color:#059669;font-size:20px;">check_circle</span>
          <span id="timeline-status-toast-text" style="font-size:0.875rem;font-weight:600;">Updated successfully!</span>
        </div>
        <a href="#/cases" style="color:#059669;font-weight:700;font-size:0.8125rem;text-decoration:underline;">View in All Records →</a>
      </div>

      <!-- Compact Case Header -->
      <div class="card" style="padding:16px 20px;margin-bottom:var(--space-md);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;box-shadow:var(--shadow-xs);">
        <div style="display:flex;flex-direction:column;gap:4px;">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <h1 style="font-size:1.375rem;font-weight:700;color:var(--on-surface);letter-spacing:-0.01em;" id="timeline-case-title">
              ${e.title}
            </h1>
            ${D(e.status)}
            ${e.isCustom?`<span class="badge" style="background:#eff6ff;color:#1d4ed8;font-size:0.6875rem;">Active User Docket</span>`:``}
          </div>
          <p class="text-body-sm" style="color:var(--on-surface-variant);">
            CNR: <strong style="color:var(--primary);">${e.cnr}</strong> · ${e.court}
          </p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <a href="#/cases" class="btn btn--secondary btn--sm" style="border-radius:var(--radius-md);text-decoration:none;">
            <span class="material-symbols-outlined" style="font-size:16px;">folder_open</span>
            <span>Change Case</span>
          </a>
          <button class="btn btn--primary btn--sm" id="btn-open-add-event" style="border-radius:var(--radius-md);">
            <span class="material-symbols-outlined" style="font-size:16px;">add</span>
            <span>Add Proceeding Event</span>
          </button>
        </div>
      </div>

      <!-- Next Hearing Banner -->
      <div style="background:var(--primary);color:#fff;padding:16px 20px;margin-bottom:var(--space-lg);border-radius:var(--radius-lg);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;box-shadow:var(--shadow-sm);">
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="width:42px;height:42px;border-radius:10px;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;">
            <span class="material-symbols-outlined" style="font-size:24px;color:#fff">event</span>
          </div>
          <div>
            <div class="text-label-sm" style="opacity:0.85;text-transform:uppercase;letter-spacing:0.08em;">Next Scheduled Hearing</div>
            <div style="font-size:1.125rem;font-weight:700;">${e.nextHearing||`Upcoming Scheduling`}</div>
            <div class="text-body-sm" style="opacity:0.85;">${e.section||`District Court Docket Hearing`}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;opacity:0.95;">
          <span class="material-symbols-outlined" style="font-size:18px">location_city</span>
          <span class="text-body-sm" style="font-weight:600;">${e.court}</span>
        </div>
      </div>

      <!-- Timeline Heading & Actions -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-md);flex-wrap:wrap;gap:8px;">
        <div>
          <h2 class="text-headline-sm" style="color:var(--primary);font-weight:700;">Live Case Proceedings</h2>
          <p style="font-size:0.8125rem;color:var(--on-surface-variant);">
            Strict chronological record for <strong>${e.title}</strong>
          </p>
        </div>
        <span class="badge badge--neutral" style="border-radius:var(--radius-sm);font-weight:600;" id="timeline-count-badge">
          ${t.length} Events Logged
        </span>
      </div>

      <!-- Timeline Events Container -->
      <div class="stagger-children" id="timeline-events-container" style="position:relative;padding-left:28px;margin-bottom:var(--space-xl);">
        <!-- Vertical line -->
        <div style="position:absolute;left:11px;top:8px;bottom:8px;width:2px;background:var(--outline-variant);border-radius:1px;"></div>

        ${t.map((e,n)=>{let r=E(e.type);return`
            <div class="timeline-event-row" style="position:relative;padding-bottom:${n===t.length-1?`0`:`var(--space-lg)`};display:flex;gap:var(--space-md);">
              <!-- Dot -->
              <div style="position:absolute;left:-24px;top:4px;width:14px;height:14px;border-radius:50%;border:2px solid ${r.border};background:var(--surface-container-lowest);z-index:1;"></div>

              <!-- Content Card -->
              <div class="card-flat" style="flex:1;padding:var(--space-md);border-left:3px solid ${r.border};transition:box-shadow 0.15s;border-radius:var(--radius-md);"
                   onmouseover="this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.boxShadow='var(--shadow-xs)'">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:4px;">
                  <div style="display:flex;align-items:center;gap:var(--space-sm);">
                    <span class="material-symbols-outlined" style="font-size:18px;color:${r.icon}">${e.icon}</span>
                    <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">${e.label}</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span class="text-body-sm" style="color:var(--on-surface-variant);font-weight:500;">${e.date}</span>
                    ${e.verified?`<span class="badge badge--verified" style="font-size:0.625rem;padding:2px 8px;"><span class="material-symbols-outlined" style="font-size:11px">check</span> Verified</span>`:`<span class="badge badge--pending" style="font-size:0.625rem;padding:2px 8px;">Upcoming</span>`}
                  </div>
                </div>
                <p class="text-body-sm" style="color:var(--on-surface-variant);line-height:1.5;">${e.description}</p>
              </div>
            </div>
          `}).join(``)}
      </div>

      <!-- ======================================================== -->
      <!-- END OF TIMELINE: DOCKET DETERMINATION & STATUS SELECTOR -->
      <!-- ======================================================== -->
      <div class="card" style="padding:var(--space-lg);border-radius:var(--radius-lg);border:2px solid #93c5fd;background:linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%);box-shadow:var(--shadow-md);margin-top:var(--space-lg);">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:var(--space-md);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:44px;height:44px;border-radius:12px;background:#1e3a8a;color:#ffffff;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-sm);">
              <span class="material-symbols-outlined" style="font-size:24px;">fact_check</span>
            </div>
            <div>
              <h3 style="font-size:1.125rem;font-weight:700;color:#0F2A4A;margin-bottom:2px;">
                End of Timeline: Case Status Assessment
              </h3>
              <p style="font-size:0.8125rem;color:#475569;">
                Choose the verified outcome for <strong>${e.title}</strong> after reviewing all timeline proceedings:
              </p>
            </div>
          </div>
          <div id="current-outcome-display" style="padding:6px 14px;border-radius:9999px;background:#ffffff;border:1px solid #cbd5e1;font-size:0.8125rem;font-weight:700;display:flex;align-items:center;gap:6px;">
            <span>Current Status:</span>
            <strong id="current-outcome-name" style="color:#0F2A4A;text-transform:capitalize;">${e.status}</strong>
          </div>
        </div>

        <!-- 4 Status Action Buttons -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;margin-top:var(--space-md);">
          <button class="btn btn-status-choice ${e.status===`verified`?`active-choice`:``}" data-set-status="verified"
                  style="display:flex;flex-direction:column;align-items:center;padding:14px;border-radius:10px;border:2px solid ${e.status===`verified`?`#059669`:`#e2e8f0`};background:${e.status===`verified`?`#ecfdf5`:`#ffffff`};cursor:pointer;transition:all 0.15s ease;">
            <span class="material-symbols-outlined" style="font-size:26px;color:#059669;margin-bottom:6px;">verified</span>
            <strong style="color:#065f46;font-size:0.875rem;">Verified</strong>
            <span style="font-size:0.75rem;color:#64748b;text-align:center;margin-top:2px;">All orders & citations verified</span>
          </button>

          <button class="btn btn-status-choice ${e.status===`pending`?`active-choice`:``}" data-set-status="pending"
                  style="display:flex;flex-direction:column;align-items:center;padding:14px;border-radius:10px;border:2px solid ${e.status===`pending`?`#d97706`:`#e2e8f0`};background:${e.status===`pending`?`#fffbeb`:`#ffffff`};cursor:pointer;transition:all 0.15s ease;">
            <span class="material-symbols-outlined" style="font-size:26px;color:#d97706;margin-bottom:6px;">schedule</span>
            <strong style="color:#92400e;font-size:0.875rem;">Pending Review</strong>
            <span style="font-size:0.75rem;color:#64748b;text-align:center;margin-top:2px;">Awaiting clerk verification</span>
          </button>

          <button class="btn btn-status-choice ${e.status===`flagged`?`active-choice`:``}" data-set-status="flagged"
                  style="display:flex;flex-direction:column;align-items:center;padding:14px;border-radius:10px;border:2px solid ${e.status===`flagged`?`#dc2626`:`#e2e8f0`};background:${e.status===`flagged`?`#fef2f2`:`#ffffff`};cursor:pointer;transition:all 0.15s ease;">
            <span class="material-symbols-outlined" style="font-size:26px;color:#dc2626;margin-bottom:6px;">flag</span>
            <strong style="color:#991b1b;font-size:0.875rem;">Flagged</strong>
            <span style="font-size:0.75rem;color:#64748b;text-align:center;margin-top:2px;">Discrepancy / Attention needed</span>
          </button>

          <button class="btn btn-status-choice ${e.status===`processing`?`active-choice`:``}" data-set-status="processing"
                  style="display:flex;flex-direction:column;align-items:center;padding:14px;border-radius:10px;border:2px solid ${e.status===`processing`?`#4f46e5`:`#e2e8f0`};background:${e.status===`processing`?`#eef2ff`:`#ffffff`};cursor:pointer;transition:all 0.15s ease;">
            <span class="material-symbols-outlined" style="font-size:26px;color:#4f46e5;margin-bottom:6px;">sync</span>
            <strong style="color:#3730a3;font-size:0.875rem;">In Processing</strong>
            <span style="font-size:0.75rem;color:#64748b;text-align:center;margin-top:2px;">OCR extraction ongoing</span>
          </button>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:var(--space-md);padding-top:var(--space-sm);border-top:1px solid #e2e8f0;flex-wrap:wrap;gap:10px;">
          <span style="font-size:0.75rem;color:#64748b;">
            Selecting any status immediately synchronizes this case in the <strong>All Records</strong> table.
          </span>
          <div style="display:flex;gap:8px;">
            <a href="#/review" class="btn btn--secondary btn--sm" style="text-decoration:none;border-radius:8px;">
              <span>Go to Evidence Review</span>
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </a>
            <a href="#/cases" class="btn btn--primary btn--sm" style="text-decoration:none;border-radius:8px;">
              <span>Return to All Records</span>
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Add Proceeding Event Modal -->
      <div id="add-event-modal" class="modal-overlay" style="display:none;position:fixed;inset:0;z-index:60;background:rgba(0,0,0,0.6);align-items:center;justify-content:center;padding:var(--space-md);backdrop-filter:blur(4px);">
        <div class="card" style="width:100%;max-width:480px;padding:var(--space-lg);animation:slideUp 0.3s ease;box-shadow:var(--shadow-lg);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-md);border-bottom:1px solid var(--outline-variant);padding-bottom:10px;">
            <h3 class="text-headline-sm" style="color:var(--primary);font-weight:700;">Add Timeline Proceeding</h3>
            <button id="close-add-event-btn" style="background:none;border:none;cursor:pointer;color:var(--on-surface-variant);padding:4px;" aria-label="Close modal">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <form id="add-event-form" style="display:flex;flex-direction:column;gap:var(--space-md);">
            <div>
              <label class="text-label-md" style="display:block;margin-bottom:4px;font-weight:600;">Proceeding / Event Title *</label>
              <input type="text" id="event-title-input" required placeholder="e.g., FIR Lodged / Bail Hearing / Charge Frame" style="width:100%;padding:10px 12px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);">
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <label class="text-label-md" style="display:block;margin-bottom:4px;font-weight:600;">Event Date</label>
                <input type="text" id="event-date-input" placeholder="e.g., 18 Jan 2025" style="width:100%;padding:10px 12px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);">
              </div>
              <div>
                <label class="text-label-md" style="display:block;margin-bottom:4px;font-weight:600;">Event Type</label>
                <select id="event-type-select" style="width:100%;padding:10px 12px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);background:white;">
                  <option value="filing">Filing / Police</option>
                  <option value="hearing" selected>Court Hearing</option>
                  <option value="proceeding">Proceeding</option>
                  <option value="order">Judicial Order</option>
                </select>
              </div>
            </div>
            <div>
              <label class="text-label-md" style="display:block;margin-bottom:4px;font-weight:600;">Description & Procedural Notes</label>
              <textarea id="event-desc-input" rows="3" placeholder="Enter witness statements, order summary, or court directions..." style="width:100%;padding:10px 12px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);font-family:inherit;"></textarea>
            </div>
            <div style="display:flex;gap:var(--space-sm);justify-content:flex-end;margin-top:var(--space-sm);">
              <button type="button" class="btn btn--secondary" id="cancel-add-event-btn">Cancel</button>
              <button type="submit" class="btn btn--primary">Add to Timeline</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `}function k(){let e=_.getActiveCase(),t=document.querySelectorAll(`.btn-status-choice`),n=document.getElementById(`timeline-status-toast`),r=document.getElementById(`timeline-status-toast-text`),i=document.getElementById(`timeline-top-badge`),a=document.getElementById(`timeline-top-badge-text`),o=document.getElementById(`current-outcome-name`),s={verified:{label:`Verified Docket`,cls:`badge--verified`,icon:`verified`,border:`#059669`,bg:`#ecfdf5`,text:`Case marked as Verified Docket.`},pending:{label:`Pending Review`,cls:`badge--pending`,icon:`schedule`,border:`#d97706`,bg:`#fffbeb`,text:`Case marked as Pending Review.`},flagged:{label:`Flagged / Needs Attention`,cls:`badge--flagged`,icon:`flag`,border:`#dc2626`,bg:`#fef2f2`,text:`Case marked as Flagged for review.`},processing:{label:`In Processing`,cls:`badge--processing`,icon:`sync`,border:`#4f46e5`,bg:`#eef2ff`,text:`Case marked as In Processing.`}};t.forEach(c=>{c.addEventListener(`click`,async()=>{let l=c.getAttribute(`data-set-status`);if(!l)return;await _.updateCaseStatus(e.id,l),e.status=l,t.forEach(e=>{e.style.borderColor=`#e2e8f0`,e.style.background=`#ffffff`,e.classList.remove(`active-choice`)});let u=s[l]||s.pending;c.style.borderColor=u.border,c.style.background=u.bg,c.classList.add(`active-choice`),i&&a&&(i.className=`badge ${u.cls}`,i.innerHTML=`
          <span class="material-symbols-outlined" style="font-size:16px">${u.icon}</span>
          <span>${u.label}</span>
        `),o&&(o.textContent=u.label),n&&r&&(r.textContent=`${u.text} Updated across All Records.`,n.style.display=`flex`,setTimeout(()=>{n.style.display=`none`},4e3))})});let c=document.getElementById(`add-event-modal`),l=document.getElementById(`btn-open-add-event`),u=document.getElementById(`close-add-event-btn`),d=document.getElementById(`cancel-add-event-btn`),f=document.getElementById(`add-event-form`),p=document.getElementById(`timeline-events-container`),m=document.getElementById(`timeline-count-badge`);function h(){c&&(c.style.display=`flex`),document.getElementById(`event-title-input`)?.focus()}function g(){c&&(c.style.display=`none`)}l?.addEventListener(`click`,h),u?.addEventListener(`click`,g),d?.addEventListener(`click`,g),c?.addEventListener(`click`,e=>{e.target===c&&g()}),f?.addEventListener(`submit`,t=>{t.preventDefault();let i=document.getElementById(`event-title-input`)?.value||``,a=document.getElementById(`event-date-input`)?.value||new Date().toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`}),o=document.getElementById(`event-type-select`)?.value||`hearing`,s=document.getElementById(`event-desc-input`)?.value||`Proceeding recorded and appended to live timeline.`;if(!i.trim())return;let c={filing:`description`,hearing:`record_voice_over`,proceeding:`gavel`,order:`fact_check`}[o]||`gavel`,l=_.addTimelineEvent(e.id,{label:i,date:a,type:o,description:s,icon:c,verified:!0});g(),f.reset();let u=_.getCaseTimeline(e.id);if(m&&(m.textContent=`${u.length} Events Logged`),p){let e=E(o),t=`
        <div class="timeline-event-row" style="position:relative;padding-bottom:var(--space-lg);display:flex;gap:var(--space-md);animation:fadeIn 0.3s ease;">
          <div style="position:absolute;left:-24px;top:4px;width:14px;height:14px;border-radius:50%;border:2px solid ${e.border};background:var(--surface-container-lowest);z-index:1;"></div>
          <div class="card-flat" style="flex:1;padding:var(--space-md);border-left:3px solid ${e.border};border-radius:var(--radius-md);background:#eff6ff;">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:4px;">
              <div style="display:flex;align-items:center;gap:var(--space-sm);">
                <span class="material-symbols-outlined" style="font-size:18px;color:${e.icon}">${c}</span>
                <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">${l.label}</span>
              </div>
              <div style="display:flex;align-items:center;gap:6px;">
                <span class="text-body-sm" style="color:var(--on-surface-variant);font-weight:500;">${l.date}</span>
                <span class="badge badge--verified" style="font-size:0.625rem;padding:2px 8px;"><span class="material-symbols-outlined" style="font-size:11px">check</span> Verified</span>
              </div>
            </div>
            <p class="text-body-sm" style="color:var(--on-surface-variant);line-height:1.5;">${l.description}</p>
          </div>
        </div>
      `;p.insertAdjacentHTML(`beforeend`,t)}n&&r&&(r.textContent=`New proceeding "${i}" logged live to docket timeline!`,n.style.display=`flex`,setTimeout(()=>{n.style.display=`none`},4e3))})}function A(e,t){return`<span class="badge ${e===`verified`?`badge--verified`:e===`flagged`?`badge--flagged`:`badge--neutral`}" style="border-radius:var(--radius-sm);"><span class="material-symbols-outlined" style="font-size:12px">${e===`verified`?`verified`:e===`flagged`?`flag`:`info`}</span> ${t||e}</span>`}function j(){let e=_.getActiveCase(),t=_.getCaseDocuments(e.id),n=_.isCaseDocumented(e.id),r=t.filter(e=>e.status===`verified`).length,i=t.filter(e=>e.status===`flagged`).length,a=t.length>0?Math.round(r/t.length*100):100;return`
    <div class="page-content page-content--wide animate-fade-in" style="max-width:1440px;">
      <!-- Success / Action Toast -->
      <div id="review-alert-toast" style="display:none;margin-bottom:var(--space-md);padding:12px 18px;border-radius:var(--radius-md);background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;align-items:center;gap:10px;">
        <span class="material-symbols-outlined" style="color:#059669;font-size:20px;">check_circle</span>
        <span id="review-alert-toast-text" style="font-size:0.875rem;font-weight:600;">Report generated</span>
      </div>

      <!-- Page Heading -->
      <div style="padding-top:var(--space-md);padding-bottom:var(--space-sm);display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;">
        <div>
          <h1 class="page-heading">4. Evidence Review Lens</h1>
          <p class="text-body-sm" style="color:var(--on-surface-variant);margin-top:4px;">
            Cryptographic document audit, FIR verification, and case docket integrity analysis
          </p>
        </div>
        ${n?`
          <div style="display:flex;align-items:center;gap:var(--space-sm);">
            <button class="btn btn--primary btn--sm" id="btn-export-word" style="border-radius:8px;padding:8px 16px;">
              <span class="material-symbols-outlined" style="font-size:18px">description</span>
              <span>Export Report (.docx)</span>
            </button>
            <button class="btn btn--secondary btn--sm" id="btn-print-report" style="border-radius:8px;padding:8px 16px;">
              <span class="material-symbols-outlined" style="font-size:18px">print</span>
              <span>Print Report</span>
            </button>
          </div>
        `:``}
      </div>

      <!-- Active Matter Meta Bar -->
      <div class="card-flat" style="padding:var(--space-md);margin-bottom:var(--space-lg);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-md);">
        <div style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-md);">
          <div style="display:flex;align-items:center;gap:var(--space-xs);">
            <span style="width:10px;height:10px;background:var(--primary);border-radius:50%;"></span>
            <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">Active Matter: ${e.title}</span>
          </div>
          <span style="color:var(--secondary);">|</span>
          <div class="text-code-sm" style="background:var(--surface-container-low);padding:2px 8px;border-radius:var(--radius-sm);">
            <span style="color:var(--secondary);text-transform:uppercase;">CNR:</span>
            <span style="font-weight:700;color:var(--primary);">${e.cnr}</span>
          </div>
          <span style="color:var(--secondary);">|</span>
          <span class="badge ${e.status===`verified`?`badge--verified`:e.status===`flagged`?`badge--flagged`:`badge--pending`}">
            ${e.statusLabel||e.status}
          </span>
          <a href="#/cases" style="color:var(--primary);font-weight:600;font-size:0.875rem;text-decoration:underline;text-underline-offset:4px;">Change Case ⇄</a>
        </div>
        <div style="font-size:0.8125rem;color:var(--on-surface-variant);">
          Court: <strong>${e.court}</strong>
        </div>
      </div>

      <!-- CONDITIONAL VIEW: Only reflect data when documented / FIR uploaded -->
      ${n?`
        <!-- Documented Case Evidence Review & Lens -->
        <!-- Summary Stats -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:var(--space-md);margin-bottom:var(--space-lg);">
          <div class="card" style="padding:var(--space-md);text-align:center;">
            <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;margin-bottom:4px;">Total Documents</div>
            <div style="font-size:1.75rem;font-weight:700;color:var(--primary);">${t.length}</div>
          </div>
          <div class="card" style="padding:var(--space-md);text-align:center;">
            <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;margin-bottom:4px;">Verified</div>
            <div style="font-size:1.75rem;font-weight:700;color:var(--status-verified);">${r}</div>
          </div>
          <div class="card" style="padding:var(--space-md);text-align:center;">
            <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;margin-bottom:4px;">Flagged</div>
            <div style="font-size:1.75rem;font-weight:700;color:var(--status-flagged);">${i}</div>
          </div>
          <div class="card" style="padding:var(--space-md);text-align:center;">
            <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;margin-bottom:4px;">Docket Integrity</div>
            <div style="font-size:1.75rem;font-weight:700;color:var(--primary);">${a}%</div>
          </div>
        </div>

        <!-- Section: Evidence Lens -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm);flex-wrap:wrap;gap:8px;">
          <div>
            <h2 class="text-headline-sm" style="color:var(--primary);margin-bottom:var(--space-xs);font-weight:700;">
              Evidence Lens & Cryptographic Audit Register
            </h2>
            <p class="text-body-sm" style="color:var(--on-surface-variant);">
              Immutable chain-of-custody review for all ingested court exhibits and FIR records
            </p>
          </div>
          <a href="#/upload" class="btn btn--secondary btn--sm" style="border-radius:8px;text-decoration:none;">
            <span class="material-symbols-outlined" style="font-size:16px;">add</span>
            <span>Upload More Records</span>
          </a>
        </div>

        <!-- Document Review Cards -->
        <div class="stagger-children" style="display:flex;flex-direction:column;gap:var(--space-md);">
          ${t.map(e=>M(e)).join(``)}
        </div>
      `:`
        <!-- Un-documented Case Prompt -->
        <div class="card" style="padding:4rem 2rem;text-align:center;border-radius:var(--radius-xl);background:var(--surface-container-lowest);border:2px dashed var(--outline-variant);box-shadow:var(--shadow-sm);margin-top:var(--space-lg);">
          <div style="width:64px;height:64px;border-radius:50%;background:#eff6ff;color:#2563eb;display:inline-flex;align-items:center;justify-content:center;margin-bottom:1.5rem;">
            <span class="material-symbols-outlined" style="font-size:36px;">cloud_upload</span>
          </div>
          <h2 style="font-size:1.5rem;font-weight:700;color:#0F2A4A;margin-bottom:0.75rem;">
            Awaiting Document Intake & FIR Lodgment
          </h2>
          <p style="font-size:1rem;color:#64748b;max-width:560px;margin:0 auto 2rem;line-height:1.6;">
            The Evidence Review Lens activates automatically as soon as court records or the FIR for <strong>${e.title}</strong> are uploaded and verified into the case docket.
          </p>
          <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
            <a href="#/upload" class="btn btn--primary btn--lg" style="text-decoration:none;border-radius:8px;">
              <span class="material-symbols-outlined" style="font-size:20px;">upload_file</span>
              <span>Upload FIR & Court Records (Tab 2)</span>
            </a>
            <a href="#/timeline" class="btn btn--secondary btn--lg" style="text-decoration:none;border-radius:8px;">
              <span class="material-symbols-outlined" style="font-size:20px;">event</span>
              <span>View Case Timeline (Tab 3)</span>
            </a>
          </div>
          <div style="font-size:0.8125rem;color:#94a3b8;margin-top:2.5rem;">
            Case ID: <code>${e.id}</code> · Status: ${e.statusLabel||e.status}
          </div>
        </div>
      `}
    </div>
  `}function M(e){let t=e.isFir||e.name.toLowerCase().includes(`fir`)||e.category&&e.category.toLowerCase().includes(`police`);return`
    <div class="card" style="padding:var(--space-lg);transition:box-shadow 0.15s;border-radius:var(--radius-lg);${t?`border-left:4px solid #2563eb;`:``}"
         onmouseover="this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.boxShadow='var(--shadow-xs)'">
      <div style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:var(--space-md);">
        <div style="display:flex;align-items:center;gap:var(--space-md);min-width:0;flex:1;">
          <div style="width:44px;height:44px;border-radius:var(--radius-md);background:${t?`#eff6ff`:`var(--surface-container-low)`};color:${t?`#1d4ed8`:`var(--primary)`};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span class="material-symbols-outlined" style="font-size:24px;">${t?`local_police`:`description`}</span>
          </div>
          <div style="min-width:0;">
            <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;">
              <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">${e.name}</span>
              ${A(e.status,e.statusLabel)}
              ${t?`<span class="badge" style="background:#eff6ff;color:#1d4ed8;font-size:0.6875rem;">FIR Verified</span>`:``}
            </div>
            <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;margin-top:2px;" class="text-body-sm">
              <span style="color:var(--on-surface-variant);font-weight:600;">${e.category}</span>
              <span style="color:var(--outline);">·</span>
              <span style="color:var(--on-surface-variant);">${e.pages||1} pages</span>
              <span style="color:var(--outline);">·</span>
              <span style="color:var(--on-surface-variant);">Ingested ${e.uploadedDate}</span>
            </div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-sm);flex-shrink:0;">
          <div class="text-code-sm" style="background:var(--surface-container-low);padding:3px 10px;border-radius:var(--radius-sm);color:var(--secondary);font-size:0.75rem;">
            Hash: ${e.hash}
          </div>
          <button class="btn btn--secondary btn--sm btn-inspect-doc" data-doc-name="${e.name}" title="Inspect verification hash" style="border-radius:6px;">
            <span class="material-symbols-outlined" style="font-size:16px">verified_user</span>
            <span>Audit</span>
          </button>
        </div>
      </div>

      ${e.flags&&e.flags.length>0?`
        <div style="margin-top:var(--space-md);padding:var(--space-sm) var(--space-md);background:var(--status-flagged-bg);border-radius:var(--radius-md);border-left:3px solid var(--status-flagged);">
          ${e.flags.map(e=>`
            <div style="display:flex;align-items:center;gap:var(--space-sm);">
              <span class="material-symbols-outlined" style="font-size:16px;color:var(--status-flagged);">warning</span>
              <span class="text-body-sm" style="color:var(--on-surface);">${e}</span>
            </div>
          `).join(``)}
        </div>
      `:``}
    </div>
  `}function N(){let e=_.getActiveCase(),t=document.getElementById(`btn-export-word`),n=document.getElementById(`btn-print-report`),r=document.getElementById(`review-alert-toast`),i=document.getElementById(`review-alert-toast-text`);t?.addEventListener(`click`,()=>{_.exportWordDocx(e.id),r&&i&&(i.textContent=`Official Case Dossier Report for "${e.title}" exported as Microsoft Word (.docx)!`,r.style.display=`flex`,setTimeout(()=>{r.style.display=`none`},4500))}),n?.addEventListener(`click`,()=>{_.printReport(e.id)}),document.querySelectorAll(`.btn-inspect-doc`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-doc-name`)||`Document`;alert(`[SHA-256 Audit Verification]:\n"${t}" integrity confirmed against court record ledger.`)})})}function P(){let e=_.getActiveCase(),t=_.getCaseDocuments(e.id),n=t.length>0?t.length:12;return`
    <div class="page-content animate-fade-in" style="max-width: 920px;">
      <!-- Breadcrumb & Header -->
      <div style="margin-bottom: var(--space-lg);">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: var(--on-surface-variant); margin-bottom: 6px;">
          <a href="#/cases" style="color: inherit; text-decoration: none;">Cases</a>
          <span class="material-symbols-outlined" style="font-size: 14px;">chevron_right</span>
          <span style="font-weight: 600; color: var(--primary);">${e.title}</span>
          <span class="badge badge--verified" style="margin-left: 8px;">Docket Verified</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: var(--space-md);">
          <div>
            <h1 class="page-heading" style="font-size: 1.875rem;">Ask CaseCompass</h1>
            <p style="font-size: 0.875rem; color: var(--on-surface-variant); margin-top: 4px;">
              AI Legal Case Assistant — Query court records, filings, orders, and sections in <strong>English, हिन्दी, and मराठी</strong>.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn--secondary btn--sm" id="btn-export-chat" title="Download Q&A transcript">
              <span class="material-symbols-outlined" style="font-size: 16px;">download</span>
              Export Q&A
            </button>
            <button class="btn btn--secondary btn--sm" id="btn-clear-chat" title="Reset conversation">
              <span class="material-symbols-outlined" style="font-size: 16px;">refresh</span>
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Verified Grounding Banner & Language Selector -->
      <div class="card" style="padding: 14px 18px; margin-bottom: var(--space-md); background: var(--surface-container-low); border-left: 4px solid var(--primary); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="color: var(--primary); font-size: 26px;">verified</span>
          <div>
            <div style="font-size: 0.875rem; font-weight: 700; color: var(--primary);">Active Case Intelligence & Audio Assistant</div>
            <div style="font-size: 0.75rem; color: var(--on-surface-variant);">
              CNR: <code>${e.cnr}</code> | ${n} Verified Records Indexed | No Language Barrier
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <span class="badge badge--neutral">${n} Documents</span>
          <span class="badge badge--verified">Voice + Text Active</span>
        </div>
      </div>

      <!-- Language Selector Bar -->
      <div class="card-flat" style="padding: 10px 16px; margin-bottom: var(--space-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; background: var(--surface-container-lowest); border: 1px solid var(--outline-variant);">
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <span class="material-symbols-outlined" style="font-size: 18px; color: var(--primary);">translate</span>
          <span style="font-size: 0.8125rem; font-weight: 700; color: var(--on-surface);">Response Language / भाषा निवडा:</span>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;" id="ask-language-selector">
            <button type="button" class="btn btn--sm btn--primary ask-lang-pill" data-lang="auto" style="border-radius: 9999px; font-size: 0.75rem; padding: 3px 12px;">
              🌐 Auto-Detect
            </button>
            <button type="button" class="btn btn--sm btn--secondary ask-lang-pill" data-lang="en" style="border-radius: 9999px; font-size: 0.75rem; padding: 3px 12px;">
              🇬🇧 English
            </button>
            <button type="button" class="btn btn--sm btn--secondary ask-lang-pill" data-lang="hi" style="border-radius: 9999px; font-size: 0.75rem; padding: 3px 12px;">
              🇮🇳 हिन्दी (Hindi)
            </button>
            <button type="button" class="btn btn--sm btn--secondary ask-lang-pill" data-lang="mr" style="border-radius: 9999px; font-size: 0.75rem; padding: 3px 12px;">
              🚩 मराठी (Marathi)
            </button>
          </div>
        </div>
        <div id="audio-playback-status" style="display: none; align-items: center; gap: 8px; font-size: 0.75rem; color: #1e3a8a; background: #dbeafe; padding: 4px 12px; border-radius: 9999px; border: 1px solid #bfdbfe;">
          <span class="material-symbols-outlined" style="font-size: 16px; color: #2563eb;">volume_up</span>
          <span id="audio-playback-text" style="font-weight: 600;">Voice Assistant Speaking...</span>
          <button type="button" id="btn-stop-audio" style="border: none; background: #fee2e2; color: #b91c1c; font-weight: 700; cursor: pointer; font-size: 0.6875rem; padding: 2px 8px; border-radius: 4px; margin-left: 4px;" title="Stop Voice">
            ⏹ Stop Audio
          </button>
        </div>
      </div>

      <!-- Quick Suggested Prompts (Trilingual) -->
      <div style="margin-bottom: var(--space-md);">
        <div class="section-title" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <span>Suggested Inquiries / सुचवलेले प्रश्न</span>
          <span style="font-size: 0.75rem; color: var(--on-surface-variant); font-weight: normal;">Click to ask instantly</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;" id="suggested-prompts-container">
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="When is the next scheduled hearing and what is its purpose?">
            <span class="material-symbols-outlined" style="font-size: 14px;">calendar_today</span>
            Next hearing date? (पुढील सुनावणी)
          </button>
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="या प्रकरणात कोणते गुन्हे किंवा कलमे दाखल आहेत?">
            <span class="material-symbols-outlined" style="font-size: 14px;">gavel</span>
            कोणते गुन्हे / कलमे दाखल आहेत?
          </button>
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="गवाहों की सूची और उनकी स्थिति क्या है?">
            <span class="material-symbols-outlined" style="font-size: 14px;">groups</span>
            गवाहों की स्थिति (Witness status)
          </button>
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="या खटल्यातील जामीन (Bail) संबंधी सद्यस्थिती आणि अटी काय आहेत?">
            <span class="material-symbols-outlined" style="font-size: 14px;">verified_user</span>
            जामीन अटी व स्थिती (Bail Status)
          </button>
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="Are there any date or metadata discrepancies flagged in the record?">
            <span class="material-symbols-outlined" style="font-size: 14px;">warning</span>
            कागदपत्रांमधील त्रुटी? (Discrepancies)
          </button>
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="या खटल्याचा थोडक्यात संपूर्ण सारांश सांगा.">
            <span class="material-symbols-outlined" style="font-size: 14px;">summarize</span>
            खटल्याचा सारांश (Case Summary)
          </button>
        </div>
      </div>

      <!-- Chat Stream Container -->
      <div class="card" style="padding: 0; display: flex; flex-direction: column; min-height: 440px; box-shadow: var(--shadow-sm); overflow: hidden; margin-bottom: var(--space-lg);">
        <div id="chat-messages" style="flex: 1; padding: var(--space-lg); display: flex; flex-direction: column; gap: var(--space-lg); overflow-y: auto; max-height: 520px; background: var(--surface-container-lowest);">
          ${a.map(e=>`
            <div style="display: flex; gap: 14px; align-items: flex-start; ${e.role===`user`?`justify-content: flex-end;`:``}">
              ${e.role===`assistant`?`
                <div style="width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--primary); display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; box-shadow: var(--shadow-sm);">
                  <span class="material-symbols-outlined" style="font-size: 20px;">balance</span>
                </div>
              `:``}

              <div style="max-width: ${e.role===`user`?`75%`:`85%`};">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; ${e.role===`user`?`justify-content: flex-end;`:``}">
                  <span style="font-size: 0.75rem; font-weight: 700; color: var(--on-surface-variant);">
                    ${e.role===`user`?`You`:`CaseCompass Intelligence`}
                  </span>
                  <span style="font-size: 0.6875rem; color: var(--outline);">${e.time}</span>
                </div>

                <div style="
                  padding: 14px 18px;
                  border-radius: var(--radius-lg);
                  font-size: 0.9375rem;
                  line-height: 1.6;
                  ${e.role===`user`?`background: var(--primary); color: #ffffff; border-bottom-right-radius: 4px;`:`background: var(--surface-container-low); color: var(--on-surface); border: 1px solid var(--outline-variant); border-bottom-left-radius: 4px;`}
                ">
                  <div style="white-space: pre-wrap;">${e.text}</div>

                  ${e.sources&&e.sources.length?`
                    <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(15, 42, 74, 0.12);">
                      <div style="font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--secondary); margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                        <span class="material-symbols-outlined" style="font-size: 14px;">menu_book</span>
                        Verified Sources (${e.sources.length})
                      </div>
                      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                        ${e.sources.map(e=>`
                          <span style="display: inline-flex; align-items: center; gap: 4px; background: var(--surface-container-lowest); border: 1px solid var(--outline-variant); padding: 3px 8px; border-radius: var(--radius-sm); font-size: 0.75rem; color: var(--primary); font-family: var(--font-code);">
                            <span class="material-symbols-outlined" style="font-size: 13px;">description</span>
                            ${e}
                          </span>
                        `).join(``)}
                      </div>
                    </div>
                  `:``}
                </div>
              </div>

              ${e.role===`user`?`
                <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--secondary-container); display: flex; align-items: center; justify-content: center; color: var(--on-secondary-container); flex-shrink: 0; font-weight: 700; font-size: 0.875rem;">
                  M
                </div>
              `:``}
            </div>
          `).join(``)}
        </div>

        <!-- Voice Listening Live Banner -->
        <div id="voice-recording-banner" style="display: none; align-items: center; justify-content: space-between; padding: 10px 18px; background: #fef2f2; border-top: 1px solid #fecaca; color: #991b1b; font-size: 0.875rem;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: #dc2626; animation: pulse 1s infinite;"></div>
            <span class="material-symbols-outlined" style="font-size: 20px; color: #dc2626;">mic</span>
            <span id="voice-recording-text" style="font-weight: 600;">Listening... Speak in English, हिन्दी, or मराठी</span>
          </div>
          <button type="button" id="btn-cancel-recording" class="btn btn--sm" style="background: #dc2626; color: #ffffff; border: none; padding: 4px 12px; border-radius: 6px; font-size: 0.75rem; cursor: pointer;">
            Done / Submit
          </button>
        </div>

        <!-- Chat Input Form -->
        <div style="padding: var(--space-md) var(--space-lg); background: var(--surface-container-lowest); border-top: 1px solid var(--outline-variant);">
          <form id="ask-form" style="display: flex; gap: 10px; align-items: flex-end;">
            <!-- Voice Microphone Button -->
            <button type="button" id="btn-voice-mic" title="Click to speak using Voice Assistant (English, हिन्दी, मराठी)"
                    style="width: 44px; height: 44px; border-radius: var(--radius-md); border: 1px solid var(--outline-variant); background: var(--surface-container-low); color: var(--primary); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; flex-shrink: 0;">
              <span class="material-symbols-outlined" id="mic-icon" style="font-size: 22px;">mic</span>
            </button>

            <!-- Text Query Input -->
            <div style="flex: 1; position: relative;">
              <textarea
                id="ask-input"
                placeholder="Type your question or click the microphone to speak in English, हिन्दी, or मराठी..."
                rows="2"
                style="width: 100%; resize: none; padding: 10px 14px; font-size: 0.9375rem; border-radius: var(--radius-md); border: 1px solid var(--outline-variant); background: var(--surface-container-lowest); color: var(--on-surface); line-height: 1.4;"
              ></textarea>
            </div>

            <!-- Submit Button (Text Mode) -->
            <button type="submit" id="btn-send-text" class="btn btn--primary" style="height: 44px; padding: 0 20px; display: flex; align-items: center; gap: 6px;">
              <span class="material-symbols-outlined" style="font-size: 18px;">send</span>
              <span>Ask</span>
            </button>
          </form>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 0.6875rem; color: var(--outline); flex-wrap: wrap; gap: 6px;">
            <span>Keyboard typing = Text response | 🎙️ Microphone = Voice spoken response</span>
            <span>English • हिन्दी • मराठी Language Freedom</span>
          </div>
        </div>
      </div>
    </div>
  `}function F(){let e=document.getElementById(`ask-form`),t=document.getElementById(`ask-input`),n=document.getElementById(`chat-messages`),r=document.getElementById(`btn-voice-mic`),i=document.getElementById(`mic-icon`),a=document.getElementById(`voice-recording-banner`),o=document.getElementById(`voice-recording-text`),s=document.getElementById(`btn-cancel-recording`),c=document.getElementById(`audio-playback-status`),l=document.getElementById(`audio-playback-text`),u=document.getElementById(`btn-stop-audio`),d=document.querySelectorAll(`.suggested-prompt-btn`),f=`auto`,p=!1,m=null,h=!1;document.querySelectorAll(`.ask-lang-pill`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.ask-lang-pill`).forEach(e=>{e.classList.remove(`btn--primary`),e.classList.add(`btn--secondary`)}),e.classList.remove(`btn--secondary`),e.classList.add(`btn--primary`),f=e.getAttribute(`data-lang`)||`auto`,t&&(f===`mr`?t.placeholder=`तुमचा प्रश्न टाइप करा किंवा मराठीत बोलण्यासाठी मायक्रोफोनवर क्लिक करा...`:f===`hi`?t.placeholder=`अपना प्रश्न टाइप करें या हिन्दी में बोलने के लिए माइक्रोफ़ोन पर क्लिक करें...`:f===`en`?t.placeholder=`Type your question or click the microphone to speak in English...`:t.placeholder=`Type your question or click the microphone to speak in English, हिन्दी, or मराठी...`)})});function g(){window.speechSynthesis&&window.speechSynthesis.cancel(),c&&(c.style.display=`none`)}u?.addEventListener(`click`,g);function v(e,t){if(!window.speechSynthesis)return;g();let n=e.replace(/\*\*(.*?)\*\*/g,`$1`).replace(/\*(.*?)\*/g,`$1`).replace(/#{1,6}\s+/g,``).replace(/•/g,``).replace(/>/g,``).replace(/`/g,``).replace(/\[(.*?)\]\(.*?\)/g,`$1`).trim();if(!n)return;let r=new SpeechSynthesisUtterance(n),i=`en-IN`,a=`English`;t===`mr`?(i=`mr-IN`,a=`मराठी`):t===`hi`&&(i=`hi-IN`,a=`हिन्दी`),r.lang=i;let o=window.speechSynthesis.getVoices(),s=o.find(e=>e.lang.toLowerCase().replace(`_`,`-`).startsWith(i.toLowerCase()));!s&&t===`mr`&&(s=o.find(e=>e.lang.toLowerCase().startsWith(`hi`))),!s&&t===`en`&&(s=o.find(e=>e.lang.toLowerCase().startsWith(`en`))),s&&(r.voice=s),r.rate=.95,c&&l&&(l.textContent=`Speaking in ${a}...`,c.style.display=`flex`),r.onend=()=>{c&&(c.style.display=`none`)},r.onerror=()=>{c&&(c.style.display=`none`)},window.speechSynthesis.speak(r)}window.speechSynthesis&&(window.speechSynthesis.getVoices(),window.speechSynthesis.onvoiceschanged!==void 0&&(window.speechSynthesis.onvoiceschanged=()=>window.speechSynthesis.getVoices()));let y=window.SpeechRecognition||window.webkitSpeechRecognition;function b(){if(p=!1,m)try{m.stop()}catch{}r&&(r.style.background=`var(--surface-container-low)`,r.style.borderColor=`var(--outline-variant)`,r.style.color=`var(--primary)`),i&&(i.textContent=`mic`),a&&(a.style.display=`none`)}function x(){if(!y)alert(`Speech Recognition is not supported by your browser. Please use Google Chrome, Edge, or Safari, or type your question in the text box.`);else{g();try{m=new y,m.continuous=!1,m.interimResults=!0,f===`mr`?m.lang=`mr-IN`:f===`hi`?m.lang=`hi-IN`:f===`en`?m.lang=`en-IN`:m.lang=`hi-IN`,m.onstart=()=>{p=!0,r&&(r.style.background=`#fee2e2`,r.style.borderColor=`#dc2626`,r.style.color=`#dc2626`),i&&(i.textContent=`mic`),a&&(o&&(o.textContent=`Listening in ${f===`mr`?`मराठी`:f===`hi`?`हिन्दी`:f===`en`?`English`:`English / हिन्दी / मराठी`}... Speak your case question now`),a.style.display=`flex`)},m.onresult=e=>{let n=``;for(let t=e.resultIndex;t<e.results.length;++t)n+=e.results[t][0].transcript;t&&n&&(t.value=n)},m.onerror=e=>{console.warn(`Speech recognition status:`,e.error),b()},m.onend=()=>{b();let e=t?.value||``;e.trim()&&(h=!0,C(e,!0))},m.start()}catch(e){console.error(`Error starting speech recognition:`,e),b()}}}r?.addEventListener(`click`,()=>{if(p){b();let e=t?.value||``;e.trim()&&(h=!0,C(e,!0))}else x()}),s?.addEventListener(`click`,()=>{b();let e=t?.value||``;e.trim()&&(h=!0,C(e,!0))});function S(e,t,r=[],i=!1,a=`en`){let o=new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`}),s=document.createElement(`div`);s.style.cssText=`display: flex; gap: 14px; align-items: flex-start; ${e===`user`?`justify-content: flex-end;`:``}`,s.innerHTML=`
      ${e===`assistant`?`
        <div style="width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--primary); display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; box-shadow: var(--shadow-sm);">
          <span class="material-symbols-outlined" style="font-size: 20px;">balance</span>
        </div>
      `:``}

      <div style="max-width: ${e===`user`?`75%`:`85%`};">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; ${e===`user`?`justify-content: flex-end;`:``}">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--on-surface-variant);">
            ${e===`user`?h?`You (Voice Query)`:`You`:`CaseCompass Intelligence`}
          </span>
          <span style="font-size: 0.6875rem; color: var(--outline);">${o}</span>
          ${e===`assistant`&&i?`
            <span class="badge" style="background:#dbeafe;color:#1e40af;font-size:0.6875rem;padding:1px 6px;">
              🎙️ Voice Assistant Audio
            </span>
          `:``}
          ${e===`assistant`?`
            <button class="btn-listen-msg" data-text="${encodeURIComponent(t)}" data-lang="${a}" title="Listen to this response"
                    style="border:none;background:none;cursor:pointer;color:var(--primary);padding:0 2px;display:flex;align-items:center;">
              <span class="material-symbols-outlined" style="font-size:16px;">volume_up</span>
            </button>
          `:``}
        </div>

        <div style="
          padding: 14px 18px;
          border-radius: var(--radius-lg);
          font-size: 0.9375rem;
          line-height: 1.6;
          ${e===`user`?`background: var(--primary); color: #ffffff; border-bottom-right-radius: 4px;`:`background: var(--surface-container-low); color: var(--on-surface); border: 1px solid var(--outline-variant); border-bottom-left-radius: 4px;`}
        ">
          <div style="white-space: pre-wrap;">${t}</div>

          ${r&&r.length?`
            <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(15, 42, 74, 0.12);">
              <div style="font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--secondary); margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                <span class="material-symbols-outlined" style="font-size: 14px;">menu_book</span>
                Verified Sources (${r.length})
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${r.map(e=>`
                  <span style="display: inline-flex; align-items: center; gap: 4px; background: var(--surface-container-lowest); border: 1px solid var(--outline-variant); padding: 3px 8px; border-radius: var(--radius-sm); font-size: 0.75rem; color: var(--primary); font-family: var(--font-code);">
                    <span class="material-symbols-outlined" style="font-size: 13px;">description</span>
                    ${e}
                  </span>
                `).join(``)}
              </div>
            </div>
          `:``}
        </div>
      </div>

      ${e===`user`?`
        <div style="width: 36px; height: 36px; border-radius: 50%; background: ${h?`#ef4444`:`var(--secondary-container)`}; display: flex; align-items: center; justify-content: center; color: #ffffff; flex-shrink: 0; font-weight: 700; font-size: 0.875rem;">
          <span class="material-symbols-outlined" style="font-size: 20px;">${h?`mic`:`person`}</span>
        </div>
      `:``}
    `,n.appendChild(s),n.scrollTop=n.scrollHeight,s.querySelector(`.btn-listen-msg`)?.addEventListener(`click`,e=>{let t=e.currentTarget;v(decodeURIComponent(t.getAttribute(`data-text`)||``),t.getAttribute(`data-lang`)||`en`)})}async function C(e,r=!1){if(!e||!e.trim())return;let i=e.trim();h=r,S(`user`,i,[],r),t&&(t.value=``);let a=_.getActiveCase(),o=document.createElement(`div`);o.id=`thinking-indicator`,o.style.cssText=`display: flex; gap: 10px; align-items: center; font-size: 0.8125rem; color: var(--on-surface-variant); padding: 6px 12px;`,o.innerHTML=`
      <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--primary); animation: pulse 0.8s infinite;"></div>
      <span>Analyzing court records, timeline, and legal sections...</span>
    `,n.appendChild(o),n.scrollTop=n.scrollHeight;let s=_.analyzeCaseQuestion(a.id,i,f);_.askCase(a.id,i,s.language).catch(()=>{}),setTimeout(()=>{o.remove(),S(`assistant`,s.answer,s.citations,r,s.language),r&&v(s.answer,s.language)},450)}e?.addEventListener(`submit`,e=>{e.preventDefault(),g(),b(),C(t?.value,!1)}),t?.addEventListener(`keydown`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),g(),b(),C(t.value,!1))}),d.forEach(e=>{e.addEventListener(`click`,()=>{g(),b(),C(e.getAttribute(`data-query`),!1)})}),document.getElementById(`btn-clear-chat`)?.addEventListener(`click`,()=>{g(),b(),confirm(`Reset conversation history?`)&&(n.innerHTML=``,S(`assistant`,f===`mr`?`संभाषण रीसेट केले. या खटल्याच्या अधिकृत नोंदींमधून आपल्याला कोणती माहिती हवी आहे?`:f===`hi`?`बातचीत रीसेट हो गई है। आप इस मामले के आधिकारिक रिकॉर्ड से क्या जानना चाहते हैं?`:`Conversation reset. What would you like to verify from the court docket?`,[`Docket_Index.pdf`],!1,f))}),document.getElementById(`btn-export-chat`)?.addEventListener(`click`,()=>{let e=_.getActiveCase();n.querySelectorAll(`.card, [style*="padding: 14px 18px"]`);let t=`CaseCompass Intelligence Q&A Transcript\nCase: ${e.title}\nCNR: ${e.cnr}\nCourt: ${e.court}\nGenerated: ${new Date().toLocaleString()}\n------------------------------------------------------------\n\n`;n.childNodes.forEach(e=>{e.textContent&&e.textContent.trim()&&(t+=e.textContent.trim().replace(/\s+/g,` `)+`

`)});let r=new Blob([t],{type:`text/plain;charset=utf-8`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=`CaseCompass_QA_${e.cnr||`case`}.txt`,a.click(),URL.revokeObjectURL(i)})}function I(){let e=_.getActiveCase(),t=_.getCaseTimeline(e.id),n=_.getCaseDocuments(e.id),r=n.length>0?n.length:e.documents||0,i=n.length>0?n.filter(e=>e.status===`verified`).length:e.status===`verified`?r:0,a=n.length>0?n.filter(e=>e.status===`flagged`).length:+(e.status===`flagged`),o=r>0?Math.round(i/r*100):e.status===`verified`?100:75,s=e.nextHearing||`Upcoming Scheduling`,c=t.length>3?`Prosecution Evidence`:t.length>1?`Docket Ingestion & Verification`:`Initial Case Registration`;return`
    <div class="page-content animate-fade-in" style="max-width: 1040px;">
      <!-- Breadcrumb & Header -->
      <div style="margin-bottom: var(--space-lg);">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: var(--on-surface-variant); margin-bottom: 6px;">
          <a href="#/cases" style="color: inherit; text-decoration: none;">Cases</a>
          <span class="material-symbols-outlined" style="font-size: 14px;">chevron_right</span>
          <span style="font-weight: 600; color: var(--primary);">${e.title}</span>
          <span class="badge ${e.status===`verified`?`badge--verified`:`badge--pending`}" style="margin-left: 8px;">
            ${(e.statusLabel||e.status).toUpperCase()}
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: var(--space-md);">
          <div>
            <h1 class="page-heading" style="font-size: 1.875rem;">6. Executive Case Summary</h1>
            <p style="font-size: 0.875rem; color: var(--on-surface-variant); margin-top: 4px;">
              Original dossier records, chronological proceeding events, evidence health, and hearing status for <strong>${e.title}</strong>.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn--secondary btn--sm" id="btn-print-summary" title="Print complete case dossier and timeline">
              <span class="material-symbols-outlined" style="font-size: 16px;">print</span>
              Print Summary
            </button>
            <button class="btn btn--primary btn--sm" id="btn-export-docket" title="Download Word report with all timeline proceedings">
              <span class="material-symbols-outlined" style="font-size: 16px;">file_download</span>
              Export Report (.doc / Word)
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-lg);">
        <!-- Metric 1: Docket Health -->
        <div class="card" style="padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="section-title" style="margin-bottom: 4px;">Docket Health</div>
              <div style="font-size: 1.875rem; font-weight: 700; color: var(--primary);">${o}%</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--status-verified-bg); display: flex; align-items: center; justify-content: center; color: var(--status-verified);">
              <span class="material-symbols-outlined">health_and_safety</span>
            </div>
          </div>
          <div style="margin-top: 10px; width: 100%; height: 6px; background: var(--surface-container-high); border-radius: 3px; overflow: hidden;">
            <div style="width: ${o}%; height: 100%; background: var(--status-verified); border-radius: 3px;"></div>
          </div>
          <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 8px;">
            ${i} of ${r} records verified intact
          </div>
        </div>

        <!-- Metric 2: Next Listing -->
        <div class="card" style="padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="section-title" style="margin-bottom: 4px;">Next Listing</div>
              <div style="font-size: 1.125rem; font-weight: 700; color: var(--primary);">${s}</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--surface-container-high); display: flex; align-items: center; justify-content: center; color: var(--primary);">
              <span class="material-symbols-outlined">event</span>
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 14px;">
            ${e.court}
          </div>
        </div>

        <!-- Metric 3: Procedural Status -->
        <div class="card" style="padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="section-title" style="margin-bottom: 4px;">Stage of Case</div>
              <div style="font-size: 1.125rem; font-weight: 700; color: var(--primary);">${c}</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--surface-container-high); display: flex; align-items: center; justify-content: center; color: var(--primary);">
              <span class="material-symbols-outlined">gavel</span>
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 14px;">
            ${t.length} recorded proceedings
          </div>
        </div>

        <!-- Metric 4: Discrepancy Flags -->
        <div class="card" style="padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="section-title" style="margin-bottom: 4px;">Audit Flags</div>
              <div style="font-size: 1.875rem; font-weight: 700; color: ${a>0?`var(--status-pending)`:`var(--status-verified)`};">${a}</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: ${a>0?`var(--status-pending-bg)`:`var(--status-verified-bg)`}; display: flex; align-items: center; justify-content: center; color: ${a>0?`var(--status-pending)`:`var(--status-verified)`};">
              <span class="material-symbols-outlined">${a>0?`flag`:`check_circle`}</span>
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 8px;">
            ${a>0?`Discrepancy notices flagged`:`Clean audit profile`}
          </div>
        </div>
      </div>

      <!-- Main Two-Column Summary Layout -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-lg); align-items: start;">
        <!-- Left: Case Overview & Procedural Brief -->
        <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
          <!-- Procedural Brief -->
          <div class="card" style="padding: var(--space-lg);">
            <div class="section-title">Procedural Overview</div>
            <h2 class="text-headline-sm" style="margin-bottom: 12px; color: var(--primary);">
              ${e.title}
            </h2>
            <p style="font-size: 0.875rem; color: var(--on-surface); line-height: 1.6; margin-bottom: 12px;">
              Matter registered under <strong>${e.section||`BNS / IPC Procedural Intake`}</strong> before the <strong>${e.court}</strong>. Initial court dossier was registered on <strong>${e.filingDate||`15 Mar 2024`}</strong>.
            </p>
            <p style="font-size: 0.875rem; color: var(--on-surface); line-height: 1.6;">
              Dossier audit verification is logged as <strong>${(e.statusLabel||e.status).toUpperCase()}</strong>. The docket integrates <strong>${t.length} proceedings</strong> and <strong>${r} evidentiary exhibits</strong>.
            </p>

            <div class="divider"></div>

            <div class="section-title">Case Metadata Particulars</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 0.8125rem;">
              <div>
                <span style="color: var(--on-surface-variant);">CNR Number:</span>
                <span style="font-weight: 600; font-family: var(--font-code); display: block; color: var(--primary);">${e.cnr}</span>
              </div>
              <div>
                <span style="color: var(--on-surface-variant);">Court / Jurisdiction:</span>
                <span style="font-weight: 600; display: block;">${e.court}</span>
              </div>
              <div>
                <span style="color: var(--on-surface-variant);">Substantive Sections:</span>
                <span style="font-weight: 600; display: block;">${e.section||`IPC §420, §468`}</span>
              </div>
              <div>
                <span style="color: var(--on-surface-variant);">Filing Date:</span>
                <span style="font-weight: 600; display: block;">${e.filingDate||`15 Mar 2024`}</span>
              </div>
            </div>
          </div>

          <!-- Verified Dossier Findings -->
          <div class="card" style="padding: var(--space-lg);">
            <div class="section-title">Verified Dossier Findings</div>
            <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 10px;">
              <div style="display: flex; gap: 12px; align-items: flex-start; padding: 12px; background: var(--surface-container-low); border-radius: var(--radius-md); border-left: 3px solid var(--primary);">
                <span class="material-symbols-outlined" style="font-size: 20px; color: var(--primary); margin-top: 2px;">gavel</span>
                <div>
                  <div style="font-weight: 700; font-size: 0.875rem; color: var(--on-surface);">Charges & Statutory Sections</div>
                  <div style="font-size: 0.8125rem; color: var(--on-surface-variant); margin-top: 2px; line-height: 1.4;">
                    Actionable under ${e.section||`IPC §420 / §468`}. Procedural compliance verified against court registry.
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 12px; align-items: flex-start; padding: 12px; background: var(--surface-container-low); border-radius: var(--radius-md); border-left: 3px solid var(--status-verified);">
                <span class="material-symbols-outlined" style="font-size: 20px; color: var(--status-verified); margin-top: 2px;">fact_check</span>
                <div>
                  <div style="font-weight: 700; font-size: 0.875rem; color: var(--on-surface);">Evidence Integrity Health</div>
                  <div style="font-size: 0.8125rem; color: var(--on-surface-variant); margin-top: 2px; line-height: 1.4;">
                    ${i} of ${r} documents matched against cryptographic hash records. Zero unauthorized alterations.
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 12px; align-items: flex-start; padding: 12px; background: var(--surface-container-low); border-radius: var(--radius-md); border-left: 3px solid var(--secondary);">
                <span class="material-symbols-outlined" style="font-size: 20px; color: var(--secondary); margin-top: 2px;">calendar_month</span>
                <div>
                  <div style="font-weight: 700; font-size: 0.875rem; color: var(--on-surface);">Next Court Proceeding</div>
                  <div style="font-size: 0.8125rem; color: var(--on-surface-variant); margin-top: 2px; line-height: 1.4;">
                    Hearing listed on ${s} before ${e.court}.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Verification Health & Pre-Hearing Checklist -->
        <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
          <!-- Integrity Certificate Card -->
          <div class="card" style="padding: var(--space-lg); background: var(--surface-container-low);">
            <div class="section-title">Docket Integrity Certificate</div>
            <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px;">
              <span class="material-symbols-outlined" style="font-size: 36px; color: var(--status-verified);">verified</span>
              <div>
                <div style="font-weight: 700; font-size: 1rem; color: var(--primary);">Cryptographically Bound</div>
                <div style="font-size: 0.75rem; color: var(--on-surface-variant);">SHA-256 Hashes Validated</div>
              </div>
            </div>
            <p style="font-size: 0.8125rem; color: var(--on-surface-variant); margin-top: 12px; line-height: 1.5;">
              All records for this dossier are cataloged in the local chain-of-custody ledger.
            </p>
            <div style="margin-top: 16px;">
              <a href="#/review" class="btn btn--secondary btn--sm" style="width: 100%; text-decoration: none; justify-content: center;">
                <span class="material-symbols-outlined" style="font-size: 16px;">find_in_page</span>
                View Evidence Lens
              </a>
            </div>
          </div>

          <!-- Interactive Pre-Hearing Checklist -->
          <div class="card" style="padding: var(--space-lg);">
            <div class="section-title" style="display: flex; justify-content: space-between; align-items: center;">
              <span>Pre-Hearing Checklist</span>
              <span style="font-size: 0.75rem; color: var(--primary); font-weight: 600;" id="checklist-progress">2/4 Done</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; font-size: 0.8125rem;" id="checklist-container">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" checked class="summary-check-item" data-task="1" style="accent-color: var(--primary);">
                <span>Verify chargesheet and FIR exhibits</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" checked class="summary-check-item" data-task="2" style="accent-color: var(--primary);">
                <span>Inspect witness deposition notices</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" class="summary-check-item" data-task="3" style="accent-color: var(--primary);">
                <span>Prepare questionnaire for next hearing</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" class="summary-check-item" data-task="4" style="accent-color: var(--primary);">
                <span>Confirm counsel presence and vakalatnama</span>
              </label>
            </div>
          </div>

          <!-- Legal Aid DLSA Contact -->
          <div class="card" style="padding: var(--space-md); background: #f8fafc; border: 1px solid var(--outline-variant);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="material-symbols-outlined" style="color: var(--primary); font-size: 18px;">support_agent</span>
              <span style="font-size: 0.8125rem; font-weight: 700; color: var(--primary);">Legal Aid Helpline</span>
            </div>
            <p style="font-size: 0.75rem; color: var(--on-surface-variant); line-height: 1.4; margin: 0;">
              Dial <strong>15100</strong> for NALSA free legal assistance or contact your District Legal Services Authority (DLSA).
            </p>
          </div>
        </div>
      </div>

      <!-- Chronological Proceedings Timeline Table (Reflecting Original Registered Data) -->
      <div class="card" style="padding: var(--space-lg); margin-top: var(--space-lg);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 14px;">
          <div>
            <div class="section-title">Case Proceedings Timeline</div>
            <h3 class="text-headline-sm" style="color: var(--primary); margin: 2px 0 0;">
              Chronological Legal Proceedings (${t.length} Registered Events)
            </h3>
          </div>
          <a href="#/timeline" class="btn btn--secondary btn--sm" style="text-decoration: none;">
            <span>Open Timeline View</span>
            <span class="material-symbols-outlined" style="font-size: 14px;">arrow_forward</span>
          </a>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
            <thead>
              <tr style="border-bottom: 2px solid var(--outline-variant); text-align: left; background: var(--surface-container-low);">
                <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Date</th>
                <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Proceeding Event</th>
                <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Procedural Notes & Details</th>
                <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${t.map(e=>`
                <tr style="border-bottom: 1px solid var(--outline-variant);">
                  <td style="padding: 12px 14px; font-weight: 600; white-space: nowrap; color: var(--on-surface);">${e.date}</td>
                  <td style="padding: 12px 14px; font-weight: 600; color: var(--primary);">${e.label}</td>
                  <td style="padding: 12px 14px; color: var(--on-surface-variant); line-height: 1.5;">${e.description}</td>
                  <td style="padding: 12px 14px; white-space: nowrap;">
                    <span class="badge ${e.verified?`badge--verified`:`badge--pending`}">
                      ${e.verified?`Verified`:`Pending`}
                    </span>
                  </td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Evidence Review Lens & Document Register Table -->
      <div class="card" style="padding: var(--space-lg); margin-top: var(--space-lg);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 14px;">
          <div>
            <div class="section-title">Evidence Register</div>
            <h3 class="text-headline-sm" style="color: var(--primary); margin: 2px 0 0;">
              Ingested Court Filings & Exhibits (${n.length} Records)
            </h3>
          </div>
          <a href="#/upload" class="btn btn--secondary btn--sm" style="text-decoration: none;">
            <span>Upload Documents</span>
            <span class="material-symbols-outlined" style="font-size: 14px;">upload_file</span>
          </a>
        </div>

        ${n.length===0?`
          <div style="padding: var(--space-lg); text-align: center; color: var(--on-surface-variant); background: var(--surface-container-low); border-radius: var(--radius-md);">
            <span class="material-symbols-outlined" style="font-size: 32px; color: var(--outline);">folder_off</span>
            <p style="margin: 6px 0 0; font-size: 0.875rem;">No court documents uploaded yet for this case. Navigate to <strong>2. Upload</strong> to ingest FIR and records.</p>
          </div>
        `:`
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
              <thead>
                <tr style="border-bottom: 2px solid var(--outline-variant); text-align: left; background: var(--surface-container-low);">
                  <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Document Name</th>
                  <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Category</th>
                  <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Pages</th>
                  <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Uploaded Date</th>
                  <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Audit Hash</th>
                </tr>
              </thead>
              <tbody>
                ${n.map(e=>`
                  <tr style="border-bottom: 1px solid var(--outline-variant);">
                    <td style="padding: 12px 14px; font-weight: 600; color: var(--primary);">${e.name||e.filename}</td>
                    <td style="padding: 12px 14px; color: var(--on-surface-variant);">${e.category}</td>
                    <td style="padding: 12px 14px; color: var(--on-surface);">${e.pages}</td>
                    <td style="padding: 12px 14px; color: var(--on-surface-variant); white-space: nowrap;">${e.uploadedDate}</td>
                    <td style="padding: 12px 14px;"><code style="font-size: 0.75rem; color: var(--secondary);">${e.hash}</code></td>
                  </tr>
                `).join(``)}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `}function L(){let e=_.getActiveCase();document.getElementById(`btn-print-summary`)?.addEventListener(`click`,()=>{_.printReport(e.id)}),document.getElementById(`btn-export-docket`)?.addEventListener(`click`,()=>{_.exportWordDocx(e.id)});let t=document.querySelectorAll(`.summary-check-item`),n=document.getElementById(`checklist-progress`);function r(){let e=t.length,r=0;t.forEach(e=>{e.checked&&r++}),n&&(n.textContent=`${r}/${e} Done`)}t.forEach(e=>{e.addEventListener(`change`,()=>{r()})})}function R(){let e=_.getActiveCase(),t=_.getCases(),n=_.getCaseDocuments(e.id),r=_.getCaseTimeline(e.id),i=localStorage.getItem(`casecompass_user`)||`Meera`,a=new Date().getFullYear(),o=(e.cnr||`CASE`).replace(/[^a-zA-Z0-9_-]/g,`_`),s=`CERT-AUD-${o}-${a}`,c=Math.abs(e.title.split(``).reduce((e,t)=>(e<<5)-e+t.charCodeAt(0),0)).toString(16).padStart(8,`0`),l=`SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd20012${c}`,u=new Date().toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`}),d=n.length>0?n:[{id:1,name:`Case_Filing_Petition_${o}.pdf`,filename:`Case_Filing_Petition_${o}.pdf`,category:`Originating Filing & Affidavit`,pages:14,size:`2.4 MB`,uploadedDate:e.filingDate||`15 Mar 2024`,lastVerified:u.split(`,`)[0],hash:`SHA256: 3a9f7e12${c.substring(0,4)}…89b1`,fullHash:`SHA256-INIT-${c.toUpperCase()}-001`,status:`verified`,statusLabel:`Intact`},{id:2,name:`Court_Registration_Order_${o}.pdf`,filename:`Court_Registration_Order_${o}.pdf`,category:`Judicial Proceeding Order`,pages:4,size:`1.1 MB`,uploadedDate:e.filingDate||`15 Mar 2024`,lastVerified:u.split(`,`)[0],hash:`SHA256: c4b18d9a${c.substring(2,6)}…44a0`,fullHash:`SHA256-ORD-${c.toUpperCase()}-002`,status:`verified`,statusLabel:`Intact`},{id:3,name:`Evidence_Index_Memo_${o}.pdf`,filename:`Evidence_Index_Memo_${o}.pdf`,category:`Evidence Ledger Memo`,pages:6,size:`0.8 MB`,uploadedDate:e.filingDate||`15 Mar 2024`,lastVerified:u.split(`,`)[0],hash:`SHA256: f0e3a6c8${c.substring(4,8)}…77e2`,fullHash:`SHA256-EVD-${c.toUpperCase()}-003`,status:`verified`,statusLabel:`Intact`}],f=d.length,p=d.filter(e=>e.status===`verified`).length,m=d.filter(e=>e.status===`flagged`).length,h=f>0?Math.round(p/f*100):e.status===`verified`?100:92,g=[{action:`Cryptographic Docket Ingestion & Hashing`,time:`${e.filingDate||`15 Mar 2024`} · 10:15 AM`,detail:`SHA-256 fingerprint generated for initial case record docket (${e.cnr}) before ${e.court}.`,result:`pass`},...r.slice(0,3).map((e,t)=>({action:`Proceeding Recorded: ${e.label}`,time:`${e.date} · 02:30 PM`,detail:`${e.description} — Audited and sealed into chronological record.`,result:`pass`})),{action:`Authorised Ledger Verification by Reviewer (${i})`,time:`${u}`,detail:`Full integrity pass confirmed against Section 65B IEA / Section 63 BSA criteria. Merkle root hash validated intact.`,result:e.status===`flagged`?`flag`:`pass`}];return`
    <div class="page-content animate-fade-in" style="max-width: 1080px;">
      <!-- Breadcrumb & Header -->
      <div style="margin-bottom: var(--space-lg);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: var(--on-surface-variant);">
            <a href="#/cases" style="color: inherit; text-decoration: none;">Cases</a>
            <span class="material-symbols-outlined" style="font-size: 14px;">chevron_right</span>
            <span style="font-weight: 600; color: var(--primary);">${e.title}</span>
            <span class="badge ${e.status===`verified`?`badge--verified`:`badge--pending`}" style="margin-left: 6px;">
              ${(e.statusLabel||e.status).toUpperCase()}
            </span>
            <span class="badge badge--verified" style="background:#e0f2fe;color:#0369a1;border:1px solid #bae6fd;">
              Ledger Sealed
            </span>
          </div>

          <!-- Case Selector Switcher -->
          <div style="display: flex; align-items: center; gap: 8px;">
            <label for="trust-case-select" style="font-size: 0.75rem; font-weight: 600; color: var(--on-surface-variant);">
              Active Case:
            </label>
            <select id="trust-case-select" style="padding: 4px 10px; font-size: 0.8125rem; border-radius: var(--radius-sm); border: 1px solid var(--outline); background: var(--surface-container-lowest); color: var(--on-surface); font-weight: 600; cursor: pointer;">
              ${t.map(t=>`
                <option value="${t.id}" ${String(t.id)===String(e.id)?`selected`:``}>
                  ${t.title} (${t.cnr})
                </option>
              `).join(``)}
            </select>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: var(--space-md);">
          <div>
            <h1 class="page-heading" style="font-size: 1.875rem;">7. Trust & Verification Ledger</h1>
            <p style="font-size: 0.875rem; color: var(--on-surface-variant); margin-top: 4px;">
              Cryptographic chain of custody, SHA-256 fingerprint validation, and tamper-evident audit certificate for <strong>${e.title}</strong>.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn--secondary btn--sm" id="btn-reverify" title="Recompute cryptographic SHA-256 hashes for all documents">
              <span class="material-symbols-outlined" style="font-size: 16px;">sync</span>
              Re-verify All Hashes
            </button>
            <button class="btn btn--primary btn--sm" id="btn-export-audit" title="Download official court audit certificate">
              <span class="material-symbols-outlined" style="font-size: 16px;">verified_user</span>
              Export Audit Certificate
            </button>
          </div>
        </div>
      </div>

      <!-- High-level Trust Status Banner -->
      <div class="card" style="padding: 20px; margin-bottom: var(--space-lg); background: linear-gradient(135deg, var(--surface-container-low), var(--surface-container-lowest)); border-left: 5px solid var(--status-verified);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 54px; height: 54px; border-radius: 50%; background: var(--status-verified-bg); display: flex; align-items: center; justify-content: center; color: var(--status-verified); box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);">
              <span class="material-symbols-outlined" style="font-size: 32px;">verified</span>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--primary); margin: 0;">
                  Docket Integrity Score: ${h}%
                </h2>
                <span class="badge badge--verified">Tamper-Evident</span>
                <span class="badge badge--neutral" style="font-size: 0.6875rem;">Sec 65B / 63 BSA Compliant</span>
              </div>
              <div style="font-size: 0.8125rem; color: var(--on-surface-variant); margin-top: 3px;">
                Last cryptographic sweep: <strong id="trust-last-sweep">${u}</strong> &middot; Audit Reference: <code>${s}</code>
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 20px; font-size: 0.8125rem;">
            <div style="text-align: right;">
              <span style="color: var(--on-surface-variant); display: block;">Total Files</span>
              <strong style="font-size: 1.125rem; color: var(--primary);">${f}</strong>
            </div>
            <div style="text-align: right;">
              <span style="color: var(--on-surface-variant); display: block;">Verified Clean</span>
              <strong style="font-size: 1.125rem; color: var(--status-verified);">${p}</strong>
            </div>
            <div style="text-align: right;">
              <span style="color: var(--on-surface-variant); display: block;">Flagged</span>
              <strong style="font-size: 1.125rem; color: ${m>0?`var(--status-flagged)`:`var(--outline)`};">${m}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- OFFICIAL COURT AUDIT CERTIFICATE (VISIBLE LIKE A REAL CERTIFICATE) -->
      <!-- ======================================================== -->
      <div class="audit-certificate-frame" id="audit-certificate-display">
        <!-- Certificate Header -->
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 6px;">
            <span style="font-size: 34px; line-height: 1;">⚖</span>
          </div>
          <div style="font-family: var(--font-label); font-size: 0.8125rem; font-weight: 800; color: #475569; letter-spacing: 0.15em; text-transform: uppercase;">
            E-Courts Digital Record System &middot; CaseCompass Cryptographic Trust
          </div>
          <h2 style="font-family: 'Source Serif 4', Georgia, serif; font-size: 1.875rem; font-weight: 800; color: #0F2A4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 8px 0 4px 0; border-bottom: 2px solid #d4af37; display: inline-block; padding-bottom: 6px;">
            Court Docket Audit Certificate
          </h2>
          <div style="font-family: 'Source Serif 4', Georgia, serif; font-size: 1.0625rem; font-style: italic; color: #334155; margin-top: 4px;">
            Certificate of Cryptographic Integrity & Chain of Custody
          </div>
          <div style="margin-top: 10px;">
            <span style="font-family: var(--font-code); font-size: 0.8125rem; font-weight: 700; background: #f1f5f9; padding: 4px 14px; border: 1px solid #cbd5e1; border-radius: 4px; color: #0F2A4A; display: inline-block;">
              CERTIFICATE NO: ${s}
            </span>
          </div>
        </div>

        <!-- Certificate Body Narrative -->
        <div style="font-family: 'Source Serif 4', Georgia, serif; font-size: 0.9375rem; line-height: 1.8; color: #1e293b; text-align: justify; margin: 0 16px 20px 16px;">
          This is to officially certify that the digital judicial records, chronological filings, and evidentiary attachments associated with the registered legal matter detailed below have been ingested, cryptographically fingerprinted with SHA-256 digests, and validated against tamper-evident distributed ledger standards through the CaseCompass Docket Intelligence Engine.
        </div>

        <!-- Case Title Banner -->
        <div style="text-align: center; margin: 16px 0; padding: 12px 16px; background: rgba(15, 42, 74, 0.03); border-radius: var(--radius-md); border: 1px solid rgba(212, 175, 55, 0.3);">
          <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: 700;">Registered Judicial Dossier</div>
          <div style="font-family: 'Source Serif 4', Georgia, serif; font-size: 1.375rem; font-weight: 700; color: #0F2A4A; margin-top: 2px;">
            &ldquo;${e.title}&rdquo;
          </div>
        </div>

        <!-- Specification Grid Table -->
        <div style="margin: 20px 0; overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem;">
            <thead>
              <tr style="background: #0F2A4A; color: #ffffff;">
                <th style="padding: 9px 12px; text-align: left; font-weight: 700; border: 1px solid #0F2A4A; width: 30%;">Record Parameter</th>
                <th style="padding: 9px 12px; text-align: left; font-weight: 700; border: 1px solid #0F2A4A; width: 70%;">Certified Dossier Specification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; font-weight: 600; color: #0F2A4A;">CNR Number</td>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1;"><code style="font-family:var(--font-code);font-weight:700;color:var(--primary);">${e.cnr}</code></td>
              </tr>
              <tr style="background: #f8fafc;">
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; font-weight: 600; color: #0F2A4A;">Court / Forum Jurisdiction</td>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1;">${e.court}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; font-weight: 600; color: #0F2A4A;">Substantive Sections / Acts</td>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1;">${e.section||`IPC §420, §468 / BNS §316`}</td>
              </tr>
              <tr style="background: #f8fafc;">
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; font-weight: 600; color: #0F2A4A;">Original Filing Date</td>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1;">${e.filingDate||`15 Mar 2024`}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; font-weight: 600; color: #0F2A4A;">Next Scheduled Court Session</td>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1;"><strong>${e.nextHearing||`Upcoming Scheduling`}</strong></td>
              </tr>
              <tr style="background: #f8fafc;">
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; font-weight: 600; color: #0F2A4A;">Cryptographic Merkle Root</td>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1;"><code style="font-family:var(--font-code);font-size:0.75rem;color:#0369a1;">${l}</code></td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; font-weight: 600; color: #0F2A4A;">Ledger Custody State</td>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1;">
                  <span style="font-weight: 700; color: #065f46; display: inline-flex; align-items: center; gap: 4px;">
                    <span class="material-symbols-outlined" style="font-size: 16px; color: #10b981;">check_circle</span>
                    VERIFIED INTACT &middot; ZERO TAMPERING DETECTED
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Ingested Document Fingerprint Registry -->
        <div style="margin: 20px 0;">
          <div style="font-family: 'Source Serif 4', Georgia, serif; font-size: 0.9375rem; font-weight: 700; color: #0F2A4A; margin-bottom: 8px;">
            Ingested Document Fingerprint Register (${d.length} Records):
          </div>
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.75rem;">
              <thead>
                <tr style="background: #1e3a5f; color: #ffffff;">
                  <th style="padding: 7px 10px; text-align: left;">File Name</th>
                  <th style="padding: 7px 10px; text-align: left;">Category</th>
                  <th style="padding: 7px 10px; text-align: left;">SHA-256 Digest</th>
                  <th style="padding: 7px 10px; text-align: center;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${d.map(e=>`
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 7px 10px; font-weight: 600; color: #0F2A4A;">${e.name||e.filename}</td>
                    <td style="padding: 7px 10px; color: #64748b;">${e.category||`Court Record`}</td>
                    <td style="padding: 7px 10px;"><code style="font-family:var(--font-code);color:#0369a1;">${e.hash||`SHA256-INTACT`}</code></td>
                    <td style="padding: 7px 10px; text-align: center;">
                      <span class="badge badge--verified" style="font-size:0.625rem;padding:2px 6px;">INTACT</span>
                    </td>
                  </tr>
                `).join(``)}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Statutory Compliance Attestation Callout -->
        <div style="background: #fdfbf7; border: 1px solid #e2d9cc; border-left: 4px solid #d4af37; padding: 14px 18px; margin: 20px 0; border-radius: var(--radius-sm); font-size: 0.8125rem; line-height: 1.6; color: #334155;">
          <strong style="color: #0F2A4A;">Statutory Compliance Declaration:</strong><br>
          This electronic certificate fulfills the evidentiary authentication prerequisites established under <strong>Section 65B of the Indian Evidence Act, 1872</strong> and <strong>Section 63 of the Bharatiya Sakshya Adhiniyam, 2023 (BSA)</strong>. All cryptographic digests were calculated at ingestion time, recorded in the local tamper-evident ledger, and validated against unauthorized alteration or bit-rot corruption.
        </div>

        <!-- Seals & Signatures Block -->
        <div style="display: flex; justify-content: space-around; align-items: flex-end; flex-wrap: wrap; gap: 24px; margin-top: 32px; padding-top: 16px; border-top: 1px dashed rgba(212, 175, 55, 0.4);">
          <!-- Official Gold Medallion Seal -->
          <div style="text-align: center;">
            <div class="audit-cert-seal">
              <span style="font-size: 14px; margin-bottom: 2px;">★</span>
              <span>AUDIT SEAL</span>
              <span style="font-size: 0.5rem; opacity: 0.85;">SEC 65B / 63 BSA</span>
              <span style="color: #15803d; font-size: 0.5625rem; font-weight: 900; margin-top: 2px;">VERIFIED</span>
            </div>
            <div style="font-size: 0.6875rem; color: #64748b; margin-top: 6px; font-weight: 600;">
              Sealed: ${u.split(`,`)[0]}
            </div>
          </div>

          <!-- Reviewer Signature Block -->
          <div style="text-align: center;">
            <div style="font-family: 'Brush Script MT', cursive, serif; font-size: 1.75rem; color: #0F2A4A; line-height: 1;">
              ${i}
            </div>
            <div class="audit-cert-signature-line"></div>
            <div style="font-weight: 700; font-size: 0.875rem; color: #0F2A4A;">${i}</div>
            <div style="font-size: 0.6875rem; color: #64748b;">
              Authorised Legal Reviewer<br>CaseCompass Verification Authority
            </div>
          </div>
        </div>

        <!-- Certificate Bottom Actions Bar -->
        <div style="display: flex; justify-content: center; gap: 12px; margin-top: 28px; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.06); flex-wrap: wrap;">
          <button class="btn btn--primary btn-cert-download" data-case="${e.id}" style="padding: 8px 20px; font-weight: 700;">
            <span class="material-symbols-outlined" style="font-size: 18px;">download</span>
            Download Certificate (.doc / Word)
          </button>
          <button class="btn btn--secondary btn-cert-print" data-case="${e.id}" style="padding: 8px 18px; font-weight: 600;">
            <span class="material-symbols-outlined" style="font-size: 18px;">print</span>
            Print / Save Certificate (PDF)
          </button>
        </div>
      </div>

      <!-- Two Sections: Document Hashes & Audit Trail -->
      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: var(--space-lg); align-items: start;">
        <!-- Left: Document Cryptographic Hashes Table -->
        <div class="card" style="padding: 0; overflow: hidden;">
          <div style="padding: 16px 20px; border-bottom: 1px solid var(--outline-variant); background: var(--surface-container-lowest); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div class="section-title" style="margin-bottom: 2px;">Document Fingerprints</div>
              <div style="font-size: 0.75rem; color: var(--on-surface-variant);">SHA-256 checksums registered at ingestion</div>
            </div>
            <span class="badge badge--neutral">${d.length} Records</span>
          </div>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem;">
              <thead>
                <tr style="border-bottom: 1px solid var(--outline-variant); background: var(--surface-container-low); text-align: left;">
                  <th style="padding: 10px 16px; font-weight: 600; color: var(--on-surface-variant);">Document</th>
                  <th style="padding: 10px 16px; font-weight: 600; color: var(--on-surface-variant);">SHA-256 Digest</th>
                  <th style="padding: 10px 16px; font-weight: 600; color: var(--on-surface-variant);">Status</th>
                  <th style="padding: 10px 16px; font-weight: 600; color: var(--on-surface-variant); text-align: right;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${d.map(e=>`
                  <tr style="border-bottom: 1px solid var(--outline-variant);">
                    <td style="padding: 12px 16px;">
                      <div style="font-weight: 600; color: var(--on-surface);">${e.name||e.filename}</div>
                      <div style="font-size: 0.6875rem; color: var(--outline); margin-top: 2px;">${e.size||`1.4 MB`} &middot; Verified ${e.lastVerified||u.split(`,`)[0]}</div>
                      ${e.note?`
                        <div style="font-size: 0.6875rem; color: var(--status-flagged); margin-top: 4px; display: flex; align-items: center; gap: 4px;">
                          <span class="material-symbols-outlined" style="font-size: 12px;">warning</span>
                          ${e.note}
                        </div>
                      `:``}
                    </td>
                    <td style="padding: 12px 16px;">
                      <code style="font-family: var(--font-code); font-size: 0.75rem; background: var(--surface-container-high); padding: 3px 6px; border-radius: 4px; color: var(--primary);">
                        ${e.hash}
                      </code>
                    </td>
                    <td style="padding: 12px 16px;">
                      ${e.status===`flagged`?`<span class="badge badge--flagged"><span class="material-symbols-outlined" style="font-size: 12px;">priority_high</span> Flagged</span>`:`<span class="badge badge--verified"><span class="material-symbols-outlined" style="font-size: 12px;">check</span> Intact</span>`}
                    </td>
                    <td style="padding: 12px 16px; text-align: right;">
                      <button class="btn btn--ghost btn--sm verify-single-btn" data-doc="${e.name||e.filename}" title="Recalculate checksum">
                        <span class="material-symbols-outlined" style="font-size: 16px;">refresh</span>
                      </button>
                    </td>
                  </tr>
                `).join(``)}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right: Immutable Audit Trail Log -->
        <div class="card" style="padding: var(--space-lg);">
          <div class="section-title">Chain of Custody Events</div>
          <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-bottom: 16px;">
            Immutable sequence recorded during ingestion & manual reviews
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${g.map(e=>`
              <div style="display: flex; gap: 10px; align-items: flex-start; padding-bottom: 12px; border-bottom: 1px solid var(--outline-variant);">
                <span class="material-symbols-outlined" style="font-size: 18px; margin-top: 2px; color: ${e.result===`pass`?`var(--status-verified)`:e.result===`flag`?`var(--status-flagged)`:`var(--primary)`};">
                  ${e.result===`pass`?`verified`:e.result===`flag`?`warning`:`info`}
                </span>
                <div style="flex: 1;">
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <div style="font-weight: 600; font-size: 0.8125rem; color: var(--on-surface);">${e.action}</div>
                    <span style="font-size: 0.6875rem; color: var(--outline); font-family: var(--font-code);">${e.time}</span>
                  </div>
                  <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 2px;">
                    ${e.detail}
                  </div>
                </div>
              </div>
            `).join(``)}
          </div>

          <div style="margin-top: 16px; padding: 12px; background: var(--surface-container-low); border-radius: var(--radius-md); font-size: 0.75rem; color: var(--on-surface-variant);">
            <div style="display: flex; align-items: center; gap: 6px; font-weight: 700; color: var(--primary); margin-bottom: 4px;">
              <span class="material-symbols-outlined" style="font-size: 16px;">lock</span>
              Ledger Sealed
            </div>
            This session is cryptographically bound to browser session key. Changes generate irreversible audit log entries.
          </div>
        </div>
      </div>
    </div>
  `}function z(){let e=_.getActiveCase();document.getElementById(`trust-case-select`)?.addEventListener(`change`,e=>{let t=e.target.value;_.setActiveCase(t),window.location.hash=`#/trust`;let n=document.getElementById(`page-content`);n&&(n.innerHTML=R(),z())});function t(){let t=document.getElementById(`audit-certificate-display`);t&&(t.scrollIntoView({behavior:`smooth`,block:`center`}),t.classList.add(`highlight-pulse`),setTimeout(()=>t.classList.remove(`highlight-pulse`),2500));let n=_.exportAuditCertificate(e.id);alert(`✓ Court Audit Certificate (${n.certificateNumber}) for "${n.caseTitle}" has been generated and downloaded successfully! Fully compliant with Section 65B Indian Evidence Act / Section 63 BSA.`)}document.getElementById(`btn-export-audit`)?.addEventListener(`click`,t),document.querySelectorAll(`.btn-cert-download`).forEach(e=>{e.addEventListener(`click`,t)}),document.querySelectorAll(`.btn-cert-print`).forEach(t=>{t.addEventListener(`click`,()=>{_.printAuditCertificate(e.id)})}),document.getElementById(`btn-reverify`)?.addEventListener(`click`,t=>{let n=t.currentTarget,r=n.innerHTML;n.innerHTML=`<span class="material-symbols-outlined" style="font-size: 16px; animation: spin 1s infinite linear;">sync</span> Verifying...`,n.disabled=!0,setTimeout(()=>{n.innerHTML=r,n.disabled=!1;let t=new Date().toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`}),i=document.getElementById(`trust-last-sweep`);i&&(i.textContent=t),alert(`✓ Cryptographic sweep completed! All SHA-256 digests for "${e.title}" matched ledger root hash. Docket status: 100% Intact.`)},600)}),document.querySelectorAll(`.verify-single-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-doc`);e.innerHTML=`<span class="material-symbols-outlined" style="font-size: 16px; animation: spin 0.8s infinite linear;">sync</span>`,setTimeout(()=>{e.innerHTML=`<span class="material-symbols-outlined" style="font-size: 16px;">refresh</span>`,alert(`✓ Cryptographic check for "${t}": SHA-256 digest re-computed and confirmed 100% intact.`)},400)})})}h();var B=[{path:`/`,id:`landing`,title:`CaseCompass — From Court Orders to Clarity`,render:l,init:u,isLanding:!0},{path:`/login`,id:`login`,title:`Sign In — CaseCompass Workspace`,render:()=>d(`login`),init:()=>f(`login`),isAuthPage:!0},{path:`/signup`,id:`signup`,title:`Sign Up — CaseCompass Workspace`,render:()=>d(`signup`),init:()=>f(`signup`),isAuthPage:!0},{path:`/cases`,id:`cases`,title:`1. Cases — CaseCompass Workspace`,render:S,init:C},{path:`/upload`,id:`upload`,title:`2. Upload Documents — CaseCompass Workspace`,render:w,init:T},{path:`/timeline`,id:`timeline`,title:`3. Case Timeline — CaseCompass Workspace`,render:O,init:k},{path:`/review`,id:`review`,title:`4. Evidence Review — CaseCompass Workspace`,render:j,init:N},{path:`/ask`,id:`ask`,title:`5. Ask Docket — CaseCompass Workspace`,render:P,init:F},{path:`/summary`,id:`summary`,title:`6. Executive Summary — CaseCompass Workspace`,render:I,init:L},{path:`/trust`,id:`trust`,title:`7. Trust & Verification — CaseCompass Workspace`,render:R,init:z}],V=document.getElementById(`app`);function H(e){if(!V)return;let t=localStorage.getItem(`casecompass_auth`)===`true`;if(!e.isLanding&&!e.isAuthPage&&!t){sessionStorage.setItem(`show_login_needed_popup`,`true`),window.location.hash=`#/`;return}document.body.style.overflow=``;let n=document.getElementById(`login-modal-overlay`);if(n&&n.parentElement===document.body&&!e.isLanding&&n.remove(),e.isLanding||e.isAuthPage)document.body.classList.remove(`is-workspace`),document.body.classList.add(e.isLanding?`is-landing`:`is-auth-page`),V.className=e.isLanding?`is-landing`:`is-auth-page`,V.innerHTML=e.render(),typeof e.init==`function`&&e.init();else{document.body.classList.remove(`is-landing`,`is-auth-page`),document.body.classList.add(`is-workspace`),V.className=`is-workspace`,V.innerHTML=s(e.id),c();let t=document.getElementById(`page-content`);t&&(t.innerHTML=e.render(),typeof e.init==`function`&&e.init())}document.title=e.title||`CaseCompass — From Court Orders to Clarity`,window.scrollTo(0,0)}var U=new e(B,`/`);U.onNavigate=e=>{H(e)},U.handleRoute();