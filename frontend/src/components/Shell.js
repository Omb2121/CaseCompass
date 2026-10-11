/**
 * CaseCompass — Application Shell
 * Header, Sidebar, Footer — matching Stitch design exactly
 */

import { navItems } from '../data/demoData.js';

// Logo URL from Stitch project
const LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1X4tTK8AmPrtGz6XT97Gr0rvLmAmZcVP9ATuysXyJZSE1caTQvkFlDnHjiMb4Er0ZsQUbnUq3KBqj29MvmtmFzZ_Q_s52ZE7dEkHpicEfVFP9RhsRFXWs_1Yh6hs-G2wRWBQlE8-EYZiDfqXvVTLM4xAos2WIHMdoOjHsAzecDkMonwrXRq9k0W51Vweepc6_CHUM_S2qtCwGi_rgVJoUK_j7hdRJ3EQYoTDjjc55fGJ4qCcveYfrqnWA4';

export function renderShell(activeId) {
  const currentReviewer = localStorage.getItem('casecompass_user') || 'Meera';

  return `
    <!-- Header -->
    <header class="app-header" id="app-header">
      <div class="app-header__inner">
        <a href="#/" class="app-header__brand" style="text-decoration:none;cursor:pointer;" title="Return to Landing Page">
          <img alt="CaseCompass Logo" class="app-header__logo" src="${LOGO_URL}"
               onerror="this.style.display='none'">
          <div>
            <div class="app-header__title">CaseCompass</div>
            <div class="app-header__tagline">From Court Orders to Clarity</div>
          </div>
        </a>
        <div class="app-header__actions">
          <a href="#/" class="btn btn--secondary btn--sm hide-mobile" style="text-decoration:none;gap:4px;">
            <span class="material-symbols-outlined" style="font-size:16px;">arrow_back</span>
            <span>Landing Page</span>
          </a>
          <div class="header-reviewer">
            <label for="reviewer-name">Reviewer:</label>
            <input type="text" id="reviewer-name" placeholder="Your name" value="${currentReviewer}">
          </div>
          <div class="header-status-badge">
            <span class="material-symbols-outlined" style="font-size:16px;color:var(--secondary)">power_off</span>
            <span>Running without AI</span>
          </div>
          <button class="btn btn--ghost btn--sm" id="btn-shell-logout" title="Sign out to landing page" style="padding:4px 8px;cursor:pointer;background:none;border:none;">
            <span class="material-symbols-outlined" style="font-size:18px;color:var(--outline);">logout</span>
          </button>
          <button class="header-mobile-menu-btn" id="mobile-menu-btn" title="Open menu" aria-label="Open navigation menu">
            <span class="material-symbols-outlined" style="font-size:24px">menu</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Desktop Sidebar -->
    <aside class="app-sidebar" id="app-sidebar">
      <div style="padding: 10px 14px; border-bottom: 1px solid var(--outline-variant); background: var(--surface-container-lowest);">
        <a href="#/" style="display:flex;align-items:center;gap:8px;font-size:0.8125rem;font-weight:600;color:var(--primary);text-decoration:none;">
          <span class="material-symbols-outlined" style="font-size:16px;">arrow_back</span>
          <span>Return to Landing Page</span>
        </a>
      </div>
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
        CaseCompass v2.4 · Demo
      </div>
    </aside>

    <!-- Mobile Sidebar Overlay -->
    <div class="mobile-sidebar-overlay" id="mobile-overlay"></div>
    <div class="mobile-sidebar" id="mobile-sidebar">
      <div class="mobile-sidebar-header">
        <div>
          <div class="app-header__title">CaseCompass</div>
          <div class="app-header__tagline">From Court Orders to Clarity</div>
        </div>
        <button id="mobile-close-btn" style="background:none;border:none;cursor:pointer;color:var(--on-surface-variant);padding:4px;" aria-label="Close menu">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div style="padding: 10px 16px; border-bottom: 1px solid var(--outline-variant);">
        <a href="#/" style="display:flex;align-items:center;gap:8px;font-size:0.875rem;font-weight:600;color:var(--primary);text-decoration:none;">
          <span class="material-symbols-outlined" style="font-size:18px;">arrow_back</span>
          <span>Back to Landing Page</span>
        </a>
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

    <!-- Footer -->
    <footer class="app-footer">
      <div class="app-footer__content">
        <span class="material-symbols-outlined">info</span>
        <span>This organizes the record. It is not legal advice and does not predict outcomes.</span>
      </div>
    </footer>
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

  // Reviewer input updates localStorage
  const reviewerInput = document.getElementById('reviewer-name');
  reviewerInput?.addEventListener('change', (e) => {
    localStorage.setItem('casecompass_user', e.target.value.trim());
  });

  // Sign out button
  document.getElementById('btn-shell-logout')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('casecompass_auth');
    localStorage.removeItem('casecompass_user');
    window.location.hash = '#/';
  });
}
