import type { Viewport } from "next";
import { notFound } from "next/navigation";
import { TemplateScripts } from "@/components/TemplateScripts";
import { isLocale, LOCALES } from "@/lib/i18n";

type Params = { params: Promise<{ lang: string }> };

/** Only en and ko exist — anything else 404s instead of rendering an empty page. */
export const dynamicParams = false;

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export const viewport: Viewport = { themeColor: "#000000" };

/* generateMetadata lives in [event]/page.tsx: every field of it is per-event. */

/**
 * The TemplateHouse stylesheets, in the order index.html loads them.
 * They stay plain files under public/ rather than imports so the cascade
 * is exactly what the template authors wrote: style.css is last and expects
 * to win over templatehouse.css.
 */
const STYLESHEETS = [
  "/resources/css/setting.css",
  "/resources/css/plugin.css",
  "/resources/css/templatehouse.css",
  "/resources/css/style.css",
  /* Ours, last: it only fills gaps the contest template has no block for. */
  "/resources/css/project.css",
];

/**
 * The same four scripts index.html ends with, in the same order.
 * TemplateScripts runs them in sequence, so only the first tag is on the
 * server-rendered page; the preloads below start the other three downloading
 * anyway. Next preloads the first one itself, and a repeated preload of one URL
 * costs a tag, not a request.
 */
const SCRIPTS = [
  "/resources/js/setting.js",
  "/resources/js/plugin.js",
  "/resources/js/templatehouse.js",
  "/resources/js/style.js",
];

export default async function LangLayout({
  children,
  params,
}: Params & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang}>
      <head>
        {STYLESHEETS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        {SCRIPTS.map((src) => (
          <link key={src} rel="preload" as="script" href={src} />
        ))}
      </head>
      <body>
        {children}
        <TemplateScripts srcs={SCRIPTS} />
      </body>
    </html>
  );
}
