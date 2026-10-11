/**
 * CaseCompass — 1. Cases Page
 * Real-time Case Records Management with instant persistence
 * Ensures any newly created case is immediately visible in All Records
 */

import { api } from '../api.js';

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

function renderCaseCard(c) {
  const safeTitle = (c.title || '').replace(/"/g, '&quot;');
  return `
    <div class="card-flat case-record-item" data-case-id="${c.id}" data-case-status="${c.status}" data-case-title="${safeTitle}"
         data-case-cnr="${c.cnr}" data-case-court="${c.court}"
         style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-md);padding:var(--space-md) var(--space-lg);transition:all 0.2s;cursor:pointer;"
         onmouseover="this.style.boxShadow='var(--shadow-md)';this.style.borderColor='var(--primary)'"
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
              ${c.statusLabel || c.status}
            </span>
            ${c.isCustom ? `<span class="badge" style="background:#eff6ff;color:#1d4ed8;font-size:0.6875rem;">Newly Added</span>` : ''}
          </div>
          <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;margin-top:2px;">
            <span class="text-code-sm" style="color:var(--secondary);background:var(--surface-container-low);padding:1px 6px;border-radius:var(--radius-sm);">CNR: ${c.cnr}</span>
            <span class="text-body-sm" style="color:var(--on-surface-variant);">${c.court}</span>
          </div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:var(--space-md);flex-shrink:0;flex-wrap:wrap;">
        <div style="text-align:center;min-width:44px;">
          <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;">Docs</div>
          <div class="text-body-md" style="font-weight:600;color:var(--primary);">${c.documents || 0}</div>
        </div>
        <div style="text-align:center;min-width:80px;">
          <div class="text-label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;">Next Hearing</div>
          <div class="text-body-sm" style="font-weight:500;color:var(--on-surface);">${c.nextHearing || 'Upcoming'}</div>
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
  let cases = JSON.parse(localStorage.getItem('casecompass_cases_list') || 'null');
  if (!cases || cases.length === 0) {
    cases = api.getCases();
  }
  const filterPills = [
    { value: 'all', label: 'All Records' },
    { value: 'verified', label: 'Verified' },
    { value: 'pending', label: 'Pending' },
    { value: 'flagged', label: 'Flagged' },
    { value: 'processing', label: 'Processing' },
  ];

  return `
    <div class="page-content animate-fade-in">
      <!-- Success Toast Notification Placeholder -->
      <div id="cases-alert-toast" style="display:none;margin-bottom:var(--space-md);padding:12px 18px;border-radius:var(--radius-md);background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;align-items:center;gap:10px;">
        <span class="material-symbols-outlined" style="color:#059669;font-size:20px;">check_circle</span>
        <span id="cases-alert-toast-text" style="font-size:0.875rem;font-weight:600;">Case registered successfully</span>
      </div>

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
                 style="flex:1;border:1px solid var(--outline-variant);padding:8px 12px;border-radius:var(--radius-md);outline:none;"
                 aria-label="Search cases">
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-xs);flex-wrap:wrap;" id="filter-pills-container">
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
        Showing ${cases.length} of ${cases.length} records
      </div>

      <!-- Case Cards List -->
      <div class="stagger-children" id="cases-list" style="display:flex;flex-direction:column;gap:var(--space-sm);">
        ${cases.map(c => renderCaseCard(c)).join('')}
      </div>

      <!-- Empty state -->
      <div id="empty-filter-state" style="display:none;text-align:center;padding:var(--space-xl);color:var(--on-surface-variant);">
        <span class="material-symbols-outlined" style="font-size:48px;color:var(--outline-variant)">search_off</span>
        <p class="text-body-md" style="margin-top:var(--space-sm);">No records match your filters.</p>
      </div>

      <!-- New Case Modal -->
      <div id="new-case-modal" class="modal-overlay" style="display:none;position:fixed;inset:0;z-index:60;background:rgba(0,0,0,0.6);align-items:center;justify-content:center;padding:var(--space-md);backdrop-filter:blur(4px);">
        <div class="card" style="width:100%;max-width:520px;padding:var(--space-xl);animation:slideUp 0.3s ease;box-shadow:var(--shadow-lg);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-lg);border-bottom:1px solid var(--outline-variant);padding-bottom:12px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:36px;height:36px;border-radius:8px;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;">
                <span class="material-symbols-outlined" style="font-size:20px;">folder_open</span>
              </div>
              <div>
                <h2 class="text-headline-sm" style="color:var(--primary);font-weight:700;">Register New Case Record</h2>
                <p style="font-size:0.75rem;color:var(--on-surface-variant);">Record will instantly appear in All Records</p>
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
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">CNR Number</label>
                <input type="text" id="modal-case-cnr" placeholder="e.g., MHPU01-009842-2025"
                       style="width:100%;padding:10px 14px;border:1px solid var(--outline-variant);border-radius:var(--radius-md);outline:none;">
              </div>
              <div>
                <label class="text-label-md" style="color:var(--on-surface);display:block;margin-bottom:4px;font-weight:600;">Initial Status</label>
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
                Create Dossier
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
  const casesListEl = document.getElementById('cases-list');
  let currentStatus = 'all';

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

    const targetCard = document.querySelector(`.case-record-item[data-case-id="${idToDelete}"]`);
    if (targetCard) {
      targetCard.style.transition = 'all 0.25s ease';
      targetCard.style.opacity = '0';
      targetCard.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        targetCard.remove();
        applyFilter();
      }, 250);
    }

    const toast = document.getElementById('cases-alert-toast');
    const toastText = document.getElementById('cases-alert-toast-text');
    if (toast && toastText) {
      toastText.textContent = `Case "${titleToDelete}" has been permanently deleted.`;
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

  function applyFilter() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const caseCards = document.querySelectorAll('.case-record-item');
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

  // Filter button clicks
  document.querySelectorAll('[data-filter-status]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-status]').forEach(b => {
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
    document.querySelectorAll('[data-filter-status]').forEach(b => {
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

  // Card click navigation
  function attachCardListeners() {
    document.querySelectorAll('.case-record-item').forEach(card => {
      card.addEventListener('click', (e) => {
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
    const cnr = document.getElementById('modal-case-cnr')?.value || '';
    const court = document.getElementById('modal-case-court')?.value || '';
    const section = document.getElementById('modal-case-section')?.value || '';
    const status = document.getElementById('modal-case-status')?.value || 'pending';

    if (!title.trim()) return;

    // Create via API client & persist in storage
    const newRecord = await api.createCase({
      title,
      cnr,
      court,
      section,
      status,
    });

    closeModal();
    form.reset();

    // 1. Reset filter to 'All Records' so new record is immediately visible
    currentStatus = 'all';
    document.querySelectorAll('[data-filter-status]').forEach(b => {
      if (b.getAttribute('data-filter-status') === 'all') {
        b.classList.remove('btn--secondary');
        b.classList.add('btn--primary');
      } else {
        b.classList.remove('btn--primary');
        b.classList.add('btn--secondary');
      }
    });

    // 2. Prepend new record into cases-list
    if (casesListEl) {
      const cardHtml = renderCaseCard(newRecord);
      casesListEl.insertAdjacentHTML('afterbegin', cardHtml);

      // Flash highlight on the newly added card
      const newlyAddedCard = casesListEl.querySelector(`[data-case-id="${newRecord.id}"]`);
      if (newlyAddedCard) {
        newlyAddedCard.style.border = '2px solid #2563eb';
        newlyAddedCard.style.background = '#eff6ff';
        setTimeout(() => {
          newlyAddedCard.style.border = '';
          newlyAddedCard.style.background = '';
        }, 2500);
      }
    }

    // Reattach listeners & update counts
    attachCardListeners();
    applyFilter();

    // Show toast
    const toast = document.getElementById('cases-alert-toast');
    const toastText = document.getElementById('cases-alert-toast-text');
    if (toast && toastText) {
      toastText.textContent = `New Case "${newRecord.title}" successfully registered and added to All Records!`;
      toast.style.display = 'flex';
      setTimeout(() => { toast.style.display = 'none'; }, 4000);
    }
  });
}
