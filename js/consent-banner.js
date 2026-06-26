/**
 * js/consent-banner.js
 *
 * Controls the site-wide data privacy consent banner.
 *
 * BEHAVIOUR:
 *   - On first visit: banner slides up from the bottom after a short delay.
 *   - Accept: stores 'iprocess_consent=accepted' in localStorage, slides banner down.
 *   - Decline: stores 'iprocess_consent=declined' in localStorage, slides banner down.
 *     No redirect. No page block. User can still browse freely.
 *   - On any subsequent visit: banner never appears again (choice already stored).
 *
 * USAGE:
 *   Import and call initConsentBanner() from your main.js,
 *   or add a <script type="module"> tag on each page that includes the banner.
 *
 *   import { initConsentBanner } from '/js/consent-banner.js';
 *   initConsentBanner();
 *
 * RE-SHOWING THE BANNER (for testing):
 *   Run in browser console: localStorage.removeItem('iprocess_consent');
 *   Then refresh the page.
 */

const STORAGE_KEY = 'iprocess_consent';
const SHOW_DELAY_MS = 800; // slight delay so banner doesn't pop immediately on load

export function initConsentBanner() {
  // Already decided — don't show again
  if (localStorage.getItem(STORAGE_KEY)) return;

  const banner = document.getElementById('consent-banner');
  const acceptBtn = document.getElementById('consent-accept');
  const declineBtn = document.getElementById('consent-decline');

  if (!banner || !acceptBtn || !declineBtn) return;

  // ── Show banner after delay ──────────────────────────────────────────────
  const showTimer = setTimeout(() => {
    // Remove translate-y-full to slide up
    banner.classList.remove('translate-y-full');
  }, SHOW_DELAY_MS);

  // ── Dismiss helper ───────────────────────────────────────────────────────
  function dismiss(choice) {
    clearTimeout(showTimer);

    // Slide back down
    banner.classList.add('translate-y-full');

    // Store choice — banner won't appear again
    localStorage.setItem(STORAGE_KEY, choice);

    // Remove from tab order after transition completes
    banner.addEventListener('transitionend', () => {
      banner.setAttribute('aria-hidden', 'true');
      banner.style.pointerEvents = 'none';
    }, { once: true });
  }

  // ── Accept ───────────────────────────────────────────────────────────────
  acceptBtn.addEventListener('click', () => {
    dismiss('accepted');
  });

  // ── Decline ──────────────────────────────────────────────────────────────
  // No redirect, no page block — just records the choice and hides the banner.
  declineBtn.addEventListener('click', () => {
    dismiss('declined');
  });

  // ── Keyboard: close on Escape ────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !banner.classList.contains('translate-y-full')) {
      dismiss('declined');
    }
  }, { once: true });
}

/**
 * Utility: check if the user has accepted consent.
 * Use this to gate non-essential scripts (analytics, etc.)
 *
 * Example:
 *   if (hasConsented()) { initAnalytics(); }
 */
export function hasConsented() {
  return localStorage.getItem(STORAGE_KEY) === 'accepted';
}

/**
 * Utility: get the raw stored value ('accepted' | 'declined' | null).
 */
export function getConsentStatus() {
  return localStorage.getItem(STORAGE_KEY);
}