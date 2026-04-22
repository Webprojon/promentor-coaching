import type { SuggestionPriority, SuggestionStatus } from "@/pages/suggestion/model/types";

export const PRIORITY_BADGE_CLASS: Record<SuggestionPriority, string> = {
  High: "bg-emerald-500/20 text-emerald-200",
  Medium: "bg-amber-500/20 text-amber-200",
  Low: "bg-red-500/20 text-red-200",
};

export const PRIORITY_SELECTED_BORDER_CLASS: Record<
  SuggestionPriority,
  string
> = {
  High: "border-emerald-400",
  Medium: "border-amber-400",
  Low: "border-red-400",
};

export const SUGGESTION_STATUS_BADGE_CLASS: Record<SuggestionStatus, string> = {
  Sent: "border-blue-400/40 bg-blue-500/15 text-blue-200",
  Accepted: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
  "Not Accepted": "border-rose-400/40 bg-rose-500/15 text-rose-200",
};
