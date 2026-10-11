/**
 * CaseCompass — 3. Timeline Page
 * Interactive Case Timeline with End-of-Timeline Docket Determination
 * Allows setting case status: verified, pending, flagged, processing.
 */

import { api } from '../api.js';

function eventTypeColor(type) {
  const map = {
    filing: { bg: 'var(--surface-container-low)', border: 'var(--primary)', icon: 'var(--primary)' },
    proceeding: { bg: 'var(--surface-container-low)', border: 'var(--status-verified)', icon: 'var(--status-verified)' },
    order: { bg: 'var(--surface-container-low)', border: 'var(--status-processing)', icon: 'var(--status-processing)' },
    hearing: { bg: 'var(--surface-container-low)', border: 'var(--secondary)', icon: 'var(--secondary)' },
    upcoming: { bg: 'var(--status-pending-bg)', border: 'var(--status-pending)', icon: 'var(--status-pending)' },
  };
  return map[type] || map.filing;
}

function statusBadgeHtml(status) {
  const map = {
    verified: { label: 'Verified Docket', cls: 'badge--verified', icon: 'verified' },
    pending: { label: 'Pending Review', cls: 'badge--pending', icon: 'schedule' },
    flagged: { label: 'Flagged / Needs Attention', cls: 'badge--flagged', icon: 'flag' },
    processing: { label: 'In Processing', cls: 'badge--processing', icon: 'sync' },
  };
  const item = map[status] || map.pending;
  return `
    <span class="badge ${item.cls}" id="timeline-top-badge" style="font-size:0.8125rem;border-radius:var(--radius-full);padding:4px 12px;display:inline-flex;align-items:center;gap:6px;">
      <span class="material-symbols-outlined" style="font-size:16px">${item.icon}</span>
      <span id="timeline-top-badge-text">${item.label}</span>
    </span>
  `;
}

export function renderTimelinePage() {
  const activeCase = api.getActiveCase();
  const timelineEvents = JSON.parse(localStorage.getItem('casecompass_timeline_events') || '[]');

  return `
    <div class="page-content animate-fade-in" style="max-width: 960px; margin: 0 auto;">
      <!-- Success Notification Toast -->
      <div id="timeline-status-toast" style="display:none;margin-bottom:var(--space-md);padding:12px 18px;border-radius:var(--radius-md);background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;align-items:center;justify-content:space-between;gap:10px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="material-symbols-outlined" style="color:#059669;font-size:20px;">check_circle</span>
          <span id="timeline-status-toast-text" style="font-size:0.875rem;font-weight:600;">Status updated successfully!</span>
        </div>
        <a href="#/cases" style="color:#059669;font-weight:700;font-size:0.8125rem;text-decoration:underline;">View in All Records →</a>
      </div>

      <!-- Compact Case Header -->
      <div class="card" style="padding:16px 20px;margin-bottom:var(--space-md);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;box-shadow:var(--shadow-xs);">
        <div style="display:flex;flex-direction:column;gap:4px;">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <h1 style="font-size:1.375rem;font-weight:700;color:var(--on-surface);letter-spacing:-0.01em;" id="timeline-case-title">
              ${activeCase.title}
            </h1>
            ${statusBadgeHtml(activeCase.status)}
          </div>
          <p class="text-body-sm" style="color:var(--on-surface-variant);">
            CNR: <strong style="color:var(--primary);">${activeCase.cnr}</strong> · ${activeCase.court}
          </p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <a href="#/cases" class="btn btn--secondary btn--sm" style="border-radius:var(--radius-md);text-decoration:none;">
            <span class="material-symbols-outlined" style="font-size:16px;">folder_open</span>
            <span>All Cases</span>
          </a>
        </div>
      </div>

      <!-- Next Hearing Banner -->
      <div style="background:var(--primary);color:#fff;padding:16px 20px;margin-bottom:var(--space-lg);border-radius:var(--radius-lg);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;box-shadow:var(--shadow-sm);">
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="width:42px;height:42px;border-radius:10px;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;">
            <span class="material-symbols-outlined" style="font-size:24px;color:#fff">event</span>
          </div>
          <div>
            <div class="text-label-sm" style="opacity:0.85;text-transform:uppercase;letter-spacing:0.08em;">Next Scheduled Hearing</div>
            <div style="font-size:1.125rem;font-weight:700;">${activeCase.nextHearing || 'Upcoming Scheduling'}</div>
            <div class="text-body-sm" style="opacity:0.85;">${activeCase.section || 'District Court Docket Hearing'}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;opacity:0.95;">
          <span class="material-symbols-outlined" style="font-size:18px">location_city</span>
          <span class="text-body-sm" style="font-weight:600;">${activeCase.court}</span>
        </div>
      </div>

      <!-- Timeline Heading -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-md);">
        <div>
          <h2 class="text-headline-sm" style="color:var(--primary);font-weight:700;">Case Proceedings Timeline</h2>
          <p style="font-size:0.8125rem;color:var(--on-surface-variant);">Chronological court filings, witness examinations, and orders</p>
        </div>
        <span class="badge badge--neutral" style="border-radius:var(--radius-sm);font-weight:600;">${timelineEvents.length} Events Logged</span>
      </div>

      <!-- Timeline Events -->
      <div class="stagger-children" style="position:relative;padding-left:28px;margin-bottom:var(--space-xl);">
        <!-- Vertical line -->
        <div style="position:absolute;left:11px;top:8px;bottom:8px;width:2px;background:var(--outline-variant);border-radius:1px;"></div>

        ${timelineEvents.map((evt, i) => {
          const colors = eventTypeColor(evt.type);
          const isLast = i === timelineEvents.length - 1;
          return `
            <div style="position:relative;padding-bottom:${isLast ? '0' : 'var(--space-lg)'};display:flex;gap:var(--space-md);">
              <!-- Dot -->
              <div style="position:absolute;left:-24px;top:4px;width:14px;height:14px;border-radius:50%;border:2px solid ${colors.border};background:var(--surface-container-lowest);z-index:1;"></div>

              <!-- Content Card -->
              <div class="card-flat" style="flex:1;padding:var(--space-md);border-left:3px solid ${colors.border};transition:box-shadow 0.15s;border-radius:var(--radius-md);"
                   onmouseover="this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.boxShadow='var(--shadow-xs)'">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:4px;">
                  <div style="display:flex;align-items:center;gap:var(--space-sm);">
                    <span class="material-symbols-outlined" style="font-size:18px;color:${colors.icon}">${evt.icon}</span>
                    <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">${evt.label}</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span class="text-body-sm" style="color:var(--on-surface-variant);font-weight:500;">${evt.date}</span>
                    ${evt.verified
                      ? '<span class="badge badge--verified" style="font-size:0.625rem;padding:2px 8px;"><span class="material-symbols-outlined" style="font-size:11px">check</span> Verified</span>'
                      : '<span class="badge badge--pending" style="font-size:0.625rem;padding:2px 8px;">Upcoming</span>'
                    }
                  </div>
                </div>
                <p class="text-body-sm" style="color:var(--on-surface-variant);line-height:1.5;">${evt.description}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- ======================================================== -->
      <!-- END OF TIMELINE: DOCKET DETERMINATION & STATUS SELECTOR -->
      <!-- ======================================================== -->
      <div class="card" style="padding:var(--space-lg);border-radius:var(--radius-lg);border:2px solid #93c5fd;background:linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%);box-shadow:var(--shadow-md);margin-top:var(--space-lg);">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:var(--space-md);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:44px;height:44px;border-radius:12px;background:#1e3a8a;color:#ffffff;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-sm);">
              <span class="material-symbols-outlined" style="font-size:24px;">fact_check</span>
            </div>
            <div>
              <h3 style="font-size:1.125rem;font-weight:700;color:#0F2A4A;margin-bottom:2px;">
                End of Timeline: Case Status Assessment
              </h3>
              <p style="font-size:0.8125rem;color:#475569;">
                Choose the verified outcome for <strong>${activeCase.title}</strong> after reviewing all timeline proceedings:
              </p>
            </div>
          </div>
          <div id="current-outcome-display" style="padding:6px 14px;border-radius:9999px;background:#ffffff;border:1px solid #cbd5e1;font-size:0.8125rem;font-weight:700;display:flex;align-items:center;gap:6px;">
            <span>Current Status:</span>
            <strong id="current-outcome-name" style="color:#0F2A4A;text-transform:capitalize;">${activeCase.status}</strong>
          </div>
        </div>

        <!-- 4 Status Action Buttons -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;margin-top:var(--space-md);">
          <!-- 1. Verified Button -->
          <button class="btn btn-status-choice ${activeCase.status === 'verified' ? 'active-choice' : ''}" data-set-status="verified"
                  style="display:flex;flex-direction:column;align-items:center;padding:14px;border-radius:10px;border:2px solid ${activeCase.status === 'verified' ? '#059669' : '#e2e8f0'};background:${activeCase.status === 'verified' ? '#ecfdf5' : '#ffffff'};cursor:pointer;transition:all 0.15s ease;">
            <span class="material-symbols-outlined" style="font-size:26px;color:#059669;margin-bottom:6px;">verified</span>
            <strong style="color:#065f46;font-size:0.875rem;">Verified</strong>
            <span style="font-size:0.75rem;color:#64748b;text-align:center;margin-top:2px;">All orders & citations verified</span>
          </button>

          <!-- 2. Pending Review Button -->
          <button class="btn btn-status-choice ${activeCase.status === 'pending' ? 'active-choice' : ''}" data-set-status="pending"
                  style="display:flex;flex-direction:column;align-items:center;padding:14px;border-radius:10px;border:2px solid ${activeCase.status === 'pending' ? '#d97706' : '#e2e8f0'};background:${activeCase.status === 'pending' ? '#fffbeb' : '#ffffff'};cursor:pointer;transition:all 0.15s ease;">
            <span class="material-symbols-outlined" style="font-size:26px;color:#d97706;margin-bottom:6px;">schedule</span>
            <strong style="color:#92400e;font-size:0.875rem;">Pending Review</strong>
            <span style="font-size:0.75rem;color:#64748b;text-align:center;margin-top:2px;">Awaiting clerk verification</span>
          </button>

          <!-- 3. Flagged Button -->
          <button class="btn btn-status-choice ${activeCase.status === 'flagged' ? 'active-choice' : ''}" data-set-status="flagged"
                  style="display:flex;flex-direction:column;align-items:center;padding:14px;border-radius:10px;border:2px solid ${activeCase.status === 'flagged' ? '#dc2626' : '#e2e8f0'};background:${activeCase.status === 'flagged' ? '#fef2f2' : '#ffffff'};cursor:pointer;transition:all 0.15s ease;">
            <span class="material-symbols-outlined" style="font-size:26px;color:#dc2626;margin-bottom:6px;">flag</span>
            <strong style="color:#991b1b;font-size:0.875rem;">Flagged</strong>
            <span style="font-size:0.75rem;color:#64748b;text-align:center;margin-top:2px;">Discrepancy / Attention needed</span>
          </button>

          <!-- 4. Processing Button -->
          <button class="btn btn-status-choice ${activeCase.status === 'processing' ? 'active-choice' : ''}" data-set-status="processing"
                  style="display:flex;flex-direction:column;align-items:center;padding:14px;border-radius:10px;border:2px solid ${activeCase.status === 'processing' ? '#4f46e5' : '#e2e8f0'};background:${activeCase.status === 'processing' ? '#eef2ff' : '#ffffff'};cursor:pointer;transition:all 0.15s ease;">
            <span class="material-symbols-outlined" style="font-size:26px;color:#4f46e5;margin-bottom:6px;">sync</span>
            <strong style="color:#3730a3;font-size:0.875rem;">In Processing</strong>
            <span style="font-size:0.75rem;color:#64748b;text-align:center;margin-top:2px;">OCR extraction ongoing</span>
          </button>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:var(--space-md);padding-top:var(--space-sm);border-top:1px solid #e2e8f0;flex-wrap:wrap;gap:10px;">
          <span style="font-size:0.75rem;color:#64748b;">
            Selecting any status immediately synchronizes this case in the <strong>All Records</strong> table.
          </span>
          <a href="#/cases" class="btn btn--primary btn--sm" style="text-decoration:none;border-radius:8px;">
            <span>Return to All Records</span>
            <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

export function initTimelinePage() {
  const activeCase = api.getActiveCase();
  const choiceBtns = document.querySelectorAll('.btn-status-choice');
  const toast = document.getElementById('timeline-status-toast');
  const toastText = document.getElementById('timeline-status-toast-text');
  const topBadge = document.getElementById('timeline-top-badge');
  const topBadgeText = document.getElementById('timeline-top-badge-text');
  const currentOutcomeName = document.getElementById('current-outcome-name');

  const config = {
    verified: { label: 'Verified Docket', cls: 'badge--verified', icon: 'verified', border: '#059669', bg: '#ecfdf5', text: 'Case marked as Verified Docket.' },
    pending: { label: 'Pending Review', cls: 'badge--pending', icon: 'schedule', border: '#d97706', bg: '#fffbeb', text: 'Case marked as Pending Review.' },
    flagged: { label: 'Flagged / Needs Attention', cls: 'badge--flagged', icon: 'flag', border: '#dc2626', bg: '#fef2f2', text: 'Case marked as Flagged for review.' },
    processing: { label: 'In Processing', cls: 'badge--processing', icon: 'sync', border: '#4f46e5', bg: '#eef2ff', text: 'Case marked as In Processing.' },
  };

  choiceBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const newStatus = btn.getAttribute('data-set-status');
      if (!newStatus) return;

      // Update case via API
      await api.updateCaseStatus(activeCase.id, newStatus);
      activeCase.status = newStatus;

      // Update UI buttons
      choiceBtns.forEach(b => {
        const s = b.getAttribute('data-set-status');
        b.style.borderColor = '#e2e8f0';
        b.style.background = '#ffffff';
        b.classList.remove('active-choice');
      });

      const conf = config[newStatus] || config.pending;
      btn.style.borderColor = conf.border;
      btn.style.background = conf.bg;
      btn.classList.add('active-choice');

      // Update Top Badge
      if (topBadge && topBadgeText) {
        topBadge.className = `badge ${conf.cls}`;
        topBadge.innerHTML = `
          <span class="material-symbols-outlined" style="font-size:16px">${conf.icon}</span>
          <span>${conf.label}</span>
        `;
      }

      // Update current outcome text
      if (currentOutcomeName) {
        currentOutcomeName.textContent = conf.label;
      }

      // Show toast
      if (toast && toastText) {
        toastText.textContent = `${conf.text} Updated across All Records.`;
        toast.style.display = 'flex';
        setTimeout(() => { toast.style.display = 'none'; }, 4000);
      }
    });
  });
}
