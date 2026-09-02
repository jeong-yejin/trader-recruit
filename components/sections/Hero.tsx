import type { Dictionary, EventSlug } from "@/lib/i18n";
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
  return (
    <section className="contest-N3" id="EpmtE69D23">
      <div className="contents-container container-full fullscreen">
        <div className="title-area" data-aos="fade-up">
          <h2>
            {hero.titleTop}
            <br /> {hero.titleLit}
          </h2>
          {hero.sub.map((para, p) => (
            <p className="p1" key={p}>
              {para.map((seg, i) =>
                seg.mark ? <strong key={i}>{seg.t}</strong> : <span key={i}>{seg.t}</span>,
              )}
            </p>
          ))}
          <a href="#apply" className="btnset btnset-primary btnset-lg p2">
            <span>{hero.ctaPrimary}</span>
          </a>
        </div>
      </div>
      {event === "token-2049" ? <StageBackdrop /> : <MatrixRain />}
    </section>
  );
}
