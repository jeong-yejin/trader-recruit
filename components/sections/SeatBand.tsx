import { Countdown } from "./Countdown";
import { CONFIG } from "@/lib/config";
import type { Dictionary, EventSlug } from "@/lib/i18n";

/**
 * Not a TemplateHouse block — the template has no seat counter. It borrows the
 * template's container and typography classes so it sits in the same grid, and
 * project.css carries the handful of rules it needs.
 */
export function SeatBand({
  seat,
  countdown,
  event,
}: {
  seat: Dictionary["seat"];
  countdown: Dictionary["countdown"];
  event: EventSlug;
}) {
  /** The board is as long as the recruitment: four in Korea, eight in
      Singapore. Numbers are written 01, 02 … so the cards keep an even width. */
  const seatNumbers = Array.from({ length: CONFIG.seatTotal[event] }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );
  const seatsOpen = CONFIG.seatsOpen[event];
  /** Seats fill from the front, so seat 01 is the first one to go. */
  const takenCount = seatNumbers.length - seatsOpen;

  return (
    <section className="seat-block">
      <div className="contents-container container-md">
        <div className="contents-inner">
          <strong className="h5 seat-lead">
            {seat.remaining.replace("{n}", String(seatsOpen))}
          </strong>

          <ul className="seat-area">
            {seatNumbers.map((no, i) => {
              const taken = i < takenCount;
              return (
                <li className={taken ? "seat taken" : "seat"} key={no}>
                  <span className="no">{no}</span>
                  <span className="status">
                    <i />
                    {taken ? seat.takenStatus : seat.status}
                  </span>
                  <p className="p3">{taken ? seat.takenNote : seat.note}</p>
                </li>
              );
            })}
          </ul>

          <div className="count-band">
            <span className="count-label">{countdown.label}</span>
            <Countdown units={countdown.units} event={event} />
          </div>
        </div>
      </div>
    </section>
  );
}
