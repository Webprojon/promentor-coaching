import { Typography } from "@promentorapp/ui-kit";
import type { ReactNode } from "react";

export type PageHeaderProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={["flex flex-wrap items-start justify-between gap-3", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="min-w-0 flex-1">
        <Typography
          component="h1"
          className="text-2xl font-semibold text-white"
        >
          {title}
        </Typography>
        <Typography component="p" className="mt-1 text-sm text-slate-300">
          {description}
        </Typography>
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
