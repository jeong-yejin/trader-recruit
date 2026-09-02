import type { Dictionary, EventSlug } from "@/lib/i18n";
import { PROCESS_ART } from "@/lib/events/assets";

/**
 * Three floating objects, sized by the CSS heights rather than their own
 * dimensions. perp-dex-day swaps the template blobs for the choice the
 * section walks you through and where it lands. The two pills arrive as
 * smooth renders and are halftoned to rabbit's dot pitch on the way in.
 *
 * The rabbit sits in slot 2 and the blue pill in slot 3, so project.css trades
 * those two heights back to keep each one its own size.
 */
/**
 * TemplateHouse block contest-N7. style.js looks it up as
 * `.contest-N7[id='fPMtE69e1t']` and gives each `.list li` a ScrollTrigger
 * that toggles `.active` above 993px, so both the class names and the id are
 * fixed. The nav anchor rides on a wrapper instead of the block itself.
 */
export function Process({
  process,
  event,
}: {
  process: Dictionary["process"];
  event: EventSlug;
}) {
  const art = PROCESS_ART[event];

  return (
    <div id="process">
      <section className="contest-N7" id="fPMtE69e1t">
        <div className="contents-container container-md">
          <div className="contents-inner">
            <div className="title-area" data-aos="fade-up">
              <h2 className="h2">
                {process.title.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h2>
              <p className="p1">{process.intro}</p>
            </div>
            <div className="list-area">
              <div className="thumb">
                <div className="img-wrap">
                  {art.map((src, i) => (
                    <img key={src} src={src} alt="" className={`img-${i + 1}`} />
                  ))}
                </div>
              </div>
              <ul className="list">
                {process.steps.map((step) => (
                  <li key={step.n}>
                    <h3 className="h5">
                      {step.n}. {step.title}
                    </h3>
                    <span>{step.when}</span>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
