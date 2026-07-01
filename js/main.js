// js/main.js
import gsap from "../public/vendor/gsap/index.js";
import { ScrollTrigger } from "../public/vendor/gsap/ScrollTrigger.js";
import { ScrollSmoother } from "../public/vendor/gsap/ScrollSmoother.js";

// Import animation functions
import { animateHero } from "./animations/hero.js";
import { animateAbout } from "./animations/about.js";
import { animateChooseUs } from "./animations/choose-us.js";
import { animateServices } from "./animations/services.js";
import { animatePartners } from "./animations/partners.js";
import { animateFooter } from "./animations/footer.js";
import { animateFranchiseMerchant } from "./animations/franchise-merchant.js";
import { animateProof } from "./animations/proof.js";
import { animateMap } from "./animations/map.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother = null;

// ── SECTION LOADER ──
async function loadSection(snippetPath, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return false;
  try {
    const res = await fetch(snippetPath);
    const html = await res.text();
    target.innerHTML = html;
    return true;
  } catch (err) {
    console.warn(`Could not load section "${snippetPath}":`, err);
    return false;
  }
}

// ── SCROLLSMOTHER CREATOR ──
function createSmoothScroller() {
  return ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1,
    effects: true,
  });
}

function refreshScroll() {
  if (smoother) {
    smoother.refresh();
  }
  ScrollTrigger.refresh();
}

// ── SMOOTH SCROLL TO SECTION ──
function scrollToSection(targetId) {
  if (!smoother) {
    console.warn('ScrollSmoother not initialized');
    return;
  }

  const targetElement = document.getElementById(targetId) || document.querySelector(`#${targetId}`);

  if (targetElement) {
    smoother.scrollTo(targetElement, true, 'center center');
  } else {
    console.warn(`Section "${targetId}" not found`);
  }
}

// ── INIT ──
async function init() {
  // Check which page we're on
  const isHomepage = document.getElementById('section-hero') !== null;
  const isFranchisePage = document.getElementById('franchise') !== null;
  const isMerchantPage = document.getElementById('merchant') !== null;
  const idBdoPage = document.getElementById('bdo') !== null;

  // ── For Homepage ──
  if (isHomepage) {
    // Load hero first
    const heroLoaded = await loadSection("/sections/hero.html", "section-hero");
    smoother = createSmoothScroller();
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

    // ─── HANDLE DRAWER LINKS ──────────────────────────────────────────────
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-section]');
      if (!target) return;

      const drawer = document.getElementById('mobile-drawer');
      if (drawer && drawer.contains(target) && smoother) {
        const sectionId = target.dataset.section;
        if (sectionId) {
          e.preventDefault();
          smoother.scrollTo(`#${sectionId}`, true, 'center center');

          const closeBtn = document.getElementById('drawer-close-btn');
          if (closeBtn) closeBtn.click();
        }
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
      ["/sections/proof.html", "section-proof", animateProof],
      ["/sections/map.html", "section-map", animateMap],
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

    // ─── HANDLE FOOTER SERVICE LINKS ──────────────────────────────────────
    const footerLinks = document.querySelectorAll('.footer-service-link');
    footerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        const serviceId = link.dataset.service;
        if (!serviceId) return;

        if (smoother) {
          smoother.scrollTo('#section-services', true, 'center center');
        }

        setTimeout(() => {
          if (window.activateService) {
            window.activateService(serviceId, true);
          } else {
            const serviceItem = document.querySelector(`.service-item[data-service="${serviceId}"]`);
            if (serviceItem) {
              serviceItem.click();
            }
          }
        }, 400);
      });
    });

    // ─── SETUP DRAWER LINKS ──────────────────────────────────────────────
    function setupDrawerLinks() {
      const drawerLinks = document.querySelectorAll('#mobile-drawer [data-section]');
      drawerLinks.forEach(link => {
        if (!link.dataset.drawerListener) {
          link.dataset.drawerListener = 'true';
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            if (sectionId && smoother) {
              smoother.scrollTo(`#${sectionId}`, true, 'center center');

              const closeBtn = document.getElementById('drawer-close-btn');
              if (closeBtn) closeBtn.click();
            }
          });
        }
      });
    }

    setTimeout(setupDrawerLinks, 100);
    setTimeout(setupDrawerLinks, 500);
  }

  // ── For Franchise Page ──
  else if (isFranchisePage) {
    console.log('Franchise page detected - initializing ScrollSmoother');

    smoother = createSmoothScroller();
    window._smoother = smoother;

    // Handle all internal links (Benefits, Requirements, Packages, Contact)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const targetId = href.replace('#', '');
          const targetElement = document.getElementById(targetId);
          if (targetElement && smoother) {
            smoother.scrollTo(targetElement, true, 'center center');
          }
        }
      });
    });

    // Handle package CTA buttons specifically
    const packageButtons = document.querySelectorAll('#packages a[href="#contact"]');
    packageButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection && smoother) {
          smoother.scrollTo(contactSection, true, 'center center');
        }
      });
    });

    // Handle Gold package "Apply for Gold" - it uses a Google Form link, so we skip it
    // But we need to handle the "Get Started" buttons that point to #contact

    // Animate franchise section
    if (typeof animateFranchiseMerchant === 'function') {
      animateFranchiseMerchant();
    }

    refreshScroll();

    // Extra safety: refresh after images load
    window.addEventListener('load', () => {
      if (smoother) smoother.refresh();
    });
  }

  // ── For Merchant Page ──
  else if (isMerchantPage) {
    console.log('Merchant page detected - initializing ScrollSmoother');

    smoother = createSmoothScroller();
    window._smoother = smoother;

    // Handle internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const targetId = href.replace('#', '');
          const targetElement = document.getElementById(targetId);
          if (targetElement && smoother) {
            smoother.scrollTo(targetElement, true, 'center center');
          }
        }
      });
    });

    if (typeof animateFranchiseMerchant === 'function') {
      animateFranchiseMerchant();
    }

    refreshScroll();

    window.addEventListener('load', () => {
      if (smoother) smoother.refresh();
    });
  }

  // ── For BDO Page ──
  else if (idBdoPage) {
    console.log('BDO Page detected - initializing ScrollSmoother');

    smoother = createSmoothScroller();
    window._smoother = smoother;

    // Handle internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const targetId = href.replace('#', '');
          const targetElement = document.getElementById(targetId);
          if (targetElement && smoother) {
            smoother.scrollTo(targetElement, true, 'center center');
          }
        }
      });
    });

    refreshScroll();

    window.addEventListener('load', () => {
      if (smoother) smoother.refresh();
    });
  }
}

document.addEventListener("DOMContentLoaded", init);