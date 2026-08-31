/**
 * One shape, two languages. en.ts and ko.ts both satisfy `Dictionary`,
 * so a string that exists in one locale and not the other fails typecheck
 * instead of silently rendering as English on the Korean page.
 */

export const LOCALES = ["en", "ko"] as const;
export type Locale = (typeof LOCALES)[number];

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/** A run of copy where `mark` marks the words the design lifts out of the sentence. */
export type Segment = { t: string; mark?: boolean };

type Field = { label: string; placeholder: string };
type Choice = { label: string; options: string[] };

export type Dictionary = {
  /** Text that only assistive tech reads. */
  a11y: { skip: string; menu: string };
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    prize: string;
    arena: string;
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
      social: Field;
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
  footer: { backToTop: string };
};

import { en } from "./en";
import { ko } from "./ko";

const dictionaries: Record<Locale, Dictionary> = { en, ko };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

/** The locale the language switch in the header points at. */
export const otherLocale = (locale: Locale): Locale => (locale === "en" ? "ko" : "en");
