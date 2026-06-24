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
import { animateFranchiseMerchant } from "./animations/franchise-merchant.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother = null; // Store smoother globally

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
  smoother = createSmoothScroller();

  // Store smoother globally for drawer links
  window._smoother = smoother;

  // ─── DELEGATED CLICK HANDLER FOR NAV LINKS INSIDE SMOOTH-CONTENT ───
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

  // ─── HANDLE DRAWER LINKS (outside smooth-content) ──────────────────────
  // This listens for clicks on [data-section] elements anywhere on the page
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-section]');
    if (!target) return;

    // Check if the link is inside the drawer
    const drawer = document.getElementById('mobile-drawer');
    if (drawer && drawer.contains(target) && smoother) {
      const sectionId = target.dataset.section;
      if (sectionId) {
        e.preventDefault();
        smoother.scrollTo(`#${sectionId}`, true, 'center center');

        // Close the drawer after clicking
        const closeBtn = document.getElementById('drawer-close-btn');
        if (closeBtn) closeBtn.click();
      }
    }
  });

  // ─── FALLBACK: Direct event binding for hero links (if they exist) ───
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
    ["/sections/franchise-merchant.html", "section-franchise-merchant", animateFranchiseMerchant],
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
  const footerLinks = document.querySelectorAll('.footer-service-link');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const serviceId = link.dataset.service;
      if (!serviceId) return;

      // Scroll to the Services section first
      if (smoother) {
        smoother.scrollTo('#section-services', true, 'center center');
      }

      // Then activate the service after a small delay
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

  // ─── SETUP DRAWER LINKS (additional safety) ────────────────────────────
  // This ensures drawer links work even if they're added after the initial load
  function setupDrawerLinks() {
    const drawerLinks = document.querySelectorAll('#mobile-drawer [data-section]');
    drawerLinks.forEach(link => {
      // Only add listener if not already added (avoid duplicates)
      if (!link.dataset.drawerListener) {
        link.dataset.drawerListener = 'true';
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const sectionId = link.dataset.section;
          if (sectionId && smoother) {
            smoother.scrollTo(`#${sectionId}`, true, 'center center');

            // Close the drawer
            const closeBtn = document.getElementById('drawer-close-btn');
            if (closeBtn) closeBtn.click();
          }
        });
      }
    });
  }

  // Run immediately and also after a delay to catch any late-added links
  setTimeout(setupDrawerLinks, 100);
  setTimeout(setupDrawerLinks, 500);
}

document.addEventListener("DOMContentLoaded", init);