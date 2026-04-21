import { useState } from "react";
import { useHostAuthSession } from "@/features/auth";
import {
  useDecideTeamJoinRequestMutation,
  useReceivedTeamJoinRequestsQuery,
} from "@/entities/requests/hooks/use-team-join-request-queries";
import {
  MENTOR_SENT_DEFAULT_FILTER,
  REQUEST_DEFAULT_CATEGORY_FILTER,
} from "@/pages/requests/model/constants";
import {
  buildRequestSlotCardViewModel,
  buildRequestsEmptyCard,
  toRequestSuggestionCardViewModel,
} from "@/pages/requests/model/mappers";
import { mapTeamJoinInboxItemToRow } from "@/pages/requests/model/mapReceivedTeamJoin";
import type {
  MentorSentFilter,
  MentorSentTargetKind,
  RequestCategoryFilter,
  RequestInboxDirection,
  RequestSentCardViewModel,
  RequestSuggestionCardViewModel,
} from "@/pages/requests/model/types";

export function useRequestModalForm(onClose: () => void) {
  const [primaryPick, setPrimaryPick] = useState("");
  const [angle, setAngle] = useState("");
  const [detail, setDetail] = useState("");
  const [extra, setExtra] = useState("");

  const canSubmit = primaryPick.trim().length > 0 && detail.trim().length > 0;

  return {
    primaryPick,
    setPrimaryPick,
    angle,
    setAngle,
    detail,
    setDetail,
    extra,
    setExtra,
    submit: onClose,
    canSubmit,
  };
}

export function useRequestsPage(direction: RequestInboxDirection) {
  const { session, isHydrating } = useHostAuthSession();
  const isMentor = session.user?.role === "MENTOR";
  const authed = session.isAuthenticated;

  const mentorReceivedEnabled =
    direction === "received" && !isHydrating && authed && isMentor;

  const teamJoinQuery = useReceivedTeamJoinRequestsQuery(mentorReceivedEnabled);
  const decideMutation = useDecideTeamJoinRequestMutation();

  const [receivedCategoryFilter, setReceivedCategoryFilter] =
    useState<RequestCategoryFilter>(REQUEST_DEFAULT_CATEGORY_FILTER);
  const [mentorSentFilter, setMentorSentFilter] = useState<MentorSentFilter>(
    MENTOR_SENT_DEFAULT_FILTER,
  );

  const [createModalKind, setCreateModalKind] =
    useState<MentorSentTargetKind | null>(null);

  const items = teamJoinQuery.data ?? [];
  const teamJoinCards: RequestSuggestionCardViewModel[] = items.map((item) => {
    const row = mapTeamJoinInboxItemToRow(item);
    const base = toRequestSuggestionCardViewModel(row);
    const pending = item.status === "PENDING";
    return {
      ...base,
      onMentorAccept: pending
        ? () =>
            decideMutation.mutateAsync({
              requestId: item.id,
              action: "accept",
            })
        : undefined,
      onMentorDecline: pending
        ? () =>
            decideMutation.mutateAsync({
              requestId: item.id,
              action: "reject",
            })
        : undefined,
    };
  });

  const receivedShowsTeamJoin =
    receivedCategoryFilter === "all" || receivedCategoryFilter === "team_join";

  const filteredReceivedRows =
    direction !== "received" || !authed || !mentorReceivedEnabled
      ? []
      : receivedShowsTeamJoin
        ? teamJoinCards
        : [];

  const receivedCardRows = filteredReceivedRows;

  const mentorSentCardRows: RequestSentCardViewModel[] = [];

  const slotCardViewModel = buildRequestSlotCardViewModel(
    direction,
    mentorSentFilter,
  );

  const isGridEmpty =
    direction === "received"
      ? receivedCardRows.length === 0
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
    isReceivedLoading: mentorReceivedEnabled && teamJoinQuery.isLoading,
  };
}
