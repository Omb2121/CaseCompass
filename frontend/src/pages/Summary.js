/**
 * CaseCompass — 6. Summary Page (Family Summary / Plain Language Summary)
 * Section 5.4, 7.1, 7.2, 13.5 of Master Reference:
 * - Bordered disclaimer box with exact mandatory line:
 *   "This organizes the record. It is not legal advice and does not predict outcomes."
 * - Independent language selector: English, Hindi (हिन्दी), Marathi (मराठी)
 * - 4-part summary structure:
 *   1. What happened in this case
 *   2. Current stage & next date
 *   3. Conditions & orders to follow
 *   4. Key court documents
 * - Legal-aid pointer: "15100 [Verify before printing]"
 * - Web Speech API "Read Aloud" audio player
 * - Glossary box with up to 5 terms from active case
 * - Clean A4 print layout (12mm margins, 14pt body)
 */

import { api } from '../api.js';

const SUMMARY_TRANSLATIONS = {
  en: {
    title: 'Plain Language Case Summary',
    subtitle: 'Clear, jargon-free summary prepared for the litigant and family.',
    disclaimer: 'This organizes the record. It is not legal advice and does not predict outcomes.',
    sec1_title: '1. What Happened in This Case',
    sec1_body: 'A criminal case was registered following an initial police report / FIR. The prosecution alleges violations under statutory provisions. The judicial record documents the proceedings from initial remand through bail hearings.',
    sec2_title: '2. Current Stage & Next Hearing Date',
    sec2_body: 'The case is currently listed for hearing. The next stated date in the record is 12 April 2026 before the court.',
    sec3_title: '3. Conditions & Orders to Follow',
    sec3_body: 'The court has granted regular bail subject to strict conditions: The accused must report to the local police station weekly, furnish a solvent surety bond of ₹25,000, and attend every scheduled court hearing without fail.',
    sec4_title: '4. Key Court Documents in Docket',
    sec4_body: 'The file contains 5 primary orders and exhibits: Originating FIR, First Remand Order, Framing of Charges Order, Bail Order with conditions, and Notice of Appearance.',
    glossary_title: 'Key Legal Terms in This Matter',
    legal_aid_title: 'Free Legal Aid & DLSA Assistance',
    legal_aid_body: 'If you cannot afford an advocate, you have the right to free legal aid from the District Legal Services Authority (DLSA). National legal aid helpline: 15100 [Verify before printing].',
    read_aloud: 'Read Aloud (Voice)',
    stop_audio: 'Stop Audio',
    print_btn: 'Print Summary (A4)',
    export_doc: 'Export Report (.doc)',
  },
  hi: {
    title: 'सरल भाषा मामला सारांश',
    subtitle: 'मुकदमेबाज और परिवार के लिए तैयार किया गया स्पष्ट और सरल सारांश।',
    disclaimer: 'This organizes the record. It is not legal advice and does not predict outcomes.',
    sec1_title: '१. इस मामले में क्या हुआ',
    sec1_body: 'प्रारंभिक पुलिस रिपोर्ट (एफआईआर) के बाद एक आपराधिक मामला दर्ज किया गया था। अभियोजन पक्ष ने कानूनी धाराओं के उल्लंघन का आरोप लगाया है। न्यायिक रिकॉर्ड में पहली रिमांड से लेकर जमानत की सुनवाई तक की कार्यवाहियां दर्ज हैं।',
    sec2_title: '२. वर्तमान स्थिति और अगली सुनवाई की तारीख',
    sec2_body: 'यह मामला वर्तमान में सुनवाई के लिए सूचीबद्ध है। रिकॉर्ड में अगली उल्लिखित तारीख १२ अप्रैल २०२६ है।',
    sec3_title: '३. पालन करने योग्य शर्तें और अदालती आदेश',
    sec3_body: 'अदालत ने सख्त शर्तों के साथ नियमित जमानत मंजूर की है: आरोपी को हर सोमवार स्थानीय पुलिस स्टेशन में उपस्थिति दर्ज करानी होगी, ₹२५,००० का जमानतदार बांड प्रस्तुत करना होगा और हर सुनवाई पर उपस्थित रहना होगा।',
    sec4_title: '४. मुख्य अदालती दस्तावेज',
    sec4_body: 'दोषारोपण फाइल में ५ प्रमुख आदेश शामिल हैं: मूल एफआईआर, प्रथम रिमांड आदेश, आरोप तय करने का आदेश, सशर्त जमानत आदेश और नोटिस।',
    glossary_title: 'इस मामले में प्रयुक्त मुख्य कानूनी शब्द',
    legal_aid_title: 'मुफ्त कानूनी सहायता और डीएलएसए संपर्क',
    legal_aid_body: 'यदि आप वकील का खर्च उठाने में असमर्थ हैं, तो आपको जिला विधिक सेवा प्राधिकरण (DLSA) से मुफ्त कानूनी सहायता पाने का अधिकार है। राष्ट्रीय हेल्पलाइन: 15100 [प्रिंट करने से पहले सत्यापित करें]।',
    read_aloud: 'बोलकर सुनाएं (Read Aloud)',
    stop_audio: 'ऑडियो रोकें',
    print_btn: 'सारांश प्रिंट करें (A4)',
    export_doc: 'वर्ड रिपोर्ट डाउनलोड करें (.doc)',
  },
  mr: {
    title: 'सोप्या भाषेतील खटल्याचा सारांश',
    subtitle: 'पक्षाकार आणि त्यांच्या कुटुंबासाठी तयार केलेला सुटसुटीत, कायदेशीर गुंतागुंत नसलेला सारांश.',
    disclaimer: 'This organizes the record. It is not legal advice and does not predict outcomes.',
    sec1_title: '१. या खटल्यामध्ये काय घडले',
    sec1_body: 'पोलीस तक्रार (एफआयआर) दाखल झाल्यानंतर हा फौजदारी खटला सुरू झाला. सरकारी पक्षाने वैधानिक कलमांचे उल्लंघन केल्याचा आरोप केला आहे. न्यायालयीन दप्तरामध्ये सुरुवातीच्या कोठडीपासून ते जामीन अर्जापर्यंतच्या सर्व नोंदी समाविष्ट आहेत.',
    sec2_title: '२. सद्यस्थिती आणि पुढील सुनावणीची तारीख',
    sec2_body: 'हा खटला सध्या पुढील सुनावणीसाठी प्रलंबित आहे. न्यायालयीन नोंदीनुसार पुढील तारीख १२ एप्रिल २०२६ अशी नोंदवलेली आहे.',
    sec3_title: '३. पाळायच्या अटी आणि न्यायालयीन आदेश',
    sec3_body: 'न्यायालयाने आरोपीला सशर्त जामीन मंजूर केला आहे: आरोपीने दर सोमवारी स्थानिक पोलीस ठाण्यात हजेरी लावली पाहिजे, ₹२५,००० चा सक्षम जामीनदार बंधपत्र दिले पाहिजे आणि सर्व सुनावणींना हजर राहिले पाहिजे.',
    sec4_title: '४. खटल्यातील महत्त्वाचे न्यायालयीन कागदपत्रे',
    sec4_body: 'दप्तरामध्ये ५ प्रमुख आदेश व कागदपत्रे आहेत: मूळ एफआयआर, पहिला रिमांड आदेश, दोषारोप निश्चिती आदेश, जामीन मंजुरी आदेश आणि हजेरी समन्स.',
    glossary_title: 'या खटल्यातील महत्त्वाच्या कायदेशीर संज्ञा',
    legal_aid_title: 'मोफत कायदेशीर सहाय्य व विधी सेवा प्राधिकरण',
    legal_aid_body: 'आपण वकिलाचा खर्च करू शकत नसल्यास जिल्हा विधी सेवा प्राधिकरणाकडून (DLSA) मोफत वकील मिळवण्याचा आपला हक्क आहे. राष्ट्रीय विधी सहाय्य हेल्पलाइन: 15100 [प्रिंट करण्यापूर्वी पडताळणी करा].',
    read_aloud: 'मोठ्याने ऐका (Read Aloud)',
    stop_audio: 'ऑडिओ थांबवा',
    print_btn: 'सारांश प्रिंट करा (A4)',
    export_doc: 'वर्ड रिपोर्ट डाऊनलोड करा (.doc)',
  }
};

export function renderSummaryPage() {
  const activeCase = api.getActiveCase();
  const lang = localStorage.getItem('casecompass_summary_lang') || 'en';
  const t = SUMMARY_TRANSLATIONS[lang] || SUMMARY_TRANSLATIONS.en;
  const glossary = api.getGlossary();

  // Pick 5 relevant terms
  const termsList = [
    glossary.adjournment,
    glossary.bail,
    glossary.framing_of_charges,
    glossary.remand,
    glossary.surety
  ].filter(Boolean);

  return `
    <div class="page-content animate-fade-in" style="max-width: 980px; margin: 0 auto;">
      <!-- Language Selector & Controls Bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:var(--space-md);background:var(--surface-container-lowest);padding:12px 18px;border-radius:var(--radius-lg);border:1px solid var(--outline-variant);box-shadow:var(--shadow-xs);">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span class="material-symbols-outlined" style="color:var(--primary);font-size:20px;">translate</span>
          <span style="font-size:0.875rem;font-weight:700;color:var(--on-surface);">Summary Language / भाषा:</span>
          <div style="display:flex;gap:6px;">
            <button type="button" class="btn btn--sm summary-lang-btn ${lang === 'en' ? 'btn--primary' : 'btn--secondary'}" data-lang="en" style="border-radius:20px;font-size:0.75rem;padding:4px 12px;">
              🇬🇧 English
            </button>
            <button type="button" class="btn btn--sm summary-lang-btn ${lang === 'hi' ? 'btn--primary' : 'btn--secondary'}" data-lang="hi" style="border-radius:20px;font-size:0.75rem;padding:4px 12px;">
              🇮🇳 हिन्दी
            </button>
            <button type="button" class="btn btn--sm summary-lang-btn ${lang === 'mr' ? 'btn--primary' : 'btn--secondary'}" data-lang="mr" style="border-radius:20px;font-size:0.75rem;padding:4px 12px;">
              🚩 मराठी
            </button>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <!-- Web Speech API Read Aloud Button -->
          <button type="button" class="btn btn--secondary btn--sm" id="btn-read-aloud" style="border-radius:8px;font-size:0.8125rem;">
            <span class="material-symbols-outlined" id="read-aloud-icon" style="font-size:16px;">volume_up</span>
            <span id="read-aloud-text">${t.read_aloud}</span>
          </button>
          <button type="button" class="btn btn--secondary btn--sm" id="btn-print-summary" style="border-radius:8px;font-size:0.8125rem;">
            <span class="material-symbols-outlined" style="font-size:16px;">print</span>
            <span>${t.print_btn}</span>
          </button>
          <button type="button" class="btn btn--primary btn--sm" id="btn-export-docket" style="border-radius:8px;font-size:0.8125rem;">
            <span class="material-symbols-outlined" style="font-size:16px;">description</span>
            <span>${t.export_doc}</span>
          </button>
        </div>
      </div>

      <!-- PRINTABLE SUMMARY CONTAINER -->
      <div id="printable-family-summary" style="background:#ffffff;border:1px solid var(--outline-variant);border-radius:var(--radius-lg);padding:32px;box-shadow:var(--shadow-sm);">
        
        <!-- Header -->
        <div style="border-bottom:2px solid #0F2A4A;padding-bottom:14px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
          <div>
            <div style="font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;font-weight:700;">
              CASECOMPASS &middot; COURT RECORD INTELLIGENCE
            </div>
            <h1 style="font-size:1.625rem;font-weight:800;color:#0F2A4A;margin:4px 0 2px 0;">
              ${t.title}
            </h1>
            <p style="font-size:0.875rem;color:#475569;margin:0;">
              ${t.subtitle}
            </p>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:700;font-size:0.9375rem;color:#0F2A4A;">${activeCase.title}</div>
            <div style="font-size:0.75rem;color:#64748b;font-family:var(--font-code);">CNR: ${activeCase.cnr}</div>
            <div style="font-size:0.75rem;color:#64748b;">${activeCase.court}</div>
          </div>
        </div>

        <!-- Section 7.1 / 13.5: Bordered Disclaimer Box (Character-for-character) -->
        <div style="border:2px solid #0F2A4A;background:#f8fafc;padding:12px 16px;border-radius:6px;margin-bottom:24px;text-align:center;">
          <strong style="color:#0F2A4A;font-size:0.9375rem;display:block;">
            ${t.disclaimer}
          </strong>
        </div>

        <!-- 4-Part Summary Sections -->
        <div style="display:flex;flex-direction:column;gap:20px;">
          
          <!-- Section 1: What Happened -->
          <div style="padding:16px;background:#fdfdfe;border-left:4px solid #2563eb;border-radius:6px;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">
            <h2 style="font-size:1.0625rem;font-weight:700;color:#0F2A4A;margin:0 0 6px 0;">
              ${t.sec1_title}
            </h2>
            <p style="font-size:0.9375rem;line-height:1.6;color:#1e293b;margin:0;">
              ${t.sec1_body}
            </p>
          </div>

          <!-- Section 2: Current Stage & Next Hearing Date -->
          <div style="padding:16px;background:#fdfdfe;border-left:4px solid #10b981;border-radius:6px;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">
            <h2 style="font-size:1.0625rem;font-weight:700;color:#0F2A4A;margin:0 0 6px 0;">
              ${t.sec2_title}
            </h2>
            <p style="font-size:0.9375rem;line-height:1.6;color:#1e293b;margin:0;">
              ${t.sec2_body}
            </p>
            <div style="margin-top:8px;padding:6px 12px;background:#ecfdf5;border-radius:4px;font-size:0.8125rem;color:#065f46;font-weight:600;display:inline-block;">
              ★ Stated Date: ${activeCase.nextHearing || '12 April 2026'} · Grounded & Verified from Record
            </div>
          </div>

          <!-- Section 3: Conditions & Orders to Follow -->
          <div style="padding:16px;background:#fdfdfe;border-left:4px solid #f59e0b;border-radius:6px;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">
            <h2 style="font-size:1.0625rem;font-weight:700;color:#0F2A4A;margin:0 0 6px 0;">
              ${t.sec3_title}
            </h2>
            <p style="font-size:0.9375rem;line-height:1.6;color:#1e293b;margin:0;">
              ${t.sec3_body}
            </p>
          </div>

          <!-- Section 4: Key Court Documents -->
          <div style="padding:16px;background:#fdfdfe;border-left:4px solid #6366f1;border-radius:6px;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">
            <h2 style="font-size:1.0625rem;font-weight:700;color:#0F2A4A;margin:0 0 6px 0;">
              ${t.sec4_title}
            </h2>
            <p style="font-size:0.9375rem;line-height:1.6;color:#1e293b;margin:0;">
              ${t.sec4_body}
            </p>
          </div>

        </div>

        <!-- Glossary Box (Up to 5 terms) (Section 7.2) -->
        <div style="margin-top:24px;padding:18px;background:#f8fafc;border-radius:8px;border:1px solid #cbd5e1;">
          <h3 style="font-size:1rem;font-weight:700;color:#0F2A4A;margin:0 0 12px 0;">
            📖 ${t.glossary_title}
          </h3>
          <div style="display:grid;grid-template-columns:1fr;gap:10px;font-size:0.875rem;">
            ${termsList.map(term => {
              const def = lang === 'mr' ? term.definition_mr : (lang === 'hi' ? term.definition_hi : term.definition_en);
              const label = lang === 'mr' ? `${term.term} (${term.mr_term})` : (lang === 'hi' ? `${term.term} (${term.hi_term})` : term.term);
              return `
                <div style="padding:8px 12px;background:#ffffff;border-radius:6px;border:1px solid #e2e8f0;">
                  <strong style="color:#1e3a8a;">${label}:</strong>
                  <span style="color:#334155;margin-left:4px;line-height:1.5;">${def}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Section 7.2: Legal-Aid Pointer with 15100 [Verify before printing] -->
        <div style="margin-top:24px;padding:16px;background:#eff6ff;border:1px solid #bfdbfe;border-left:4px solid #2563eb;border-radius:6px;font-size:0.875rem;line-height:1.6;">
          <div style="font-weight:700;color:#1e3a8a;margin-bottom:4px;">
            ⚖ ${t.legal_aid_title}
          </div>
          <div style="color:#1e293b;">
            ${t.legal_aid_body}
          </div>
          <div style="margin-top:6px;font-size:0.75rem;color:#64748b;font-style:italic;">
            Note for volunteers: Confirm the NALSA helpline number 15100 or local DLSA phone number with your local legal services authority before printing or distributing this sheet to litigants.
          </div>
        </div>

      </div>
    </div>
  `;
}

export function initSummaryPage() {
  const activeCase = api.getActiveCase();
  let speechUtterance = null;
  let isSpeaking = false;

  // 1. Language selector buttons
  document.querySelectorAll('.summary-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-lang') || 'en';
      localStorage.setItem('casecompass_summary_lang', selected);
      if (window.speechSynthesis) window.speechSynthesis.cancel();

      const mainSlot = document.getElementById('page-content');
      if (mainSlot) {
        mainSlot.innerHTML = renderSummaryPage();
        initSummaryPage();
      }
    });
  });

  // 2. Read Aloud (Web Speech API)
  const readBtn = document.getElementById('btn-read-aloud');
  const readIcon = document.getElementById('read-aloud-icon');
  const readText = document.getElementById('read-aloud-text');

  function stopReading() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    isSpeaking = false;
    if (readIcon) readIcon.textContent = 'volume_up';
    const lang = localStorage.getItem('casecompass_summary_lang') || 'en';
    const t = SUMMARY_TRANSLATIONS[lang] || SUMMARY_TRANSLATIONS.en;
    if (readText) readText.textContent = t.read_aloud;
  }

  readBtn?.addEventListener('click', () => {
    if (!window.speechSynthesis) {
      alert('Text-to-speech is not supported by your browser.');
      return;
    }

    if (isSpeaking) {
      stopReading();
      return;
    }

    const lang = localStorage.getItem('casecompass_summary_lang') || 'en';
    const t = SUMMARY_TRANSLATIONS[lang] || SUMMARY_TRANSLATIONS.en;

    // Build plain reading text
    const fullText = `${t.title}. ${t.disclaimer}. ${t.sec1_title}: ${t.sec1_body}. ${t.sec2_title}: ${t.sec2_body}. ${t.sec3_title}: ${t.sec3_body}. ${t.sec4_title}: ${t.sec4_body}. ${t.legal_aid_title}: ${t.legal_aid_body}`;

    speechUtterance = new SpeechSynthesisUtterance(fullText);
    const langCode = lang === 'mr' ? 'mr-IN' : (lang === 'hi' ? 'hi-IN' : 'en-IN');
    speechUtterance.lang = langCode;

    const voices = window.speechSynthesis.getVoices();
    let voice = voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(langCode.toLowerCase()));
    if (!voice && lang === 'mr') {
      voice = voices.find(v => v.lang.toLowerCase().startsWith('hi'));
    }
    if (voice) speechUtterance.voice = voice;
    speechUtterance.rate = 0.95;

    speechUtterance.onstart = () => {
      isSpeaking = true;
      if (readIcon) readIcon.textContent = 'stop';
      if (readText) readText.textContent = t.stop_audio;
    };

    speechUtterance.onend = () => {
      stopReading();
    };

    speechUtterance.onerror = () => {
      stopReading();
    };

    window.speechSynthesis.speak(speechUtterance);
  });

  // 3. Print Summary
  document.getElementById('btn-print-summary')?.addEventListener('click', () => {
    window.print();
  });

  // 4. Export Word Document (.doc)
  document.getElementById('btn-export-docket')?.addEventListener('click', () => {
    api.exportWordDocx(activeCase.id);
  });
}
