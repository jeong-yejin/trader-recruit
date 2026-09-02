"use client";

import { useEffect, useRef } from "react";

/**
 * The falling-glyph hero background from the legacy static page — index.html,
 * the block commented "matrix rain". Ported as it was: a 15px cell, ~18fps, a
 * 9% black wash each frame that leaves the trail, and a 1.5% chance a glyph
 * lands bright. Under prefers-reduced-motion it never draws, which on the
 * black hero is what the original `display:none` looked like.
 *
 * Two things the original did not need, because a static page never unmounts:
 * the loop is torn down on unmount, and it stops while the hero is off screen.
 */

const GLYPHS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノPERPDEX$≠+-<>{}".split("");
const CELL = 15;
/* 55ms, the original's throttle. Fast enough to read as rain, cheap enough to
   leave the main thread alone while GSAP drives the marquee. */
const FRAME_MS = 55;
const MAX_DPR = 2;
const FONT = `${CELL}px ui-monospace, SFMono-Regular, Menlo, monospace`;
/* --primary at the legacy alpha. The static page used #CAFF5D; this one green
   is what the buttons and the marquee band are already drawn in. */
const DIM = "rgba(164, 249, 77, 0.62)";
const BRIGHT = "#EAFFC0";
const TRAIL = "rgba(0, 0, 0, 0.09)";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    let drops: number[] = [];

    /* Columns already falling keep their position, so a resize widens the
       rain instead of restarting it. */
    const size = () => {
      w = host.clientWidth;
      h = host.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from(
        { length: Math.floor(w / CELL) },
        (_, i) => drops[i] ?? (Math.random() * -h) / CELL,
      );
    };

    let raf = 0;
    let last = 0;

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < FRAME_MS) return;
      last = t;

      ctx.fillStyle = TRAIL;
      ctx.fillRect(0, 0, w, h);
      ctx.font = FONT;

      drops.forEach((d, i) => {
        const y = d * CELL;
        ctx.fillStyle = Math.random() > 0.985 ? BRIGHT : DIM;
        ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], i * CELL, y);
        drops[i] = y > h && Math.random() > 0.972 ? 1 : d + 1;
      });
    };

    size();

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(size, 150);
    });
    ro.observe(host);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !raf) raf = requestAnimationFrame(draw);
        if (!entry.isIntersecting && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(host);

    return () => {
      ro.disconnect();
      io.disconnect();
      window.clearTimeout(resizeTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
}
