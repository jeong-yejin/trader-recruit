import type { Dictionary } from "@/lib/i18n";

/**
 * Not a TemplateHouse block. It borrows the container and title-area classes so
 * the heading sits in the same grid as every other section, and project.css
 * carries the grid the logos sit in.
 *
 * The dictionary names the partners and fixes their order; this map turns a
 * name into its file and its intrinsic size. A name with no entry here drops
 * out of the strip rather than rendering a broken image.
 */
const LOGOS = new Map([
  ["Variational", { file: "variational.svg", w: 1284, h: 171 }],
  ["Lighter", { file: "lighter.svg", w: 93, h: 30 }],
  ["Extended", { file: "extended.svg", w: 136, h: 24 }],
  ["Aster", { file: "aster.svg", w: 91, h: 24 }],
  ["MetaMask", { file: "MetaMask-logo-white.svg", w: 127, h: 63 }],
]);

export function Partners({ partners }: { partners: Dictionary["partners"] }) {
  if (!partners) return null;

  return (
    <section className="partners" id="partners">
      <div className="contents-container container-md">
        <div className="contents-inner">
          <div className="title-area" data-aos="fade-up">
            <p className="p2">{partners.kicker}</p>
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
              const logo = LOGOS.get(name);
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
