import type { SuggestionPriorityApi } from "@/entities/suggestion/model/suggestion.types";
import type { RequestStatus } from "@/shared/model/types";
import type { IconType } from "react-icons";

type RequestCardSharedFields = {
  id: string;
  cardAccentClass: string;
  chipClass: string;
  shortLabel: string;
  title: string;
  counterpartName: string;
  createdLabel: string;
  summary: string;
};

export type RequestSuggestionCardViewModel = RequestCardSharedFields & {
  CategoryIcon: IconType;
  direction: RequestInboxDirection;
  counterpartAvatarUrl?: string | null;
  status: RequestStatus;
  statusBadgeClass: string;
  priorityLevel?: SuggestionPriorityApi;
  onMentorAccept?: () => Promise<void>;
  onMentorDecline?: () => Promise<void>;
};

export type RequestSentCardViewModel = RequestCardSharedFields & {
  targetKind: MentorSentTargetKind;
  KindIcon: IconType;
  mentorName: string;
  mentorAvatarUrl?: string | null;
  onCancelRequest: () => Promise<void>;
};

export type RequestsTabFilterOption<T extends string = string> = {
  value: T;
  label: string;
  hint?: string;
  Icon?: IconType;
  activeClassName: string;
};

export type RequestCategory = "team_join" | "mentorship" | "suggestion";

export type RequestInboxDirection = "sent" | "received";

export type RequestCategoryFilter = RequestCategory | "all";

export type MentorSentTargetKind = "teams" | "interns" | "boards";

export type MentorSentRequestSendFieldset = {
  primaryLabel: string;
  primaryAriaLabel: string;
  emptyPrimaryLabel: string;
  angleField: {
    label: string;
    ariaLabel: string;
    placeholder: string;
  };
  detailPlaceholder: string;
  extraFields?: readonly {
    label: string;
    ariaLabel: string;
    placeholder: string;
  }[];
};

export type RequestSlotCardViewModel = {
  targetKind: MentorSentTargetKind;
  hint: string;
  chipClass: string;
  Icon: IconType;
};

export type MentorSentFilter = "all" | MentorSentTargetKind;

export type MentorSentRequestRow = {
  id: string;
  targetKind: MentorSentTargetKind;
  title: string;
  counterpartName: string;
  summary: string;
  createdLabel: string;
  onCancelRequest: () => Promise<void>;
};

export type RequestViewToggleOption = {
  value: RequestInboxDirection;
  label: string;
  Icon: IconType;
};

export type EmptyStateActionLink = {
  to: string;
  label: string;
  className: string;
};

export type RequestsEmptyCardProps = {
  scopeLabel: string;
  body: string;
  showActionLinks: boolean;
  actionLinks: readonly EmptyStateActionLink[];
};

export type RequestInboxRow = {
  id: string;
  category: RequestCategory;
  direction: RequestInboxDirection;
  title: string;
  counterpartName: string;
  summary: string;
  status: RequestStatus;
  createdLabel: string;
  counterpartAvatarUrl?: string | null;
  priorityLevel?: SuggestionPriorityApi;
};
