import type { EmptyStateActionLink, RequestInboxDirection } from "../types";

export const EMPTY_STATE_MESSAGE_BY_DIRECTION: Record<
  RequestInboxDirection,
  string
> = {
  sent: "Share concise requests with your teams, interns, boards, and workout plans. They land in one place until responses sync from the server.",
  received:
    "When someone targets you or your team, their request will land here for review.",
};

export const EMPTY_STATE_ACTION_LINKS: EmptyStateActionLink[] = [
  {
    to: "/explore-teams",
    label: "Explore teams",
    className:
      "rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-cyan-100 transition hover:bg-cyan-500/20",
  },
  {
    to: "/mentors",
    label: "Mentors",
    className:
      "rounded-lg border border-indigo-400/40 bg-indigo-500/10 px-4 py-2 text-indigo-100 transition hover:bg-indigo-500/20",
  },
  {
    to: "/suggestion",
    label: "Suggestion hub",
    className:
      "rounded-lg border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-violet-100 transition hover:bg-violet-500/20",
  },
];
