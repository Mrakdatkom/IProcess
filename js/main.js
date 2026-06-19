// js/main.js
import gsap from "../vendor/gsap/index.js";
import { ScrollTrigger } from "../vendor/gsap/ScrollTrigger.js";
import { ScrollSmoother } from "../vendor/gsap/ScrollSmoother.js";

// Import your animation functions (you'll create these next)
import { animateHero } from "./animations/hero.js";
import { animateAbout } from "./animations/about.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

async function loadSection(snippetPath, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  try {
    const res = await fetch(snippetPath);
    const html = await res.text();
    target.innerHTML = html;
  } catch (err) {
    console.error(`Could not load section "${snippetPath}":`, err);
  }
}

async function init() {
  // Load all sections
  await Promise.all([
    loadSection("sections/hero.html", "section-hero"),
    loadSection("sections/about.html", "section-about"),
  ]);

  // Initialize ScrollSmoother
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    effects: true,
  });

  // Kick off animations
  animateHero();
  animateAbout();
}

document.addEventListener("DOMContentLoaded", init);