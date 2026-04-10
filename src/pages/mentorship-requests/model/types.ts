import type {
  RequestDraft,
  RequestStatus,
  WizardStep,
} from "@/shared/model/types";

export type { DiscoveryTargetType, RequestStatus } from "@/shared/model/types";

export type RequestFlowWizardProps = {
  step: WizardStep;
  targetLabel: string;
  draft: RequestDraft;
  onChange: (field: keyof RequestDraft, value: string) => void;
};

export type RequestCategory = "team_join" | "mentorship" | "suggestion";

export type RequestInboxDirection = "sent" | "received";

export type RequestCategoryFilter = RequestCategory | "all";

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
