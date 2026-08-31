import type { Dictionary } from "@/lib/i18n";

/**
 * TemplateHouse block contest-N6: one tall panel on the left, two stacked on
 * the right. Each panel is a `dl`, so the panel count stays at the template's
 * three while the lists inside grow with the copy.
 */
export function Prize({ prize }: { prize: Dictionary["prize"] }) {
  return (
    <section className="contest-N6" id="prize">
      <div className="contents-container container-md">
        <div className="contents-inner">
          <div className="title-area" data-aos="fade-up">
            <h2 className="h2">
              {prize.title.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
            <p className="p1">{prize.intro}</p>
          </div>
          <div className="list-area">
            <div className="col-left">
              <div className="green" data-aos="fade-up">
                <div className="desc">
                  <h3 className="h5">{prize.kicker}</h3>
                  <dl>
                    {prize.items.map((item) => (
                      <div key={item.k}>
                        <dt className="h6">
                          {item.k} {item.lead}
                        </dt>
                        <dd>{item.body}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="thumb">
                  <picture>
                    <source
                      media="(max-width:992px)"
                      srcSet="/resources/images/contest_N6_04.png"
                    />
                    <img src="/resources/images/contest_N6_01.png" alt="" />
                  </picture>
                </div>
              </div>
            </div>
            <div className="col-right">
              <div className="blue" data-aos="fade-up">
                <div className="desc">
                  <h3 className="h5">
                    {prize.heading.map((seg, i) =>
                      seg.mark ? <strong key={i}>{seg.t}</strong> : <span key={i}>{seg.t}</span>,
                    )}
                  </h3>
                  <dl>
                    <dd>{prize.sideNote}</dd>
                  </dl>
                </div>
                <div className="thumb">
                  <picture>
                    <source
                      media="(max-width:992px)"
                      srcSet="/resources/images/contest_N6_06.png"
                    />
                    <img src="/resources/images/contest_N6_03.png" alt="" />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
