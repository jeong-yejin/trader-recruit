import { CONFIG } from "@/lib/config";
import { FOOTER_LOGOS } from "@/lib/events/assets";
import { EVENT_LABELS } from "@/lib/i18n";
import type { Dictionary, EventSlug } from "@/lib/i18n";

/** Keyed by event: an event with no entry here falls back to its text label. */
/**
 * TemplateHouse block contest-N2. style.js measures `.th-layout-footer` and
 * `.footer-container` to decide where the floating N4 bar stops, so both
 * class names have to be here even though nothing else reads them.
 */
export function Footer({
  footer,
  event,
}: {
  footer: Dictionary["footer"];
  event: EventSlug;
}) {
  const year = new Date(CONFIG.eventDate[event]).getFullYear();
  const label = EVENT_LABELS[event];
  // Only perp-dex-day has a drawn wordmark; token-2049 sets its label as text.
  const logo = event === "perp-dex-day" ? FOOTER_LOGOS[event] : null;

  return (
    <footer className="th-layout-footer">
      <div className="contest-N2" id="WWMtE69Ei3">
        <div className="footer-container container-md">
          <div className="footer-left">
            <h2 className="footer-logo h5">
              {logo ? (
                <img
                  src={logo.src}
                  alt={label}
                  width={logo.w}
                  height={logo.h}
                />
              ) : (
                label
              )}
            </h2>
            <div className="footer-content">
              <ul className="footer-menulist">
                <li className="footer-menulink">
                  <a href="#main">{footer.backToTop}</a>
                </li>
              </ul>
              <div className="footer-txtgroup">
                <div className="footer-txt">
                  <p className="p3">ⓒ {year} {label}. ALL RIGHTS RESERVED</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
