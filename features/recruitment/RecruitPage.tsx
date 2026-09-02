import type { Dictionary, EventSlug, Locale } from "@/lib/i18n";
import { ApplySection } from "@/features/application/ApplySection";
import { Arena } from "@/components/sections/Arena";
import { Faq } from "@/components/sections/Faq";
import { Partners } from "@/components/sections/Partners";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Process } from "@/components/sections/Process";
import { Prize } from "@/components/sections/Prize";
import { SeatBand } from "@/components/sections/SeatBand";
import { StickyCta } from "@/components/layout/StickyCta";
import { Who } from "@/components/sections/Who";

export function RecruitPage({
  lang,
  event,
  dictionary,
}: {
  lang: Locale;
  event: EventSlug;
  dictionary: Dictionary;
}) {
  return (
    <div className={`ev ev-${event}`}>
      <Header lang={lang} event={event} nav={dictionary.nav} a11y={dictionary.a11y} />
      <main className="th-layout-main" id="main">
        <div className="th-layout-content">
          <Hero hero={dictionary.hero} event={event} />
          <Marquee items={dictionary.marquee} />
          <StickyCta final={dictionary.final} />
          <SeatBand seat={dictionary.seat} countdown={dictionary.countdown} event={event} />
          <Prize prize={dictionary.prize} event={event} />
          <Arena arena={dictionary.arena} />
          <Partners partners={dictionary.partners} />
          <Who who={dictionary.who} />
          <Process process={dictionary.process} event={event} />
          <ApplySection apply={dictionary.apply} />
          <Faq faq={dictionary.faq} />
          <FinalCta final={dictionary.final} event={event} />
        </div>
      </main>
      <Footer footer={dictionary.footer} event={event} />
    </div>
  );
}
