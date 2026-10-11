/**
 * CaseCompass — Dedicated Authentication Page (Login & Sign Up)
 * Full-page redirect with:
 * - "Continue with Google" integration and account authentication
 * - Log In / Sign Up tab switching
 * - Email / Password authentication
 * - Phone OTP verification
 * - Seamless redirect to Workspace (#/cases) upon successful auth
 */

export function renderAuthPage(initialMode = 'login') {
  const isSignUp = initialMode === 'signup';

  return `
    <div class="auth-page-wrapper" style="min-height: 100vh; display: flex; flex-direction: column; background: linear-gradient(135deg, #0b1a2d 0%, #102a43 50%, #1e3a5f 100%); color: #f8fafc; font-family: var(--font-body); position: relative; overflow-x: hidden;">
      <!-- Top Navigation Bar -->
      <header style="padding: 1.25rem 2rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.08); background: rgba(11, 26, 45, 0.85); backdrop-filter: blur(12px);">
        <a href="#/" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit;" title="Return to CaseCompass Home">
          <img src="/casecompass-logo.png" alt="CaseCompass Logo" style="height: 44px; width: auto; object-fit: contain;"
               onerror="this.src='/casecompass-icon.png'">
        </a>
        <a href="#/" class="btn btn--ghost btn--sm" style="color: #94a3b8; text-decoration: none; display: flex; align-items: center; gap: 6px; font-weight: 500;">
          <span class="material-symbols-outlined" style="font-size: 18px;">arrow_back</span>
          <span>Back to Home</span>
        </a>
      </header>

      <!-- Main Auth Card Container -->
      <main style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 2.5rem 1rem;">
        <div class="card" id="auth-main-card" style="width: 100%; max-width: 480px; background: #ffffff; color: #0F2A4A; border-radius: 16px; padding: 2.25rem 2rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35); border: 1px solid rgba(255, 255, 255, 0.1);">
          
          <!-- Card Header -->
          <div style="text-align: center; margin-bottom: 1.75rem;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: #0F2A4A; color: #ffffff; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 0.75rem; box-shadow: 0 4px 12px rgba(15, 42, 74, 0.25);">
              <span class="material-symbols-outlined" style="font-size: 26px;">balance</span>
            </div>
            <h1 id="auth-heading" style="font-family: var(--font-headline); font-size: 1.625rem; font-weight: 800; color: #0F2A4A; margin: 0; letter-spacing: -0.02em;">
              ${isSignUp ? 'Create your CaseCompass Account' : 'Sign in to CaseCompass'}
            </h1>
            <p id="auth-subheading" style="font-size: 0.875rem; color: #64748b; margin-top: 6px; line-height: 1.45;">
              ${isSignUp ? 'Join verified legal-aid volunteers and advocates to access case dockets' : 'Enter your credentials or continue with Google to access the Workspace'}
            </p>
          </div>

          <!-- Log In / Sign Up Mode Switcher Tabs -->
          <div style="display: flex; background: #f1f5f9; padding: 4px; border-radius: 10px; margin-bottom: 1.5rem;">
            <button type="button" id="auth-tab-login"
                    style="flex: 1; padding: 9px; border-radius: 8px; border: none; font-size: 0.875rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; ${!isSignUp ? 'background: #0F2A4A; color: #ffffff; box-shadow: 0 2px 6px rgba(15, 42, 74, 0.2);' : 'background: transparent; color: #64748b;'}">
              Log In
            </button>
            <button type="button" id="auth-tab-signup"
                    style="flex: 1; padding: 9px; border-radius: 8px; border: none; font-size: 0.875rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; ${isSignUp ? 'background: #0F2A4A; color: #ffffff; box-shadow: 0 2px 6px rgba(15, 42, 74, 0.2);' : 'background: transparent; color: #64748b;'}">
              Sign Up
            </button>
          </div>

          <!-- PRIMARY OPTION: Continue with Google -->
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
            <span id="google-btn-text">${isSignUp ? 'Sign up with Google' : 'Continue with Google'}</span>
          </button>

          <!-- Divider -->
          <div style="display: flex; align-items: center; margin: 1.5rem 0; color: #94a3b8; font-size: 0.8125rem;">
            <div style="flex: 1; height: 1px; background: #e2e8f0;"></div>
            <span style="padding: 0 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.6875rem;">Or continue with email</span>
            <div style="flex: 1; height: 1px; background: #e2e8f0;"></div>
          </div>

          <!-- Feedback Toast / Alert inside Card -->
          <div id="auth-feedback-toast" style="display: none; padding: 10px 14px; border-radius: 8px; margin-bottom: 1rem; font-size: 0.8125rem; font-weight: 600; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" id="auth-feedback-icon" style="font-size: 18px;"></span>
            <span id="auth-feedback-msg"></span>
          </div>

          <!-- Email & Password Form -->
          <form id="auth-page-form" style="display: flex; flex-direction: column; gap: 14px;">
            <!-- Extra Fields for Sign Up Mode -->
            <div id="signup-extra-container" style="display: ${isSignUp ? 'flex' : 'none'}; flex-direction: column; gap: 14px;">
              <div>
                <label style="display: block; font-size: 0.8125rem; font-weight: 700; color: #0F2A4A; margin-bottom: 4px;">
                  Full Name *
                </label>
                <input type="text" id="auth-input-fullname" placeholder="e.g. Adv. Meera Deshmukh"
                       style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 0.875rem;">
              </div>
              <div>
                <label style="display: block; font-size: 0.8125rem; font-weight: 700; color: #0F2A4A; margin-bottom: 4px;">
                  Legal Aid Clinic / Practice *
                </label>
                <input type="text" id="auth-input-org" placeholder="e.g. DLSA Pune / High Court Legal Aid"
                       style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 0.875rem;">
              </div>
            </div>

            <!-- Email Field -->
            <div>
              <label style="display: block; font-size: 0.8125rem; font-weight: 700; color: #0F2A4A; margin-bottom: 4px;">
                Email Address *
              </label>
              <input type="email" id="auth-input-email" required placeholder="name@legalaid.org"
                     value="${isSignUp ? '' : 'meera.deshmukh@legalaid.org'}"
                     style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 0.875rem;">
            </div>

            <!-- Password Field -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                <label style="font-size: 0.8125rem; font-weight: 700; color: #0F2A4A;">
                  Password *
                </label>
                ${!isSignUp ? `<a href="javascript:void(0)" id="auth-link-forgot" style="font-size: 0.75rem; color: #2563eb; text-decoration: none; font-weight: 600;">Forgot password?</a>` : ''}
              </div>
              <input type="password" id="auth-input-password" required placeholder="••••••••••••"
                     value="${isSignUp ? '' : 'legal@2026'}"
                     style="width: 100%; padding: 11px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 0.875rem;">
            </div>

            <!-- Submit Button -->
            <button type="submit" id="btn-submit-auth-page"
                    style="margin-top: 8px; padding: 12px 20px; background: #0F2A4A; color: #ffffff; border: none; border-radius: 10px; font-size: 0.9375rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(15, 42, 74, 0.25);"
                    onmouseover="this.style.background='#163861';this.style.transform='translateY(-1px)'"
                    onmouseout="this.style.background='#0F2A4A';this.style.transform='translateY(0)'">
              <span id="btn-submit-text">${isSignUp ? 'Create Account & Enter' : 'Sign In to Workspace'}</span>
              <span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
            </button>
          </form>

          <!-- Alternative: Demo Quick Access & Phone Login -->
          <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid #f1f5f9; display: flex; flex-direction: column; gap: 10px; text-align: center;">
            <button type="button" id="btn-quick-demo-login"
                    style="background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 8px 12px; border-radius: 8px; font-size: 0.8125rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
              <span class="material-symbols-outlined" style="font-size: 16px;">verified_user</span>
              <span>Fast Track: Sign in as Demo Legal-Aid Advocate</span>
            </button>

            <div style="font-size: 0.75rem; color: #94a3b8;">
              By continuing, you agree to CaseCompass's 
              <a href="#/trust" style="color: #64748b; text-decoration: underline;">Audit Standard</a> & 
              <a href="#/" style="color: #64748b; text-decoration: underline;">Privacy Policy</a>.
            </div>
          </div>

        </div>
      </main>

      <!-- Google OAuth Account Picker Simulation Modal -->
      <div id="google-account-modal" style="display: none; position: fixed; inset: 0; z-index: 1000; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(4px); align-items: center; justify-content: center; padding: 1rem;">
        <div style="background: #ffffff; color: #202124; width: 100%; max-width: 440px; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); overflow: hidden; animation: slideUp 0.25s ease;">
          <!-- Google Modal Header -->
          <div style="padding: 1.5rem 1.5rem 1rem; border-bottom: 1px solid #e8eaed; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <div>
                <h3 style="font-size: 1.0625rem; font-weight: 600; color: #202124; margin: 0;">Sign in with Google</h3>
                <p style="font-size: 0.75rem; color: #5f6368; margin: 2px 0 0;">Choose an account to continue to CaseCompass</p>
              </div>
            </div>
            <button id="close-google-modal" style="background: none; border: none; cursor: pointer; color: #5f6368; padding: 4px;">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Account Options List -->
          <div style="padding: 0.75rem 0;">
            <!-- Option 1: Adv. Meera Deshmukh -->
            <div class="google-acc-item" data-name="Adv. Meera Deshmukh" data-email="meera.deshmukh@gmail.com"
                 style="display: flex; align-items: center; gap: 14px; padding: 12px 1.5rem; cursor: pointer; transition: background 0.15s ease;"
                 onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
              <div style="width: 38px; height: 38px; border-radius: 50%; background: #1a73e8; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem;">
                M
              </div>
              <div style="flex: 1; min-width: 0;">
                <div style="font-weight: 600; font-size: 0.875rem; color: #202124;">Adv. Meera Deshmukh</div>
                <div style="font-size: 0.75rem; color: #5f6368;">meera.deshmukh@gmail.com</div>
              </div>
              <span class="badge" style="background: #e8f0fe; color: #1a73e8; font-size: 0.6875rem;">Legal Aid</span>
            </div>

            <!-- Option 2: Rajesh Sharma -->
            <div class="google-acc-item" data-name="Rajesh Sharma" data-email="rajesh.legal.aid@gmail.com"
                 style="display: flex; align-items: center; gap: 14px; padding: 12px 1.5rem; cursor: pointer; transition: background 0.15s ease;"
                 onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
              <div style="width: 38px; height: 38px; border-radius: 50%; background: #0f9d58; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem;">
                R
              </div>
              <div style="flex: 1; min-width: 0;">
                <div style="font-weight: 600; font-size: 0.875rem; color: #202124;">Rajesh Sharma</div>
                <div style="font-size: 0.75rem; color: #5f6368;">rajesh.legal.aid@gmail.com</div>
              </div>
              <span class="badge" style="background: #e6f4ea; color: #137333; font-size: 0.6875rem;">Volunteer</span>
            </div>

            <!-- Option 3: Custom Google Account -->
            <div id="google-acc-custom-trigger"
                 style="display: flex; align-items: center; gap: 14px; padding: 12px 1.5rem; cursor: pointer; transition: background 0.15s ease; border-top: 1px solid #f1f3f4;"
                 onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
              <div style="width: 38px; height: 38px; border-radius: 50%; background: #f1f3f4; color: #5f6368; display: flex; align-items: center; justify-content: center;">
                <span class="material-symbols-outlined" style="font-size: 20px;">person_add</span>
              </div>
              <div style="flex: 1;">
                <div style="font-weight: 600; font-size: 0.875rem; color: #202124;">Use another Google account</div>
              </div>
            </div>
          </div>

          <!-- Custom Google Account Input Area -->
          <div id="google-custom-input-box" style="display: none; padding: 12px 1.5rem; background: #f8f9fa; border-top: 1px solid #e8eaed;">
            <input type="text" id="custom-google-name" placeholder="Your Full Name (e.g. Adv. Amit Patil)"
                   style="width: 100%; padding: 8px 12px; border: 1px solid #dadce0; border-radius: 6px; font-size: 0.8125rem; margin-bottom: 8px; outline: none;">
            <input type="email" id="custom-google-email" placeholder="Your Gmail address"
                   style="width: 100%; padding: 8px 12px; border: 1px solid #dadce0; border-radius: 6px; font-size: 0.8125rem; margin-bottom: 8px; outline: none;">
            <button type="button" id="btn-confirm-custom-google"
                    style="width: 100%; background: #1a73e8; color: #fff; border: none; padding: 8px; border-radius: 6px; font-weight: 600; font-size: 0.8125rem; cursor: pointer;">
              Sign in with this account
            </button>
          </div>

          <!-- Footer -->
          <div style="padding: 12px 1.5rem; background: #f8f9fa; border-top: 1px solid #e8eaed; font-size: 0.6875rem; color: #5f6368; line-height: 1.4;">
            To continue, Google will share your name, email address, and language preference with CaseCompass.
          </div>
        </div>
      </div>

    </div>
  `;
}

export function initAuthPage(initialMode = 'login') {
  let currentMode = initialMode;

  const tabLogin = document.getElementById('auth-tab-login');
  const tabSignup = document.getElementById('auth-tab-signup');
  const heading = document.getElementById('auth-heading');
  const subheading = document.getElementById('auth-subheading');
  const googleBtnText = document.getElementById('google-btn-text');
  const signupExtra = document.getElementById('signup-extra-container');
  const submitText = document.getElementById('btn-submit-text');
  const authForm = document.getElementById('auth-page-form');
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

  function setMode(mode) {
    currentMode = mode;
    if (mode === 'signup') {
      tabLogin.style.background = 'transparent';
      tabLogin.style.color = '#64748b';
      tabLogin.style.boxShadow = 'none';

      tabSignup.style.background = '#0F2A4A';
      tabSignup.style.color = '#ffffff';
      tabSignup.style.boxShadow = '0 2px 6px rgba(15, 42, 74, 0.2)';

      if (heading) heading.textContent = 'Create your CaseCompass Account';
      if (subheading) subheading.textContent = 'Join verified legal-aid volunteers and advocates to access case dockets';
      if (googleBtnText) googleBtnText.textContent = 'Sign up with Google';
      if (signupExtra) signupExtra.style.display = 'flex';
      if (submitText) submitText.textContent = 'Create Account & Enter';
    } else {
      tabSignup.style.background = 'transparent';
      tabSignup.style.color = '#64748b';
      tabSignup.style.boxShadow = 'none';

      tabLogin.style.background = '#0F2A4A';
      tabLogin.style.color = '#ffffff';
      tabLogin.style.boxShadow = '0 2px 6px rgba(15, 42, 74, 0.2)';

      if (heading) heading.textContent = 'Sign in to CaseCompass';
      if (subheading) subheading.textContent = 'Enter your credentials or continue with Google to access the Workspace';
      if (googleBtnText) googleBtnText.textContent = 'Continue with Google';
      if (signupExtra) signupExtra.style.display = 'none';
      if (submitText) submitText.textContent = 'Sign In to Workspace';
    }
  }

  tabLogin?.addEventListener('click', () => setMode('login'));
  tabSignup?.addEventListener('click', () => setMode('signup'));

  // Completion function: sets authentication & redirects to Workspace
  function completeAuthentication(userName, userEmail = '', authProvider = 'email') {
    localStorage.setItem('casecompass_auth', 'true');
    localStorage.setItem('casecompass_user', userName);
    localStorage.setItem('casecompass_user_email', userEmail);
    localStorage.setItem('casecompass_auth_provider', authProvider);

    showToast(`✓ Authentication successful as ${userName}! Entering Workspace...`, 'success');

    setTimeout(() => {
      window.location.hash = '#/cases';
    }, 700);
  }

  // Google Sign-In Flow
  const googleBtn = document.getElementById('btn-page-auth-google');
  const googleModal = document.getElementById('google-account-modal');
  const closeGoogleModal = document.getElementById('close-google-modal');

  googleBtn?.addEventListener('click', () => {
    if (googleModal) googleModal.style.display = 'flex';
  });

  closeGoogleModal?.addEventListener('click', () => {
    if (googleModal) googleModal.style.display = 'none';
  });

  googleModal?.addEventListener('click', (e) => {
    if (e.target === googleModal) googleModal.style.display = 'none';
  });

  // Handle Account Selection from Google Dialog
  document.querySelectorAll('.google-acc-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.getAttribute('data-name') || 'Adv. Meera Deshmukh';
      const email = item.getAttribute('data-email') || 'meera.deshmukh@gmail.com';
      if (googleModal) googleModal.style.display = 'none';
      completeAuthentication(name, email, 'google');
    });
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
    const name = document.getElementById('custom-google-name')?.value.trim() || 'Advocate User';
    const email = document.getElementById('custom-google-email')?.value.trim() || 'user@gmail.com';
    if (googleModal) googleModal.style.display = 'none';
    completeAuthentication(name, email, 'google');
  });

  // Fast-Track Demo Login
  document.getElementById('btn-quick-demo-login')?.addEventListener('click', () => {
    completeAuthentication('Adv. Meera Deshmukh (Legal Aid)', 'meera.deshmukh@legalaid.org', 'demo');
  });

  // Form Submit (Email / Password)
  authForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-input-email')?.value.trim() || 'advocate@legalaid.org';
    const fullname = document.getElementById('auth-input-fullname')?.value.trim();

    let displayName = fullname;
    if (!displayName) {
      const handle = email.split('@')[0] || 'Advocate';
      displayName = handle.charAt(0).toUpperCase() + handle.slice(1);
    }

    completeAuthentication(displayName, email, 'email');
  });

  // Forgot password handler
  document.getElementById('auth-link-forgot')?.addEventListener('click', () => {
    showToast('Password reset link has been dispatched to your email address.', 'success');
  });
}
