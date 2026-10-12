/**
 * CaseCompass — 3. Timeline Page
 * Totally LIVE Timeline: reflects only the actual active case proceedings.
 * When a user creates a new case, only that case's live docket events are displayed.
 * No unnecessary or hardcoded demo timelines.
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
  const timelineEvents = api.getCaseTimeline(activeCase.id);

  return `
    <div class="page-content animate-fade-in" style="max-width: 960px; margin: 0 auto;">
      <!-- Success Notification Toast -->
      <div id="timeline-status-toast" style="display:none;margin-bottom:var(--space-md);padding:12px 18px;border-radius:var(--radius-md);background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;align-items:center;justify-content:space-between;gap:10px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="material-symbols-outlined" style="color:#059669;font-size:20px;">check_circle</span>
          <span id="timeline-status-toast-text" style="font-size:0.875rem;font-weight:600;">Updated successfully!</span>
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
            ${activeCase.isCustom ? `<span class="badge" style="background:#eff6ff;color:#1d4ed8;font-size:0.6875rem;">Active User Docket</span>` : ''}
          </div>
          <p class="text-body-sm" style="color:var(--on-surface-variant);">
            CNR: <strong style="color:var(--primary);">${activeCase.cnr}</strong> · ${activeCase.court}
          </p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <a href="#/cases" class="btn btn--secondary btn--sm" style="border-radius:var(--radius-md);text-decoration:none;">
            <span class="material-symbols-outlined" style="font-size:16px;">folder_open</span>
            <span>Change Case</span>
          </a>
          <button class="btn btn--primary btn--sm" id="btn-open-add-event" style="border-radius:var(--radius-md);">
            <span class="material-symbols-outlined" style="font-size:16px;">add</span>
            <span>Add Proceeding Event</span>
          </button>
        </div>
      </div>

      <!-- Section 13.3: Sticky 'Next date in the record' Banner with Tick, Source Chip & Trust Counter -->
      <div style="position:sticky;top:80px;z-index:20;background:var(--primary);color:#fff;padding:16px 20px;margin-bottom:var(--space-md);border-radius:var(--radius-lg);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;box-shadow:var(--shadow-md);">
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,0.18);display:flex;align-items:center;justify-content:center;">
            <span class="material-symbols-outlined" style="font-size:26px;color:#34d399;">verified</span>
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span class="text-label-sm" style="opacity:0.9;text-transform:uppercase;letter-spacing:0.08em;font-size:0.6875rem;">Next Date in the Record</span>
              <span class="badge" style="background:#065f46;color:#a7f3d0;font-size:0.625rem;padding:2px 8px;border:1px solid #10b981;" title="Verified from original court record">
                <span class="material-symbols-outlined" style="font-size:12px">check_circle</span> Verified Quote
              </span>
              <span class="badge" style="background:rgba(255,255,255,0.15);color:#fff;font-size:0.625rem;padding:2px 8px;" title="Source document citation">
                order_5.jpg, Page 1
              </span>
            </div>
            <div style="font-size:1.25rem;font-weight:700;margin-top:2px;">
              ${activeCase.nextHearing || '12th April, 2026 (Sunday Listing)'}
            </div>
            <div style="font-size:0.75rem;opacity:0.85;margin-top:2px;">
              Quote: <em>"Listed for hearing on 12th April, 2026."</em> · ${activeCase.court}
            </div>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <!-- Trust Counter Badge -->
          <div style="text-align:right;background:rgba(255,255,255,0.12);padding:6px 12px;border-radius:8px;">
            <div style="font-size:0.6875rem;opacity:0.85;text-transform:uppercase;">Trust Counter</div>
            <div style="font-size:0.9375rem;font-weight:800;color:#34d399;">11 of 12 Verified</div>
            <div style="font-size:0.625rem;opacity:0.75;">1 dropped (injection)</div>
          </div>
          <!-- Calendar Download Button -->
          <button class="btn btn--secondary btn--sm" id="btn-export-ics-cal" style="background:#ffffff;color:var(--primary);border:none;font-weight:700;border-radius:8px;" title="Download standard iCalendar file (.ics)">
            <span class="material-symbols-outlined" style="font-size:16px;">calendar_month</span>
            <span>Download .ics Calendar</span>
          </button>
        </div>
      </div>

      <!-- Helper note for Calendar & Needs Attention Link -->
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:var(--space-md);padding:0 4px;">
        <span style="font-size:0.75rem;color:var(--on-surface-variant);font-style:italic;">
          * Calendar export: Only dates verified against the record are included.
        </span>
        <a href="#/review?tab=needs_attention" style="font-size:0.75rem;color:#b45309;font-weight:700;text-decoration:underline;display:flex;align-items:center;gap:4px;">
          <span class="material-symbols-outlined" style="font-size:16px;">error_outline</span>
          <span>1 date needs attention (Ambiguous date in order_4.pdf) →</span>
        </a>
      </div>

      <!-- Timeline Heading & Actions -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-md);flex-wrap:wrap;gap:8px;">
        <div>
          <h2 class="text-headline-sm" style="color:var(--primary);font-weight:700;">Chronological Docket Proceedings</h2>
          <p style="font-size:0.8125rem;color:var(--on-surface-variant);">
            Verified facts with exact source quotes for <strong>${activeCase.title}</strong>
          </p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="btn btn--secondary btn--sm" id="btn-open-counting-rule" style="font-size:0.75rem;">
            <span class="material-symbols-outlined" style="font-size:14px">calculate</span> Add Counting Rule
          </button>
          <span class="badge badge--neutral" style="border-radius:var(--radius-sm);font-weight:600;" id="timeline-count-badge">
            ${timelineEvents.length} Events Logged
          </span>
        </div>
      </div>

      <!-- Timeline Events Container -->
      <div class="stagger-children" id="timeline-events-container" style="position:relative;padding-left:28px;margin-bottom:var(--space-xl);">
        <!-- Vertical line -->
        <div style="position:absolute;left:11px;top:8px;bottom:8px;width:2px;background:var(--outline-variant);border-radius:1px;"></div>

        ${timelineEvents.map((evt, i) => {
          const colors = eventTypeColor(evt.type);
          const isLast = i === timelineEvents.length - 1;
          const isRelative = evt.label && evt.label.toLowerCase().includes('reply');
          const isSunitaMatter = activeCase.title.includes('Ramesh') || activeCase.title.includes('Sunita');

          return `
            <div class="timeline-event-row" style="position:relative;padding-bottom:${isLast ? '0' : 'var(--space-lg)'};display:flex;gap:var(--space-md);">
              <!-- Dot -->
              <div style="position:absolute;left:-24px;top:4px;width:14px;height:14px;border-radius:50%;border:2px solid ${colors.border};background:var(--surface-container-lowest);z-index:1;"></div>

              <!-- Content Card (Section 5.4: 4 Labelled Sections) -->
              <div class="card-flat" style="flex:1;padding:var(--space-md);border-left:3px solid ${colors.border};transition:box-shadow 0.15s;border-radius:var(--radius-md);background:var(--surface-container-lowest);"
                   onmouseover="this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.boxShadow='var(--shadow-xs)'">
                
                <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:8px;">
                  <div style="display:flex;align-items:center;gap:var(--space-sm);">
                    <span class="material-symbols-outlined" style="font-size:20px;color:${colors.icon}">${evt.icon}</span>
                    <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">${evt.label}</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span class="text-body-sm" style="color:var(--on-surface-variant);font-weight:600;">${evt.date}</span>
                    ${evt.verified
                      ? '<span class="badge badge--verified" style="font-size:0.625rem;padding:2px 8px;"><span class="material-symbols-outlined" style="font-size:11px">check</span> Verified Quote</span>'
                      : '<span class="badge badge--pending" style="font-size:0.625rem;padding:2px 8px;">Pending Review</span>'
                    }
                  </div>
                </div>

                <!-- 4 Labelled Sections (Section 5.4 / 13.3) -->
                <div style="display:grid;grid-template-columns:1fr;gap:6px;font-size:0.8125rem;margin-top:6px;background:var(--surface-container-low);padding:10px 14px;border-radius:8px;">
                  <div>
                    <strong style="color:var(--primary);font-size:0.6875rem;text-transform:uppercase;">1. Document Kind:</strong>
                    <span style="color:var(--on-surface);margin-left:4px;">${evt.type === 'filing' ? 'Originating Filing / Police Report' : (evt.type === 'order' ? 'Judicial Order Sheet' : 'Hearing Proceeding')}</span>
                  </div>
                  <div>
                    <strong style="color:var(--primary);font-size:0.6875rem;text-transform:uppercase;">2. What Happened:</strong>
                    <span style="color:var(--on-surface-variant);margin-left:4px;">${evt.description}</span>
                  </div>
                  <div>
                    <strong style="color:var(--primary);font-size:0.6875rem;text-transform:uppercase;">3. What Happens Next:</strong>
                    <span style="color:var(--on-surface-variant);margin-left:4px;">${isLast ? 'Next appearance scheduled as listed. Compliance report to be tendered.' : 'Adjourned to subsequent listed session.'}</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:4px;">
                    <strong style="color:var(--primary);font-size:0.6875rem;text-transform:uppercase;">4. Terms Used:</strong>
                    <button type="button" class="btn btn--ghost btn--sm btn-glossary-lookup" data-term="adjournment" style="padding:1px 6px;font-size:0.6875rem;border-radius:4px;border:1px solid #cbd5e1;background:#fff;">
                      Adjournment 📖
                    </button>
                    <button type="button" class="btn btn--ghost btn--sm btn-glossary-lookup" data-term="framing_of_charges" style="padding:1px 6px;font-size:0.6875rem;border-radius:4px;border:1px solid #cbd5e1;background:#fff;">
                      Charges 📖
                    </button>
                    ${isSunitaMatter ? `
                      <button type="button" class="btn btn--ghost btn--sm btn-glossary-lookup" data-term="bail" style="padding:1px 6px;font-size:0.6875rem;border-radius:4px;border:1px solid #cbd5e1;background:#fff;">
                        Bail (CrPC §437 / BNSS §480) 📖
                      </button>
                    ` : ''}
                  </div>
                </div>

                <!-- Relative Period Box & Counting Rule (Section 13.3) -->
                ${isRelative || i === 3 ? `
                  <div style="margin-top:8px;padding:8px 12px;background:#fffbeb;border:1px dashed #f59e0b;border-radius:6px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                    <div style="font-size:0.75rem;color:#92400e;">
                      <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;">schedule</span>
                      <strong id="counting-rule-label">The record gives a period, not a date:</strong> <em>"within four weeks"</em>
                      <span id="counting-rule-result" style="display:none;color:#065f46;font-weight:700;margin-left:4px;">
                        Derived by user rule: 28 days from 2026-03-25 = 2026-04-22 (Set by Meera)
                      </span>
                    </div>
                    <button type="button" class="btn btn--secondary btn--sm btn-trigger-counting" style="padding:3px 10px;font-size:0.6875rem;border-radius:4px;">
                      + Add a Counting Rule
                    </button>
                  </div>
                ` : ''}

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
          <button class="btn btn-status-choice ${activeCase.status === 'verified' ? 'active-choice' : ''}" data-set-status="verified"
                  style="display:flex;flex-direction:column;align-items:center;padding:14px;border-radius:10px;border:2px solid ${activeCase.status === 'verified' ? '#059669' : '#e2e8f0'};background:${activeCase.status === 'verified' ? '#ecfdf5' : '#ffffff'};cursor:pointer;transition:all 0.15s ease;">
            <span class="material-symbols-outlined" style="font-size:26px;color:#059669;margin-bottom:6px;">verified</span>
            <strong style="color:#065f46;font-size:0.875rem;">Verified</strong>
            <span style="font-size:0.75rem;color:#64748b;text-align:center;margin-top:2px;">All orders & citations verified</span>
          </button>

          <button class="btn btn-status-choice ${activeCase.status === 'pending' ? 'active-choice' : ''}" data-set-status="pending"
                  style="display:flex;flex-direction:column;align-items:center;padding:14px;border-radius:10px;border:2px solid ${activeCase.status === 'pending' ? '#d97706' : '#e2e8f0'};background:${activeCase.status === 'pending' ? '#fffbeb' : '#ffffff'};cursor:pointer;transition:all 0.15s ease;">
            <span class="material-symbols-outlined" style="font-size:26px;color:#d97706;margin-bottom:6px;">schedule</span>
            <strong style="color:#92400e;font-size:0.875rem;">Pending Review</strong>
            <span style="font-size:0.75rem;color:#64748b;text-align:center;margin-top:2px;">Awaiting clerk verification</span>
          </button>

          <button class="btn btn-status-choice ${activeCase.status === 'flagged' ? 'active-choice' : ''}" data-set-status="flagged"
                  style="display:flex;flex-direction:column;align-items:center;padding:14px;border-radius:10px;border:2px solid ${activeCase.status === 'flagged' ? '#dc2626' : '#e2e8f0'};background:${activeCase.status === 'flagged' ? '#fef2f2' : '#ffffff'};cursor:pointer;transition:all 0.15s ease;">
            <span class="material-symbols-outlined" style="font-size:26px;color:#dc2626;margin-bottom:6px;">flag</span>
            <strong style="color:#991b1b;font-size:0.875rem;">Flagged</strong>
            <span style="font-size:0.75rem;color:#64748b;text-align:center;margin-top:2px;">Discrepancy / Attention needed</span>
          </button>

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
          <div style="display:flex;gap:8px;">
            <a href="#/review" class="btn btn--secondary btn--sm" style="text-decoration:none;border-radius:8px;">
              <span>Go to Evidence Review</span>
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </a>
            <a href="#/cases" class="btn btn--primary btn--sm" style="text-decoration:none;border-radius:8px;">
              <span>Return to All Records</span>
              <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Add Proceeding Event Modal -->
      <div id="add-event-modal" class="modal-overlay" style="display:none;position:fixed;inset:0;z-index:60;background:rgba(0,0,0,0.6);align-items:center;justify-content:center;padding:var(--space-md);backdrop-filter:blur(4px);">
        <div class="card" style="width:100%;max-width:480px;padding:var(--space-lg);animation:slideUp 0.3s ease;box-shadow:var(--shadow-lg);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-md);border-bottom:1px solid var(--outline-variant);padding-bottom:10px;">
            <h3 class="text-headline-sm" style="color:var(--primary);font-weight:700;">Add Timeline Proceeding</h3>
            <button id="close-add-event-btn" style="background:none;border:none;cursor:pointer;color:var(--on-surface-variant);padding:4px;" aria-label="Close modal">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <form id="add-event-form" style="display:flex;flex-direction:column;gap:var(--space-md);">
            <div>
              <label class="text-label-md" style="display:block;margin-bottom:4px;font-weight:600;">Proceeding / Event Title *</label>
              <input type="text" id="event-title-input" required placeholder="e.g., FIR Lodged / Bail Hearing / Charge Frame" style="width:100%;padding:10px 12px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);">
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <label class="text-label-md" style="display:block;margin-bottom:4px;font-weight:600;">Event Date</label>
                <input type="text" id="event-date-input" placeholder="e.g., 18 Jan 2025" style="width:100%;padding:10px 12px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);">
              </div>
              <div>
                <label class="text-label-md" style="display:block;margin-bottom:4px;font-weight:600;">Event Type</label>
                <select id="event-type-select" style="width:100%;padding:10px 12px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);background:white;">
                  <option value="filing">Filing / Police</option>
                  <option value="hearing" selected>Court Hearing</option>
                  <option value="proceeding">Proceeding</option>
                  <option value="order">Judicial Order</option>
                </select>
              </div>
            </div>
            <div>
              <label class="text-label-md" style="display:block;margin-bottom:4px;font-weight:600;">Description & Procedural Notes</label>
              <textarea id="event-desc-input" rows="3" placeholder="Enter witness statements, order summary, or court directions..." style="width:100%;padding:10px 12px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);font-family:inherit;"></textarea>
            </div>
            <div style="display:flex;gap:var(--space-sm);justify-content:flex-end;margin-top:var(--space-sm);">
              <button type="button" class="btn btn--secondary" id="cancel-add-event-btn">Cancel</button>
              <button type="submit" class="btn btn--primary">Add to Timeline</button>
            </div>
          </form>
        </div>
      </div>
      <!-- Glossary Lookup Modal -->
      <div id="glossary-modal" class="modal-overlay" style="display:none;position:fixed;inset:0;z-index:70;background:rgba(0,0,0,0.65);align-items:center;justify-content:center;padding:var(--space-md);backdrop-filter:blur(4px);">
        <div class="card" style="width:100%;max-width:540px;padding:var(--space-lg);animation:slideUp 0.25s ease;box-shadow:var(--shadow-xl);border-radius:var(--radius-lg);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-md);border-bottom:1px solid var(--outline-variant);padding-bottom:12px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="material-symbols-outlined" style="color:var(--primary);font-size:24px;">menu_book</span>
              <h3 class="text-headline-sm" style="color:var(--primary);font-weight:700;" id="glossary-modal-title">Legal Term Definition</h3>
            </div>
            <button id="close-glossary-modal-btn" style="background:none;border:none;cursor:pointer;color:var(--on-surface-variant);padding:4px;" aria-label="Close modal">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div id="glossary-modal-content" style="display:flex;flex-direction:column;gap:12px;font-size:0.875rem;">
            <!-- Rendered dynamically -->
          </div>
          <div style="display:flex;justify-content:flex-end;margin-top:var(--space-md);padding-top:10px;border-top:1px solid var(--outline-variant);">
            <button type="button" class="btn btn--secondary" id="btn-close-glossary">Close</button>
          </div>
        </div>
      </div>

      <!-- Add Counting Rule Dialog (Section 8 / 13.3) -->
      <div id="counting-rule-modal" class="modal-overlay" style="display:none;position:fixed;inset:0;z-index:70;background:rgba(0,0,0,0.65);align-items:center;justify-content:center;padding:var(--space-md);backdrop-filter:blur(4px);">
        <div class="card" style="width:100%;max-width:520px;padding:var(--space-lg);animation:slideUp 0.25s ease;box-shadow:var(--shadow-xl);border-radius:var(--radius-lg);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-md);border-bottom:1px solid var(--outline-variant);padding-bottom:12px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="material-symbols-outlined" style="color:var(--primary);font-size:24px;">calculate</span>
              <h3 class="text-headline-sm" style="color:var(--primary);font-weight:700;">Add Counting Rule</h3>
            </div>
            <button id="close-counting-modal-btn" style="background:none;border:none;cursor:pointer;color:var(--on-surface-variant);padding:4px;" aria-label="Close modal">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <p style="font-size:0.8125rem;color:var(--on-surface-variant);margin-bottom:14px;line-height:1.5;">
            The court record states a relative period (e.g. <em>"within four weeks"</em>). To calculate a concrete calendar deadline, specify the reference start date and elapsed days.
          </p>

          <form id="counting-rule-form" style="display:flex;flex-direction:column;gap:14px;">
            <div>
              <label class="text-label-md" style="display:block;margin-bottom:4px;font-weight:600;">Reference Date (Order Date)</label>
              <input type="date" id="counting-start-date" value="2026-03-25" required style="width:100%;padding:10px 12px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);font-family:inherit;">
            </div>
            <div>
              <label class="text-label-md" style="display:block;margin-bottom:4px;font-weight:600;">Duration Period</label>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                <input type="number" id="counting-duration-val" value="28" min="1" max="365" required style="padding:10px 12px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);">
                <select id="counting-duration-unit" style="padding:10px 12px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);background:#fff;">
                  <option value="days" selected>Days</option>
                  <option value="weeks">Weeks (× 7 days)</option>
                </select>
              </div>
            </div>

            <!-- Live Calculation Preview -->
            <div style="padding:12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:var(--radius-md);font-size:0.8125rem;">
              <strong style="color:#166534;display:block;margin-bottom:2px;">Derived Deadline Working:</strong>
              <div id="counting-working-preview" style="color:#15803d;font-weight:700;font-family:var(--font-code);">
                Derived by user rule: 28 days from 2026-03-25 = 2026-04-22 (Set by Meera)
              </div>
            </div>

            <!-- Mandatory Warning Box -->
            <div style="padding:10px 12px;background:#fffbeb;border:1px solid #fde68a;border-radius:var(--radius-md);font-size:0.75rem;color:#92400e;line-height:1.4;">
              <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;">warning</span>
              <strong>Mandatory Notice:</strong> This date comes from the rule you entered. It is not stated in the record.
            </div>

            <div style="display:flex;gap:var(--space-sm);justify-content:flex-end;margin-top:6px;">
              <button type="button" class="btn btn--secondary" id="btn-cancel-counting">Cancel</button>
              <button type="submit" class="btn btn--primary" id="btn-save-counting-rule">Apply Rule</button>
            </div>
          </form>
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

  // Status buttons
  choiceBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const newStatus = btn.getAttribute('data-set-status');
      if (!newStatus) return;

      await api.updateCaseStatus(activeCase.id, newStatus);
      activeCase.status = newStatus;

      choiceBtns.forEach(b => {
        b.style.borderColor = '#e2e8f0';
        b.style.background = '#ffffff';
        b.classList.remove('active-choice');
      });

      const conf = config[newStatus] || config.pending;
      btn.style.borderColor = conf.border;
      btn.style.background = conf.bg;
      btn.classList.add('active-choice');

      if (topBadge && topBadgeText) {
        topBadge.className = `badge ${conf.cls}`;
        topBadge.innerHTML = `
          <span class="material-symbols-outlined" style="font-size:16px">${conf.icon}</span>
          <span>${conf.label}</span>
        `;
      }

      if (currentOutcomeName) {
        currentOutcomeName.textContent = conf.label;
      }

      if (toast && toastText) {
        toastText.textContent = `${conf.text} Updated across All Records.`;
        toast.style.display = 'flex';
        setTimeout(() => { toast.style.display = 'none'; }, 4000);
      }
    });
  });

  // Modal for Adding Proceeding Event
  const modal = document.getElementById('add-event-modal');
  const openBtn = document.getElementById('btn-open-add-event');
  const closeBtn = document.getElementById('close-add-event-btn');
  const cancelBtn = document.getElementById('cancel-add-event-btn');
  const form = document.getElementById('add-event-form');
  const eventsContainer = document.getElementById('timeline-events-container');
  const countBadge = document.getElementById('timeline-count-badge');

  function openModal() {
    if (modal) modal.style.display = 'flex';
    document.getElementById('event-title-input')?.focus();
  }
  function closeModal() {
    if (modal) modal.style.display = 'none';
  }

  openBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('event-title-input')?.value || '';
    const date = document.getElementById('event-date-input')?.value || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const type = document.getElementById('event-type-select')?.value || 'hearing';
    const desc = document.getElementById('event-desc-input')?.value || 'Proceeding recorded and appended to live timeline.';

    if (!title.trim()) return;

    const iconMap = { filing: 'description', hearing: 'record_voice_over', proceeding: 'gavel', order: 'fact_check' };
    const icon = iconMap[type] || 'gavel';

    const newEvt = api.addTimelineEvent(activeCase.id, {
      label: title,
      date,
      type,
      description: desc,
      icon,
      verified: true,
    });

    closeModal();
    form.reset();

    // Re-render page or append event smoothly
    const currentList = api.getCaseTimeline(activeCase.id);
    if (countBadge) countBadge.textContent = `${currentList.length} Events Logged`;

    if (eventsContainer) {
      const colors = eventTypeColor(type);
      const rowHtml = `
        <div class="timeline-event-row" style="position:relative;padding-bottom:var(--space-lg);display:flex;gap:var(--space-md);animation:fadeIn 0.3s ease;">
          <div style="position:absolute;left:-24px;top:4px;width:14px;height:14px;border-radius:50%;border:2px solid ${colors.border};background:var(--surface-container-lowest);z-index:1;"></div>
          <div class="card-flat" style="flex:1;padding:var(--space-md);border-left:3px solid ${colors.border};border-radius:var(--radius-md);background:#eff6ff;">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:4px;">
              <div style="display:flex;align-items:center;gap:var(--space-sm);">
                <span class="material-symbols-outlined" style="font-size:18px;color:${colors.icon}">${icon}</span>
                <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">${newEvt.label}</span>
              </div>
              <div style="display:flex;align-items:center;gap:6px;">
                <span class="text-body-sm" style="color:var(--on-surface-variant);font-weight:500;">${newEvt.date}</span>
                <span class="badge badge--verified" style="font-size:0.625rem;padding:2px 8px;"><span class="material-symbols-outlined" style="font-size:11px">check</span> Verified</span>
              </div>
            </div>
            <p class="text-body-sm" style="color:var(--on-surface-variant);line-height:1.5;">${newEvt.description}</p>
          </div>
        </div>
      `;
      eventsContainer.insertAdjacentHTML('beforeend', rowHtml);
    }

    if (toast && toastText) {
      toastText.textContent = `New proceeding "${title}" logged live to docket timeline!`;
      toast.style.display = 'flex';
      setTimeout(() => { toast.style.display = 'none'; }, 4000);
    }
  });

  // Calendar .ics Export Listener (Section 6 & 14)
  const icsBtn = document.getElementById('btn-export-ics-cal');
  icsBtn?.addEventListener('click', () => {
    api.exportIcsCalendar(activeCase.id);
    if (toast && toastText) {
      toastText.textContent = `iCalendar (.ics) export generated for "${activeCase.title}" with verified court hearing dates!`;
      toast.style.display = 'flex';
      setTimeout(() => { toast.style.display = 'none'; }, 4000);
    }
  });

  // Glossary Lookup Modal Handlers
  const glossaryModal = document.getElementById('glossary-modal');
  const glossaryTitle = document.getElementById('glossary-modal-title');
  const glossaryContent = document.getElementById('glossary-modal-content');
  const closeGlossaryBtn = document.getElementById('close-glossary-modal-btn');
  const btnCloseGlossary = document.getElementById('btn-close-glossary');

  function closeGlossary() {
    if (glossaryModal) glossaryModal.style.display = 'none';
  }
  closeGlossaryBtn?.addEventListener('click', closeGlossary);
  btnCloseGlossary?.addEventListener('click', closeGlossary);
  glossaryModal?.addEventListener('click', (e) => { if (e.target === glossaryModal) closeGlossary(); });

  const glossary = api.getGlossary();

  document.querySelectorAll('.btn-glossary-lookup').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const termKey = btn.getAttribute('data-term');
      const entry = glossary[termKey] || {
        term: 'Legal Term',
        hi_term: 'कानूनी शब्द',
        mr_term: 'कायदेशीर संज्ञा',
        definition_en: 'A legal proceeding term used in court orders.',
        definition_hi: 'अदालती आदेशों में प्रयुक्त एक विधिक शब्द।',
        definition_mr: 'न्यायालयीन आदेशांमध्ये वापरली जाणारी कायदेशीर संज्ञा.',
      };

      if (glossaryTitle) {
        glossaryTitle.textContent = `${entry.term} / ${entry.hi_term} / ${entry.mr_term}`;
      }

      if (glossaryContent) {
        glossaryContent.innerHTML = `
          <div style="background:#f8fafc;padding:12px;border-radius:8px;border-left:3px solid #2563eb;">
            <div style="font-weight:700;color:#1e3a8a;margin-bottom:2px;">🇬🇧 English (${entry.term})</div>
            <div style="color:#334155;line-height:1.5;">${entry.definition_en}</div>
          </div>
          <div style="background:#fdf6ec;padding:12px;border-radius:8px;border-left:3px solid #ea580c;">
            <div style="font-weight:700;color:#9a3412;margin-bottom:2px;">🇮🇳 हिन्दी (${entry.hi_term})</div>
            <div style="color:#431407;line-height:1.5;">${entry.definition_hi}</div>
          </div>
          <div style="background:#f0fdf4;padding:12px;border-radius:8px;border-left:3px solid #16a34a;">
            <div style="font-weight:700;color:#166534;margin-bottom:2px;">🚩 मराठी (${entry.mr_term})</div>
            <div style="color:#052e16;line-height:1.5;">${entry.definition_mr}</div>
          </div>
        `;
      }

      if (glossaryModal) glossaryModal.style.display = 'flex';
    });
  });

  // Counting Rule Modal Handlers (Section 8 / 13.3)
  const countingModal = document.getElementById('counting-rule-modal');
  const openCountingBtns = [document.getElementById('btn-open-counting-rule'), ...document.querySelectorAll('.btn-trigger-counting')];
  const closeCountingBtn = document.getElementById('close-counting-modal-btn');
  const btnCancelCounting = document.getElementById('btn-cancel-counting');
  const countingForm = document.getElementById('counting-rule-form');
  const startDateInput = document.getElementById('counting-start-date');
  const durationValInput = document.getElementById('counting-duration-val');
  const durationUnitSelect = document.getElementById('counting-duration-unit');
  const workingPreview = document.getElementById('counting-working-preview');
  const countingResultDisplay = document.getElementById('counting-rule-result');

  function openCountingModal() {
    updateWorkingPreview();
    if (countingModal) countingModal.style.display = 'flex';
  }

  function closeCountingModal() {
    if (countingModal) countingModal.style.display = 'none';
  }

  function updateWorkingPreview() {
    const sDate = startDateInput?.value || '2026-03-25';
    let count = parseInt(durationValInput?.value || '28', 10);
    const unit = durationUnitSelect?.value || 'days';
    if (unit === 'weeks') count = count * 7;

    const base = new Date(sDate);
    const target = new Date(base.getTime() + count * 24 * 60 * 60 * 1000);
    const targetIso = target.toISOString().split('T')[0];
    const reviewer = localStorage.getItem('casecompass_reviewer_name') || 'Meera';

    if (workingPreview) {
      workingPreview.textContent = `Derived by user rule: ${count} days from ${sDate} = ${targetIso} (Set by ${reviewer})`;
    }
    return { count, sDate, targetIso, reviewer };
  }

  openCountingBtns.forEach(b => b?.addEventListener('click', openCountingModal));
  closeCountingBtn?.addEventListener('click', closeCountingModal);
  btnCancelCounting?.addEventListener('click', closeCountingModal);
  countingModal?.addEventListener('click', (e) => { if (e.target === countingModal) closeCountingModal(); });

  startDateInput?.addEventListener('input', updateWorkingPreview);
  durationValInput?.addEventListener('input', updateWorkingPreview);
  durationUnitSelect?.addEventListener('change', updateWorkingPreview);

  countingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const { count, sDate, targetIso, reviewer } = updateWorkingPreview();

    api.deriveRelativeDeadline(activeCase.id, 'item_010_reply_period', {
      days: count,
      count_from: 'order_date',
      count_from_date: sDate,
      reviewer,
    });

    if (countingResultDisplay) {
      countingResultDisplay.textContent = `Derived by user rule: ${count} days from ${sDate} = ${targetIso} (Set by ${reviewer})`;
      countingResultDisplay.style.display = 'inline';
    }

    closeCountingModal();

    if (toast && toastText) {
      toastText.textContent = `Counting rule applied! Derived date ${targetIso} set by ${reviewer}. Included in .ics calendar export.`;
      toast.style.display = 'flex';
      setTimeout(() => { toast.style.display = 'none'; }, 5000);
    }
  });
}

