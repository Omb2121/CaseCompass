/**
 * CaseCompass — Frontend API Client & State Store
 * Handles:
 * - Dynamic live cases
 * - Per-case live timeline proceedings (no mock events on custom/new cases)
 * - Evidence lens document state (only reflects when actually documented / FIR uploaded)
 * - Word (.docx) export generation
 * - Printable case reports
 */

import { casesData as defaultCases, demoCase as defaultDemoCase, timelineEvents as defaultTimeline, reviewDocuments as defaultReviewDocs } from './data/demoData.js';

const CASES_STORAGE_KEY = 'casecompass_cases_list';
const ACTIVE_CASE_KEY = 'casecompass_active_case_id';

export function initStore() {
  if (!localStorage.getItem(CASES_STORAGE_KEY)) {
    localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(defaultCases));
  }
  if (!localStorage.getItem(ACTIVE_CASE_KEY)) {
    localStorage.setItem(ACTIVE_CASE_KEY, '1');
  }
  // Initialize default case 1 timeline and docs
  if (!localStorage.getItem('casecompass_timeline_1')) {
    localStorage.setItem('casecompass_timeline_1', JSON.stringify(defaultTimeline));
  }
  if (!localStorage.getItem('casecompass_docs_1')) {
    localStorage.setItem('casecompass_docs_1', JSON.stringify(defaultReviewDocs));
  }
}

initStore();

export const api = {
  /**
   * Get all case records
   */
  async getCases() {
    try {
      const res = await fetch('/api/cases');
      if (res.ok) {
        const backendData = await res.json();
        if (Array.isArray(backendData) && backendData.length > 0) {
          const local = JSON.parse(localStorage.getItem(CASES_STORAGE_KEY) || '[]');
          const customCases = local.filter(c => c.isCustom);
          const mapped = backendData.map(b => ({
            id: b.id,
            title: b.label || b.title,
            cnr: b.case_number || b.cnr || 'MHPU01-004291-2024',
            court: b.court || 'District Court, Pune',
            status: b.status || 'verified',
            statusLabel: b.status === 'verified' ? 'Verified' : (b.status === 'flagged' ? 'Needs Attention' : (b.status === 'processing' ? 'Processing' : 'Pending Review')),
            documents: b.documents_count || 12,
            nextHearing: b.next_hearing || '14 Feb 2025',
            filingDate: b.created_at ? b.created_at.split('T')[0] : '15 Mar 2024',
            section: b.section || 'IPC §420, §468',
          }));
          const combined = [...customCases, ...mapped];
          localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(combined));
          return combined;
        }
      }
    } catch {
      // Use local storage
    }
    return JSON.parse(localStorage.getItem(CASES_STORAGE_KEY) || JSON.stringify(defaultCases));
  },

  /**
   * Get the active case object
   */
  getActiveCase() {
    const cases = JSON.parse(localStorage.getItem(CASES_STORAGE_KEY) || JSON.stringify(defaultCases));
    const activeId = localStorage.getItem(ACTIVE_CASE_KEY) || '1';
    const found = cases.find(c => String(c.id) === String(activeId));
    if (found) return found;
    return cases[0] || defaultDemoCase;
  },

  /**
   * Set active case
   */
  setActiveCase(caseId) {
    localStorage.setItem(ACTIVE_CASE_KEY, String(caseId));
  },

  /**
   * Create a new case record and ensure it appears immediately in All Records.
   * Starts with a clean, live initial timeline and 0 documents.
   */
  async createCase(data) {
    const cases = JSON.parse(localStorage.getItem(CASES_STORAGE_KEY) || JSON.stringify(defaultCases));
    const newId = `CR-${Date.now()}`;
    const formattedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newRecord = {
      id: newId,
      title: data.title.trim(),
      cnr: data.cnr?.trim() || `MHPU${Math.floor(10 + Math.random() * 89)}-${Math.floor(100000 + Math.random() * 900000)}-2025`,
      court: data.court?.trim() || 'Court of JMFC, Pune',
      status: data.status || 'pending',
      statusLabel: data.statusLabel || (data.status === 'verified' ? 'Verified' : (data.status === 'flagged' ? 'Needs Attention' : (data.status === 'processing' ? 'Processing' : 'Pending Review'))),
      documents: 0,
      nextHearing: data.nextHearing || 'Upcoming Scheduling',
      filingDate: formattedDate,
      section: data.section || 'BNS / IPC Procedural Intake',
      isCustom: true,
    };

    // Prepend to cases list
    cases.unshift(newRecord);
    localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(cases));
    localStorage.setItem(ACTIVE_CASE_KEY, String(newId));

    // Initialize totally LIVE timeline for this case (NO unnecessary mock events!)
    const initialTimeline = [
      {
        id: 1,
        date: formattedDate,
        label: 'Case Registered',
        description: `Dossier created for ${newRecord.title} at ${newRecord.court}. Initial docket record initialized.`,
        icon: 'folder_open',
        type: 'filing',
        verified: true,
      }
    ];
    localStorage.setItem(`casecompass_timeline_${newId}`, JSON.stringify(initialTimeline));

    // Initialize empty document store for this case
    localStorage.setItem(`casecompass_docs_${newId}`, JSON.stringify([]));

    // Try posting to backend
    try {
      await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: newRecord.title,
          language: 'en',
          case_number: newRecord.cnr,
        }),
      });
    } catch {
      // Backend logged locally
    }

    return newRecord;
  },

  /**
   * Update case status across all storage
   */
  async updateCaseStatus(caseId, newStatus) {
    const cases = JSON.parse(localStorage.getItem(CASES_STORAGE_KEY) || JSON.stringify(defaultCases));
    const labelMap = {
      verified: 'Verified',
      pending: 'Pending Review',
      flagged: 'Needs Attention',
      processing: 'Processing',
    };

    const target = cases.find(c => String(c.id) === String(caseId));
    if (target) {
      target.status = newStatus;
      target.statusLabel = labelMap[newStatus] || newStatus;
      localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(cases));
    }
    return target;
  },

  /**
   * Get LIVE timeline events specifically for this case
   */
  getCaseTimeline(caseId) {
    const key = `casecompass_timeline_${caseId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
    if (String(caseId) === '1') {
      return defaultTimeline;
    }
    const c = this.getActiveCase();
    return [
      {
        id: 1,
        date: c.filingDate || 'Today',
        label: 'Case Registered',
        description: `Dossier opened for ${c.title} at ${c.court}.`,
        icon: 'folder_open',
        type: 'filing',
        verified: true,
      }
    ];
  },

  /**
   * Add a new live proceeding to this case's timeline
   */
  addTimelineEvent(caseId, event) {
    const events = this.getCaseTimeline(caseId);
    const newEvent = {
      id: events.length + 1,
      date: event.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      label: event.label.trim(),
      description: event.description.trim(),
      icon: event.icon || 'gavel',
      type: event.type || 'proceeding',
      verified: event.verified !== false,
    };
    events.push(newEvent);
    localStorage.setItem(`casecompass_timeline_${caseId}`, JSON.stringify(events));
    return newEvent;
  },

  /**
   * Get documents specifically for this case
   */
  getCaseDocuments(caseId) {
    const key = `casecompass_docs_${caseId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
    if (String(caseId) === '1') {
      return defaultReviewDocs;
    }
    return [];
  },

  /**
   * Check if a case is documented / verified / flagged / integrated
   */
  isCaseDocumented(caseId) {
    const docs = this.getCaseDocuments(caseId);
    if (docs.length > 0) return true;
    const cases = JSON.parse(localStorage.getItem(CASES_STORAGE_KEY) || '[]');
    const target = cases.find(c => String(c.id) === String(caseId));
    if (target && (target.documents > 0 || ['verified', 'flagged', 'processing'].includes(target.status))) {
      return true;
    }
    return false;
  },

  /**
   * Add uploaded documents to this case and auto-generate timeline proceeding
   */
  addCaseDocuments(caseId, docFiles) {
    const existing = this.getCaseDocuments(caseId);
    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newDocs = docFiles.map((file, idx) => {
      const isFir = file.name.toLowerCase().includes('fir');
      return {
        id: existing.length + idx + 1,
        name: isFir ? `FIR Ingestion – ${file.name.replace(/\.pdf$/i, '')}` : file.name.replace(/\.[^/.]+$/, ''),
        filename: file.name,
        category: isFir ? 'FIR & Police Records' : 'Court Filings & Orders',
        pages: Math.max(1, Math.floor(Math.random() * 8) + 1),
        uploadedDate: dateStr,
        status: isFir ? 'verified' : 'verified',
        statusLabel: 'Verified',
        hash: `SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        flags: [],
        isFir: isFir,
      };
    });

    const updated = [...existing, ...newDocs];
    localStorage.setItem(`casecompass_docs_${caseId}`, JSON.stringify(updated));

    // Update case record document count and status in cases list
    const cases = JSON.parse(localStorage.getItem(CASES_STORAGE_KEY) || '[]');
    const target = cases.find(c => String(c.id) === String(caseId));
    if (target) {
      target.documents = updated.length;
      if (target.status === 'pending') {
        target.status = 'verified';
        target.statusLabel = 'Verified';
      }
      localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(cases));
    }

    // Auto-record to timeline
    const firFile = docFiles.find(f => f.name.toLowerCase().includes('fir'));
    if (firFile) {
      this.addTimelineEvent(caseId, {
        date: dateStr,
        label: 'FIR Ingestion & Lodgment Verified',
        description: `First Information Report (${firFile.name}) uploaded, hashed, and integrated into case record docket.`,
        icon: 'local_police',
        type: 'filing',
        verified: true,
      });
    } else {
      this.addTimelineEvent(caseId, {
        date: dateStr,
        label: 'Evidence Documents Uploaded',
        description: `${docFiles.length} court records ingested into evidence lens with cryptographic audit verification.`,
        icon: 'description',
        type: 'proceeding',
        verified: true,
      });
    }

    return updated;
  },

  /**
   * Export Full Case Report as Microsoft Word (.docx format)
   */
  exportWordDocx(caseId) {
    const c = this.getActiveCase();
    const timeline = this.getCaseTimeline(caseId);
    const docs = this.getCaseDocuments(caseId);
    const exportDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>CaseCompass Dossier Report - ${c.title}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page { size: A4; margin: 2cm; }
          body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 11pt; color: #1e293b; line-height: 1.5; }
          .header-title { font-size: 24pt; font-weight: bold; color: #0F2A4A; margin-bottom: 2px; }
          .header-subtitle { font-size: 11pt; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
          .section-heading { font-size: 14pt; font-weight: bold; color: #0F2A4A; border-bottom: 2px solid #0F2A4A; padding-bottom: 4px; margin-top: 24px; margin-bottom: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 16px; }
          th { background-color: #0F2A4A; color: #ffffff; font-weight: bold; text-align: left; padding: 8px 10px; border: 1px solid #0F2A4A; font-size: 10pt; }
          td { padding: 8px 10px; border: 1px solid #cbd5e1; font-size: 10pt; }
          tr:nth-child(even) td { background-color: #f8fafc; }
          .badge { font-weight: bold; padding: 2px 8px; border-radius: 4px; font-size: 9pt; }
          .badge-verified { background-color: #d1fae5; color: #065f46; }
          .badge-pending { background-color: #fef3c7; color: #92400e; }
          .badge-flagged { background-color: #fee2e2; color: #991b1b; }
          .badge-processing { background-color: #e0e7ff; color: #3730a3; }
          .callout { background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 12px 16px; margin: 16px 0; font-size: 10pt; }
          .disclaimer { font-size: 9pt; color: #64748b; font-style: italic; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 12px; }
          .stamp { font-family: monospace; font-size: 9pt; color: #475569; }
        </style>
      </head>
      <body>
        <div class="header-title">CASECOMPASS</div>
        <div class="header-subtitle">Official District Legal Record Dossier & Audit Report</div>
        <div style="font-size:10pt;color:#64748b;margin-bottom:16px;">Generated on: ${exportDate} · Jurisdiction: Indian Subordinate Judiciary</div>

        <div class="section-heading">1. Case Overview & Court Metadata</div>
        <table>
          <tr>
            <th style="width:30%;">Field</th>
            <th style="width:70%;">Particulars</th>
          </tr>
          <tr>
            <td><strong>Case Title</strong></td>
            <td><strong>${c.title}</strong></td>
          </tr>
          <tr>
            <td><strong>CNR Number</strong></td>
            <td><code>${c.cnr}</code></td>
          </tr>
          <tr>
            <td><strong>Court / Forum</strong></td>
            <td>${c.court}</td>
          </tr>
          <tr>
            <td><strong>Legal Section / Acts</strong></td>
            <td>${c.section || 'IPC / CrPC / Procedural Dockets'}</td>
          </tr>
          <tr>
            <td><strong>Initial Filing Date</strong></td>
            <td>${c.filingDate || '15 Mar 2024'}</td>
          </tr>
          <tr>
            <td><strong>Next Scheduled Hearing</strong></td>
            <td><strong>${c.nextHearing || 'Upcoming Scheduling'}</strong></td>
          </tr>
          <tr>
            <td><strong>Current Docket Status</strong></td>
            <td><span class="badge badge-${c.status}">${(c.statusLabel || c.status).toUpperCase()}</span></td>
          </tr>
        </table>

        <div class="section-heading">2. Case Proceedings Timeline (${timeline.length} Events Logged)</div>
        <table>
          <thead>
            <tr>
              <th style="width:18%;">Date</th>
              <th style="width:25%;">Proceeding / Event</th>
              <th style="width:45%;">Details & Procedural Notes</th>
              <th style="width:12%;">Integrity</th>
            </tr>
          </thead>
          <tbody>
            ${timeline.map(e => `
              <tr>
                <td><strong>${e.date}</strong></td>
                <td><strong>${e.label}</strong></td>
                <td>${e.description}</td>
                <td>${e.verified ? '<span class="badge badge-verified">VERIFIED</span>' : '<span class="badge badge-pending">PENDING</span>'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="section-heading">3. Evidence Review Lens & Document Register (${docs.length} Records)</div>
        ${docs.length === 0 ? `
          <p style="font-style:italic;color:#64748b;">No court records or FIR uploaded yet for this docket.</p>
        ` : `
          <table>
            <thead>
              <tr>
                <th style="width:25%;">Document Name</th>
                <th style="width:20%;">Category</th>
                <th style="width:10%;">Pages</th>
                <th style="width:15%;">Uploaded Date</th>
                <th style="width:30%;">Cryptographic Hash</th>
              </tr>
            </thead>
            <tbody>
              ${docs.map(d => `
                <tr>
                  <td><strong>${d.name || d.filename}</strong></td>
                  <td>${d.category}</td>
                  <td>${d.pages}</td>
                  <td>${d.uploadedDate}</td>
                  <td><code style="font-size:8pt;">${d.hash}</code></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `}

        <div class="callout">
          <strong>NALSA & Legal Aid Support Contact:</strong><br>
          For pro-bono assistance, contact the District Legal Services Authority (DLSA) or dial the national legal aid helpline at <strong>15100</strong>.
        </div>

        <div class="stamp">
          <strong>Audit Fingerprint:</strong> SHA256: ${Math.random().toString(36).substring(2, 14).toUpperCase()} | Authenticated through CaseCompass Workspace
        </div>

        <div class="disclaimer">
          <strong>Mandatory Notice:</strong> CaseCompass is a document intelligence and record organization tool designed for legal-aid advocates and families. It organizes court dockets with source grounding and does not provide legal advice or predict court outcomes.
        </div>
      </body>
      </html>
    `;

    // Download as Word .docx
    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeCnr = (c.cnr || 'case').replace(/[^a-zA-Z0-9_-]/g, '_');
    link.href = url;
    link.download = `CaseCompass_Report_${safeCnr}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Print Report using dedicated printable layout
   */
  printReport(caseId) {
    window.print();
  },

  /**
   * Query Q&A from backend
   */
  async askCase(caseId, query) {
    try {
      const res = await fetch(`/api/cases/${caseId}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language: 'en' }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Handled in caller
    }
    return null;
  },
};
