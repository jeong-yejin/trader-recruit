"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { CONFIG } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Either one satisfies the requirement. Order decides which gets focus. */
const SOCIAL = ["telegram", "x"];

/** The dictionary crosses the server/client boundary, so it holds templates, not functions. */
const fill = (template: string, vars: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");

const isControl = (el: Element): el is Control =>
  el instanceof HTMLInputElement ||
  el instanceof HTMLSelectElement ||
  el instanceof HTMLTextAreaElement;

/**
 * One labelled control. Module scope on purpose: declared inside ApplyForm it
 * would be a fresh component type on every render, and React would remount the
 * input. `inputset-danger` is the TemplateHouse error state.
 */
function Field({
  name,
  label,
  required,
  error,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={error ? "inputset inputset-danger" : "inputset"}>
      <label className="inputset-label p2" htmlFor={name}>
        {label}
        {required && <span className="req"> *</span>}
      </label>
      {children}
      {error && (
        <span className="inputset-msg" id={`${name}-err`}>
          {error}
        </span>
      )}
    </div>
  );
}

/** Keys that open a closed select, matching what the native control answers to. */
const OPENING_KEYS = new Set([" ", "Enter", "ArrowDown", "ArrowUp"]);

/**
 * A select whose list belongs to the page.
 *
 * A native select hands its option list to the OS, which draws it white and
 * system-cornered on both events regardless of what the page is wearing. The
 * value is still a native select — FormData reads it, checkValidity() flags it
 * when it is required and empty, and it resets with the form — but it is out
 * of the layout, and the button and list below are what the applicant sees.
 *
 * Module scope for the same reason as Field: a type created during render
 * remounts, and a remounted select loses the applicant's choice.
 */
function Select({
  name,
  options,
  placeholder,
  required,
  flags,
}: {
  name: string;
  options: string[];
  placeholder: string;
  required?: boolean;
  flags: Record<string, unknown>;
}) {
  const native = useRef<HTMLSelectElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);

  /** The placeholder is a row like any other, so picking it clears the field. */
  const rows = ["", ...options];
  const labelOf = (row: string) => row || placeholder;

  /** The select stays uncontrolled, so this is the one place the two agree. */
  const commit = (row: string) => {
    if (!native.current) return;
    native.current.value = row;
    setValue(row);
    setOpen(false);
  };

  const start = () => {
    setActive(Math.max(0, rows.indexOf(value)));
    setOpen(true);
  };

  useEffect(() => {
    const form = native.current?.form;
    if (!form) return;
    // form.reset() puts the native select back to the placeholder. The button
    // label has to follow, or it shows a value the form no longer carries.
    const clear = () => setValue("");
    form.addEventListener("reset", clear);
    return () => form.removeEventListener("reset", clear);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!box.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const { key } = event;
    if (!open) {
      if (!OPENING_KEYS.has(key)) return;
      event.preventDefault();
      start();
      return;
    }
    // Tab closes without swallowing the key, so focus still leaves the field.
    if (key === "Escape" || key === "Tab") return setOpen(false);
    if (key === "Enter" || key === " ") {
      event.preventDefault();
      return commit(rows[active]);
    }
    if (key === "ArrowDown") {
      event.preventDefault();
      return setActive((i) => Math.min(i + 1, rows.length - 1));
    }
    if (key === "ArrowUp") {
      event.preventDefault();
      return setActive((i) => Math.max(i - 1, 0));
    }
    if (key === "Home") {
      event.preventDefault();
      return setActive(0);
    }
    if (key === "End") {
      event.preventDefault();
      return setActive(rows.length - 1);
    }
  };

  return (
    <div className="selectset" ref={box}>
      <select
        ref={native}
        id={`${name}-value`}
        name={name}
        className="selectset-native"
        defaultValue=""
        required={required}
        tabIndex={-1}
        aria-hidden="true"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>

      {/* The label points here, so the button carries the field's id and the
          hidden select takes a suffixed one. */}
      <button
        type="button"
        id={name}
        data-focus-for={name}
        data-filled={value ? "" : undefined}
        className="selectset-select"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${name}-list`}
        aria-activedescendant={open ? `${name}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : start())}
        onKeyDown={onKeyDown}
        {...flags}
      >
        {labelOf(value)}
      </button>
      <span className="selectset-arrow" />

      {/* mousedown is where a click would take focus off the button, and
          aria-activedescendant only reads while the button still has it. */}
      <ul
        id={`${name}-list`}
        className="selectset-menu"
        role="listbox"
        hidden={!open}
        onMouseDown={(event) => event.preventDefault()}
      >
        {rows.map((row, i) => (
          <li
            key={labelOf(row)}
            id={`${name}-opt-${i}`}
            role="option"
            aria-selected={row === value}
            className={i === active ? "selectset-option is-active" : "selectset-option"}
            onMouseEnter={() => setActive(i)}
            onClick={() => commit(row)}
          >
            {labelOf(row)}
          </li>
        ))}
      </ul>
    </div>
  );
}

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
      const body = Object.entries(data)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      setStatus({ text: t.status.mailto, error: false });
      window.location.href =
        `mailto:${CONFIG.fallbackEmail}` +
        `?subject=${encodeURIComponent(fill(t.mailSubject, { name: String(data.name ?? "") }))}` +
        `&body=${encodeURIComponent(body)}`;
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
        <Field name="name" label={fields.name.label} required error={err("name")}>
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
        </Field>
        <Field name="handle" label={fields.handle.label}>
          <input
            id="handle"
            name="handle"
            type="text"
            className="inputset-input"
            autoComplete="nickname"
            placeholder={fields.handle.placeholder}
          />
        </Field>
      </div>

      <Field name="email" label={fields.email.label} required error={err("email")}>
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
      </Field>

      {/* Starred like the rest: an applicant who fills both is never worse
          off, and one who has only X still submits. */}
      <div className="form-row">
        <Field name="telegram" label={fields.telegram.label} required error={err("telegram")}>
          <input
            id="telegram"
            name="telegram"
            type="text"
            className="inputset-input"
            placeholder={fields.telegram.placeholder}
            {...flagged("telegram")}
          />
        </Field>
        <Field name="x" label={fields.x.label} required error={err("x")}>
          <input
            id="x"
            name="x"
            type="text"
            className="inputset-input"
            placeholder={fields.x.placeholder}
            {...flagged("x")}
          />
        </Field>
      </div>

      <div className="form-row">
        <Field name="city" label={fields.city.label}>
          <input
            id="city"
            name="city"
            type="text"
            className="inputset-input"
            autoComplete="address-level2"
            placeholder={fields.city.placeholder}
          />
        </Field>
        <Field name="years" label={fields.years.label}>
          <Select
            name="years"
            options={fields.years.options}
            placeholder={t.selectPlaceholder}
            flags={flagged("years")}
          />
        </Field>
      </div>

      <div className="form-row">
        <Field name="venue" label={fields.venue.label} required error={err("venue")}>
          <Select
            name="venue"
            options={fields.venue.options}
            placeholder={t.selectPlaceholder}
            required
            flags={flagged("venue")}
          />
        </Field>
        <Field name="volume" label={fields.volume.label} required error={err("volume")}>
          <Select
            name="volume"
            options={fields.volume.options}
            placeholder={t.selectPlaceholder}
            required
            flags={flagged("volume")}
          />
        </Field>
      </div>

      <Field name="proof" label={fields.proof.label}>
        <input
          id="proof"
          name="proof"
          type="text"
          className="inputset-input"
          placeholder={fields.proof.placeholder}
        />
      </Field>

      {/* inputset-count is required: templatehouse.js writes the keyup counter into it. */}
      <Field name="risk" label={fields.risk.label}>
        <textarea
          id="risk"
          name="risk"
          className="inputset-input inputset-textarea"
          placeholder={fields.risk.placeholder}
        />
        <span className="inputset-langth p3">
          <span className="inputset-count">0</span> / 4000
        </span>
      </Field>

      <Field name="why" label={fields.why.label}>
        <textarea
          id="why"
          name="why"
          className="inputset-input inputset-textarea"
          placeholder={fields.why.placeholder}
        />
        <span className="inputset-langth p3">
          <span className="inputset-count">0</span> / 4000
        </span>
      </Field>

      <Field name="available" label={fields.available.label}>
        <Select
          name="available"
          options={fields.available.options}
          placeholder={t.selectPlaceholder}
          flags={flagged("available")}
        />
      </Field>

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
