/**
 * CaseCompass — Auth Session Manager
 * Handles real Google Identity Services sign-in, JWT storage,
 * and communication with backend /api/auth/* endpoints.
 *
 * Design decision: JWT stored in sessionStorage (not localStorage).
 * Reason: Frontend (Vercel) and backend run on different origins.
 * HttpOnly cookies require SameSite=None + CORS credentials, which
 * adds complexity. SessionStorage is cleared on tab close and not
 * accessible by other origins. A future upgrade can add refresh tokens.
 *
 * IMPORTANT: The role stored here is ONLY used for UI routing hints.
 * All actual data access is enforced server-side via the JWT role claim.
 */

const SESSION_KEY = 'cc_session';
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

// ---- Session storage helpers ----

export function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(data) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getToken() {
  return getSession()?.token || null;
}

export function isAuthenticated() {
  const s = getSession();
  return !!(s && s.token);
}

export function getCurrentRole() {
  return getSession()?.role || 'user';
}

export function getCurrentUser() {
  const s = getSession();
  return s?.name || s?.email?.split('@')[0] || 'User';
}

export function getCurrentEmail() {
  return getSession()?.email || '';
}

export function isDemo() {
  return getSession()?.is_demo === true;
}

// ---- API fetch helper (attaches Bearer token) ----

export async function authFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  return res;
}

// ---- Backend auth calls ----

/**
 * Send Google credential to backend for verification.
 * Backend verifies signature, audience, issuer, expiry, email_verified.
 * Returns session data with server-assigned role.
 */
export async function signInWithGoogle(credential, requestedPortal = 'user') {
  const res = await fetch(`${API_BASE}/api/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential, requested_portal: requestedPortal }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Authentication failed.' }));
    throw new Error(err.detail || 'Authentication failed.');
  }

  const data = await res.json();
  setSession(data);
  return data;
}

/**
 * Demo login — only works when backend DEMO_MODE=true.
 * Sessions tagged is_demo=true.
 */
export async function signInDemo(role = 'user') {
  const res = await fetch(`${API_BASE}/api/auth/demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Demo login unavailable.' }));
    throw new Error(err.detail || 'Demo login unavailable. DEMO_MODE may be disabled.');
  }

  const data = await res.json();
  setSession(data);
  return data;
}

/**
 * Sign out: tell backend (invalidates token on server in future),
 * then clear local session.
 */
export async function signOut() {
  try {
    await authFetch('/api/auth/logout', { method: 'POST' });
  } catch {
    // Even if backend fails, we still clear local session
  }
  clearSession();
  // Revoke Google session too
  if (window.google?.accounts?.id) {
    window.google.accounts.id.disableAutoSelect();
    window.google.accounts.id.revoke(getCurrentEmail(), () => {});
  }
}

/**
 * Verify current token is still valid with backend.
 * Call on app load to catch expired tokens.
 */
export async function verifySession() {
  if (!isAuthenticated()) return false;
  try {
    const res = await authFetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      // Update session with fresh server data
      const existing = getSession();
      setSession({ ...existing, ...data });
      return true;
    }
    clearSession();
    return false;
  } catch {
    // Backend may be offline; keep session for UI purposes (frontend-only mode)
    return true;
  }
}
