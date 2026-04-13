import type { DiscoveryTargetType } from "@/features/send-request-flow/model/types";
import type { RequestStatus } from "@/shared/model/types";
import type { IconType } from "react-icons";

export type { DiscoveryTargetType, RequestStatus };

export type RequestCategory = "team_join" | "mentorship" | "suggestion";

export type RequestInboxDirection = "sent" | "received";

export type RequestCategoryFilter = RequestCategory | "all";

export type RequestViewToggleOption = {
  value: RequestInboxDirection;
  label: string;
  Icon: IconType;
};

export type RequestCategoryFilterOption = {
  value: RequestCategoryFilter;
  label: string;
  hint?: string;
  Icon?: IconType;
  activeClassName: string;
};

export type RequestsEmptyStateProps = {
  direction: RequestInboxDirection;
  categoryFilter: RequestCategoryFilter;
};

export type EmptyStateActionLink = {
  to: string;
  label: string;
  className: string;
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

export type RequestsOverviewStats = {
  pending: number;
  accepted: number;
  declined: number;
  needsResponse: number;
};
