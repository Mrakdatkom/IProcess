// js/main.js
import gsap from "../public/vendor/gsap/index.js";
import { ScrollTrigger } from "../public/vendor/gsap/ScrollTrigger.js";
import { ScrollSmoother } from "../public/vendor/gsap/ScrollSmoother.js";

// Import your animation functions
import { animateHero } from "./animations/hero.js";
import { animateAbout } from "./animations/about.js";
import { animateChooseUs } from "./animations/choose-us.js";
import { animatePartners } from "./animations/partners.js";
import { animateServices } from "./animations/services.js";
import { animateFooter } from "./animations/footer.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

async function loadSection(snippetPath, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return false;
  try {
    const res = await fetch(snippetPath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    target.innerHTML = html;
    return true;
  } catch (err) {
    console.error(`Could not load section "${snippetPath}":`, err);
    return false;
  }
}

function createSmoothScroller() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsFinePointer = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;

  if (reducedMotion || !supportsFinePointer) return null;

  return ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: false,
  });
}

function refreshScroll() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

async function init() {
  // Load hero first
  const heroLoaded = await loadSection("/sections/hero.html", "section-hero");
  const smoother = createSmoothScroller();

  // ─── DELEGATED CLICK HANDLER FOR ALL NAV LINKS ───
  // This works for both hero and footer links, regardless of when they're loaded
  const smoothContent = document.getElementById('smooth-content');
  if (smoothContent && smoother) {
    smoothContent.addEventListener('click', (e) => {
      const target = e.target.closest('[data-section]');
      if (!target) return;

      const sectionId = target.dataset.section;
      if (sectionId) {
        e.preventDefault();
        smoother.scrollTo(`#${sectionId}`, true, 'center center');
      }
    });
  }

  // ─── FALLBACK: Direct event binding for hero links (if they exist) ───
  // This ensures hero links work immediately while the delegated listener also handles them
  const sectionMap = {
    'hero-link': 'section-hero',
    'partners-link': 'section-partners',
    'about-link': 'section-about',
    'services-link': 'section-services',
  };

  Object.entries(sectionMap).forEach(([buttonId, sectionId]) => {
    const btn = document.getElementById(buttonId);
    if (btn && smoother) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        smoother.scrollTo(`#${sectionId}`, true, 'center center');
      });
    }
  });

  // ─── LOAD SECTIONS AND ANIMATE ───
  if (heroLoaded) {
    animateHero();
    refreshScroll();
  }

  const partnersLoaded = await loadSection("/sections/partners.html", "section-partners");
  if (partnersLoaded) {
    animatePartners();
    refreshScroll();
  }

  const remainingSections = [
    ["/sections/about.html", "section-about", animateAbout],
    ["/sections/choose-us.html", "section-choose-us", animateChooseUs],
    ["/sections/services.html", "section-services", animateServices],
    ["/sections/footer.html", "section-footer", animateFooter],
  ];

  for (const [path, targetId, animate] of remainingSections) {
    const loaded = await loadSection(path, targetId);
    if (loaded) {
      animate();
      refreshScroll();
    }
  }

  if (smoother) smoother.refresh();

  // ─── HANDLE FOOTER SERVICE LINKS ────────────────────────────────────────
  // Wait for footer to load, then bind click events
  const footerLinks = document.querySelectorAll('.footer-service-link');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const serviceId = link.dataset.service;
      if (!serviceId) return;
      
      // Scroll to the Services section first
      const servicesSection = document.getElementById('section-services');
      if (servicesSection && smoother) {
        smoother.scrollTo('#section-services', true, 'center center');
      }
      
      // Then activate the service after a small delay
      // (to allow the scroll animation to start)
      setTimeout(() => {
        if (window.activateService) {
          window.activateService(serviceId, true);
        } else {
          // Fallback: try to find and click the service item
          const serviceItem = document.querySelector(`.service-item[data-service="${serviceId}"]`);
          if (serviceItem) {
            serviceItem.click();
          }
        }
      }, 400);
    });
  });
}

document.addEventListener("DOMContentLoaded", init);