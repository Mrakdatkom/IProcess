/**
 * js/animations/hero.js
 *
 * DEPTH ILLUSION EFFECT
 * ─────────────────────
 * Three z-layers:
 *   z-0   #hero-bg  — sky + upper buildings
 *   z-10  #hero-text / h1 words — headline
 *   z-20  #hero-fg  — lower building facades (overlaps the text)
 *
 * PAGE LOAD sequence:
 *   1. BG fades in
 *   2. Each word slides up from behind the FG layer (masked by overflow:hidden spans)
 *   3. FG layer fades + slides in last, overlapping the text for the depth reveal
 *   4. Nav drops in
 *   5. CTA fades up
 *
 * ON SCROLL (ScrollTrigger):
 *   - Headline scales up + fades out as user scrolls
 *   - FG layer slides down slightly (parallax), deepening the illusion
 *   - BG layer moves at a slower parallax rate
 *
 * Requires: gsap + ScrollTrigger (both available in vendor/gsap)
 */

import { gsap } from '../../public/vendor/gsap/index.js';
import { ScrollTrigger } from "../../public/vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export function animateHero() {

  // ── Reduced motion: skip everything, show immediately ──────────────────
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set([
      '#hero-bg', '#hero-fg', '#hero-text', '.word-inner',
      '#hero-nav', '#hero-logo', '.nav-link', '#hero-nav-cta', '#hero-cta',
    ], { clearProps: 'all' });
    initMobileMenu();
    return;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // PAGE LOAD ENTRANCE
  // ═══════════════════════════════════════════════════════════════════════

  // Set initial states
  gsap.set('#hero-bg', { opacity: 0 });
  gsap.set('#hero-fg', { opacity: 0, y: 40 });
  gsap.set('.word-inner', { yPercent: 110 });           // start below the overflow clip
  gsap.set('#hero-nav', { y: -24, opacity: 0 });
  gsap.set('#hero-cta', { y: 20, opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl
    // 1. BG fades in first — establishes the scene
    .to('#hero-bg', {
      opacity: 1,
      duration: 1.0,
    })

    // 2. Words slide UP through the overflow clip — one by one
    .to('#hero-word-1 .word-inner', {
      yPercent: 0,
      duration: 0.75,
      ease: 'power4.out',
    }, '-=0.4')
    .to('#hero-word-2 .word-inner', {
      yPercent: 0,
      duration: 0.75,
      ease: 'power4.out',
    }, '-=0.55')
    .to('#hero-word-3 .word-inner', {
      yPercent: 0,
      duration: 0.80,
      ease: 'power4.out',
    }, '-=0.55')

    // 3. FG layer slides in — overlaps the text, creating the depth reveal
    .to('#hero-fg', {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power2.out',
    }, '-=0.5')

    // 4. Nav drops in
    .to('#hero-nav', {
      y: 0,
      opacity: 1,
      duration: 0.55,
    }, '-=0.6')

    // 5. CTA rises up
    .to('#hero-cta', {
      y: 0,
      opacity: 1,
      duration: 0.5,
    }, '-=0.3');

  // Stagger nav links within the nav reveal
  tl.from('.nav-link', {
    y: -8,
    opacity: 0,
    stagger: 0.06,
    duration: 0.35,
    ease: 'power2.out',
    clearProps: 'transform',
  }, '-=0.4');

  // ═══════════════════════════════════════════════════════════════════════
  // SCROLL ANIMATION
  // Text scales up + fades out; layers parallax at different rates
  // ═══════════════════════════════════════════════════════════════════════

  const heroEl = document.getElementById('hero');

  // Headline: scale up + fade out as buildings "close in"
  gsap.to('#hero-text', {
    scale: 1.18,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: heroEl,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
    },
  });

  // FG layer: slides DOWN on scroll (closer to viewer = moves more)
  gsap.to('#hero-fg', {
    y: 60,
    ease: 'none',
    scrollTrigger: {
      trigger: heroEl,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });

  // BG layer: slides UP on scroll (further away = moves less) — subtle parallax
  gsap.to('#hero-bg', {
    y: -35,
    ease: 'none',
    scrollTrigger: {
      trigger: heroEl,
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
    },
  });

  // CTA fades out quicker on scroll (it's in the foreground zone)
  gsap.to('#hero-cta', {
    opacity: 0,
    y: 12,
    ease: 'none',
    scrollTrigger: {
      trigger: heroEl,
      start: 'top top',
      end: '30% top',
      scrub: 1,
    },
  });

  // ═══════════════════════════════════════════════════════════════════════
  // MOBILE MENU
  // ═══════════════════════════════════════════════════════════════════════
  initMobileMenu();
}

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerLines = document.querySelectorAll('.hamburger-line');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, #mobile-menu a[href="#contact"]');

  function openMobileMenu() {
    mobileMenu.classList.remove('pointer-events-none');
    gsap.to(mobileMenu, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.from(mobileLinks, {
      y: 18, opacity: 0, stagger: 0.07, duration: 0.38,
      ease: 'power2.out', clearProps: 'transform',
    });
    gsap.to(hamburgerLines[0], { rotation: 45, y: 8, duration: 0.3, ease: 'power2.inOut' });
    gsap.to(hamburgerLines[1], { opacity: 0, duration: 0.2 });
    gsap.to(hamburgerLines[2], { rotation: -45, y: -8, duration: 0.3, ease: 'power2.inOut' });
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    gsap.to(mobileMenu, {
      opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => mobileMenu.classList.add('pointer-events-none'),
    });
    gsap.to(hamburgerLines[0], { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut', clearProps: 'transform' });
    gsap.to(hamburgerLines[1], { opacity: 1, duration: 0.2 });
    gsap.to(hamburgerLines[2], { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut', clearProps: 'transform' });
    document.body.style.overflow = '';
  }

  mobileMenuBtn?.addEventListener('click', openMobileMenu);
  mobileCloseBtn?.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
}