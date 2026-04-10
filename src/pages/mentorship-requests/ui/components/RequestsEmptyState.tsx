import { Typography } from "@promentorapp/ui-kit";
import { Link } from "react-router-dom";
import { REQUEST_CATEGORY_META } from "@/pages/mentorship-requests/model/constants";
import type {
  RequestCategoryFilter,
  RequestInboxDirection,
} from "@/pages/mentorship-requests/model/types";

type RequestsEmptyStateProps = {
  direction: RequestInboxDirection;
  categoryFilter: RequestCategoryFilter;
};

export function RequestsEmptyState({
  direction,
  categoryFilter,
}: RequestsEmptyStateProps) {
  const scope =
    categoryFilter === "all"
      ? "this view"
      : `“${REQUEST_CATEGORY_META[categoryFilter].label}”`;

  return (
    <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-slate-950/35 px-6 py-12 text-center backdrop-blur-sm">
      <Typography
        component="p"
        className="text-base! font-semibold text-slate-300"
      >
        Nothing in {scope} yet
      </Typography>
      <Typography component="p" className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        {direction === "sent"
          ? "Send a join request from Explore Teams, ask a mentor from Mentors, or share a suggestion from the hub."
          : "When someone targets you or your team, their request will land here for review."}
      </Typography>
      <Typography
        component="div"
        className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold"
      >
        <Link
          to="/explore-teams"
          className="rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-cyan-100 transition hover:bg-cyan-500/20"
        >
          Explore teams
        </Link>
        <Link
          to="/mentors"
          className="rounded-lg border border-indigo-400/40 bg-indigo-500/10 px-4 py-2 text-indigo-100 transition hover:bg-indigo-500/20"
        >
          Mentors
        </Link>
        <Link
          to="/suggestion"
          className="rounded-lg border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-violet-100 transition hover:bg-violet-500/20"
        >
          Suggestion hub
        </Link>
      </Typography>
    </div>
  );
}
