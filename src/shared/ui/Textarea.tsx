import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";

const TEXTAREA_BASE_CLASS =
  "w-full rounded-lg border border-white/20 bg-(--pm-surface) px-3 py-2 text-sm text-slate-100 outline-none transition-all placeholder:pm-text-muted focus:border-(--pm-accent-cyan) focus:ring-2 focus:ring-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-50";

const MIN_HEIGHT_CLASS = {
  sm: "min-h-24",
  md: "min-h-28",
  lg: "min-h-32",
} as const;

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  minHeight?: keyof typeof MIN_HEIGHT_CLASS;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { className, minHeight = "md", ...props },
    ref,
  ) {
    const merged = [TEXTAREA_BASE_CLASS, MIN_HEIGHT_CLASS[minHeight], className]
      .filter(Boolean)
      .join(" ");

    return <textarea ref={ref} className={merged} {...props} />;
  },
);
