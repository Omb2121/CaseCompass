/**
 * CaseCompass — 4. Review Page
 * Matches Stitch screen: "CaseCompass — Review"
 */

import { demoCase, reviewDocuments } from '../data/demoData.js';

function statusBadge(status, label) {
  const cls = status === 'verified' ? 'badge--verified' : status === 'flagged' ? 'badge--flagged' : 'badge--neutral';
  const icon = status === 'verified' ? 'verified' : status === 'flagged' ? 'flag' : 'info';
  return `<span class="badge ${cls}" style="border-radius:var(--radius-sm);"><span class="material-symbols-outlined" style="font-size:12px">${icon}</span> ${label}</span>`;
}

export function renderReviewPage() {
  const verified = reviewDocuments.filter(d => d.status === 'verified').length;
  const flagged = reviewDocuments.filter(d => d.status === 'flagged').length;

  return `
    <div class="page-content page-content--wide animate-fade-in" style="max-width:1440px;">
      <!-- Page Heading -->
      <div style="padding-top:var(--space-lg);padding-bottom:var(--space-sm);">
        <h1 class="page-heading">4. Review</h1>
      </div>

      <!-- Active Matter Meta Bar -->
      <div class="card-flat" style="padding:var(--space-md);margin-bottom:var(--space-lg);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-md);">
        <div style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-md);">
          <div style="display:flex;align-items:center;gap:var(--space-xs);">
            <span style="width:10px;height:10px;background:var(--primary);border-radius:50%;"></span>
            <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">Active Matter: ${demoCase.title}</span>
          </div>
          <span style="color:var(--secondary);">|</span>
          <div class="text-code-sm" style="background:var(--surface-container-low);padding:2px 8px;border-radius:var(--radius-sm);">
            <span style="color:var(--secondary);text-transform:uppercase;">CNR:</span>
            <span style="font-weight:700;color:var(--primary);">${demoCase.cnr}</span>
          </div>
          <a href="#/cases" style="color:var(--primary);font-weight:600;font-size:0.875rem;text-decoration:underline;text-underline-offset:4px;">Change Case ⇄</a>
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-sm);">
          <button class="btn btn--secondary btn--sm">
            <span class="material-symbols-outlined" style="font-size:16px">download</span> Export Report
          </button>
          <button class="btn btn--secondary btn--sm">
            <span class="material-symbols-outlined" style="font-size:16px">print</span> Print
          </button>
        </div>
      </div>

      <!-- Summary Stats -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:var(--space-md);margin-bottom:var(--space-lg);">
        <div class="card" style="padding:var(--space-md);text-align:center;">
          <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;margin-bottom:4px;">Total Documents</div>
          <div style="font-size:1.75rem;font-weight:700;color:var(--primary);">${reviewDocuments.length}</div>
        </div>
        <div class="card" style="padding:var(--space-md);text-align:center;">
          <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;margin-bottom:4px;">Verified</div>
          <div style="font-size:1.75rem;font-weight:700;color:var(--status-verified);">${verified}</div>
        </div>
        <div class="card" style="padding:var(--space-md);text-align:center;">
          <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;margin-bottom:4px;">Flagged</div>
          <div style="font-size:1.75rem;font-weight:700;color:var(--status-flagged);">${flagged}</div>
        </div>
        <div class="card" style="padding:var(--space-md);text-align:center;">
          <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;margin-bottom:4px;">Integrity</div>
          <div style="font-size:1.75rem;font-weight:700;color:var(--primary);">${Math.round((verified / reviewDocuments.length) * 100)}%</div>
        </div>
      </div>

      <!-- Section: Evidence Lens -->
      <div style="margin-bottom:var(--space-sm);">
        <h2 class="text-headline-sm" style="color:var(--primary);margin-bottom:var(--space-xs);">Evidence Lens</h2>
        <p class="text-body-sm" style="color:var(--on-surface-variant);">Review each document in the docket for integrity, consistency, and flags.</p>
      </div>

      <!-- Document Review Cards -->
      <div class="stagger-children" style="display:flex;flex-direction:column;gap:var(--space-md);">
        ${reviewDocuments.map(doc => renderReviewCard(doc)).join('')}
      </div>
    </div>
  `;
}

function renderReviewCard(doc) {
  return `
    <div class="card" style="padding:var(--space-lg);transition:box-shadow 0.15s;"
         onmouseover="this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.boxShadow='var(--shadow-sm)'">
      <div style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:var(--space-md);">
        <div style="display:flex;align-items:center;gap:var(--space-md);min-width:0;flex:1;">
          <div style="width:44px;height:44px;border-radius:var(--radius-md);background:var(--surface-container-low);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span class="material-symbols-outlined" style="font-size:22px;color:var(--primary)">description</span>
          </div>
          <div style="min-width:0;">
            <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;">
              <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">${doc.name}</span>
              ${statusBadge(doc.status, doc.statusLabel)}
            </div>
            <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;margin-top:2px;" class="text-body-sm" style="color:var(--on-surface-variant);">
              <span style="color:var(--on-surface-variant);">${doc.category}</span>
              <span style="color:var(--outline);">·</span>
              <span style="color:var(--on-surface-variant);">${doc.pages} pages</span>
              <span style="color:var(--outline);">·</span>
              <span style="color:var(--on-surface-variant);">Uploaded ${doc.uploadedDate}</span>
            </div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-sm);flex-shrink:0;">
          <div class="text-code-sm" style="background:var(--surface-container-low);padding:2px 8px;border-radius:var(--radius-sm);color:var(--secondary);">
            Hash: ${doc.hash}
          </div>
          <button class="btn btn--ghost btn--sm" title="View document">
            <span class="material-symbols-outlined" style="font-size:18px">visibility</span>
          </button>
        </div>
      </div>

      ${doc.flags.length > 0 ? `
        <div style="margin-top:var(--space-md);padding:var(--space-sm) var(--space-md);background:var(--status-flagged-bg);border-radius:var(--radius-md);border-left:3px solid var(--status-flagged);">
          ${doc.flags.map(flag => `
            <div style="display:flex;align-items:center;gap:var(--space-sm);">
              <span class="material-symbols-outlined" style="font-size:16px;color:var(--status-flagged);">warning</span>
              <span class="text-body-sm" style="color:var(--on-surface);">${flag}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

export function initReviewPage() {
  // Review page is primarily display — no special interactive logic needed beyond hover states
}
