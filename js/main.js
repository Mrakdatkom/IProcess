// js/main.js
import gsap from "../public/vendor/gsap/index.js";
import { ScrollTrigger } from "../public/vendor/gsap/ScrollTrigger.js";
import { ScrollSmoother } from "../public/vendor/gsap/ScrollSmoother.js";

// Import your animation functions (you'll create these next)
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
    smooth: 0.65,
    effects: false,
  });
}

function refreshScroll() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

async function init() {
  const heroLoaded = await loadSection("/sections/hero.html", "section-hero");
  const smoother = createSmoothScroller();

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
}

document.addEventListener("DOMContentLoaded", init);
