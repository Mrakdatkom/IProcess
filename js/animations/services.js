/**
 * js/animations/services.js
 *
 * INTERACTION — hover/click on a service item:
 *   - Title: dims → active (full accent color, slight indent)
 *   - Number: dims → primary color
 *   - Arrow: fades in + nudges right on active
 *   - Key points: max-h:0 + opacity:0 → expanded + opacity:1 (CSS transition)
 *   - Right panel: instantly swaps image (no fade)
 *
 * SCROLL ENTRANCE:
 *   - Header slides up
 *   - Service items stagger in from left
 *   - Right panel fades in from right
 *
 * IMAGE PATHS (update when real images are ready):
 *   ../images/services/business-process-consulting.jpg
 *   ../images/services/liaison-services.jpg
 *   ../images/services/project-management.jpg
 *   ../images/services/change-management.jpg
 *   ../images/services/training-development.jpg
 */

import gsap from "../../public/vendor/gsap/index.js";
import { ScrollTrigger } from "../../public/vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

// ── Service data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: '1',
    label: 'Business Process Consulting',
    image: '../../images/services/business-process-consulting.png',
  },
  {
    id: '2',
    label: 'Liaison Services',
    image: '../../images/services/liaison-services.png',
  },
  {
    id: '3',
    label: 'Project Management',
    image: '../../images/services/project-management.png',
  },
  {
    id: '4',
    label: 'Change Management',
    image: '../../images/services/change-management.png',
  },
  {
    id: '5',
    label: 'Training and Development',
    image: '../../images/services/training-and-development.png',
  },
];

// ── Preload all images ──────────────────────────────────────────────────────
function preloadImages() {
  SERVICES.forEach(({ image }) => {
    if (image && image !== '') {
      const img = new Image();
      img.src = image;
    }
  });
}

export function animateServices() {

  // --- Preload images to speed up transitions ---
  preloadImages();

  const items = document.querySelectorAll('.service-item');
  const imageEl = document.getElementById('services-image');
  const placeholder = document.getElementById('services-img-placeholder');
  const imgLabel = document.getElementById('services-img-label');
  const activeLabel = document.getElementById('services-active-label');
  const countEl = document.getElementById('services-count-current');
  const dots = document.querySelectorAll('.service-dot');

  if (!items.length) return;

  // ── Activate first item on load ───────────────────────────────────────────
  activateService('1', false);

  // ── Bind hover (desktop) + click (mobile/keyboard) ────────────────────────
  items.forEach(item => {
    item.addEventListener('mouseenter', () => activateService(item.dataset.service, true));
    item.addEventListener('click', () => activateService(item.dataset.service, true));
  });

  // ── activateService ───────────────────────────────────────────────────────
  function activateService(id, animate) {
    const data = SERVICES.find(s => s.id === id);
    if (!data) return;

    items.forEach(item => {
      const isActive = item.dataset.service === id;
      const points = item.querySelector('.service-points');
      const arrow = item.querySelector('.service-arrow');

      // ── Key points: expand/collapse via max-h + opacity ──
      if (points) {
        if (isActive) {
          // Measure natural height then animate to it
          points.style.maxHeight = points.scrollHeight + 'px';
          points.classList.remove('opacity-0');
          points.classList.add('opacity-100');
        } else {
          points.style.maxHeight = '0px';
          points.classList.add('opacity-0');
          points.classList.remove('opacity-100');
        }
      }

      // ── Arrow ──
      if (arrow) {
        if (isActive) {
          arrow.classList.remove('opacity-0', 'translate-x-0');
          arrow.classList.add('opacity-100', 'text-black', 'translate-x-1');
        } else {
          arrow.classList.add('opacity-0', 'translate-x-0');
          arrow.classList.remove('opacity-100', 'text-black', 'translate-x-1');
        }
      }
    });

    // ── Right panel: instantly swap image (no fade) ──────────────────────
    updateRightPanel(data);

    // ── Progress dots + counter ───────────────────────────────────────────
    const idx = parseInt(id);
    dots.forEach((dot, i) => {
      const isActiveDot = i + 1 === idx;
      dot.classList.toggle('bg-primary', isActiveDot);
      dot.classList.toggle('w-5', isActiveDot);
      dot.classList.toggle('bg-accent/20', !isActiveDot);
      dot.classList.toggle('w-2', !isActiveDot);
    });

    if (countEl) countEl.textContent = id.padStart(2, '0');
  }

  // ── updateRightPanel ──────────────────────────────────────────────────────
  function updateRightPanel(data) {
    if (activeLabel) activeLabel.textContent = data.label;
    if (imgLabel) imgLabel.textContent = data.label;

    if (!imageEl) return;

    const hasImage = data.image && data.image !== '';

    // ─── INSTANT SWAP: No fade animations ──────────────────────────────────
    if (hasImage) {
      // Instantly swap the image
      imageEl.src = data.image;
      imageEl.alt = data.label;
      imageEl.style.opacity = '1';

      // Hide placeholder immediately
      if (placeholder) placeholder.style.opacity = '0';

      // Handle image loading errors
      imageEl.onerror = () => {
        // If image fails to load, show placeholder
        imageEl.style.opacity = '0';
        if (placeholder) placeholder.style.opacity = '1';
      };
    } else {
      // No image — show placeholder
      imageEl.style.opacity = '0';
      if (placeholder) placeholder.style.opacity = '1';
      if (imgLabel) imgLabel.textContent = data.label;
    }
  }

  // ── SCROLL ENTRANCE ───────────────────────────────────────────────────────
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  // Header
  gsap.from('#services-header', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    clearProps: 'transform',
    scrollTrigger: {
      trigger: '#services',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Service items stagger from left
  gsap.from('.service-item', {
    x: -28,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out',
    clearProps: 'transform',
    scrollTrigger: {
      trigger: '#services-list',
      start: 'top 82%',
      toggleActions: 'play none none none',
    },
  });

  // Right panel fades in from right
  gsap.from('#services-image, #services-img-placeholder', {
    x: 32,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    clearProps: 'transform',
    scrollTrigger: {
      trigger: '#services',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}