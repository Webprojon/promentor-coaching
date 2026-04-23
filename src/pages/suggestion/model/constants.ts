import type { SuggestionPriority } from "@/pages/suggestion/model/types";

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
