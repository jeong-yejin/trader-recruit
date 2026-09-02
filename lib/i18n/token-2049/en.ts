import type { Dictionary } from "../types.ts";

export const en: Dictionary = {
  a11y: { skip: "Skip to content", menu: "Menu", events: "Events" },
  meta: {
    title: "ASIA TRADING CHAMPIONSHIP with Kalshi / Traders Wanted",
    description:
      "We're looking for traders to compete in the Asia live on-chain trading championship, held with Kalshi at Zouk Singapore during TOKEN2049 Singapore week.",
    ogTitle: "ASIA TRADING CHAMPIONSHIP with Kalshi",
    ogDescription:
      "A live on-chain match to decide Asia's best trader. Take the stage at the TOKEN2049 Singapore Side Event.",
  },

  nav: {
    prize: "Championship",
    arena: "Format",
    who: "Who",
    process: "Process",
    faq: "FAQ",
    apply: "Apply ↗",
  },

  hero: {
    titleTop: "Asia’s traders.",
    titleLit: "One arena.",
    sub: [
      [
        {
          t: "With Kalshi, we're deciding Asia's best on-chain trader.",
          mark: true,
        },
      ],
      [
        {
          t: "TOKEN2049 Singapore Side Event · October 5, 2026 · Zouk Singapore",
        },
      ],
    ],
    ctaPrimary: "Apply to the championship ↗",
  },

  marquee: [
    "asia trading championship",
    "with kalshi",
    "recruiting asia's traders",
    "live on-chain trading",
    "a match in front of a crowd",
    "token2049 singapore side event",
    "perpdex day singapore",
    "zouk singapore",
  ],

  seat: {
    status: "Open",
    note: "Open for applications.",
    takenStatus: "Closed",
    takenNote: "Applications are closed.",
    remaining: "{n} seats still open",
  },

  countdown: {
    label: "The championship starts in",
    units: { d: "Days", h: "Hours", m: "Minutes", s: "Seconds" },
  },

  prize: {
    title: ["Take the Singapore stage", "that decides Asia's best trader."],
    intro:
      "The Asia Trading Championship, with Kalshi, runs at Zouk Singapore during TOKEN2049 Singapore week.",
    kicker: "ASIA TRADING CHAMPIONSHIP · WITH KALSHI",
    heading: [
      { t: "Any trader who proves it with real trades", mark: true },
      { t: " can apply to the championship." },
    ],
    items: [
      {
        k: "01",
        lead: "Asia championship",
        body: "Traders from across Asia compete on one stage for the champion's seat.",
      },
      {
        k: "02",
        lead: "Live on-chain match",
        body: "You go up against the field on real on-chain results and performance.",
      },
      {
        k: "03",
        lead: "Crowd predictions with Kalshi",
        body: "Over 1,000 people in the room follow every trade and predict the winner.",
      },
    ],
    sideNote:
      "Prize money, travel support and other conditions go to the traders who make the final selection.",
  },

  arena: {
    prev: "Previous card",
    next: "Next card",
    title: ["Every trade you make", "is part of deciding Asia's champion."],
    intro:
      "An e-sports style live trading championship with Kalshi. Real trading performance decides it, not presentations.",
    cards: [
      {
        idx: "01 / Format",
        title: "You start trading at the same time",
        body: "Selected Asian traders compete in one arena with live on-chain trades.",
      },
      {
        idx: "02 / Performance",
        title: "Your results show live",
        body: "The crowd follows each trader's performance and every move on the leaderboard.",
      },
      {
        idx: "03 / The crowd",
        title: "The crowd predicts the champion",
        body: "Before the start, the audience picks the trader they think takes the title, with Kalshi.",
      },
      {
        idx: "04 / Stage",
        title: "An arena-grade LED stage",
        body: "Lighting, cameras, sound and a large LED wall. It runs as a live show.",
      },
      {
        idx: "05 / The room",
        title: "Global crypto attendees fill the room",
        body: "Traders, institutions, KOLs and media gathered for TOKEN2049 week watch the match in one space.",
      },
      {
        idx: "06 / Venue",
        title: "Zouk Singapore",
        body: "October 5, 2026, as a TOKEN2049 Singapore Side Event.",
      },
    ],
  },

  who: {
    title: ["We're looking for traders", "who'll compete for Asia's title."],
    intro:
      "Follower count carries no weight. We look at your trading record, your risk process, and how you perform on a live stage.",
    haveLabel: "You're a good fit if",
    have: [
      "You currently trade perpetuals or on-chain derivatives.",
      "You can show your track record: an exchange PnL page, a read-only API, or a public profile.",
      "You can explain your own trading rules and risk process.",
      "You can trade as usual with an audience and cameras on you.",
      "You can be at the venue in Singapore on October 5, 2026.",
      "You can do the interview in English or another supported language.",
    ],
    not: [
      "Follower count and name recognition alone won't get you selected.",
      "Independent traders with no institutional background can apply.",
      "Nationality and country of residence don't limit your application.",
      "We never accept withdrawal-enabled API keys or seed phrases.",
    ],
  },

  process: {
    title: ["How you get to the Singapore stage."],
    intro:
      "Applications and interviews decide who competes in the Asia Trading Championship.",
    steps: [
      {
        n: "01",
        title: "Apply",
        body: "Five minutes. Contact, the venue you trade, and a link that proves the track record.",
        when: "Now — rolling",
      },
      {
        n: "02",
        title: "Track record review",
        body: "We check your trading performance and your risk process from what you send.",
        when: "Within 5 days",
      },
      {
        n: "03",
        title: "30-minute call",
        body: "Your trading rules, your risk process, and the strategy you'd run on a live stage, in whichever language you're comfortable with.",
        when: "By invitation",
      },
      {
        n: "04",
        title: "Entry confirmed",
        body: "We send the contract and the participation pack, and your name goes up on the championship page.",
        when: "Before event week",
      },
      {
        n: "05",
        title: "Championship day",
        body: "Check-in and an equipment check, then live trading starts.",
        when: "Oct 5 · Singapore",
      },
    ],
  },

  apply: {
    kicker: "ASIA TRADING CHAMPIONSHIP",
    title: ["Take your shot at", "Asia's championship stage."],
    kv: [
      { k: "Date", v: "October 5, 2026" },
      { k: "Venue", v: "Zouk Singapore" },
      { k: "Partner", v: "Kalshi" },
      {
        k: "What we check",
        v: "Your trading record, your risk process, and how you'd hold up on a live stage.",
      },
    ],
    contactLabel: "Questions",
    selectPlaceholder: "Select",
    fields: {
      name: { label: "Name", placeholder: "Legal name" },
      handle: {
        label: "Handle",
        placeholder: "The name you'll use in the championship",
      },
      email: { label: "Email", placeholder: "you@domain.com" },
      telegram: { label: "Telegram", placeholder: "@handle" },
      x: { label: "X", placeholder: "@handle" },
      city: { label: "Based in", placeholder: "City, country" },
      years: {
        label: "Years trading perps",
        options: ["Under 1 year", "1–2 years", "3–5 years", "5 years or more"],
      },
      venue: {
        label: "Main venue or protocol",
        options: [
          "Hyperliquid",
          "Lighter",
          "Aster",
          "Variational",
          "edgeX",
          "GRVT",
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
          "A PnL page, public profile, leaderboard — anything we can check",
      },
      risk: {
        label: "Your risk process",
        placeholder:
          "Position sizing, max leverage, where you cut a loser, and the rules you hold to",
      },
      why: {
        label: "Why you're applying",
        placeholder:
          "In a few lines, why you want to compete in the Asia Trading Championship",
      },
      available: {
        label: "Can you be in Singapore on October 5?",
        options: [
          "Yes, all day.",
          "Yes, with a scheduling constraint.",
          "Not sure yet.",
        ],
      },
    },
    agree:
      "The track record I submitted is my own. I can attend in person in Singapore, and I agree to the championship terms, the privacy policy, and the risk of trading losses.",
    submit: "Apply to the championship ↗",
    status: {
      missing: "Fill in the fields marked with *",
      required: "Required",
      eitherSocial: "Enter at least one of Telegram or X",
      mailto: "Hit send in your mail app and the application reaches us",
      sending: "Sending…",
      ok: "Application received. We'll review it and reply individually",
      error: "The mail didn't send. Write to {email} directly",
    },
    mailSubject: "ASIA TRADING CHAMPIONSHIP trader application: {name}",
  },

  faq: {
    title: ["Questions."],
    intro:
      "Anything not covered here — message us on Telegram at @reboundx_cs.",
    items: [
      {
        q: "Can I apply if I don't live in Singapore?",
        a: "Yes. Nationality and country of residence aren't restricted, but you have to be at Zouk Singapore in person on October 5, 2026.",
      },
      {
        q: "How do I submit my track record?",
        a: "Send anything that verifies your own trading: an exchange PnL page, a public profile, a leaderboard, or a read-only API key. We never accept withdrawal-enabled API keys, seed phrases or passwords.",
      },
      {
        q: "How are traders selected?",
        a: "Size alone doesn't decide it. We look at the track record, the risk process, and whether you can hold your strategy together on a live stage.",
      },
      {
        q: "What about prize money and travel support?",
        a: "Prize money, travel support and the championship rules are shared individually during final selection.",
      },
      {
        q: "What is the Asia Trading Championship?",
        a: "A live on-chain trading competition run with Kalshi during TOKEN2049 Singapore week. Each trader's performance is shown live in the room, and the crowd predicts which trader takes the title.",
      },
    ],
  },

  final: {
    kicker: "ASIA TRADING CHAMPIONSHIP · WITH KALSHI",
    title: ["The first stage on the way", "to Asia's title."],
    body:
      "Show us your record and your risk process. Applications are reviewed in the order they arrive.",
    cta: "Apply to the championship ↗",
  },

  footer: { backToTop: "Back to top ↑" },
};
