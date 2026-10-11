/**
 * CaseCompass — 7. Trust Page
 * Matches Stitch screen: "CaseCompass — Trust & Verification"
 */

import { demoCase, trustData } from '../data/demoData.js';

export function renderTrustPage() {
  return `
    <div class="page-content animate-fade-in" style="max-width: 1040px;">
      <!-- Breadcrumb & Header -->
      <div style="margin-bottom: var(--space-lg);">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: var(--on-surface-variant); margin-bottom: 6px;">
          <span>Cases</span>
          <span class="material-symbols-outlined" style="font-size: 14px;">chevron_right</span>
          <span style="font-weight: 600; color: var(--primary);">${demoCase.title}</span>
          <span class="badge badge--verified" style="margin-left: 8px;">Ledger Validated</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: var(--space-md);">
          <div>
            <h1 class="page-heading" style="font-size: 1.875rem;">Trust & Verification Ledger</h1>
            <p style="font-size: 0.875rem; color: var(--on-surface-variant); margin-top: 4px;">
              Cryptographic chain of custody, SHA-256 fingerprint validation, and tamper-evident audit trail.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn--secondary btn--sm" id="btn-reverify">
              <span class="material-symbols-outlined" style="font-size: 16px;">sync</span>
              Re-verify All Hashes
            </button>
            <button class="btn btn--primary btn--sm" id="btn-export-audit">
              <span class="material-symbols-outlined" style="font-size: 16px;">verified_user</span>
              Export Audit Certificate
            </button>
          </div>
        </div>
      </div>

      <!-- High-level Trust Status Banner -->
      <div class="card" style="padding: 20px; margin-bottom: var(--space-lg); background: linear-gradient(135deg, var(--surface-container-low), var(--surface-container-lowest)); border-left: 5px solid var(--status-verified);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 54px; height: 54px; border-radius: 50%; background: var(--status-verified-bg); display: flex; align-items: center; justify-content: center; color: var(--status-verified);">
              <span class="material-symbols-outlined" style="font-size: 32px;">security</span>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--primary);">Docket Integrity Score: ${trustData.overallIntegrity}%</h2>
                <span class="badge badge--verified">Tamper-Evident</span>
              </div>
              <div style="font-size: 0.8125rem; color: var(--on-surface-variant); margin-top: 2px;">
                Last full cryptographic sweep performed: <strong>${trustData.lastAudit}</strong> · Audit Engine: <code>${trustData.auditVersion}</code>
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 16px; font-size: 0.8125rem;">
            <div style="text-align: right;">
              <span style="color: var(--on-surface-variant); display: block;">Total Files</span>
              <strong style="font-size: 1.125rem; color: var(--primary);">${trustData.totalDocuments}</strong>
            </div>
            <div style="text-align: right;">
              <span style="color: var(--on-surface-variant); display: block;">Verified Clean</span>
              <strong style="font-size: 1.125rem; color: var(--status-verified);">${trustData.verifiedCount}</strong>
            </div>
            <div style="text-align: right;">
              <span style="color: var(--on-surface-variant); display: block;">Flagged</span>
              <strong style="font-size: 1.125rem; color: var(--status-pending);">${trustData.flaggedCount}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Two Sections: Document Hashes & Audit Trail -->
      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: var(--space-lg); align-items: start;">
        <!-- Left: Document Cryptographic Hashes Table -->
        <div class="card" style="padding: 0; overflow: hidden;">
          <div style="padding: 16px 20px; border-bottom: 1px solid var(--outline-variant); background: var(--surface-container-lowest); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div class="section-title" style="margin-bottom: 2px;">Document Fingerprints</div>
              <div style="font-size: 0.75rem; color: var(--on-surface-variant);">SHA-256 checksums registered at ingestion</div>
            </div>
            <span class="badge badge--neutral">${trustData.documents.length} Records</span>
          </div>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem;">
              <thead>
                <tr style="border-bottom: 1px solid var(--outline-variant); background: var(--surface-container-low); text-align: left;">
                  <th style="padding: 10px 16px; font-weight: 600; color: var(--on-surface-variant);">Document</th>
                  <th style="padding: 10px 16px; font-weight: 600; color: var(--on-surface-variant);">SHA-256 Digest</th>
                  <th style="padding: 10px 16px; font-weight: 600; color: var(--on-surface-variant);">Status</th>
                  <th style="padding: 10px 16px; font-weight: 600; color: var(--on-surface-variant); text-align: right;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${trustData.documents.map(doc => `
                  <tr style="border-bottom: 1px solid var(--outline-variant);">
                    <td style="padding: 12px 16px;">
                      <div style="font-weight: 600; color: var(--on-surface);">${doc.name}</div>
                      <div style="font-size: 0.6875rem; color: var(--outline); margin-top: 2px;">${doc.size} · Verified ${doc.lastVerified}</div>
                      ${doc.note ? `
                        <div style="font-size: 0.6875rem; color: var(--status-flagged); margin-top: 4px; display: flex; align-items: center; gap: 4px;">
                          <span class="material-symbols-outlined" style="font-size: 12px;">warning</span>
                          ${doc.note}
                        </div>
                      ` : ''}
                    </td>
                    <td style="padding: 12px 16px;">
                      <code style="font-family: var(--font-code); font-size: 0.75rem; background: var(--surface-container-high); padding: 3px 6px; border-radius: 4px; color: var(--primary);">
                        ${doc.hash}
                      </code>
                    </td>
                    <td style="padding: 12px 16px;">
                      ${doc.status === 'intact'
                        ? '<span class="badge badge--verified"><span class="material-symbols-outlined" style="font-size: 12px;">check</span> Intact</span>'
                        : '<span class="badge badge--flagged"><span class="material-symbols-outlined" style="font-size: 12px;">priority_high</span> Flagged</span>'
                      }
                    </td>
                    <td style="padding: 12px 16px; text-align: right;">
                      <button class="btn btn--ghost btn--sm verify-single-btn" data-doc="${doc.name}" title="Recalculate checksum">
                        <span class="material-symbols-outlined" style="font-size: 16px;">refresh</span>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right: Immutable Audit Trail Log -->
        <div class="card" style="padding: var(--space-lg);">
          <div class="section-title">Chain of Custody Events</div>
          <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-bottom: 16px;">
            Immutable sequence recorded during ingestion & manual reviews
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${trustData.auditLog.map(log => `
              <div style="display: flex; gap: 10px; align-items: flex-start; padding-bottom: 12px; border-bottom: 1px solid var(--outline-variant);">
                <span class="material-symbols-outlined" style="font-size: 18px; margin-top: 2px; color: ${
                  log.result === 'pass' ? 'var(--status-verified)' :
                  log.result === 'flag' ? 'var(--status-flagged)' : 'var(--primary)'
                };">
                  ${log.result === 'pass' ? 'verified' : log.result === 'flag' ? 'warning' : 'info'}
                </span>
                <div style="flex: 1;">
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <div style="font-weight: 600; font-size: 0.8125rem; color: var(--on-surface);">${log.action}</div>
                    <span style="font-size: 0.6875rem; color: var(--outline); font-family: var(--font-code);">${log.time}</span>
                  </div>
                  <div style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 2px;">
                    ${log.detail}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: 16px; padding: 12px; background: var(--surface-container-low); border-radius: var(--radius-md); font-size: 0.75rem; color: var(--on-surface-variant);">
            <div style="display: flex; align-items: center; gap: 6px; font-weight: 700; color: var(--primary); margin-bottom: 4px;">
              <span class="material-symbols-outlined" style="font-size: 16px;">lock</span>
              Ledger Sealed
            </div>
            This session is cryptographically bound to browser session key. Changes generate irreversible audit log entries.
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initTrustPage() {
  document.getElementById('btn-reverify')?.addEventListener('click', () => {
    alert('Recomputing cryptographic SHA-256 digests for all 12 documents... Done! All intact documents verified.');
  });

  document.getElementById('btn-export-audit')?.addEventListener('click', () => {
    alert('Generating signed Court Audit Certificate (VER-9042)...');
  });

  document.querySelectorAll('.verify-single-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const doc = btn.getAttribute('data-doc');
      alert(`Re-calculated SHA-256 hash for "${doc}" matches registry checksum.`);
    });
  });
}
