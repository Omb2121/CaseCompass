/**
 * CaseCompass — 3. Timeline Page
 * Matches Stitch screen: "CaseCompass — Case Timeline (Minimal & Clean)"
 */

import { demoCase, timelineEvents } from '../data/demoData.js';

function eventTypeColor(type) {
  const map = {
    filing: { bg: 'var(--surface-container-low)', border: 'var(--primary)', icon: 'var(--primary)' },
    proceeding: { bg: 'var(--surface-container-low)', border: 'var(--status-verified)', icon: 'var(--status-verified)' },
    order: { bg: 'var(--surface-container-low)', border: 'var(--status-processing)', icon: 'var(--status-processing)' },
    hearing: { bg: 'var(--surface-container-low)', border: 'var(--secondary)', icon: 'var(--secondary)' },
    upcoming: { bg: 'var(--status-pending-bg)', border: 'var(--status-pending)', icon: 'var(--status-pending)' },
  };
  return map[type] || map.filing;
}

export function renderTimelinePage() {
  return `
    <div class="page-content animate-fade-in">
      <!-- Compact Case Header -->
      <div class="card" style="padding:14px 20px;margin-bottom:var(--space-md);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;">
        <div style="display:flex;flex-direction:column;gap:2px;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <h1 style="font-size:1.25rem;font-weight:700;color:var(--on-surface);letter-spacing:-0.01em;">${demoCase.title}</h1>
            <span class="badge badge--verified" style="font-size:0.75rem;border-radius:var(--radius-full);padding:2px 10px;">
              <span class="material-symbols-outlined" style="font-size:14px">verified</span>
              Verified Docket (${timelineEvents.filter(e => e.verified).length} Proceedings)
            </span>
          </div>
          <p class="text-body-sm" style="color:var(--on-surface-variant);">
            CNR: ${demoCase.cnr} · ${demoCase.court}
          </p>
        </div>
        <a href="#/cases" class="btn btn--secondary btn--sm" style="border-radius:var(--radius-lg);">
          Change Case ⇄
        </a>
      </div>

      <!-- Next Hearing Banner -->
      <div style="background:var(--primary);color:#fff;padding:16px 20px;margin-bottom:var(--space-lg);border-radius:var(--radius-xl);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;box-shadow:var(--shadow-md);">
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;">
            <span class="material-symbols-outlined" style="font-size:22px;color:#fff">event</span>
          </div>
          <div>
            <div class="text-label-sm" style="opacity:0.8;text-transform:uppercase;letter-spacing:0.08em;">Next Hearing</div>
            <div style="font-size:1.125rem;font-weight:700;">${demoCase.nextHearing.replace(/-/g, ' ')}</div>
            <div class="text-body-sm" style="opacity:0.8;">${demoCase.nextHearingPurpose}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;opacity:0.9;">
          <span class="material-symbols-outlined" style="font-size:16px">location_city</span>
          <span class="text-body-sm">${demoCase.court}</span>
        </div>
      </div>

      <!-- Timeline Heading -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-md);">
        <h2 class="text-headline-sm" style="color:var(--primary);">Case Proceedings</h2>
        <span class="badge badge--neutral" style="border-radius:var(--radius-sm);">${timelineEvents.length} Events</span>
      </div>

      <!-- Timeline -->
      <div class="stagger-children" style="position:relative;padding-left:28px;">
        <!-- Vertical line -->
        <div style="position:absolute;left:11px;top:8px;bottom:8px;width:2px;background:var(--outline-variant);border-radius:1px;"></div>

        ${timelineEvents.map((evt, i) => {
          const colors = eventTypeColor(evt.type);
          const isLast = i === timelineEvents.length - 1;
          return `
            <div style="position:relative;padding-bottom:${isLast ? '0' : 'var(--space-lg)'};display:flex;gap:var(--space-md);">
              <!-- Dot -->
              <div style="position:absolute;left:-24px;top:4px;width:14px;height:14px;border-radius:50%;border:2px solid ${colors.border};background:var(--surface-container-lowest);z-index:1;"></div>

              <!-- Content Card -->
              <div class="card-flat" style="flex:1;padding:var(--space-md);border-left:3px solid ${colors.border};transition:box-shadow 0.15s;"
                   onmouseover="this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.boxShadow='var(--shadow-xs)'">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:4px;">
                  <div style="display:flex;align-items:center;gap:var(--space-sm);">
                    <span class="material-symbols-outlined" style="font-size:18px;color:${colors.icon}">${evt.icon}</span>
                    <span class="text-body-md" style="font-weight:700;color:var(--on-surface);">${evt.label}</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span class="text-body-sm" style="color:var(--on-surface-variant);">${evt.date}</span>
                    ${evt.verified
                      ? '<span class="badge badge--verified" style="font-size:0.625rem;padding:1px 6px;"><span class="material-symbols-outlined" style="font-size:10px">check</span> Verified</span>'
                      : '<span class="badge badge--pending" style="font-size:0.625rem;padding:1px 6px;">Upcoming</span>'
                    }
                  </div>
                </div>
                <p class="text-body-sm" style="color:var(--on-surface-variant);">${evt.description}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function initTimelinePage() {
  // Timeline is mostly static display; no special interactivity needed
}
