/**
 * CaseCompass — Application Shell
 * Header, Sidebar, Main Area
 * Clean full-screen dashboard without distraction badges or bottom disclaimers.
 */

import { navItems } from '../data/demoData.js';

// Logo URL from Stitch project
const LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1X4tTK8AmPrtGz6XT97Gr0rvLmAmZcVP9ATuysXyJZSE1caTQvkFlDnHjiMb4Er0ZsQUbnUq3KBqj29MvmtmFzZ_Q_s52ZE7dEkHpicEfVFP9RhsRFXWs_1Yh6hs-G2wRWBQlE8-EYZiDfqXvVTLM4xAos2WIHMdoOjHsAzecDkMonwrXRq9k0W51Vweepc6_CHUM_S2qtCwGi_rgVJoUK_j7hdRJ3EQYoTDjjc55fGJ4qCcveYfrqnWA4';

export function renderShell(activeId) {
  const isAuth = localStorage.getItem('casecompass_auth') === 'true';
  const currentReviewer = isAuth ? (localStorage.getItem('casecompass_user') || 'Admin User') : 'Guest Explorer';
  const currentRole = localStorage.getItem('casecompass_role') || (isAuth ? 'admin' : 'user');

  const roleBadgeHtml = currentRole === 'user'
    ? `<span class="badge" style="background:#e0f2fe;color:#0369a1;font-weight:700;display:inline-flex;align-items:center;gap:4px;"><span class="material-symbols-outlined" style="font-size:14px;">person</span> Citizen</span>`
    : (currentRole === 'judge'
      ? `<span class="badge" style="background:#fef3c7;color:#92400e;font-weight:700;display:inline-flex;align-items:center;gap:4px;"><span class="material-symbols-outlined" style="font-size:14px;">gavel</span> Hon'ble Judge</span>`
      : `<span class="badge" style="background:#ede9fe;color:#5b21b6;font-weight:700;display:inline-flex;align-items:center;gap:4px;"><span class="material-symbols-outlined" style="font-size:14px;">admin_panel_settings</span> Court Admin</span>`);

  return `
    <!-- Header -->
    <header class="app-header" id="app-header">
      <div class="app-header__inner">
        <a href="#/cases" class="app-header__brand" style="text-decoration:none;cursor:pointer;display:flex;align-items:center;" title="CaseCompass Workspace">
          <img alt="CaseCompass — From Court Orders to Clarity" class="app-header__logo" src="/casecompass-logo.png"
               onerror="this.src='${LOGO_URL}'">
        </a>
        <div class="app-header__actions" style="display:flex;align-items:center;gap:10px;">
          <!-- Active Role Switcher / Indicator -->
          <div style="display:flex;align-items:center;gap:6px;background:var(--surface-container-high);padding:4px 10px;border-radius:var(--radius-md);">
            ${roleBadgeHtml}
            <select id="shell-role-select" title="Switch Portal Persona" style="background:transparent;border:none;font-size:0.75rem;font-weight:700;color:var(--primary);cursor:pointer;outline:none;">
              <option value="user" ${currentRole === 'user' ? 'selected' : ''}>👤 Citizen (Ramesh Kumar)</option>
              <option value="admin" ${currentRole === 'admin' ? 'selected' : ''}>🛡️ Admin (Registrar Deshpande)</option>
              <option value="judge" ${currentRole === 'judge' ? 'selected' : ''}>⚖️ Judge (Hon. Smt. Archana Kulkarni)</option>
            </select>
          </div>

          ${!isAuth ? `
            <!-- Login Needed Alert Badge for unauthenticated guests -->
            <button type="button" class="badge" id="btn-header-login-needed" title="Login needed — Click to review authentication details"
                    style="background:#fef3c7;border:1px solid #fde68a;color:#92400e;font-weight:700;display:inline-flex;align-items:center;gap:5px;cursor:pointer;padding:6px 12px;border-radius:9999px;transition:all 0.2s ease;">
              <span class="material-symbols-outlined" style="font-size:15px;color:#d97706;">lock</span>
              <span>Login Needed</span>
            </button>
            <a href="#/login" class="btn btn--primary btn--sm" id="btn-shell-signin" style="text-decoration:none;display:inline-flex;align-items:center;gap:4px;padding:6px 14px;border-radius:var(--radius-md);font-weight:700;">
              <span class="material-symbols-outlined" style="font-size:16px;">login</span>
              <span class="hide-mobile">Log In</span>
            </a>
          ` : `
            <div class="header-user-badge hide-mobile" style="display:flex;align-items:center;gap:8px;background:var(--surface-container-high);padding:5px 12px;border-radius:9999px;">
              <div style="width:22px;height:22px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;">
                ${currentReviewer.charAt(0)}
              </div>
              <span style="font-size:0.8125rem;font-weight:600;color:var(--primary);">${currentReviewer}</span>
            </div>

            <button class="btn btn--ghost btn--sm" id="btn-shell-logout" title="Sign out" style="display:flex;align-items:center;gap:4px;padding:6px 10px;cursor:pointer;border-radius:var(--radius-md);">
              <span class="material-symbols-outlined" style="font-size:18px;color:var(--outline);">logout</span>
              <span class="hide-mobile" style="font-size:0.8125rem;font-weight:600;color:var(--outline);">Sign out</span>
            </button>
          `}

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
      <div class="mobile-sidebar-header">
        <img alt="CaseCompass — From Court Orders to Clarity" class="app-header__logo" src="/casecompass-logo.png" style="height:2.75rem;width:auto;"
             onerror="this.src='${LOGO_URL}'">
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

    <!-- 🔒 Login Needed Pop-up Modal (Prominently shown for unauthenticated users) -->
    <div id="login-needed-modal" class="modal-overlay" style="display:none;position:fixed;inset:0;z-index:99999;background:rgba(7,21,39,0.72);backdrop-filter:blur(6px);align-items:center;justify-content:center;padding:16px;">
      <div class="card" style="width:100%;max-width:490px;background:#ffffff;color:#0F2A4A;border-radius:18px;padding:28px;box-shadow:0 25px 60px -15px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.25);position:relative;">
        <!-- Close X button -->
        <button type="button" id="btn-close-login-needed" style="position:absolute;top:16px;right:16px;background:none;border:none;cursor:pointer;color:#64748b;padding:6px;border-radius:8px;display:flex;align-items:center;justify-content:center;" title="Dismiss & Explore as guest">
          <span class="material-symbols-outlined" style="font-size:22px;">close</span>
        </button>

        <!-- Header -->
        <div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:16px;">
          <div style="width:48px;height:48px;border-radius:12px;background:#fef3c7;border:1px solid #fde68a;color:#d97706;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span class="material-symbols-outlined" style="font-size:28px;">lock</span>
          </div>
          <div>
            <div class="badge" style="background:#fee2e2;color:#b91c1c;font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;padding:2px 8px;border-radius:4px;display:inline-block;">
              Authentication Required
            </div>
            <h2 style="font-size:1.375rem;font-weight:800;color:#0F2A4A;margin:0;line-height:1.2;">
              Login Needed
            </h2>
          </div>
        </div>

        <!-- Explanatory message -->
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin-bottom:20px;font-size:0.875rem;color:#334155;line-height:1.55;">
          <p style="margin:0 0 8px 0;font-weight:700;color:#0F2A4A;">
            You have entered the CaseCompass workspace without logging in or signing up.
          </p>
          <p style="margin:0;font-size:0.8125rem;color:#64748b;">
            The workspace is active for you to explore case proceedings, timelines, and legal AI features. However, to file official dockets, save new records, or access personal litigant files, authentication is needed.
          </p>
        </div>

        <!-- Action buttons -->
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <a href="#/login" class="btn btn--primary" id="modal-btn-login" style="padding:11px;text-align:center;justify-content:center;text-decoration:none;font-weight:700;border-radius:8px;font-size:0.875rem;display:flex;align-items:center;gap:6px;">
              <span class="material-symbols-outlined" style="font-size:18px;">login</span>
              <span>Log In</span>
            </a>
            <a href="#/signup" class="btn btn--secondary" id="modal-btn-signup" style="padding:11px;text-align:center;justify-content:center;text-decoration:none;font-weight:700;border-radius:8px;font-size:0.875rem;display:flex;align-items:center;gap:6px;">
              <span class="material-symbols-outlined" style="font-size:18px;">person_add</span>
              <span>Sign Up</span>
            </a>
          </div>

          <button type="button" id="btn-continue-as-guest" class="btn btn--ghost" style="width:100%;padding:10px;text-align:center;justify-content:center;font-weight:600;font-size:0.8125rem;color:#475569;border-radius:8px;display:flex;align-items:center;gap:6px;cursor:pointer;">
            <span>Continue to Workspace (Guest Mode)</span>
            <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
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

  // Login Needed Modal Handlers
  const isAuth = localStorage.getItem('casecompass_auth') === 'true';
  const loginNeededModal = document.getElementById('login-needed-modal');
  const closeLoginNeededBtn = document.getElementById('btn-close-login-needed');
  const continueGuestBtn = document.getElementById('btn-continue-as-guest');
  const headerLoginNeededBtn = document.getElementById('btn-header-login-needed');

  function openLoginNeededModal() {
    if (loginNeededModal) {
      loginNeededModal.style.display = 'flex';
    }
  }

  function closeLoginNeededModal() {
    if (loginNeededModal) {
      loginNeededModal.style.display = 'none';
      sessionStorage.setItem('guest_modal_dismissed', 'true');
    }
  }

  closeLoginNeededBtn?.addEventListener('click', closeLoginNeededModal);
  continueGuestBtn?.addEventListener('click', closeLoginNeededModal);
  headerLoginNeededBtn?.addEventListener('click', openLoginNeededModal);
  loginNeededModal?.addEventListener('click', (e) => {
    if (e.target === loginNeededModal) closeLoginNeededModal();
  });

  // Trigger modal if unauthenticated and either explicitly requested or initial guest entry
  if (!isAuth) {
    const shouldPop = sessionStorage.getItem('show_login_needed_popup') === 'true' || !sessionStorage.getItem('guest_modal_shown_once');
    if (shouldPop) {
      openLoginNeededModal();
      sessionStorage.removeItem('show_login_needed_popup');
      sessionStorage.setItem('guest_modal_shown_once', 'true');
    }
  }

  // Role Switcher change handler
  document.getElementById('shell-role-select')?.addEventListener('change', (e) => {
    const selected = e.target.value;
    localStorage.setItem('casecompass_role', selected);
    if (selected === 'user') {
      localStorage.setItem('casecompass_user', 'Ramesh Kumar');
      localStorage.setItem('casecompass_user_email', 'ramesh.kumar@citizen.in');
    } else if (selected === 'admin') {
      localStorage.setItem('casecompass_user', 'Registrar V. K. Deshpande');
      localStorage.setItem('casecompass_user_email', 'admin.registry@districtcourt.gov.in');
    } else if (selected === 'judge') {
      localStorage.setItem('casecompass_user', 'Hon. Smt. Archana Kulkarni');
      localStorage.setItem('casecompass_user_email', 'judge.kulkarni@judicial.gov.in');
    }
    window.location.reload();
  });

  // Sign out button
  document.getElementById('btn-shell-logout')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('casecompass_auth');
    localStorage.removeItem('casecompass_user');
    localStorage.removeItem('casecompass_role');
    sessionStorage.removeItem('guest_modal_shown_once');
    sessionStorage.removeItem('show_login_needed_popup');
    window.location.hash = '#/login';
  });
}
