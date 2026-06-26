// js/animations/proof.js
import gsap from "../../public/vendor/gsap/index.js";

export function animateProof() {
  const items = gsap.utils.toArray(".carousel-item");
  if (!items.length) return;

  // ── Use the official GSAP seamlessLoop helper ──
  const loop = horizontalLoop(items, {
    paused: true,
    // speed: 1, // optional: adjust speed (1 = ~100px/sec)
    // paddingRight: 0, // optional: add extra padding if needed
    // snap: false, // optional: disable snapping if needed
    // repeat: -1, // optional: infinite loop
    // reversed: false, // optional: reverse direction
  });

  let activeElement;

  // ── Handle active state changes ──
  // The loop doesn't have an onChange callback, so we use a different approach:
  // We'll track the active index manually and update styles on click/navigation

  function updateActive(index) {
    // Reset all items
    items.forEach((item, i) => {
      const inner = item.querySelector('.carousel-item-inner');
      if (inner) {
        inner.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-secondary');
      }
      item.style.zIndex = '0';
    });

    // Set active item
    const activeItem = items[index];
    if (activeItem) {
      const inner = activeItem.querySelector('.carousel-item-inner');
      if (inner) {
        inner.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-secondary');
      }
      activeItem.style.zIndex = '10';
      activeElement = activeItem;
    }
  }

  // ── Control buttons ──
  document.getElementById("carousel-prev")?.addEventListener("click", () => {
    const current = loop.current();
    const prev = current === 0 ? items.length - 1 : current - 1;
    loop.previous({ duration: 0.4, ease: "power1.inOut" });
    updateActive(prev);
  });

  document.getElementById("carousel-next")?.addEventListener("click", () => {
    const current = loop.current();
    const next = current === items.length - 1 ? 0 : current + 1;
    loop.next({ duration: 0.4, ease: "power1.inOut" });
    updateActive(next);
  });

  // ── Initial active state ──
  setTimeout(() => {
    updateActive(0);
  }, 100);
}

/*
Official GSAP seamlessLoop Helper Function
From: https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop
*/
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
  }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
        gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });

  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
    gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length);
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true);

  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }

  return tl;
}