export const LOCALES = ["en", "ko"] as const;
export type Locale = (typeof LOCALES)[number];

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/** Route slugs. The first one is what a bare /en or /ko redirects to. */
export const EVENTS = ["perp-dex-day", "token-2049"] as const;
export type EventSlug = (typeof EVENTS)[number];

export const isEvent = (value: string): value is EventSlug =>
  (EVENTS as readonly string[]).includes(value);

/** Wordmarks, not copy — they read the same in both locales. */
export const EVENT_LABELS: Record<EventSlug, string> = {
  "perp-dex-day": "PERP DEX DAY",
  "token-2049": "TOKEN 2049",
};

/** The locale the language switch in the header points at. */
export const otherLocale = (locale: Locale): Locale => (locale === "en" ? "ko" : "en");
