import type { Dictionary } from "../types.ts";

export const en: Dictionary = {
  a11y: { skip: "Skip to content", menu: "Menu", events: "Events" },
  meta: {
    title: "PERP-DEX DAY / Traders Wanted",
    description:
      "With Variational, Lighter, Extended, Aster and MetaMask, we're looking for 4 traders to compete in a live perpetuals trading competition in Seoul on September 28, 2026. First place goes on to the Asia Trading Championship with Kalshi.",
    ogTitle: "PERP-DEX DAY / Traders Wanted",
    ogDescription:
      "Four seats, one ticket to Singapore. First place takes the flight and hotel and goes on to the Asia Trading Championship.",
  },

  nav: {
    prize: "Prize",
    arena: "Format",
    partners: "Partners",
    who: "Who",
    process: "Process",
    faq: "FAQ",
    apply: "Apply ↗",
  },

  hero: {
    titleTop: "Four seats.",
    titleLit: "One ticket.",
    sub: [
      [
        {
          t: "Four traders trade live on stage, on real accounts with real capital.",
          mark: true,
        },
        { t: " We put up the capital and we cover the losses." },
      ],
      [
        {
          t: "First place goes on to the Asia Trading Championship in Singapore, with Kalshi. Flight and hotel covered.",
        },
      ],
    ],
    facts: [
      { k: "Date", v: "September 28, 2026" },
      { k: "Venue", v: "SJ KUNSTHALLE, Seoul" },
      { k: "On stage", v: "4 traders" },
      { k: "Trading capital", v: "Fully funded" },
    ],
    ctaPrimary: "Apply for a seat ↗",
  },

  marquee: [
    "live trading on stage",
    "real accounts · real capital",
    "trading capital fully covered",
    "first place flies to singapore",
    "flight and hotel covered",
    "with variational",
    "with lighter",
    "with extended",
    "with aster",
    "with metamask",
  ],

  seat: {
    status: "Open",
    note: "Open for applications.",
    takenStatus: "Taken",
    takenNote: "This seat is confirmed.",
    remaining: "{n} of 4 seats still open",
  },

  countdown: {
    label: "The competition starts in",
    units: { d: "Days", h: "Hours", m: "Minutes", s: "Seconds" },
  },

  prize: {
    title: ["Only first place", "flies to Singapore."],
    intro: "Prove it in Seoul, then go for the Asia title.",
    kicker: "What first place gets",
    heading: [
      { t: "A seat in the Asia Trading Championship", mark: true },
      { t: ", with the flight and hotel covered." },
    ],
    items: [
      {
        k: "01",
        lead: "Championship entry",
        body: "You go on to the Asia Trading Championship in Singapore, with Kalshi.",
      },
      {
        k: "02",
        lead: "Round-trip flight",
        body: "We book the round-trip flight between Seoul and Singapore.",
      },
      {
        k: "03",
        lead: "Hotel for the competition",
        body: "We book the accommodation you need in Singapore.",
      },
    ],
    sideNote:
      "The prize goes to first place only. We cover every trading loss all four make during the competition.",
  },

  arena: {
    prev: "Previous card",
    next: "Next card",
    title: ["The whole trading session", "is the match."],
    intro:
      "An e-sports style trading competition. The room watches the trading screens and the leaderboard move in real time.",
    cards: [
      {
        idx: "01 / Format",
        title: "Four traders start at once",
        body: "Everyone starts flat, on the same pairs, in the same window.",
      },
      {
        idx: "02 / Capital",
        title: "We provide the trading capital",
        body: "All four start with the same balance, and we cover any loss made during the competition.",
      },
      {
        idx: "03 / Scoring",
        title: "The PnL ranking is live",
        body: "Ranking is by trading PnL, and every move shows on the main screen as it happens.",
      },
      {
        idx: "04 / Broadcast",
        title: "Your screen is the broadcast",
        body: "Positions, entries and exits go up on the big display, with live commentary over the top.",
      },
      {
        idx: "05 / The crowd",
        title: "The crowd predicts the winner",
        body: "Before the start, the audience votes for the trader they think takes it.",
      },
      {
        idx: "06 / Venue",
        title: "KBW 2026, Seoul",
        body: "September 28, 2026 at SJ KUNSTHALLE, during Korea Blockchain Week.",
      },
    ],
  },

  partners: {
    kicker: "PARTICIPATING PARTNERS",
    title: ["The partners standing", "behind PERP-DEX DAY."],
    intro:
      "Variational, Lighter, Extended, Aster and MetaMask are on this stage with you, so your trading and your name reach the industry.",
    items: ["Variational", "Lighter", "Extended", "Aster", "MetaMask"],
  },

  who: {
    title: ["We're looking for traders", "who can prove it on stage."],
    intro:
      "Account size carries less weight than your actual trading record, your risk process, and whether you can hold your strategy together in front of an audience.",
    haveLabel: "You're a good fit if",
    have: [
      "You currently trade perpetuals.",
      "You can show your track record: an exchange PnL page, a read-only API, or a public profile.",
      "You can explain your own trading rules and risk process.",
      "You can trade as usual with cameras and a live leaderboard on you.",
      "You can be at the Seoul venue all day on September 28, 2026.",
      "You hold a valid passport for travel to Singapore.",
    ],
    not: [
      "Follower count and name recognition alone won't get you selected.",
      "We provide the competition capital, so you don't need your own.",
      "Independent traders with no institutional background can apply.",
      "We never accept withdrawal-enabled API keys or seed phrases.",
    ],
  },

  process: {
    title: ["How we select traders."],
    intro:
      "We interview in the order applications arrive and close once the four seats are filled.",
    steps: [
      {
        n: "01",
        title: "Apply",
        body: "Your contact details, the venue you mainly trade, and a link to your track record.",
        when: "Rolling",
      },
      {
        n: "02",
        title: "Track record review",
        body: "We check your trading PnL and your risk process from what you send.",
        when: "Within 5 days",
      },
      {
        n: "03",
        title: "30-minute video call",
        body: "Your trading rules, how you manage losses, and the strategy you'd run on a live stage.",
        when: "Notified individually",
      },
      {
        n: "04",
        title: "Entry confirmed",
        body: "We send the contract and the participation pack, and your name goes up on the event page.",
        when: "Notified individually",
      },
      {
        n: "05",
        title: "Competition day",
        body: "Check-in and an equipment check, then live trading starts.",
        when: "Sep 28 · Seoul",
      },
    ],
  },

  apply: {
    kicker: "Trader application",
    title: ["Take your shot at", "one of the four seats."],
    kv: [
      { k: "Time to complete", v: "About 5 minutes." },
      {
        k: "What we check",
        v: "Your trading record, your risk process, and how you'd hold up on a live stage.",
      },
      {
        k: "Security",
        v: "We never accept withdrawal-enabled keys, seed phrases or passwords. Send a read-only API or a screenshot.",
      },
    ],
    contactLabel: "Questions",
    selectPlaceholder: "Select",
    fields: {
      name: { label: "Name", placeholder: "Legal name" },
      handle: {
        label: "Handle",
        placeholder: "The name on the leaderboard",
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
          "In a few lines, why you want to be on the PERP-DEX DAY stage",
      },
      available: {
        label: "Can you be in Seoul on September 28?",
        options: [
          "Yes, all day.",
          "Yes, with a scheduling constraint.",
          "Not sure yet.",
        ],
      },
    },
    agree:
      "The track record I submitted is my own. I can attend in person in Seoul, and I agree to the event terms, the privacy policy, and the risk of trading losses.",
    submit: "Send application ↗",
    status: {
      missing: "Fill in the fields marked with *",
      required: "Required",
      eitherSocial: "Enter at least one of Telegram or X",
      mailto: "Hit send in your mail app and the application reaches us",
      sending: "Sending…",
      ok: "Application received. We'll review it and reply individually",
      error: "The mail didn't send. Write to {email} directly",
    },
    success: {
      title: "Application received.",
      body: "We'll review it and reply to you individually at the contact below. If you have anything else to send, reach us on Telegram.",
      draftTitle: "Hit send in your mail app.",
      draftBody:
        "We opened a mail draft with your application in it. It reaches us once you send it, and we'll reply individually at the contact below.",
      back: "Back to the form",
    },
    mailSubject: "PERP-DEX DAY trader application: {name}",
  },

  faq: {
    title: ["Questions."],
    intro:
      "Anything not covered here — message us on Telegram at @reboundx_cs.",
    items: [
      {
        q: "Which partners are in on the competition?",
        a: "Variational, Lighter, Extended, Aster and MetaMask are all in on PERP-DEX DAY.",
      },
      {
        q: "Can I apply if I don't live in Korea?",
        a: "Yes. But you have to be at the Seoul venue in person on September 28, 2026.",
      },
      {
        q: "How do I submit my track record?",
        a: "Send anything that verifies your own trading: an exchange PnL page, a public profile, a leaderboard, or a read-only API key. We never accept withdrawal-enabled API keys, seed phrases or passwords.",
      },
      {
        q: "How are the pairs and leverage decided?",
        a: "The pairs, the maximum leverage and the risk limits are the same for every participant. We share the detailed rules once your entry is confirmed.",
      },
      {
        q: "Who covers losses during the competition?",
        a: "We provide the competition capital, and we cover every trading loss the four participants make during the competition.",
      },
      {
        q: "What does first place go on to?",
        a: "The Asia Trading Championship with Kalshi. It runs during TOKEN2049 Singapore week, and we cover the round-trip flight and the hotel for the competition dates.",
      },
      {
        q: "Do I need to speak English?",
        a: "No. You can do the interview and the Seoul competition in whichever language you're comfortable with.",
      },
      {
        q: "Can I bring my own equipment?",
        a: "PCs and monitors are identical for every participant. We share the rules on keyboards and mice once your entry is confirmed.",
      },
    ],
  },

  final: {
    kicker: "We close when the four seats are filled.",
    title: ["Four seats,", "one ticket to Singapore."],
    body:
      "Applications are reviewed in the order they arrive. We close the moment the last seat is confirmed.",
    cta: "Apply for a seat ↗",
  },

  footer: { backToTop: "Back to top ↑" },
};
