/**
 * Everything that has to change before the page goes live.
 * Four values, same as the original single-file build.
 */
type Config = {
  /** Arena day (KST, ISO 8601). Drives the countdown. 12:00 is a placeholder start time. */
  eventDate: string;
  /** Where the form posts. Leave "" to fall back to a pre-filled email draft. */
  formEndpoint: string;
  /** Inbox used when formEndpoint is empty. */
  fallbackEmail: string;
  /** Seats still open — shown in the hero meta and the seat grid. */
  seatsOpen: number;
};

export const CONFIG: Config = {
  eventDate: "2026-09-28T12:00:00+09:00",
  formEndpoint: "",
  fallbackEmail: "hello@perpdexday.xyz",
  seatsOpen: 4,
};
