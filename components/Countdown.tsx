"use client";

import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";

type Clock = { d: string; h: string; m: string; s: string };

/** Matches the original markup: placeholders on first paint, so SSR and the client agree. */
const IDLE: Clock = { d: "--", h: "--", m: "--", s: "--" };

const pad = (n: number) => String(n).padStart(2, "0");

const remaining = (end: number): Clock => {
  const diff = end - Date.now();
  if (diff <= 0) return { d: "00", h: "00", m: "00", s: "00" };
  const s = Math.floor(diff / 1000);
  return {
    d: pad(Math.floor(s / 86400)),
    h: pad(Math.floor((s % 86400) / 3600)),
    m: pad(Math.floor((s % 3600) / 60)),
    s: pad(s % 60),
  };
};

export function Countdown({
  units,
}: {
  units: Dictionary["countdown"]["units"];
}) {
  const [clock, setClock] = useState<Clock>(IDLE);

  useEffect(() => {
    const end = new Date(CONFIG.eventDate).getTime();
    const tick = () => setClock(remaining(end));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // No aria-live: this ticks every second and would be read aloud each time.
  return (
    <div className="clock" id="clock">
      <div className="unit">
        <b>{clock.d}</b>
        <span>{units.d}</span>
      </div>
      <div className="colon">:</div>
      <div className="unit">
        <b>{clock.h}</b>
        <span>{units.h}</span>
      </div>
      <div className="colon">:</div>
      <div className="unit">
        <b>{clock.m}</b>
        <span>{units.m}</span>
      </div>
      <div className="colon">:</div>
      <div className="unit">
        <b>{clock.s}</b>
        <span>{units.s}</span>
      </div>
    </div>
  );
}
