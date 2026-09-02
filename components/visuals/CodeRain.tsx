"use client";

import { useEffect, useRef } from "react";

/**
 * "Code Rain" ASCII layer for contest-N9.
 *
 * The brief named /ascii-editor/demos/generated/ref-006.webp as the source
 * photo. That file is not in this repo. It stood in for a while as a collage of
 * the fifteen contest_N9_* thumbnails, but the ASCII pass keeps a photo legible:
 * tile seams and off-green pixels read as pictures behind the headline. The
 * luminance field the glyphs sample is generated instead, so the block has no
 * image in it at all.
 *
 * Parameters below are the brief's JSON. Keys it leaves at a no-op value are
 * not implemented: bgBlur (only reads under bgMode "blur"), blurType "off",
 * density 0, a linear toneCurve, styleBlend "source-over", and the disabled
 * chromatic / pixelate / halftone / filmDust effects, lights and mask.
 */
const CONFIG = {
  bgMode: "solid",
  /** The brief gives no bgColor; the section ground is --body-bg. */
  bgColor: "0, 0, 0",
  bgOpacity: 90,
  cellSize: 14,
  coverage: 96,
  invert: false,
  /** charSet "binary", darkest glyph first. */
  charSet: "01",
  brightness: 0,
  contrast: 115,
  saturation: 100,
  grayscale: 0,
  edgeEmphasis: 40,
  tint: "#00ff66",
  tintOpacity: 45,
  overlayBlend: "overlay" as GlobalCompositeOperation,
  pfx: { scanLines: 28, vignette: 38, bloom: 25, filmGrain: 40, glitch: 20 },
  animStyle: "flicker",
  animSpeed: 100,
  animIntensity: 60,
};

/** [x, y, radius, peak alpha], all as a fraction of the canvas. */
const POOLS: [number, number, number, number][] = [
  [0.12, 0.18, 0.38, 0.72],
  [0.78, 0.12, 0.3, 0.6],
  [0.5, 0.62, 0.45, 0.5],
  [0.9, 0.8, 0.26, 0.66],
  [0.24, 0.88, 0.32, 0.58],
];
/** 1 device pixel per CSS pixel is too soft; past 1.5 nothing reads differently. */
const MAX_DPR = 1.5;
const FRAME_MS = 1000 / 30;
const GRAIN_TILES = 3;
const GRAIN_SIZE = 96;

/** One cell of the sampled grid, ready to draw. */
type Cell = { x: number; y: number; fill: string; alpha: number; lum: number; row: number };

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/** Deterministic per-cell noise, so a cell flickers rather than crawling. */
const hash = (n: number) => {
  const s = Math.sin(n) * 43758.5453;
  return s - Math.floor(s);
};

/** brightness / contrast / saturation / grayscale, in that order, on 0-255 channels. */
const adjust = (r: number, g: number, b: number) => {
  const bright = (CONFIG.brightness / 100) * 255;
  const con = CONFIG.contrast / 100;
  const sat = CONFIG.saturation / 100;
  const gray = CONFIG.grayscale / 100;
  const out = [r, g, b].map((v) => (v + bright - 128) * con + 128);
  const lum = 0.299 * out[0] + 0.587 * out[1] + 0.114 * out[2];
  return out.map((v) => {
    const s = lum + (v - lum) * sat;
    return clamp01((s + (lum - s) * gray) / 255) * 255;
  });
};

/** Two grain tiles cost nothing and one static tile reads as dirt on the lens. */
const makeGrain = () =>
  Array.from({ length: GRAIN_TILES }, () => {
    const tile = document.createElement("canvas");
    tile.width = tile.height = GRAIN_SIZE;
    const tctx = tile.getContext("2d");
    if (!tctx) return tile;
    const data = tctx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
    for (let i = 0; i < data.data.length; i += 4) {
      const v = 128 + (Math.random() - 0.5) * 210;
      data.data[i] = data.data[i + 1] = data.data[i + 2] = v;
      data.data[i + 3] = 255;
    }
    tctx.putImageData(data, 0, 0);
    return tile;
  });

const makeScanLines = () => {
  const tile = document.createElement("canvas");
  tile.width = 1;
  tile.height = 3;
  const tctx = tile.getContext("2d");
  if (tctx) {
    tctx.fillStyle = "#000";
    tctx.fillRect(0, 0, 1, 1);
  }
  return tile;
};

export function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const grain = makeGrain().map((t) => ctx.createPattern(t, "repeat"));
    const scan = ctx.createPattern(makeScanLines(), "repeat");
    const bloom = document.createElement("canvas");
    const bloomCtx = bloom.getContext("2d");
    const source = document.createElement("canvas");
    const sourceCtx = source.getContext("2d");

    let buckets: Cell[][] = [[], [], []];
    let fonts: string[] = [];
    let vignette: CanvasGradient | null = null;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let frame = 0;
    let last = 0;
    let raf = 0;
    let pending = 0;

    /** Luminance field in, grid of drawable cells out. Runs on mount and on resize. */
    const build = () => {
      if (!sourceCtx || width < 2 || height < 2) return;

      source.width = width;
      source.height = height;
      /*
        Soft pools of light over black. Every stop is a fraction of the box, so
        the field is the same shape at any width and survives a resize without
        the rain reshuffling. Low frequency on purpose: the glyph pass turns a
        hard edge into a readable outline, which is what made the photos show.
      */
      sourceCtx.fillStyle = "#000";
      sourceCtx.fillRect(0, 0, width, height);
      const reach = Math.hypot(width, height);
      POOLS.forEach(([px, py, r, a]) => {
        const g = sourceCtx.createRadialGradient(
          px * width, py * height, 0,
          px * width, py * height, r * reach,
        );
        g.addColorStop(0, `rgba(255,255,255,${a})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        sourceCtx.fillStyle = g;
        sourceCtx.fillRect(0, 0, width, height);
      });

      const { cellSize } = CONFIG;
      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
      const px = sourceCtx.getImageData(0, 0, width, height).data;

      // Pass one: average each cell, then adjust colour.
      const lums = new Float32Array(cols * rows);
      const fills: string[] = new Array(cols * rows);
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const x1 = Math.min(width, (cx + 1) * cellSize);
          const y1 = Math.min(height, (cy + 1) * cellSize);
          let r = 0;
          let g = 0;
          let b = 0;
          let n = 0;
          for (let y = cy * cellSize; y < y1; y += 2) {
            for (let x = cx * cellSize; x < x1; x += 2) {
              const i = (y * width + x) * 4;
              r += px[i];
              g += px[i + 1];
              b += px[i + 2];
              n++;
            }
          }
          if (!n) n = 1;
          const [ar, ag, ab] = adjust(r / n, g / n, b / n);
          const i = cy * cols + cx;
          lums[i] = clamp01((0.299 * ar + 0.587 * ag + 0.114 * ab) / 255);
          fills[i] = `rgb(${ar | 0},${ag | 0},${ab | 0})`;
        }
      }

      // Pass two: edge emphasis reads the neighbours, so it needs the full grid.
      const edge = CONFIG.edgeEmphasis / 100;
      const next: Cell[][] = [[], [], []];
      const cover = CONFIG.coverage / 100;
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const i = cy * cols + cx;
          if (hash(i * 12.9898) > cover) continue;
          const l = lums[i];
          const dx = Math.abs(lums[i + (cx < cols - 1 ? 1 : 0)] - lums[i - (cx > 0 ? 1 : 0)]);
          const dy = Math.abs(
            lums[i + (cy < rows - 1 ? cols : 0)] - lums[i - (cy > 0 ? cols : 0)],
          );
          const lum = clamp01(CONFIG.invert ? 1 - l : l + (dx + dy) * edge);
          next[lum < 0.34 ? 0 : lum < 0.67 ? 1 : 2].push({
            x: cx * cellSize + cellSize / 2,
            y: cy * cellSize + cellSize / 2,
            fill: fills[i],
            alpha: 0.35 + lum * 0.65,
            lum,
            row: cy,
          });
        }
      }
      buckets = next;
    };

    /** Resampling costs a full getImageData, so only do it when the box moved. */
    const resize = () => {
      const rect = host.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w < 2 || h < 2 || (w === width && h === height)) return;
      width = w;
      height = h;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      bloom.width = Math.max(1, Math.round(width / 4));
      bloom.height = Math.max(1, Math.round(height / 4));

      const { cellSize } = CONFIG;
      fonts = [0.62, 0.82, 1].map(
        (k) => `${(cellSize * k).toFixed(1)}px ui-monospace, "SFMono-Regular", Menlo, monospace`,
      );
      vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.25,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.72,
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, `rgba(0,0,0,${CONFIG.pfx.vignette / 100})`);

      build();
    };

    const draw = (now: number) => {
      const { cellSize, charSet, pfx } = CONFIG;
      const step = Math.floor((now / 90) * (CONFIG.animSpeed / 100));
      const amp = (CONFIG.animIntensity / 100) * 0.9;

      // Glitch displaces whole rows of glyphs rather than slices of the
      // composite — in a character render the row is the natural unit.
      const glitching = pfx.glitch > 0 && hash(step * 3.3) < pfx.glitch / 100 / 2.4;
      const offsets = glitching ? new Float32Array(rows) : null;
      if (offsets) {
        for (let i = 0; i < 3; i++) {
          const at = Math.floor(hash(step + i * 7.1) * rows);
          const span = 1 + Math.floor(hash(step + i * 3.7) * 4);
          const shift = (hash(step + i * 11.3) - 0.5) * cellSize * 4;
          for (let r = at; r < Math.min(rows, at + span); r++) offsets[r] = shift;
        }
      }

      // 1. Background: bgMode "solid" at bgOpacity.
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(${CONFIG.bgColor}, ${CONFIG.bgOpacity / 100})`;
      ctx.fillRect(0, 0, width, height);

      // 2. Glyphs, grouped by size so the font is set three times, not once per cell.
      buckets.forEach((cells, bucket) => {
        ctx.font = fonts[bucket];
        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          const flick = still ? 1 : 1 + amp * (hash(i * 1.7 + bucket * 97 + step) - 0.55);
          ctx.globalAlpha = clamp01(cell.alpha * flick);
          ctx.fillStyle = cell.fill;
          const churn = still ? 0 : (hash(i * 2.3 + bucket * 41 + step) - 0.5) * 0.35;
          const glyph = charSet[cell.lum + churn > 0.5 ? 1 : 0];
          ctx.fillText(glyph, cell.x + (offsets ? offsets[cell.row] : 0), cell.y);
        }
      });

      // 3. Tint at tintOpacity through overlayBlend.
      ctx.globalCompositeOperation = CONFIG.overlayBlend;
      ctx.globalAlpha = CONFIG.tintOpacity / 100;
      ctx.fillStyle = CONFIG.tint;
      ctx.fillRect(0, 0, width, height);

      // 4. Post-effects, in the order the brief lists them.
      ctx.globalCompositeOperation = "source-over";
      if (scan) {
        ctx.globalAlpha = (pfx.scanLines / 100) * 0.6;
        ctx.fillStyle = scan;
        ctx.fillRect(0, 0, width, height);
      }
      if (vignette) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);
      }
      if (bloomCtx) {
        bloomCtx.clearRect(0, 0, bloom.width, bloom.height);
        bloomCtx.drawImage(canvas, 0, 0, bloom.width, bloom.height);
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = (pfx.bloom / 100) * 0.9;
        ctx.drawImage(bloom, 0, 0, width, height);
      }
      const tile = grain[frame % GRAIN_TILES];
      if (tile) {
        ctx.globalCompositeOperation = "overlay";
        ctx.globalAlpha = (pfx.filmGrain / 100) * 0.5;
        ctx.fillStyle = tile;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      frame++;
      draw(now);
    };

    const start = () => {
      if (raf || still) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const ro = new ResizeObserver(() => {
      clearTimeout(pending);
      pending = window.setTimeout(() => {
        resize();
        if (still || !raf) draw(performance.now());
      }, 150);
    });
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "200px" },
    );

    resize();
    draw(performance.now());
    ro.observe(host);
    io.observe(host);

    return () => {
      clearTimeout(pending);
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="code-rain" aria-hidden="true" />;
}
