/**
 * CaseCompass — 2. Upload Page
 * Ingest court records, orders, and FIRs into the active case docket.
 * Synchronizes immediately with Evidence Review Lens and Live Timeline.
 */

import { api } from '../api.js';

export function renderUploadPage() {
  const activeCase = api.getActiveCase();
  const existingDocs = api.getCaseDocuments(activeCase.id);

  return `
    <div class="page-content animate-fade-in" style="max-width: 1040px; margin: 0 auto;">
      <!-- Success Toast / Notification -->
      <div id="upload-success-toast" style="display:none;margin-bottom:var(--space-md);padding:14px 20px;border-radius:var(--radius-lg);background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;align-items:center;justify-content:space-between;gap:12px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="material-symbols-outlined" style="color:#059669;font-size:24px;">check_circle</span>
          <div>
            <div style="font-weight:700;font-size:0.9375rem;" id="upload-success-title">Documents Ingested Successfully!</div>
            <div style="font-size:0.8125rem;color:#047857;" id="upload-success-desc">
              FIR & court orders integrated into Evidence Lens & live timeline.
            </div>
          </div>
        </div>
        <a href="#/review" class="btn btn--primary btn--sm" style="text-decoration:none;border-radius:8px;background:#059669;">
          <span>View in Evidence Review Lens</span>
          <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
        </a>
      </div>

      <!-- Page Header -->
      <div style="margin-bottom:var(--space-lg);">
        <h1 class="page-heading">2. Document Intake & FIR Upload</h1>
        <p class="text-body-sm" style="color:var(--on-surface-variant);margin-top:4px;">
          Upload court records, FIR depositions, chargesheets, and orders to activate Evidence Lens
        </p>
      </div>

      <!-- Case Context Bar -->
      <div class="card-flat" style="padding:var(--space-md);margin-bottom:var(--space-lg);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-md);">
        <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;">
          <span style="width:10px;height:10px;background:var(--primary);border-radius:50%;"></span>
          <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">Active Matter: ${activeCase.title}</span>
          <span class="text-code-sm" style="color:var(--secondary);background:var(--surface-container-low);padding:2px 8px;border-radius:var(--radius-sm);">CNR: ${activeCase.cnr}</span>
          <span class="badge badge--neutral">${existingDocs.length} Docs currently in dossier</span>
        </div>
        <a href="#/cases" class="btn btn--ghost btn--sm">Change Case ⇄</a>
      </div>

      <!-- Drop Zone -->
      <div id="drop-target" class="card" style="padding:var(--space-xl);text-align:center;border:2px dashed var(--outline-variant);border-radius:var(--radius-xl);margin-bottom:var(--space-lg);transition:all 0.2s;cursor:pointer;">
        <span class="material-symbols-outlined" style="font-size:48px;color:var(--primary);display:block;margin-bottom:var(--space-sm);">cloud_upload</span>
        <p class="text-body-lg" style="font-weight:600;color:var(--on-surface);margin-bottom:4px;">
          Drag and drop FIR or court documents here
        </p>
        <p class="text-body-sm" style="color:var(--on-surface-variant);margin-bottom:var(--space-md);">
          or click to browse · PDF, JPEG, PNG, TIFF · Max 25 MB per file
        </p>
        <label class="btn btn--primary" for="file-native-input" style="cursor:pointer;">
          <span class="material-symbols-outlined" style="font-size:18px">folder_open</span>
          Browse Files
        </label>
        <input type="file" id="file-native-input" multiple accept=".pdf,.jpg,.jpeg,.png,.tiff"
               style="display:none;" aria-label="Select files to upload">
      </div>

      <!-- Upload Queue -->
      <div style="margin-bottom:var(--space-lg);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-sm);">
          <div style="display:flex;align-items:center;gap:var(--space-sm);">
            <span class="section-title" style="margin-bottom:0;">Intake Queue</span>
            <span id="queue-counter-badge" class="badge badge--neutral">0 Files Selected</span>
          </div>
          <div style="display:flex;gap:var(--space-sm);">
            <button class="btn btn--ghost btn--sm" id="btn-sample-fir" style="font-size:0.75rem;color:var(--primary);">
              <span class="material-symbols-outlined" style="font-size:14px">description</span> + Add Sample FIR & Chargesheet
            </button>
            <button class="btn btn--ghost btn--sm" id="btn-clear-queue" style="font-size:0.75rem;">
              <span class="material-symbols-outlined" style="font-size:14px">delete_sweep</span> Clear
            </button>
          </div>
        </div>

        <div id="files-queue-list" style="display:flex;flex-direction:column;gap:8px;border-radius:var(--radius-lg);">
          <div id="queue-empty-prompt" style="padding:var(--space-lg);text-align:center;color:var(--on-surface-variant);background:var(--surface-container-low);border-radius:var(--radius-md);" class="text-body-sm">
            No files currently in queue. Drag & drop court documents or click "+ Add Sample FIR & Chargesheet" above.
          </div>
        </div>
      </div>

      <!-- Upload Progress -->
      <div id="global-progress-wrap" style="display:none;align-items:center;gap:var(--space-md);padding:var(--space-md);background:var(--surface-container-low);border-radius:var(--radius-lg);margin-bottom:var(--space-md);">
        <div style="flex:1;height:8px;background:var(--outline-variant);border-radius:4px;overflow:hidden;">
          <div id="progress-bar-fill" style="width:0%;height:100%;background:var(--primary);border-radius:4px;transition:width 0.25s;"></div>
        </div>
        <span id="progress-percent" class="text-label-md" style="color:var(--primary);min-width:3rem;text-align:right;font-weight:700;">0%</span>
      </div>

      <!-- Upload Action -->
      <div style="display:flex;align-items:center;justify-content:flex-end;gap:var(--space-sm);">
        <button class="btn btn--primary btn--lg" id="upload-primary-btn" disabled>
          <span class="material-symbols-outlined" style="font-size:20px">upload</span>
          Upload & Ingest All Documents
        </button>
      </div>
    </div>
  `;
}

export function initUploadPage() {
  const activeCase = api.getActiveCase();
  const fileInput = document.getElementById('file-native-input');
  const dropTarget = document.getElementById('drop-target');
  const queueList = document.getElementById('files-queue-list');
  const queueEmpty = document.getElementById('queue-empty-prompt');
  const counterBadge = document.getElementById('queue-counter-badge');
  const uploadBtn = document.getElementById('upload-primary-btn');
  const clearBtn = document.getElementById('btn-clear-queue');
  const sampleFirBtn = document.getElementById('btn-sample-fir');
  const successToast = document.getElementById('upload-success-toast');

  let queueFiles = [];

  function updateUI() {
    if (counterBadge) counterBadge.textContent = `${queueFiles.length} Files Selected`;
    if (uploadBtn) uploadBtn.disabled = queueFiles.length === 0;
    if (queueEmpty) queueEmpty.style.display = queueFiles.length === 0 ? 'block' : 'none';
  }

  function addFiles(files) {
    for (const f of files) {
      if (!queueFiles.some(item => item.name === f.name)) {
        queueFiles.push(f);
        renderQueueItem(f);
      }
    }
    updateUI();
  }

  function renderQueueItem(file) {
    if (!queueList) return;
    const isFir = file.name.toLowerCase().includes('fir');
    const isPdf = file.name.toLowerCase().endsWith('.pdf');
    const icon = isFir ? 'local_police' : (isPdf ? 'picture_as_pdf' : 'description');

    const item = document.createElement('div');
    item.className = 'card-flat queue-item';
    item.setAttribute('data-filename', file.name);
    item.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--surface-container-lowest);border-radius:var(--radius-md);animation:fadeIn 0.2s ease;';
    item.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;min-width:0;">
        <div style="width:38px;height:38px;border-radius:8px;background:${isFir ? '#eff6ff' : 'var(--surface-container-low)'};color:${isFir ? '#1d4ed8' : 'var(--primary)'};display:flex;align-items:center;justify-content:center;">
          <span class="material-symbols-outlined" style="font-size:20px;">${icon}</span>
        </div>
        <div>
          <div style="font-weight:700;font-size:0.875rem;color:var(--on-surface);">${file.name}</div>
          <div style="font-size:0.75rem;color:var(--on-surface-variant);">${isFir ? 'First Information Report (FIR)' : 'Court Filing Record'} · Ready for OCR & Ledger Ingestion</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span class="badge badge--neutral" style="font-size:0.6875rem;">Queued</span>
        <button type="button" class="btn-remove-item" style="background:none;border:none;cursor:pointer;color:var(--outline);padding:4px;" title="Remove">
          <span class="material-symbols-outlined" style="font-size:18px;">close</span>
        </button>
      </div>
    `;

    item.querySelector('.btn-remove-item')?.addEventListener('click', () => {
      queueFiles = queueFiles.filter(f => f.name !== file.name);
      item.remove();
      updateUI();
    });

    queueList.appendChild(item);
  }

  // File input change
  fileInput?.addEventListener('change', (e) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
  });

  // Drop target
  dropTarget?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropTarget.style.borderColor = 'var(--primary)';
    dropTarget.style.background = 'var(--surface-container-low)';
  });
  dropTarget?.addEventListener('dragleave', () => {
    dropTarget.style.borderColor = 'var(--outline-variant)';
    dropTarget.style.background = '';
  });
  dropTarget?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropTarget.style.borderColor = 'var(--outline-variant)';
    dropTarget.style.background = '';
    if (e.dataTransfer?.files) addFiles(Array.from(e.dataTransfer.files));
  });

  // Clear queue
  clearBtn?.addEventListener('click', () => {
    queueFiles = [];
    if (queueList) {
      queueList.querySelectorAll('.queue-item').forEach(el => el.remove());
    }
    updateUI();
  });

  // Add sample FIR button
  sampleFirBtn?.addEventListener('click', () => {
    const sampleFiles = [
      { name: `FIR_${activeCase.cnr.replace(/[^a-zA-Z0-9]/g, '_')}_Police_Lodgment.pdf`, size: 1400000 },
      { name: `Chargesheet_Exhibits_${activeCase.court.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`, size: 2800000 },
      { name: `Order_Sheet_Initial_Cognizance.pdf`, size: 950000 },
    ];
    addFiles(sampleFiles);
  });

  // Upload trigger
  uploadBtn?.addEventListener('click', () => {
    if (queueFiles.length === 0) return;

    const progressWrap = document.getElementById('global-progress-wrap');
    const progressBar = document.getElementById('progress-bar-fill');
    const progressPercent = document.getElementById('progress-percent');

    if (progressWrap) progressWrap.style.display = 'flex';
    uploadBtn.disabled = true;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        if (progressBar) progressBar.style.width = '100%';
        if (progressPercent) progressPercent.textContent = '100%';

        // Add to persistent case document store and auto-add timeline proceeding!
        api.addCaseDocuments(activeCase.id, queueFiles);

        // Update queue item badges
        document.querySelectorAll('.queue-item .badge').forEach(b => {
          b.className = 'badge badge--verified';
          b.innerHTML = '<span class="material-symbols-outlined" style="font-size:12px">check</span> Uploaded & Verified';
        });

        // Show success toast with link to Evidence Lens
        if (successToast) {
          successToast.style.display = 'flex';
          const successDesc = document.getElementById('upload-success-desc');
          if (successDesc) {
            successDesc.textContent = `${queueFiles.length} court records & FIR successfully indexed into Evidence Lens and live timeline!`;
          }
        }
      } else {
        if (progressBar) progressBar.style.width = progress + '%';
        if (progressPercent) progressPercent.textContent = progress + '%';
      }
    }, 200);
  });
}
