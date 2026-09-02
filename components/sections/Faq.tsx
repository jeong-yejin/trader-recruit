import type { Dictionary } from "@/lib/i18n";

/**
 * TemplateHouse block contest-N8: an accordset over a notes list.
 * templatehouse.js binds every `.accordset-button` on the page and opens the
 * matching `.accordset-body` with jQuery slideToggle, so the nesting here has
 * to stay header → button, body → content.
 */
export function Faq({ faq }: { faq: Dictionary["faq"] }) {
  return (
    <section className="contest-N8" id="faq">
      <div className="contents-container container-md">
        <div className="contents-inner">
          <div className="title-area" data-aos="fade-up">
            <h2 className="h2">
              {faq.title.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
            <p className="p1">{faq.intro}</p>
          </div>
          <div className="accordset accordset-arrow">
            {faq.items.map((item) => (
              <div className="accordset-item" key={item.q}>
                <div className="accordset-header">
                  <button className="accordset-button btn" type="button">
                    <span className="p1">{item.q}</span>
                  </button>
                </div>
                <div className="accordset-body">
                  <div className="p1 accordset-content">
                    <span className="p1">{item.a}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
