/**
 * One shape, two languages, two events. All four dictionaries satisfy
 * `Dictionary`, so a string that exists in one and not another fails
 * typecheck instead of silently rendering the wrong event's copy.
 */

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

/** A run of copy where `mark` marks the words the design lifts out of the sentence. */
type Segment = { t: string; mark?: boolean };

type Field = { label: string; placeholder: string };
type Choice = { label: string; options: string[] };

export type Dictionary = {
  /** Text that only assistive tech reads. */
  a11y: { skip: string; menu: string; events: string };
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    prize: string;
    arena: string;
    /** Optional, like `partners` below: only the event that runs the strip
        carries the link, so token-2049 gets no dead label. */
    partners?: string;
    who: string;
    process: string;
    faq: string;
    apply: string;
  };
  hero: {
    /** Both locales keep the English headline — it is the event's wordmark. */
    titleTop: string;
    titleLit: string;
    /** One entry per paragraph. */
    sub: Segment[][];
    ctaPrimary: string;
  };
  marquee: string[];
  seat: {
    status: string;
    note: string;
    takenStatus: string;
    takenNote: string;
    /** `{n}` is replaced with CONFIG.seatsOpen. */
    remaining: string;
  };
  countdown: {
    label: string;
    units: { d: string; h: string; m: string; s: string };
  };
  prize: {
    title: string[];
    intro: string;
    kicker: string;
    heading: Segment[];
    items: { k: string; lead: string; body: string }[];
    sideNote: string;
  };
  arena: {
    title: string[];
    intro: string;
    /** Accessible names for the carousel arrows, which are icon-only. */
    prev: string;
    next: string;
    cards: { idx: string; title: string; body: string }[];
  };
  who: {
    title: string[];
    intro: string;
    haveLabel: string;
    have: string[];
    not: string[];
  };
  process: {
    title: string[];
    intro: string;
    steps: { n: string; title: string; body: string; when: string }[];
  };
  apply: {
    kicker: string;
    title: string[];
    kv: { k: string; v: string }[];
    contactLabel: string;
    selectPlaceholder: string;
    fields: {
      name: Field;
      handle: Field;
      email: Field;
      telegram: Field;
      x: Field;
      city: Field;
      years: Choice;
      venue: Choice;
      volume: Choice;
      proof: Field;
      risk: Field;
      why: Field;
      available: Choice;
    };
    agree: string;
    submit: string;
    status: {
      missing: string;
      /** Shown under each field the applicant left empty. */
      required: string;
      /** Telegram and X satisfy one requirement between them. */
      eitherSocial: string;
      mailto: string;
      sending: string;
      ok: string;
      /** `{email}` is replaced with CONFIG.fallbackEmail. */
      error: string;
    };
    /** `{name}` is replaced with the applicant's name. */
    mailSubject: string;
  };
  faq: {
    title: string[];
    intro: string;
    items: { q: string; a: string }[];
  };
  final: { kicker: string; title: string[]; body: string; cta: string };
  /**
   * Optional: only perp-dex-day runs the partner strip. `items` names the
   * partners and sets their order; the component maps each name to its logo
   * file, so a name with no file drops out of the strip.
   */
  partners?: {
    kicker: string;
    title: string[];
    intro: string;
    items: string[];
  };
  footer: { backToTop: string };
};

import { en as perpDexDayEn } from "./perp-dex-day/en";
import { ko as perpDexDayKo } from "./perp-dex-day/ko";
import { en as token2049En } from "./token-2049/en";
import { ko as token2049Ko } from "./token-2049/ko";

const dictionaries: Record<EventSlug, Record<Locale, Dictionary>> = {
  "perp-dex-day": { en: perpDexDayEn, ko: perpDexDayKo },
  "token-2049": { en: token2049En, ko: token2049Ko },
};

export const getDictionary = (event: EventSlug, locale: Locale): Dictionary =>
  dictionaries[event][locale];

/** The locale the language switch in the header points at. */
export const otherLocale = (locale: Locale): Locale => (locale === "en" ? "ko" : "en");
