"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { CONFIG } from "@/lib/config";
import type { Dictionary, EventSlug } from "@/lib/i18n";

/** Name, email and whichever handle the applicant gave. */
export type Receipt = { label: string; value: string }[];

/** The slot every locale's success note leaves for the support handle. */
const TELEGRAM_SLOT = "{telegram}";

/**
 * The confirmation gets its own screen rather than a panel where the form was:
 * a toast is gone in four seconds, and a panel sits one scroll away from
 * thirteen fields the applicant can no longer change. Portalled to <body> and
 * covering the viewport, so the page behind is neither visible nor reachable.
 */
export function ApplySuccess({
  t,
  receipt,
  event,
}: {
  t: Dictionary["apply"]["success"];
  receipt: Receipt;
  event: EventSlug;
}) {
  const panel = useRef<HTMLDivElement>(null);
  /** A real navigation, not a hash: the form behind is spent, so the way back
      to the event page is a fresh load of it. */
  const pathname = usePathname();
  const [noteBeforeHandle, noteAfterHandle = ""] = t.note.split(TELEGRAM_SLOT);

  useEffect(() => {
    // The form held focus, and focus has to land somewhere it can be read from.
    // tabIndex -1 keeps the panel out of the tab order afterwards.
    panel.current?.focus();

    // The page is still mounted behind this screen, and covering it is not
    // enough — without this it keeps its scroll position and all of its tab
    // stops, so the confirmation would be one Tab away from the sent form.
    const page = document.getElementById("page");
    const scrolled = document.body.style.overflow;
    if (page) page.inert = true;
    document.body.style.overflow = "hidden";
    return () => {
      if (page) page.inert = false;
      document.body.style.overflow = scrolled;
    };
  }, []);

  return createPortal(
    // token-2049's palette tokens are declared on .ev-token-2049, so the scope
    // class has to travel with the screen once it leaves the page's own tree.
    <div className={`apply-done-screen ev ev-${event}`}>
      <div className="apply-done" ref={panel} tabIndex={-1} role="status">
        {/* Decorative: the heading beside it already says the state. */}
        <svg
          className="apply-done-mark"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          aria-hidden="true"
        >
          <path d="M4 12.5 9.5 18 20 6.5" />
        </svg>

        <h3 className="h5">{t.title}</h3>
        <p className="p2">{t.body}</p>

        <dl className="apply-done-recap">
          {receipt.map((row) => (
            <div key={row.label}>
              <dt className="p3">{row.label}</dt>
              <dd className="p2">{row.value}</dd>
            </div>
          ))}
        </dl>

        {/* The only way out of the screen. */}
        <a className="btnset btnset-lg btnset-line-dark p2" href={pathname}>
          <span>{t.back}</span>
        </a>

        {/* Last on the screen: it only matters to someone who has already read
            the confirmation and is looking for what to do about a typo. Split
            rather than filled, because the handle in the middle is a link. */}
        <p className="apply-done-note p3">
          {noteBeforeHandle}
          <a
            href={`https://t.me/${CONFIG.contactTelegram}`}
            target="_blank"
            rel="noreferrer"
          >
            @{CONFIG.contactTelegram}
          </a>
          {noteAfterHandle}
        </p>
      </div>
    </div>,
    document.body,
  );
}
