/**
 * CaseCompass — 6. Summary Page
 * Matches Stitch screen: "CaseCompass — Summary"
 */

import { demoCase, summaryData } from '../data/demoData.js';

export function renderSummaryPage() {
  return `
    <div class="page-content animate-fade-in" style="max-width: 1040px;">
      <!-- Breadcrumb & Header -->
      <div style="margin-bottom: var(--space-lg);">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: var(--on-surface-variant); margin-bottom: 6px;">
          <span>Cases</span>
          <span class="material-symbols-outlined" style="font-size: 14px;">chevron_right</span>
          <span style="font-weight: 600; color: var(--primary);">${demoCase.title}</span>
          <span class="badge badge--verified" style="margin-left: 8px;">Audit Ready</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: var(--space-md);">
          <div>
            <h1 class="page-heading" style="font-size: 1.875rem;">Executive Case Summary</h1>
            <p style="font-size: 0.875rem; color: var(--on-surface-variant); margin-top: 4px;">
              Consolidated intelligence, procedural posture, verified evidence health, and next hearing trajectory.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn--secondary btn--sm" id="btn-print-summary">
              <span class="material-symbols-outlined" style="font-size: 16px;">print</span>
              Print Brief
            </button>
            <button class="btn btn--primary btn--sm" id="btn-export-docket">
              <span class="material-symbols-outlined" style="font-size: 16px;">file_download</span>
              Export Docket Pack
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-lg);">
        <!-- Metric 1: Case Strength / Docket Completeness -->
        <div class="card" style="padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="section-title" style="margin-bottom: 4px;">Docket Health</div>
              <div style="font-size: 1.875rem; font-weight: 700; color: var(--primary);">${summaryData.caseStrength}%</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--status-verified-bg); display: flex; align-items: center; justify-content: center; color: var(--status-verified);">
              <span class="material-symbols-outlined">health_and_safety</span>
            </div>
          </div>
          <div style="margin-top: 10px; width: 100%; height: 6px; background: var(--surface-container-high); border-radius: 3px; overflow: hidden;">
            <div style="width: ${summaryData.caseStrength}%; height: 100%; background: var(--status-verified); border-radius: 3px;"></div>
          </div>
          <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 8px;">
            10 of 12 records fully verified intact
          </div>
        </div>

        <!-- Metric 2: Next Hearing -->
        <div class="card" style="padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="section-title" style="margin-bottom: 4px;">Next Listing</div>
              <div style="font-size: 1.25rem; font-weight: 700; color: var(--primary);">${summaryData.timeline.nextHearing}</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--surface-container-high); display: flex; align-items: center; justify-content: center; color: var(--primary);">
              <span class="material-symbols-outlined">event</span>
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 14px;">
            JMFC Pune · PW-3 Examination
          </div>
        </div>

        <!-- Metric 3: Procedural Status -->
        <div class="card" style="padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="section-title" style="margin-bottom: 4px;">Stage of Case</div>
              <div style="font-size: 1.25rem; font-weight: 700; color: var(--primary);">Prosecution Evidence</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--surface-container-high); display: flex; align-items: center; justify-content: center; color: var(--primary);">
              <span class="material-symbols-outlined">gavel</span>
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 14px;">
            5 total court proceedings completed
          </div>
        </div>

        <!-- Metric 4: Discrepancy Flags -->
        <div class="card" style="padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="section-title" style="margin-bottom: 4px;">Flags & Risks</div>
              <div style="font-size: 1.875rem; font-weight: 700; color: var(--status-pending);">${summaryData.issuesFound}</div>
            </div>
            <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--status-pending-bg); display: flex; align-items: center; justify-content: center; color: var(--status-pending);">
              <span class="material-symbols-outlined">flag</span>
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 8px;">
            Metadata anomaly & date mismatch
          </div>
        </div>
      </div>

      <!-- Main Two-Column Summary Layout -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-lg); align-items: start;">
        <!-- Left: Key Findings & Procedural Brief -->
        <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
          <!-- Procedural Brief -->
          <div class="card" style="padding: var(--space-lg);">
            <div class="section-title">Procedural Overview</div>
            <h2 class="text-headline-sm" style="margin-bottom: 12px; color: var(--primary);">
              Prosecution Under IPC §420 / §468
            </h2>
            <p style="font-size: 0.875rem; color: var(--on-surface); line-height: 1.6; margin-bottom: 12px;">
              The matter arises from FIR registered on <strong>15 March 2024</strong> at Kothrud Police Station Pune, alleging fraudulent transactions and forged identity paperwork against Ramesh Kumar Sharma. Charges were framed on <strong>20 May 2024</strong> following submission of final chargesheet.
            </p>
            <p style="font-size: 0.875rem; color: var(--on-surface); line-height: 1.6;">
              The matter is in trial. The complainant (PW-1) and IO (PW-2) have concluded their depositions. The pivotal witness from Punjab National Bank (PW-3) is scheduled for cross-examination in the forthcoming hearing.
            </p>

            <div class="divider"></div>

            <div class="section-title">Case Metadata</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 0.8125rem;">
              <div>
                <span style="color: var(--on-surface-variant);">CNR Number:</span>
                <span style="font-weight: 600; font-family: var(--font-code); display: block; color: var(--primary);">${demoCase.cnr}</span>
              </div>
              <div>
                <span style="color: var(--on-surface-variant);">Presiding Judge:</span>
                <span style="font-weight: 600; display: block;">${demoCase.judge}</span>
              </div>
              <div>
                <span style="color: var(--on-surface-variant);">Prosecuting Counsel:</span>
                <span style="font-weight: 600; display: block;">${demoCase.advocate}</span>
              </div>
              <div>
                <span style="color: var(--on-surface-variant);">Court:</span>
                <span style="font-weight: 600; display: block;">${demoCase.court}</span>
              </div>
            </div>
          </div>

          <!-- Key Docket Findings -->
          <div class="card" style="padding: var(--space-lg);">
            <div class="section-title">Audited Docket Findings</div>
            <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 10px;">
              ${summaryData.keyFindings.map(item => `
                <div style="display: flex; gap: 12px; align-items: flex-start; padding: 12px; background: var(--surface-container-low); border-radius: var(--radius-md); border-left: 3px solid ${
                  item.severity === 'warning' ? 'var(--status-flagged)' :
                  item.severity === 'success' ? 'var(--status-verified)' : 'var(--primary)'
                };">
                  <span class="material-symbols-outlined" style="font-size: 20px; color: ${
                    item.severity === 'warning' ? 'var(--status-flagged)' :
                    item.severity === 'success' ? 'var(--status-verified)' : 'var(--primary)'
                  }; margin-top: 2px;">${item.icon}</span>
                  <div>
                    <div style="font-weight: 700; font-size: 0.875rem; color: var(--on-surface);">${item.title}</div>
                    <div style="font-size: 0.8125rem; color: var(--on-surface-variant); margin-top: 2px; line-height: 1.4;">
                      ${item.detail}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right Column: Verification Health & Action Checklist -->
        <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
          <!-- Integrity Badge Card -->
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
              All 12 files are registered in the local chain of custody ledger. No tampering or undocumented modifications detected.
            </p>
            <div style="margin-top: 16px;">
              <a href="#/trust" class="btn btn--secondary btn--sm" style="width: 100%;">
                <span class="material-symbols-outlined" style="font-size: 16px;">shield</span>
                View Trust Ledger
              </a>
            </div>
          </div>

          <!-- Pre-Hearing Checklist -->
          <div class="card" style="padding: var(--space-lg);">
            <div class="section-title">Pre-Hearing Checklist</div>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px; font-size: 0.8125rem;">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" checked style="accent-color: var(--primary);">
                <span>Inspect PW-1 cross-examination contradictions</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" checked style="accent-color: var(--primary);">
                <span>Verify PNB account authorization letters</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" style="accent-color: var(--primary);">
                <span>Prepare questionnaire for PW-3 Bank Manager</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" style="accent-color: var(--primary);">
                <span>Resolve date anomaly in witness statement</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initSummaryPage() {
  document.getElementById('btn-print-summary')?.addEventListener('click', () => {
    window.print();
  });

  document.getElementById('btn-export-docket')?.addEventListener('click', () => {
    alert('Generating authenticated CaseCompass Docket Brief (PDF)...');
  });
}
