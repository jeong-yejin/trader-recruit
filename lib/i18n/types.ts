/** A run of copy where `mark` marks the words the design lifts out of the sentence. */
export type Segment = { t: string; mark?: boolean };

export type Field = { label: string; placeholder: string };
export type Choice = { label: string; options: string[] };

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
