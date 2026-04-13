import { useMemo, useState } from "react";
import {
  EMPTY_STATE_ACTION_LINKS,
  EMPTY_STATE_MESSAGE_BY_DIRECTION,
  MENTOR_SENT_DEFAULT_FILTER,
  MENTOR_SENT_KIND_META,
  MOCK_CURRENT_MENTOR_SENDER,
  MOCK_MENTOR_SENT_REQUESTS,
  MOCK_REQUEST_INBOX,
  REQUEST_CATEGORY_META,
  REQUEST_DEFAULT_CATEGORY_FILTER,
} from "@/pages/requests/model/constants";
import type {
  MentorSentFilter,
  MentorSentRequestRow,
  MentorSentTargetKind,
  RequestCategoryFilter,
  RequestInboxDirection,
  RequestInboxRow,
  RequestSentCardViewModel,
  RequestSlotCardViewModel,
  RequestSuggestionCardViewModel,
  RequestsEmptyCardProps,
} from "@/pages/requests/model/types";
import { REQUEST_STATUS_BADGE_CLASS } from "@/shared/model/constants";

type CategoryMeta = (typeof REQUEST_CATEGORY_META)[keyof typeof REQUEST_CATEGORY_META];
type MentorKindMeta = (typeof MENTOR_SENT_KIND_META)[MentorSentTargetKind];

function cardShellFromMeta(meta: CategoryMeta | MentorKindMeta) {
  return {
    cardAccentClass: meta.cardAccentClass,
    chipClass: meta.chipClass,
    shortLabel: meta.shortLabel,
  };
}

function toRequestSuggestionCardViewModel(
  row: RequestInboxRow,
): RequestSuggestionCardViewModel {
  const meta = REQUEST_CATEGORY_META[row.category];
  return {
    id: row.id,
    ...cardShellFromMeta(meta),
    CategoryIcon: meta.Icon,
    direction: row.direction,
    counterpartName: row.counterpartName,
    counterpartAvatarUrl: row.counterpartAvatarUrl,
    title: row.title,
    targetLabel: row.targetLabel,
    createdLabel: row.createdLabel,
    summary: row.summary,
    status: row.status,
    statusBadgeClass: REQUEST_STATUS_BADGE_CLASS[row.status],
  };
}

function toRequestSentCardViewModel(
  row: MentorSentRequestRow,
): RequestSentCardViewModel {
  const meta = MENTOR_SENT_KIND_META[row.targetKind];
  return {
    id: row.id,
    targetKind: row.targetKind,
    ...cardShellFromMeta(meta),
    KindIcon: meta.Icon,
    mentorName: MOCK_CURRENT_MENTOR_SENDER.name,
    mentorAvatarUrl: MOCK_CURRENT_MENTOR_SENDER.avatarUrl,
    title: row.title,
    counterpartName: row.counterpartName,
    targetLabel: row.targetLabel,
    createdLabel: row.createdLabel,
    summary: row.summary,
  };
}

function emptyScopeLabel(
  direction: RequestInboxDirection,
  categoryFilter: RequestCategoryFilter,
  mentorSentFilter: MentorSentFilter,
): string {
  if (direction === "sent") {
    return mentorSentFilter === "all"
      ? "this view"
      : `“${MENTOR_SENT_KIND_META[mentorSentFilter].label}”`;
  }
  return categoryFilter === "all"
    ? "this view"
    : `“${REQUEST_CATEGORY_META[categoryFilter].label}”`;
}

export function useRequestModalForm(onClose: () => void) {
  const [primaryPick, setPrimaryPick] = useState("");
  const [angle, setAngle] = useState("");
  const [detail, setDetail] = useState("");
  const [extra, setExtra] = useState("");

  const canSubmit =
    primaryPick.trim().length > 0 && detail.trim().length > 0;

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
  const [mentorSentFilter, setMentorSentFilter] =
    useState<MentorSentFilter>(MENTOR_SENT_DEFAULT_FILTER);

  const [createModalKind, setCreateModalKind] =
    useState<MentorSentTargetKind | null>(null);

  const filteredReceivedRows = useMemo(
    () =>
      direction !== "received"
        ? []
        : MOCK_REQUEST_INBOX.filter(
            (r) =>
              r.direction === "received" &&
              (receivedCategoryFilter === "all" ||
                r.category === receivedCategoryFilter),
          ),
    [direction, receivedCategoryFilter],
  );

  const filteredMentorSentRows = useMemo(
    () =>
      direction !== "sent"
        ? []
        : mentorSentFilter === "all"
          ? MOCK_MENTOR_SENT_REQUESTS
          : MOCK_MENTOR_SENT_REQUESTS.filter(
              (r) => r.targetKind === mentorSentFilter,
            ),
    [direction, mentorSentFilter],
  );

  const receivedCardRows = useMemo(
    () => filteredReceivedRows.map(toRequestSuggestionCardViewModel),
    [filteredReceivedRows],
  );

  const mentorSentCardRows = useMemo(
    () => filteredMentorSentRows.map(toRequestSentCardViewModel),
    [filteredMentorSentRows],
  );

  const slotCardViewModel = useMemo((): RequestSlotCardViewModel | null => {
    if (direction !== "sent" || mentorSentFilter === "all") {
      return null;
    }
    const meta = MENTOR_SENT_KIND_META[mentorSentFilter];
    return {
      targetKind: mentorSentFilter,
      hint: meta.hint,
      chipClass: meta.chipClass,
      Icon: meta.Icon,
    };
  }, [direction, mentorSentFilter]);

  const isGridEmpty =
    direction === "received"
      ? receivedCardRows.length === 0
      : mentorSentCardRows.length === 0 && slotCardViewModel === null;

  const emptyCard = useMemo((): RequestsEmptyCardProps => {
    const isSent = direction === "sent";
    return {
      scopeLabel: emptyScopeLabel(
        direction,
        receivedCategoryFilter,
        mentorSentFilter,
      ),
      body: isSent
        ? EMPTY_STATE_MESSAGE_BY_DIRECTION.sent
        : EMPTY_STATE_MESSAGE_BY_DIRECTION.received,
      showActionLinks: !isSent,
      actionLinks: EMPTY_STATE_ACTION_LINKS,
    };
  }, [direction, receivedCategoryFilter, mentorSentFilter]);

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
