"use client";

import { useEffect, useRef } from "react";

/**
 * Perspective grid backdrop for contest-N9 on token-2049, in place of CodeRain.
 *
 * Adapted from the supplied component. The control panel that came with it is
 * not here: nothing on the page changes these values, so they are constants.
 *
 * Three changes the original needed to work as a section backdrop rather than a
 * fixed full-screen demo:
 *   - it measures the host element, not the window. The closer is ~76rem tall,
 *     so window.innerHeight drew a grid the section then cropped.
 *   - the loop is cancelled on unmount and paused off-screen. The original
 *     re-queued requestAnimationFrame forever with no handle to stop it.
 *   - frames are capped, so the drift is the same speed on a 120Hz screen.
 */
const GRID_COLOR = "#ff25bc";
const GRID_RGB = { r: 255, g: 37, b: 188 };

const CELL_WIDTH = 120;
const CELL_DEPTH = 80;
const CELLS_WIDE = 16;
const CELLS_DEEP = 20;

const CAMERA_Y = 60;
const CAMERA_Z = 400;
const FOCAL_LENGTH = 500;
const SPEED = 1.5;

const MAX_DPR = 1.5;
const FRAME_MS = 1000 / 60;

export function RetroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let offset = 0;
    let raf = 0;
    let last = 0;
    let pending = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w < 2 || h < 2 || (w === width && h === height)) return;
      width = w;
      height = h;

      // The projection below works in CSS pixels, so the device ratio lives in
      // the transform rather than in canvas.width / canvas.height.
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /** Ground plane only, so y is always 0. Returns null behind the camera. */
    const project = (x: number, z: number) => {
      const relZ = z - CAMERA_Z;
      if (relZ <= 10) return null;
      const scale = FOCAL_LENGTH / relZ;
      return { x: width / 2 + x * scale, y: height * 0.5 + CAMERA_Y * scale };
    };

    const drawCell = (x: number, z: number) => {
      const actualZ = z - offset;
      if (actualZ < 0 || actualZ > CELLS_DEEP * CELL_DEPTH) return;

      const half = CELL_WIDTH / 2;
      const topLeft = project(x - half, actualZ);
      const topRight = project(x + half, actualZ);
      const bottomLeft = project(x - half, actualZ + CELL_DEPTH);
      const bottomRight = project(x + half, actualZ + CELL_DEPTH);
      if (!topLeft || !topRight || !bottomLeft || !bottomRight) return;

      // Rows near the horizon sit closer together, so they thin out and fade
      // instead of collapsing into one solid band.
      const far = Math.min(1, actualZ / (CELLS_DEEP * CELL_DEPTH));
      ctx.globalAlpha = Math.max(0.3, 1 - far * 0.7);
      ctx.lineWidth = Math.max(1, 2.5 * (1 - far * 0.5));
      ctx.strokeStyle = GRID_COLOR;
      ctx.shadowBlur = 10 * (1 - far);
      ctx.shadowColor = GRID_COLOR;

      ctx.beginPath();
      ctx.moveTo(bottomLeft.x, bottomLeft.y);
      ctx.lineTo(bottomRight.x, bottomRight.y);
      ctx.lineTo(topRight.x, topRight.y);
      ctx.lineTo(topLeft.x, topLeft.y);
      ctx.closePath();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const paintSky = () => {
      const { r, g, b } = GRID_RGB;
      const horizon = height * 0.55;

      // Each stop scales the three channels by a different amount, so blue
      // climbs faster than red and the horizon warms into the grid colour.
      const sky = ctx.createLinearGradient(0, 0, 0, horizon);
      const stops: [number, number, number, number][] = [
        [0, 0.05, 0.05, 0.15],
        [0.3, 0.1, 0.08, 0.2],
        [0.5, 0.2, 0.15, 0.3],
        [0.7, 0.35, 0.25, 0.4],
        [0.85, 0.55, 0.4, 0.6],
        [1, 0.7, 0.5, 0.75],
      ];
      stops.forEach(([at, kr, kg, kb]) => {
        sky.addColorStop(at, `rgb(${r * kr}, ${g * kg}, ${b * kb})`);
      });
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, horizon);

      const ground = ctx.createLinearGradient(0, horizon, 0, height);
      ground.addColorStop(0, `rgb(${r * 0.1}, ${g * 0.08}, ${b * 0.15})`);
      ground.addColorStop(0.3, `rgb(${r * 0.05}, ${g * 0.03}, ${b * 0.08})`);
      ground.addColorStop(1, "#000000");
      ctx.fillStyle = ground;
      ctx.fillRect(0, horizon, width, height - horizon);
    };

    const paintScanlines = () => {
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = "#000000";
      for (let y = 0; y < height; y += 4) ctx.fillRect(0, y, width, 2);
      ctx.globalAlpha = 1;
    };

    const paintVignette = () => {
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.3,
        width / 2, height / 2, height * 0.8,
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.5)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const draw = () => {
      if (width < 2 || height < 2) return;
      ctx.clearRect(0, 0, width, height);
      paintSky();

      const edge = Math.floor(CELLS_WIDE / 2);
      for (let row = -5; row < CELLS_DEEP + 5; row++) {
        for (let col = -edge; col <= edge; col++) {
          drawCell(col * CELL_WIDTH, row * CELL_DEPTH);
        }
      }

      paintScanlines();
      paintVignette();
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      // Modulo, not a reset to zero: 80 is not a multiple of 1.5, so snapping
      // dropped a pixel of travel every 53 frames and the rows twitched.
      offset = (offset + SPEED) % CELL_DEPTH;
      draw();
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
        draw();
      }, 150);
    });
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "200px" },
    );

    resize();
    draw();
    ro.observe(host);
    io.observe(host);

    return () => {
      clearTimeout(pending);
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="retro-grid" aria-hidden="true" />;
}
