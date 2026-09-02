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

export const PARTNER_LOGOS = new Map([
  ["Variational", { file: "variational.svg", w: 1284, h: 171 }],
  ["Lighter", { file: "lighter.svg", w: 93, h: 30 }],
  ["Extended", { file: "extended.svg", w: 136, h: 24 }],
  ["Aster", { file: "aster.svg", w: 91, h: 24 }],
  ["MetaMask", { file: "MetaMask-logo-white.svg", w: 127, h: 63 }],
]);

export const MARQUEE_LOGOS = new Map([
  ["variational", { file: "variational.svg", w: 1284, h: 171 }],
  ["lighter", { file: "lighter.svg", w: 93, h: 30 }],
  ["extended", { file: "extended.svg", w: 136, h: 24 }],
  ["aster", { file: "aster.svg", w: 91, h: 24 }],
  ["metamask", { file: "MetaMask-logo-white.svg", w: 127, h: 63 }],
]);

export const FOOTER_LOGOS = {
  "perp-dex-day": {
    src: "/resources/logo/perpdexday-white.svg",
    w: 269,
    h: 53,
  },
} as const;
