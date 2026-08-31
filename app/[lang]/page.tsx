import { notFound, redirect } from "next/navigation";
import { EVENTS, isLocale } from "@/lib/i18n";

/**
 * /en and /ko were the whole site before the second event existed, so they
 * still resolve — they land on the first tab instead of 404ing.
 */
export default async function LangIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  redirect(`/${lang}/${EVENTS[0]}`);
}
