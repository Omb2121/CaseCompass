/**
 * CaseCompass — GSAP + Lenis Smooth Scroll & Animation Setup
 *
 * Setup:
 * - Lenis connected to GSAP ticker (recommended pattern)
 * - ScrollTrigger registered
 * - prefers-reduced-motion: no animations or smooth scroll
 * - Inner scroll areas: marked with data-lenis-prevent
 * - Route cleanup: call destroyAnimations() on route change
 *
 * Usage:
 *   import { initAnimations, destroyAnimations } from './animations.js';
 *   initAnimations();
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let gsapMatchMedia = null;
const _scrollTriggerInstances = [];

// ---- Reduced Motion Check ----

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ---- Lenis Init ----

export function initLenis() {
  if (prefersReducedMotion()) return;
  if (lenis) return; // already initialized

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Connect Lenis to GSAP ticker (standard pattern)
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
    gsap.ticker.remove(() => {});
  }
}

// Stop Lenis while a modal is open (prevent scroll trap)
export function pauseLenis() { lenis?.stop(); }
export function resumeLenis() { lenis?.start(); }

// ---- Page Enter Animations ----

export function animatePageEnter(container) {
  if (prefersReducedMotion() || !container) return;

  // Content must be visible by default — only use opacity/transform
  gsap.fromTo(
    container,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
  );
}

// ---- Timeline Cards Reveal on Scroll ----

export function animateTimelineCards(cardSelector = '.timeline-card') {
  if (prefersReducedMotion()) return;

  const cards = document.querySelectorAll(cardSelector);
  if (!cards.length) return;

  cards.forEach((card, i) => {
    // Ensure visible by default before animation
    gsap.set(card, { opacity: 1, y: 0 });

    const st = ScrollTrigger.create({
      trigger: card,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.07,
            ease: 'power2.out',
            clearProps: 'all',
          }
        );
      },
    });
    _scrollTriggerInstances.push(st);
  });
}

// ---- Needs Attention Strip Slide-In ----

export function animateNeedsAttentionStrip(stripSelector = '.needs-attention-strip') {
  if (prefersReducedMotion()) return;

  const strip = document.querySelector(stripSelector);
  if (!strip) return;

  gsap.fromTo(
    strip,
    { opacity: 0, x: -24 },
    { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', clearProps: 'all' }
  );
}

// ---- Evidence Lens Highlight Sweep ----

export function animateEvidenceHighlight(quoteEl) {
  if (prefersReducedMotion() || !quoteEl) return;

  gsap.fromTo(
    quoteEl,
    { backgroundSize: '0% 100%' },
    { backgroundSize: '100% 100%', duration: 0.6, ease: 'power2.inOut' }
  );
}

// ---- Portal Card Hover States ----

export function initPortalCardHovers(cardSelector = '.portal-card') {
  if (prefersReducedMotion()) return;

  document.querySelectorAll(cardSelector).forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -4, duration: 0.25, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.inOut' });
    });
  });
}

// ---- Counter Animate (one-shot, respects screen readers) ----

export function animateCounter(el, targetValue, suffix = '') {
  if (prefersReducedMotion() || !el) {
    // Set final value immediately — screen readers get the correct number
    el.textContent = targetValue + suffix;
    return;
  }

  const obj = { val: 0 };
  gsap.to(obj, {
    val: targetValue,
    duration: 0.7,
    ease: 'power2.out',
    onUpdate: () => {
      // Update aria-hidden span (visual only); screen reader gets the static text
      el.textContent = Math.round(obj.val) + suffix;
    },
    onComplete: () => {
      // Ensure exact final value
      el.textContent = targetValue + suffix;
    },
  });
}

// ---- gsap.matchMedia breakpoints ----

export function initResponsiveAnimations() {
  if (prefersReducedMotion()) return;

  gsapMatchMedia = gsap.matchMedia();

  gsapMatchMedia.add({
    isMobile: '(max-width: 767px)',
    isTablet: '(min-width: 768px) and (max-width: 1023px)',
    isDesktop: '(min-width: 1024px)',
  }, (context) => {
    const { isMobile, isTablet, isDesktop } = context.conditions;

    // Timeline cards: simpler animation on mobile
    if (isMobile) {
      document.querySelectorAll('.timeline-card').forEach(card => {
        gsap.set(card, { opacity: 1 }); // ensure visible
      });
    }

    // Sidebar entrance on desktop
    if (isDesktop) {
      const sidebar = document.querySelector('.app-sidebar');
      if (sidebar) {
        gsap.fromTo(
          sidebar,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
        );
      }
    }

    return () => {
      // Cleanup called on route change or when media query no longer matches
    };
  });
}

// ---- Main init / destroy ----

export function initAnimations(pageContainer = null) {
  if (prefersReducedMotion()) return;

  initLenis();

  if (pageContainer) {
    animatePageEnter(pageContainer);
  }

  initResponsiveAnimations();
  ScrollTrigger.refresh();
}

export function destroyAnimations() {
  // Kill all tracked ScrollTriggers
  _scrollTriggerInstances.forEach(st => st?.kill());
  _scrollTriggerInstances.length = 0;

  // Kill matchMedia context
  if (gsapMatchMedia) {
    gsapMatchMedia.revert();
    gsapMatchMedia = null;
  }

  ScrollTrigger.getAll().forEach(st => st.kill());
}
