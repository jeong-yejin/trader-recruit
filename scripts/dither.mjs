/**
 * Turns the template's glossy 3D renders into a halftone dot field.
 *
 * Reads from image-originals/ and writes into public/resources/images/, so the
 * markup and the four template stylesheets never learn this happened: every
 * <img> keeps its src, and selectors like `.contest-N7 .thumb img` keep working.
 * A canvas <-> DOM component would have cost a rewrite of both.
 *
 * There is no image library in this project and no reason to add one. Chromium
 * is already here for the screenshot checks, so the canvas work runs in a page.
 *
 * Chromium comes from playwright, which is deliberately not a dependency of
 * this project: it is a build-time tool for eleven files that are now committed,
 * and package.json stays at next/react/react-dom. Point node at an install:
 *
 *   PLAYWRIGHT=/path/to/node_modules/playwright node scripts/dither.mjs
 */
import { createRequire } from "module";
import { readFileSync, writeFileSync } from "fs";

/* PLAYWRIGHT may point at an install outside this project; see the note above. */
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT ?? "playwright");

/**
 * Ink is per-ground, not per-image. Seven of these blobs sit on #000; the four
 * Prize thumbs sit on the teal and periwinkle panels, where the acid green in
 * the reference would land at roughly the panel's own luminance and disappear.
 * Same halftone, ink that survives the ground under it.
 */
const GREEN = { lo: [18, 46, 8], dot: [164, 249, 77], hot: [236, 255, 202], glow: 0.3 };
const DARK = { lo: [88, 104, 74], dot: [16, 20, 12], hot: [4, 6, 3], glow: 0.14 };

/*
  Dot pitch has to be constant on screen, not in the file. These sources are
  laid out at wildly different scales: an N3 blob is served at 2.63x its CSS
  box, an N7 one at 2.0x, contest_N6_03 at 1.0x. A single CELL therefore drew a
  3px grid in one section and an 8px grid in the next, and only the 8px one
  read as a halftone at all. The third column is CELL in output pixels, set to
  7 CSS px times that image own scale, measured off the rendered page.
*/
const JOBS = [
  ["contest_N3_01", GREEN, 18], ["contest_N3_02", GREEN, 19],
  ["contest_N3_03", GREEN, 19], ["contest_N3_04", GREEN, 18],
  ["contest_N7_01", GREEN, 14], ["contest_N7_02", GREEN, 14],
  ["contest_N7_03", GREEN, 14],
  /* N6_04 and N6_06 are the <picture> sources under 992px for the two below,
     so their scale is measured at a 600px viewport, not at 1440. */
  ["contest_N6_01", DARK, 14], ["contest_N6_04", DARK, 16],
  ["contest_N6_03", DARK, 7], ["contest_N6_06", DARK, 27],
];

const render = ([b64, ink, cell]) => {
  const img = new Image();
  return new Promise((done) => {
    img.onload = () => {
      /* 2x the source, so the grid stays crisp on a retina screen. */
      const W = img.naturalWidth * 2;
      const H = img.naturalHeight * 2;
      const CELL = cell;
      const R = CELL / 2;
      const cols = Math.ceil(W / CELL);
      const rows = Math.ceil(H / CELL);

      const src = document.createElement("canvas");
      src.width = W; src.height = H;
      const sctx = src.getContext("2d");
      sctx.drawImage(img, 0, 0, W, H);
      const px = sctx.getImageData(0, 0, W, H).data;

      /* Pass one: average each cell. Colour is un-weighted by alpha, or a soft
         edge would read as a dark pixel rather than a faint one. */
      const lum = new Float32Array(cols * rows);
      const cov = new Float32Array(cols * rows);
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          let r = 0, g = 0, b = 0, a = 0, n = 0;
          const x1 = Math.min(W, (cx + 1) * CELL);
          const y1 = Math.min(H, (cy + 1) * CELL);
          for (let y = cy * CELL; y < y1; y++) {
            for (let x = cx * CELL; x < x1; x++) {
              const i = (y * W + x) * 4;
              const w = px[i + 3] / 255;
              r += px[i] * w; g += px[i + 1] * w; b += px[i + 2] * w;
              a += w;
              n++;
            }
          }
          const k = cols * cy + cx;
          cov[k] = n ? a / n : 0;
          lum[k] = a > 0
            ? Math.min(1, (0.2126 * r + 0.7152 * g + 0.0722 * b) / a / 255)
            : 0;
        }
      }

      /*
        These renders are pastel, so a lit blob spans maybe 0.55 to 0.9 and the
        shading would barely register. Stretch each image's own 5th-95th across
        the range, but only down to 0.12, not 0: pushed to true black the smooth
        gradients posterise into contour rings.
      */
      const lit = [];
      for (let k = 0; k < lum.length; k++) if (cov[k] > 0.5) lit.push(lum[k]);
      lit.sort((a, b) => a - b);
      const lo = lit.length ? lit[Math.floor(lit.length * 0.05)] : 0;
      const hi = lit.length ? lit[Math.floor(lit.length * 0.95)] : 1;
      const span = Math.max(hi - lo, 1e-3);
      const level = (v) =>
        0.12 + 0.88 * Math.pow(Math.min(1, Math.max(0, (v - lo) / span)), 1.2);

      /*
        Pass two. The dot is a fixed size and the tone lives in its colour, which
        is what the reference does: a fine even grid that goes from near-black to
        pale at the specular. Sizing the dot by luminance instead merges the lit
        areas into a solid fill, because these sources have no dark side to thin
        the grid out.
      */
      const DOT = R * 0.62;
      const dots = document.createElement("canvas");
      dots.width = W; dots.height = H;
      const dctx = dots.getContext("2d");
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const k = cols * cy + cx;
          const alpha = cov[k];
          if (alpha < 0.06) continue;
          const L = level(lum[k]);
          /* Only the top of the range picks up the specular tint. */
          const t = Math.max(0, (L - 0.78) / 0.22);
          const c = ink.lo.map((v, i) => {
            const base = v + (ink.dot[i] - v) * L;
            return Math.round(base + (ink.hot[i] - base) * t * t);
          });
          dctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
          dctx.beginPath();
          dctx.arc(cx * CELL + R, cy * CELL + R, DOT, 0, Math.PI * 2);
          dctx.fill();
        }
      }

      /*
        Bloom is the dot field blurred back under itself, so it only lights up
        where dots actually landed. Blurring the source instead flooded the whole
        silhouette, recesses included.
      */
      const out = document.createElement("canvas");
      out.width = W; out.height = H;
      const ctx = out.getContext("2d");
      ctx.filter = `blur(${CELL * 1.6}px)`;
      ctx.globalAlpha = ink.glow;
      ctx.drawImage(dots, 0, 0);
      ctx.filter = "none";
      ctx.globalAlpha = 1;
      ctx.drawImage(dots, 0, 0);

      done(out.toDataURL("image/png"));
    };
    img.src = "data:image/png;base64," + b64;
  });
};

const b = await chromium.launch();
const p = await b.newPage();
for (const [name, ink, cell] of JOBS) {
  const b64 = readFileSync(`image-originals/${name}.png`).toString("base64");
  const dataUrl = await p.evaluate(render, [b64, ink, cell]);
  const buf = Buffer.from(dataUrl.split(",")[1], "base64");
  writeFileSync(`public/resources/images/${name}.png`, buf);
  console.log(name, (buf.length / 1024).toFixed(0) + "kb");
}
await b.close();
