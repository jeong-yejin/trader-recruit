import type { Dictionary, EventSlug } from "@/lib/i18n";

/**
 * The template ships one blob per panel, tinted to the panel it sits on.
 * perp-dex-day trades them for the two halves of the choice the section is
 * about: the figure holding out the offer, and the hand the pills sit in.
 * Both are drawn dark, which is what keeps them legible on the bright panels.
 *
 * `mobile` only exists where the template ships a second crop for it.
 */
type Art = { src: string; mobile?: string };

const ART: Record<EventSlug, { green: Art; blue: Art }> = {
  "perp-dex-day": {
    green: { src: "/resources/images/prize-hand.png" },
    blue: { src: "/resources/images/prize-pose.png" },
  },
  "token-2049": {
    green: {
      src: "/resources/images/contest_N6_01.png",
      mobile: "/resources/images/contest_N6_04.png",
    },
    blue: {
      src: "/resources/images/contest_N6_03.png",
      mobile: "/resources/images/contest_N6_06.png",
    },
  },
};

/** Decorative, so the alt stays empty and the copy beside it carries the meaning. */
function Thumb({ art }: { art: Art }) {
  return (
    <div className="thumb">
      <picture>
        {art.mobile && <source media="(max-width:992px)" srcSet={art.mobile} />}
        <img src={art.src} alt="" />
      </picture>
    </div>
  );
}

/**
 * TemplateHouse block contest-N6: one tall panel on the left, two stacked on
 * the right. Each panel is a `dl`, so the panel count stays at the template's
 * three while the lists inside grow with the copy.
 */
export function Prize({
  prize,
  event,
}: {
  prize: Dictionary["prize"];
  event: EventSlug;
}) {
  const art = ART[event];

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
                <Thumb art={art.green} />
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
                <Thumb art={art.blue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
