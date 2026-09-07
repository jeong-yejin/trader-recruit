import type { Dictionary } from "@/lib/i18n";

/**
 * Not a TemplateHouse block. It borrows the container and title-area classes
 * so the heading lands on the same column as every other section, and
 * project.css carries the three items under it.
 *
 * It exists because nothing above it said what PERP-DEX DAY is: the hero opens
 * on the four seats, and the only sentence defining the event sat five
 * sections down inside the format carousel. Optional, like `partners` — the
 * event whose dictionary carries the copy is the event that renders it.
 */
export function About({ about }: { about: Dictionary["about"] }) {
  if (!about) return null;

  return (
    <section className="about" id="about">
      <div className="contents-container container-md">
        <div className="contents-inner">
          <div className="title-area" data-aos="fade-up">
            <h2 className="h2">
              {about.title.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
            <p className="p1">{about.lead}</p>
          </div>
          <ul className="about-row">
            {about.items.map((item) => (
              <li key={item.k} data-aos="fade-up">
                <p className="about-idx p3">{item.k}</p>
                <h3 className="h6">{item.title}</h3>
                <p className="p2">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
