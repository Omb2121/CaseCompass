/**
 * CaseCompass — 1. Cases Page
 * Matches Stitch screen: "CaseCompass — Cases Tab"
 */

import { casesData } from '../data/demoData.js';

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

export function renderCasesPage() {
  const filterPills = [
    { value: 'all', label: 'All Records' },
    { value: 'verified', label: 'Verified' },
    { value: 'pending', label: 'Pending' },
    { value: 'flagged', label: 'Flagged' },
    { value: 'processing', label: 'Processing' },
  ];

  return `
    <div class="page-content animate-fade-in">
      <!-- Page Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--space-md);margin-bottom:var(--space-lg);">
        <div>
          <h1 class="page-heading">1. Cases</h1>
          <p class="text-body-sm" style="color:var(--on-surface-variant);margin-top:4px;">
            Manage and track all court record dossiers
          </p>
        </div>
        <button class="btn btn--primary" id="open-create-modal-btn">
          <span class="material-symbols-outlined" style="font-size:18px">add</span>
          New Case Record
        </button>
      </div>

      <!-- Search & Filter Bar -->
      <div class="card-flat" style="padding:var(--space-md);margin-bottom:var(--space-lg);display:flex;flex-wrap:wrap;gap:var(--space-md);align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:var(--space-sm);flex:1;min-width:200px;max-width:400px;">
          <span class="material-symbols-outlined" style="font-size:20px;color:var(--outline)">search</span>
          <input type="search" id="case-search-input" placeholder="Search by title, CNR, or court…"
                 style="flex:1;border:1px solid var(--outline-variant);padding:6px 12px;border-radius:var(--radius-md);"
                 aria-label="Search cases">
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-xs);flex-wrap:wrap;">
          ${filterPills.map((p, i) => `
            <button class="btn btn--sm ${i === 0 ? 'btn--primary' : 'btn--secondary'}"
                    data-filter-status="${p.value}"
                    style="border-radius:var(--radius-full);font-size:0.8125rem;">
              ${p.label}
            </button>
          `).join('')}
          <button class="btn btn--ghost btn--sm" id="clear-filters-btn" style="font-size:0.75rem;">
            <span class="material-symbols-outlined" style="font-size:14px">close</span> Clear
          </button>
        </div>
      </div>

      <!-- Cases Count -->
      <div style="margin-bottom:var(--space-sm);font-size:0.8125rem;color:var(--on-surface-variant);" id="displayed-case-count">
        Showing ${casesData.length} of ${casesData.length} records
      </div>

      <!-- Case Cards List -->
      <div class="stagger-children" id="cases-list" style="display:flex;flex-direction:column;gap:var(--space-sm);">
        ${casesData.map(c => renderCaseCard(c)).join('')}
      </div>

      <!-- Empty state -->
      <div id="empty-filter-state" style="display:none;text-align:center;padding:var(--space-xl);color:var(--on-surface-variant);">
        <span class="material-symbols-outlined" style="font-size:48px;color:var(--outline-variant)">search_off</span>
        <p class="text-body-md" style="margin-top:var(--space-sm);">No records match your filters.</p>
      </div>

      <!-- New Case Modal -->
      <div id="new-case-modal" class="modal-overlay" style="display:none;position:fixed;inset:0;z-index:60;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;padding:var(--space-md);">
        <div class="card" style="width:100%;max-width:480px;padding:var(--space-lg);animation:slideUp 0.3s ease;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-lg);">
            <h2 class="text-headline-sm" style="color:var(--primary)">Register New Case Record</h2>
            <button id="close-modal-btn" style="background:none;border:none;cursor:pointer;color:var(--on-surface-variant);padding:4px;" aria-label="Close modal">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <form id="create-case-form" style="display:flex;flex-direction:column;gap:var(--space-md);">
            <div>
              <label class="text-label-md" style="color:var(--on-surface-variant);display:block;margin-bottom:4px;">Case Title *</label>
              <input type="text" id="modal-case-title" required placeholder="e.g., State of Maharashtra v. John Doe"
                     style="width:100%;">
            </div>
            <div>
              <label class="text-label-md" style="color:var(--on-surface-variant);display:block;margin-bottom:4px;">CNR Number</label>
              <input type="text" id="modal-case-cnr" placeholder="e.g., MHPU01-XXXXXX-2024" style="width:100%;">
            </div>
            <div>
              <label class="text-label-md" style="color:var(--on-surface-variant);display:block;margin-bottom:4px;">Court</label>
              <input type="text" id="modal-case-court" placeholder="e.g., JMFC Pune" style="width:100%;">
            </div>
            <div style="display:flex;gap:var(--space-sm);justify-content:flex-end;margin-top:var(--space-sm);">
              <button type="button" class="btn btn--secondary" id="cancel-modal-btn">Cancel</button>
              <button type="submit" class="btn btn--primary">Create Dossier</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

function renderCaseCard(c) {
  return `
    <div class="card-flat case-record-item" data-case-status="${c.status}" data-case-title="${c.title}"
         data-case-cnr="${c.cnr}" data-case-court="${c.court}"
         style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-md);padding:var(--space-md) var(--space-lg);transition:box-shadow 0.15s,border-color 0.15s;cursor:pointer;"
         onmouseover="this.style.boxShadow='var(--shadow-md)';this.style.borderColor='var(--primary-fixed-dim)'"
         onmouseout="this.style.boxShadow='var(--shadow-xs)';this.style.borderColor='var(--outline-variant)'">
      <div style="display:flex;align-items:center;gap:var(--space-md);min-width:0;flex:1;">
        <div style="width:40px;height:40px;border-radius:var(--radius-md);background:var(--surface-container-low);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span class="material-symbols-outlined" style="font-size:20px;color:var(--primary)">folder_open</span>
        </div>
        <div style="min-width:0;">
          <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;">
            <span class="text-body-md" style="font-weight:600;color:var(--on-surface);">${c.title}</span>
            <span class="badge ${statusBadgeClass(c.status)}">
              <span class="material-symbols-outlined" style="font-size:12px">${statusIcon(c.status)}</span>
              ${c.statusLabel}
            </span>
          </div>
          <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;margin-top:2px;">
            <span class="text-code-sm" style="color:var(--secondary);background:var(--surface-container-low);padding:1px 6px;border-radius:var(--radius-sm);">CNR: ${c.cnr}</span>
            <span class="text-body-sm" style="color:var(--on-surface-variant);">${c.court}</span>
          </div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:var(--space-lg);flex-shrink:0;">
        <div style="text-align:center;">
          <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;">Docs</div>
          <div class="text-body-md" style="font-weight:600;color:var(--primary);">${c.documents}</div>
        </div>
        <div style="text-align:center;">
          <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;">Next Hearing</div>
          <div class="text-body-sm" style="font-weight:500;color:var(--on-surface);">${c.nextHearing}</div>
        </div>
        <a href="#/timeline" class="btn btn--ghost btn--sm" style="font-size:0.75rem;text-transform:uppercase;">
          View Timeline →
        </a>
      </div>
    </div>
  `;
}

export function initCasesPage() {
  const filterBtns = document.querySelectorAll('[data-filter-status]');
  const caseCards = document.querySelectorAll('.case-record-item');
  const searchInput = document.getElementById('case-search-input');
  const clearBtn = document.getElementById('clear-filters-btn');
  const caseCountEl = document.getElementById('displayed-case-count');
  const emptyState = document.getElementById('empty-filter-state');
  let currentStatus = 'all';

  function applyFilter() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    let visibleCount = 0;

    caseCards.forEach(card => {
      const status = card.getAttribute('data-case-status');
      const title = (card.getAttribute('data-case-title') || '').toLowerCase();
      const cnr = (card.getAttribute('data-case-cnr') || '').toLowerCase();
      const court = (card.getAttribute('data-case-court') || '').toLowerCase();

      const matchesStatus = (currentStatus === 'all') || (status === currentStatus);
      const matchesQuery = !query || title.includes(query) || cnr.includes(query) || court.includes(query);

      if (matchesStatus && matchesQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (caseCountEl) {
      caseCountEl.textContent = `Showing ${visibleCount} of ${caseCards.length} records`;
    }
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('btn--primary');
        b.classList.add('btn--secondary');
      });
      btn.classList.remove('btn--secondary');
      btn.classList.add('btn--primary');
      currentStatus = btn.getAttribute('data-filter-status');
      applyFilter();
    });
  });

  searchInput?.addEventListener('input', applyFilter);

  clearBtn?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    currentStatus = 'all';
    filterBtns.forEach(b => {
      if (b.getAttribute('data-filter-status') === 'all') {
        b.classList.remove('btn--secondary');
        b.classList.add('btn--primary');
      } else {
        b.classList.remove('btn--primary');
        b.classList.add('btn--secondary');
      }
    });
    applyFilter();
  });

  // Modal
  const modal = document.getElementById('new-case-modal');
  const openBtn = document.getElementById('open-create-modal-btn');
  const closeBtn = document.getElementById('close-modal-btn');
  const cancelBtn = document.getElementById('cancel-modal-btn');
  const form = document.getElementById('create-case-form');

  function openModal() { if (modal) { modal.style.display = 'flex'; } }
  function closeModal() { if (modal) { modal.style.display = 'none'; } }

  openBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Demo: New case dossier registered and queued for document ingestion.');
    closeModal();
    form.reset();
  });
}
