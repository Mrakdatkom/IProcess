/**
 * js/animations/choose-us.js
 *
 * ENTRANCE (ScrollTrigger):
 *   - Section header fades + slides up
 *   - Bento cards stagger in with a slight scale + fade from below
 *
 * COUNTER ANIMATION:
 *   - Numeric stat values count up when scrolled into view
 *   - Handles formats: "500+", "1M+", "99.9%", "24/7", "5+", "50+", "10+"
 *
 * SCRAMBLE ANIMATION:
 *   - "1M+" gets a unique random character scramble effect
 *
 * Call animateChooseUs() after the section partial is injected.
 */

import { gsap } from '../../vendor/gsap/index.js';
import { ScrollTrigger } from "../../vendor/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export function animateChooseUs() {

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Snap visible if reduced motion ────────────────────────────────────────
  if (reducedMotion) {
    gsap.set(['#choose-header', '.choose-card'], { clearProps: 'all' });
    return;
  }

  // ── Section header entrance ───────────────────────────────────────────────
  gsap.from('#choose-header', {
    y: 36,
    opacity: 0,
    duration: 0.75,
    ease: 'power3.out',
    clearProps: 'transform',
    scrollTrigger: {
      trigger: '#choose-us',
      start: 'top 78%',
      toggleActions: 'play none none none',
    },
  });

  // ── Bento cards stagger in ────────────────────────────────────────────────
  const cardOrder = [
    '#choose-card-1',
    '#choose-card-3',
    '#choose-card-5',
    '#choose-card-2',
    '#choose-card-4',
    '#choose-card-6',
    '#choose-card-7',
  ];

  gsap.from(cardOrder, {
    y: 40,
    opacity: 0,
    scale: 0.97,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
    clearProps: 'transform',
    scrollTrigger: {
      trigger: '#choose-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // ── Counter animations for regular cards ──────────────────────────────────
  const counters = [
    { id: '#choose-card-1', target: 5, suffix: '+', decimals: 0 },
    { id: '#choose-card-2', target: 10, suffix: '+', decimals: 0 },
    { id: '#choose-card-3', target: 500, suffix: '+', decimals: 0 },
    { id: '#choose-card-5', target: 50, suffix: '+', decimals: 0 },
    { id: '#choose-card-6', target: 99.9, suffix: '%', decimals: 1 },
    { id: '#choose-card-7', target: 24, suffix: '/7', decimals: 0 },
  ];

  counters.forEach(({ id, target, suffix, decimals }) => {
    const card = document.querySelector(id);
    if (!card) return;

    const statEl = card.querySelector('.font-text-numbers');
    if (!statEl) return;

    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate() {
        statEl.textContent = obj.val.toFixed(decimals) + suffix;
      },
      onComplete() {
        statEl.textContent = target.toFixed(decimals) + suffix;
      },
    });
  });

  // ── SCRAMBLE ANIMATION for Card 4 (1M+) ──────────────────────────────────
  const card4 = document.querySelector('#choose-card-4');
  if (card4) {
    const statEl = card4.querySelector('.font-banner');
    if (statEl) {
      // The final text we want to display
      const finalText = '1M+';
      // Characters to scramble through (numbers, letters, symbols)
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=<>?/';

      // Store the original text
      const originalText = statEl.textContent;

      // Scramble function
      function scrambleText(element, finalString, duration = 2.0) {
        const startTime = Date.now();
        const length = finalString.length;

        // Create array of random characters
        function getRandomChar() {
          return chars[Math.floor(Math.random() * chars.length)];
        }

        function updateScramble() {
          const elapsed = (Date.now() - startTime) / 1000;
          const progress = Math.min(elapsed / duration, 1);

          // Ease function for smoother transition
          const easeProgress = 1 - Math.pow(1 - progress, 3);

          // Determine how many characters should be revealed
          const revealCount = Math.floor(easeProgress * length);

          let result = '';
          for (let i = 0; i < length; i++) {
            if (i < revealCount) {
              // Show final character
              result += finalString[i];
            } else {
              // Show random character
              result += getRandomChar();
            }
          }

          element.textContent = result;

          if (progress < 1) {
            requestAnimationFrame(updateScramble);
          } else {
            // Final reveal
            element.textContent = finalString;
          }
        }

        // Start the scramble
        requestAnimationFrame(updateScramble);
      }

      // Trigger the scramble when the card scrolls into view
      ScrollTrigger.create({
        trigger: card4,
        start: 'top 85%',
        toggleActions: 'play none none none',
        onEnter: () => {
          // Reset to random characters first
          let temp = '';
          for (let i = 0; i < finalText.length; i++) {
            temp += chars[Math.floor(Math.random() * chars.length)];
          }
          statEl.textContent = temp;

          // Start the scramble animation
          scrambleText(statEl, finalText, 1.0);
        }
      });
    }
  }
}