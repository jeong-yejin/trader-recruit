import type { Dictionary } from "@/lib/i18n";
import { CodeRain } from "./CodeRain";

/**
 * TemplateHouse block contest-N9. The template's three drifting thumbnail rows
 * are gone: CodeRain paints the section opaque, so the strip cost 30 nodes and
 * 15 image requests to render nothing. CodeRain no longer samples those
 * pictures either, so the block ships no image at all.
 */

export function FinalCta({ final }: { final: Dictionary["final"] }) {
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
      <CodeRain />
    </section>
  );
}
