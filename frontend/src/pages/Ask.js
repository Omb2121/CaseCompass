/**
 * CaseCompass — 5. Ask Page
 * Intelligent Legal Case Q&A with Multilingual Voice Assistant (English, Hindi, Marathi)
 * Text input -> Text response
 * Microphone input -> Voice assistant spoken response
 */

import { askConversation } from '../data/demoData.js';
import { api } from '../api.js';

export function renderAskPage() {
  const activeCase = api.getActiveCase();
  const docs = api.getCaseDocuments(activeCase.id);
  const docCount = docs.length > 0 ? docs.length : 12;

  return `
    <div class="page-content animate-fade-in" style="max-width: 920px;">
      <!-- Breadcrumb & Header -->
      <div style="margin-bottom: var(--space-lg);">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: var(--on-surface-variant); margin-bottom: 6px;">
          <a href="#/cases" style="color: inherit; text-decoration: none;">Cases</a>
          <span class="material-symbols-outlined" style="font-size: 14px;">chevron_right</span>
          <span style="font-weight: 600; color: var(--primary);">${activeCase.title}</span>
          <span class="badge badge--verified" style="margin-left: 8px;">Docket Verified</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: var(--space-md);">
          <div>
            <h1 class="page-heading" style="font-size: 1.875rem;">Ask CaseCompass</h1>
            <p style="font-size: 0.875rem; color: var(--on-surface-variant); margin-top: 4px;">
              AI Legal Case Assistant — Query court records, filings, orders, and sections in <strong>English, हिन्दी, and मराठी</strong>.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn--secondary btn--sm" id="btn-export-chat" title="Download Q&A transcript">
              <span class="material-symbols-outlined" style="font-size: 16px;">download</span>
              Export Q&A
            </button>
            <button class="btn btn--secondary btn--sm" id="btn-clear-chat" title="Reset conversation">
              <span class="material-symbols-outlined" style="font-size: 16px;">refresh</span>
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Verified Grounding Banner & Language Selector -->
      <div class="card" style="padding: 14px 18px; margin-bottom: var(--space-md); background: var(--surface-container-low); border-left: 4px solid var(--primary); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="color: var(--primary); font-size: 26px;">verified</span>
          <div>
            <div style="font-size: 0.875rem; font-weight: 700; color: var(--primary);">Active Case Intelligence & Audio Assistant</div>
            <div style="font-size: 0.75rem; color: var(--on-surface-variant);">
              CNR: <code>${activeCase.cnr}</code> | ${docCount} Verified Records Indexed | No Language Barrier
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <span class="badge badge--neutral">${docCount} Documents</span>
          <span class="badge badge--verified">Voice + Text Active</span>
        </div>
      </div>

      <!-- Language Selector Bar -->
      <div class="card-flat" style="padding: 10px 16px; margin-bottom: var(--space-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; background: var(--surface-container-lowest); border: 1px solid var(--outline-variant);">
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <span class="material-symbols-outlined" style="font-size: 18px; color: var(--primary);">translate</span>
          <span style="font-size: 0.8125rem; font-weight: 700; color: var(--on-surface);">Response Language / भाषा निवडा:</span>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;" id="ask-language-selector">
            <button type="button" class="btn btn--sm btn--primary ask-lang-pill" data-lang="auto" style="border-radius: 9999px; font-size: 0.75rem; padding: 3px 12px;">
              🌐 Auto-Detect
            </button>
            <button type="button" class="btn btn--sm btn--secondary ask-lang-pill" data-lang="en" style="border-radius: 9999px; font-size: 0.75rem; padding: 3px 12px;">
              🇬🇧 English
            </button>
            <button type="button" class="btn btn--sm btn--secondary ask-lang-pill" data-lang="hi" style="border-radius: 9999px; font-size: 0.75rem; padding: 3px 12px;">
              🇮🇳 हिन्दी (Hindi)
            </button>
            <button type="button" class="btn btn--sm btn--secondary ask-lang-pill" data-lang="mr" style="border-radius: 9999px; font-size: 0.75rem; padding: 3px 12px;">
              🚩 मराठी (Marathi)
            </button>
          </div>
        </div>
        <div id="audio-playback-status" style="display: none; align-items: center; gap: 8px; font-size: 0.75rem; color: #1e3a8a; background: #dbeafe; padding: 4px 12px; border-radius: 9999px; border: 1px solid #bfdbfe;">
          <span class="material-symbols-outlined" style="font-size: 16px; color: #2563eb;">volume_up</span>
          <span id="audio-playback-text" style="font-weight: 600;">Voice Assistant Speaking...</span>
          <button type="button" id="btn-stop-audio" style="border: none; background: #fee2e2; color: #b91c1c; font-weight: 700; cursor: pointer; font-size: 0.6875rem; padding: 2px 8px; border-radius: 4px; margin-left: 4px;" title="Stop Voice">
            ⏹ Stop Audio
          </button>
        </div>
      </div>

      <!-- Quick Suggested Prompts (Trilingual) -->
      <div style="margin-bottom: var(--space-md);">
        <div class="section-title" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <span>Suggested Inquiries / सुचवलेले प्रश्न</span>
          <span style="font-size: 0.75rem; color: var(--on-surface-variant); font-weight: normal;">Click to ask instantly</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;" id="suggested-prompts-container">
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="When is the next scheduled hearing and what is its purpose?">
            <span class="material-symbols-outlined" style="font-size: 14px;">calendar_today</span>
            Next hearing date? (पुढील सुनावणी)
          </button>
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="या प्रकरणात कोणते गुन्हे किंवा कलमे दाखल आहेत?">
            <span class="material-symbols-outlined" style="font-size: 14px;">gavel</span>
            कोणते गुन्हे / कलमे दाखल आहेत?
          </button>
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="गवाहों की सूची और उनकी स्थिति क्या है?">
            <span class="material-symbols-outlined" style="font-size: 14px;">groups</span>
            गवाहों की स्थिति (Witness status)
          </button>
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="या खटल्यातील जामीन (Bail) संबंधी सद्यस्थिती आणि अटी काय आहेत?">
            <span class="material-symbols-outlined" style="font-size: 14px;">verified_user</span>
            जामीन अटी व स्थिती (Bail Status)
          </button>
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="Are there any date or metadata discrepancies flagged in the record?">
            <span class="material-symbols-outlined" style="font-size: 14px;">warning</span>
            कागदपत्रांमधील त्रुटी? (Discrepancies)
          </button>
          <button class="btn btn--secondary btn--sm suggested-prompt-btn" data-query="या खटल्याचा थोडक्यात संपूर्ण सारांश सांगा.">
            <span class="material-symbols-outlined" style="font-size: 14px;">summarize</span>
            खटल्याचा सारांश (Case Summary)
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

        <!-- Voice Listening Live Banner -->
        <div id="voice-recording-banner" style="display: none; align-items: center; justify-content: space-between; padding: 10px 18px; background: #fef2f2; border-top: 1px solid #fecaca; color: #991b1b; font-size: 0.875rem;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: #dc2626; animation: pulse 1s infinite;"></div>
            <span class="material-symbols-outlined" style="font-size: 20px; color: #dc2626;">mic</span>
            <span id="voice-recording-text" style="font-weight: 600;">Listening... Speak in English, हिन्दी, or मराठी</span>
          </div>
          <button type="button" id="btn-cancel-recording" class="btn btn--sm" style="background: #dc2626; color: #ffffff; border: none; padding: 4px 12px; border-radius: 6px; font-size: 0.75rem; cursor: pointer;">
            Done / Submit
          </button>
        </div>

        <!-- Chat Input Form -->
        <div style="padding: var(--space-md) var(--space-lg); background: var(--surface-container-lowest); border-top: 1px solid var(--outline-variant);">
          <form id="ask-form" style="display: flex; gap: 10px; align-items: flex-end;">
            <!-- Voice Microphone Button -->
            <button type="button" id="btn-voice-mic" title="Click to speak using Voice Assistant (English, हिन्दी, मराठी)"
                    style="width: 44px; height: 44px; border-radius: var(--radius-md); border: 1px solid var(--outline-variant); background: var(--surface-container-low); color: var(--primary); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; flex-shrink: 0;">
              <span class="material-symbols-outlined" id="mic-icon" style="font-size: 22px;">mic</span>
            </button>

            <!-- Text Query Input -->
            <div style="flex: 1; position: relative;">
              <textarea
                id="ask-input"
                placeholder="Type your question or click the microphone to speak in English, हिन्दी, or मराठी..."
                rows="2"
                style="width: 100%; resize: none; padding: 10px 14px; font-size: 0.9375rem; border-radius: var(--radius-md); border: 1px solid var(--outline-variant); background: var(--surface-container-lowest); color: var(--on-surface); line-height: 1.4;"
              ></textarea>
            </div>

            <!-- Submit Button (Text Mode) -->
            <button type="submit" id="btn-send-text" class="btn btn--primary" style="height: 44px; padding: 0 20px; display: flex; align-items: center; gap: 6px;">
              <span class="material-symbols-outlined" style="font-size: 18px;">send</span>
              <span>Ask</span>
            </button>
          </form>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 0.6875rem; color: var(--outline); flex-wrap: wrap; gap: 6px;">
            <span>Keyboard typing = Text response | 🎙️ Microphone = Voice spoken response</span>
            <span>English • हिन्दी • मराठी Language Freedom</span>
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
  const micBtn = document.getElementById('btn-voice-mic');
  const micIcon = document.getElementById('mic-icon');
  const voiceBanner = document.getElementById('voice-recording-banner');
  const voiceBannerText = document.getElementById('voice-recording-text');
  const cancelRecBtn = document.getElementById('btn-cancel-recording');
  const audioPlaybackStatus = document.getElementById('audio-playback-status');
  const audioPlaybackText = document.getElementById('audio-playback-text');
  const stopAudioBtn = document.getElementById('btn-stop-audio');
  const suggestedBtns = document.querySelectorAll('.suggested-prompt-btn');

  let selectedLanguage = 'auto'; // 'auto' | 'en' | 'hi' | 'mr'
  let isListening = false;
  let recognition = null;
  let queryOriginIsVoice = false;

  // 1. Language selector pill handling
  document.querySelectorAll('.ask-lang-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ask-lang-pill').forEach(b => {
        b.classList.remove('btn--primary');
        b.classList.add('btn--secondary');
      });
      btn.classList.remove('btn--secondary');
      btn.classList.add('btn--primary');
      selectedLanguage = btn.getAttribute('data-lang') || 'auto';

      // Update placeholder
      if (input) {
        if (selectedLanguage === 'mr') {
          input.placeholder = 'तुमचा प्रश्न टाइप करा किंवा मराठीत बोलण्यासाठी मायक्रोफोनवर क्लिक करा...';
        } else if (selectedLanguage === 'hi') {
          input.placeholder = 'अपना प्रश्न टाइप करें या हिन्दी में बोलने के लिए माइक्रोफ़ोन पर क्लिक करें...';
        } else if (selectedLanguage === 'en') {
          input.placeholder = 'Type your question or click the microphone to speak in English...';
        } else {
          input.placeholder = 'Type your question or click the microphone to speak in English, हिन्दी, or मराठी...';
        }
      }
    });
  });

  // 2. Text-to-Speech (Audio Voice Assistant)
  function stopSpeaking() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (audioPlaybackStatus) audioPlaybackStatus.style.display = 'none';
  }

  stopAudioBtn?.addEventListener('click', stopSpeaking);

  function speakResponse(text, lang) {
    if (!window.speechSynthesis) return;
    stopSpeaking();

    // Clean markdown for spoken audio
    const clean = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,6}\s+/g, '')
      .replace(/•/g, '')
      .replace(/>/g, '')
      .replace(/`/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .trim();

    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);

    let voiceLangCode = 'en-IN';
    let langLabel = 'English';
    if (lang === 'mr') {
      voiceLangCode = 'mr-IN';
      langLabel = 'मराठी';
    } else if (lang === 'hi') {
      voiceLangCode = 'hi-IN';
      langLabel = 'हिन्दी';
    }
    utterance.lang = voiceLangCode;

    // Match browser TTS voice
    const voices = window.speechSynthesis.getVoices();
    let matchedVoice = voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(voiceLangCode.toLowerCase()));
    if (!matchedVoice && lang === 'mr') {
      // Fallback for devices without native mr-IN voice: use hi-IN voice (reads Devanagari naturally)
      matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith('hi'));
    }
    if (!matchedVoice && lang === 'en') {
      matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith('en'));
    }
    if (matchedVoice) utterance.voice = matchedVoice;
    utterance.rate = 0.95;

    if (audioPlaybackStatus && audioPlaybackText) {
      audioPlaybackText.textContent = `Speaking in ${langLabel}...`;
      audioPlaybackStatus.style.display = 'flex';
    }

    utterance.onend = () => {
      if (audioPlaybackStatus) audioPlaybackStatus.style.display = 'none';
    };
    utterance.onerror = () => {
      if (audioPlaybackStatus) audioPlaybackStatus.style.display = 'none';
    };

    window.speechSynthesis.speak(utterance);
  }

  // Pre-load voices for prompt readiness
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }

  // 3. Speech Recognition (Speech-to-Text Microphone)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  function stopListening() {
    isListening = false;
    if (recognition) {
      try { recognition.stop(); } catch {}
    }
    if (micBtn) {
      micBtn.style.background = 'var(--surface-container-low)';
      micBtn.style.borderColor = 'var(--outline-variant)';
      micBtn.style.color = 'var(--primary)';
    }
    if (micIcon) micIcon.textContent = 'mic';
    if (voiceBanner) voiceBanner.style.display = 'none';
  }

  function startListening() {
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your browser. Please use Google Chrome, Edge, or Safari, or type your question in the text box.');
      return;
    }

    stopSpeaking();

    try {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      // Set recognition language
      if (selectedLanguage === 'mr') {
        recognition.lang = 'mr-IN';
      } else if (selectedLanguage === 'hi') {
        recognition.lang = 'hi-IN';
      } else if (selectedLanguage === 'en') {
        recognition.lang = 'en-IN';
      } else {
        // Auto: defaults to Indian English / Hindi multilingual
        recognition.lang = 'hi-IN';
      }

      recognition.onstart = () => {
        isListening = true;
        if (micBtn) {
          micBtn.style.background = '#fee2e2';
          micBtn.style.borderColor = '#dc2626';
          micBtn.style.color = '#dc2626';
        }
        if (micIcon) micIcon.textContent = 'mic';
        if (voiceBanner) {
          const langDisplay = selectedLanguage === 'mr' ? 'मराठी' : (selectedLanguage === 'hi' ? 'हिन्दी' : (selectedLanguage === 'en' ? 'English' : 'English / हिन्दी / मराठी'));
          if (voiceBannerText) voiceBannerText.textContent = `Listening in ${langDisplay}... Speak your case question now`;
          voiceBanner.style.display = 'flex';
        }
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (input && transcript) {
          input.value = transcript;
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition status:', event.error);
        stopListening();
      };

      recognition.onend = () => {
        stopListening();
        const spokenText = input?.value || '';
        if (spokenText.trim()) {
          // Submitted via voice assistant -> must respond in voice!
          queryOriginIsVoice = true;
          handleSend(spokenText, true);
        }
      };

      recognition.start();
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      stopListening();
    }
  }

  micBtn?.addEventListener('click', () => {
    if (isListening) {
      stopListening();
      const val = input?.value || '';
      if (val.trim()) {
        queryOriginIsVoice = true;
        handleSend(val, true);
      }
    } else {
      startListening();
    }
  });

  cancelRecBtn?.addEventListener('click', () => {
    stopListening();
    const val = input?.value || '';
    if (val.trim()) {
      queryOriginIsVoice = true;
      handleSend(val, true);
    }
  });

  // 4. Message Bubble Renderer
  function addMessage(role, text, sources = [], isVoiceResponse = false, resLang = 'en') {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgEl = document.createElement('div');
    msgEl.style.cssText = `display: flex; gap: 14px; align-items: flex-start; ${role === 'user' ? 'justify-content: flex-end;' : ''}`;

    const safeEscapedText = encodeURIComponent(text);

    msgEl.innerHTML = `
      ${role === 'assistant' ? `
        <div style="width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--primary); display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; box-shadow: var(--shadow-sm);">
          <span class="material-symbols-outlined" style="font-size: 20px;">balance</span>
        </div>
      ` : ''}

      <div style="max-width: ${role === 'user' ? '75%' : '85%'};">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; ${role === 'user' ? 'justify-content: flex-end;' : ''}">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--on-surface-variant);">
            ${role === 'user' ? (queryOriginIsVoice ? 'You (Voice Query)' : 'You') : 'CaseCompass Intelligence'}
          </span>
          <span style="font-size: 0.6875rem; color: var(--outline);">${time}</span>
          ${role === 'assistant' && isVoiceResponse ? `
            <span class="badge" style="background:#dbeafe;color:#1e40af;font-size:0.6875rem;padding:1px 6px;">
              🎙️ Voice Assistant Audio
            </span>
          ` : ''}
          ${role === 'assistant' ? `
            <button class="btn-listen-msg" data-text="${safeEscapedText}" data-lang="${resLang}" title="Listen to this response"
                    style="border:none;background:none;cursor:pointer;color:var(--primary);padding:0 2px;display:flex;align-items:center;">
              <span class="material-symbols-outlined" style="font-size:16px;">volume_up</span>
            </button>
          ` : ''}
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
        <div style="width: 36px; height: 36px; border-radius: 50%; background: ${queryOriginIsVoice ? '#ef4444' : 'var(--secondary-container)'}; display: flex; align-items: center; justify-content: center; color: #ffffff; flex-shrink: 0; font-weight: 700; font-size: 0.875rem;">
          <span class="material-symbols-outlined" style="font-size: 20px;">${queryOriginIsVoice ? 'mic' : 'person'}</span>
        </div>
      ` : ''}
    `;

    messages.appendChild(msgEl);
    messages.scrollTop = messages.scrollHeight;

    // Attach listen button listener
    msgEl.querySelector('.btn-listen-msg')?.addEventListener('click', (e) => {
      const targetBtn = e.currentTarget;
      const rawText = decodeURIComponent(targetBtn.getAttribute('data-text') || '');
      const voiceLang = targetBtn.getAttribute('data-lang') || 'en';
      speakResponse(rawText, voiceLang);
    });
  }

  // 5. Query Processing Pipeline
  async function handleSend(query, isVoiceMode = false) {
    if (!query || !query.trim()) return;
    const q = query.trim();

    queryOriginIsVoice = isVoiceMode;
    addMessage('user', q, [], isVoiceMode);

    if (input) input.value = '';

    const activeCase = api.getActiveCase();

    // Show temporary thinking state
    const thinkingEl = document.createElement('div');
    thinkingEl.id = 'thinking-indicator';
    thinkingEl.style.cssText = 'display: flex; gap: 10px; align-items: center; font-size: 0.8125rem; color: var(--on-surface-variant); padding: 6px 12px;';
    thinkingEl.innerHTML = `
      <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--primary); animation: pulse 0.8s infinite;"></div>
      <span>Analyzing court records, timeline, and legal sections...</span>
    `;
    messages.appendChild(thinkingEl);
    messages.scrollTop = messages.scrollHeight;

    // Deep Case & Legal Query Analysis Engine
    const analysis = api.analyzeCaseQuestion(activeCase.id, q, selectedLanguage);

    // Call backend in background to keep audit logs
    api.askCase(activeCase.id, q, analysis.language).catch(() => {});

    setTimeout(() => {
      thinkingEl.remove();

      addMessage('assistant', analysis.answer, analysis.citations, isVoiceMode, analysis.language);

      // Voice integration rule:
      // When the user asked via voice assistant (microphone), speak out the answer!
      // When the user asked via text input, answer remains in text format silently!
      if (isVoiceMode) {
        speakResponse(analysis.answer, analysis.language);
      }
    }, 450);
  }

  // 6. Form Submission (Text Mode)
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    stopSpeaking();
    stopListening();
    handleSend(input?.value, false);
  });

  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      stopSpeaking();
      stopListening();
      handleSend(input.value, false);
    }
  });

  // 7. Suggested Prompts (Text Mode)
  suggestedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stopSpeaking();
      stopListening();
      const q = btn.getAttribute('data-query');
      handleSend(q, false);
    });
  });

  // 8. Clear & Export Chat History
  document.getElementById('btn-clear-chat')?.addEventListener('click', () => {
    stopSpeaking();
    stopListening();
    if (confirm('Reset conversation history?')) {
      messages.innerHTML = '';
      const greeting = selectedLanguage === 'mr'
        ? 'संभाषण रीसेट केले. या खटल्याच्या अधिकृत नोंदींमधून आपल्याला कोणती माहिती हवी आहे?'
        : (selectedLanguage === 'hi'
          ? 'बातचीत रीसेट हो गई है। आप इस मामले के आधिकारिक रिकॉर्ड से क्या जानना चाहते हैं?'
          : 'Conversation reset. What would you like to verify from the court docket?');
      addMessage('assistant', greeting, ['Docket_Index.pdf'], false, selectedLanguage);
    }
  });

  document.getElementById('btn-export-chat')?.addEventListener('click', () => {
    const activeCase = api.getActiveCase();
    const chatCards = messages.querySelectorAll('.card, [style*="padding: 14px 18px"]');
    let transcriptText = `CaseCompass Intelligence Q&A Transcript\nCase: ${activeCase.title}\nCNR: ${activeCase.cnr}\nCourt: ${activeCase.court}\nGenerated: ${new Date().toLocaleString()}\n------------------------------------------------------------\n\n`;

    messages.childNodes.forEach(node => {
      if (node.textContent && node.textContent.trim()) {
        transcriptText += node.textContent.trim().replace(/\s+/g, ' ') + '\n\n';
      }
    });

    const blob = new Blob([transcriptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CaseCompass_QA_${activeCase.cnr || 'case'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  });
}
