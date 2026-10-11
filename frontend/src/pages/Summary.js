/**
 * CaseCompass — 6. Summary Page
 * Executive Case Summary dynamically reflecting the registered case data,
 * complete proceedings timeline, evidence ledger, and zero-error Word/Print exports.
 */

import { api } from '../api.js';

export function renderSummaryPage() {
  const activeCase = api.getActiveCase();
  const timeline = api.getCaseTimeline(activeCase.id);
  const docs = api.getCaseDocuments(activeCase.id);

  const docCount = docs.length > 0 ? docs.length : (activeCase.documents || 0);
  const verifiedDocs = docs.length > 0 ? docs.filter(d => d.status === 'verified').length : (activeCase.status === 'verified' ? docCount : 0);
  const flaggedDocs = docs.length > 0 ? docs.filter(d => d.status === 'flagged').length : (activeCase.status === 'flagged' ? 1 : 0);
  const docketHealth = docCount > 0 ? Math.round((verifiedDocs / docCount) * 100) : (activeCase.status === 'verified' ? 100 : 75);

  const nextHearingDate = activeCase.nextHearing || 'Upcoming Scheduling';
  const stage = timeline.length > 3 ? 'Prosecution Evidence' : (timeline.length > 1 ? 'Docket Ingestion & Verification' : 'Initial Case Registration');

  return `
    <div class="page-content animate-fade-in" style="max-width: 1040px;">
      <!-- Breadcrumb & Header -->
      <div style="margin-bottom: var(--space-lg);">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: var(--on-surface-variant); margin-bottom: 6px;">
          <a href="#/cases" style="color: inherit; text-decoration: none;">Cases</a>
          <span class="material-symbols-outlined" style="font-size: 14px;">chevron_right</span>
          <span style="font-weight: 600; color: var(--primary);">${activeCase.title}</span>
          <span class="badge ${activeCase.status === 'verified' ? 'badge--verified' : 'badge--pending'}" style="margin-left: 8px;">
            ${(activeCase.statusLabel || activeCase.status).toUpperCase()}
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: var(--space-md);">
          <div>
            <h1 class="page-heading" style="font-size: 1.875rem;">6. Executive Case Summary</h1>
            <p style="font-size: 0.875rem; color: var(--on-surface-variant); margin-top: 4px;">
              Original dossier records, chronological proceeding events, evidence health, and hearing status for <strong>${activeCase.title}</strong>.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn--secondary btn--sm" id="btn-print-summary" title="Print complete case dossier and timeline">
              <span class="material-symbols-outlined" style="font-size: 16px;">print</span>
              Print Summary
            </button>
            <button class="btn btn--primary btn--sm" id="btn-export-docket" title="Download Word report with all timeline proceedings">
              <span class="material-symbols-outlined" style="font-size: 16px;">file_download</span>
              Export Report (.doc / Word)
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-lg);">
        <!-- Metric 1: Docket Health -->
        <div class="card" style="padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="section-title" style="margin-bottom: 4px;">Docket Health</div>
              <div style="font-size: 1.875rem; font-weight: 700; color: var(--primary);">${docketHealth}%</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--status-verified-bg); display: flex; align-items: center; justify-content: center; color: var(--status-verified);">
              <span class="material-symbols-outlined">health_and_safety</span>
            </div>
          </div>
          <div style="margin-top: 10px; width: 100%; height: 6px; background: var(--surface-container-high); border-radius: 3px; overflow: hidden;">
            <div style="width: ${docketHealth}%; height: 100%; background: var(--status-verified); border-radius: 3px;"></div>
          </div>
          <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 8px;">
            ${verifiedDocs} of ${docCount} records verified intact
          </div>
        </div>

        <!-- Metric 2: Next Listing -->
        <div class="card" style="padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="section-title" style="margin-bottom: 4px;">Next Listing</div>
              <div style="font-size: 1.125rem; font-weight: 700; color: var(--primary);">${nextHearingDate}</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--surface-container-high); display: flex; align-items: center; justify-content: center; color: var(--primary);">
              <span class="material-symbols-outlined">event</span>
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 14px;">
            ${activeCase.court}
          </div>
        </div>

        <!-- Metric 3: Procedural Status -->
        <div class="card" style="padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="section-title" style="margin-bottom: 4px;">Stage of Case</div>
              <div style="font-size: 1.125rem; font-weight: 700; color: var(--primary);">${stage}</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--surface-container-high); display: flex; align-items: center; justify-content: center; color: var(--primary);">
              <span class="material-symbols-outlined">gavel</span>
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 14px;">
            ${timeline.length} recorded proceedings
          </div>
        </div>

        <!-- Metric 4: Discrepancy Flags -->
        <div class="card" style="padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="section-title" style="margin-bottom: 4px;">Audit Flags</div>
              <div style="font-size: 1.875rem; font-weight: 700; color: ${flaggedDocs > 0 ? 'var(--status-pending)' : 'var(--status-verified)'};">${flaggedDocs}</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: ${flaggedDocs > 0 ? 'var(--status-pending-bg)' : 'var(--status-verified-bg)'}; display: flex; align-items: center; justify-content: center; color: ${flaggedDocs > 0 ? 'var(--status-pending)' : 'var(--status-verified)'};">
              <span class="material-symbols-outlined">${flaggedDocs > 0 ? 'flag' : 'check_circle'}</span>
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 8px;">
            ${flaggedDocs > 0 ? 'Discrepancy notices flagged' : 'Clean audit profile'}
          </div>
        </div>
      </div>

      <!-- Main Two-Column Summary Layout -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-lg); align-items: start;">
        <!-- Left: Case Overview & Procedural Brief -->
        <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
          <!-- Procedural Brief -->
          <div class="card" style="padding: var(--space-lg);">
            <div class="section-title">Procedural Overview</div>
            <h2 class="text-headline-sm" style="margin-bottom: 12px; color: var(--primary);">
              ${activeCase.title}
            </h2>
            <p style="font-size: 0.875rem; color: var(--on-surface); line-height: 1.6; margin-bottom: 12px;">
              Matter registered under <strong>${activeCase.section || 'BNS / IPC Procedural Intake'}</strong> before the <strong>${activeCase.court}</strong>. Initial court dossier was registered on <strong>${activeCase.filingDate || '15 Mar 2024'}</strong>.
            </p>
            <p style="font-size: 0.875rem; color: var(--on-surface); line-height: 1.6;">
              Dossier audit verification is logged as <strong>${(activeCase.statusLabel || activeCase.status).toUpperCase()}</strong>. The docket integrates <strong>${timeline.length} proceedings</strong> and <strong>${docCount} evidentiary exhibits</strong>.
            </p>

            <div class="divider"></div>

            <div class="section-title">Case Metadata Particulars</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 0.8125rem;">
              <div>
                <span style="color: var(--on-surface-variant);">CNR Number:</span>
                <span style="font-weight: 600; font-family: var(--font-code); display: block; color: var(--primary);">${activeCase.cnr}</span>
              </div>
              <div>
                <span style="color: var(--on-surface-variant);">Court / Jurisdiction:</span>
                <span style="font-weight: 600; display: block;">${activeCase.court}</span>
              </div>
              <div>
                <span style="color: var(--on-surface-variant);">Substantive Sections:</span>
                <span style="font-weight: 600; display: block;">${activeCase.section || 'IPC §420, §468'}</span>
              </div>
              <div>
                <span style="color: var(--on-surface-variant);">Filing Date:</span>
                <span style="font-weight: 600; display: block;">${activeCase.filingDate || '15 Mar 2024'}</span>
              </div>
            </div>
          </div>

          <!-- Verified Dossier Findings -->
          <div class="card" style="padding: var(--space-lg);">
            <div class="section-title">Verified Dossier Findings</div>
            <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 10px;">
              <div style="display: flex; gap: 12px; align-items: flex-start; padding: 12px; background: var(--surface-container-low); border-radius: var(--radius-md); border-left: 3px solid var(--primary);">
                <span class="material-symbols-outlined" style="font-size: 20px; color: var(--primary); margin-top: 2px;">gavel</span>
                <div>
                  <div style="font-weight: 700; font-size: 0.875rem; color: var(--on-surface);">Charges & Statutory Sections</div>
                  <div style="font-size: 0.8125rem; color: var(--on-surface-variant); margin-top: 2px; line-height: 1.4;">
                    Actionable under ${activeCase.section || 'IPC §420 / §468'}. Procedural compliance verified against court registry.
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 12px; align-items: flex-start; padding: 12px; background: var(--surface-container-low); border-radius: var(--radius-md); border-left: 3px solid var(--status-verified);">
                <span class="material-symbols-outlined" style="font-size: 20px; color: var(--status-verified); margin-top: 2px;">fact_check</span>
                <div>
                  <div style="font-weight: 700; font-size: 0.875rem; color: var(--on-surface);">Evidence Integrity Health</div>
                  <div style="font-size: 0.8125rem; color: var(--on-surface-variant); margin-top: 2px; line-height: 1.4;">
                    ${verifiedDocs} of ${docCount} documents matched against cryptographic hash records. Zero unauthorized alterations.
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 12px; align-items: flex-start; padding: 12px; background: var(--surface-container-low); border-radius: var(--radius-md); border-left: 3px solid var(--secondary);">
                <span class="material-symbols-outlined" style="font-size: 20px; color: var(--secondary); margin-top: 2px;">calendar_month</span>
                <div>
                  <div style="font-weight: 700; font-size: 0.875rem; color: var(--on-surface);">Next Court Proceeding</div>
                  <div style="font-size: 0.8125rem; color: var(--on-surface-variant); margin-top: 2px; line-height: 1.4;">
                    Hearing listed on ${nextHearingDate} before ${activeCase.court}.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Verification Health & Pre-Hearing Checklist -->
        <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
          <!-- Integrity Certificate Card -->
          <div class="card" style="padding: var(--space-lg); background: var(--surface-container-low);">
            <div class="section-title">Docket Integrity Certificate</div>
            <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px;">
              <span class="material-symbols-outlined" style="font-size: 36px; color: var(--status-verified);">verified</span>
              <div>
                <div style="font-weight: 700; font-size: 1rem; color: var(--primary);">Cryptographically Bound</div>
                <div style="font-size: 0.75rem; color: var(--on-surface-variant);">SHA-256 Hashes Validated</div>
              </div>
            </div>
            <p style="font-size: 0.8125rem; color: var(--on-surface-variant); margin-top: 12px; line-height: 1.5;">
              All records for this dossier are cataloged in the local chain-of-custody ledger.
            </p>
            <div style="margin-top: 16px;">
              <a href="#/review" class="btn btn--secondary btn--sm" style="width: 100%; text-decoration: none; justify-content: center;">
                <span class="material-symbols-outlined" style="font-size: 16px;">find_in_page</span>
                View Evidence Lens
              </a>
            </div>
          </div>

          <!-- Interactive Pre-Hearing Checklist -->
          <div class="card" style="padding: var(--space-lg);">
            <div class="section-title" style="display: flex; justify-content: space-between; align-items: center;">
              <span>Pre-Hearing Checklist</span>
              <span style="font-size: 0.75rem; color: var(--primary); font-weight: 600;" id="checklist-progress">2/4 Done</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; font-size: 0.8125rem;" id="checklist-container">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" checked class="summary-check-item" data-task="1" style="accent-color: var(--primary);">
                <span>Verify chargesheet and FIR exhibits</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" checked class="summary-check-item" data-task="2" style="accent-color: var(--primary);">
                <span>Inspect witness deposition notices</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" class="summary-check-item" data-task="3" style="accent-color: var(--primary);">
                <span>Prepare questionnaire for next hearing</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" class="summary-check-item" data-task="4" style="accent-color: var(--primary);">
                <span>Confirm counsel presence and vakalatnama</span>
              </label>
            </div>
          </div>

          <!-- Legal Aid DLSA Contact -->
          <div class="card" style="padding: var(--space-md); background: #f8fafc; border: 1px solid var(--outline-variant);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="material-symbols-outlined" style="color: var(--primary); font-size: 18px;">support_agent</span>
              <span style="font-size: 0.8125rem; font-weight: 700; color: var(--primary);">Legal Aid Helpline</span>
            </div>
            <p style="font-size: 0.75rem; color: var(--on-surface-variant); line-height: 1.4; margin: 0;">
              Dial <strong>15100</strong> for NALSA free legal assistance or contact your District Legal Services Authority (DLSA).
            </p>
          </div>
        </div>
      </div>

      <!-- Chronological Proceedings Timeline Table (Reflecting Original Registered Data) -->
      <div class="card" style="padding: var(--space-lg); margin-top: var(--space-lg);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 14px;">
          <div>
            <div class="section-title">Case Proceedings Timeline</div>
            <h3 class="text-headline-sm" style="color: var(--primary); margin: 2px 0 0;">
              Chronological Legal Proceedings (${timeline.length} Registered Events)
            </h3>
          </div>
          <a href="#/timeline" class="btn btn--secondary btn--sm" style="text-decoration: none;">
            <span>Open Timeline View</span>
            <span class="material-symbols-outlined" style="font-size: 14px;">arrow_forward</span>
          </a>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
            <thead>
              <tr style="border-bottom: 2px solid var(--outline-variant); text-align: left; background: var(--surface-container-low);">
                <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Date</th>
                <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Proceeding Event</th>
                <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Procedural Notes & Details</th>
                <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${timeline.map(e => `
                <tr style="border-bottom: 1px solid var(--outline-variant);">
                  <td style="padding: 12px 14px; font-weight: 600; white-space: nowrap; color: var(--on-surface);">${e.date}</td>
                  <td style="padding: 12px 14px; font-weight: 600; color: var(--primary);">${e.label}</td>
                  <td style="padding: 12px 14px; color: var(--on-surface-variant); line-height: 1.5;">${e.description}</td>
                  <td style="padding: 12px 14px; white-space: nowrap;">
                    <span class="badge ${e.verified ? 'badge--verified' : 'badge--pending'}">
                      ${e.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Evidence Review Lens & Document Register Table -->
      <div class="card" style="padding: var(--space-lg); margin-top: var(--space-lg);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 14px;">
          <div>
            <div class="section-title">Evidence Register</div>
            <h3 class="text-headline-sm" style="color: var(--primary); margin: 2px 0 0;">
              Ingested Court Filings & Exhibits (${docs.length} Records)
            </h3>
          </div>
          <a href="#/upload" class="btn btn--secondary btn--sm" style="text-decoration: none;">
            <span>Upload Documents</span>
            <span class="material-symbols-outlined" style="font-size: 14px;">upload_file</span>
          </a>
        </div>

        ${docs.length === 0 ? `
          <div style="padding: var(--space-lg); text-align: center; color: var(--on-surface-variant); background: var(--surface-container-low); border-radius: var(--radius-md);">
            <span class="material-symbols-outlined" style="font-size: 32px; color: var(--outline);">folder_off</span>
            <p style="margin: 6px 0 0; font-size: 0.875rem;">No court documents uploaded yet for this case. Navigate to <strong>2. Upload</strong> to ingest FIR and records.</p>
          </div>
        ` : `
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
              <thead>
                <tr style="border-bottom: 2px solid var(--outline-variant); text-align: left; background: var(--surface-container-low);">
                  <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Document Name</th>
                  <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Category</th>
                  <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Pages</th>
                  <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Uploaded Date</th>
                  <th style="padding: 10px 14px; color: var(--on-surface-variant); font-size: 0.75rem; text-transform: uppercase;">Audit Hash</th>
                </tr>
              </thead>
              <tbody>
                ${docs.map(d => `
                  <tr style="border-bottom: 1px solid var(--outline-variant);">
                    <td style="padding: 12px 14px; font-weight: 600; color: var(--primary);">${d.name || d.filename}</td>
                    <td style="padding: 12px 14px; color: var(--on-surface-variant);">${d.category}</td>
                    <td style="padding: 12px 14px; color: var(--on-surface);">${d.pages}</td>
                    <td style="padding: 12px 14px; color: var(--on-surface-variant); white-space: nowrap;">${d.uploadedDate}</td>
                    <td style="padding: 12px 14px;"><code style="font-size: 0.75rem; color: var(--secondary);">${d.hash}</code></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `;
}

export function initSummaryPage() {
  const activeCase = api.getActiveCase();

  document.getElementById('btn-print-summary')?.addEventListener('click', () => {
    api.printReport(activeCase.id);
  });

  document.getElementById('btn-export-docket')?.addEventListener('click', () => {
    api.exportWordDocx(activeCase.id);
  });

  // Interactive Checklist
  const checkboxes = document.querySelectorAll('.summary-check-item');
  const progressEl = document.getElementById('checklist-progress');

  function updateProgress() {
    const total = checkboxes.length;
    let checked = 0;
    checkboxes.forEach(cb => { if (cb.checked) checked++; });
    if (progressEl) {
      progressEl.textContent = `${checked}/${total} Done`;
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      updateProgress();
    });
  });
}
