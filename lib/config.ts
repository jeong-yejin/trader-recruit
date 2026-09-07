import type { EventSlug } from "@/lib/i18n";

/**
 * Everything that has to change before the page goes live.
 * Four values, same as the original single-file build.
 */
type Config = {
  /**
   * Arena day per event, written in the venue's own offset (ISO 8601). Drives
   * the countdown. 12:00 is a placeholder start time on both.
   */
  eventDate: Record<EventSlug, string>;
  /** Where the form posts. Leave "" and the form only shows the panel. */
  formEndpoint: string;
  /** Support handle, without the @. Shown beside the form, in the FAQ copy,
      and as the way through when a submit fails. */
  contactTelegram: string;
  /** Seats still open. The seat grid marks the rest taken, filling from 01. */
  seatsOpen: number;
};

export const CONFIG: Config = {
  eventDate: {
    /** Seoul. */
    "perp-dex-day": "2026-09-28T12:00:00+09:00",
    /** Zouk Singapore, the date the token-2049 copy already states. */
    "token-2049": "2026-10-05T12:00:00+08:00",
  },
  formEndpoint: "",
  contactTelegram: "reboundx_cs",
  seatsOpen: 3,
};
