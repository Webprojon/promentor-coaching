import { useState } from "react";
import { useHostAuthSession } from "@/features/auth";
import {
  useCancelMentorBroadcastRequestMutation,
  useSentMentorBroadcastRequestsQuery,
} from "@/entities/mentor-broadcast-request/hooks/use-mentor-broadcast-request-queries";
import {
  useDecideMentorshipRequestMutation,
  useReceivedMentorshipRequestsQuery,
} from "@/entities/requests/hooks/use-mentorship-request-queries";
import {
  useDecideTeamJoinRequestMutation,
  useReceivedTeamJoinRequestsQuery,
} from "@/entities/requests/hooks/use-team-join-request-queries";
import {
  MENTOR_SENT_DEFAULT_FILTER,
  REQUEST_DEFAULT_CATEGORY_FILTER,
} from "@/pages/requests/model/constants";
import { mapMentorBroadcastToSentRow } from "@/pages/requests/model/mapSentMentorBroadcast";
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
  const teamJoinCards: RequestSuggestionCardViewModel[] = teamJoinItems.map(
    (item) => {
      const row = mapTeamJoinInboxItemToRow(item);
      const base = toRequestSuggestionCardViewModel(row);
      const pending = item.status === "PENDING";
      return {
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
      };
    },
  );

  const mentorshipItems = mentorshipQuery.data ?? [];
  const mentorshipCards: RequestSuggestionCardViewModel[] = mentorshipItems.map(
    (item) => {
      const row = mapMentorshipInboxItemToRow(item);
      const base = toRequestSuggestionCardViewModel(row);
      const pending = item.status === "PENDING";
      return {
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
      };
    },
  );

  let receivedCardRows: RequestSuggestionCardViewModel[] = [];
  if (direction === "received" && authed && mentorReceivedEnabled) {
    if (receivedCategoryFilter === "all") {
      receivedCardRows = [...teamJoinCards, ...mentorshipCards];
    } else if (receivedCategoryFilter === "team_join") {
      receivedCardRows = teamJoinCards;
    } else if (receivedCategoryFilter === "mentorship") {
      receivedCardRows = mentorshipCards;
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
      (teamJoinQuery.isLoading || mentorshipQuery.isLoading),
    isSentLoading,
  };
}
