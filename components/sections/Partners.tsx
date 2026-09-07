import type { Dictionary } from "@/lib/i18n";
import { PARTNER_LOGOS } from "@/lib/events/assets";

/**
 * Not a TemplateHouse block. It borrows the container and title-area classes so
 * the heading sits in the same grid as every other section, and project.css
 * carries the grid the logos sit in.
 *
 * The dictionary names the partners and fixes their order; this map turns a
 * name into its file and its intrinsic size. A name with no entry here drops
 * out of the strip rather than rendering a broken image.
 */
export function Partners({ partners }: { partners: Dictionary["partners"] }) {
  if (!partners) return null;

  return (
    <section className="partners" id="partners">
      <div className="contents-container container-md">
        <div className="contents-inner">
          <div className="title-area" data-aos="fade-up">
            <h2 className="h2">
              {partners.title.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
            <p className="p1">{partners.intro}</p>
          </div>
          <ul className="partners-row">
            {partners.items.map((name) => {
              const logo = PARTNER_LOGOS.get(name);
              if (!logo) return null;
              return (
                <li key={name}>
                  {/* The alt text is also the CSS hook: project.css sizes the
                      two odd aspect ratios with img[alt="..."]. */}
                  <img
                    src={`/resources/exchange-logo/${logo.file}`}
                    alt={name}
                    width={logo.w}
                    height={logo.h}
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
