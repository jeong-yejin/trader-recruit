import type { Dictionary } from "@/lib/i18n";
import { ArenaCarousel } from "./ArenaCarousel";

/**
 * Reuses the contest-N5 shell for its heading; the cards themselves are a
 * horizontal carousel (ArenaCarousel) rather than the template's tilted row,
 * so `no-thumb` now only covers the heading side of that modifier.
 */
export function Arena({ arena }: { arena: Dictionary["arena"] }) {
  return (
    <aside className="contest-N5 no-thumb" id="arena">
      <div className="contents-container container-md">
        <div className="contents-inner">
          <div className="title-area" data-aos="fade-up">
            <h2 className="h2">
              {arena.title.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
            <p className="p1">{arena.intro}</p>
          </div>
          <ArenaCarousel arena={arena} />
        </div>
      </div>
    </aside>
  );
}
