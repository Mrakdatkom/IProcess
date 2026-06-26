/**
 * js/animations/hero.js — Editorial Depth Hero + Right-Side Drawer
 *
 * ENTRANCE:
 *   BG fades in → top rule draws → words rise one by one →
 *   bottom rule draws → FG slides in (depth reveal)
 *
 * SCROLL (ScrollTrigger scrub):
 *   - Headline: scale up + fade out
 *   - FG: parallax down (faster)
 *   - BG: parallax up (slower)
 *
 * MOBILE DRAWER:
 *   - Slides in from right (translateX: 100% → 0)
 *   - Backdrop fades in behind it
 *   - Hamburger morphs to X via GSAP
 *   - Closes on: X button, backdrop click, drawer link click, Escape key
 */

import gsap from "../../public/vendor/gsap/index.js";
import { ScrollTrigger } from '../../public/vendor/gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

export function animateHero() {

  // ── Reduced motion: snap everything visible ───────────────────────────────
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set([
      '#hero-bg', '#hero-fg', '#hero-word-1', '#hero-word-2',
      '#hero-word-3-row', '#hero-est', '#hero-rule-top', '#hero-rule-bottom',
    ], { clearProps: 'all' });
    initDrawer();
    return;
  }

  // ── Initial states ────────────────────────────────────────────────────────
  gsap.set('#hero-bg', { opacity: 0 });
  gsap.set('#hero-fg', { opacity: 0, y: 50 });
  gsap.set('#hero-word-1', { yPercent: 115 });
  gsap.set('#hero-word-2', { yPercent: 115 });
  gsap.set('#hero-word-3-row', { yPercent: 115 });
  gsap.set('#hero-est', { opacity: 0 });
  gsap.set('#hero-rule-top', { width: 0 });
  gsap.set('#hero-rule-bottom', { width: 0 });

  // ── Entrance timeline ─────────────────────────────────────────────────────
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl
    // Scene — BG breathes in
    .to('#hero-bg', { opacity: 1, duration: 1.1 })

    // Top rule draws left → right
    .to('#hero-rule-top', {
      width: 520, duration: 0.7, ease: 'power2.inOut',
    }, '-=0.5')

    // "Simplify" — ghost, rises first
    .to('#hero-word-1', { yPercent: 0, duration: 0.8, ease: 'power4.out' }, '-=0.35')

    // "Business" — full white, authority
    .to('#hero-word-2', { yPercent: 0, duration: 0.8, ease: 'power4.out' }, '-=0.6')

    // "Transactions" row — the payoff
    .to('#hero-word-3-row', { yPercent: 0, duration: 0.85, ease: 'power4.out' }, '-=0.6')

    // "est. 2021" fades in after word settles
    .to('#hero-est', { opacity: 1, duration: 0.55, ease: 'power2.out' }, '-=0.2')

    // Bottom rule draws right ← left
    .to('#hero-rule-bottom', {
      width: 360, duration: 0.6, ease: 'power2.inOut',
    }, '-=0.35')

    // FG slides in — depth reveal
    .to('#hero-fg', { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.45');

  // ── SCROLL ANIMATIONS ─────────────────────────────────────────────────────
  const heroEl = document.getElementById('hero');

  // Headline: scale up + fade out as buildings close in
  gsap.to('#hero-text', {
    scale: 1.14, opacity: 0, ease: 'none',
    scrollTrigger: {
      trigger: heroEl, start: 'top top', end: 'bottom top', scrub: 1.2,
    },
  });

  // FG: slides down on scroll (foreground — faster)
  gsap.to('#hero-fg', {
    y: 70, ease: 'none',
    scrollTrigger: {
      trigger: heroEl, start: 'top top', end: 'bottom top', scrub: 1.5,
    },
  });

  // BG: slides up on scroll (background — slower)
  gsap.to('#hero-bg', {
    y: -40, ease: 'none',
    scrollTrigger: {
      trigger: heroEl, start: 'top top', end: 'bottom top', scrub: 2,
    },
  });

  // ── DRAWER ────────────────────────────────────────────────────────────────
  initDrawer();
}

// ─── RIGHT-SIDE DRAWER ───────────────────────────────────────────────────────
function initDrawer() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const hamLines = document.querySelectorAll('.hamburger-line');

  if (!menuBtn || !drawer) return;

  let isOpen = false;

  function openDrawer() {
    if (isOpen) return;
    isOpen = true;
    menuBtn.setAttribute('aria-expanded', 'true');

    // Show backdrop
    backdrop.classList.remove('pointer-events-none');
    gsap.to(backdrop, { opacity: 1, duration: 0.3, ease: 'power2.out' });

    // Slide drawer in from right
    gsap.to(drawer, {
      x: 0,
      duration: 0.38,
      ease: 'power3.out',
    });

    // Morph hamburger → X
    gsap.to(hamLines[0], { rotation: 45, y: 8, duration: 0.3, ease: 'power2.inOut' });
    gsap.to(hamLines[1], { opacity: 0, duration: 0.15 });
    gsap.to(hamLines[2], { rotation: -45, y: -8, width: 24, duration: 0.3, ease: 'power2.inOut' });

    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!isOpen) return;
    isOpen = false;
    menuBtn.setAttribute('aria-expanded', 'false');

    // Slide drawer out to right
    gsap.to(drawer, {
      x: '100%',
      duration: 0.32,
      ease: 'power3.in',
    });

    // Fade backdrop out
    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: () => backdrop.classList.add('pointer-events-none'),
    });

    // Restore hamburger
    gsap.to(hamLines[0], { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut', clearProps: 'transform' });
    gsap.to(hamLines[1], { opacity: 1, duration: 0.2 });
    gsap.to(hamLines[2], { rotation: 0, y: 0, width: 16, duration: 0.3, ease: 'power2.inOut', clearProps: 'transform' });

    document.body.style.overflow = '';
  }

  // Event bindings
  menuBtn.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close on any drawer link click
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeDrawer();
  });

  // Close drawer if window resizes to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isOpen) closeDrawer();
  });
}