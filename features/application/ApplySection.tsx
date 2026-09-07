import { Fragment } from "react";
import { ApplyForm } from "./ApplyForm";
import { CONFIG } from "@/lib/config";
import type { Dictionary, EventSlug } from "@/lib/i18n";

/**
 * The template has no form block, so this borrows its container and typography
 * classes and leans on the inputset/selectset/checkset components inside.
 */
export function ApplySection({
  apply,
  event,
}: {
  apply: Dictionary["apply"];
  /** Only travels as far as the confirmation screen, which leaves the
      page's tree and so cannot inherit the event's palette. */
  event: EventSlug;
}) {
  return (
    <section className="apply-block" id="apply">
      <div className="contents-container container-md">
        <div className="contents-inner">
          <div className="title-area" data-aos="fade-up">
            <h2 className="h2">
              {apply.title.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </h2>
          </div>

          <div className="apply-shell">
            <dl className="apply-kv">
              {apply.kv.map((item) => (
                <Fragment key={item.k}>
                  <dt className="p3">{item.k}</dt>
                  <dd className="p2">{item.v}</dd>
                </Fragment>
              ))}
              <dt className="p3">{apply.contactLabel}</dt>
              <dd className="p2">
                {/* A new tab, not this one: the applicant is mid-form and a
                    same-tab jump loses everything they have typed. */}
                <a
                  href={`https://t.me/${CONFIG.contactTelegram}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  TG @{CONFIG.contactTelegram}
                </a>
              </dd>
            </dl>

            <ApplyForm t={apply} event={event} />
          </div>
        </div>
      </div>
    </section>
  );
}
