import type { ReactNode } from "react";

/**
 * One labelled control. Kept outside the form orchestrator so its component
 * identity remains stable while the form status changes.
 */
export function FormField({
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
