import type { CSSProperties } from "react";
import type { Dictionary, EventSlug } from "@/lib/i18n";
import { PRIZE_ART, type EventArt } from "@/lib/events/assets";

/**
 * The template ships one blob per panel, tinted to the panel it sits on.
 * perp-dex-day trades them for the two halves of the choice the section is
 * about: the figure holding out the offer, and the hand the pills sit in.
 * Both are drawn dark, which is what keeps them legible on the bright panels.
 *
 * `mobile` only exists where the template ships a second crop for it.
 */
/** Decorative, so the alt stays empty and the copy beside it carries the meaning. */
function Thumb({ art }: { art: EventArt }) {
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
  const art = PRIZE_ART[event];

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
          {/* Under the two panels, not inside one: .blue is a fixed column with
              a blob absolutely placed in it, and eight rows do not fit beside
              the blob. The dt/dd shape is the one .hero-facts already uses for
              label-to-value, so a rank reads as the label for its prize. */}
          <div className="payout" data-aos="fade-up">
            <div className="payout-head">
              <h3 className="p3">{prize.payout.label}</h3>
              <p className="h5">{prize.payout.total}</p>
            </div>
            {/* One row, whatever the event pays: Korea lists four places and
                Singapore five. The column count comes from the dictionary, so a
                table that gains or loses a line needs no new rule. */}
            <dl
              className="payout-rows"
              style={
                { "--payout-cols": prize.payout.rows.length } as CSSProperties
              }
            >
              {prize.payout.rows.map((row) => (
                <div key={row.place}>
                  <dt className="p3">{row.place}</dt>
                  <dd className="p1">{row.prize}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
