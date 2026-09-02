import { Fragment } from "react";

/**
 * The dictionaries write the partner lines as "with <name>", so the name is
 * what decides whether a line runs as a mark instead of as words. A name with
 * no file here stays text, which is what keeps "with kalshi" and every
 * non-partner line rendering the way they always did.
 *
 * The intrinsic size matters more than usual: style.js measures the span to
 * decide how many copies to clone, and without the attributes the marks would
 * be 0x0 at that moment and the loop would come out the wrong length.
 */
const LOGOS = new Map([
  ["variational", { file: "variational.svg", w: 1284, h: 171 }],
  ["lighter", { file: "lighter.svg", w: 93, h: 30 }],
  ["extended", { file: "extended.svg", w: 136, h: 24 }],
  ["aster", { file: "aster.svg", w: 91, h: 24 }],
  ["metamask", { file: "MetaMask-logo-white.svg", w: 127, h: 63 }],
]);

const partnerOf = (item: string) => item.replace(/^with\s+/i, "").toLowerCase();

/**
 * TemplateHouse block contest-N10. style.js clones the single `.text-wrap span`
 * and runs it with GSAP, so this renders exactly one span — the clone loop
 * strips anything past the first child before it starts. The clone is deep, so
 * the separators and the marks inside the span survive it.
 *
 * The `*` is an <i>, not a <span>: the template styles `.text-wrap span` as a
 * descendant selector, and a nested span would inherit its padding.
 */
export function Marquee({ items }: { items: string[] }) {
  return (
    <section className="contest-N10" id="WimTe69D5H">
      <div className="contents-container container-full">
        <div className="loop-area">
          <div className="text-wrap">
            <span className="h4">
              {items.map((item) => {
                const key = partnerOf(item);
                const logo = LOGOS.get(key);
                return (
                  <Fragment key={item}>
                    {logo ? (
                      /* alt carries the line it replaced, so the band reads the
                         same aloud as it did in text. data-logo is the CSS hook:
                         the five aspect ratios need their own heights and the
                         alt text changes with the locale. */
                      <img
                        src={`/resources/exchange-logo/${logo.file}`}
                        alt={item}
                        data-logo={key}
                        width={logo.w}
                        height={logo.h}
                      />
                    ) : (
                      item
                    )}
                    <i aria-hidden="true">*</i>
                  </Fragment>
                );
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
