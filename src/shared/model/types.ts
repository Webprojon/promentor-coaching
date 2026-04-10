export type DiscoveryTargetType = "team" | "mentor";

export type RequestStatus = "Pending" | "Accepted" | "Declined";

export type TeamStatus = "Active" | "Pending";

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
