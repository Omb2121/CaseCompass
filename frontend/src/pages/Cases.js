/**
 * CaseCompass — 1. Cases Page
 * Real-time Case Records Management supporting three distinct portals:
 * 1. User / Citizen Portal: Litigant only sees the case which they reported and related docket proceedings.
 * 2. Admin Portal: Court Registry Administrator sees all cases, filters across day/month timespans, and has full management authority.
 * 3. Judge Portal: Hon'ble Presiding Judge sees all cases throughout the day (cause list), month (hearing roster), and previous adjudicated decisions.
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
    return `<span class="badge badge--seriousness-high" title="Critical Review Priority · Urgent Criminal / Flagged Matter">
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

function renderCaseCard(c, currentRole = 'admin') {
  const safeTitle = (c.title || '').replace(/"/g, '&quot;');
  const seriousness = getCaseSeriousness(c);
  const borderColor = seriousness === 'high' ? '#ef4444' : (seriousness === 'medium' ? '#f59e0b' : '#10b981');
  const isDisposed = !!c.isDisposed;

  return `
    <div class="card-flat case-record-item" data-case-id="${c.id}" data-case-status="${c.status}"
         data-case-seriousness="${seriousness}" data-case-timespan="${c.timespan || 'day'}"
         data-case-is-disposed="${isDisposed ? 'true' : 'false'}"
         data-case-title="${safeTitle}" data-case-cnr="${c.cnr}" data-case-court="${c.court}"
         data-case-reported-by="${(c.reportedBy || '').replace(/"/g, '&quot;')}"
         style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-md);padding:var(--space-md) var(--space-lg);border-left:5px solid ${borderColor};transition:all 0.2s;cursor:pointer;"
         onmouseover="this.style.boxShadow='var(--shadow-md)';this.style.transform='translateY(-1px)'"
         onmouseout="this.style.boxShadow='var(--shadow-xs)';this.style.transform='translateY(0)'">
      
      <div style="display:flex;align-items:center;gap:var(--space-md);min-width:0;flex:1;">
        <div style="width:42px;height:42px;border-radius:var(--radius-md);background:${seriousness === 'high' ? '#fee2e2' : (seriousness === 'medium' ? '#fef3c7' : '#d1fae5')};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span class="material-symbols-outlined" style="font-size:22px;color:${borderColor}">
            ${currentRole === 'judge' ? 'gavel' : (seriousness === 'high' ? 'warning' : (seriousness === 'medium' ? 'folder_open' : 'verified'))}
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

            ${isDisposed ? `
              <span class="badge" style="background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;font-weight:700;font-size:0.6875rem;">
                <span class="material-symbols-outlined" style="font-size:12px;">task_alt</span> Previous Judgment Decided
              </span>
            ` : ''}

            ${currentRole === 'user' ? `
              <span class="badge" style="background:#eff6ff;color:#1d4ed8;font-size:0.6875rem;font-weight:600;">
                <span class="material-symbols-outlined" style="font-size:12px;">person</span> Reported by You
              </span>
            ` : (c.reportedBy ? `
              <span class="badge hide-mobile" style="background:#f8fafc;color:#475569;font-size:0.6875rem;border:1px solid #e2e8f0;">
                Reported by: ${c.reportedBy}
              </span>
            ` : '')}

            ${currentRole === 'judge' && c.benchItem ? `
              <span class="badge" style="background:#fef3c7;color:#92400e;border:1px solid #fde68a;font-weight:700;font-size:0.6875rem;">
                ${c.benchItem}
              </span>
            ` : ''}
          </div>

          <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;margin-top:4px;">
            <span class="text-code-sm" style="color:var(--secondary);background:var(--surface-container-low);padding:1px 6px;border-radius:var(--radius-sm);font-weight:600;">CNR: ${c.cnr}</span>
            <span class="text-body-sm" style="color:var(--on-surface-variant);">${c.court}</span>
            ${c.section ? `<span style="font-size:0.75rem;color:var(--outline);">&middot; ${c.section}</span>` : ''}
            ${c.hearingPurpose ? `<span style="font-size:0.75rem;color:#b45309;font-weight:600;">&middot; Purpose: ${c.hearingPurpose}</span>` : ''}
          </div>
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:var(--space-md);flex-shrink:0;flex-wrap:wrap;">
        <div style="text-align:center;min-width:44px;">
          <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;">Docs</div>
          <div class="text-body-md" style="font-weight:700;color:var(--primary);">${c.documents || 0}</div>
        </div>

        <div style="text-align:center;min-width:88px;">
          <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;">
            ${isDisposed ? 'Decided Order' : 'Hearing Date'}
          </div>
          <div class="text-body-sm" style="font-weight:600;color:var(--on-surface);">
            ${c.nextHearing || 'Today'}
          </div>
        </div>

        <button class="btn btn--secondary btn--sm btn-open-timeline" data-case-id="${c.id}" style="font-size:0.75rem;border-radius:var(--radius-md);" title="Open timeline for this case">
          <span>${currentRole === 'judge' ? 'Bench Dossier' : 'View Timeline'}</span>
          <span class="material-symbols-outlined" style="font-size:14px;">arrow_forward</span>
        </button>

        ${currentRole === 'admin' ? `
          <button class="btn btn--sm btn-delete-case" data-case-id="${c.id}" data-case-title="${safeTitle}" title="Admin Delete Authority"
                  style="font-size:0.75rem;border-radius:var(--radius-md);color:#dc2626;background:#fef2f2;border:1px solid #fecaca;padding:6px 12px;display:inline-flex;align-items:center;gap:4px;cursor:pointer;transition:all 0.15s ease;"
                  onmouseover="this.style.background='#fee2e2';this.style.borderColor='#f87171'"
                  onmouseout="this.style.background='#fef2f2';this.style.borderColor='#fecaca'">
            <span class="material-symbols-outlined" style="font-size:15px;color:#dc2626;">delete</span>
            <span style="font-weight:600;">Delete</span>
          </button>
        ` : (currentRole === 'user' ? `
          <button class="btn btn--sm btn-delete-case" data-case-id="${c.id}" data-case-title="${safeTitle}" title="Withdraw this reported case"
                  style="font-size:0.75rem;border-radius:var(--radius-md);color:#64748b;background:#f8fafc;border:1px solid #e2e8f0;padding:6px 10px;display:inline-flex;align-items:center;gap:4px;cursor:pointer;">
            <span class="material-symbols-outlined" style="font-size:14px;">delete</span>
            <span>Remove</span>
          </button>
        ` : '')}
      </div>
    </div>
  `;
}

export function renderCasesPage() {
  const currentRole = api.getCurrentRole();
  const currentUser = api.getCurrentUser();
  const cases = api.getCases({ role: currentRole, user: currentUser });

  // Divide into High, Medium, Low
  const highCases = cases.filter(c => getCaseSeriousness(c) === 'high');
  const mediumCases = cases.filter(c => getCaseSeriousness(c) === 'medium');
  const lowCases = cases.filter(c => getCaseSeriousness(c) === 'low');

  // Timespan counts for Admin & Judge
  const allRegistryCases = api.getCases({ ignoreRoleFilter: true });
  const dayCases = allRegistryCases.filter(c => c.timespan === 'day' && !c.isDisposed);
  const monthCases = allRegistryCases.filter(c => (c.timespan === 'day' || c.timespan === 'month') && !c.isDisposed);
  const pastJudgeCases = allRegistryCases.filter(c => c.isDisposed || c.timespan === 'past');

  // Portal-specific Filters
  let filterPills = [];

  if (currentRole === 'admin') {
    // Admin Timespan Authority Filters
    filterPills = [
      { value: 'all', label: `All Records (${cases.length})`, isTimespan: false },
      { value: 'timespan-day', label: `📅 Listed Today (Day) (${dayCases.length})`, isTimespan: true },
      { value: 'timespan-month', label: `🗓️ Listed This Month (Month) (${monthCases.length})`, isTimespan: true },
      { value: 'flagged', label: 'Flagged', isTimespan: false },
      { value: 'pending', label: 'Pending', isTimespan: false },
      { value: 'verified', label: 'Verified', isTimespan: false },
    ];
  } else if (currentRole === 'judge') {
    // Judge Bench Cause List Filters
    filterPills = [
      { value: 'judge-day', label: `📅 Today's Cause List (Day) (${dayCases.length})`, isTimespan: true },
      { value: 'judge-month', label: `🗓️ Monthly Hearing Roster (Month) (${monthCases.length})`, isTimespan: true },
      { value: 'judge-past', label: `📜 Previous Adjudicated Cases (${pastJudgeCases.length})`, isTimespan: true },
      { value: 'all', label: `All Bench Cases (${cases.length})`, isTimespan: false },
      { value: 'flagged', label: 'Urgent Flagged', isTimespan: false },
    ];
  } else {
    // User / Citizen Filter Pills (only personal reported cases)
    filterPills = [
      { value: 'all', label: `My Reported Cases (${cases.length})`, isTimespan: false },
      { value: 'verified', label: 'Verified', isTimespan: false },
      { value: 'pending', label: 'Pending Review', isTimespan: false },
      { value: 'flagged', label: 'Needs Attention', isTimespan: false },
    ];
  }

  return `
    <div class="page-content animate-fade-in" style="max-width: 1200px;">
      <!-- Success Toast Notification Placeholder -->
      <div id="cases-alert-toast" style="display:none;margin-bottom:var(--space-md);padding:12px 18px;border-radius:var(--radius-md);background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;align-items:center;gap:10px;">
        <span class="material-symbols-outlined" style="color:#059669;font-size:20px;">check_circle</span>
        <span id="cases-alert-toast-text" style="font-size:0.875rem;font-weight:600;">Action completed successfully</span>
      </div>

      <!-- PORTAL ROLE BANNER -->
      ${currentRole === 'user' ? `
        <div style="padding:12px 16px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:var(--radius-md);margin-bottom:var(--space-lg);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;color:#1e40af;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="material-symbols-outlined" style="font-size:22px;color:#2563eb;">person</span>
            <div>
              <strong style="font-size:0.875rem;">Citizen & Litigant Access Mode:</strong>
              <div style="font-size:0.75rem;color:#3b82f6;">
                Viewing cases reported by <strong>${currentUser}</strong>. Confidential cases belonging to other litigants are restricted.
              </div>
            </div>
          </div>
          <span class="badge" style="background:#dbeafe;color:#1d4ed8;font-weight:700;">Litigant View (${cases.length} Reported)</span>
        </div>
      ` : (currentRole === 'judge' ? `
        <div style="padding:12px 16px;background:#fffbeb;border:1px solid #fde68a;border-radius:var(--radius-md);margin-bottom:var(--space-lg);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;color:#92400e;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="material-symbols-outlined" style="font-size:22px;color:#d97706;">gavel</span>
            <div>
              <strong style="font-size:0.875rem;">Hon'ble Presiding Judge Bench Portal:</strong>
              <div style="font-size:0.75rem;color:#b45309;">
                Bench roster for <strong>${currentUser}</strong> — Daily cause list, monthly hearing roster, and all past adjudicated decisions.
              </div>
            </div>
          </div>
          <span class="badge" style="background:#fef3c7;color:#92400e;font-weight:700;">Presiding Magistrate</span>
        </div>
      ` : `
        <div style="padding:12px 16px;background:#faf5ff;border:1px solid #e9d5ff;border-radius:var(--radius-md);margin-bottom:var(--space-lg);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;color:#5b21b6;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="material-symbols-outlined" style="font-size:22px;color:#7c3aed;">admin_panel_settings</span>
            <div>
              <strong style="font-size:0.875rem;">Court Registry Administrator Portal:</strong>
              <div style="font-size:0.75rem;color:#7c3aed;">
                Master Registry Authority: Total oversight of all dossiers across Day and Month timespans with full modification powers.
              </div>
            </div>
          </div>
          <span class="badge" style="background:#ede9fe;color:#5b21b6;font-weight:700;">Registry Authority</span>
        </div>
      `)}

      <!-- Page Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--space-md);margin-bottom:var(--space-lg);">
        <div>
          <h1 class="page-heading">
            ${currentRole === 'user' ? 'My Reported Legal Cases' : (currentRole === 'judge' ? 'Hon\'ble Presiding Judge Bench Dossier' : '1. Cases Dossier Management')}
          </h1>
          <p class="text-body-sm" style="color:var(--on-surface-variant);margin-top:4px;">
            ${currentRole === 'user'
              ? 'Personal legal dockets reported by you with verified timelines, hearing alerts, and plain summaries.'
              : (currentRole === 'judge'
                ? 'Daily cause list hearings throughout the day, monthly rosters, and past adjudicated judgments.'
                : 'All district dossiers categorized into High, Medium, and Low seriousness with full registry timespans.')}
          </p>
        </div>
        <button class="btn btn--primary" id="open-create-modal-btn">
          <span class="material-symbols-outlined" style="font-size:18px">add</span>
          ${currentRole === 'user' ? 'Report New Case' : (currentRole === 'judge' ? 'Register Bench Case' : 'New Case Record')}
        </button>
      </div>

      <!-- Empty state when zero cases are registered in the portal -->
      <div id="no-cases-registered-banner" style="display:${cases.length === 0 ? 'block' : 'none'};text-align:center;padding:var(--space-2xl) var(--space-lg);background:var(--surface-container-lowest);border-radius:var(--radius-lg);border:1px dashed var(--outline-variant);margin-bottom:var(--space-lg);">
        <span class="material-symbols-outlined" style="font-size:56px;color:var(--outline);">folder_off</span>
        <h3 class="text-headline-sm" style="color:var(--on-surface);margin-top:var(--space-sm);font-weight:700;">
          ${currentRole === 'user' ? 'No Reported Cases Found' : 'No Cases Registered'}
        </h3>
        <p class="text-body-sm" style="color:var(--on-surface-variant);max-width:480px;margin:8px auto var(--space-md);">
          ${currentRole === 'user'
            ? `You have not reported any legal cases under ${currentUser}. Click "Report New Case" to register your initial docket.`
            : 'There are currently no active cases registered in this registry view. Click "New Case Record" to register your first dossier.'}
        </p>
        <button class="btn btn--primary" id="btn-banner-new-case">
          <span class="material-symbols-outlined" style="font-size:18px;">add</span>
          ${currentRole === 'user' ? 'Report First Case' : 'Register First Case'}
        </button>
      </div>

      <!-- Seriousness Quick KPI Summary Grid (only appears when cases exist) -->
      <div id="seriousness-kpi-container" style="display:${cases.length > 0 ? 'grid' : 'none'};grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:var(--space-md);margin-bottom:var(--space-lg);">
        <!-- High Seriousness Card -->
        <div class="seriousness-kpi-card" id="kpi-card-high" data-quick-filter="seriousness-high" data-target-group="group-high" style="border-left: 5px solid #ef4444;display:${highCases.length > 0 ? 'block' : 'none'};">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:0.75rem;font-weight:700;color:#b91c1c;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:4px;">
                <span class="material-symbols-outlined" style="font-size:15px;color:#ef4444;">priority_high</span>
                High Seriousness
              </div>
              <div style="font-size:1.625rem;font-weight:800;color:#991b1b;margin-top:2px;" id="kpi-count-high">
                ${highCases.length} ${highCases.length === 1 ? 'Case' : 'Cases'}
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
        <div class="seriousness-kpi-card" id="kpi-card-medium" data-quick-filter="seriousness-medium" data-target-group="group-medium" style="border-left: 5px solid #f59e0b;display:${mediumCases.length > 0 ? 'block' : 'none'};">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:0.75rem;font-weight:700;color:#b45309;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:4px;">
                <span class="material-symbols-outlined" style="font-size:15px;color:#f59e0b;">schedule</span>
                Medium Seriousness
              </div>
              <div style="font-size:1.625rem;font-weight:800;color:#92400e;margin-top:2px;" id="kpi-count-medium">
                ${mediumCases.length} ${mediumCases.length === 1 ? 'Case' : 'Cases'}
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
        <div class="seriousness-kpi-card" id="kpi-card-low" data-quick-filter="seriousness-low" data-target-group="group-low" style="border-left: 5px solid #10b981;display:${lowCases.length > 0 ? 'block' : 'none'};">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:0.75rem;font-weight:700;color:#047857;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:4px;">
                <span class="material-symbols-outlined" style="font-size:15px;color:#10b981;">check_circle</span>
                Low Seriousness
              </div>
              <div style="font-size:1.625rem;font-weight:800;color:#065f46;margin-top:2px;" id="kpi-count-low">
                ${lowCases.length} ${lowCases.length === 1 ? 'Case' : 'Cases'}
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

      <!-- Search & Filter Controls Bar -->
      <div class="card-flat" id="search-filter-controls-bar" style="display:${cases.length > 0 ? 'flex' : 'none'};padding:var(--space-md);margin-bottom:var(--space-lg);flex-wrap:wrap;gap:var(--space-md);align-items:center;justify-content:space-between;">
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
      <div style="display:${cases.length > 0 ? 'flex' : 'none'};margin-bottom:var(--space-sm);font-size:0.8125rem;color:var(--on-surface-variant);justify-content:space-between;align-items:center;" id="displayed-case-count">
        <span>Showing <strong>${cases.length}</strong> ${currentRole === 'user' ? 'reported cases' : (currentRole === 'judge' ? 'bench cases' : 'registry dossiers')}</span>
      </div>

      <!-- ======================================================== -->
      <!-- SEPARATED SECTIONS: HIGH, MEDIUM, AND LOW CASES -->
      <!-- Only appears when cases exist in that category -->
      <!-- ======================================================== -->
      <div id="cases-divided-container">
        <!-- 1. HIGH SERIOUSNESS SECTION -->
        <div class="seriousness-group-block" id="group-high" style="display:${highCases.length > 0 ? 'block' : 'none'};margin-bottom: var(--space-xl);">
          <div class="seriousness-section-header header--high">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="font-size:18px;">priority_high</span>
              <span>1. High Seriousness & Urgent Review</span>
              <span class="badge badge--seriousness-high" style="font-size:0.625rem;" id="header-badge-high">${highCases.length} Records</span>
            </div>
            <span class="hide-mobile" style="font-size:0.6875rem;opacity:0.85;font-weight:600;">Critical review required &middot; Flagged evidence / Penal trial</span>
          </div>
          <div class="cases-group-list" id="list-high" style="display:flex;flex-direction:column;gap:var(--space-sm);">
            ${highCases.map(c => renderCaseCard(c, currentRole)).join('')}
          </div>
        </div>

        <!-- 2. MEDIUM SERIOUSNESS SECTION -->
        <div class="seriousness-group-block" id="group-medium" style="display:${mediumCases.length > 0 ? 'block' : 'none'};margin-bottom: var(--space-xl);">
          <div class="seriousness-section-header header--medium">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="font-size:18px;">schedule</span>
              <span>2. Medium Seriousness & In-Progress Review</span>
              <span class="badge badge--seriousness-medium" style="font-size:0.625rem;" id="header-badge-medium">${mediumCases.length} Records</span>
            </div>
            <span class="hide-mobile" style="font-size:0.6875rem;opacity:0.85;font-weight:600;">Active trial proceedings &middot; Pending documentary review</span>
          </div>
          <div class="cases-group-list" id="list-medium" style="display:flex;flex-direction:column;gap:var(--space-sm);">
            ${mediumCases.map(c => renderCaseCard(c, currentRole)).join('')}
          </div>
        </div>

        <!-- 3. LOW SERIOUSNESS SECTION -->
        <div class="seriousness-group-block" id="group-low" style="display:${lowCases.length > 0 ? 'block' : 'none'};margin-bottom: var(--space-xl);">
          <div class="seriousness-section-header header--low">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="font-size:18px;">check_circle</span>
              <span>3. Low Seriousness & Routine Dockets</span>
              <span class="badge badge--seriousness-low" style="font-size:0.625rem;" id="header-badge-low">${lowCases.length} Records</span>
            </div>
            <span class="hide-mobile" style="font-size:0.6875rem;opacity:0.85;font-weight:600;">Verified clean dockets &middot; Civil compliance & routine scheduling</span>
          </div>
          <div class="cases-group-list" id="list-low" style="display:flex;flex-direction:column;gap:var(--space-sm);">
            ${lowCases.map(c => renderCaseCard(c, currentRole)).join('')}
          </div>
        </div>
      </div>

      <!-- Empty Filter State -->
      <div id="empty-filter-state" style="display:none;text-align:center;padding:var(--space-xl);color:var(--on-surface-variant);">
        <span class="material-symbols-outlined" style="font-size:48px;color:var(--outline-variant)">search_off</span>
        <p class="text-body-md" style="margin-top:var(--space-sm);">No records match your selected criteria or timespan.</p>
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
                <h2 class="text-headline-sm" style="color:var(--primary);font-weight:700;">
                  ${currentRole === 'user' ? 'Report / Register My Case' : 'Register New Case Record'}
                </h2>
                <p style="font-size:0.75rem;color:var(--on-surface-variant);">
                  ${currentRole === 'user' ? `Attributed directly to your identity (${currentUser})` : 'Assign seriousness, timespan, and dossier parameters'}
                </p>
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
                <option value="high">🔴 High Seriousness (Urgent Criminal / Flagged Matter)</option>
                <option value="medium" selected>🟡 Medium Seriousness (Active Trial / Pending Review)</option>
                <option value="low">🟢 Low Seriousness (Routine Compliance / Civil Docket)</option>
              </select>
            </div>

            <!-- Timespan Listing -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Hearing Timespan *</label>
                <select id="modal-case-timespan" style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);background:white;outline:none;font-weight:600;">
                  <option value="day" selected>📅 Listed Today (Day)</option>
                  <option value="month">🗓️ Listed This Month (Month)</option>
                  <option value="past">📜 Previous Adjudicated Case</option>
                </select>
              </div>
              <div>
                <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Reported By</label>
                <input type="text" id="modal-case-reported-by" value="${currentUser}"
                       style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);outline:none;background:#f8fafc;" ${currentRole === 'user' ? 'readonly' : ''}>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">CNR Number</label>
                <input type="text" id="modal-case-cnr" placeholder="e.g., MHPU01-009842-2025"
                       style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);outline:none;">
              </div>
              <div>
                <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Review Status</label>
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
              <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Hearing Purpose / Bench Notes</label>
              <input type="text" id="modal-case-purpose" placeholder="e.g., Cross-Examination of PW-2 / Arguments on Bail"
                     style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);outline:none;">
            </div>

            <div style="display:flex;gap:var(--space-sm);justify-content:flex-end;margin-top:var(--space-md);">
              <button type="button" class="btn btn--secondary" id="cancel-modal-btn">Cancel</button>
              <button type="submit" class="btn btn--primary" id="btn-submit-new-case">
                <span class="material-symbols-outlined" style="font-size:18px;">save</span>
                ${currentRole === 'user' ? 'Report Dossier' : 'Register Dossier'}
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
              <p style="font-size:0.8125rem;color:var(--on-surface-variant);margin:2px 0 0;">Permanent removal</p>
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
  const currentRole = api.getCurrentRole();
  const currentUser = api.getCurrentUser();

  const searchInput = document.getElementById('case-search-input');
  const clearBtn = document.getElementById('clear-filters-btn');
  const caseCountEl = document.getElementById('displayed-case-count');
  const emptyState = document.getElementById('empty-filter-state');
  let currentFilter = currentRole === 'judge' ? 'judge-day' : 'all';

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
      toast.style.display = 'flex';
      setTimeout(() => {
        toast.style.display = 'none';
        toast.style.background = '#ecfdf5';
        toast.style.borderColor = '#a7f3d0';
        toast.style.color = '#065f46';
      }, 4000);
    }
  });

  function updateGroupCounters() {
    const allCards = Array.from(document.querySelectorAll('.case-record-item'));
    const highCards = allCards.filter(c => c.getAttribute('data-case-seriousness') === 'high');
    const mediumCards = allCards.filter(c => c.getAttribute('data-case-seriousness') === 'medium');
    const lowCards = allCards.filter(c => c.getAttribute('data-case-seriousness') === 'low');

    const totalCount = allCards.length;
    const kpiContainer = document.getElementById('seriousness-kpi-container');
    const noCasesBanner = document.getElementById('no-cases-registered-banner');
    const controlsBar = document.getElementById('search-filter-controls-bar');
    const countSummary = document.getElementById('displayed-case-count');

    if (kpiContainer) {
      kpiContainer.style.display = totalCount > 0 ? 'grid' : 'none';
    }
    if (noCasesBanner) {
      noCasesBanner.style.display = totalCount === 0 ? 'block' : 'none';
    }
    if (controlsBar) {
      controlsBar.style.display = totalCount > 0 ? 'flex' : 'none';
    }
    if (countSummary) {
      countSummary.style.display = totalCount > 0 ? 'flex' : 'none';
    }

    // High Card: only show if highCards.length > 0
    const cardHigh = document.getElementById('kpi-card-high');
    if (cardHigh) {
      cardHigh.style.display = highCards.length > 0 ? 'block' : 'none';
      const kpiHigh = document.getElementById('kpi-count-high');
      if (kpiHigh) kpiHigh.textContent = `${highCards.length} ${highCards.length === 1 ? 'Case' : 'Cases'}`;
    }

    // Medium Card: only show if mediumCards.length > 0
    const cardMed = document.getElementById('kpi-card-medium');
    if (cardMed) {
      cardMed.style.display = mediumCards.length > 0 ? 'block' : 'none';
      const kpiMed = document.getElementById('kpi-count-medium');
      if (kpiMed) kpiMed.textContent = `${mediumCards.length} ${mediumCards.length === 1 ? 'Case' : 'Cases'}`;
    }

    // Low Card: only show if lowCards.length > 0
    const cardLow = document.getElementById('kpi-card-low');
    if (cardLow) {
      cardLow.style.display = lowCards.length > 0 ? 'block' : 'none';
      const kpiLow = document.getElementById('kpi-count-low');
      if (kpiLow) kpiLow.textContent = `${lowCards.length} ${lowCards.length === 1 ? 'Case' : 'Cases'}`;
    }

    const bHigh = document.getElementById('header-badge-high');
    const bMed = document.getElementById('header-badge-medium');
    const bLow = document.getElementById('header-badge-low');
    if (bHigh) bHigh.textContent = `${highCards.length} Records`;
    if (bMed) bMed.textContent = `${mediumCards.length} Records`;
    if (bLow) bLow.textContent = `${lowCards.length} Records`;

    const allRecordsPill = document.querySelector('[data-filter-mode="all"]');
    if (allRecordsPill) {
      allRecordsPill.textContent = currentRole === 'user' ? `My Reported Cases (${totalCount})` : `All Records (${totalCount})`;
    }
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
      const timespan = card.getAttribute('data-case-timespan') || 'day';
      const isDisposed = card.getAttribute('data-case-is-disposed') === 'true';
      const title = (card.getAttribute('data-case-title') || '').toLowerCase();
      const cnr = (card.getAttribute('data-case-cnr') || '').toLowerCase();
      const court = (card.getAttribute('data-case-court') || '').toLowerCase();

      let matchesFilter = true;

      if (currentFilter === 'all') {
        matchesFilter = true;
      } else if (currentFilter === 'timespan-day') {
        matchesFilter = timespan === 'day';
      } else if (currentFilter === 'timespan-month') {
        matchesFilter = timespan === 'day' || timespan === 'month';
      } else if (currentFilter === 'judge-day') {
        matchesFilter = timespan === 'day' && !isDisposed;
      } else if (currentFilter === 'judge-month') {
        matchesFilter = (timespan === 'day' || timespan === 'month') && !isDisposed;
      } else if (currentFilter === 'judge-past') {
        matchesFilter = isDisposed || timespan === 'past';
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
      groupHigh.style.display = visibleHigh > 0 ? 'block' : 'none';
    }
    if (groupMedium) {
      groupMedium.style.display = visibleMedium > 0 ? 'block' : 'none';
    }
    if (groupLow) {
      groupLow.style.display = visibleLow > 0 ? 'block' : 'none';
    }

    if (caseCountEl) {
      caseCountEl.innerHTML = `Showing <strong>${visibleCount}</strong> of ${caseCards.length} records (${visibleHigh} High, ${visibleMedium} Medium, ${visibleLow} Low)`;
    }
    if (emptyState) {
      emptyState.style.display = (visibleCount === 0 && caseCards.length > 0) ? 'block' : 'none';
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

  // KPI Card clicks - highlight & filter / scroll
  document.querySelectorAll('.seriousness-kpi-card').forEach(card => {
    card.addEventListener('click', () => {
      const qf = card.getAttribute('data-quick-filter');
      if (qf) {
        const next = currentFilter === qf ? 'all' : qf;
        setFilter(next);
        const targetGroupId = card.getAttribute('data-target-group');
        const targetEl = targetGroupId ? document.getElementById(targetGroupId) : null;
        if (targetEl && targetEl.style.display !== 'none') {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  });

  searchInput?.addEventListener('input', applyFilter);

  clearBtn?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    setFilter(currentRole === 'judge' ? 'judge-day' : 'all');
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
          msgEl.innerHTML = `Are you sure you want to permanently delete <strong>"${pendingDeleteTitle}"</strong>? All associated proceedings, timelines, and court records will be purged.`;
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
  document.getElementById('btn-banner-new-case')?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Handle New Case submission
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('modal-case-title')?.value || '';
    const seriousness = document.getElementById('modal-case-seriousness')?.value || 'medium';
    const timespan = document.getElementById('modal-case-timespan')?.value || 'day';
    const reportedBy = document.getElementById('modal-case-reported-by')?.value || currentUser;
    const cnr = document.getElementById('modal-case-cnr')?.value || '';
    const court = document.getElementById('modal-case-court')?.value || '';
    const purpose = document.getElementById('modal-case-purpose')?.value || '';
    const status = document.getElementById('modal-case-status')?.value || 'pending';

    if (!title.trim()) return;

    const newRecord = await api.createCase({
      title,
      seriousness,
      timespan,
      reportedBy,
      cnr,
      court,
      hearingPurpose: purpose,
      status,
    });

    closeModal();
    form.reset();

    // Reset filter
    setFilter(currentRole === 'judge' ? 'judge-day' : 'all');

    // Prepend new record into appropriate seriousness group list
    const targetListId = seriousness === 'high' ? 'list-high' : (seriousness === 'low' ? 'list-low' : 'list-medium');
    const targetList = document.getElementById(targetListId);
    if (targetList) {
      const cardHtml = renderCaseCard(newRecord, currentRole);
      targetList.insertAdjacentHTML('afterbegin', cardHtml);

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

    attachCardListeners();
    updateGroupCounters();
    applyFilter();

    const toast = document.getElementById('cases-alert-toast');
    const toastText = document.getElementById('cases-alert-toast-text');
    if (toast && toastText) {
      toastText.textContent = `New Case "${newRecord.title}" successfully registered under ${reportedBy}!`;
      toast.style.display = 'flex';
      setTimeout(() => { toast.style.display = 'none'; }, 4000);
    }
  });

  // Apply default initial filter
  applyFilter();
}
