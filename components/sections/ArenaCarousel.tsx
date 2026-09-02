"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";

/**
 * The arena cards as a horizontal carousel: a number, an icon, then the title
 * and body pinned to the bottom of a tall card, with arrow controls.
 *
 * The reference is a shadcn/embla carousel driven by framer-motion. None of
 * embla-carousel-react, framer-motion, lucide-react, shadcn's Button or its
 * `cn` helper are installed, and Tailwind cannot be: its preflight would reset
 * the four TemplateHouse stylesheets the whole page is laid out by. So the
 * same design is built from parts that are already here.
 *
 *   embla                 -> CSS scroll-snap, scrolled with scrollBy()
 *   framer-motion stagger -> AOS, which the page already loads and uses
 *   shadcn Button         -> .btnset, the template's own button
 *
 * Two design changes. The reference sets `loop: true` and ships only a next
 * arrow; a native scroll-snap track has no loop, so there are two arrows and
 * they disable at the ends instead of wrapping. And its cards are basis-1/3,
 * which fits the container exactly and reads as a static grid here, so a card
 * is 30% and the next one stays cut by the edge.
 */

/** How much of a card has to be past the edge before an arrow greys out. */
const EDGE = 4;

export function ArenaCarousel({ arena }: { arena: Dictionary["arena"] }) {
  const cards = arena.cards;
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= EDGE);
    setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - EDGE);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    /* clientWidth changes with the breakpoint, so the end test has to rerun. */
    const ro = new ResizeObserver(sync);
    ro.observe(track);
    return () => {
      track.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  /*
    Drag to scroll. Snapping is turned off for the duration: mandatory snap
    fights a drag in progress and the track jumps back to the nearest card on
    every move. Anything under 4px stays a click, so the cards keep working.
  */
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    /* Let the arrows and any future link inside a card take their own clicks. */
    if (!track || e.button !== 0 || (e.target as HTMLElement).closest("button, a")) return;
    drag.current = { on: true, x: e.clientX, left: track.scrollLeft, moved: false };
    track.classList.add("is-dragging");
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current.on) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    track.scrollLeft = drag.current.left - dx;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current.on) return;
    drag.current.on = false;
    track.classList.remove("is-dragging");
    track.releasePointerCapture(e.pointerId);
    /* Snap comes back on, then one nudge lands the track on a card. */
    track.scrollTo({ left: track.scrollLeft, behavior: "smooth" });
  };

  /** One card plus its gap, read off the DOM so the breakpoints stay in CSS. */
  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | undefined;
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <div className="arena-carousel">
      <ul
        className="arena-row"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
      >
        {cards.map((card, i) => {
          /* `idx` is "01 / 방식": the number is the marker, the rest is a tag. */
          const [num, tag] = card.idx.split(" / ");
          return (
            <li
              className="arena-card"
              key={card.idx}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <span className="arena-num">( {num} )</span>
              <div className="arena-card-body">
                {tag && <span className="arena-tag">{tag}</span>}
                <strong className="h5">{card.title}</strong>
                <p className="p1">{card.body}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="arena-nav">
        <button
          type="button"
          className="arena-arrow"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label={arena.prev}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          className="arena-arrow"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label={arena.next}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
