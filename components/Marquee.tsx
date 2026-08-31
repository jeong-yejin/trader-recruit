import { Fragment } from "react";

/**
 * TemplateHouse block contest-N10. style.js clones the single `.text-wrap span`
 * 30 times and runs it with GSAP, so this renders exactly one span — the
 * clone loop strips anything past the first child before it starts. The clone
 * is deep, so the separators inside the span survive it.
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
              {items.map((item) => (
                <Fragment key={item}>
                  {item}
                  <i aria-hidden="true">*</i>
                </Fragment>
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
