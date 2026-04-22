import type { SuggestionPriorityApi } from "@/entities/suggestion/model/suggestion.types";

export const SUGGESTION_PRIORITY_API_LABEL: Record<
  SuggestionPriorityApi,
  string
> = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

export const SUGGESTION_PRIORITY_API_BADGE: Record<
  SuggestionPriorityApi,
  string
> = {
  HIGH: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
  MEDIUM: "border-amber-400/40 bg-amber-500/15 text-amber-200",
  LOW: "border-rose-400/40 bg-rose-500/15 text-rose-200",
};
