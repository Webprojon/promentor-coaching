import { Typography } from "@promentorapp/ui-kit";
import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function FormField({ label, children, className }: FormFieldProps) {
  return (
    <label className={["grid gap-2", className].filter(Boolean).join(" ")}>
      <Typography variantStyle="label" className="pm-text-secondary">
        {label}
      </Typography>
      {children}
    </label>
  );
}
