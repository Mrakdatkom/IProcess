import gsap from "../../vendor/gsap/index.js";

export function animateHero() {
  gsap.from("#hero h1", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
  });
}