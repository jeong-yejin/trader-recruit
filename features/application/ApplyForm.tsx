"use client";

import { useState, type FormEvent } from "react";
import { CONFIG } from "@/lib/config";
import type { Dictionary, EventSlug } from "@/lib/i18n";
import { ApplySuccess, type Receipt } from "./components/ApplySuccess";
import { FormField } from "./components/FormField";
import { SelectField } from "./components/SelectField";
import { fill } from "./form-submit";

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Either one satisfies the requirement. Order decides which gets focus. */
const SOCIAL = ["telegram", "x"];

const isControl = (el: Element): el is Control =>
  el instanceof HTMLInputElement ||
  el instanceof HTMLSelectElement ||
  el instanceof HTMLTextAreaElement;

/** Focus alone can leave the field above the fold on a form this long. */
const revealField = (element: HTMLElement) => {
  element.focus();
  element.scrollIntoView({ behavior: "smooth", block: "center" });
};

export function ApplyForm({
  t,
  event,
}: {
  t: Dictionary["apply"];
  event: EventSlug;
}) {
  const [status, setStatus] = useState({ text: "", error: false });
  /** Field name to the message shown under it, empty while nothing has failed. */
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  /** The receipt, set once the form is away. Null while the form is up. */
  const [done, setDone] = useState<Receipt | null>(null);

  /**
   * WARNING: this is the entire duplicate check, and it is browser-local.
   * With CONFIG.formEndpoint empty there is no server holding the list of who
   * has applied, so the addresses live in this browser's storage. A different
   * browser, a private window, or cleared site data all apply again freely.
   * Point formEndpoint at a server that owns this list before launch.
   */
  const appliedStorageKey = `applied:${event}`;

  const appliedAddresses = (): string[] => {
    try {
      const saved = JSON.parse(localStorage.getItem(appliedStorageKey) ?? "");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const rememberApplied = (email: string) => {
    try {
      const next = JSON.stringify([...appliedAddresses(), email]);
      localStorage.setItem(appliedStorageKey, next);
    } catch {
      // Storage refused. Nothing to recover: the guard just does not hold here.
    }
  };

  /**
   * What the applicant needs read back: the name we will address them by and
   * the two places we can reach them. Whichever handle they skipped is left out
   * rather than printed empty.
   */
  const receiptOf = (data: Record<string, FormDataEntryValue>): Receipt =>
    [
      { label: t.fields.name.label, value: String(data.name ?? "") },
      { label: t.fields.email.label, value: String(data.email ?? "") },
      { label: t.fields.telegram.label, value: String(data.telegram ?? "") },
      { label: t.fields.x.label, value: String(data.x ?? "") },
    ].filter((row) => row.value.trim());

  async function onSubmit(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();
    const form = submitEvent.currentTarget;
    setStatus({ text: "", error: false });

    const controls = Array.from(form.elements).filter(isControl);
    const invalid = controls.filter((el) => el.required && !el.checkValidity());

    // Telegram and X are one requirement between them. `required` can only say
    // "this one", so neither input carries it and the pair is checked here.
    const entries = new FormData(form);
    const hasSocial = SOCIAL.some((n) => String(entries.get(n) ?? "").trim());

    // Flag every empty field, not just the first — one generic message left the
    // applicant hunting through the form for whatever was wrong.
    setFieldErrors({
      ...Object.fromEntries(invalid.map((el) => [el.name, t.status.required])),
      ...(hasSocial
        ? {}
        : { telegram: t.status.eitherSocial, x: t.status.eitherSocial }),
    });

    const firstBad =
      invalid[0] ?? (hasSocial ? undefined : controls.find((el) => el.name === SOCIAL[0]));

    if (firstBad) {
      // The generic message covers a mixed failure; the pair only gets its own
      // wording when it is the single thing standing in the way.
      setStatus({
        text: invalid.length > 0 ? t.status.missing : t.status.eitherSocial,
        error: true,
      });
      // A Select keeps its native control out of the layout, so the applicant
      // has to be sent to the button standing in for it.
      revealField(
        form.querySelector<HTMLElement>(`[data-focus-for="${firstBad.name}"]`) ?? firstBad,
      );
      return;
    }

    const data = Object.fromEntries(entries.entries());
    const email = String(data.email ?? "").trim().toLowerCase();

    if (appliedAddresses().includes(email)) {
      setFieldErrors({ email: t.status.duplicate });
      setStatus({ text: t.status.duplicate, error: true });
      const emailField = form.querySelector<HTMLElement>('[name="email"]');
      if (emailField) revealField(emailField);
      return;
    }

    /** Both send paths land here, and they clear exactly the same state. */
    const completeSubmission = () => {
      form.reset();
      setFieldErrors({});
      setStatus({ text: "", error: false });
      rememberApplied(email);
      setDone(receiptOf(data));
    };

    // Held for both paths, so the button is disabled and reading `sending`
    // from the click onwards. Without an endpoint there is nothing to wait for
    // and the panel replaces the form in the same paint, so that state is never
    // seen — it is the POST below that needs the double-click guard.
    setBusy(true);
    setStatus({ text: t.status.sending, error: false });

    // WARNING: with no endpoint set, the entry goes nowhere. The panel is the
    // whole submit, and it tells the applicant we received something we did
    // not. Fill in CONFIG.formEndpoint before this page takes real traffic.
    if (!CONFIG.formEndpoint) {
      completeSubmission();
      setBusy(false);
      return;
    }

    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      completeSubmission();
    } catch {
      setStatus({
        text: fill(t.status.error, { email: CONFIG.fallbackEmail }),
        error: true,
      });
    } finally {
      setBusy(false);
    }
  }

  const { fields } = t;

  const flagged = (name: string) =>
    fieldErrors[name]
      ? ({ "aria-invalid": true, "aria-describedby": `${name}-err` } as const)
      : {};

  return (
    // The form is hidden rather than unmounted, which keeps templatehouse.js's
    // keyup counters bound to inputs it already found.
    <>
      <form
        id="apply-form"
        className="apply-form"
        noValidate
        hidden={done !== null}
        onSubmit={onSubmit}
      >
        <div className="form-row">
          <FormField name="name" label={fields.name.label} required error={fieldErrors.name}>
            <input
              id="name"
              name="name"
              type="text"
              className="inputset-input"
              autoComplete="name"
              placeholder={fields.name.placeholder}
              required
              {...flagged("name")}
            />
          </FormField>
          <FormField name="handle" label={fields.handle.label}>
            <input
              id="handle"
              name="handle"
              type="text"
              className="inputset-input"
              autoComplete="nickname"
              placeholder={fields.handle.placeholder}
            />
          </FormField>
        </div>

        <FormField name="email" label={fields.email.label} required error={fieldErrors.email}>
          <input
            id="email"
            name="email"
            type="email"
            className="inputset-input"
            autoComplete="email"
            placeholder={fields.email.placeholder}
            required
            {...flagged("email")}
          />
        </FormField>

        {/* Starred like the rest: an applicant who fills both is never worse
            off, and one who has only X still submits. */}
        <div className="form-row">
          <FormField name="telegram" label={fields.telegram.label} required error={fieldErrors.telegram}>
            <input
              id="telegram"
              name="telegram"
              type="text"
              className="inputset-input"
              placeholder={fields.telegram.placeholder}
              {...flagged("telegram")}
            />
          </FormField>
          <FormField name="x" label={fields.x.label} required error={fieldErrors.x}>
            <input
              id="x"
              name="x"
              type="text"
              className="inputset-input"
              placeholder={fields.x.placeholder}
              {...flagged("x")}
            />
          </FormField>
        </div>

        <div className="form-row">
          <FormField name="city" label={fields.city.label}>
            <input
              id="city"
              name="city"
              type="text"
              className="inputset-input"
              autoComplete="address-level2"
              placeholder={fields.city.placeholder}
            />
          </FormField>
          <FormField name="years" label={fields.years.label}>
            <SelectField
              name="years"
              options={fields.years.options}
              placeholder={t.selectPlaceholder}
              flags={flagged("years")}
            />
          </FormField>
        </div>

        <div className="form-row">
          <FormField name="venue" label={fields.venue.label} required error={fieldErrors.venue}>
            <SelectField
              name="venue"
              options={fields.venue.options}
              placeholder={t.selectPlaceholder}
              required
              flags={flagged("venue")}
            />
          </FormField>
          <FormField name="volume" label={fields.volume.label} required error={fieldErrors.volume}>
            <SelectField
              name="volume"
              options={fields.volume.options}
              placeholder={t.selectPlaceholder}
              required
              flags={flagged("volume")}
            />
          </FormField>
        </div>

        <FormField name="proof" label={fields.proof.label}>
          <input
            id="proof"
            name="proof"
            type="text"
            className="inputset-input"
            placeholder={fields.proof.placeholder}
          />
        </FormField>

        {/* inputset-count is required: templatehouse.js writes the keyup counter into it. */}
        <FormField name="risk" label={fields.risk.label}>
          <textarea
            id="risk"
            name="risk"
            className="inputset-input inputset-textarea"
            placeholder={fields.risk.placeholder}
          />
          <span className="inputset-langth p3">
            <span className="inputset-count">0</span> / 4000
          </span>
        </FormField>

        <FormField name="why" label={fields.why.label}>
          <textarea
            id="why"
            name="why"
            className="inputset-input inputset-textarea"
            placeholder={fields.why.placeholder}
          />
          <span className="inputset-langth p3">
            <span className="inputset-count">0</span> / 4000
          </span>
        </FormField>

        <FormField
          name="available"
          label={fields.available.label}
          required
          error={fieldErrors.available}
        >
          <SelectField
            name="available"
            options={fields.available.options}
            placeholder={t.selectPlaceholder}
            required
            flags={flagged("available")}
          />
        </FormField>

        {/* checkset-fill is not decoration: templatehouse.css gates every
            :checked rule behind a state modifier, so a bare .checkset box
            never paints the tick. */}
        <div
          className={
            fieldErrors.agree
              ? "checkset checkset-fill inputset-danger"
              : "checkset checkset-fill"
          }
        >
          <input
            type="checkbox"
            id="agree"
            name="agree"
            className="checkset-input"
            required
            {...flagged("agree")}
          />
          <label className="checkset-label p2" htmlFor="agree">
            {t.agree}
            <span className="req"> *</span>
          </label>
          {fieldErrors.agree && (
            <span className="inputset-msg" id="agree-err">
              {t.status.required}
            </span>
          )}
        </div>

        <div className="form-submit">
          <button type="submit" className="btnset btnset-primary btnset-lg p2" disabled={busy}>
            <span>{busy ? t.status.sending : t.submit}</span>
          </button>
        </div>

        {/* alert, not status: submit feedback has to interrupt, or it goes unread. */}
        <div
          id="form-status"
          className={status.error ? "form-status err" : "form-status"}
          role="alert"
        >
          {status.text}
        </div>
      </form>
      {done && <ApplySuccess t={t.success} receipt={done} event={event} />}
    </>
  );
}
