import { notFound } from "next/navigation";
import { Apply } from "@/components/Apply";
import { Arena } from "@/components/Arena";
import { Faq } from "@/components/Faq";
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
import { getDictionary, isLocale } from "@/lib/i18n";

/**
 * The th-layout-* wrappers are the TemplateHouse page shell. style.js measures
 * .th-layout-footer to park the floating contest-N4 bar, so the structure
 * matches index.html rather than being flattened.
 */
export default async function RecruitPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);

  return (
    <>
      <Header lang={lang} nav={d.nav} a11y={d.a11y} />
      <main className="th-layout-main" id="main">
        <div className="th-layout-content">
          <Hero hero={d.hero} />
          <Marquee items={d.marquee} />
          <StickyCta final={d.final} />
          <SeatBand seat={d.seat} countdown={d.countdown} />
          <Prize prize={d.prize} />
          <Arena arena={d.arena} />
          <Who who={d.who} />
          <Process process={d.process} />
          <Apply apply={d.apply} />
          <Faq faq={d.faq} />
          <FinalCta final={d.final} />
        </div>
      </main>
      <Footer footer={d.footer} />
    </>
  );
}
