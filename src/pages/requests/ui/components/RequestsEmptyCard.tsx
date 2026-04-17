import { Typography } from "@promentorapp/ui-kit";
import { Link } from "react-router-dom";
import type { RequestsEmptyCardProps } from "@/pages/requests/model/types";

export function RequestsEmptyCard({
  scopeLabel,
  body,
  showActionLinks,
  actionLinks,
}: RequestsEmptyCardProps) {
  return (
    <div className="mt-8 rounded-lg border border-dashed border-white/15 px-6 py-12 text-center">
      <Typography
        component="p"
        className="text-base! font-semibold text-slate-300"
      >
        Nothing in {scopeLabel} yet
      </Typography>
      <Typography
        component="p"
        className="mx-auto mt-2 max-w-md text-sm text-slate-500"
      >
        {body}
      </Typography>
      {showActionLinks ? (
        <Typography
          component="div"
          className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold"
        >
          {actionLinks.map((link) => (
            <Link key={link.to} to={link.to} className={link.className}>
              {link.label}
            </Link>
          ))}
        </Typography>
      ) : null}
    </div>
  );
}
