import { Fragment } from "react";
import { ApplyForm } from "./ApplyForm";
import { CONFIG } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";

/**
 * The template has no form block, so this borrows its container and typography
 * classes and leans on the inputset/selectset/checkset components inside.
 */
export function Apply({ apply }: { apply: Dictionary["apply"] }) {
  return (
    <section className="apply-block" id="apply">
      <div className="contents-container container-md">
        <div className="contents-inner">
          <div className="title-area" data-aos="fade-up">
            <p className="p2">{apply.kicker}</p>
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
                <a href={`mailto:${CONFIG.fallbackEmail}`}>{CONFIG.fallbackEmail}</a>
              </dd>
            </dl>

            <ApplyForm t={apply} />
          </div>
        </div>
      </div>
    </section>
  );
}
