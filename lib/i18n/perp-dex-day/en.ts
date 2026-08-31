import type { Dictionary } from "../index";

export const en: Dictionary = {
  a11y: { skip: "Skip to content", menu: "Menu", events: "Events" },
  meta: {
    title: "PERP-DEX DAY / Traders Wanted",
    description:
      "PERP-DEX DAY is recruiting 4 traders for a live, on-stage perpetuals trading competition during Korea Blockchain Week 2026. The winner flies to Singapore — flight and hotel covered.",
    ogTitle: "PERP-DEX DAY / Traders Wanted",
    ogDescription:
      "4 seats. One arena. The winner trades live in Singapore — flight and hotel on us.",
  },

  nav: {
    prize: "Prize",
    arena: "The Arena",
    who: "Who",
    process: "Process",
    faq: "FAQ",
    apply: "Apply ↗",
  },

  hero: {
    titleTop: "Four seats.",
    titleLit: "One arena.",
    sub: [
      [
        { t: "PERP-DEX DAY puts " },
        { t: "four traders on one stage", mark: true },
        {
          t: ", live in front of a room — real perps, real size, one leaderboard on the big screen.",
        },
      ],
      [
        { t: "Win it — only the winner — and you fly to " },
        { t: "Singapore", mark: true },
        { t: " for the live trading competition. " },
        { t: "Flight and hotel covered.", mark: true },
      ],
    ],
    ctaPrimary: "Take the seat ↗",
  },

  marquee: [
    "live on stage",
    "capital provided",
    "winner takes all",
    "1st place flies to singapore",
    "flight + hotel covered",
    "real perps · real size",
  ],

  seat: {
    status: "Open",
    note: "Unclaimed seat on the arena floor.",
    takenStatus: "Taken",
    takenNote: "Locked in. This seat is off the board.",
    remaining: "{n} of 4 seats still open",
  },

  countdown: {
    label: "The arena opens in",
    units: { d: "Days", h: "Hours", m: "Minutes", s: "Seconds" },
  },

  prize: {
    title: ["Win the arena,", "fly to Singapore."],
    intro: "There is no second place here.",
    kicker: "Champion package",
    heading: [
      { t: "A seat in the " },
      { t: "Singapore live trading competition", mark: true },
      { t: " — travel on us." },
    ],
    items: [
      {
        k: "01",
        lead: "Qualification.",
        body: "Guaranteed entry to the Singapore live trading competition.",
      },
      {
        k: "02",
        lead: "Flight.",
        body: "Round-trip airfare, Seoul ⇄ Singapore, booked and paid by us.",
      },
      {
        k: "03",
        lead: "Hotel.",
        body: "Accommodation for the competition dates, covered.",
      },
    ],
    sideNote:
      "Only first place takes a prize. All four trade on our capital, so nobody covers their own losses.",
  },

  arena: {
    prev: "Previous card",
    next: "Next card",
    title: ["How the arena works."],
    intro:
      "E-sports format, perps engine. Four traders, one clock, one screen — and a room full of people watching every fill.",
    cards: [
      {
        idx: "01 / Format",
        title: "Four traders, one clock",
        body:
          "All four trade the same session, same window, same venue-approved pairs. Everyone starts flat.",
      },
      {
        idx: "02 / Capital",
        title: "Capital is provided",
        body:
          "You don't bring your own bankroll. Each seat is funded with an identical starting balance for the session.",
      },
      {
        idx: "03 / Scoring",
        title: "Live PnL leaderboard",
        body:
          "Ranking is by session PnL, projected live on the main screen.",
      },
      {
        idx: "04 / Broadcast",
        title: "Your screen is the show",
        body:
          "Positions, entries and liquidation levels are on the big display. Commentary runs over the top, e-sports style.",
      },
      {
        idx: "05 / The crowd",
        title: "The room has a vote",
        body:
          "Attendees vote on who owns the arena before the bell. The crowd doesn't move your PnL — but it moves the room.",
      },
      {
        idx: "06 / The venue",
        title: "Korea Blockchain Week",
        body:
          "September 28, 2026 in Seoul, on the KBW 2026 week calendar, alongside the PERP-DEX DAY main stage and partner sessions.",
      },
    ],
  },

  who: {
    title: ["Who we're", "looking for."],
    intro:
      "Not the biggest account — the trader who can hold their process together with a room watching and a clock running.",
    haveLabel: "You should have",
    have: [
      "Live perpetuals experience — you trade perps now, not “used to”.",
      "A verifiable track record: exchange PnL page, read-only API, or a public profile we can check.",
      "A defined risk process you can explain in one paragraph.",
      "Comfort being on camera and on a live leaderboard.",
      "Full availability on event day in Seoul, plus a short briefing the day before.",
      "A valid passport, if you're the one who ends up on the Singapore flight.",
    ],
    not: [
      "A large following. We're picking traders, not accounts.",
      "Your own capital — the session bankroll is provided.",
      "A specific DEX. Bring whatever you actually trade on.",
      "Institutional background. Independent traders are welcome and expected.",
    ],
  },

  process: {
    title: ["Selection process."],
    intro: "Five rounds, fast.",
    steps: [
      {
        n: "01",
        title: "Apply",
        body:
          "Five minutes. Contact, venue you trade, and a link that proves the track record.",
        when: "Now — rolling",
      },
      {
        n: "02",
        title: "Track record review",
        body: "We verify PnL and risk behaviour from what you submit.",
        when: "Within 5 days",
      },
      {
        n: "03",
        title: "30-minute call",
        body:
          "Video call in Korean or English. Your process, your worst drawdown, and how you'd handle a live audience.",
        when: "By invitation",
      },
      {
        n: "04",
        title: "Seat confirmed",
        body:
          "Contract, briefing pack, rules and risk limits. Your name goes on the arena card and the vote page.",
        when: "Before event week",
      },
      {
        n: "05",
        title: "Arena day",
        body: "Briefing, sound check, then the bell.",
        when: "Sep 28 · Seoul",
      },
    ],
  },

  apply: {
    kicker: "Application",
    title: ["Claim", "a seat."],
    kv: [
      { k: "Time to complete", v: "About 5 minutes." },
      {
        k: "What we check",
        v: "Your track record link and your risk process. Nothing else carries weight.",
      },
      {
        k: "Security",
        v: "Never send a withdrawal-enabled API key, a seed phrase, or a password. Read-only keys or a screenshot page are enough.",
      },
    ],
    contactLabel: "Questions",
    selectPlaceholder: "Select",
    fields: {
      name: { label: "Name", placeholder: "Legal name" },
      handle: {
        label: "Trading handle",
        placeholder: "The name on the leaderboard",
      },
      email: { label: "Email", placeholder: "you@domain.com" },
      social: { label: "Telegram or X", placeholder: "@handle" },
      city: { label: "Based in", placeholder: "City, country" },
      years: {
        label: "Years trading perps",
        options: ["Under 1 year", "1–2 years", "3–5 years", "5 years or more"],
      },
      venue: {
        label: "Main venue",
        options: [
          "Variational",
          "Lighter",
          "Aster",
          "Extended",
          "Hyperliquid",
          "Backpack",
          "Other",
        ],
      },
      volume: {
        label: "Typical monthly volume",
        options: ["Under $100K", "$100K – $1M", "$1M – $10M", "Over $10M"],
      },
      proof: {
        label: "Track record link",
        placeholder:
          "Exchange PnL page, leaderboard profile, or a public thread",
      },
      risk: {
        label: "Your risk process, in one paragraph",
        placeholder:
          "Position sizing, max leverage, how you cut a loser, what makes you sit out a session.",
      },
      why: {
        label: "Why you should own the arena",
        placeholder: "Optional. Short is fine.",
      },
      available: {
        label: "Available Sep 28 in Seoul",
        options: [
          "Yes — Sep 28 full day, plus the briefing",
          "Yes, with a scheduling constraint",
          "Not sure yet",
        ],
      },
    },
    agree:
      "I confirm the track record I submitted is my own, I can attend in person in Seoul, and I agree to the event terms and privacy policy. I understand trading involves risk of loss.",
    submit: "Submit application ↗",
    status: {
      missing: "Fill in the required fields marked with *",
      required: "Required",
      mailto: "Opening your mail app to send the application…",
      sending: "Sending…",
      ok: "Application received. We reply to every applicant.",
      error: "Something broke on send. Mail us at {email}",
    },
    mailSubject: "PERP-DEX DAY — trader application: {name}",
  },

  faq: {
    title: ["Questions."],
    intro: "Anything not covered here — mail us and we'll answer directly.",
    items: [
      {
        q: "Is this open to traders outside Korea?",
        a: "Yes — but the arena is offline in Seoul on September 28, 2026, and you need to be in the room. Tell us where you're based in the form and we'll talk about travel.",
      },
      {
        q: "What do I send as proof of track record?",
        a: "A shareable exchange PnL page, a public leaderboard profile, or a read-only API key. Never send a withdrawal-enabled key, a seed phrase, or a password — we will never ask for one, and any message that does is not from us.",
      },
      {
        q: "Which pairs and what leverage?",
        a: "The approved pair list, maximum leverage and risk limits are fixed at the briefing the day before and are identical for all four seats. Breaching a limit is disqualifying.",
      },
      {
        q: "Do I need to speak English?",
        a: "No. The interview and the event run in Korean or English, whichever you prefer. Interpretation is available on stage.",
      },
      {
        q: "Can I bring my own setup?",
        a: "Your own keyboard and mouse, yes. Machines and screens are provided and identical, and the session runs on the venue network.",
      },
    ],
  },

  final: {
    kicker: "The arena is filling",
    title: ["Four seats.", "One flight to Singapore."],
    body:
      "Applications are reviewed as they arrive and the call closes the moment the last seat is claimed.",
    cta: "Take the seat ↗",
  },

  footer: { backToTop: "Back to top ↑" },
};
