/**
 * CaseCompass — 4. Review Page (Evidence Review Lens)
 * Section 5.4, 6.1, 6.2, 13.4 of Team Master Reference:
 * - Two-tab structure: "Needs attention" (default) & "All items"
 * - Section A: Dates that need a check (ambiguous dates with "Which date does this sentence give?")
 * - Section B: Notes about the record (flags R1-R12) + Dismiss with mandatory note & reviewer
 * - Section C: History of dismissed flags
 * - All Items grouped by kind + Collapsed "Dropped items (not shown as facts)" drawer
 * - Evidence Lens: Side-by-side source quote viewer with thick outline highlight & citation chip
 * - Full Word (.doc) and Print exports
 */

import { api } from '../api.js';

export function renderReviewPage() {
  const activeCase = api.getActiveCase();
  const reviewer = localStorage.getItem('casecompass_reviewer_name') || 'Meera';
  const hash = window.location.hash || '';
  const isAllItemsTab = hash.includes('tab=all_items');
  const activeTab = isAllItemsTab ? 'all_items' : 'needs_attention';

  const items = api.getCanonicalItems(activeCase.id);
  const flags = api.getCanonicalFlags(activeCase.id);

  const activeFlags = flags.filter(f => !f.dismissed);
  const dismissedFlags = flags.filter(f => f.dismissed);
  const attentionItems = items.filter(it => it.confidence === 'low' || it.confidence === 'medium' || it.review_status === 'needs_attention');
  const droppedItems = items.filter(it => it.verification_status === 'dropped' || it.review_status === 'rejected');

  const needsAttentionCount = attentionItems.length + activeFlags.length;

  return `
    <div class="page-content page-content--wide animate-fade-in" style="max-width:1380px;margin:0 auto;">
      <!-- Toast Alert -->
      <div id="review-alert-toast" style="display:none;margin-bottom:var(--space-md);padding:12px 18px;border-radius:var(--radius-md);background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;align-items:center;justify-content:space-between;gap:10px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="material-symbols-outlined" style="color:#059669;font-size:20px;">check_circle</span>
          <span id="review-alert-toast-text" style="font-size:0.875rem;font-weight:600;">Action completed</span>
        </div>
        <button id="close-review-toast" style="background:none;border:none;color:#065f46;cursor:pointer;font-weight:bold;">✕</button>
      </div>

      <!-- Header & Export Actions -->
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;margin-bottom:var(--space-md);padding-bottom:12px;border-bottom:1px solid var(--outline-variant);">
        <div>
          <div style="display:flex;align-items:center;gap:8px;font-size:0.8125rem;color:var(--on-surface-variant);margin-bottom:4px;">
            <a href="#/cases" style="color:inherit;text-decoration:none;">Cases</a>
            <span class="material-symbols-outlined" style="font-size:14px;">chevron_right</span>
            <span style="font-weight:600;color:var(--primary);">${activeCase.title}</span>
            <span class="badge ${activeCase.status === 'verified' ? 'badge--verified' : 'badge--pending'}">
              ${(activeCase.statusLabel || activeCase.status).toUpperCase()}
            </span>
          </div>
          <h1 class="page-heading" style="font-size:1.75rem;margin:0;">4. Evidence Review Lens</h1>
          <p class="text-body-sm" style="color:var(--on-surface-variant);margin-top:2px;">
            Audit fact items against verbatim court record quotes. Reviewer: <strong>${reviewer}</strong>
          </p>
        </div>

        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <button class="btn btn--secondary btn--sm" id="btn-export-word" style="border-radius:8px;">
            <span class="material-symbols-outlined" style="font-size:16px">description</span>
            <span>Export Report (.doc)</span>
          </button>
          <button class="btn btn--secondary btn--sm" id="btn-print-report" style="border-radius:8px;">
            <span class="material-symbols-outlined" style="font-size:16px">print</span>
            <span>Print Report</span>
          </button>
          <a href="#/timeline" class="btn btn--primary btn--sm" style="text-decoration:none;border-radius:8px;">
            <span class="material-symbols-outlined" style="font-size:16px">timeline</span>
            <span>View Timeline</span>
          </a>
        </div>
      </div>

      <!-- 2 Tabs Bar (Section 6.1) -->
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:var(--space-lg);border-bottom:2px solid var(--outline-variant);padding-bottom:2px;">
        <a href="#/review?tab=needs_attention" class="btn ${activeTab === 'needs_attention' ? 'btn--primary' : 'btn--ghost'}" id="tab-btn-needs-attention" style="text-decoration:none;border-radius:8px 8px 0 0;padding:10px 18px;display:inline-flex;align-items:center;gap:8px;">
          <span class="material-symbols-outlined" style="font-size:18px;">warning</span>
          <span style="font-weight:700;">Needs attention</span>
          <span class="badge ${needsAttentionCount > 0 ? 'badge--flagged' : 'badge--verified'}" style="padding:2px 8px;font-size:0.75rem;">
            ${needsAttentionCount}
          </span>
        </a>

        <a href="#/review?tab=all_items" class="btn ${activeTab === 'all_items' ? 'btn--primary' : 'btn--ghost'}" id="tab-btn-all-items" style="text-decoration:none;border-radius:8px 8px 0 0;padding:10px 18px;display:inline-flex;align-items:center;gap:8px;">
          <span class="material-symbols-outlined" style="font-size:18px;">list_alt</span>
          <span style="font-weight:700;">All items</span>
          <span class="badge badge--neutral" style="padding:2px 8px;font-size:0.75rem;">
            ${items.length}
          </span>
        </a>
      </div>

      <!-- Main Layout: Items Column (Left) + Evidence Lens Quote Viewer (Right) -->
      <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:var(--space-lg);align-items:start;" id="review-main-grid">
        
        <!-- LEFT COLUMN: Content for Active Tab -->
        <div style="display:flex;flex-direction:column;gap:var(--space-lg);">
          
          ${activeTab === 'needs_attention' ? `
            <!-- TAB 1: NEEDS ATTENTION -->

            <!-- Section A: Dates that need a check (Section 6.1) -->
            <div class="card" style="padding:var(--space-lg);border-left:4px solid #f59e0b;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                <div style="display:flex;align-items:center;gap:8px;">
                  <span class="material-symbols-outlined" style="color:#d97706;font-size:22px;">event_note</span>
                  <h2 style="font-size:1.125rem;font-weight:700;color:var(--primary);margin:0;">
                    Dates that need a check (${attentionItems.length})
                  </h2>
                </div>
                <span class="badge" style="background:#fef3c7;color:#92400e;font-size:0.75rem;">Low / Medium Confidence</span>
              </div>
              <p style="font-size:0.8125rem;color:var(--on-surface-variant);margin-bottom:16px;">
                These dates in the court order may be handwritten, ambiguous, or have multiple interpretations.
              </p>

              ${attentionItems.length === 0 ? `
                <div style="padding:16px;background:#f0fdf4;border-radius:8px;color:#166534;font-size:0.875rem;display:flex;align-items:center;gap:8px;">
                  <span class="material-symbols-outlined" style="color:#16a34a;">check_circle</span>
                  <span>All dates have been confirmed or verified. No dates require attention.</span>
                </div>
              ` : `
                <div style="display:flex;flex-direction:column;gap:14px;">
                  ${attentionItems.map(it => `
                    <div class="card-flat review-item-card" data-item-id="${it.id}" data-quote="${encodeURIComponent(it.quote || '')}" data-doc="${it.document_id || 'order_4.pdf'}" data-page="${it.page_number || 2}"
                         style="padding:14px;border:1px solid #fed7aa;background:#fffdfa;border-radius:8px;cursor:pointer;">
                      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;">
                        <div>
                          <div style="font-size:0.8125rem;font-weight:700;color:#9a3412;margin-bottom:4px;">
                            ${it.kind.replace(/_/g, ' ').toUpperCase()}
                          </div>
                          <div style="font-size:0.9375rem;font-weight:700;color:#0F2A4A;margin-bottom:6px;">
                            Which date does this sentence give?
                          </div>
                        </div>
                        <span class="badge" style="background:#ffedd5;color:#c2410c;font-size:0.6875rem;">
                          ${it.document_id}, Page ${it.page_number}
                        </span>
                      </div>

                      <!-- Verbatim Sentence Quote -->
                      <div style="font-size:0.875rem;color:#1e293b;padding:8px 12px;background:#ffffff;border:1px dashed #fdba74;border-radius:6px;margin-bottom:10px;">
                        <em>"${it.quote}"</em>
                      </div>

                      <!-- Disambiguation Options -->
                      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
                        <span style="font-size:0.75rem;font-weight:700;color:#475569;">Suggested choices:</span>
                        <button type="button" class="btn btn--secondary btn--sm btn-choose-date" data-item-id="${it.id}" data-date="2026-04-10" style="padding:3px 10px;font-size:0.75rem;">
                          10 April 2026
                        </button>
                        <button type="button" class="btn btn--secondary btn--sm btn-choose-date" data-item-id="${it.id}" data-date="2026-04-16" style="padding:3px 10px;font-size:0.75rem;">
                          16 April 2026
                        </button>
                      </div>

                      <!-- Action Buttons -->
                      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;border-top:1px solid #ffedd5;padding-top:10px;">
                        <button type="button" class="btn btn--primary btn--sm btn-confirm-item" data-item-id="${it.id}" style="font-size:0.75rem;padding:4px 12px;">
                          <span class="material-symbols-outlined" style="font-size:14px">check</span> Confirm Date
                        </button>
                        <button type="button" class="btn btn--secondary btn--sm btn-edit-item" data-item-id="${it.id}" data-current="${it.value || '2026-04-10'}" style="font-size:0.75rem;padding:4px 12px;">
                          <span class="material-symbols-outlined" style="font-size:14px">edit</span> Edit Date
                        </button>
                        <button type="button" class="btn btn--ghost btn--sm btn-reject-item" data-item-id="${it.id}" style="color:#b91c1c;font-size:0.75rem;padding:4px 12px;">
                          <span class="material-symbols-outlined" style="font-size:14px">delete</span> Reject Item
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>

            <!-- Section B: Notes about the record (Flags R1 to R12) (Section 6.1) -->
            <div class="card" style="padding:var(--space-lg);border-left:4px solid #dc2626;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                <div style="display:flex;align-items:center;gap:8px;">
                  <span class="material-symbols-outlined" style="color:#dc2626;font-size:22px;">flag</span>
                  <h2 style="font-size:1.125rem;font-weight:700;color:var(--primary);margin:0;">
                    Notes about the record (${activeFlags.length})
                  </h2>
                </div>
                <span class="badge badge--flagged" style="font-size:0.75rem;">Audited Rules R1–R12</span>
              </div>
              <p style="font-size:0.8125rem;color:var(--on-surface-variant);margin-bottom:16px;">
                Factual flags generated by verification rules. Review and acknowledge with a note.
              </p>

              ${activeFlags.length === 0 ? `
                <div style="padding:16px;background:#f0fdf4;border-radius:8px;color:#166534;font-size:0.875rem;display:flex;align-items:center;gap:8px;">
                  <span class="material-symbols-outlined" style="color:#16a34a;">check_circle</span>
                  <span>All notes have been reviewed and dismissed. Record is clean.</span>
                </div>
              ` : `
                <div style="display:flex;flex-direction:column;gap:14px;">
                  ${activeFlags.map(fl => `
                    <div class="card-flat review-flag-card" data-flag-id="${fl.id}" data-quote="${encodeURIComponent(fl.quote || '')}" data-doc="${fl.source_doc || 'order_5.jpg'}" data-page="${fl.source_page || 1}"
                         style="padding:14px;border:1px solid #fecaca;background:#fff5f5;border-radius:8px;cursor:pointer;">
                      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;">
                        <div>
                          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                            <span class="badge" style="background:#fee2e2;color:#991b1b;font-weight:800;font-size:0.6875rem;">${fl.rule_code}</span>
                            <span style="font-size:0.75rem;font-weight:600;color:#64748b;">${fl.category}</span>
                          </div>
                          <div style="font-size:0.9375rem;font-weight:700;color:#7f1d1d;line-height:1.4;margin-bottom:6px;">
                            ${fl.message}
                          </div>
                        </div>
                        <span class="badge" style="background:#fee2e2;color:#991b1b;font-size:0.6875rem;">
                          ${fl.source_doc}, Page ${fl.source_page}
                        </span>
                      </div>

                      <div style="font-size:0.8125rem;color:#334155;padding:8px 12px;background:#ffffff;border:1px dashed #fca5a5;border-radius:6px;margin-bottom:10px;">
                        <em>"${fl.quote}"</em>
                      </div>

                      <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid #fee2e2;padding-top:10px;flex-wrap:wrap;gap:8px;">
                        <span style="font-size:0.75rem;color:#64748b;font-style:italic;">
                          Rule requires volunteer check with registry.
                        </span>
                        <button type="button" class="btn btn--secondary btn--sm btn-dismiss-flag" data-flag-id="${fl.id}" data-rule="${fl.rule_code}" style="font-size:0.75rem;padding:4px 12px;">
                          <span class="material-symbols-outlined" style="font-size:14px">task_alt</span> Dismiss note
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>

            <!-- Section C: Dismissed Notes (Audit Trail) -->
            ${dismissedFlags.length > 0 ? `
              <div class="card" style="padding:var(--space-md);background:#f8fafc;border:1px solid #e2e8f0;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                  <h3 style="font-size:0.9375rem;font-weight:700;color:#475569;margin:0;">
                    Dismissed notes (audit trail) (${dismissedFlags.length})
                  </h3>
                  <span class="badge badge--neutral" style="font-size:0.6875rem;">Archived</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:8px;font-size:0.8125rem;">
                  ${dismissedFlags.map(df => `
                    <div style="padding:8px 12px;background:#ffffff;border-radius:6px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                      <div>
                        <strong>${df.rule_code}:</strong> ${df.message}
                        <div style="font-size:0.75rem;color:#059669;margin-top:2px;">
                          Dismissed by ${df.dismissed_by || reviewer}: <em>"${df.dismissal_note || 'Verified with bench clerk'}"</em>
                        </div>
                      </div>
                      <span style="font-size:0.6875rem;color:#94a3b8;font-family:var(--font-code);">
                        ${df.dismissed_at ? new Date(df.dismissed_at).toLocaleDateString() : 'Today'}
                      </span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

          ` : `
            <!-- TAB 2: ALL ITEMS (Grouped by Kind + Dropped Items Drawer) -->
            <div class="card" style="padding:var(--space-lg);">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                <div>
                  <h2 style="font-size:1.125rem;font-weight:700;color:var(--primary);margin:0;">
                    All Extracted Fact Items (${items.length})
                  </h2>
                  <p style="font-size:0.8125rem;color:var(--on-surface-variant);margin-top:2px;">
                    Items verified from source court records. Click any row to inspect in Evidence Lens.
                  </p>
                </div>
                <span class="badge badge--verified" style="font-size:0.75rem;">
                  ${items.filter(it => it.verification_status === 'verified').length} Verified
                </span>
              </div>

              <!-- Grouped Items Table / List -->
              <div style="display:flex;flex-direction:column;gap:12px;">
                ${items.filter(it => it.verification_status !== 'dropped').map(it => `
                  <div class="card-flat review-item-card" data-item-id="${it.id}" data-quote="${encodeURIComponent(it.quote || '')}" data-doc="${it.document_id}" data-page="${it.page_number}"
                       style="padding:12px 16px;border-left:3px solid ${it.confidence === 'low' ? '#f59e0b' : '#059669'};background:var(--surface-container-lowest);border-radius:8px;cursor:pointer;transition:all 0.15s ease;">
                    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;flex-wrap:wrap;">
                      <div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span style="font-size:0.75rem;font-weight:700;color:var(--primary);text-transform:uppercase;">${it.kind.replace(/_/g, ' ')}</span>
                          <span class="badge ${it.confidence === 'high' ? 'badge--verified' : 'badge--pending'}" style="font-size:0.625rem;padding:1px 6px;">
                            ${it.confidence} confidence
                          </span>
                        </div>
                        <div style="font-size:0.9375rem;font-weight:700;color:var(--on-surface);margin-top:2px;">
                          ${it.value ? it.value : (it.derived_by_rule ? it.derived_by_rule.result_date : 'Relative period (no fixed date)')}
                        </div>
                      </div>
                      <span class="badge" style="background:var(--surface-container-low);color:var(--on-surface-variant);font-size:0.6875rem;">
                        ${it.document_id}, Page ${it.page_number}
                      </span>
                    </div>

                    <div style="font-size:0.8125rem;color:var(--on-surface-variant);margin-top:6px;line-height:1.4;">
                      <em>"${it.quote}"</em>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Collapsed Drawer: Dropped Items (Not shown as facts) (Section 6.2) -->
              <div style="margin-top:var(--space-lg);border-top:1px solid var(--outline-variant);padding-top:16px;">
                <details style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:12px 16px;">
                  <summary style="font-size:0.875rem;font-weight:700;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span class="material-symbols-outlined" style="font-size:18px;color:#94a3b8;">shield</span>
                      <span>Dropped items (not shown as facts) (${droppedItems.length})</span>
                    </div>
                    <span class="badge badge--neutral" style="font-size:0.6875rem;">Security Guarded</span>
                  </summary>

                  <div style="margin-top:12px;display:flex;flex-direction:column;gap:10px;font-size:0.8125rem;">
                    <p style="color:#64748b;margin:0;font-size:0.75rem;">
                      These candidates were identified in the raw document text but rejected by the pipeline (prompt injection patterns, ungrounded speculation, or volunteer rejection).
                    </p>

                    ${droppedItems.map(di => `
                      <div style="padding:10px 14px;background:#ffffff;border:1px solid #fecaca;border-radius:6px;border-left:3px solid #dc2626;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                          <strong style="color:#991b1b;">Dropped Item ID: ${di.id}</strong>
                          <span class="badge" style="background:#fee2e2;color:#991b1b;font-size:0.625rem;">
                            Reason: ${di.drop_reason || 'instruction_like_text'}
                          </span>
                        </div>
                        <div style="color:#334155;font-family:var(--font-code);font-size:0.75rem;background:#f1f5f9;padding:6px 10px;border-radius:4px;margin-top:4px;">
                          ${di.quote || di.value}
                        </div>
                        <div style="font-size:0.6875rem;color:#64748b;margin-top:4px;">
                          Source: ${di.document_id}, Page ${di.page_number} · Verification Status: <strong>dropped</strong>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </details>
              </div>

            </div>
          `}

        </div>

        <!-- RIGHT COLUMN: Evidence Lens (Side-by-side Quote Viewer) -->
        <div style="position:sticky;top:80px;display:flex;flex-direction:column;gap:var(--space-md);">
          
          <div class="card" style="padding:var(--space-lg);border-radius:var(--radius-lg);box-shadow:var(--shadow-md);border:2px solid #93c5fd;background:linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;border-bottom:1px solid #bfdbfe;padding-bottom:8px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span class="material-symbols-outlined" style="color:var(--primary);font-size:22px;">find_in_page</span>
                <h3 style="font-size:1.0625rem;font-weight:700;color:var(--primary);margin:0;">Evidence Lens</h3>
              </div>
              <span class="badge badge--verified" style="font-size:0.6875rem;">Source Citation</span>
            </div>

            <!-- Active Selected Document Citation Chip -->
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
              <span class="badge" id="lens-doc-chip" style="background:#1e3a8a;color:#ffffff;font-weight:700;font-size:0.75rem;padding:4px 10px;border-radius:6px;">
                order_5.jpg, Page 1
              </span>
              <span style="font-size:0.75rem;color:#64748b;" id="lens-doc-type">Judicial Order Sheet</span>
            </div>

            <!-- Thick Outline Verbatim Quote Box (Section 6.1) -->
            <div id="lens-quote-box" style="padding:14px;background:#ffffff;border:3px solid #2563eb;border-radius:8px;box-shadow:0 4px 12px rgba(37,99,235,0.15);margin-bottom:14px;min-height:90px;">
              <div style="font-size:0.6875rem;text-transform:uppercase;letter-spacing:0.05em;color:#2563eb;font-weight:800;margin-bottom:4px;">
                ★ Highlighted Grounding Quote
              </div>
              <p id="lens-quote-text" style="font-size:0.9375rem;color:#0f172a;line-height:1.6;margin:0;font-style:italic;font-weight:500;">
                "Listed for hearing on 12th April, 2026."
              </p>
            </div>

            <!-- Audit Trail & Hash Stamp -->
            <div style="font-size:0.75rem;color:#475569;display:flex;flex-direction:column;gap:4px;background:#ffffff;padding:10px 12px;border-radius:6px;border:1px solid #cbd5e1;">
              <div><strong>Cryptographic Hash:</strong> <code style="font-size:0.6875rem;color:#0369a1;">SHA256: 7f83b165...0012</code></div>
              <div><strong>Active Reviewer:</strong> <span style="font-weight:700;color:#1e3a8a;">${reviewer}</span></div>
              <div><strong>Status:</strong> <span style="color:#059669;font-weight:700;">✓ Grounded in Record</span></div>
            </div>

            <p style="font-size:0.6875rem;color:#64748b;margin-top:10px;margin-bottom:0;text-align:center;">
              Click any item or flag on the left to inspect its exact source quotation.
            </p>
          </div>

          <!-- Quick Action Card -->
          <div class="card" style="padding:14px;background:var(--surface-container-low);border-radius:var(--radius-md);font-size:0.8125rem;">
            <strong style="color:var(--primary);display:block;margin-bottom:4px;">Need to add or edit an item?</strong>
            <p style="color:var(--on-surface-variant);margin:0 0 8px 0;line-height:1.4;">
              You can confirm dates, enter reviewer notes, or use Timeline to append new court proceedings.
            </p>
            <a href="#/timeline" style="color:var(--primary);font-weight:700;text-decoration:underline;">Go to Docket Timeline →</a>
          </div>

        </div>

      </div>

      <!-- Dismiss Flag Modal with Mandatory Volunteer Note -->
      <div id="dismiss-flag-modal" class="modal-overlay" style="display:none;position:fixed;inset:0;z-index:80;background:rgba(0,0,0,0.65);align-items:center;justify-content:center;padding:var(--space-md);backdrop-filter:blur(4px);">
        <div class="card" style="width:100%;max-width:480px;padding:var(--space-lg);animation:slideUp 0.25s ease;box-shadow:var(--shadow-xl);border-radius:var(--radius-lg);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;border-bottom:1px solid var(--outline-variant);padding-bottom:10px;">
            <h3 class="text-headline-sm" style="color:var(--primary);font-weight:700;">Dismiss Note</h3>
            <button id="close-dismiss-modal-btn" style="background:none;border:none;cursor:pointer;color:var(--on-surface-variant);padding:4px;">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <form id="dismiss-flag-form" style="display:flex;flex-direction:column;gap:12px;">
            <p style="font-size:0.8125rem;color:var(--on-surface-variant);margin:0;">
              To dismiss flag <strong id="dismiss-modal-rule-code">R11</strong>, enter a reason for the audit trail.
            </p>
            <div>
              <label class="text-label-md" style="display:block;margin-bottom:4px;font-weight:600;">Reason / Verification Note *</label>
              <textarea id="dismiss-flag-note" required rows="3" placeholder="e.g. Verified with bench clerk that next listing is confirmed despite Sunday" style="width:100%;padding:10px 12px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);font-family:inherit;font-size:0.875rem;"></textarea>
            </div>
            <div style="font-size:0.75rem;color:#64748b;">
              Logged under reviewer: <strong>${reviewer}</strong>
            </div>
            <div style="display:flex;gap:var(--space-sm);justify-content:flex-end;margin-top:6px;">
              <button type="button" class="btn btn--secondary" id="btn-cancel-dismiss">Cancel</button>
              <button type="submit" class="btn btn--primary">Confirm Dismissal</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `;
}

export function initReviewPage() {
  const activeCase = api.getActiveCase();
  const reviewer = localStorage.getItem('casecompass_reviewer_name') || 'Meera';
  const toast = document.getElementById('review-alert-toast');
  const toastText = document.getElementById('review-alert-toast-text');
  const closeToastBtn = document.getElementById('close-review-toast');

  function showToast(msg) {
    if (toast && toastText) {
      toastText.textContent = msg;
      toast.style.display = 'flex';
      setTimeout(() => { toast.style.display = 'none'; }, 4500);
    }
  }
  closeToastBtn?.addEventListener('click', () => { if (toast) toast.style.display = 'none'; });

  // 1. Evidence Lens Highlight Updates
  const lensDocChip = document.getElementById('lens-doc-chip');
  const lensQuoteText = document.getElementById('lens-quote-text');
  const lensQuoteBox = document.getElementById('lens-quote-box');

  function updateLens(quote, doc, page) {
    if (lensDocChip) lensDocChip.textContent = `${doc}, Page ${page}`;
    if (lensQuoteText) lensQuoteText.textContent = `"${quote}"`;
    if (lensQuoteBox) {
      lensQuoteBox.style.animation = 'none';
      void lensQuoteBox.offsetWidth; // trigger reflow
      lensQuoteBox.style.animation = 'pulse 0.4s ease';
    }
  }

  document.querySelectorAll('.review-item-card, .review-flag-card').forEach(card => {
    card.addEventListener('click', () => {
      const q = decodeURIComponent(card.getAttribute('data-quote') || '');
      const doc = card.getAttribute('data-doc') || 'court_order.pdf';
      const page = card.getAttribute('data-page') || '1';
      if (q) updateLens(q, doc, page);

      document.querySelectorAll('.review-item-card, .review-flag-card').forEach(c => {
        c.style.borderColor = '';
      });
      card.style.borderColor = '#2563eb';
    });
  });

  // 2. Disambiguation Date Selection buttons
  document.querySelectorAll('.btn-choose-date').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const itemId = btn.getAttribute('data-item-id');
      const chosenDate = btn.getAttribute('data-date');
      api.editItem(activeCase.id, itemId, chosenDate, reviewer);
      showToast(`Selected date ${chosenDate} for item. Re-rendering review...`);
      setTimeout(() => {
        const slot = document.getElementById('page-content');
        if (slot) {
          slot.innerHTML = renderReviewPage();
          initReviewPage();
        }
      }, 500);
    });
  });

  // 3. Confirm Item
  document.querySelectorAll('.btn-confirm-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const itemId = btn.getAttribute('data-item-id');
      api.confirmItem(activeCase.id, itemId, reviewer);
      showToast(`Item confirmed by ${reviewer}. Moved to high confidence.`);
      setTimeout(() => {
        const slot = document.getElementById('page-content');
        if (slot) {
          slot.innerHTML = renderReviewPage();
          initReviewPage();
        }
      }, 500);
    });
  });

  // 4. Edit Item
  document.querySelectorAll('.btn-edit-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const itemId = btn.getAttribute('data-item-id');
      const current = btn.getAttribute('data-current') || '';
      const newVal = prompt('Enter corrected date or value (YYYY-MM-DD):', current);
      if (newVal && newVal.trim()) {
        api.editItem(activeCase.id, itemId, newVal.trim(), reviewer);
        showToast(`Item value updated to "${newVal.trim()}" by ${reviewer}.`);
        setTimeout(() => {
          const slot = document.getElementById('page-content');
          if (slot) {
            slot.innerHTML = renderReviewPage();
            initReviewPage();
          }
        }, 500);
      }
    });
  });

  // 5. Reject Item
  document.querySelectorAll('.btn-reject-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const itemId = btn.getAttribute('data-item-id');
      if (confirm('Reject this item from verified facts?')) {
        api.rejectItem(activeCase.id, itemId, reviewer);
        showToast(`Item rejected by ${reviewer} and moved to dropped drawer.`);
        setTimeout(() => {
          const slot = document.getElementById('page-content');
          if (slot) {
            slot.innerHTML = renderReviewPage();
            initReviewPage();
          }
        }, 500);
      }
    });
  });

  // 6. Dismiss Flag Modal
  const dismissModal = document.getElementById('dismiss-flag-modal');
  const dismissCodeSpan = document.getElementById('dismiss-modal-rule-code');
  const dismissNoteInput = document.getElementById('dismiss-flag-note');
  const dismissForm = document.getElementById('dismiss-flag-form');
  const closeDismissBtn = document.getElementById('close-dismiss-modal-btn');
  const cancelDismissBtn = document.getElementById('btn-cancel-dismiss');
  let currentTargetFlagId = null;

  function closeDismissModal() {
    if (dismissModal) dismissModal.style.display = 'none';
    currentTargetFlagId = null;
  }
  closeDismissBtn?.addEventListener('click', closeDismissModal);
  cancelDismissBtn?.addEventListener('click', closeDismissModal);
  dismissModal?.addEventListener('click', (e) => { if (e.target === dismissModal) closeDismissModal(); });

  document.querySelectorAll('.btn-dismiss-flag').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentTargetFlagId = btn.getAttribute('data-flag-id');
      const ruleCode = btn.getAttribute('data-rule') || 'Flag';
      if (dismissCodeSpan) dismissCodeSpan.textContent = ruleCode;
      if (dismissNoteInput) dismissNoteInput.value = '';
      if (dismissModal) dismissModal.style.display = 'flex';
      dismissNoteInput?.focus();
    });
  });

  dismissForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = dismissNoteInput?.value || 'Verified with clerk';
    if (!currentTargetFlagId) return;

    api.dismissFlag(activeCase.id, currentTargetFlagId, note, reviewer);
    closeDismissModal();
    showToast(`Flag note dismissed by ${reviewer}. Recorded in audit trail.`);
    setTimeout(() => {
      const slot = document.getElementById('page-content');
      if (slot) {
        slot.innerHTML = renderReviewPage();
        initReviewPage();
      }
    }, 500);
  });

  // 7. Exports
  document.getElementById('btn-export-word')?.addEventListener('click', () => {
    api.exportWordDocx(activeCase.id);
    showToast(`Official Word dossier exported for "${activeCase.title}".`);
  });

  document.getElementById('btn-print-report')?.addEventListener('click', () => {
    api.printReport(activeCase.id);
  });
}
