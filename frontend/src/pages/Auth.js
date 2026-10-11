/**
 * CaseCompass — Multi-Portal Authentication (User, Admin, Judge)
 * Separate login portals for:
 * 1. User / Citizen Portal: Only sees reported cases & related files
 * 2. Admin Portal: Sees all cases across day/month timespans with full management authority
 * 3. Judge Portal: Sees cases throughout day (cause list), month (roster), and past adjudicated decisions
 * 
 * Supports:
 * - Direct role switching tabs
 * - "Continue with Google" for each persona
 * - Email & Password authentication
 * - Fast-track sample sign-in for each portal
 */

export function renderAuthPage(initialMode = 'login', initialRole = 'user') {
  const isSignUp = initialMode === 'signup';

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
                Citizen Portal
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
                <input type="text" id="auth-input-fullname" placeholder="e.g. Ramesh Kumar"
                       style="width: 100%; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 0.875rem;">
              </div>
            </div>

            <!-- Email Field -->
            <div>
              <label id="auth-label-email" style="display: block; font-size: 0.8125rem; font-weight: 700; color: #0F2A4A; margin-bottom: 4px;">
                Email Address *
              </label>
              <input type="email" id="auth-input-email" required placeholder="ramesh.kumar@citizen.in"
                     value="ramesh.kumar@citizen.in"
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
                     value="citizen@2026"
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

          <!-- Quick One-Click Portal Demo Helper -->
          <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid #f1f5f9; display: flex; flex-direction: column; gap: 8px;">
            <button type="button" id="btn-quick-portal-login"
                    style="background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 9px 12px; border-radius: 8px; font-size: 0.8125rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.15s ease;"
                    onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='#eff6ff'">
              <span class="material-symbols-outlined" id="quick-login-icon" style="font-size: 17px;">verified_user</span>
              <span id="quick-login-label">Quick Sign-In as Citizen (Ramesh Kumar)</span>
            </button>
          </div>

        </div>
      </main>

      <!-- Google OAuth Account Picker Dialog -->
      <div id="google-account-modal" style="display: none; position: fixed; inset: 0; z-index: 1000; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(4px); align-items: center; justify-content: center; padding: 1rem;">
        <div style="background: #ffffff; color: #202124; width: 100%; max-width: 460px; border-radius: 14px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35); overflow: hidden; animation: slideUp 0.25s ease;">
          <div style="padding: 1.25rem 1.5rem 1rem; border-bottom: 1px solid #e8eaed; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <div>
                <h3 style="font-size: 1.0625rem; font-weight: 700; color: #202124; margin: 0;">Sign in with Google</h3>
                <p style="font-size: 0.75rem; color: #5f6368; margin: 2px 0 0;" id="google-modal-subtitle">Choose an account to continue to CaseCompass</p>
              </div>
            </div>
            <button id="close-google-modal" style="background: none; border: none; cursor: pointer; color: #5f6368; padding: 4px;">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Dynamic Role-Specific Google Accounts List -->
          <div id="google-accounts-container" style="padding: 0.5rem 0;">
            <!-- Injected dynamically via JS based on selected portal -->
          </div>

          <!-- Custom Google Account input option -->
          <div id="google-acc-custom-trigger"
               style="display: flex; align-items: center; gap: 14px; padding: 12px 1.5rem; cursor: pointer; transition: background 0.15s ease; border-top: 1px solid #f1f3f4;"
               onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #f1f3f4; color: #5f6368; display: flex; align-items: center; justify-content: center;">
              <span class="material-symbols-outlined" style="font-size: 20px;">person_add</span>
            </div>
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: 0.875rem; color: #202124;">Use another Google account</div>
            </div>
          </div>

          <div id="google-custom-input-box" style="display: none; padding: 12px 1.5rem; background: #f8f9fa; border-top: 1px solid #e8eaed;">
            <input type="text" id="custom-google-name" placeholder="Full Name"
                   style="width: 100%; padding: 8px 12px; border: 1px solid #dadce0; border-radius: 6px; font-size: 0.8125rem; margin-bottom: 8px; outline: none;">
            <input type="email" id="custom-google-email" placeholder="Your Gmail address"
                   style="width: 100%; padding: 8px 12px; border: 1px solid #dadce0; border-radius: 6px; font-size: 0.8125rem; margin-bottom: 8px; outline: none;">
            <button type="button" id="btn-confirm-custom-google"
                    style="width: 100%; background: #1a73e8; color: #fff; border: none; padding: 9px; border-radius: 6px; font-weight: 700; font-size: 0.8125rem; cursor: pointer;">
              Sign in with this account
            </button>
          </div>
        </div>
      </div>

    </div>
  `;
}

export function initAuthPage(initialMode = 'login', initialRole = 'user') {
  let currentMode = initialMode;
  let currentRole = initialRole;

  // Portal elements
  const btnPortalUser = document.getElementById('portal-tab-user');
  const btnPortalAdmin = document.getElementById('portal-tab-admin');
  const btnPortalJudge = document.getElementById('portal-tab-judge');
  const portalBadge = document.getElementById('active-portal-badge');
  const portalBox = document.getElementById('portal-info-box');
  const portalIcon = document.getElementById('portal-info-icon');
  const portalTitle = document.getElementById('portal-info-title');
  const portalDesc = document.getElementById('portal-info-desc');
  const quickLoginBtn = document.getElementById('btn-quick-portal-login');
  const quickLoginLabel = document.getElementById('quick-login-label');
  const quickLoginIcon = document.getElementById('quick-login-icon');

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

    if (portalKey === 'user') {
      btnPortalUser.style.background = '#0F2A4A';
      btnPortalUser.style.color = '#ffffff';
      btnPortalUser.style.boxShadow = '0 2px 6px rgba(15, 42, 74, 0.25)';

      portalBadge.textContent = '1. Citizen Portal';
      portalBadge.style.background = '#e0f2fe';
      portalBadge.style.color = '#0369a1';

      portalBox.style.background = '#f0fdf4';
      portalBox.style.borderColor = '#bbf7d0';
      portalIcon.textContent = 'person';
      portalIcon.style.color = '#16a34a';
      portalTitle.textContent = '1. Citizen & Litigant Access Portal';
      portalTitle.style.color = '#166534';
      portalDesc.textContent = 'After login, you will only see the case which you have reported and all proceedings/documents relating to your case.';

      if (inputEmail) inputEmail.value = 'ramesh.kumar@citizen.in';
      if (quickLoginLabel) quickLoginLabel.textContent = 'Quick Sign-In as Citizen (Ramesh Kumar)';
      if (quickLoginIcon) quickLoginIcon.textContent = 'person';
      quickLoginBtn.style.background = '#eff6ff';
      quickLoginBtn.style.color = '#1d4ed8';
      quickLoginBtn.style.borderColor = '#bfdbfe';

    } else if (portalKey === 'admin') {
      btnPortalAdmin.style.background = '#4338ca';
      btnPortalAdmin.style.color = '#ffffff';
      btnPortalAdmin.style.boxShadow = '0 2px 6px rgba(67, 56, 202, 0.25)';

      portalBadge.textContent = '2. Court Admin Portal';
      portalBadge.style.background = '#ede9fe';
      portalBadge.style.color = '#5b21b6';

      portalBox.style.background = '#faf5ff';
      portalBox.style.borderColor = '#e9d5ff';
      portalIcon.textContent = 'admin_panel_settings';
      portalIcon.style.color = '#7c3aed';
      portalTitle.textContent = '2. Court Registry Administrator Portal';
      portalTitle.style.color = '#5b21b6';
      portalDesc.textContent = 'Authority to manage all cases, filter across Day and Month timespans, and control all dossier tabs.';

      if (inputEmail) inputEmail.value = 'admin.registry@districtcourt.gov.in';
      if (quickLoginLabel) quickLoginLabel.textContent = 'Quick Sign-In as Court Administrator (Registrar)';
      if (quickLoginIcon) quickLoginIcon.textContent = 'admin_panel_settings';
      quickLoginBtn.style.background = '#faf5ff';
      quickLoginBtn.style.color = '#6d28d9';
      quickLoginBtn.style.borderColor = '#ddd6fe';

    } else if (portalKey === 'judge') {
      btnPortalJudge.style.background = '#b45309';
      btnPortalJudge.style.color = '#ffffff';
      btnPortalJudge.style.boxShadow = '0 2px 6px rgba(180, 83, 9, 0.25)';

      portalBadge.textContent = '3. Hon\'ble Judge Portal';
      portalBadge.style.background = '#fef3c7';
      portalBadge.style.color = '#92400e';

      portalBox.style.background = '#fffbeb';
      portalBox.style.borderColor = '#fde68a';
      portalIcon.textContent = 'gavel';
      portalIcon.style.color = '#d97706';
      portalTitle.textContent = '3. Hon\'ble Presiding Judge Bench Portal';
      portalTitle.style.color = '#92400e';
      portalDesc.textContent = 'Review all listed cases throughout the day (cause list), month (roster), and past adjudicated decisions.';

      if (inputEmail) inputEmail.value = 'judge.kulkarni@judicial.gov.in';
      if (quickLoginLabel) quickLoginLabel.textContent = 'Quick Sign-In as Hon\'ble Judge (Smt. Archana Kulkarni)';
      if (quickLoginIcon) quickLoginIcon.textContent = 'gavel';
      quickLoginBtn.style.background = '#fffbeb';
      quickLoginBtn.style.color = '#b45309';
      quickLoginBtn.style.borderColor = '#fcd34d';
    }

    updateModeLabels();
    renderGoogleAccounts();
  }

  function updateModeLabels() {
    const roleName = currentRole === 'user' ? 'Citizen' : (currentRole === 'admin' ? 'Court Admin' : 'Judge');
    if (currentMode === 'signup') {
      submitBtnText.textContent = `Register & Access as ${roleName}`;
      googleBtnText.textContent = `Sign up with Google (${roleName})`;
      if (signupContainer) signupContainer.style.display = 'flex';
      tabLogin.style.background = 'transparent';
      tabLogin.style.color = '#64748b';
      tabSignup.style.background = '#0F2A4A';
      tabSignup.style.color = '#ffffff';
    } else {
      submitBtnText.textContent = `Log In to ${roleName} Portal`;
      googleBtnText.textContent = `Continue with Google (${roleName})`;
      if (signupContainer) signupContainer.style.display = 'none';
      tabSignup.style.background = 'transparent';
      tabSignup.style.color = '#64748b';
      tabLogin.style.background = '#0F2A4A';
      tabLogin.style.color = '#ffffff';
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

  // Fast-Track Login Button
  quickLoginBtn?.addEventListener('click', () => {
    if (currentRole === 'user') {
      completeAuth('Ramesh Kumar', 'ramesh.kumar@citizen.in', 'user', 'demo');
    } else if (currentRole === 'admin') {
      completeAuth('Registrar V. K. Deshpande', 'admin.registry@districtcourt.gov.in', 'admin', 'demo');
    } else {
      completeAuth('Hon. Smt. Archana Kulkarni', 'judge.kulkarni@judicial.gov.in', 'judge', 'demo');
    }
  });

  // Email form submit
  document.getElementById('auth-page-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = inputEmail?.value.trim() || 'user@legalaid.org';
    let displayName = inputName?.value.trim();

    if (!displayName) {
      if (currentRole === 'user') displayName = 'Ramesh Kumar';
      else if (currentRole === 'admin') displayName = 'Registrar V. K. Deshpande';
      else displayName = 'Hon. Smt. Archana Kulkarni';
    }

    completeAuth(displayName, email, currentRole, 'email');
  });

  // Google Modal Handling
  const googleBtn = document.getElementById('btn-page-auth-google');
  const googleModal = document.getElementById('google-account-modal');
  const closeGoogleModal = document.getElementById('close-google-modal');
  const googleAccsContainer = document.getElementById('google-accounts-container');

  function renderGoogleAccounts() {
    if (!googleAccsContainer) return;

    let accounts = [];
    if (currentRole === 'user') {
      accounts = [
        { name: 'Ramesh Kumar', email: 'ramesh.kumar@citizen.in', badge: 'Citizen Litigant', initial: 'R', color: '#1a73e8' },
        { name: 'Priya Mehta', email: 'priya.mehta@litigant.in', badge: 'Petitioner', initial: 'P', color: '#0f9d58' },
        { name: 'Sunita Devi', email: 'sunita.devi@citizen.in', badge: 'Complainant', initial: 'S', color: '#f2994a' },
      ];
    } else if (currentRole === 'admin') {
      accounts = [
        { name: 'Registrar V. K. Deshpande', email: 'admin.registry@districtcourt.gov.in', badge: 'Chief Registrar & Admin', initial: 'V', color: '#4338ca' },
        { name: 'Shri A. R. Joshi', email: 'superintendent.court@districtcourt.gov.in', badge: 'Court Superintendent', initial: 'A', color: '#6366f1' },
      ];
    } else {
      accounts = [
        { name: 'Hon. Smt. Archana Kulkarni', email: 'judge.kulkarni@judicial.gov.in', badge: 'JMFC Pune (Presiding Judge)', initial: 'A', color: '#b45309' },
        { name: 'Hon. Justice S. R. Bhat', email: 'justice.bhat@judiciary.gov.in', badge: 'Principal District Judge', initial: 'S', color: '#d97706' },
      ];
    }

    googleAccsContainer.innerHTML = accounts.map(acc => `
      <div class="google-acc-card" data-name="${acc.name}" data-email="${acc.email}" data-role="${currentRole}"
           style="display: flex; align-items: center; gap: 14px; padding: 12px 1.5rem; cursor: pointer; transition: background 0.15s ease;"
           onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
        <div style="width: 38px; height: 38px; border-radius: 50%; background: ${acc.color}; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem;">
          ${acc.initial}
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 600; font-size: 0.875rem; color: #202124;">${acc.name}</div>
          <div style="font-size: 0.75rem; color: #5f6368;">${acc.email}</div>
        </div>
        <span class="badge" style="background: #f1f5f9; color: #334155; font-size: 0.6875rem; font-weight: 600;">${acc.badge}</span>
      </div>
    `).join('');

    googleAccsContainer.querySelectorAll('.google-acc-card').forEach(card => {
      card.addEventListener('click', () => {
        const name = card.getAttribute('data-name');
        const email = card.getAttribute('data-email');
        const role = card.getAttribute('data-role');
        if (googleModal) googleModal.style.display = 'none';
        completeAuth(name, email, role, 'google');
      });
    });
  }

  googleBtn?.addEventListener('click', () => {
    renderGoogleAccounts();
    if (googleModal) googleModal.style.display = 'flex';
  });

  closeGoogleModal?.addEventListener('click', () => {
    if (googleModal) googleModal.style.display = 'none';
  });

  googleModal?.addEventListener('click', (e) => {
    if (e.target === googleModal) googleModal.style.display = 'none';
  });

  // Custom Google Account trigger
  const customTrigger = document.getElementById('google-acc-custom-trigger');
  const customBox = document.getElementById('google-custom-input-box');
  const confirmCustomBtn = document.getElementById('btn-confirm-custom-google');

  customTrigger?.addEventListener('click', () => {
    if (customBox) {
      customBox.style.display = customBox.style.display === 'none' ? 'block' : 'none';
    }
  });

  confirmCustomBtn?.addEventListener('click', () => {
    const name = document.getElementById('custom-google-name')?.value.trim() || 'Custom Authorized User';
    const email = document.getElementById('custom-google-email')?.value.trim() || 'user@gmail.com';
    if (googleModal) googleModal.style.display = 'none';
    completeAuth(name, email, currentRole, 'google');
  });

  // Initialize selected portal
  setPortal(initialRole || 'user');
}
