"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/lib/i18n";

/** Name, email and whichever handle the applicant gave. */
export type Receipt = { label: string; value: string }[];

/**
 * Takes the form's place once it is away. Two reasons it is a panel rather
 * than a toast or a route:
 *
 * A toast is gone in four seconds. This form is thirteen fields long and the
 * reply comes by email days later, so the confirmation has to still be there
 * when the applicant looks up.
 *
 * A route would be a claim we cannot make on the mailto path, where the
 * application has not left the applicant's machine yet. `draft` is what picks
 * the honest wording, and it is also what offers the way back — the form is
 * only hidden, so every answer is still in it.
 */
export function ApplySuccess({
  t,
  draft,
  receipt,
  onBack,
}: {
  t: Dictionary["apply"]["success"];
  draft: boolean;
  receipt: Receipt;
  onBack: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);

  // The form it replaced held focus, and focus has to land somewhere it can be
  // read from. tabIndex -1 keeps the panel out of the tab order afterwards.
  useEffect(() => panel.current?.focus(), []);

  return (
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

      <h3 className="h5">{draft ? t.draftTitle : t.title}</h3>
      <p className="p2">{draft ? t.draftBody : t.body}</p>

      <dl className="apply-done-recap">
        {receipt.map((row) => (
          <div key={row.label}>
            <dt className="p3">{row.label}</dt>
            <dd className="p2">{row.value}</dd>
          </div>
        ))}
      </dl>

      {draft && (
        <button type="button" className="btnset btnset-line-dark p2" onClick={onBack}>
          <span>{t.back}</span>
        </button>
      )}
    </div>
  );
}
