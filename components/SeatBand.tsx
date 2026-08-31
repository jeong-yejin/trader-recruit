import { Countdown } from "./Countdown";
import { CONFIG } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";

const SEAT_NUMBERS = ["01", "02", "03", "04"];

/**
 * Not a TemplateHouse block — the template has no seat counter. It borrows the
 * template's container and typography classes so it sits in the same grid, and
 * project.css carries the handful of rules it needs.
 */
export function SeatBand({
  seat,
  countdown,
}: {
  seat: Dictionary["seat"];
  countdown: Dictionary["countdown"];
}) {
  /** Seats fill from the front, so seat 01 is the first one to go. */
  const takenCount = SEAT_NUMBERS.length - CONFIG.seatsOpen;

  return (
    <section className="seat-block">
      <div className="contents-container container-md">
        <div className="contents-inner">
          <strong className="h5 seat-lead">
            {seat.remaining.replace("{n}", String(CONFIG.seatsOpen))}
          </strong>

          <ul className="seat-area">
            {SEAT_NUMBERS.map((no, i) => {
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
            <Countdown units={countdown.units} />
          </div>
        </div>
      </div>
    </section>
  );
}
