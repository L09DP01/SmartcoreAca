import type { FieldError } from "react-hook-form";

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: FieldError;
  children: React.ReactNode;
};

export function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-[#152238]">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-sm font-medium text-red-700" role="alert">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

export const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-[#152238] outline-none transition focus:border-[#002B55] focus:ring-4 focus:ring-[#EAF4FF]";
