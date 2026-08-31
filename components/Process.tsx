import type { Dictionary } from "@/lib/i18n";

/**
 * TemplateHouse block contest-N7. style.js looks it up as
 * `.contest-N7[id='fPMtE69e1t']` and gives each `.list li` a ScrollTrigger
 * that toggles `.active` above 993px, so both the class names and the id are
 * fixed. The nav anchor rides on a wrapper instead of the block itself.
 */
export function Process({ process }: { process: Dictionary["process"] }) {
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
                  <img src="/resources/images/contest_N7_01.png" alt="" className="img-1" />
                  <img src="/resources/images/contest_N7_02.png" alt="" className="img-2" />
                  <img src="/resources/images/contest_N7_03.png" alt="" className="img-3" />
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
