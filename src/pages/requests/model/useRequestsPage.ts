import { useState } from "react";
import { useHostAuthSession } from "@/features/auth";
import {
  useCancelMentorBroadcastRequestMutation,
  useSentMentorBroadcastRequestsQuery,
} from "@/entities/requests/mentor-broadcast/hooks/use-mentor-broadcast-request-queries";
import {
  useDecideMentorshipRequestMutation,
  useReceivedMentorshipRequestsQuery,
} from "@/entities/requests/hooks/use-mentorship-request-queries";
import {
  useDecideTeamJoinRequestMutation,
  useReceivedTeamJoinRequestsQuery,
} from "@/entities/requests/hooks/use-team-join-request-queries";
import { useReceivedUserSuggestionsQuery } from "@/entities/suggestion/hooks/use-suggestion-queries";
import {
  MENTOR_SENT_DEFAULT_FILTER,
  REQUEST_DEFAULT_CATEGORY_FILTER,
} from "@/pages/requests/model/constants";
import { mapMentorBroadcastToSentRow } from "@/pages/requests/model/mapSentMentorBroadcast";
import { mapReceivedUserSuggestionToRow } from "@/pages/requests/model/mapReceivedUserSuggestion";
import {
  buildRequestSlotCardViewModel,
  buildRequestsEmptyCard,
  toRequestSentCardViewModel,
  toRequestSuggestionCardViewModel,
} from "@/pages/requests/model/mappers";
import { mapMentorshipInboxItemToRow } from "@/pages/requests/model/mapReceivedMentorship";
import { mapTeamJoinInboxItemToRow } from "@/pages/requests/model/mapReceivedTeamJoin";
import type {
  MentorSentFilter,
  MentorSentTargetKind,
  RequestCategoryFilter,
  RequestInboxDirection,
  RequestSentCardViewModel,
  RequestSuggestionCardViewModel,
} from "@/pages/requests/model/types";

type DatedSuggestionCard = {
  createdAt: string;
  card: RequestSuggestionCardViewModel;
};

function mergeReceivedSorted(
  teamJoin: DatedSuggestionCard[],
  mentorship: DatedSuggestionCard[],
  learnerSuggestions: DatedSuggestionCard[],
): RequestSuggestionCardViewModel[] {
  return [...teamJoin, ...mentorship, ...learnerSuggestions]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((x) => x.card);
}

export function useRequestsPage(direction: RequestInboxDirection) {
  const { session, isHydrating } = useHostAuthSession();
  const isMentor = session.user?.role === "MENTOR";
  const authed = session.isAuthenticated;

  const mentorReceivedEnabled =
    direction === "received" && !isHydrating && authed && isMentor;

  const mentorSentEnabled =
    direction === "sent" && !isHydrating && authed && isMentor;

  const teamJoinQuery = useReceivedTeamJoinRequestsQuery(mentorReceivedEnabled);
  const mentorshipQuery = useReceivedMentorshipRequestsQuery(
    mentorReceivedEnabled,
  );
  const receivedSuggestionsQuery = useReceivedUserSuggestionsQuery(
    mentorReceivedEnabled,
  );
  const sentMentorBroadcastQuery =
    useSentMentorBroadcastRequestsQuery(mentorSentEnabled);
  const decideTeamJoinMutation = useDecideTeamJoinRequestMutation();
  const decideMentorshipMutation = useDecideMentorshipRequestMutation();
  const cancelMentorBroadcastMutation = useCancelMentorBroadcastRequestMutation();

  const [receivedCategoryFilter, setReceivedCategoryFilter] =
    useState<RequestCategoryFilter>(REQUEST_DEFAULT_CATEGORY_FILTER);
  const [mentorSentFilter, setMentorSentFilter] = useState<MentorSentFilter>(
    MENTOR_SENT_DEFAULT_FILTER,
  );

  const [createModalKind, setCreateModalKind] =
    useState<MentorSentTargetKind | null>(null);

  const teamJoinItems = teamJoinQuery.data ?? [];
  const teamJoinCards: DatedSuggestionCard[] = teamJoinItems.map((item) => {
    const row = mapTeamJoinInboxItemToRow(item);
    const base = toRequestSuggestionCardViewModel(row);
    const pending = item.status === "PENDING";
    return {
      createdAt: item.createdAt,
      card: {
        ...base,
        onMentorAccept: pending
          ? () =>
              decideTeamJoinMutation.mutateAsync({
                requestId: item.id,
                action: "accept",
              })
          : undefined,
        onMentorDecline: pending
          ? () =>
              decideTeamJoinMutation.mutateAsync({
                requestId: item.id,
                action: "reject",
              })
          : undefined,
      },
    };
  });

  const mentorshipItems = mentorshipQuery.data ?? [];
  const mentorshipCards: DatedSuggestionCard[] = mentorshipItems.map(
    (item) => {
      const row = mapMentorshipInboxItemToRow(item);
      const base = toRequestSuggestionCardViewModel(row);
      const pending = item.status === "PENDING";
      return {
        createdAt: item.createdAt,
        card: {
          ...base,
          onMentorAccept: pending
            ? () =>
                decideMentorshipMutation.mutateAsync({
                  requestId: item.id,
                  action: "accept",
                })
            : undefined,
          onMentorDecline: pending
            ? () =>
                decideMentorshipMutation.mutateAsync({
                  requestId: item.id,
                  action: "reject",
                })
            : undefined,
        },
      };
    },
  );

  const receivedSuggestionItems = receivedSuggestionsQuery.data ?? [];
  const receivedSuggestionCards: DatedSuggestionCard[] =
    receivedSuggestionItems.map((item) => {
      const row = mapReceivedUserSuggestionToRow(item);
      return {
        createdAt: item.createdAt,
        card: toRequestSuggestionCardViewModel(row),
      };
    });

  let receivedCardRows: RequestSuggestionCardViewModel[] = [];
  if (direction === "received" && authed && mentorReceivedEnabled) {
    if (receivedCategoryFilter === "all") {
      receivedCardRows = mergeReceivedSorted(
        teamJoinCards,
        mentorshipCards,
        receivedSuggestionCards,
      );
    } else if (receivedCategoryFilter === "team_join") {
      receivedCardRows = teamJoinCards.map((x) => x.card);
    } else if (receivedCategoryFilter === "mentorship") {
      receivedCardRows = mentorshipCards.map((x) => x.card);
    } else if (receivedCategoryFilter === "suggestion") {
      receivedCardRows = receivedSuggestionCards.map((x) => x.card);
    }
  }

  const sentBroadcastItems = sentMentorBroadcastQuery.data ?? [];
  const cancelBroadcast = (id: string) =>
    cancelMentorBroadcastMutation.mutateAsync(id);
  const sentRows = sentBroadcastItems.map((item) =>
    mapMentorBroadcastToSentRow(item, cancelBroadcast),
  );
  const sentFiltered =
    mentorSentFilter === "all"
      ? sentRows
      : sentRows.filter((r) => r.targetKind === mentorSentFilter);
  const mentorSentCardRows: RequestSentCardViewModel[] = sentFiltered.map(
    toRequestSentCardViewModel,
  );

  const slotCardViewModel = buildRequestSlotCardViewModel(
    direction,
    mentorSentFilter,
  );

  const isSentLoading =
    mentorSentEnabled && sentMentorBroadcastQuery.isLoading;

  const isGridEmpty =
    direction === "received"
      ? receivedCardRows.length === 0
      : isSentLoading
        ? false
        : mentorSentCardRows.length === 0 && slotCardViewModel === null;

  const emptyCard = buildRequestsEmptyCard(
    direction,
    receivedCategoryFilter,
    mentorSentFilter,
  );

  return {
    receivedCategoryFilter,
    setReceivedCategoryFilter,
    mentorSentFilter,
    setMentorSentFilter,
    receivedCardRows,
    mentorSentCardRows,
    slotCardViewModel,
    createModalKind,
    setCreateModalKind,
    isGridEmpty,
    emptyCard,
    isReceivedLoading:
      mentorReceivedEnabled &&
      (teamJoinQuery.isLoading ||
        mentorshipQuery.isLoading ||
        receivedSuggestionsQuery.isLoading),
    isSentLoading,
  };
}
