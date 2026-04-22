import { SUGGESTION_PRIORITY_API_LABEL } from "@/entities/suggestion/model/suggestion-priority-display";
import type { SuggestionPriorityApi } from "@/entities/suggestion/model/suggestion.types";
import type { SuggestionPriority } from "@/pages/suggestion/model/types";

export const SUGGESTION_PRIORITIES_UI: SuggestionPriority[] = [
  "High",
  "Medium",
  "Low",
];

const UI_TO_API: Record<SuggestionPriority, SuggestionPriorityApi> = {
  High: "HIGH",
  Medium: "MEDIUM",
  Low: "LOW",
};

const API_TO_UI: Record<SuggestionPriorityApi, SuggestionPriority> = {
  HIGH: SUGGESTION_PRIORITY_API_LABEL.HIGH as SuggestionPriority,
  MEDIUM: SUGGESTION_PRIORITY_API_LABEL.MEDIUM as SuggestionPriority,
  LOW: SUGGESTION_PRIORITY_API_LABEL.LOW as SuggestionPriority,
};

export function suggestionPriorityToApi(
  p: SuggestionPriority,
): SuggestionPriorityApi {
  return UI_TO_API[p];
}

export function suggestionPriorityFromApi(
  p: SuggestionPriorityApi,
): SuggestionPriority {
  return API_TO_UI[p];
}
