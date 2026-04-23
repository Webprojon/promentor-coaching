export type DiscoveryTargetType = "team" | "mentor";

export type WizardStep = 1 | 2 | 3;

export type RequestDraft = {
  targetType: DiscoveryTargetType;
  targetId: string;
  targetName: string;
  goal: string;
  reason: string;
  weeklyAvailability: string;
  note: string;
};

export type SendRequestFlowProps = {
  step: WizardStep;
};
