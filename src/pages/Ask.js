/**
 * CaseCompass — 5. Ask Page
 * Matches Stitch screen: "CaseCompass — Ask Case Questions"
 */

import { demoCase, askConversation } from '../data/demoData.js';

export function renderAskPage() {
  return `
    <div class="page-content animate-fade-in" style="max-width: 900px;">
      <!-- Breadcrumb & Header -->
      <div style="margin-bottom: var(--space-lg);">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: var(--on-surface-variant); margin-bottom: 6px;">
          <span>Cases</span>
          <span class="material-symbols-outlined" style="font-size: 14px;">chevron_right</span>
          <span style="font-weight: 600; color: var(--primary);">${demoCase.title}</span>
          <span class="badge badge--verified" style="margin-left: 8px;">Docket Verified</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: var(--space-md);">
          <div>
            <h1 class="page-heading" style="font-size: 1.875rem;">Ask CaseCompass</h1>
            <p style="font-size: 0.875rem; color: var(--on-surface-variant); margin-top: 4px;">
              Query court records, witness depositions, orders, and filings with source citations.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn--secondary btn--sm" id="btn-export-chat">
              <span class="material-symbols-outlined" style="font-size: 16px;">download</span>
              Export Q&A
            </button>
            <button class="btn btn--secondary btn--sm" id="btn-clear-chat">
              <span class="material-symbols-outlined" style="font-size: 16px;">refresh</span>
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Verified Grounding Banner -->
      <div class="card" style="padding: 14px 18px; margin-bottom: var(--space-lg); background: var(--surface-container-low); border-left: 4px solid var(--primary); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="color: var(--primary); font-size: 24px;">verified</span>
          <div>
            <div style="font-size: 0.875rem; font-weight: 700; color: var(--primary);">Docket Grounding Active</div>
            <div style="font-size: 0.75rem; color: var(--on-surface-variant);">
              Responses strictly bound to 12 verified case documents. Hallucinations prohibited.
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 6px;">
          <span class="badge badge--neutral">12 Documents Indexed</span>
          <span class="badge badge--verified">Strict Citation Mode</span>
        </div>
      </div>

      <!-- Quick Suggested Prompts -->
      <div style="margin-bottom: var(--space-md);">
        <div class="section-title">Suggested Inquiries</div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;" id="suggested-prompts-container">
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="What charges have been framed in this case?">
            <span class="material-symbols-outlined" style="font-size: 14px;">help_outline</span>
            What charges are framed?
          </button>
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="List all prosecution witnesses and their examination status.">
            <span class="material-symbols-outlined" style="font-size: 14px;">groups</span>
            Witness examination status
          </button>
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="Are there any date or metadata discrepancies flagged in the record?">
            <span class="material-symbols-outlined" style="font-size: 14px;">warning</span>
            Any document discrepancies?
          </button>
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="When is the next scheduled hearing and what is its purpose?">
            <span class="material-symbols-outlined" style="font-size: 14px;">calendar_today</span>
            Next hearing details
          </button>
        </div>
      </div>

      <!-- Chat Stream Container -->
      <div class="card" style="padding: 0; display: flex; flex-direction: column; min-height: 440px; box-shadow: var(--shadow-sm); overflow: hidden; margin-bottom: var(--space-lg);">
        <div id="chat-messages" style="flex: 1; padding: var(--space-lg); display: flex; flex-direction: column; gap: var(--space-lg); overflow-y: auto; max-height: 520px; background: var(--surface-container-lowest);">
          ${askConversation.map(msg => `
            <div style="display: flex; gap: 14px; align-items: flex-start; ${msg.role === 'user' ? 'justify-content: flex-end;' : ''}">
              ${msg.role === 'assistant' ? `
                <div style="width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--primary); display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; box-shadow: var(--shadow-sm);">
                  <span class="material-symbols-outlined" style="font-size: 20px;">balance</span>
                </div>
              ` : ''}

              <div style="max-width: ${msg.role === 'user' ? '75%' : '85%'};">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; ${msg.role === 'user' ? 'justify-content: flex-end;' : ''}">
                  <span style="font-size: 0.75rem; font-weight: 700; color: var(--on-surface-variant);">
                    ${msg.role === 'user' ? 'You' : 'CaseCompass Intelligence'}
                  </span>
                  <span style="font-size: 0.6875rem; color: var(--outline);">${msg.time}</span>
                </div>

                <div style="
                  padding: 14px 18px;
                  border-radius: var(--radius-lg);
                  font-size: 0.9375rem;
                  line-height: 1.6;
                  ${msg.role === 'user'
                    ? 'background: var(--primary); color: #ffffff; border-bottom-right-radius: 4px;'
                    : 'background: var(--surface-container-low); color: var(--on-surface); border: 1px solid var(--outline-variant); border-bottom-left-radius: 4px;'
                  }
                ">
                  <div style="white-space: pre-wrap;">${msg.text}</div>

                  ${msg.sources && msg.sources.length ? `
                    <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(15, 42, 74, 0.12);">
                      <div style="font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--secondary); margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                        <span class="material-symbols-outlined" style="font-size: 14px;">menu_book</span>
                        Verified Sources (${msg.sources.length})
                      </div>
                      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                        ${msg.sources.map(src => `
                          <span style="display: inline-flex; align-items: center; gap: 4px; background: var(--surface-container-lowest); border: 1px solid var(--outline-variant); padding: 3px 8px; border-radius: var(--radius-sm); font-size: 0.75rem; color: var(--primary); font-family: var(--font-code);">
                            <span class="material-symbols-outlined" style="font-size: 13px;">description</span>
                            ${src}
                          </span>
                        `).join('')}
                      </div>
                    </div>
                  ` : ''}
                </div>
              </div>

              ${msg.role === 'user' ? `
                <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--secondary-container); display: flex; align-items: center; justify-content: center; color: var(--on-secondary-container); flex-shrink: 0; font-weight: 700; font-size: 0.875rem;">
                  M
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>

        <!-- Chat Input Form -->
        <div style="padding: var(--space-md) var(--space-lg); background: var(--surface-container-lowest); border-top: 1px solid var(--outline-variant);">
          <form id="ask-form" style="display: flex; gap: 10px; align-items: flex-end;">
            <div style="flex: 1; position: relative;">
              <textarea
                id="ask-input"
                placeholder="Ask about charges, witness statements, citations, or hearing dates..."
                rows="2"
                style="width: 100%; resize: none; padding: 10px 14px; font-size: 0.9375rem; border-radius: var(--radius-md); border: 1px solid var(--outline-variant); background: var(--surface-container-lowest); color: var(--on-surface); line-height: 1.4;"
              ></textarea>
            </div>
            <button type="submit" class="btn btn--primary" style="height: 44px; padding: 0 20px;">
              <span class="material-symbols-outlined" style="font-size: 18px;">send</span>
              <span>Ask</span>
            </button>
          </form>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 0.6875rem; color: var(--outline);">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>Audited AI response grounded in CaseCompass docket</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initAskPage() {
  const form = document.getElementById('ask-form');
  const input = document.getElementById('ask-input');
  const messages = document.getElementById('chat-messages');
  const suggestedBtns = document.querySelectorAll('.suggested-prompt-btn');

  function addMessage(role, text, sources = []) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgEl = document.createElement('div');
    msgEl.style.cssText = `display: flex; gap: 14px; align-items: flex-start; ${role === 'user' ? 'justify-content: flex-end;' : ''}`;

    msgEl.innerHTML = `
      ${role === 'assistant' ? `
        <div style="width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--primary); display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; box-shadow: var(--shadow-sm);">
          <span class="material-symbols-outlined" style="font-size: 20px;">balance</span>
        </div>
      ` : ''}

      <div style="max-width: ${role === 'user' ? '75%' : '85%'};">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; ${role === 'user' ? 'justify-content: flex-end;' : ''}">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--on-surface-variant);">
            ${role === 'user' ? 'You' : 'CaseCompass Intelligence'}
          </span>
          <span style="font-size: 0.6875rem; color: var(--outline);">${time}</span>
        </div>

        <div style="
          padding: 14px 18px;
          border-radius: var(--radius-lg);
          font-size: 0.9375rem;
          line-height: 1.6;
          ${role === 'user'
            ? 'background: var(--primary); color: #ffffff; border-bottom-right-radius: 4px;'
            : 'background: var(--surface-container-low); color: var(--on-surface); border: 1px solid var(--outline-variant); border-bottom-left-radius: 4px;'
          }
        ">
          <div style="white-space: pre-wrap;">${text}</div>

          ${sources && sources.length ? `
            <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(15, 42, 74, 0.12);">
              <div style="font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--secondary); margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                <span class="material-symbols-outlined" style="font-size: 14px;">menu_book</span>
                Verified Sources (${sources.length})
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${sources.map(src => `
                  <span style="display: inline-flex; align-items: center; gap: 4px; background: var(--surface-container-lowest); border: 1px solid var(--outline-variant); padding: 3px 8px; border-radius: var(--radius-sm); font-size: 0.75rem; color: var(--primary); font-family: var(--font-code);">
                    <span class="material-symbols-outlined" style="font-size: 13px;">description</span>
                    ${src}
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      ${role === 'user' ? `
        <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--secondary-container); display: flex; align-items: center; justify-content: center; color: var(--on-secondary-container); flex-shrink: 0; font-weight: 700; font-size: 0.875rem;">
          M
        </div>
      ` : ''}
    `;

    messages.appendChild(msgEl);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleSend(query) {
    if (!query || !query.trim()) return;
    const q = query.trim();
    addMessage('user', q);
    if (input) input.value = '';

    // Simulate intelligent grounded response
    setTimeout(() => {
      let respText = '';
      let sources = [];

      const lower = q.toLowerCase();
      if (lower.includes('hearing') || lower.includes('when') || lower.includes('date')) {
        respText = `The next scheduled hearing for this matter is on **14 February 2025** before JMFC Pune Court Room 4. The listed purpose is **Cross-Examination of PW-3** (Bank Manager).`;
        sources = ['Chargesheet_Final.pdf (pg 28)', 'Court_Order_Charges.pdf'];
      } else if (lower.includes('witness') || lower.includes('pw')) {
        respText = `According to the witness list in the chargesheet, 4 witnesses are cited:\n• **PW-1**: Shri Vijay Patil (Complainant) — examined on 14 Aug 2024\n• **PW-2**: PSI Ashok Jadhav (IO) — cross-examined on 10 Nov 2024\n• **PW-3**: Bank Manager — scheduled for 14 Feb 2025\n• **PW-4**: Forensic Document Examiner — pending summons.`;
        sources = ['Chargesheet_Final.pdf (pg 12-14)', 'PW1_Statement_Patil.pdf'];
      } else if (lower.includes('discrepanc') || lower.includes('flag') || lower.includes('issue')) {
        respText = `An integrity flag has been recorded for **PW1_Statement_Patil.pdf**:\n• Date mismatch between header block (14 Aug 2024) and signatory date (16 Aug 2024) on page 6.\n• File metadata timestamp predates official filing registry by 48 hours.`;
        sources = ['PW1_Statement_Patil.pdf (pg 3, 6)', 'Audit_Record_VER-9042'];
      } else {
        respText = `Verified docket analysis for "${q}":\nUnder IPC §420 and §468, proceedings are actively in the prosecution evidence stage. All cited exhibits have been cryptographically verified against the court registry docket.`;
        sources = ['Court_Order_Charges.pdf', 'Chargesheet_Final.pdf'];
      }

      addMessage('assistant', respText, sources);
    }, 600);
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSend(input?.value);
  });

  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input.value);
    }
  });

  suggestedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-query');
      handleSend(q);
    });
  });

  document.getElementById('btn-clear-chat')?.addEventListener('click', () => {
    if (confirm('Reset conversation history?')) {
      messages.innerHTML = '';
      addMessage('assistant', 'Conversation reset. What would you like to verify from the court docket?', ['Docket_Index.pdf']);
    }
  });

  document.getElementById('btn-export-chat')?.addEventListener('click', () => {
    alert('Exporting verified Q&A transcript with cryptographic docket stamps...');
  });
}
