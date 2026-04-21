import {
  EMPTY_STATE_ACTION_LINKS,
  EMPTY_STATE_MESSAGE_BY_DIRECTION,
  MENTOR_SENT_KIND_META,
  REQUEST_CATEGORY_META,
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

type CategoryMeta =
  (typeof REQUEST_CATEGORY_META)[keyof typeof REQUEST_CATEGORY_META];
type MentorKindMeta = (typeof MENTOR_SENT_KIND_META)[MentorSentTargetKind];

function cardShellFromMeta(meta: CategoryMeta | MentorKindMeta) {
  return {
    cardAccentClass: meta.cardAccentClass,
    chipClass: meta.chipClass,
    shortLabel: meta.shortLabel,
  };
}

export function toRequestSuggestionCardViewModel(
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
    createdLabel: row.createdLabel,
    summary: row.summary,
    status: row.status,
    statusBadgeClass: REQUEST_STATUS_BADGE_CLASS[row.status],
  };
}

export function toRequestSentCardViewModel(
  row: MentorSentRequestRow,
): RequestSentCardViewModel {
  const meta = MENTOR_SENT_KIND_META[row.targetKind];
  return {
    id: row.id,
    targetKind: row.targetKind,
    ...cardShellFromMeta(meta),
    KindIcon: meta.Icon,
    mentorName: "You",
    mentorAvatarUrl: undefined,
    title: row.title,
    counterpartName: row.counterpartName,
    createdLabel: row.createdLabel,
    summary: row.summary,
  };
}

export function buildRequestSlotCardViewModel(
  direction: RequestInboxDirection,
  mentorSentFilter: MentorSentFilter,
): RequestSlotCardViewModel | null {
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

export function buildRequestsEmptyCard(
  direction: RequestInboxDirection,
  receivedCategoryFilter: RequestCategoryFilter,
  mentorSentFilter: MentorSentFilter,
): RequestsEmptyCardProps {
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
}
