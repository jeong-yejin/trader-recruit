import type { FormValues } from "./form-contract.ts";

export const fill = (template: string, vars: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");

export const serializeFormData = (values: FormValues) =>
  Object.entries(values)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

export const buildMailtoUrl = ({
  email,
  subject,
  body,
}: {
  email: string;
  subject: string;
  body: string;
}) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
