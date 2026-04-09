import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  toneClassName?: string;
  className?: string;
};

const BASE_BADGE_CLASSNAME = "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium";

export function Badge({ children, toneClassName, className }: BadgeProps) {
  return <span className={`${BASE_BADGE_CLASSNAME} ${toneClassName ?? ""} ${className ?? ""}`}>{children}</span>;
}
