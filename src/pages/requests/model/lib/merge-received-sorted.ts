import type { RequestSuggestionCardViewModel } from "@/pages/requests/model/types";

type DatedCard = {
  createdAt: string;
  card: RequestSuggestionCardViewModel;
};

export function mergeReceivedRequestCards(
  teamJoin: DatedCard[],
  mentorship: DatedCard[],
  learnerSuggestions: DatedCard[],
): RequestSuggestionCardViewModel[] {
  return [...teamJoin, ...mentorship, ...learnerSuggestions]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((x) => x.card);
}
