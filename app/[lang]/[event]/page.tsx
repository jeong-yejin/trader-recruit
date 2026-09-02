import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Apply } from "@/components/Apply";
import { Arena } from "@/components/Arena";
import { Faq } from "@/components/Faq";
import { Partners } from "@/components/Partners";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Process } from "@/components/Process";
import { Prize } from "@/components/Prize";
import { SeatBand } from "@/components/SeatBand";
import { StickyCta } from "@/components/StickyCta";
import { Who } from "@/components/Who";
import { EVENTS, getDictionary, isEvent, isLocale, LOCALES } from "@/lib/i18n";

type Params = { params: Promise<{ lang: string; event: string }> };

/** Four pages: two locales times two events. Nothing else resolves. */
export const generateStaticParams = () =>
  LOCALES.flatMap((lang) => EVENTS.map((event) => ({ lang, event })));

/**
 * Metadata lives here, not in the layout: every field of it is per-event, and
 * the layout above only knows the locale.
 */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, event } = await params;
  if (!isLocale(lang) || !isEvent(event)) return {};
  const { meta } = getDictionary(event, lang);

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      type: "website",
      locale: lang === "ko" ? "ko_KR" : "en_US",
    },
    alternates: {
      canonical: `/${lang}/${event}`,
      languages: { en: `/en/${event}`, ko: `/ko/${event}` },
    },
  };
}

/**
 * The th-layout-* wrappers are the TemplateHouse page shell. style.js measures
 * .th-layout-footer to park the floating contest-N4 bar, so the structure
 * matches index.html rather than being flattened.
 *
 * The .ev-<slug> wrapper is what scopes a per-event skin: project.css is one
 * file behind both events, so token-2049's stage styling hangs off this class
 * and perp-dex-day keeps the template's own look. style.js reaches the footer
 * with a descendant selector, so the extra div does not break it.
 */
export default async function RecruitPage({ params }: Params) {
  const { lang, event } = await params;
  if (!isLocale(lang) || !isEvent(event)) notFound();
  const d = getDictionary(event, lang);

  return (
    <div className={`ev ev-${event}`}>
      <Header lang={lang} event={event} nav={d.nav} a11y={d.a11y} />
      <main className="th-layout-main" id="main">
        <div className="th-layout-content">
          <Hero hero={d.hero} event={event} />
          <Marquee items={d.marquee} />
          <StickyCta final={d.final} />
          <SeatBand seat={d.seat} countdown={d.countdown} event={event} />
          <Prize prize={d.prize} event={event} />
          <Arena arena={d.arena} />
          <Partners partners={d.partners} />
          <Who who={d.who} />
          <Process process={d.process} event={event} />
          <Apply apply={d.apply} />
          <Faq faq={d.faq} />
          <FinalCta final={d.final} event={event} />
        </div>
      </main>
      <Footer footer={d.footer} event={event} />
    </div>
  );
}
