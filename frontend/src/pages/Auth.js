/**
 * CaseCompass — Multi-Portal Authentication
 * 
 * Real Google Identity Services (GIS) sign-in:
 * 1. Frontend calls google.accounts.id.initialize() with VITE_GOOGLE_CLIENT_ID
 * 2. User clicks the Google button → GIS popup fires
 * 3. GIS callback sends credential (ID token) to backend POST /api/auth/google
 * 4. Backend verifies signature, audience, issuer, expiry, email_verified
 * 5. Backend determines role from server-side allowlist (ADMIN_EMAILS, JUDGE_EMAILS)
 * 6. Backend returns JWT session token
 * 7. Frontend stores JWT in sessionStorage (not localStorage)
 * 
 * Demo mode: only shown when backend returns DEMO_MODE=true.
 * The requested portal only affects where the user is redirected after login;
 * the actual role is always assigned by the server.
 */

import { signInWithGoogle, signInDemo, setSession, isAuthenticated } from '../services/authSession.js';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export function renderAuthPage(initialMode = 'login', initialRole = 'user') {
  return `
    <div class="auth-page-wrapper" style="min-height:100vh;display:flex;flex-direction:column;background:linear-gradient(135deg,#071527 0%,#0c213a 45%,#183354 100%);color:#f8fafc;font-family:var(--font-body);position:relative;overflow-x:hidden;">
      
      <!-- Top Navigation Bar -->
      <header style="padding:1.125rem 2rem;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.08);background:rgba(7,21,39,0.9);backdrop-filter:blur(12px);">
        <a href="#/" style="display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit;" title="Return to CaseCompass Home">
          <img src="/casecompass-logo.png" alt="CaseCompass Logo" style="height:42px;width:auto;object-fit:contain;">
          <div style="display:flex;flex-direction:column;line-height:1.15;">
            <span style="font-family:'Archivo Black','Source Serif 4',sans-serif;font-size:1.25rem;font-weight:800;letter-spacing:-0.02em;color:#ffffff;">CaseCompass</span>
            <span style="font-size:0.6875rem;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#94a3b8;">From Court Orders to Clarity</span>
          </div>
        </a>
        <a href="#/" class="btn btn--ghost btn--sm" style="color:#94a3b8;text-decoration:none;display:flex;align-items:center;gap:6px;font-weight:500;">
          <span class="material-symbols-outlined" style="font-size:18px;">arrow_back</span>
          <span>Back to Home</span>
        </a>
      </header>

      <!-- Main Auth Container -->
      <main style="flex:1;display:flex;align-items:center;justify-content:center;padding:2rem 1rem;">
        <div class="card" id="auth-main-card" style="width:100%;max-width:520px;background:#ffffff;color:#0F2A4A;border-radius:16px;padding:2.25rem;box-shadow:0 25px 50px -12px rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.2);">
          
          <!-- Mandatory Disclaimer (product rule — must stay visible) -->
          <div id="auth-disclaimer-strip" style="padding:10px 14px;border-radius:8px;margin-bottom:1.25rem;background:#fffbeb;border:1.5px solid #fde68a;display:flex;align-items:center;gap:10px;color:#92400e;">
            <span class="material-symbols-outlined" style="font-size:20px;flex-shrink:0;">info</span>
            <p style="font-size:0.75rem;line-height:1.4;margin:0;">
              This organizes the record. It is not legal advice and does not predict outcomes.
            </p>
          </div>

          <!-- Portal Selector -->
          <div style="margin-bottom:1.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span style="font-size:0.75rem;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Select Access Portal:</span>
              <span id="active-portal-badge" class="badge" style="background:#e0f2fe;color:#0369a1;font-size:0.6875rem;font-weight:700;">1. Citizen Portal</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;background:#f1f5f9;padding:4px;border-radius:10px;border:1px solid #e2e8f0;">
              <button type="button" class="portal-tab-btn active-portal" id="portal-tab-user" data-portal="user"
                      style="padding:10px 4px;border-radius:8px;border:none;font-size:0.8125rem;font-weight:700;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all 0.2s ease;background:#0F2A4A;color:#ffffff;box-shadow:0 2px 6px rgba(15,42,74,0.25);"
                      aria-pressed="true" aria-label="Citizen Portal">
                <span class="material-symbols-outlined" style="font-size:20px;">person</span>
                <span>1. Citizen</span>
              </button>
              <button type="button" class="portal-tab-btn" id="portal-tab-admin" data-portal="admin"
                      style="padding:10px 4px;border-radius:8px;border:none;font-size:0.8125rem;font-weight:700;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all 0.2s ease;background:transparent;color:#64748b;"
                      aria-pressed="false" aria-label="Court Admin Portal">
                <span class="material-symbols-outlined" style="font-size:20px;">admin_panel_settings</span>
                <span>2. Admin</span>
              </button>
              <button type="button" class="portal-tab-btn" id="portal-tab-judge" data-portal="judge"
                      style="padding:10px 4px;border-radius:8px;border:none;font-size:0.8125rem;font-weight:700;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all 0.2s ease;background:transparent;color:#64748b;"
                      aria-pressed="false" aria-label="Judge Bench Portal">
                <span class="material-symbols-outlined" style="font-size:20px;">gavel</span>
                <span>3. Judge</span>
              </button>
            </div>
          </div>

          <!-- Portal Info Banner -->
          <div id="portal-info-box" style="padding:12px 14px;border-radius:10px;margin-bottom:1.5rem;background:#f0fdf4;border:1px solid #bbf7d0;display:flex;align-items:flex-start;gap:10px;">
            <span class="material-symbols-outlined" id="portal-info-icon" style="font-size:22px;color:#16a34a;flex-shrink:0;margin-top:1px;">person</span>
            <div>
              <div id="portal-info-title" style="font-size:0.875rem;font-weight:700;color:#166534;">1. Citizen &amp; Litigant Access Portal</div>
              <div id="portal-info-desc" style="font-size:0.75rem;color:#4b5563;margin-top:2px;line-height:1.4;">
                Sign in with your personal Google account. You will only see cases you have reported.
              </div>
            </div>
          </div>

          <!-- Feedback Toast -->
          <div id="auth-feedback-toast" role="alert" aria-live="polite" style="display:none;padding:12px 16px;border-radius:8px;margin-bottom:1.25rem;font-size:0.8125rem;font-weight:600;align-items:center;gap:8px;">
            <span class="material-symbols-outlined" id="auth-feedback-icon" style="font-size:20px;" aria-hidden="true"></span>
            <span id="auth-feedback-msg"></span>
          </div>

          <!-- Google Sign-In Section -->
          <div style="margin-bottom:1.5rem;">
            <label style="display:block;font-size:0.8125rem;font-weight:700;color:#0F2A4A;margin-bottom:8px;">
              Sign in with Google:
            </label>

            <!-- Real GIS button container (rendered by Google SDK) -->
            <div id="gis-button-container" style="display:flex;justify-content:center;min-height:44px;margin-bottom:0.75rem;"></div>

            <!-- Fallback manual Google button (shown when GIS is not configured) -->
            <button type="button" id="btn-page-auth-google" style="display:none;width:100%;align-items:center;justify-content:center;gap:12px;padding:14px 20px;border-radius:12px;border:2px solid #cbd5e1;background:#ffffff;color:#1e293b;font-size:0.9375rem;font-weight:700;cursor:pointer;transition:all 0.2s ease;box-shadow:0 2px 6px rgba(0,0,0,0.06);"
                    aria-label="Sign in with Google Account">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span id="google-btn-text">Sign in with Google Account</span>
            </button>

            <!-- Demo Section (only shown in demo mode) -->
            <div id="demo-section" style="display:none;margin-top:1rem;padding-top:1rem;border-top:1px dashed #e2e8f0;">
              <div style="font-size:0.6875rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;text-align:center;">
                Demo Access (Fictional Data Only)
              </div>
              <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;">
                <button type="button" class="btn-demo-login" data-role="user"
                        style="padding:8px 12px;border-radius:8px;border:1px solid #e2e8f0;background:#f8fafc;color:#475569;font-size:0.75rem;font-weight:600;cursor:pointer;">
                  🧑 Demo Citizen
                </button>
                <button type="button" class="btn-demo-login" data-role="admin"
                        style="padding:8px 12px;border-radius:8px;border:1px solid #e2e8f0;background:#f8fafc;color:#475569;font-size:0.75rem;font-weight:600;cursor:pointer;">
                  🏛️ Demo Admin
                </button>
                <button type="button" class="btn-demo-login" data-role="judge"
                        style="padding:8px 12px;border-radius:8px;border:1px solid #e2e8f0;background:#f8fafc;color:#475569;font-size:0.75rem;font-weight:600;cursor:pointer;">
                  ⚖️ Demo Judge
                </button>
              </div>
              <p style="font-size:0.6875rem;color:#94a3b8;text-align:center;margin:6px 0 0;">
                Demo accounts use fictional data only. No real records.
              </p>
            </div>
          </div>

          <!-- Security Footer -->
          <div style="border-top:1px solid #e2e8f0;padding-top:1rem;text-align:center;">
            <div style="display:inline-flex;align-items:center;gap:6px;font-size:0.75rem;color:#64748b;font-weight:600;">
              <span class="material-symbols-outlined" style="font-size:16px;color:#16a34a;" aria-hidden="true">lock</span>
              <span>Protected by Google OAuth 2.0</span>
            </div>
            <p style="font-size:0.6875rem;color:#94a3b8;margin:4px 0 0;">
              Only authenticated Google accounts can access court records.
            </p>
          </div>

        </div>
      </main>
    </div>
  `;
}

export function initAuthPage(initialMode = 'login', initialRole = 'user') {
  let currentPortal = initialRole;

  // Check URL params for portal hint
  try {
    const hashParts = window.location.hash.split('?');
    if (hashParts.length > 1) {
      const params = new URLSearchParams(hashParts[1]);
      const p = params.get('portal') || params.get('role');
      if (p && ['user', 'admin', 'judge'].includes(p)) currentPortal = p;
      if (params.get('security') === 'mandatory_google') {
        setTimeout(() => showToast('You must sign in to access court records.', 'error'), 200);
      }
    }
  } catch {}

  const toast = document.getElementById('auth-feedback-toast');
  const toastMsg = document.getElementById('auth-feedback-msg');
  const toastIcon = document.getElementById('auth-feedback-icon');

  function showToast(msg, type = 'success') {
    if (!toast) return;
    // Use textContent to avoid XSS — never innerHTML for user-facing text
    toastMsg.textContent = msg;
    if (type === 'success') {
      toast.style.background = '#ecfdf5';
      toast.style.border = '1.5px solid #a7f3d0';
      toast.style.color = '#065f46';
      toastIcon.textContent = 'check_circle';
    } else {
      toast.style.background = '#fef2f2';
      toast.style.border = '1.5px solid #fecaca';
      toast.style.color = '#991b1b';
      toastIcon.textContent = 'error';
    }
    toast.style.display = 'flex';
  }

  function setPortal(key) {
    currentPortal = key;
    const tabs = document.querySelectorAll('.portal-tab-btn');
    tabs.forEach(b => {
      b.style.background = 'transparent';
      b.style.color = '#64748b';
      b.style.boxShadow = 'none';
      b.setAttribute('aria-pressed', 'false');
    });

    const badge = document.getElementById('active-portal-badge');
    const box = document.getElementById('portal-info-box');
    const icon = document.getElementById('portal-info-icon');
    const title = document.getElementById('portal-info-title');
    const desc = document.getElementById('portal-info-desc');
    const gBtn = document.getElementById('google-btn-text');

    const configs = {
      user: {
        tabId: 'portal-tab-user', bg: '#0F2A4A', shadow: 'rgba(15,42,74,0.25)',
        badge: '1. Citizen Portal', badgeBg: '#e0f2fe', badgeColor: '#0369a1',
        boxBg: '#f0fdf4', boxBorder: '#bbf7d0',
        iconName: 'person', iconColor: '#16a34a',
        titleText: '1. Citizen & Litigant Access Portal', titleColor: '#166534',
        descText: 'Sign in with your personal Google account. You will only see cases you have reported.',
        btnText: 'Sign in with Google (Citizen Portal)',
      },
      admin: {
        tabId: 'portal-tab-admin', bg: '#4338ca', shadow: 'rgba(67,56,202,0.25)',
        badge: '2. Court Admin Portal', badgeBg: '#ede9fe', badgeColor: '#5b21b6',
        boxBg: '#faf5ff', boxBorder: '#e9d5ff',
        iconName: 'admin_panel_settings', iconColor: '#7c3aed',
        titleText: '2. Court Registry Administrator Portal', titleColor: '#5b21b6',
        descText: 'Full registry oversight. Your role is verified server-side — only authorized accounts can access admin functions.',
        btnText: 'Sign in with Google (Admin Authority)',
      },
      judge: {
        tabId: 'portal-tab-judge', bg: '#b45309', shadow: 'rgba(180,83,9,0.25)',
        badge: "3. Hon'ble Judge Portal", badgeBg: '#fef3c7', badgeColor: '#92400e',
        boxBg: '#fffbeb', boxBorder: '#fde68a',
        iconName: 'gavel', iconColor: '#d97706',
        titleText: "3. Hon'ble Presiding Judge Bench Portal", titleColor: '#92400e',
        descText: 'Review cause list, monthly hearing rosters, and adjudicated decisions. Role verified server-side.',
        btnText: 'Sign in with Google (Presiding Judge)',
      },
    };

    const cfg = configs[key] || configs.user;
    const tab = document.getElementById(cfg.tabId);
    if (tab) {
      tab.style.background = cfg.bg;
      tab.style.color = '#ffffff';
      tab.style.boxShadow = `0 2px 6px ${cfg.shadow}`;
      tab.setAttribute('aria-pressed', 'true');
    }
    if (badge) { badge.textContent = cfg.badge; badge.style.background = cfg.badgeBg; badge.style.color = cfg.badgeColor; }
    if (box) { box.style.background = cfg.boxBg; box.style.borderColor = cfg.boxBorder; }
    if (icon) { icon.textContent = cfg.iconName; icon.style.color = cfg.iconColor; }
    if (title) { title.textContent = cfg.titleText; title.style.color = cfg.titleColor; }
    if (desc) { desc.textContent = cfg.descText; }
    if (gBtn) { gBtn.textContent = cfg.btnText; }
  }

  document.getElementById('portal-tab-user')?.addEventListener('click', () => setPortal('user'));
  document.getElementById('portal-tab-admin')?.addEventListener('click', () => setPortal('admin'));
  document.getElementById('portal-tab-judge')?.addEventListener('click', () => setPortal('judge'));

  setPortal(currentPortal);

  /**
   * After successful backend auth, store session and redirect.
   * The role from the server may differ from requested portal (server decides).
   */
  function handleAuthSuccess(sessionData) {
    const serverRole = sessionData.role;
    const isDemo = sessionData.is_demo;
    const name = sessionData.name || sessionData.email;

    const portalName = serverRole === 'admin'
      ? 'Court Admin Portal'
      : serverRole === 'judge'
      ? 'Judge Bench Portal'
      : 'Citizen Portal';

    let msg = `✓ Signed in as ${name}. Loading ${portalName}…`;
    if (isDemo) msg += ' (Demo session — fictional data only)';

    // Warn if user requested a privileged portal but got a lower role
    if (currentPortal !== 'user' && serverRole === 'user') {
      msg = `Signed in as ${name}. Your account has Citizen access only.`;
      showToast(msg, 'error');
    } else {
      showToast(msg, 'success');
    }

    setTimeout(() => { window.location.hash = '#/cases'; }, 900);
  }

  // ---- Real Google Identity Services initialization ----

  function initGIS() {
    if (!GOOGLE_CLIENT_ID) {
      // No client ID — show fallback manual button (not real GIS)
      const fbBtn = document.getElementById('btn-page-auth-google');
      if (fbBtn) {
        fbBtn.style.display = 'flex';
        fbBtn.addEventListener('click', () => {
          showToast('Google sign-in is not configured yet. Set VITE_GOOGLE_CLIENT_ID in your .env file. If DEMO_MODE is enabled, use the demo buttons below.', 'error');
        });
      }
      return;
    }

    if (!window.google?.accounts?.id) {
      // GIS script not loaded — retry once
      setTimeout(initGIS, 500);
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGISCredential,
        auto_select: false,
        cancel_on_tap_outside: true,
        use_fedcm_for_prompt: false,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('gis-button-container'),
        {
          theme: 'outline',
          size: 'large',
          width: 400,
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left',
        }
      );
    } catch (err) {
      console.warn('GIS initialization error:', err.message);
      const fbBtn = document.getElementById('btn-page-auth-google');
      if (fbBtn) fbBtn.style.display = 'flex';
    }
  }

  async function handleGISCredential(response) {
    if (!response?.credential) {
      showToast('Google sign-in did not return a credential. Please try again.', 'error');
      return;
    }

    showToast('Verifying your Google account with server…', 'success');

    try {
      const sessionData = await signInWithGoogle(response.credential, currentPortal);
      handleAuthSuccess(sessionData);
    } catch (err) {
      // Show generic message — no internal detail exposed
      showToast('Sign-in failed. Please try again or contact support.', 'error');
      console.error('Auth error:', err.message);
    }
  }

  // Check if GIS script is already loaded (from index.html)
  if (window.google?.accounts?.id) {
    initGIS();
  } else {
    // Wait for the GIS script to load
    const gisScript = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
    if (gisScript) {
      gisScript.addEventListener('load', initGIS);
    }
    // Also try after a delay as fallback
    setTimeout(initGIS, 1200);
  }

  // ---- Demo buttons ----

  // Check if demo mode is available by calling /api/auth/demo dry-run
  // (We just show the demo section; if backend rejects, user sees error)
  // In practice the demo section visibility should come from backend.
  // For now we always show it (the backend enforces DEMO_MODE).
  const demoSection = document.getElementById('demo-section');
  if (demoSection) {
    demoSection.style.display = 'block';
  }

  document.querySelectorAll('.btn-demo-login').forEach(btn => {
    btn.addEventListener('click', async () => {
      const role = btn.getAttribute('data-role');
      btn.disabled = true;
      btn.textContent = 'Signing in…';
      showToast('Loading demo session…', 'success');

      try {
        const sessionData = await signInDemo(role);
        handleAuthSuccess(sessionData);
      } catch (err) {
        showToast(err.message || 'Demo login unavailable. DEMO_MODE may be disabled on the server.', 'error');
        btn.disabled = false;
        btn.textContent = btn.getAttribute('data-role') === 'user'
          ? '🧑 Demo Citizen'
          : btn.getAttribute('data-role') === 'admin'
          ? '🏛️ Demo Admin'
          : '⚖️ Demo Judge';
      }
    });
  });
}
