/**
 * js/animations/about.js
 *
 * Handles the interactive year timeline in the About / History section.
 *
 * INTERACTIONS:
 *   - Hover OR click on a year → instantly swap image, ghost year, description
 *   - Active year: full opacity label, visible tick line, sublabel shown
 *   - Inactive years: muted (text-gray-500)
 *   - Desktop: vertical left-side list with a sliding marker line
 *   - Mobile: horizontal scrolling row of year buttons
 *
 * ENTRANCE (ScrollTrigger):
 *   - Header fades + slides up on scroll into view
 *   - Content panel fades in from right
 *   - (Year buttons are NOT animated on entry – they are visible immediately)
 *
 * Call animateAbout() after the about partial is injected into the DOM.
 */

import { gsap } from '../../public/vendor/gsap/index.js';
import { ScrollTrigger } from '../../public/vendor/gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

// ── Timeline data ────────────────────────────────────────────────────────────
const TIMELINE = [
  {
    year: '2021',
    sublabel: 'Where It Started',
    image: '../images/history/2021.jpg',
    description: `In 2021, the iProcess business layout carried a grassroots, highly functional, and foundational aesthetic. The focus during this initial stage was pure community onboarding, meaning the hub physically looked like a classic "one-stop-shop" merchant booth nestled inside a busy local neighborhood. It relied heavily on clear, bold, printed signs and large banners to teach passing foot traffic exactly what a "Liaison & Consultancy" business center actually did. The technology setup inside was straightforward and desktop-heavy, typically featuring a standard computer monitor, a basic thermal receipt printer, and an early-model mPOS terminal. Transactions were highly manual and centered around physical paperwork assistance, courier handling, and direct cash-handling for basic bills.`,
  },
  {
    year: '2022',
    sublabel: 'First Partners',
    image: '../images/history/2022.png',
    description: `One year later, the hub had officially integrated into the community's daily habits, transforming the space into a busy, familiar, and locally trusted financial bridge. With the post-pandemic digital boom accelerating across the Philippines, the visual layout evolved away from basic educational signage toward dynamic promotional materials. The walls and storefront windows were covered with bright, colorful stickers and acrylic standees showcasing newly formed partnerships with unified local QR networks (QRph), GCash, and Maya. While cash transactions remained highly popular, the introduction of counter-top QR codes and compact, wireless point-of-sale terminals made the lines move much faster. The interior setup felt like a high-traffic neighborhood commerce link, frequently employing multiple tellers simultaneously to handle the influx of daily walk-ins.`,
  },
  {
    year: '2023',
    sublabel: 'Platform Growth',
    image: '../images/history/2023.png',
    description: `Three years later, the aesthetic underwent a major corporate, clean-cut facelift, shifting toward a sleek, minimalist, and highly secure design language. The messy, colorful sticker-laden storefronts of the past were completely replaced by a professional, minimalist glass facade utilizing clean iconography that closely mirrored the look of a modern digital micro-bank. The physical clutter was stripped away because the local community had already developed a strong familiarity with the brand and deeply trusted the underlying ecosystem. The hardware became intensely touchscreen-forward, leaning on large tablets and sleek, all-in-one POS terminals to handle the heavy lifting. Customers were greeted by professional acrylic QR standees right at the desk, and transactions shifted almost entirely from paper receipts to instantaneous SMS and digital confirmations.`,
  },
  {
    year: '2024',
    sublabel: 'Nationwide Expansion',
    image: '../images/history/2024.png',
    description: `The iProcess hubs experienced a heavy shift toward omni-channel convenience and automated local micro-logistics. The physical layout transformed from a standard walk-in financial office into an active community service node, balancing digital screen interactions with tangible physical handling. Storefronts began implementing dedicated exterior signage and stylized window panels specifically for package drop-offs and logistics fulfillment alongside the standard financial logos. Inside, the counter spaces became hyper-organized, split cleanly between a digital transactional area and a physical storage zone for partner couriers and multi-agency document applications. Hardware upgrades were prominent, featuring the widespread introduction of customer-facing dual-screen monitors that allowed clients to verify their input data in real-time, drastically reducing human error and cementing the hub as a highly efficient neighborhood asset.`,
  },
  {
    year: '2025',
    sublabel: 'New Milestones',
    image: '../images/history/2025.png',
    description: `Traditional, walled-off bank counters were entirely eliminated in favor of sleek, standalone interaction pods that allowed for organic collaboration between staff and clients. The overarching vibe became distinctly high-tech and boundaryless, utilizing interactive LED marquees and translucent smart-film window glass that displayed live data feeds and animated transaction options. Tellers operated via futuristic transparent tablets to seamlessly manage advanced services like cross-border payments and decentralized identity authentication. At the same time, the physical layout maximized convenience by integrating automated smart-locker package pickup points directly into the side of the lounge, completing the ultimate vision of full digital and physical inclusivity.`,
  },
  {
    year: '2026',
    sublabel: 'Today',
    image: '../images/history/2026.png',
    description: `Today, the current generation of iProcess storefronts represents a fully realized smart-hub network operating as a staple of daily digital commerce across regions like Victorias City. The aesthetic is profoundly polished and modern, relying on clean architectural lines, welcoming ambient lighting, and high-contrast digital displays that have completely replaced old paper banners. The layout functions seamlessly with the current cashless landscape, incorporating localized self-service touchscreen kiosks where customers can independently process utility bills, ticket printing, and micro-banking tasks without standing in long teller queues. For complex processes, tellers utilize highly efficient, interconnected tablet systems linked to centralized cloud software, ensuring split-second verification for critical services. The physical space is maximized for automated convenience, frequently showcasing integrated 24/7 smart-locker portals built into the storefront to accommodate round-the-clock neighborhood parcel collection and document retrieval.`,
  },
];

// ── Preload all images ──────────────────────────────────────────────────────
function preloadImages() {
  TIMELINE.forEach(({ image }) => {
    const img = new Image();
    img.src = image;
  });
}

export function animateAbout() {

  // --- Preload images to speed up transitions ---
  preloadImages();

  // --- DOM refs ------------------------------------------------------------
  const buttons = document.querySelectorAll('.year-btn');
  console.log('animateAbout() called, buttons found:', buttons.length);

  const imageEl = document.getElementById('about-image');
  const imageFallBg = document.getElementById('about-image-year-bg');
  const ghostYear = document.getElementById('about-ghost-year');
  const description = document.getElementById('about-description');
  const marker = document.getElementById('about-year-marker');

  if (!buttons.length) return;

  // --- Internal functions --------------------------------------------------

  function swapContent(data) {
    // Instantly swap image (no fade)
    imageEl.src = data.image;
    imageEl.alt = `IProcess ${data.year}`;

    // Fallback ghost bg year
    if (imageFallBg) imageFallBg.textContent = data.year;

    // Ghost year number
    if (ghostYear) ghostYear.textContent = data.year;

    // Description
    if (description) description.textContent = data.description;
  }

  function setActiveYear(year, animate) {
    const data = TIMELINE.find(d => d.year === year);
    if (!data) return;

    // Update all year button styles
    buttons.forEach(btn => {
      const isActive = btn.dataset.year === year;
      const label = btn.querySelector('.year-label');
      const tick = btn.querySelector('.year-tick');
      const sublabel = btn.querySelector('.year-sublabel');

      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');

      if (label) {
        label.classList.toggle('text-primary', isActive);
        label.classList.toggle('font-bold', isActive);
        label.classList.toggle('text-gray-500', !isActive);
      }

      if (tick) {
        tick.classList.toggle('bg-primary', isActive);
        tick.classList.toggle('opacity-100', isActive);
        tick.classList.toggle('opacity-0', !isActive);
        tick.classList.toggle('bg-transparent', !isActive);
      }

      if (sublabel) {
        sublabel.classList.toggle('opacity-100', isActive);
        sublabel.classList.toggle('opacity-0', !isActive);
        if (isActive) sublabel.textContent = data.sublabel;
      }

      // Move the desktop sliding marker
      if (isActive && marker) {
        const btnRect = btn.getBoundingClientRect();
        const listRect = document.getElementById('about-year-list').getBoundingClientRect();
        const offsetTop = btnRect.top - listRect.top;
        gsap.to(marker, {
          top: offsetTop,
          height: btnRect.height,
          duration: 0.4,
          ease: 'power3.out',
        });
      }
    });

    // ─── INSTANT SWAP: No fade in/out ──────────────────────────────────────
    // Just swap the content immediately without opacity animations
    swapContent(data);
  }

  // --- Initialise: set first year active after a tiny delay ---------------
  setTimeout(() => setActiveYear('2021', false), 50);

  // --- Bind hover + click events -------------------------------------------
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => setActiveYear(btn.dataset.year, true));
    btn.addEventListener('click', () => setActiveYear(btn.dataset.year, true));
  });

  // --- SCROLL ENTRANCE (only header and content panel) ---------------------
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  // Header fade + slide up
  gsap.from('#about-header', {
    y: 32,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    clearProps: 'transform',
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Content panel fades in from right
  gsap.from('#about-content', {
    x: 28,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    clearProps: 'transform',
    scrollTrigger: {
      trigger: '#about-content',
      start: 'top 82%',
      toggleActions: 'play none none none',
    },
  });
}