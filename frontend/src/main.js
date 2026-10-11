/**
 * CaseCompass — Main Entry Point
 * Handles:
 * - Public Landing Page & Marketing Portal (from Stitch design)
 * - Authentication Gate (requires login for workspace routes)
 * - Protected Workspace App Shell & 7 Application Tabs:
 *   1. Cases
 *   2. Upload
 *   3. Timeline
 *   4. Review
 *   5. Ask
 *   6. Summary
 *   7. Trust
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

initStore();

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

  const isAuth = localStorage.getItem('casecompass_auth') === 'true';

  // 🔒 STRICT SECURITY GATE: Without logging in or signing up the workspace MUST NOT open
  if (!route.isLanding && !route.isAuthPage && !isAuth) {
    sessionStorage.setItem('show_login_needed_popup', 'true');
    window.location.hash = '#/';
    return;
  }

  // Clean up any modal overlay attached to body when switching views
  document.body.style.overflow = '';
  const lingeringModal = document.getElementById('login-modal-overlay');
  if (lingeringModal && lingeringModal.parentElement === document.body && !route.isLanding) {
    lingeringModal.remove();
  }

  if (route.isLanding || route.isAuthPage) {
    document.body.classList.remove('is-workspace');
    document.body.classList.add(route.isLanding ? 'is-landing' : 'is-auth-page');
    appRoot.className = route.isLanding ? 'is-landing' : 'is-auth-page';
    // Render full-width landing or auth page
    appRoot.innerHTML = route.render();
    if (typeof route.init === 'function') {
      route.init();
    }
  } else {
    document.body.classList.remove('is-landing', 'is-auth-page');
    document.body.classList.add('is-workspace');
    appRoot.className = 'is-workspace';
    // Render App Shell with sidebar navigation
    appRoot.innerHTML = renderShell(route.id);
    initShellListeners();

    // Inject active page content into main slot
    const contentSlot = document.getElementById('page-content');
    if (contentSlot) {
      contentSlot.innerHTML = route.render();
      if (typeof route.init === 'function') {
        route.init();
      }
    }
  }

  // Update browser document title
  document.title = route.title || 'CaseCompass — From Court Orders to Clarity';

  // Scroll to top on page navigation
  window.scrollTo(0, 0);
}

// Instantiate router with Landing page as default
const router = new Router(routes, '/');
router.onNavigate = (route) => {
  renderApp(route);
};

// Initial routing trigger
router.handleRoute();
