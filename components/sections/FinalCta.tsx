import type { Dictionary, EventSlug } from "@/lib/i18n";
import { CodeRain } from "../visuals/CodeRain";
import { RetroGrid } from "../visuals/RetroGrid";

/**
 * TemplateHouse block contest-N9. The template's three drifting thumbnail rows
 * are gone: the backdrop canvas paints the section opaque, so the strip cost 30
 * nodes and 15 image requests to render nothing. CodeRain no longer samples
 * those pictures either, so the block ships no image at all.
 *
 * The two events close on different backdrops, so this is the one place the
 * slug is read rather than left to a .ev- class: the canvases draw their own
 * colour, and CSS cannot turn falling glyphs into a perspective grid.
 */

export function FinalCta({
  final,
  event,
}: {
  final: Dictionary["final"];
  event: EventSlug;
}) {
  return (
    <section className="contest-N9" id="wWMTE69EdP">
      <div className="contents-container container-md">
        <div className="contents-inner">
          <div className="title-area" data-aos="fade-up">
            <h2 className="h2">
              {final.title.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
            <p className="p1">{final.body}</p>
            <div className="link-wrap">
              <a href="#apply" className="btnset btnset-lg btnset-primary">
                <span>{final.cta}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {event === "token-2049" ? <RetroGrid /> : <CodeRain />}
    </section>
  );
}
