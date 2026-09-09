import type { EventSlug } from "../i18n/routes.ts";

export type EventArt = { src: string; mobile?: string };

export const PRIZE_ART: Record<EventSlug, { green: EventArt; blue: EventArt }> = {
  "perp-dex-day": {
    green: { src: "/resources/images/prize-hand.png" },
    blue: { src: "/resources/images/prize-pose.png" },
  },
  "token-2049": {
    green: {
      src: "/resources/images/contest_N6_01.png",
      mobile: "/resources/images/contest_N6_04.png",
    },
    blue: {
      src: "/resources/images/contest_N6_03.png",
      mobile: "/resources/images/contest_N6_06.png",
    },
  },
};

export const PROCESS_ART: Record<EventSlug, [string, string, string]> = {
  "perp-dex-day": [
    "/resources/images/process-red-pill.png",
    "/resources/images/process-rabbit.png",
    "/resources/images/process-blue-pill.png",
  ],
  "token-2049": [
    "/resources/images/contest_N7_01.png",
    "/resources/images/contest_N7_02.png",
    "/resources/images/contest_N7_03.png",
  ],
};

/**
 * Kalshi ships the mark in white and in brand green. White is the one both
 * placements want: the hero and the marquee band are both on black, so it
 * needs no filter to sit there.
 */
const KALSHI = { src: "/resources/logo/Kalshi-Logo_White.svg", w: 300, h: 88 };

const EXCHANGE = "/resources/exchange-logo";

export const PARTNER_LOGOS = new Map([
  ["Variational", { src: `${EXCHANGE}/variational.svg`, w: 1284, h: 171 }],
  ["Lighter", { src: `${EXCHANGE}/lighter.svg`, w: 93, h: 30 }],
  ["Extended", { src: `${EXCHANGE}/extended.svg`, w: 136, h: 24 }],
  ["Aster", { src: `${EXCHANGE}/aster.svg`, w: 91, h: 24 }],
  ["MetaMask", { src: `${EXCHANGE}/MetaMask-logo-white.svg`, w: 127, h: 63 }],
]);

export const MARQUEE_LOGOS = new Map([
  ["variational", { src: `${EXCHANGE}/variational.svg`, w: 1284, h: 171 }],
  ["lighter", { src: `${EXCHANGE}/lighter.svg`, w: 93, h: 30 }],
  ["extended", { src: `${EXCHANGE}/extended.svg`, w: 136, h: 24 }],
  ["aster", { src: `${EXCHANGE}/aster.svg`, w: 91, h: 24 }],
  ["metamask", { src: `${EXCHANGE}/MetaMask-logo-white.svg`, w: 127, h: 63 }],
  ["kalshi", KALSHI],
]);

/**
 * The mark the hero locks up beside its co-host label. Keyed by the name the
 * dictionary writes; a name with no entry here stays as text, so the credit
 * still reads if a file ever goes missing.
 */
export const COHOST_LOGOS = new Map([["Kalshi", KALSHI]]);

export const FOOTER_LOGOS = {
  "perp-dex-day": {
    src: "/resources/logo/perpdexday-white.svg",
    w: 269,
    h: 53,
  },
} as const;
