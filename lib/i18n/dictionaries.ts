import type { Dictionary } from "./types.ts";
import { EVENTS, LOCALES, type EventSlug, type Locale } from "./routes.ts";
import { en as perpDexDayEn } from "./perp-dex-day/en.ts";
import { ko as perpDexDayKo } from "./perp-dex-day/ko.ts";
import { en as token2049En } from "./token-2049/en.ts";
import { ko as token2049Ko } from "./token-2049/ko.ts";

const dictionaries: Record<EventSlug, Record<Locale, Dictionary>> = {
  "perp-dex-day": { en: perpDexDayEn, ko: perpDexDayKo },
  "token-2049": { en: token2049En, ko: token2049Ko },
};

export const getDictionary = (event: EventSlug, locale: Locale): Dictionary =>
  dictionaries[event][locale];

export { EVENTS, LOCALES };
