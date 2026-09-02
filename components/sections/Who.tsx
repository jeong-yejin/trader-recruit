import type { Dictionary } from "@/lib/i18n";

/**
 * TemplateHouse block contest-N5: heading over a card row. Nothing in style.js
 * binds to N5, so the section carries the nav anchor id instead of the
 * template's own block id. Text-only (`no-thumb`) because the template ships
 * three figure images and this list has six — cycling them reads as a bug.
 */
export function Who({ who }: { who: Dictionary["who"] }) {
  return (
    <aside className="contest-N5 no-thumb" id="who">
      <div className="contents-container container-md">
        <div className="contents-inner">
          <div className="title-area" data-aos="fade-up">
            <h2 className="h2">
              {who.title.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
            <p className="p1">{who.intro}</p>
          </div>
          <p className="list-label h5">{who.haveLabel}</p>
          <ul className="list-area">
            {who.have.map((item, i) => (
              <li key={item}>
                <figure>
                  <figcaption>
                    <span className="card-idx">{String(i + 1).padStart(2, "0")}</span>
                    <strong className="h5">{item}</strong>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <div className="not-area">
            <ul>
              {who.not.map((item) => (
                <li key={item}>
                  <span className="p1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
