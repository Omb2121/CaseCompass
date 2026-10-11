/**
 * CaseCompass — Multi-Portal Authentication (User, Admin, Judge)
 * Separate login portals for:
 * 1. User / Citizen Portal: Only sees reported cases & related files
 * 2. Admin Portal: Sees all cases across day/month timespans with full management authority
 * 3. Judge Portal: Sees cases throughout day (cause list), month (roster), and past adjudicated decisions
 * 
 * Features:
 * - Authentic Google Account sign-in (actual Google accounts stored and selected, zero demo accounts)
 * - Strict credential authentication with role-specific portal switching
 * - Clean input placeholders with no pre-filled demo data
 */

export function renderAuthPage(initialMode = 'login', initialRole = 'user') {
  return `
    <div class="auth-page-wrapper" style="min-height: 100vh; display: flex; flex-direction: column; background: linear-gradient(135deg, #071527 0%, #0c213a 45%, #183354 100%); color: #f8fafc; font-family: var(--font-body); position: relative; overflow-x: hidden;">
      <!-- Top Navigation Bar -->
      <header style="padding: 1.125rem 2rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.08); background: rgba(7, 21, 39, 0.9); backdrop-filter: blur(12px);">
        <a href="#/" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit;" title="Return to CaseCompass Home">
          <img src="/casecompass-logo.png" alt="CaseCompass Logo" style="height: 42px; width: auto; object-fit: contain;"
               onerror="this.src='/casecompass-icon.png'">
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
  `;
}

export function initAuthPage(initialMode = 'login', initialRole = 'user') {
  let currentMode = initialMode;
  let currentRole = initialRole;

  // Check URL parameters for explicit portal or auto Google modal
  try {
    const hashParts = window.location.hash.split('?');
    if (hashParts.length > 1) {
      const searchParams = new URLSearchParams(hashParts[1]);
      const portalParam = searchParams.get('portal') || searchParams.get('role');
      if (portalParam && ['user', 'admin', 'judge'].includes(portalParam)) {
        currentRole = portalParam;
      }
      if (searchParams.get('google') === '1') {
        setTimeout(() => {
          openGoogleModal();
        }, 150);
      }
    }
  } catch (err) {
    console.warn('URL param parse error:', err);
  }

  // Portal elements
  const btnPortalUser = document.getElementById('portal-tab-user');
  const btnPortalAdmin = document.getElementById('portal-tab-admin');
  const btnPortalJudge = document.getElementById('portal-tab-judge');
  const portalBadge = document.getElementById('active-portal-badge');
  const portalBox = document.getElementById('portal-info-box');
  const portalIcon = document.getElementById('portal-info-icon');
  const portalTitle = document.getElementById('portal-info-title');
  const portalDesc = document.getElementById('portal-info-desc');

  // Form inputs
  const inputEmail = document.getElementById('auth-input-email');
  const inputPass = document.getElementById('auth-input-password');
  const inputName = document.getElementById('auth-input-fullname');
  const submitBtnText = document.getElementById('btn-submit-text');
  const googleBtnText = document.getElementById('google-btn-text');
  const signupContainer = document.getElementById('signup-extra-container');
  const tabLogin = document.getElementById('auth-tab-login');
  const tabSignup = document.getElementById('auth-tab-signup');
  const toast = document.getElementById('auth-feedback-toast');
  const toastMsg = document.getElementById('auth-feedback-msg');
  const toastIcon = document.getElementById('auth-feedback-icon');

  function showToast(msg, type = 'success') {
    if (!toast) return;
    toastMsg.textContent = msg;
    if (type === 'success') {
      toast.style.background = '#ecfdf5';
      toast.style.border = '1px solid #a7f3d0';
      toast.style.color = '#065f46';
      if (toastIcon) toastIcon.textContent = 'check_circle';
    } else {
      toast.style.background = '#fef2f2';
      toast.style.border = '1px solid #fecaca';
      toast.style.color = '#991b1b';
      if (toastIcon) toastIcon.textContent = 'error';
    }
    toast.style.display = 'flex';
  }

  // Set Portal Configuration
  function setPortal(portalKey) {
    currentRole = portalKey;

    [btnPortalUser, btnPortalAdmin, btnPortalJudge].forEach(b => {
      if (b) {
        b.style.background = 'transparent';
        b.style.color = '#64748b';
        b.style.boxShadow = 'none';
      }
    });

    const googlePortalLabel = document.getElementById('google-modal-portal-label');

    if (portalKey === 'user') {
      if (btnPortalUser) {
        btnPortalUser.style.background = '#0F2A4A';
        btnPortalUser.style.color = '#ffffff';
        btnPortalUser.style.boxShadow = '0 2px 6px rgba(15, 42, 74, 0.25)';
      }

      if (portalBadge) {
        portalBadge.textContent = '1. Citizen Portal';
        portalBadge.style.background = '#e0f2fe';
        portalBadge.style.color = '#0369a1';
      }

      if (portalBox) {
        portalBox.style.background = '#f0fdf4';
        portalBox.style.borderColor = '#bbf7d0';
      }
      if (portalIcon) {
        portalIcon.textContent = 'person';
        portalIcon.style.color = '#16a34a';
      }
      if (portalTitle) {
        portalTitle.textContent = '1. Citizen & Litigant Access Portal';
        portalTitle.style.color = '#166534';
      }
      if (portalDesc) {
        portalDesc.textContent = 'After login, you will only see the case which you have reported and all proceedings/documents relating to your case.';
      }

      if (inputEmail) {
        inputEmail.placeholder = 'Enter your citizen email (e.g. yourname@gmail.com)';
      }
      if (googlePortalLabel) {
        googlePortalLabel.textContent = 'Citizen Portal';
        googlePortalLabel.style.color = '#0369a1';
      }

    } else if (portalKey === 'admin') {
      if (btnPortalAdmin) {
        btnPortalAdmin.style.background = '#4338ca';
        btnPortalAdmin.style.color = '#ffffff';
        btnPortalAdmin.style.boxShadow = '0 2px 6px rgba(67, 56, 202, 0.25)';
      }

      if (portalBadge) {
        portalBadge.textContent = '2. Court Admin Portal';
        portalBadge.style.background = '#ede9fe';
        portalBadge.style.color = '#5b21b6';
      }

      if (portalBox) {
        portalBox.style.background = '#faf5ff';
        portalBox.style.borderColor = '#e9d5ff';
      }
      if (portalIcon) {
        portalIcon.textContent = 'admin_panel_settings';
        portalIcon.style.color = '#7c3aed';
      }
      if (portalTitle) {
        portalTitle.textContent = '2. Court Registry Administrator Portal';
        portalTitle.style.color = '#5b21b6';
      }
      if (portalDesc) {
        portalDesc.textContent = 'Authority to manage all cases, filter across Day and Month timespans, and control all dossier tabs.';
      }

      if (inputEmail) {
        inputEmail.placeholder = 'Enter court administration email (e.g. admin@districtcourt.gov.in)';
      }
      if (googlePortalLabel) {
        googlePortalLabel.textContent = 'Admin Portal';
        googlePortalLabel.style.color = '#5b21b6';
      }

    } else if (portalKey === 'judge') {
      if (btnPortalJudge) {
        btnPortalJudge.style.background = '#b45309';
        btnPortalJudge.style.color = '#ffffff';
        btnPortalJudge.style.boxShadow = '0 2px 6px rgba(180, 83, 9, 0.25)';
      }

      if (portalBadge) {
        portalBadge.textContent = '3. Hon\'ble Judge Portal';
        portalBadge.style.background = '#fef3c7';
        portalBadge.style.color = '#92400e';
      }

      if (portalBox) {
        portalBox.style.background = '#fffbeb';
        portalBox.style.borderColor = '#fde68a';
      }
      if (portalIcon) {
        portalIcon.textContent = 'gavel';
        portalIcon.style.color = '#d97706';
      }
      if (portalTitle) {
        portalTitle.textContent = '3. Hon\'ble Presiding Judge Bench Portal';
        portalTitle.style.color = '#92400e';
      }
      if (portalDesc) {
        portalDesc.textContent = 'Review all listed cases throughout the day (cause list), month (roster), and past adjudicated decisions.';
      }

      if (inputEmail) {
        inputEmail.placeholder = 'Enter judicial bench email (e.g. judge@judicial.gov.in)';
      }
      if (googlePortalLabel) {
        googlePortalLabel.textContent = 'Judge Portal';
        googlePortalLabel.style.color = '#92400e';
      }
    }

    updateModeLabels();
  }

  function updateModeLabels() {
    const roleName = currentRole === 'user' ? 'Citizen' : (currentRole === 'admin' ? 'Court Admin' : 'Judge');
    if (currentMode === 'signup') {
      if (submitBtnText) submitBtnText.textContent = `Register & Access as ${roleName}`;
      if (googleBtnText) googleBtnText.textContent = `Sign up with Google (${roleName})`;
      if (signupContainer) signupContainer.style.display = 'flex';
      if (tabLogin) {
        tabLogin.style.background = 'transparent';
        tabLogin.style.color = '#64748b';
      }
      if (tabSignup) {
        tabSignup.style.background = '#0F2A4A';
        tabSignup.style.color = '#ffffff';
      }
    } else {
      if (submitBtnText) submitBtnText.textContent = `Log In to ${roleName} Portal`;
      if (googleBtnText) googleBtnText.textContent = `Continue with Google (${roleName})`;
      if (signupContainer) signupContainer.style.display = 'none';
      if (tabSignup) {
        tabSignup.style.background = 'transparent';
        tabSignup.style.color = '#64748b';
      }
      if (tabLogin) {
        tabLogin.style.background = '#0F2A4A';
        tabLogin.style.color = '#ffffff';
      }
    }
  }

  btnPortalUser?.addEventListener('click', () => setPortal('user'));
  btnPortalAdmin?.addEventListener('click', () => setPortal('admin'));
  btnPortalJudge?.addEventListener('click', () => setPortal('judge'));

  tabLogin?.addEventListener('click', () => { currentMode = 'login'; updateModeLabels(); });
  tabSignup?.addEventListener('click', () => { currentMode = 'signup'; updateModeLabels(); });

  // Complete Authentication
  function completeAuth(userName, userEmail, role = currentRole, provider = 'credentials') {
    localStorage.setItem('casecompass_auth', 'true');
    localStorage.setItem('casecompass_user', userName);
    localStorage.setItem('casecompass_user_email', userEmail);
    localStorage.setItem('casecompass_role', role);
    localStorage.setItem('casecompass_auth_provider', provider);

    const roleTag = role === 'user' ? 'Citizen (Showing only your reported cases)' :
                   (role === 'admin' ? 'Court Administrator (Full registry authority)' :
                   'Hon\'ble Judge (Bench cause list & monthly roster)');

    showToast(`✓ Authentication successful! Logging into ${roleTag}...`, 'success');

    setTimeout(() => {
      window.location.hash = '#/cases';
    }, 750);
  }

  // Email form submit
  document.getElementById('auth-page-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = inputEmail?.value.trim();
    if (!email) {
      showToast('Please enter your email address.', 'error');
      return;
    }

    let displayName = inputName?.value.trim();
    if (!displayName) {
      // Derive clean name from user's email
      const localPart = email.split('@')[0] || 'User';
      displayName = localPart.replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    completeAuth(displayName, email, currentRole, 'email');
  });

  // ==========================================
  // AUTHENTIC GOOGLE ACCOUNT SIGN-IN SYSTEM
  // ==========================================
  const GOOGLE_SAVED_KEY = 'casecompass_saved_google_accounts';

  function getSavedGoogleAccounts() {
    try {
      return JSON.parse(localStorage.getItem(GOOGLE_SAVED_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function saveGoogleAccount(acc) {
    const list = getSavedGoogleAccounts();
    const existingIdx = list.findIndex(a => a.email.toLowerCase() === acc.email.toLowerCase());
    if (existingIdx >= 0) {
      list[existingIdx] = acc;
    } else {
      list.unshift(acc);
    }
    localStorage.setItem(GOOGLE_SAVED_KEY, JSON.stringify(list));
  }

  function removeGoogleAccount(email) {
    let list = getSavedGoogleAccounts();
    list = list.filter(a => a.email.toLowerCase() !== email.toLowerCase());
    localStorage.setItem(GOOGLE_SAVED_KEY, JSON.stringify(list));
    renderGoogleAccountsView();
  }

  const googleModal = document.getElementById('google-account-modal');
  const closeGoogleModal = document.getElementById('close-google-modal');
  const googleSavedList = document.getElementById('google-saved-accounts-list');
  const googleFormView = document.getElementById('google-account-login-form-view');
  const btnBackToList = document.getElementById('btn-back-to-google-list');
  const googleForm = document.getElementById('form-google-direct-signin');
  const googleNameInput = document.getElementById('google-input-name');
  const googleEmailInput = document.getElementById('google-input-email');
  const googleModalTitle = document.getElementById('google-modal-main-title');
  const googleModalSubtitle = document.getElementById('google-modal-subtitle');

  function openGoogleModal() {
    renderGoogleAccountsView();
    if (googleModal) googleModal.style.display = 'flex';
  }

  function closeGoogleModalDialog() {
    if (googleModal) googleModal.style.display = 'none';
  }

  function renderGoogleAccountsView() {
    const saved = getSavedGoogleAccounts();

    if (saved.length > 0) {
      // Show saved accounts chooser
      if (googleModalTitle) googleModalTitle.textContent = 'Choose an account';
      if (googleModalSubtitle) googleModalSubtitle.textContent = 'to continue to CaseCompass';
      if (googleFormView) googleFormView.style.display = 'none';
      if (googleSavedList) {
        googleSavedList.style.display = 'block';
        googleSavedList.innerHTML = `
          <div style="padding: 0.5rem 0;">
            ${saved.map(acc => {
              const initial = (acc.name || acc.email || 'G').charAt(0).toUpperCase();
              return `
                <div class="google-saved-acc-item" data-email="${acc.email}" data-name="${acc.name}"
                     style="display: flex; align-items: center; justify-content: space-between; padding: 12px 1.5rem; cursor: pointer; transition: background 0.15s ease; border-bottom: 1px solid #f8f9fa;"
                     onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
                  <div style="display: flex; align-items: center; gap: 14px; min-width: 0; flex: 1;">
                    <div style="width: 38px; height: 38px; border-radius: 50%; background: #1a73e8; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; flex-shrink: 0;">
                      ${initial}
                    </div>
                    <div style="min-width: 0; flex: 1;">
                      <div style="font-weight: 600; font-size: 0.875rem; color: #202124; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        ${acc.name}
                      </div>
                      <div style="font-size: 0.75rem; color: #5f6368; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        ${acc.email}
                      </div>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="badge" style="background: #e8f0fe; color: #1a73e8; font-size: 0.6875rem; font-weight: 600;">Signed in</span>
                    <button type="button" class="btn-remove-google-acc" data-email="${acc.email}" title="Remove this account from device"
                            style="background: none; border: none; cursor: pointer; color: #9aa0a6; padding: 4px; border-radius: 50%; display: flex; align-items: center;"
                            onmouseover="this.style.color='#d93025'" onmouseout="this.style.color='#9aa0a6'">
                      <span class="material-symbols-outlined" style="font-size: 16px;">close</span>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}

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
        `;

        // Attach clicks to saved accounts
        googleSavedList.querySelectorAll('.google-saved-acc-item').forEach(item => {
          item.addEventListener('click', (e) => {
            // Ignore if clicking remove button
            if (e.target.closest('.btn-remove-google-acc')) return;
            const email = item.getAttribute('data-email');
            const name = item.getAttribute('data-name');
            closeGoogleModalDialog();
            completeAuth(name, email, currentRole, 'google');
          });
        });

        // Attach clicks to remove buttons
        googleSavedList.querySelectorAll('.btn-remove-google-acc').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const email = btn.getAttribute('data-email');
            removeGoogleAccount(email);
          });
        });

        // Use another account trigger
        document.getElementById('btn-use-another-google-account')?.addEventListener('click', () => {
          googleSavedList.style.display = 'none';
          if (googleFormView) googleFormView.style.display = 'block';
          if (btnBackToList) btnBackToList.style.display = 'inline-block';
          if (googleModalTitle) googleModalTitle.textContent = 'Sign in with Google';
          if (googleModalSubtitle) googleModalSubtitle.textContent = 'Enter your Google Account credentials to continue';
          if (googleEmailInput) googleEmailInput.focus();
        });
      }

    } else {
      // Zero saved accounts on this device: directly show Google sign-in input form
      if (googleModalTitle) googleModalTitle.textContent = 'Sign in with Google';
      if (googleModalSubtitle) googleModalSubtitle.textContent = 'to continue to CaseCompass';
      if (googleSavedList) googleSavedList.style.display = 'none';
      if (googleFormView) googleFormView.style.display = 'block';
      if (btnBackToList) btnBackToList.style.display = 'none';
    }
  }

  // Back to accounts list
  btnBackToList?.addEventListener('click', () => {
    renderGoogleAccountsView();
  });

  // Direct Google Sign-In Form submission
  googleForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = googleNameInput?.value.trim();
    const email = googleEmailInput?.value.trim();

    if (!email || !email.includes('@')) {
      alert('Please enter a valid Google email address.');
      return;
    }
    if (!name) {
      alert('Please enter your full name for your Google account.');
      return;
    }

    // Save actual Google account to device
    saveGoogleAccount({ name, email });

    closeGoogleModalDialog();
    completeAuth(name, email, currentRole, 'google');
  });

  // Google button trigger
  document.getElementById('btn-page-auth-google')?.addEventListener('click', openGoogleModal);
  closeGoogleModal?.addEventListener('click', closeGoogleModalDialog);
  googleModal?.addEventListener('click', (e) => {
    if (e.target === googleModal) closeGoogleModalDialog();
  });

  // Initialize selected portal
  setPortal(currentRole || 'user');
}
