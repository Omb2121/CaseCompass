/**
 * CaseCompass — Main Entry Point
 * Handles:
 * - Public Landing Page & Marketing Portal
 * - Authentication Gate (requires signed-in session for workspace routes)
 * - Protected Workspace App Shell & 7 Application Tabs:
 *   1. Cases  2. Upload  3. Timeline  4. Review  5. Ask  6. Summary  7. Trust
 *
 * Auth: sessions stored in sessionStorage via authSession.js (JWT from backend).
 * Backward-compat: if old localStorage flags exist (demo/development), they are
 * honored until the user signs out, then migrated. This avoids breaking anyone
 * currently using the demo session after deployment.
 */

import './styles/index.css';
import './styles/landing.css';
import { Router } from './router.js';
import { renderShell, initShellListeners } from './components/Shell.js';

import { renderLandingPage, initLandingPage } from './pages/Landing.js';
import { renderAuthPage, initAuthPage } from './pages/Auth.js';
import { renderCasesPage, initCasesPage } from './pages/Cases.js';
import { renderUploadPage, initUploadPage } from './pages/Upload.js';
import { renderTimelinePage, initTimelinePage } from './pages/Timeline.js';
import { renderReviewPage, initReviewPage } from './pages/Review.js';
import { renderAskPage, initAskPage } from './pages/Ask.js';
import { renderSummaryPage, initSummaryPage } from './pages/Summary.js';
import { renderTrustPage, initTrustPage } from './pages/Trust.js';

import { initStore } from './api.js';
import { isAuthenticated, getSession, setSession } from './services/authSession.js';
import { initAnimations, destroyAnimations } from './services/animations.js';

initStore();

// ---- Backward-compatibility: migrate old localStorage demo sessions ----
// If user had a demo session from before the auth rewrite, preserve it.
function isMigratedOrAuthenticated() {
  if (isAuthenticated()) return true;

  // Check old-style localStorage flags (from pre-auth-rewrite era)
  const oldAuth = localStorage.getItem('casecompass_auth');
  const oldGoogleAuth = localStorage.getItem('casecompass_google_auth');
  if (oldAuth === 'true' && oldGoogleAuth === 'true') {
    // Migrate to sessionStorage session format (no JWT — frontend-only mode)
    const oldRole = localStorage.getItem('casecompass_role') || 'user';
    const oldEmail = localStorage.getItem('casecompass_user_email') || 'demo@casecompass.demo';
    const oldName = localStorage.getItem('casecompass_user') || 'Demo User';
    setSession({
      token: null,           // no real JWT (frontend-only mode)
      user_id: 'legacy',
      email: oldEmail,
      name: oldName,
      role: oldRole,
      is_demo: true,
      _legacy: true,         // flag so Shell can warn the user
    });
    return true;
  }

  return false;
}

const routes = [
  {
    path: '/',
    id: 'landing',
    title: 'CaseCompass — From Court Orders to Clarity',
    render: renderLandingPage,
    init: initLandingPage,
    isLanding: true,
  },
  {
    path: '/login',
    id: 'login',
    title: 'Sign In — CaseCompass Workspace',
    render: () => renderAuthPage('login'),
    init: () => initAuthPage('login'),
    isAuthPage: true,
  },
  {
    path: '/signup',
    id: 'signup',
    title: 'Sign Up — CaseCompass Workspace',
    render: () => renderAuthPage('signup'),
    init: () => initAuthPage('signup'),
    isAuthPage: true,
  },
  {
    path: '/cases',
    id: 'cases',
    title: '1. Cases — CaseCompass Workspace',
    render: renderCasesPage,
    init: initCasesPage,
  },
  {
    path: '/upload',
    id: 'upload',
    title: '2. Upload Documents — CaseCompass Workspace',
    render: renderUploadPage,
    init: initUploadPage,
  },
  {
    path: '/timeline',
    id: 'timeline',
    title: '3. Case Timeline — CaseCompass Workspace',
    render: renderTimelinePage,
    init: initTimelinePage,
  },
  {
    path: '/review',
    id: 'review',
    title: '4. Evidence Review — CaseCompass Workspace',
    render: renderReviewPage,
    init: initReviewPage,
  },
  {
    path: '/ask',
    id: 'ask',
    title: '5. Ask Docket — CaseCompass Workspace',
    render: renderAskPage,
    init: initAskPage,
  },
  {
    path: '/summary',
    id: 'summary',
    title: '6. Executive Summary — CaseCompass Workspace',
    render: renderSummaryPage,
    init: initSummaryPage,
  },
  {
    path: '/trust',
    id: 'trust',
    title: '7. Trust & Verification — CaseCompass Workspace',
    render: renderTrustPage,
    init: initTrustPage,
  },
];

const appRoot = document.getElementById('app');

function renderApp(route) {
  if (!appRoot) return;

  // Auth gate: use new sessionStorage check with legacy fallback
  if (!route.isLanding && !route.isAuthPage && !isMigratedOrAuthenticated()) {
    sessionStorage.setItem('show_login_needed_popup', 'true');
    window.location.hash = '#/login?security=mandatory_google';
    return;
  }

  // Clean up lingering modal overlays
  document.body.style.overflow = '';
  const lingeringModal = document.getElementById('login-modal-overlay');
  if (lingeringModal && lingeringModal.parentElement === document.body && !route.isLanding) {
    lingeringModal.remove();
  }

  // Route animation cleanup
  destroyAnimations();

  if (route.isLanding || route.isAuthPage) {
    document.body.classList.remove('is-workspace');
    document.body.classList.add(route.isLanding ? 'is-landing' : 'is-auth-page');
    appRoot.className = route.isLanding ? 'is-landing' : 'is-auth-page';
    appRoot.innerHTML = route.render();
    if (typeof route.init === 'function') route.init();
    initAnimations(appRoot);
  } else {
    document.body.classList.remove('is-landing', 'is-auth-page');
    document.body.classList.add('is-workspace');
    appRoot.className = 'is-workspace';
    appRoot.innerHTML = renderShell(route.id);
    initShellListeners();

    const contentSlot = document.getElementById('page-content');
    if (contentSlot) {
      contentSlot.innerHTML = route.render();
      if (typeof route.init === 'function') route.init();
      initAnimations(contentSlot);
    }
  }

  document.title = route.title || 'CaseCompass — From Court Orders to Clarity';
  window.scrollTo(0, 0);
}

const router = new Router(routes, '/');
router.onNavigate = (route) => renderApp(route);
router.handleRoute();
