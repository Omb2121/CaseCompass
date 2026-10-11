/**
 * CaseCompass — 2. Upload Page
 * Matches Stitch screen: "CaseCompass — Upload Documents"
 */

import { demoCase, uploadedDocuments } from '../data/demoData.js';

export function renderUploadPage() {
  return `
    <div class="page-content animate-fade-in">
      <!-- Page Header -->
      <div style="margin-bottom:var(--space-lg);">
        <h1 class="page-heading" style="font-family:var(--font-headline);">Upload Documents</h1>
        <p class="text-body-sm" style="color:var(--on-surface-variant);margin-top:4px;">
          Add court records, orders, and evidence to the active docket
        </p>
      </div>

      <!-- Case Context Bar -->
      <div class="card-flat" style="padding:var(--space-md);margin-bottom:var(--space-lg);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-md);">
        <div style="display:flex;align-items:center;gap:var(--space-sm);">
          <span style="width:8px;height:8px;background:var(--primary);border-radius:50%;"></span>
          <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">Active: ${demoCase.title}</span>
          <span class="text-code-sm" style="color:var(--secondary);background:var(--surface-container-low);padding:2px 8px;border-radius:var(--radius-sm);">CNR: ${demoCase.cnr}</span>
        </div>
        <a href="#/cases" class="btn btn--ghost btn--sm">Change Case ⇄</a>
      </div>

      <!-- Drop Zone -->
      <div id="drop-target" class="card" style="padding:var(--space-xl);text-align:center;border:2px dashed var(--outline-variant);border-radius:var(--radius-xl);margin-bottom:var(--space-lg);transition:background 0.2s,border-color 0.2s;cursor:pointer;"
           ondragover="event.preventDefault();this.style.borderColor='var(--primary)';this.style.background='var(--surface-container-low)'"
           ondragleave="this.style.borderColor='var(--outline-variant)';this.style.background='var(--surface-container-lowest)'"
           ondrop="event.preventDefault();this.style.borderColor='var(--outline-variant)';this.style.background='var(--surface-container-lowest)'">
        <span class="material-symbols-outlined" style="font-size:48px;color:var(--primary);display:block;margin-bottom:var(--space-sm);">cloud_upload</span>
        <p class="text-body-lg" style="font-weight:600;color:var(--on-surface);margin-bottom:4px;">
          Drag and drop files here
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
            <span class="section-title" style="margin-bottom:0;">Files in Queue</span>
            <span id="queue-counter-badge" class="badge badge--neutral">${uploadedDocuments.length} Files in Queue</span>
          </div>
          <div style="display:flex;gap:var(--space-sm);">
            <button class="btn btn--ghost btn--sm" onclick="window.__clearQueue?.()">
              <span class="material-symbols-outlined" style="font-size:14px">delete_sweep</span> Clear All
            </button>
          </div>
        </div>

        <div id="files-queue-list" style="display:flex;flex-direction:column;gap:2px;border-radius:var(--radius-lg);overflow:hidden;">
          ${uploadedDocuments.map(doc => renderQueueItem(doc)).join('')}
        </div>
      </div>

      <!-- Upload Progress -->
      <div id="global-progress-wrap" style="display:none;align-items:center;gap:var(--space-md);padding:var(--space-md);background:var(--surface-container-low);border-radius:var(--radius-lg);margin-bottom:var(--space-md);">
        <div style="flex:1;height:6px;background:var(--outline-variant);border-radius:3px;overflow:hidden;">
          <div id="progress-bar-fill" style="width:0%;height:100%;background:var(--primary);border-radius:3px;transition:width 0.3s;"></div>
        </div>
        <span id="progress-percent" class="text-label-md" style="color:var(--primary);min-width:3rem;text-align:right;">0%</span>
      </div>

      <!-- Upload Action -->
      <div style="display:flex;align-items:center;justify-content:flex-end;gap:var(--space-sm);">
        <button class="btn btn--primary btn--lg" id="upload-primary-btn" onclick="window.__triggerUpload?.()">
          <span class="material-symbols-outlined" style="font-size:20px">upload</span>
          Upload All Documents
        </button>
      </div>
    </div>
  `;
}

function renderQueueItem(doc) {
  const isPdf = doc.type === 'pdf';
  const iconName = isPdf ? 'picture_as_pdf' : 'image';
  const iconBg = isPdf ? 'background:var(--error-container);color:var(--error)' : 'background:var(--surface-variant);color:var(--primary)';

  return `
    <div class="queue-item" data-filename="${doc.name}"
         style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-md);background:var(--surface-container-lowest);box-shadow:var(--shadow-xs);transition:background 0.15s;"
         onmouseover="this.style.background='var(--surface-container-low)'"
         onmouseout="this.style.background='var(--surface-container-lowest)'">
      <div style="display:flex;align-items:center;gap:var(--space-md);min-width:0;">
        <div style="width:40px;height:40px;${iconBg};display:flex;align-items:center;justify-content:center;border-radius:var(--radius-md);flex-shrink:0;">
          <span class="material-symbols-outlined" style="font-size:22px">${iconName}</span>
        </div>
        <div style="min-width:0;">
          <div class="text-body-md" style="font-weight:600;color:var(--primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${doc.name}</div>
          <div style="display:flex;align-items:center;gap:8px;" class="text-body-sm" style="color:var(--secondary);">
            <span>${doc.size}</span>
            <span>·</span>
            <span>${doc.date}</span>
          </div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:var(--space-md);flex-shrink:0;">
        <span class="badge badge--verified" style="border-radius:var(--radius-sm);">
          <span class="material-symbols-outlined" style="font-size:12px">check</span>
          ${doc.status === 'uploaded' ? 'Uploaded' : 'Ready'}
        </span>
        <button type="button" style="background:none;border:none;cursor:pointer;color:var(--outline);padding:4px;transition:color 0.15s;"
                onclick="this.closest('.queue-item')?.remove();window.__updateQueueCount?.()"
                onmouseover="this.style.color='var(--error)'" onmouseout="this.style.color='var(--outline)'"
                title="Remove file" aria-label="Remove file">
          <span class="material-symbols-outlined" style="font-size:20px">delete</span>
        </button>
      </div>
    </div>
  `;
}

export function initUploadPage() {
  const fileInput = document.getElementById('file-native-input');
  const dropTarget = document.getElementById('drop-target');

  // Click to browse
  dropTarget?.addEventListener('click', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'LABEL') {
      fileInput?.click();
    }
  });

  fileInput?.addEventListener('change', (e) => {
    if (e.target.files?.length > 0) {
      Array.from(e.target.files).forEach(file => {
        addNewFileToQueue(file.name, (file.size / (1024 * 1024)).toFixed(1) + ' MB');
      });
    }
  });

  function addNewFileToQueue(filename, sizeStr) {
    const list = document.getElementById('files-queue-list');
    if (!list) return;

    const isPdf = filename.toLowerCase().endsWith('.pdf');
    const iconName = isPdf ? 'picture_as_pdf' : 'image';
    const iconBg = isPdf ? 'background:var(--error-container);color:var(--error)' : 'background:var(--surface-variant);color:var(--primary)';

    const item = document.createElement('div');
    item.className = 'queue-item';
    item.setAttribute('data-filename', filename);
    item.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:var(--space-md);background:var(--surface-container-lowest);box-shadow:var(--shadow-xs);animation:fadeIn 0.3s ease;';
    item.innerHTML = `
      <div style="display:flex;align-items:center;gap:var(--space-md);min-width:0;">
        <div style="width:40px;height:40px;${iconBg};display:flex;align-items:center;justify-content:center;border-radius:var(--radius-md);flex-shrink:0;">
          <span class="material-symbols-outlined" style="font-size:22px">${iconName}</span>
        </div>
        <div style="min-width:0;">
          <div class="text-body-md" style="font-weight:600;color:var(--primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${filename}</div>
          <div style="display:flex;align-items:center;gap:8px;color:var(--secondary);" class="text-body-sm">
            <span>${sizeStr}</span><span>·</span><span>Freshly Selected</span>
          </div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:var(--space-md);flex-shrink:0;">
        <span class="badge badge--neutral" style="border-radius:var(--radius-sm);">Ready</span>
        <button type="button" style="background:none;border:none;cursor:pointer;color:var(--outline);padding:4px;" onclick="this.closest('.queue-item')?.remove();window.__updateQueueCount?.()" title="Remove file" aria-label="Remove file">
          <span class="material-symbols-outlined" style="font-size:20px">delete</span>
        </button>
      </div>
    `;
    list.appendChild(item);
    updateQueueCount();
  }

  function updateQueueCount() {
    const items = document.querySelectorAll('.queue-item');
    const badge = document.getElementById('queue-counter-badge');
    if (badge) badge.textContent = `${items.length} Files in Queue`;
  }

  window.__updateQueueCount = updateQueueCount;

  window.__clearQueue = () => {
    const list = document.getElementById('files-queue-list');
    if (list) {
      list.innerHTML = `
        <div style="padding:var(--space-lg);text-align:center;color:var(--secondary);background:var(--surface-container-low);border-radius:var(--radius-md);" class="text-body-md">
          Queue cleared. Select or drop records above.
        </div>
      `;
      updateQueueCount();
    }
  };

  window.__triggerUpload = () => {
    const progressWrap = document.getElementById('global-progress-wrap');
    const progressBar = document.getElementById('progress-bar-fill');
    const progressPercent = document.getElementById('progress-percent');
    const actionBtn = document.getElementById('upload-primary-btn');

    if (!progressWrap || !progressBar || !progressPercent) return;

    progressWrap.style.display = 'flex';
    if (actionBtn) actionBtn.disabled = true;

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        progressBar.style.width = '100%';
        progressPercent.textContent = '100%';
        if (actionBtn) actionBtn.disabled = false;

        // Mark queue items as uploaded
        document.querySelectorAll('.queue-item .badge').forEach(badge => {
          badge.className = 'badge badge--verified';
          badge.style.borderRadius = 'var(--radius-sm)';
          badge.innerHTML = '<span class="material-symbols-outlined" style="font-size:12px">check</span> Uploaded';
        });
      } else {
        progressBar.style.width = current + '%';
        progressPercent.textContent = current + '%';
      }
    }, 300);
  };
}
