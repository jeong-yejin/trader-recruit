import type { Dictionary, EventSlug } from "@/lib/i18n";
import { COHOST_LOGOS } from "@/lib/events/assets";
import { MatrixRain } from "../visuals/MatrixRain";
import { StageBackdrop } from "../visuals/StageBackdrop";

/**
 * TemplateHouse block contest-N3: full-bleed title area over a moving backdrop.
 * perp-dex-day keeps the falling-glyph canvas ported from the legacy static
 * page; token-2049 runs the graded video stage instead. The two never load
 * together, so the event has to reach this far down.
 * The template's four floating dithered PNGs are gone — they were the old
 * background, and two of them crossed the headline. No JS binds to the block,
 * so the class names are what style.css lays out and have to match exactly.
 */
export function Hero({
  hero,
  event,
}: {
  hero: Dictionary["hero"];
  event: EventSlug;
}) {
  const cohostMark = hero.cohost && COHOST_LOGOS.get(hero.cohost.name);

  return (
    <section className="contest-N3" id="EpmtE69D23">
      <div className="contents-container container-full fullscreen">
        <div className="title-area" data-aos="fade-up">
          {/* The visible h1 lives in the header and is `.blind`, so this is the
              only place the event names itself above the fold. */}
          {hero.kicker && <p className="hero-kicker p3">{hero.kicker}</p>}
          {/* Read aloud it is the label followed by the mark's alt text, which
              is the same credit the sighted reader gets. */}
          {hero.cohost && (
            <p className="hero-cohost">
              <span className="p3">{hero.cohost.label}</span>
              {cohostMark ? (
                <img
                  src={cohostMark.src}
                  alt={hero.cohost.name}
                  width={cohostMark.w}
                  height={cohostMark.h}
                />
              ) : (
                <strong>{hero.cohost.name}</strong>
              )}
            </p>
          )}
          <h2>
            {hero.titleTop}
            <br /> {hero.titleLit}
          </h2>
          {hero.sub.map((para, p) => (
            <p className="p1" key={p}>
              {para.map((seg, i) =>
                seg.mark ? (
                  <strong key={i}>{seg.t}</strong>
                ) : (
                  <span key={i}>{seg.t}</span>
                ),
              )}
            </p>
          ))}
          {/* A dl, not a list of divs: each row is a label and its value, and
              that is what a screen reader should hear when it reaches the
              date. Empty is styled away rather than guarded for in JS. */}
          <dl className="hero-facts">
            {hero.facts.map((fact) => (
              <div key={fact.k}>
                <dt className="p3">{fact.k}</dt>
                <dd className="p2">{fact.v}</dd>
              </div>
            ))}
          </dl>
          <a href="#apply" className="btnset btnset-primary btnset-lg p2">
            <span>{hero.ctaPrimary}</span>
          </a>
        </div>
      </div>
      {event === "token-2049" ? <StageBackdrop /> : <MatrixRain />}
    </section>
  );
}
