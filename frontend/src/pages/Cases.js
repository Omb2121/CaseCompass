/**
 * CaseCompass — 1. Cases Page
 * Real-time Case Records Management divided into High, Medium, and Low seriousness/review levels.
 * Separates cases into structured urgency tiers with filtering, search, live creation, and deletion.
 */

import { api, getCaseSeriousness } from '../api.js';

function statusBadgeClass(status) {
  const map = {
    verified: 'badge--verified',
    pending: 'badge--pending',
    flagged: 'badge--flagged',
    processing: 'badge--processing',
  };
  return map[status] || 'badge--neutral';
}

function statusIcon(status) {
  const map = {
    verified: 'verified',
    pending: 'schedule',
    flagged: 'flag',
    processing: 'sync',
  };
  return map[status] || 'info';
}

function seriousnessBadge(seriousness) {
  const level = (seriousness || 'medium').toLowerCase();
  if (level === 'high') {
    return `<span class="badge badge--seriousness-high" title="Critical Review Priority · Serious Penal Matter / Flagged Record">
      <span class="material-symbols-outlined" style="font-size:12px;">priority_high</span>
      HIGH SERIOUSNESS
    </span>`;
  }
  if (level === 'low') {
    return `<span class="badge badge--seriousness-low" title="Routine Compliance · Verified Docket Record">
      <span class="material-symbols-outlined" style="font-size:12px;">check_circle</span>
      LOW SERIOUSNESS
    </span>`;
  }
  return `<span class="badge badge--seriousness-medium" title="Active Proceedings · Pending Documentary Review">
    <span class="material-symbols-outlined" style="font-size:12px;">schedule</span>
    MEDIUM SERIOUSNESS
  </span>`;
}

function renderCaseCard(c) {
  const safeTitle = (c.title || '').replace(/"/g, '&quot;');
  const seriousness = getCaseSeriousness(c);
  const borderColor = seriousness === 'high' ? '#ef4444' : (seriousness === 'medium' ? '#f59e0b' : '#10b981');

  return `
    <div class="card-flat case-record-item" data-case-id="${c.id}" data-case-status="${c.status}" data-case-seriousness="${seriousness}"
         data-case-title="${safeTitle}" data-case-cnr="${c.cnr}" data-case-court="${c.court}"
         style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-md);padding:var(--space-md) var(--space-lg);border-left:5px solid ${borderColor};transition:all 0.2s;cursor:pointer;"
         onmouseover="this.style.boxShadow='var(--shadow-md)';this.style.transform='translateY(-1px)'"
         onmouseout="this.style.boxShadow='var(--shadow-xs)';this.style.transform='translateY(0)'">
      <div style="display:flex;align-items:center;gap:var(--space-md);min-width:0;flex:1;">
        <div style="width:42px;height:42px;border-radius:var(--radius-md);background:${seriousness === 'high' ? '#fee2e2' : (seriousness === 'medium' ? '#fef3c7' : '#d1fae5')};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span class="material-symbols-outlined" style="font-size:22px;color:${borderColor}">
            ${seriousness === 'high' ? 'warning' : (seriousness === 'medium' ? 'folder_open' : 'verified')}
          </span>
        </div>
        <div style="min-width:0;">
          <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;">
            <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">${c.title}</span>
            ${seriousnessBadge(seriousness)}
            <span class="badge ${statusBadgeClass(c.status)}">
              <span class="material-symbols-outlined" style="font-size:12px">${statusIcon(c.status)}</span>
              ${c.statusLabel || c.status}
            </span>
            ${c.isCustom ? `<span class="badge" style="background:#eff6ff;color:#1d4ed8;font-size:0.6875rem;">Newly Registered</span>` : ''}
          </div>
          <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;margin-top:4px;">
            <span class="text-code-sm" style="color:var(--secondary);background:var(--surface-container-low);padding:1px 6px;border-radius:var(--radius-sm);font-weight:600;">CNR: ${c.cnr}</span>
            <span class="text-body-sm" style="color:var(--on-surface-variant);">${c.court}</span>
            ${c.section ? `<span style="font-size:0.75rem;color:var(--outline);">&middot; ${c.section}</span>` : ''}
          </div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:var(--space-md);flex-shrink:0;flex-wrap:wrap;">
        <div style="text-align:center;min-width:44px;">
          <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;">Docs</div>
          <div class="text-body-md" style="font-weight:700;color:var(--primary);">${c.documents || 0}</div>
        </div>
        <div style="text-align:center;min-width:84px;">
          <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;">Next Hearing</div>
          <div class="text-body-sm" style="font-weight:600;color:var(--on-surface);">${c.nextHearing || 'Upcoming'}</div>
        </div>
        <button class="btn btn--secondary btn--sm btn-open-timeline" data-case-id="${c.id}" style="font-size:0.75rem;border-radius:var(--radius-md);" title="Open timeline for this case">
          <span>View Timeline</span>
          <span class="material-symbols-outlined" style="font-size:14px;">arrow_forward</span>
        </button>
        <button class="btn btn--sm btn-delete-case" data-case-id="${c.id}" data-case-title="${safeTitle}" title="Delete this case record"
                style="font-size:0.75rem;border-radius:var(--radius-md);color:#dc2626;background:#fef2f2;border:1px solid #fecaca;padding:6px 12px;display:inline-flex;align-items:center;gap:4px;cursor:pointer;transition:all 0.15s ease;"
                onmouseover="this.style.background='#fee2e2';this.style.borderColor='#f87171'"
                onmouseout="this.style.background='#fef2f2';this.style.borderColor='#fecaca'">
          <span class="material-symbols-outlined" style="font-size:15px;color:#dc2626;">delete</span>
          <span style="font-weight:600;">Delete</span>
        </button>
      </div>
    </div>
  `;
}

export function renderCasesPage() {
  const cases = api.getCases();

  // Divide into High, Medium, Low
  const highCases = cases.filter(c => getCaseSeriousness(c) === 'high');
  const mediumCases = cases.filter(c => getCaseSeriousness(c) === 'medium');
  const lowCases = cases.filter(c => getCaseSeriousness(c) === 'low');

  const filterPills = [
    { value: 'all', label: `All Records (${cases.length})`, type: 'status' },
    { value: 'seriousness-high', label: `🔴 High Seriousness (${highCases.length})`, type: 'seriousness' },
    { value: 'seriousness-medium', label: `🟡 Medium Seriousness (${mediumCases.length})`, type: 'seriousness' },
    { value: 'seriousness-low', label: `🟢 Low Seriousness (${lowCases.length})`, type: 'seriousness' },
    { value: 'flagged', label: 'Flagged', type: 'status' },
    { value: 'pending', label: 'Pending', type: 'status' },
    { value: 'verified', label: 'Verified', type: 'status' },
  ];

  return `
    <div class="page-content animate-fade-in" style="max-width: 1200px;">
      <!-- Success Toast Notification Placeholder -->
      <div id="cases-alert-toast" style="display:none;margin-bottom:var(--space-md);padding:12px 18px;border-radius:var(--radius-md);background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;align-items:center;gap:10px;">
        <span class="material-symbols-outlined" style="color:#059669;font-size:20px;">check_circle</span>
        <span id="cases-alert-toast-text" style="font-size:0.875rem;font-weight:600;">Case registered successfully</span>
      </div>

      <!-- Page Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--space-md);margin-bottom:var(--space-lg);">
        <div>
          <h1 class="page-heading">1. Cases Dossier Management</h1>
          <p class="text-body-sm" style="color:var(--on-surface-variant);margin-top:4px;">
            Dossiers divided into <strong>High</strong>, <strong>Medium</strong>, and <strong>Low</strong> seriousness based on penal gravity and review requirements.
          </p>
        </div>
        <button class="btn btn--primary" id="open-create-modal-btn">
          <span class="material-symbols-outlined" style="font-size:18px">add</span>
          New Case Record
        </button>
      </div>

      <!-- Seriousness Quick KPI Summary Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:var(--space-md);margin-bottom:var(--space-lg);">
        <!-- High Seriousness Card -->
        <div class="seriousness-kpi-card" data-quick-filter="seriousness-high" style="border-left: 5px solid #ef4444;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:0.75rem;font-weight:700;color:#b91c1c;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:4px;">
                <span class="material-symbols-outlined" style="font-size:15px;color:#ef4444;">priority_high</span>
                High Seriousness
              </div>
              <div style="font-size:1.625rem;font-weight:800;color:#991b1b;margin-top:2px;" id="kpi-count-high">
                ${highCases.length} Cases
              </div>
            </div>
            <div style="width:40px;height:40px;border-radius:50%;background:#fee2e2;display:flex;align-items:center;justify-content:center;color:#ef4444;">
              <span class="material-symbols-outlined" style="font-size:22px;">warning</span>
            </div>
          </div>
          <div style="font-size:0.75rem;color:#64748b;margin-top:8px;">
            Critical / Flagged Review &middot; Urgent criminal proceedings
          </div>
        </div>

        <!-- Medium Seriousness Card -->
        <div class="seriousness-kpi-card" data-quick-filter="seriousness-medium" style="border-left: 5px solid #f59e0b;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:0.75rem;font-weight:700;color:#b45309;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:4px;">
                <span class="material-symbols-outlined" style="font-size:15px;color:#f59e0b;">schedule</span>
                Medium Seriousness
              </div>
              <div style="font-size:1.625rem;font-weight:800;color:#92400e;margin-top:2px;" id="kpi-count-medium">
                ${mediumCases.length} Cases
              </div>
            </div>
            <div style="width:40px;height:40px;border-radius:50%;background:#fef3c7;display:flex;align-items:center;justify-content:center;color:#f59e0b;">
              <span class="material-symbols-outlined" style="font-size:22px;">hourglass_top</span>
            </div>
          </div>
          <div style="font-size:0.75rem;color:#64748b;margin-top:8px;">
            Pending Verification &middot; In-progress trial hearings
          </div>
        </div>

        <!-- Low Seriousness Card -->
        <div class="seriousness-kpi-card" data-quick-filter="seriousness-low" style="border-left: 5px solid #10b981;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:0.75rem;font-weight:700;color:#047857;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:4px;">
                <span class="material-symbols-outlined" style="font-size:15px;color:#10b981;">check_circle</span>
                Low Seriousness
              </div>
              <div style="font-size:1.625rem;font-weight:800;color:#065f46;margin-top:2px;" id="kpi-count-low">
                ${lowCases.length} Cases
              </div>
            </div>
            <div style="width:40px;height:40px;border-radius:50%;background:#d1fae5;display:flex;align-items:center;justify-content:center;color:#10b981;">
              <span class="material-symbols-outlined" style="font-size:22px;">verified</span>
            </div>
          </div>
          <div style="font-size:0.75rem;color:#64748b;margin-top:8px;">
            Verified Records &middot; Routine compliance & civil filings
          </div>
        </div>
      </div>

      <!-- Search & Filter Controls -->
      <div class="card-flat" style="padding:var(--space-md);margin-bottom:var(--space-lg);display:flex;flex-wrap:wrap;gap:var(--space-md);align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:var(--space-sm);flex:1;min-width:220px;max-width:380px;">
          <span class="material-symbols-outlined" style="font-size:20px;color:var(--outline)">search</span>
          <input type="search" id="case-search-input" placeholder="Search by case title, CNR, or court…"
                 style="flex:1;border:1px solid var(--outline-variant);padding:8px 12px;border-radius:var(--radius-md);outline:none;"
                 aria-label="Search cases">
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-xs);flex-wrap:wrap;" id="filter-pills-container">
          ${filterPills.map((p, i) => `
            <button class="btn btn--sm ${i === 0 ? 'btn--primary' : 'btn--secondary'}"
                    data-filter-mode="${p.value}"
                    style="border-radius:var(--radius-full);font-size:0.8125rem;">
              ${p.label}
            </button>
          `).join('')}
          <button class="btn btn--ghost btn--sm" id="clear-filters-btn" style="font-size:0.75rem;">
            <span class="material-symbols-outlined" style="font-size:14px">close</span> Reset
          </button>
        </div>
      </div>

      <!-- Cases Count Summary -->
      <div style="margin-bottom:var(--space-sm);font-size:0.8125rem;color:var(--on-surface-variant);display:flex;justify-content:space-between;align-items:center;" id="displayed-case-count">
        <span>Showing <strong>${cases.length}</strong> registered dossiers divided into seriousness tiers</span>
      </div>

      <!-- ======================================================== -->
      <!-- SEPARATED SECTIONS: HIGH, MEDIUM, AND LOW CASES -->
      <!-- ======================================================== -->
      <div id="cases-divided-container">
        <!-- 1. HIGH SERIOUSNESS SECTION -->
        <div class="seriousness-group-block" id="group-high" style="margin-bottom: var(--space-xl);">
          <div class="seriousness-section-header header--high">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="font-size:18px;">priority_high</span>
              <span>1. High Seriousness & Urgent Review</span>
              <span class="badge badge--seriousness-high" style="font-size:0.625rem;" id="header-badge-high">${highCases.length} Records</span>
            </div>
            <span class="hide-mobile" style="font-size:0.6875rem;opacity:0.85;font-weight:600;">Critical review required &middot; Flagged evidence / Penal trial</span>
          </div>
          <div class="cases-group-list" id="list-high" style="display:flex;flex-direction:column;gap:var(--space-sm);">
            ${highCases.length > 0 ? highCases.map(c => renderCaseCard(c)).join('') : `
              <div style="padding:16px;text-align:center;color:#64748b;background:#fef2f2;border-radius:var(--radius-md);border:1px dashed #fca5a5;font-size:0.8125rem;">
                No high-seriousness cases currently flagged.
              </div>
            `}
          </div>
        </div>

        <!-- 2. MEDIUM SERIOUSNESS SECTION -->
        <div class="seriousness-group-block" id="group-medium" style="margin-bottom: var(--space-xl);">
          <div class="seriousness-section-header header--medium">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="font-size:18px;">schedule</span>
              <span>2. Medium Seriousness & In-Progress Review</span>
              <span class="badge badge--seriousness-medium" style="font-size:0.625rem;" id="header-badge-medium">${mediumCases.length} Records</span>
            </div>
            <span class="hide-mobile" style="font-size:0.6875rem;opacity:0.85;font-weight:600;">Active trial proceedings &middot; Pending documentary review</span>
          </div>
          <div class="cases-group-list" id="list-medium" style="display:flex;flex-direction:column;gap:var(--space-sm);">
            ${mediumCases.length > 0 ? mediumCases.map(c => renderCaseCard(c)).join('') : `
              <div style="padding:16px;text-align:center;color:#64748b;background:#fffbeb;border-radius:var(--radius-md);border:1px dashed #fcd34d;font-size:0.8125rem;">
                No medium-seriousness cases in pending queue.
              </div>
            `}
          </div>
        </div>

        <!-- 3. LOW SERIOUSNESS SECTION -->
        <div class="seriousness-group-block" id="group-low" style="margin-bottom: var(--space-xl);">
          <div class="seriousness-section-header header--low">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="font-size:18px;">check_circle</span>
              <span>3. Low Seriousness & Routine Dockets</span>
              <span class="badge badge--seriousness-low" style="font-size:0.625rem;" id="header-badge-low">${lowCases.length} Records</span>
            </div>
            <span class="hide-mobile" style="font-size:0.6875rem;opacity:0.85;font-weight:600;">Verified clean dockets &middot; Civil compliance & routine scheduling</span>
          </div>
          <div class="cases-group-list" id="list-low" style="display:flex;flex-direction:column;gap:var(--space-sm);">
            ${lowCases.length > 0 ? lowCases.map(c => renderCaseCard(c)).join('') : `
              <div style="padding:16px;text-align:center;color:#64748b;background:#f0fdf4;border-radius:var(--radius-md);border:1px dashed #86efac;font-size:0.8125rem;">
                No low-seriousness routine cases registered.
              </div>
            `}
          </div>
        </div>
      </div>

      <!-- Empty Filter State -->
      <div id="empty-filter-state" style="display:none;text-align:center;padding:var(--space-xl);color:var(--on-surface-variant);">
        <span class="material-symbols-outlined" style="font-size:48px;color:var(--outline-variant)">search_off</span>
        <p class="text-body-md" style="margin-top:var(--space-sm);">No records match your selected seriousness or status filters.</p>
      </div>

      <!-- Register New Case Modal -->
      <div id="new-case-modal" class="modal-overlay" style="display:none;position:fixed;inset:0;z-index:60;background:rgba(0,0,0,0.6);align-items:center;justify-content:center;padding:var(--space-md);backdrop-filter:blur(4px);">
        <div class="card" style="width:100%;max-width:540px;padding:var(--space-xl);animation:slideUp 0.3s ease;box-shadow:var(--shadow-lg);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-lg);border-bottom:1px solid var(--outline-variant);padding-bottom:12px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:36px;height:36px;border-radius:8px;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;">
                <span class="material-symbols-outlined" style="font-size:20px;">folder_open</span>
              </div>
              <div>
                <h2 class="text-headline-sm" style="color:var(--primary);font-weight:700;">Register New Case Record</h2>
                <p style="font-size:0.75rem;color:var(--on-surface-variant);">Assign seriousness and dossier parameters</p>
              </div>
            </div>
            <button id="close-modal-btn" style="background:none;border:none;cursor:pointer;color:var(--on-surface-variant);padding:4px;" aria-label="Close modal">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <form id="create-case-form" style="display:flex;flex-direction:column;gap:var(--space-md);">
            <div>
              <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Case Title *</label>
              <input type="text" id="modal-case-title" required placeholder="e.g., State of Maharashtra v. Anjali Verma"
                     style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);outline:none;">
            </div>

            <!-- Seriousness Level Selector -->
            <div>
              <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:700;">
                Case Seriousness & Review Priority *
              </label>
              <select id="modal-case-seriousness" style="width:100%;padding:10px 14px;border:1.5px solid var(--primary);border-radius:var(--radius-md);background:var(--surface-container-lowest);font-weight:600;outline:none;">
                <option value="high">🔴 High Seriousness (Urgent Criminal / Flagged Evidence Matter)</option>
                <option value="medium" selected>🟡 Medium Seriousness (Active Trial / Pending Review)</option>
                <option value="low">🟢 Low Seriousness (Routine Compliance / Verified Civil Docket)</option>
              </select>
              <div style="font-size:0.6875rem;color:var(--on-surface-variant);margin-top:3px;">
                Controls placement into High, Medium, or Low separated dossier sections.
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">CNR Number</label>
                <input type="text" id="modal-case-cnr" placeholder="e.g., MHPU01-009842-2025"
                       style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);outline:none;">
              </div>
              <div>
                <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Initial Review Status</label>
                <select id="modal-case-status" style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);background:white;outline:none;">
                  <option value="pending" selected>Pending Review</option>
                  <option value="verified">Verified</option>
                  <option value="flagged">Needs Attention (Flagged)</option>
                  <option value="processing">In Processing</option>
                </select>
              </div>
            </div>

            <div>
              <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Court / Jurisdiction</label>
              <input type="text" id="modal-case-court" placeholder="e.g., JMFC Court Room 3, Pune"
                     style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);outline:none;">
            </div>

            <div>
              <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Legal Section / Acts</label>
              <input type="text" id="modal-case-section" placeholder="e.g., BNS §316 / IPC §420, §468"
                     style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);outline:none;">
            </div>

            <div style="display:flex;gap:var(--space-sm);justify-content:flex-end;margin-top:var(--space-md);">
              <button type="button" class="btn btn--secondary" id="cancel-modal-btn">Cancel</button>
              <button type="submit" class="btn btn--primary" id="btn-submit-new-case">
                <span class="material-symbols-outlined" style="font-size:18px;">save</span>
                Register Dossier
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Case Confirmation Modal -->
      <div id="delete-case-modal" class="modal-overlay" style="display:none;position:fixed;inset:0;z-index:70;background:rgba(0,0,0,0.65);align-items:center;justify-content:center;padding:var(--space-md);backdrop-filter:blur(4px);">
        <div class="card" style="width:100%;max-width:460px;padding:var(--space-xl);animation:slideUp 0.25s ease;box-shadow:var(--shadow-lg);border:1px solid #fecaca;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:var(--space-md);">
            <div style="width:42px;height:42px;border-radius:50%;background:#fee2e2;color:#dc2626;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span class="material-symbols-outlined" style="font-size:24px;">delete_forever</span>
            </div>
            <div>
              <h3 class="text-headline-sm" style="color:#991b1b;font-weight:700;margin:0;">Delete Case Record?</h3>
              <p style="font-size:0.8125rem;color:var(--on-surface-variant);margin:2px 0 0;">Permanent dossier removal</p>
            </div>
          </div>
          <p class="text-body-sm" id="delete-modal-case-message" style="color:var(--on-surface);margin-bottom:var(--space-lg);line-height:1.5;">
            Are you sure you want to delete this case record?
          </p>
          <div style="display:flex;gap:var(--space-sm);justify-content:flex-end;">
            <button type="button" class="btn btn--secondary" id="cancel-delete-modal-btn">Cancel</button>
            <button type="button" class="btn btn--sm" id="confirm-delete-case-btn" style="background:#dc2626;color:#ffffff;border:none;padding:9px 18px;border-radius:var(--radius-md);font-weight:600;display:inline-flex;align-items:center;gap:6px;cursor:pointer;">
              <span class="material-symbols-outlined" style="font-size:16px;">delete</span>
              Delete Case
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initCasesPage() {
  const searchInput = document.getElementById('case-search-input');
  const clearBtn = document.getElementById('clear-filters-btn');
  const caseCountEl = document.getElementById('displayed-case-count');
  const emptyState = document.getElementById('empty-filter-state');
  let currentFilter = 'all';

  // Delete modal state
  const deleteModal = document.getElementById('delete-case-modal');
  const cancelDeleteBtn = document.getElementById('cancel-delete-modal-btn');
  const confirmDeleteBtn = document.getElementById('confirm-delete-case-btn');
  let pendingDeleteId = null;
  let pendingDeleteTitle = '';

  function closeDeleteModal() {
    if (deleteModal) deleteModal.style.display = 'none';
    pendingDeleteId = null;
    pendingDeleteTitle = '';
  }

  cancelDeleteBtn?.addEventListener('click', closeDeleteModal);
  deleteModal?.addEventListener('click', (e) => {
    if (e.target === deleteModal) closeDeleteModal();
  });

  confirmDeleteBtn?.addEventListener('click', async () => {
    if (!pendingDeleteId) return;
    const idToDelete = pendingDeleteId;
    const titleToDelete = pendingDeleteTitle;
    closeDeleteModal();

    await api.deleteCase(idToDelete);

    const targetCards = document.querySelectorAll(`.case-record-item[data-case-id="${idToDelete}"]`);
    targetCards.forEach(targetCard => {
      targetCard.style.transition = 'all 0.25s ease';
      targetCard.style.opacity = '0';
      targetCard.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        targetCard.remove();
        updateGroupCounters();
        applyFilter();
      }, 250);
    });

    const toast = document.getElementById('cases-alert-toast');
    const toastText = document.getElementById('cases-alert-toast-text');
    if (toast && toastText) {
      toastText.textContent = `Case "${titleToDelete}" has been permanently removed.`;
      toast.style.background = '#fef2f2';
      toast.style.borderColor = '#fecaca';
      toast.style.color = '#991b1b';
      const icon = toast.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = 'delete';
        icon.style.color = '#dc2626';
      }
      toast.style.display = 'flex';
      setTimeout(() => {
        toast.style.display = 'none';
        toast.style.background = '#ecfdf5';
        toast.style.borderColor = '#a7f3d0';
        toast.style.color = '#065f46';
        if (icon) {
          icon.textContent = 'check_circle';
          icon.style.color = '#059669';
        }
      }, 4000);
    }
  });

  function updateGroupCounters() {
    const allCards = Array.from(document.querySelectorAll('.case-record-item'));
    const highCards = allCards.filter(c => c.getAttribute('data-case-seriousness') === 'high');
    const mediumCards = allCards.filter(c => c.getAttribute('data-case-seriousness') === 'medium');
    const lowCards = allCards.filter(c => c.getAttribute('data-case-seriousness') === 'low');

    const kpiHigh = document.getElementById('kpi-count-high');
    const kpiMed = document.getElementById('kpi-count-medium');
    const kpiLow = document.getElementById('kpi-count-low');
    if (kpiHigh) kpiHigh.textContent = `${highCards.length} Cases`;
    if (kpiMed) kpiMed.textContent = `${mediumCards.length} Cases`;
    if (kpiLow) kpiLow.textContent = `${lowCards.length} Cases`;

    const bHigh = document.getElementById('header-badge-high');
    const bMed = document.getElementById('header-badge-medium');
    const bLow = document.getElementById('header-badge-low');
    if (bHigh) bHigh.textContent = `${highCards.length} Records`;
    if (bMed) bMed.textContent = `${mediumCards.length} Records`;
    if (bLow) bLow.textContent = `${lowCards.length} Records`;
  }

  function applyFilter() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const caseCards = document.querySelectorAll('.case-record-item');
    let visibleCount = 0;

    const groupHigh = document.getElementById('group-high');
    const groupMedium = document.getElementById('group-medium');
    const groupLow = document.getElementById('group-low');

    let visibleHigh = 0;
    let visibleMedium = 0;
    let visibleLow = 0;

    caseCards.forEach(card => {
      const status = card.getAttribute('data-case-status');
      const seriousness = card.getAttribute('data-case-seriousness');
      const title = (card.getAttribute('data-case-title') || '').toLowerCase();
      const cnr = (card.getAttribute('data-case-cnr') || '').toLowerCase();
      const court = (card.getAttribute('data-case-court') || '').toLowerCase();

      let matchesFilter = true;
      if (currentFilter === 'all') {
        matchesFilter = true;
      } else if (currentFilter === 'seriousness-high') {
        matchesFilter = seriousness === 'high';
      } else if (currentFilter === 'seriousness-medium') {
        matchesFilter = seriousness === 'medium';
      } else if (currentFilter === 'seriousness-low') {
        matchesFilter = seriousness === 'low';
      } else {
        // Status filter
        matchesFilter = status === currentFilter;
      }

      const matchesQuery = !query || title.includes(query) || cnr.includes(query) || court.includes(query);

      if (matchesFilter && matchesQuery) {
        card.style.display = 'flex';
        visibleCount++;
        if (seriousness === 'high') visibleHigh++;
        if (seriousness === 'medium') visibleMedium++;
        if (seriousness === 'low') visibleLow++;
      } else {
        card.style.display = 'none';
      }
    });

    // Control visibility of the 3 separated section blocks
    if (groupHigh) {
      groupHigh.style.display = (visibleHigh > 0 || currentFilter === 'seriousness-high' || currentFilter === 'all') ? 'block' : 'none';
    }
    if (groupMedium) {
      groupMedium.style.display = (visibleMedium > 0 || currentFilter === 'seriousness-medium' || currentFilter === 'all') ? 'block' : 'none';
    }
    if (groupLow) {
      groupLow.style.display = (visibleLow > 0 || currentFilter === 'seriousness-low' || currentFilter === 'all') ? 'block' : 'none';
    }

    if (caseCountEl) {
      caseCountEl.innerHTML = `Showing <strong>${visibleCount}</strong> of ${caseCards.length} records (${visibleHigh} High, ${visibleMedium} Medium, ${visibleLow} Low)`;
    }
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Filter button clicks
  function setFilter(filterValue) {
    currentFilter = filterValue;
    document.querySelectorAll('[data-filter-mode]').forEach(b => {
      if (b.getAttribute('data-filter-mode') === filterValue) {
        b.classList.remove('btn--secondary');
        b.classList.add('btn--primary');
      } else {
        b.classList.remove('btn--primary');
        b.classList.add('btn--secondary');
      }
    });

    // Highlight KPI cards
    document.querySelectorAll('.seriousness-kpi-card').forEach(card => {
      card.classList.remove('active--high', 'active--medium', 'active--low');
      const qf = card.getAttribute('data-quick-filter');
      if (qf === filterValue) {
        if (filterValue === 'seriousness-high') card.classList.add('active--high');
        if (filterValue === 'seriousness-medium') card.classList.add('active--medium');
        if (filterValue === 'seriousness-low') card.classList.add('active--low');
      }
    });

    applyFilter();
  }

  document.querySelectorAll('[data-filter-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      setFilter(btn.getAttribute('data-filter-mode'));
    });
  });

  // KPI Card clicks
  document.querySelectorAll('.seriousness-kpi-card').forEach(card => {
    card.addEventListener('click', () => {
      const qf = card.getAttribute('data-quick-filter');
      if (qf) {
        setFilter(currentFilter === qf ? 'all' : qf);
      }
    });
  });

  searchInput?.addEventListener('input', applyFilter);

  clearBtn?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    setFilter('all');
  });

  // Card click navigation
  function attachCardListeners() {
    document.querySelectorAll('.case-record-item').forEach(card => {
      card.addEventListener('click', () => {
        const caseId = card.getAttribute('data-case-id');
        if (caseId) {
          api.setActiveCase(caseId);
          window.location.hash = '#/timeline';
        }
      });
    });

    document.querySelectorAll('.btn-open-timeline').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const caseId = btn.getAttribute('data-case-id');
        if (caseId) {
          api.setActiveCase(caseId);
          window.location.hash = '#/timeline';
        }
      });
    });

    document.querySelectorAll('.btn-delete-case').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        pendingDeleteId = btn.getAttribute('data-case-id');
        pendingDeleteTitle = btn.getAttribute('data-case-title') || 'this case';
        const msgEl = document.getElementById('delete-modal-case-message');
        if (msgEl) {
          msgEl.innerHTML = `Are you sure you want to permanently delete <strong>"${pendingDeleteTitle}"</strong>? All associated proceedings, timelines, and court records for this case will be purged.`;
        }
        if (deleteModal) deleteModal.style.display = 'flex';
      });
    });
  }

  attachCardListeners();

  // Modal Handling
  const modal = document.getElementById('new-case-modal');
  const openBtn = document.getElementById('open-create-modal-btn');
  const closeBtn = document.getElementById('close-modal-btn');
  const cancelBtn = document.getElementById('cancel-modal-btn');
  const form = document.getElementById('create-case-form');

  function openModal() {
    if (modal) modal.style.display = 'flex';
    document.getElementById('modal-case-title')?.focus();
  }
  function closeModal() {
    if (modal) modal.style.display = 'none';
  }

  openBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Handle New Case submission
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('modal-case-title')?.value || '';
    const seriousness = document.getElementById('modal-case-seriousness')?.value || 'medium';
    const cnr = document.getElementById('modal-case-cnr')?.value || '';
    const court = document.getElementById('modal-case-court')?.value || '';
    const section = document.getElementById('modal-case-section')?.value || '';
    const status = document.getElementById('modal-case-status')?.value || 'pending';

    if (!title.trim()) return;

    // Create via API client & persist in storage
    const newRecord = await api.createCase({
      title,
      seriousness,
      cnr,
      court,
      section,
      status,
    });

    closeModal();
    form.reset();

    // Reset filter to 'All Records'
    setFilter('all');

    // Prepend new record into appropriate seriousness group list
    const targetListId = seriousness === 'high' ? 'list-high' : (seriousness === 'low' ? 'list-low' : 'list-medium');
    const targetList = document.getElementById(targetListId);
    if (targetList) {
      const cardHtml = renderCaseCard(newRecord);
      targetList.insertAdjacentHTML('afterbegin', cardHtml);

      // Flash highlight on the newly added card
      const newlyAddedCard = targetList.querySelector(`[data-case-id="${newRecord.id}"]`);
      if (newlyAddedCard) {
        newlyAddedCard.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.4)';
        newlyAddedCard.style.background = '#eff6ff';
        setTimeout(() => {
          newlyAddedCard.style.boxShadow = '';
          newlyAddedCard.style.background = '';
        }, 2500);
      }
    }

    // Reattach listeners & update counters
    attachCardListeners();
    updateGroupCounters();
    applyFilter();

    // Show toast
    const toast = document.getElementById('cases-alert-toast');
    const toastText = document.getElementById('cases-alert-toast-text');
    if (toast && toastText) {
      toastText.textContent = `New Case "${newRecord.title}" (${seriousness.toUpperCase()} Seriousness) registered and placed in its dossier section!`;
      toast.style.display = 'flex';
      setTimeout(() => { toast.style.display = 'none'; }, 4000);
    }
  });
}
