import type { Dictionary } from "@/lib/i18n";

/**
 * TemplateHouse block contest-N4: the bar that floats above the page and
 * parks itself above the footer. style.js finds it by
 * `.contest-N4[id='NDMTE69DHM']` and swaps fixed → absolute on scroll, so the
 * id has to stay.
 */
export function StickyCta({ final }: { final: Dictionary["final"] }) {
  return (
    <aside className="contest-N4" id="NDMTE69DHM">
      <div className="contents-container container-md">
        <div className="contents-inner">
          <h2 className="p2">{final.kicker}</h2>
          <a
            href="#apply"
            className="btnset btnset-primary btnset-sm btnset-icon ff-ico ti-code p2"
          >
            <span>{final.cta}</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
