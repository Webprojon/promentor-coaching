import type { SelectHTMLAttributes } from "react";
import { forwardRef } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

const SELECT_BASE_CLASS =
  "w-full cursor-pointer rounded-lg border border-white/20 bg-(--pm-surface) text-sm text-slate-100 outline-none transition-all focus:border-(--pm-accent-cyan) focus:ring-2 focus:ring-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-50 appearance-none [&_option]:bg-slate-950 [&_option]:text-slate-200";

const FIELD_SIZE_CLASS = {
  md: "h-12 pl-3 pr-10",
  sm: "h-10 pl-3 pr-9 text-[13px]",
} as const;

const CHEVRON_CLASS = {
  md: "right-3 text-lg",
  sm: "right-2.5 text-base",
} as const;

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> & {
  fieldSize?: keyof typeof FIELD_SIZE_CLASS;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, fieldSize = "md", children, ...props }, ref) {
    const merged = [SELECT_BASE_CLASS, FIELD_SIZE_CLASS[fieldSize], className]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="group relative w-full">
        <select ref={ref} className={merged} {...props}>
          {children}
        </select>
        <RiArrowDownSLine
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-200 ease-out group-focus-within:rotate-180 ${CHEVRON_CLASS[fieldSize]}`}
          aria-hidden
        />
      </div>
    );
  },
);
