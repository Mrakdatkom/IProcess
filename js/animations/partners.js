import gsap from "../../public/vendor/gsap/index.js";

// --- horizontalLoop (unchanged, works with any number of items) ---
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => tl.totalProgress(1)
  }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;

  gsap.set(items, {
    x: () => {
      let x = (gsap.getProperty(item, "x", "px") || 0) + (startX - items[0].offsetLeft);
      return x;
    }
  });

  for (i = 0; i < length; i++) {
    item = items[i];
    widths[i] = (config.paddingRight ? parseFloat(gsap.getProperty(item, "marginRight", "px")) + parseFloat(config.paddingRight) : item.offsetWidth);
    xPercents[i] = (parseFloat(gsap.getProperty(item, "x", "px")) / widths[i]) * 100;
  }

  totalWidth = widths.reduce((a, b) => a + b, 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + totalWidth;
    tl.to(item, {
      x: -distanceToLoop,
      duration: distanceToLoop / pixelsPerSecond,
      immediateRender: false
    }, 0)
      .fromTo(item, {
        x: totalWidth - distanceToLoop
      }, {
        x: -distanceToLoop,
        duration: (totalWidth - distanceToLoop) / pixelsPerSecond,
        immediateRender: false
      }, distanceToLoop / pixelsPerSecond)
      .add(() => {
        curIndex = (curIndex + 1) % length;
      }, distanceToLoop / pixelsPerSecond);
    times.push(distanceToLoop / pixelsPerSecond);
  }

  tl.totalDuration(times[times.length - 1]);
  if (config.repeat === -1) tl.repeat(-1);
  if (config.paused) tl.pause();
  return tl;
}

// --- Clone items to create a seamless infinite loop ---
function duplicateForSeamlessLoop(originalItems) {
  const container = document.querySelector(".marquee-wrapper");
  if (!container) return originalItems;

  container.querySelectorAll("[data-marquee-clone='true']").forEach(clone => clone.remove());

  // Get the total width of the original set (including gaps)
  let originalWidth = 0;
  originalItems.forEach(item => {
    originalWidth += item.offsetWidth;
    const style = window.getComputedStyle(item);
    const marginRight = parseFloat(style.marginRight) || 0;
    originalWidth += marginRight;
  });
  // Also account for gap-x-6 (24px) between items – already included in marginRight? 
  // Actually gap-x-6 adds margin-right to each item, so the above loop captures it.

  // Get the viewport width of the scroll container
  const scrollContainer = document.querySelector(".mask-fade-horizontal");
  const viewportWidth = scrollContainer ? scrollContainer.clientWidth : window.innerWidth;

  if (!originalWidth) return originalItems;

  // Add only enough copies to keep a seamless loop. The previous +50 multiplier
  // created hundreds of logo nodes on mobile before the marquee could start.
  const neededCopies = Math.min(6, Math.max(2, Math.ceil((viewportWidth * 2.5) / originalWidth) + 1));

  // Clone the original items and append them to the container
  for (let i = 0; i < neededCopies; i++) {
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.dataset.marqueeClone = "true";
      // Remove any existing GSAP inline transforms (just to be safe)
      gsap.set(clone, { clearProps: "transform" });
      container.appendChild(clone);
    });
  }

  // Return all .marquee-item elements (original + clones)
  return gsap.utils.toArray(".marquee-item");
}

export function animatePartners() {
  const originalMarqueeItems = gsap.utils.toArray(".marquee-item");
  if (!originalMarqueeItems.length) {
    console.warn("No .marquee-item elements found");
    return;
  }

  // Collect all images inside the marquee items
  const images = originalMarqueeItems
    .map(item => item.querySelector("img"))
    .filter(Boolean);

  const waitForImages = images.map(img => {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    return new Promise(resolve => {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true }); // don't hang on broken imgs
    });
  });

  // Only start marquee after ALL images have loaded and browser has painted
  Promise.all(waitForImages).then(() => {
    requestAnimationFrame(() => {
      // One extra rAF to ensure layout is flushed after images load
      requestAnimationFrame(() => {
        const allItems = duplicateForSeamlessLoop(originalMarqueeItems);
        startMarquee(allItems);
      });
    });
  });
}

function startMarquee(marqueeItems) {
  const marqueeTimeline = horizontalLoop(marqueeItems, {
    repeat: -1,
    paddingRight: 0,
    speed: 0.5,
  });

  const container = document.querySelector(".marquee-wrapper");
  if (container) {
    container.addEventListener("mouseenter", () => marqueeTimeline.pause());
    container.addEventListener("mouseleave", () => marqueeTimeline.play());
  }
}
