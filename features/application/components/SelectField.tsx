"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

/** Keys that open a closed select, matching what the native control answers to. */
const OPENING_KEYS = new Set([" ", "Enter", "ArrowDown", "ArrowUp"]);

/**
 * A native form select with a page-styled button and listbox presentation.
 * The native control remains the source of truth for FormData and reset.
 */
export function SelectField({
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
    // Assigning value in script fires nothing, and the form clears a field's
    // error message on input. Say the edit happened.
    native.current.dispatchEvent(new Event("input", { bubbles: true }));
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
