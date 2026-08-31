import { CONFIG } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";

/**
 * TemplateHouse block contest-N2. style.js measures `.th-layout-footer` and
 * `.footer-container` to decide where the floating N4 bar stops, so both
 * class names have to be here even though nothing else reads them.
 */
export function Footer({ footer }: { footer: Dictionary["footer"] }) {
  const year = new Date(CONFIG.eventDate).getFullYear();

  return (
    <footer className="th-layout-footer">
      <div className="contest-N2" id="WWMtE69Ei3">
        <div className="footer-container container-md">
          <div className="footer-left">
            <h2 className="footer-logo h5">PERP DEX DAY</h2>
            <div className="footer-content">
              <ul className="footer-menulist">
                <li className="footer-menulink">
                  <a href="#main">{footer.backToTop}</a>
                </li>
                <li className="footer-menulink">
                  <a href={`mailto:${CONFIG.fallbackEmail}`}>{CONFIG.fallbackEmail}</a>
                </li>
              </ul>
              <div className="footer-txtgroup">
                <div className="footer-txt">
                  <p className="p3">ⓒ {year} PERP DEX DAY. ALL RIGHTS RESERVED</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
