/**
 * CaseCompass — Application Shell
 * Header, Sidebar, Main Area
 */

import { navItems } from '../data/demoData.js';
import { getSession, clearSession, signOut } from '../services/authSession.js';


export function renderShell(activeId) {
  const session = getSession();
  const currentReviewer = session?.name || localStorage.getItem('casecompass_reviewer_name') || 'Legal Advocate';
  const currentRole = session?.role || localStorage.getItem('casecompass_role') || 'user';
  const userEmail = session?.email || localStorage.getItem('casecompass_user_email') || '';
  const userPicture = localStorage.getItem('casecompass_user_picture') || '';


  const roleIcon = currentRole === 'judge' ? 'gavel' : (currentRole === 'admin' ? 'admin_panel_settings' : 'person');
  const roleName = currentRole === 'judge' ? 'Judge' : (currentRole === 'admin' ? 'Court Admin' : 'Citizen');
  const displayName = userEmail ? userEmail.split('@')[0] : currentReviewer;

  return `
    <!-- Header: Single clean bar with zero wrapping -->
    <header class="app-header" id="app-header">
      <div class="app-header__inner">
        <a href="#/cases" class="app-header__brand" title="CaseCompass Home">
          <img alt="CaseCompass Logo" class="app-header__logo" src="/casecompass-logo.png">
          <div class="app-header__brand-text">
            <span class="app-header__brand-title">CaseCompass</span>
            <span class="app-header__brand-subtitle">Docket Intelligence</span>
          </div>
        </a>

        <div class="app-header__actions">
          <!-- Clean Google Verified User Pill -->
          <div class="header-user-pill" title="Signed in with Google: ${userEmail || currentReviewer}">
            ${userPicture
              ? `<img src="${userPicture}" alt="" class="header-user-avatar" onerror="this.style.display='none'">`
              : `<span class="material-symbols-outlined header-user-avatar-icon">account_circle</span>`
            }
            <span class="header-user-name">${displayName}</span>
            <span class="header-verified-tag" title="Google OAuth Verified">
              <span class="material-symbols-outlined" style="font-size:12px;">check_circle</span>
              <span class="hide-mobile">Verified</span>
            </span>
          </div>

          <!-- Active Role Switcher -->
          <div class="header-role-pill" title="Active Portal: ${roleName}">
            <span class="material-symbols-outlined" style="font-size:16px;color:var(--primary);">${roleIcon}</span>
            <select id="shell-role-select" class="header-role-select" title="Switch Portal">
              <option value="user" ${currentRole === 'user' ? 'selected' : ''}>Citizen</option>
              <option value="admin" ${currentRole === 'admin' ? 'selected' : ''}>Court Admin</option>
              <option value="judge" ${currentRole === 'judge' ? 'selected' : ''}>Judge</option>
            </select>
          </div>

          <!-- High Contrast Accessibility Toggle -->
          <button class="header-icon-btn" id="btn-toggle-hc" title="Toggle High Contrast" aria-label="Toggle High Contrast">
            <span class="material-symbols-outlined" style="font-size:18px;">contrast</span>
          </button>

          <!-- Sign Out -->
          <button class="header-icon-btn" id="btn-shell-logout" title="Sign out" aria-label="Sign out">
            <span class="material-symbols-outlined" style="font-size:18px;">logout</span>
            <span class="hide-mobile" style="font-size:0.75rem;font-weight:600;">Sign out</span>
          </button>

          <!-- Mobile Menu Trigger -->
          <button class="header-mobile-menu-btn" id="mobile-menu-btn" title="Open menu" aria-label="Open navigation menu">
            <span class="material-symbols-outlined" style="font-size:22px">menu</span>
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
        <div style="display:flex;align-items:center;gap:10px;">
          <img alt="CaseCompass Logo" class="app-header__logo" src="/casecompass-logo.png" style="height:2rem;width:auto;">
          <span style="font-family:'Archivo Black', 'Source Serif 4', sans-serif;font-size:1.125rem;font-weight:800;color:#0F2A4A;">CaseCompass</span>
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

  // Sign out button — calls backend logout endpoint then clears session
  document.getElementById('btn-shell-logout')?.addEventListener('click', async (e) => {
    e.preventDefault();
    await signOut().catch(() => {});
    // Also clear legacy localStorage flags
    ['casecompass_auth', 'casecompass_google_auth', 'casecompass_user',
      'casecompass_user_email', 'casecompass_user_picture', 'casecompass_user_sub',
      'casecompass_role'].forEach(k => localStorage.removeItem(k));
    window.location.hash = '#/login';
    window.location.reload();
  });
}
