/**
 * js/animations/franchise-merchant.js
 *
 * SCROLL ENTRANCE:
 *   ─ Eyebrows fade up first
 *   ─ Headings slide in from their respective sides
 *   ─ Underline accents draw out (scaleX 0→1) beneath headings
 *   ─ Descriptions fade up
 *   ─ Benefit list items stagger up with a shimmer sweep on each check icon
 *   ─ Price badge pops in with a slight overshoot (back.out)
 *   ─ Portal cards stagger in from below
 *   ─ CTAs fade up last
 *
 * DIVIDER:
 *   ─ Line draws outward from center (top half up, bottom half down, via clip)
 *   ─ Center pill scales in last with back.out easing
 *   ─ Pill gets a continuous radar-ping double-ring animation (looping)
 *
 * HOVER (GSAP):
 *   ─ Portal cards: subtle lift (-4px) + icon scale (1.15)
 *   ─ "Apply Now" & portal CTA: arrow nudges right (+3px)
 *
 * COUNTER:
 *   ─ Price badge: 0 → 6800 with formatted output (commas)
 *
 * Call animateFranchiseMerchant() after section is in the DOM.
 */

import { gsap } from '../../public/vendor/gsap/index.js';
import { ScrollTrigger } from '../../public/vendor/gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Format number with commas: 6800 → "6,800" */
function formatNumber(n) {
  return Math.round(n).toLocaleString('en-US');
}

// ─── Main export ───────────────────────────────────────────────────────────

export function animateFranchiseMerchant() {

  // Respect reduced-motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const section = document.getElementById('franchise-merchant');
  if (!section) return;

  // If reduced motion: just make everything visible, skip all animation
  if (prefersReduced) {
    gsap.set([
      '#fm-franchise-eyebrow', '#fm-franchise-heading', '#fm-franchise-desc',
      '#fm-franchise-ctas', '#fm-price-badge', '#fm-franchise-underline',
      '#fm-merchant-eyebrow', '#fm-merchant-heading', '#fm-merchant-desc',
      '#fm-portal-btn', '#fm-merchant-underline',
      '.fm-benefit-item', '.merchant-portal-card',
      '#fm-divider-pill',
    ], { opacity: 1, clearProps: 'all' });
    gsap.set('#fm-divider', { scaleY: 1 });
    gsap.set(['#fm-franchise-underline', '#fm-merchant-underline'], { scaleX: 1 });
    document.getElementById('fm-price-counter').textContent = '6,800';
    _initHoverInteractions(); // hover still works
    return;
  }

  // ── Shared scroll trigger config ─────────────────────────────────────────
  const trigger = {
    trigger: section,
    start: 'top 72%',
    toggleActions: 'play none none none',
  };

  // ── FRANCHISE PANEL (left) ────────────────────────────────────────────────

  // 1. Eyebrow fades in
  gsap.to('#fm-franchise-eyebrow', {
    opacity: 1, y: 0,
    duration: 0.5, ease: 'power2.out',
    scrollTrigger: trigger,
  });
  gsap.from('#fm-franchise-eyebrow', {
    y: 12,
    scrollTrigger: trigger,
    duration: 0.5, ease: 'power2.out',
  });

  // 2. Heading slides from left
  gsap.to('#fm-franchise-heading', {
    opacity: 1, x: 0,
    duration: 0.85, ease: 'power3.out', delay: 0.1,
    scrollTrigger: trigger,
  });
  gsap.from('#fm-franchise-heading', {
    x: -40,
    scrollTrigger: trigger,
    duration: 0.85, ease: 'power3.out', delay: 0.1,
  });

  // 3. Underline draws out
  gsap.to('#fm-franchise-underline', {
    scaleX: 1,
    duration: 0.6, ease: 'power3.out', delay: 0.45,
    scrollTrigger: trigger,
  });

  // 4. Description fades up
  gsap.to('#fm-franchise-desc', {
    opacity: 1, y: 0,
    duration: 0.55, ease: 'power2.out', delay: 0.3,
    scrollTrigger: trigger,
  });
  gsap.from('#fm-franchise-desc', {
    y: 16,
    scrollTrigger: trigger,
    duration: 0.55, ease: 'power2.out', delay: 0.3,
  });

  // 5. Benefit list items stagger up
  const benefitItems = gsap.utils.toArray('.fm-benefit-item');
  gsap.to(benefitItems, {
    opacity: 1, y: 0,
    stagger: 0.1,
    duration: 0.5, ease: 'power2.out', delay: 0.45,
    scrollTrigger: trigger,
  });
  gsap.from(benefitItems, {
    y: 14,
    stagger: 0.1,
    scrollTrigger: trigger,
    duration: 0.5, ease: 'power2.out', delay: 0.45,
  });

  // 5b. Shimmer sweep on each check icon — fires after item appears
  benefitItems.forEach((li, i) => {
    const shimmer = li.querySelector('.fm-check-shimmer');
    if (!shimmer) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 72%',
      once: true,
      onEnter: () => {
        gsap.to(shimmer, {
          x: '200%',
          duration: 0.55,
          ease: 'power2.out',
          delay: 0.55 + i * 0.1,
        });
      },
    });
  });

  // 6. Price badge pops in
  gsap.to('#fm-price-badge', {
    opacity: 1, scale: 1,
    duration: 0.5, ease: 'back.out(2)', delay: 0.85,
    scrollTrigger: trigger,
  });
  gsap.from('#fm-price-badge', {
    scale: 0.85,
    scrollTrigger: trigger,
    duration: 0.5, ease: 'back.out(2)', delay: 0.85,
  });

  // 6b. Price counter animation
  ScrollTrigger.create({
    trigger: section,
    start: 'top 72%',
    once: true,
    onEnter: () => {
      const el = document.getElementById('fm-price-counter');
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 6800,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.9,
        onUpdate: () => {
          el.textContent = formatNumber(obj.val);
        },
        onComplete: () => {
          el.textContent = '6,800';
        },
      });
    },
  });

  // 7. CTAs fade up
  gsap.to('#fm-franchise-ctas', {
    opacity: 1, y: 0,
    duration: 0.5, ease: 'power2.out', delay: 1.0,
    scrollTrigger: trigger,
  });
  gsap.from('#fm-franchise-ctas', {
    y: 12,
    scrollTrigger: trigger,
    duration: 0.5, ease: 'power2.out', delay: 1.0,
  });

  // ── MERCHANT PANEL (right) ────────────────────────────────────────────────

  // Eyebrow
  gsap.to('#fm-merchant-eyebrow', {
    opacity: 1, y: 0,
    duration: 0.5, ease: 'power2.out', delay: 0.08,
    scrollTrigger: trigger,
  });
  gsap.from('#fm-merchant-eyebrow', {
    y: 12,
    scrollTrigger: trigger,
    duration: 0.5, ease: 'power2.out', delay: 0.08,
  });

  // Heading slides from right
  gsap.to('#fm-merchant-heading', {
    opacity: 1, x: 0,
    duration: 0.85, ease: 'power3.out', delay: 0.18,
    scrollTrigger: trigger,
  });
  gsap.from('#fm-merchant-heading', {
    x: 40,
    scrollTrigger: trigger,
    duration: 0.85, ease: 'power3.out', delay: 0.18,
  });

  // Underline draws out
  gsap.to('#fm-merchant-underline', {
    scaleX: 1,
    duration: 0.6, ease: 'power3.out', delay: 0.5,
    scrollTrigger: trigger,
  });

  // Description
  gsap.to('#fm-merchant-desc', {
    opacity: 1, y: 0,
    duration: 0.55, ease: 'power2.out', delay: 0.35,
    scrollTrigger: trigger,
  });
  gsap.from('#fm-merchant-desc', {
    y: 16,
    scrollTrigger: trigger,
    duration: 0.55, ease: 'power2.out', delay: 0.35,
  });

  // Portal cards stagger
  const portalCards = gsap.utils.toArray('.merchant-portal-card');
  gsap.to(portalCards, {
    opacity: 1, y: 0,
    stagger: 0.07,
    duration: 0.5, ease: 'power2.out', delay: 0.5,
    scrollTrigger: trigger,
  });
  gsap.from(portalCards, {
    y: 18,
    stagger: 0.07,
    scrollTrigger: trigger,
    duration: 0.5, ease: 'power2.out', delay: 0.5,
  });

  // Portal CTA
  gsap.to('#fm-portal-btn', {
    opacity: 1, y: 0,
    duration: 0.5, ease: 'power2.out', delay: 0.95,
    scrollTrigger: trigger,
  });
  gsap.from('#fm-portal-btn', {
    y: 12,
    scrollTrigger: trigger,
    duration: 0.5, ease: 'power2.out', delay: 0.95,
  });

  // ── DIVIDER LINE — scales in from center (flex child, full height) ──────────

  ScrollTrigger.create({
    trigger: section,
    start: 'top 72%',
    once: true,
    onEnter: () => {
      const divider = document.getElementById('fm-divider');
      if (!divider) return;

      // Divider is now a flex child that naturally fills full height.
      // Animate scaleY 0→1 from the vertical center.
      gsap.fromTo(divider,
        { scaleY: 0, transformOrigin: '50% 50%' },
        { scaleY: 1, duration: 0.9, ease: 'power3.inOut', delay: 0.55 }
      );
    },
  });

  // ── DIVIDER PILL — pops in, then loops radar ping ─────────────────────────

  ScrollTrigger.create({
    trigger: section,
    start: 'top 72%',
    once: true,
    onEnter: () => {
      // Pop in
      gsap.to('#fm-divider-pill', {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'back.out(2.2)',
        delay: 1.1,
        onComplete: _startPingLoop,
      });
      gsap.from('#fm-divider-pill', {
        scale: 0,
        duration: 0.45,
        ease: 'back.out(2.2)',
        delay: 1.1,
      });
    },
  });

  // ── HOVER INTERACTIONS ────────────────────────────────────────────────────
  _initHoverInteractions();
}

// ─── Radar-ping loop (runs after pill pops in) ─────────────────────────────

function _startPingLoop() {
  const ring1 = document.getElementById('fm-ping-1');
  const ring2 = document.getElementById('fm-ping-2');
  if (!ring1 || !ring2) return;

  // Ring 1 — phase 0
  gsap.fromTo(ring1,
    { scale: 1, opacity: 0.55 },
    {
      scale: 2.4,
      opacity: 0,
      duration: 1.8,
      ease: 'power1.out',
      repeat: -1,
      repeatDelay: 0.6,
    }
  );

  // Ring 2 — offset by 0.9s so the two pulses feel like a heartbeat
  gsap.fromTo(ring2,
    { scale: 1, opacity: 0.35 },
    {
      scale: 2.0,
      opacity: 0,
      duration: 1.8,
      ease: 'power1.out',
      repeat: -1,
      repeatDelay: 0.6,
      delay: 0.9,
    }
  );
}

// ─── GSAP hover interactions on portal cards + CTA arrows ──────────────────

function _initHoverInteractions() {

  // Portal cards: lift up + icon scale
  const cards = document.querySelectorAll('.merchant-portal-card');
  cards.forEach(card => {
    const icon = card.querySelector('.fm-portal-icon');

    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -4, duration: 0.22, ease: 'power2.out' });
      if (icon) gsap.to(icon, { scale: 1.14, duration: 0.22, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.28, ease: 'power2.inOut' });
      if (icon) gsap.to(icon, { scale: 1, duration: 0.28, ease: 'power2.inOut' });
    });
  });

  // "Apply Now" arrow nudge
  const applyBtn = document.getElementById('fm-apply-btn');
  if (applyBtn) {
    const arrow = applyBtn.querySelector('svg');
    applyBtn.addEventListener('mouseenter', () => {
      if (arrow) gsap.to(arrow, { x: 4, duration: 0.2, ease: 'power2.out' });
    });
    applyBtn.addEventListener('mouseleave', () => {
      if (arrow) gsap.to(arrow, { x: 0, duration: 0.25, ease: 'power2.inOut' });
    });
  }

  // "Access Full Portal" arrow nudge
  const portalBtn = document.getElementById('fm-portal-btn');
  if (portalBtn) {
    const arrow = portalBtn.querySelector('svg');
    portalBtn.addEventListener('mouseenter', () => {
      if (arrow) gsap.to(arrow, { x: 4, duration: 0.2, ease: 'power2.out' });
    });
    portalBtn.addEventListener('mouseleave', () => {
      if (arrow) gsap.to(arrow, { x: 0, duration: 0.25, ease: 'power2.inOut' });
    });
  }
}