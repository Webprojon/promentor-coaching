import type { RequestStatus } from "@/shared/model/types";
import type { IconType } from "react-icons";

type RequestCardSharedFields = {
  id: string;
  cardAccentClass: string;
  chipClass: string;
  shortLabel: string;
  title: string;
  counterpartName: string;
  targetLabel: string;
  createdLabel: string;
  summary: string;
};

export type RequestSuggestionCardViewModel = RequestCardSharedFields & {
  CategoryIcon: IconType;
  showMentorActions: boolean;
  relationLabel: string;
  counterpartAvatarUrl?: string | null;
  status: RequestStatus;
  statusBadgeClass: string;
};

export type RequestSentCardViewModel = RequestCardSharedFields & {
  KindIcon: IconType;
  mentorName: string;
  mentorAvatarUrl?: string | null;
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

export type MentorSentTargetKind = "teams" | "interns" | "boards" | "workout_plans";

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
  targetLabel: string;
  counterpartName: string;
  summary: string;
  createdLabel: string;
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
  targetLabel: string;
  counterpartName: string;
  summary: string;
  status: RequestStatus;
  createdLabel: string;
  counterpartAvatarUrl?: string | null;
};
