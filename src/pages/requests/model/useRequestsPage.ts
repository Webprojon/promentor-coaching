import { useState } from "react";
import {
  MENTOR_SENT_DEFAULT_FILTER,
  MOCK_MENTOR_SENT_REQUESTS,
  MOCK_REQUEST_INBOX,
  REQUEST_DEFAULT_CATEGORY_FILTER,
} from "@/pages/requests/model/constants";
import {
  buildRequestSlotCardViewModel,
  buildRequestsEmptyCard,
  toRequestSentCardViewModel,
  toRequestSuggestionCardViewModel,
} from "@/pages/requests/model/mappers";
import type {
  MentorSentFilter,
  MentorSentTargetKind,
  RequestCategoryFilter,
  RequestInboxDirection,
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
  const [receivedCategoryFilter, setReceivedCategoryFilter] =
    useState<RequestCategoryFilter>(REQUEST_DEFAULT_CATEGORY_FILTER);
  const [mentorSentFilter, setMentorSentFilter] = useState<MentorSentFilter>(
    MENTOR_SENT_DEFAULT_FILTER,
  );

  const [createModalKind, setCreateModalKind] =
    useState<MentorSentTargetKind | null>(null);

  const filteredReceivedRows =
    direction !== "received"
      ? []
      : MOCK_REQUEST_INBOX.filter(
          (r) =>
            r.direction === "received" &&
            (receivedCategoryFilter === "all" ||
              r.category === receivedCategoryFilter),
        );

  const filteredMentorSentRows =
    direction !== "sent"
      ? []
      : mentorSentFilter === "all"
        ? MOCK_MENTOR_SENT_REQUESTS
        : MOCK_MENTOR_SENT_REQUESTS.filter(
            (r) => r.targetKind === mentorSentFilter,
          );

  const receivedCardRows = filteredReceivedRows.map(
    toRequestSuggestionCardViewModel,
  );

  const mentorSentCardRows = filteredMentorSentRows.map(
    toRequestSentCardViewModel,
  );

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
  };
}
