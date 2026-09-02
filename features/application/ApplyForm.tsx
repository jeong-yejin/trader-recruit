"use client";

import { useState, type FormEvent } from "react";
import { CONFIG } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";
import { FormField } from "./components/FormField";
import { SelectField } from "./components/SelectField";
import { buildMailtoUrl, fill, serializeFormData } from "./form-submit";

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Either one satisfies the requirement. Order decides which gets focus. */
const SOCIAL = ["telegram", "x"];

const isControl = (el: Element): el is Control =>
  el instanceof HTMLInputElement ||
  el instanceof HTMLSelectElement ||
  el instanceof HTMLTextAreaElement;

export function ApplyForm({ t }: { t: Dictionary["apply"] }) {
  const [status, setStatus] = useState({ text: "", error: false });
  const [missing, setMissing] = useState<Record<string, true>>({});
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ text: "", error: false });

    const controls = Array.from(form.elements).filter(isControl);
    const invalid = controls.filter((el) => el.required && !el.checkValidity());

    // Telegram and X are one requirement between them. `required` can only say
    // "this one", so neither input carries it and the pair is checked here.
    const entries = new FormData(form);
    const hasSocial = SOCIAL.some((n) => String(entries.get(n) ?? "").trim());

    // Flag every empty field, not just the first — one generic message left the
    // applicant hunting through the form for whatever was wrong.
    setMissing({
      ...Object.fromEntries(invalid.map((el) => [el.name, true as const])),
      ...(hasSocial ? {} : { telegram: true as const, x: true as const }),
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
      const target =
        form.querySelector<HTMLElement>(`[data-focus-for="${firstBad.name}"]`) ?? firstBad;
      target.focus();
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const data = Object.fromEntries(entries.entries());
    setBusy(true);

    if (!CONFIG.formEndpoint) {
      // No backend yet — hand the applicant a pre-filled email instead of losing the entry.
      const body = serializeFormData(data);
      setStatus({ text: t.status.mailto, error: false });
      window.location.href = buildMailtoUrl({
        email: CONFIG.fallbackEmail,
        subject: fill(t.mailSubject, { name: String(data.name ?? "") }),
        body,
      });
      // The page never unloads here, so release the button in case no mail app opened.
      window.setTimeout(() => setBusy(false), 4000);
      return;
    }

    setStatus({ text: t.status.sending, error: false });
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setMissing({});
      setStatus({ text: t.status.ok, error: false });
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

  const err = (name: string) =>
    missing[name]
      ? SOCIAL.includes(name)
        ? t.status.eitherSocial
        : t.status.required
      : undefined;
  const flagged = (name: string) =>
    missing[name]
      ? ({ "aria-invalid": true, "aria-describedby": `${name}-err` } as const)
      : {};

  return (
    <form id="apply-form" className="apply-form" noValidate onSubmit={onSubmit}>
      <div className="form-row">
        <FormField name="name" label={fields.name.label} required error={err("name")}>
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

      <FormField name="email" label={fields.email.label} required error={err("email")}>
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
        <FormField name="telegram" label={fields.telegram.label} required error={err("telegram")}>
          <input
            id="telegram"
            name="telegram"
            type="text"
            className="inputset-input"
            placeholder={fields.telegram.placeholder}
            {...flagged("telegram")}
          />
        </FormField>
        <FormField name="x" label={fields.x.label} required error={err("x")}>
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
        <FormField name="venue" label={fields.venue.label} required error={err("venue")}>
          <SelectField
            name="venue"
            options={fields.venue.options}
            placeholder={t.selectPlaceholder}
            required
            flags={flagged("venue")}
          />
        </FormField>
        <FormField name="volume" label={fields.volume.label} required error={err("volume")}>
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

      <FormField name="available" label={fields.available.label}>
        <SelectField
          name="available"
          options={fields.available.options}
          placeholder={t.selectPlaceholder}
          flags={flagged("available")}
        />
      </FormField>

      <div className={missing.agree ? "checkset inputset-danger" : "checkset"}>
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
        </label>
        {missing.agree && (
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
  );
}
