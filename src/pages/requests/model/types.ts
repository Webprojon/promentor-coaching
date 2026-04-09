import type { RequestDraft, WizardStep } from "../../../shared/model/types";

export type { DiscoveryTargetType, RequestStatus } from "../../../shared/model/types";

export type RequestFlowWizardProps = {
  step: WizardStep;
  targetLabel: string;
  draft: RequestDraft;
  onChange: (field: keyof RequestDraft, value: string) => void;
};
