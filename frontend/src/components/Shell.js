/**
 * CaseCompass — Application Shell
 * Header, Sidebar, Main Area
 * Clean full-screen dashboard without distraction badges or bottom disclaimers.
 */

import { navItems } from '../data/demoData.js';


export function renderShell(activeId) {
  const currentReviewer = localStorage.getItem('casecompass_reviewer_name') || localStorage.getItem('casecompass_user') || 'Legal Advocate';
  const currentRole = localStorage.getItem('casecompass_role') || 'admin';
  const userEmail = localStorage.getItem('casecompass_user_email') || '';
  const userPicture = localStorage.getItem('casecompass_user_picture') || '';
  const isGoogleAuth = localStorage.getItem('casecompass_google_auth') === 'true';

  const roleBadgeHtml = currentRole === 'user'
    ? `<span class="badge" style="background:#e0f2fe;color:#0369a1;font-weight:700;display:inline-flex;align-items:center;gap:4px;"><span class="material-symbols-outlined" style="font-size:14px;">person</span> Citizen</span>`
    : (currentRole === 'judge'
      ? `<span class="badge" style="background:#fef3c7;color:#92400e;font-weight:700;display:inline-flex;align-items:center;gap:4px;"><span class="material-symbols-outlined" style="font-size:14px;">gavel</span> Hon'ble Judge</span>`
      : `<span class="badge" style="background:#ede9fe;color:#5b21b6;font-weight:700;display:inline-flex;align-items:center;gap:4px;"><span class="material-symbols-outlined" style="font-size:14px;">admin_panel_settings</span> Court Admin</span>`);

  return `
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
        <div class="app-header__actions" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <!-- Verified Google Account Identity Layer -->
          <div class="hide-mobile" style="display:flex;align-items:center;gap:6px;background:rgba(15,118,110,0.08);border:1px solid rgba(15,118,110,0.25);padding:3px 10px;border-radius:20px;" title="Signed in with verified Google Account: ${userEmail || currentReviewer}">
            ${userPicture
              ? `<img src="${userPicture}" alt="Avatar" style="width:22px;height:22px;border-radius:50%;object-fit:cover;border:1px solid #0f766e;" onerror="this.style.display='none'">`
              : `<span class="material-symbols-outlined" style="font-size:18px;color:#0f766e;">account_circle</span>`
            }
            <span style="font-size:0.6875rem;font-weight:700;color:#0f766e;max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${userEmail || currentReviewer}</span>
            <span style="display:inline-flex;align-items:center;background:#0f766e;color:#fff;border-radius:10px;padding:1px 6px;font-size:0.5625rem;font-weight:800;letter-spacing:0.02em;">GOOGLE VERIFIED ✓</span>
          </div>

          <!-- Section 6: Header Reviewer Name Field (sent with every review, dismiss, deadline call) -->
          <div class="hide-mobile" style="display:flex;align-items:center;gap:4px;background:var(--surface-container-high);padding:3px 8px;border-radius:var(--radius-md);" title="Volunteer Reviewer Identity (Section 6)">
            <span class="material-symbols-outlined" style="font-size:15px;color:var(--primary);">badge</span>
            <span style="font-size:0.6875rem;font-weight:700;color:var(--on-surface-variant);text-transform:uppercase;">Reviewer:</span>
            <input type="text" id="shell-reviewer-input" value="${currentReviewer}" placeholder="Volunteer"
                   style="width:90px;background:transparent;border:none;border-bottom:1px solid var(--outline);font-size:0.75rem;font-weight:700;color:var(--primary);outline:none;padding:1px 2px;"
                   title="Type reviewer name — sent with reviews & audit log">
          </div>

          <!-- Section 13.4: Accessibility Toggles (High Contrast & Large Text) -->
          <button class="btn btn--ghost btn--sm btn-shell-accessibility" id="btn-toggle-hc" title="Toggle High Contrast (.hc class)" style="padding:4px 8px;border-radius:6px;">
            <span class="material-symbols-outlined" style="font-size:16px;">contrast</span>
            <span class="hide-mobile" style="font-size:0.6875rem;font-weight:700;">HC</span>
          </button>
          <button class="btn btn--ghost btn--sm btn-shell-accessibility" id="btn-toggle-lg" title="Toggle Large Text (.lg class)" style="padding:4px 8px;border-radius:6px;">
            <span class="material-symbols-outlined" style="font-size:16px;">format_size</span>
            <span class="hide-mobile" style="font-size:0.6875rem;font-weight:700;">20px</span>
          </button>

          <!-- Active Role Switcher / Indicator -->
          <div style="display:flex;align-items:center;gap:6px;background:var(--surface-container-high);padding:4px 10px;border-radius:var(--radius-md);">
            ${roleBadgeHtml}
            <select id="shell-role-select" title="Switch Portal Persona" style="background:transparent;border:none;font-size:0.75rem;font-weight:700;color:var(--primary);cursor:pointer;outline:none;">
              <option value="user" ${currentRole === 'user' ? 'selected' : ''}>👤 Citizen Portal</option>
              <option value="admin" ${currentRole === 'admin' ? 'selected' : ''}>🛡️ Admin Portal</option>
              <option value="judge" ${currentRole === 'judge' ? 'selected' : ''}>⚖️ Judge Portal</option>
            </select>
          </div>

          <button class="btn btn--ghost btn--sm" id="btn-shell-logout" title="Sign out from Google Session" style="display:flex;align-items:center;gap:4px;padding:6px 10px;cursor:pointer;border-radius:var(--radius-md);">
            <span class="material-symbols-outlined" style="font-size:18px;color:var(--outline);">logout</span>
            <span class="hide-mobile" style="font-size:0.8125rem;font-weight:600;color:var(--outline);">Sign out</span>
          </button>

          <button class="header-mobile-menu-btn" id="mobile-menu-btn" title="Open menu" aria-label="Open navigation menu">
            <span class="material-symbols-outlined" style="font-size:24px">menu</span>
          </button>
        </div>
      </div>
      <!-- Section 1: Mandatory Line on Every Screen (exact text, character for character) -->
      <div class="mandatory-disclaimer-bar">
        <span class="material-symbols-outlined" style="font-size:16px;color:#d97706;">gavel</span>
        <span>This organizes the record. It is not legal advice and does not predict outcomes.</span>
      </div>
    </header>

    <!-- Desktop Sidebar -->
    <aside class="app-sidebar" id="app-sidebar">
      <div class="sidebar-section-label">Record Verification Flow</div>
      <nav class="sidebar-nav" aria-label="Main navigation">
        ${navItems.map(item => `
          <a class="sidebar-nav-item ${item.id === activeId ? 'active' : ''}"
             href="#${item.path}" data-path="${item.id}" role="link">
            <span class="material-symbols-outlined">${item.icon}</span>
            <span>${item.label}</span>
          </a>
        `).join('')}
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
        ${navItems.map(item => `
          <a class="sidebar-nav-item ${item.id === activeId ? 'active' : ''}"
             href="#${item.path}" data-path="${item.id}" data-mobile-nav role="link">
            <span class="material-symbols-outlined">${item.icon}</span>
            <span>${item.label}</span>
          </a>
        `).join('')}
      </nav>
    </div>

    <!-- Main Content Slot -->
    <main class="app-main" id="page-content" role="main">
      <!-- Page content injected here -->
    </main>
  `;
}

export function initShellListeners() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-close-btn');
  const overlay = document.getElementById('mobile-overlay');
  const sidebar = document.getElementById('mobile-sidebar');

  function openMobile() {
    overlay?.classList.add('open');
    sidebar?.classList.add('open');
  }

  function closeMobile() {
    overlay?.classList.remove('open');
    sidebar?.classList.remove('open');
  }

  menuBtn?.addEventListener('click', openMobile);
  closeBtn?.addEventListener('click', closeMobile);
  overlay?.addEventListener('click', closeMobile);

  // Close mobile sidebar on nav click
  document.querySelectorAll('[data-mobile-nav]').forEach(link => {
    link.addEventListener('click', closeMobile);
  });

  // Role Switcher change handler
  document.getElementById('shell-role-select')?.addEventListener('change', (e) => {
    const selected = e.target.value;
    localStorage.setItem('casecompass_role', selected);
    window.location.reload();
  });

  // Reviewer Name Input Listener (Section 6 & 13.2)
  const reviewerInput = document.getElementById('shell-reviewer-input');
  reviewerInput?.addEventListener('input', (e) => {
    const val = e.target.value.trim() || 'Meera';
    localStorage.setItem('casecompass_reviewer_name', val);
    localStorage.setItem('casecompass_user', val);
  });

  // Accessibility Toggles (Section 13.2 / 13.4)
  const btnHc = document.getElementById('btn-toggle-hc');
  const btnLg = document.getElementById('btn-toggle-lg');

  if (localStorage.getItem('casecompass_a11y_hc') === 'true') {
    document.body.classList.add('hc');
  }
  if (localStorage.getItem('casecompass_a11y_lg') === 'true') {
    document.body.classList.add('lg');
  }

  btnHc?.addEventListener('click', () => {
    const isHc = document.body.classList.toggle('hc');
    localStorage.setItem('casecompass_a11y_hc', isHc ? 'true' : 'false');
  });

  btnLg?.addEventListener('click', () => {
    const isLg = document.body.classList.toggle('lg');
    localStorage.setItem('casecompass_a11y_lg', isLg ? 'true' : 'false');
  });

  // Sign out button
  document.getElementById('btn-shell-logout')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('casecompass_auth');
    localStorage.removeItem('casecompass_google_auth');
    localStorage.removeItem('casecompass_user');
    localStorage.removeItem('casecompass_user_email');
    localStorage.removeItem('casecompass_user_picture');
    localStorage.removeItem('casecompass_user_sub');
    localStorage.removeItem('casecompass_role');
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
    window.location.hash = '#/login';
    window.location.reload();
  });
}
