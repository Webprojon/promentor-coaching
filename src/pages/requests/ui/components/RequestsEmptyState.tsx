import { Typography } from "@promentorapp/ui-kit";
import { Link } from "react-router-dom";
import {
  EMPTY_STATE_ACTION_LINKS,
  EMPTY_STATE_MESSAGE_BY_DIRECTION,
  MENTOR_SENT_KIND_META,
  REQUEST_CATEGORY_META,
} from "@/pages/requests/model/constants";
import type { RequestsEmptyStateProps } from "@/pages/requests/model/types";

export function RequestsEmptyState({
  direction,
  categoryFilter,
  mentorSentFilter,
}: RequestsEmptyStateProps) {
  const isMentorSent = direction === "sent";

  const scope = isMentorSent
    ? mentorSentFilter === "all"
      ? "this view"
      : `“${MENTOR_SENT_KIND_META[mentorSentFilter].label}”`
    : categoryFilter === "all"
      ? "this view"
      : `“${REQUEST_CATEGORY_META[categoryFilter].label}”`;

  const body = isMentorSent
    ? EMPTY_STATE_MESSAGE_BY_DIRECTION.sent
    : EMPTY_STATE_MESSAGE_BY_DIRECTION.received;

  return (
    <div className="mt-8 rounded-lg border border-dashed border-white/15 px-6 py-12 text-center">
      <Typography
        component="p"
        className="text-base! font-semibold text-slate-300"
      >
        Nothing in {scope} yet
      </Typography>
      <Typography
        component="p"
        className="mx-auto mt-2 max-w-md text-sm text-slate-500"
      >
        {body}
      </Typography>
      {!isMentorSent ? (
        <Typography
          component="div"
          className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold"
        >
          {EMPTY_STATE_ACTION_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={link.className}>
              {link.label}
            </Link>
          ))}
        </Typography>
      ) : null}
    </div>
  );
}
