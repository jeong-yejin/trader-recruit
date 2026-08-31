import Link from "next/link";
import type { Dictionary, EventSlug, Locale } from "@/lib/i18n";
import { EVENT_LABELS, EVENTS, otherLocale } from "@/lib/i18n";

/**
 * TemplateHouse block contest-N1. The class names and the id are the contract
 * style.js binds to — it looks the block up as `.contest-N1[id='IvMte69CW4']`
 * and drives .btn-momenu, .header-gnbitem and .header-top-active from there.
 */
export function Header({
  lang,
  event,
  nav,
  a11y,
}: {
  lang: Locale;
  event: EventSlug;
  nav: Dictionary["nav"];
  a11y: Dictionary["a11y"];
}) {
  const other = otherLocale(lang);
  const links = [
    { href: "#prize", label: nav.prize },
    { href: "#arena", label: nav.arena },
    { href: "#who", label: nav.who },
    { href: "#process", label: nav.process },
    { href: "#faq", label: nav.faq },
  ];

  return (
    <header className="th-layout-header">
      <div className="contest-N1" id="IvMte69CW4">
        <a className="skip-link" href="#main">
          {a11y.skip}
        </a>
        <div className="header-container container-full">
          <div className="header-left">
            <div className="header-gnb">
              <ul className="header-gnblist">
                {links.map((link) => (
                  <li className="header-gnbitem" key={link.href}>
                    <a className="header-gnblink" href={link.href}>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="header-center">
            {/* The tabs replaced the wordmark, so the page heading is carried
                separately. .blind is templatehouse's visually-hidden class. */}
            <h1 className="blind">{EVENT_LABELS[event]}</h1>
            <nav className="header-title h5 event-tabs" aria-label={a11y.events}>
              {EVENTS.map((slug) => (
                <Link
                  className={slug === event ? "event-tab is-active" : "event-tab"}
                  key={slug}
                  href={`/${lang}/${slug}`}
                  aria-current={slug === event ? "page" : undefined}
                >
                  {EVENT_LABELS[slug]}
                </Link>
              ))}
            </nav>
          </div>
          <div className="header-right">
            <div className="header-utils">
              <ul>
                <li>
                  <Link className="btnset btnset-sm btnset-line-dark" href={`/${other}/${event}`}>
                    {other.toUpperCase()}
                  </Link>
                </li>
                <li className="button">
                  <a className="btnset btnset-primary btnset-sm p2" href="#apply">
                    <span>{nav.apply}</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* Three bars, not two: style.js hides the middle one to make the X. */}
            <button className="btn-momenu" type="button" aria-label={a11y.menu}>
              <span className="ico-hamburger" />
              <span className="ico-hamburger" />
              <span className="ico-hamburger" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
