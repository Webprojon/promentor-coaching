import type { WizardStep } from "@/features/send-request-flow/model/types";
import type { RequestStatus } from "@/shared/model/types";

export type MentorAvailability = "High" | "Medium" | "Low";

export type MentorRequestStatus =
  | Exclude<RequestStatus, "Delivered">
  | "NotRequested";

export type Mentor = {
  id: string;
  name: string;
  avatarUrl: string;
  expertiseLabel: string;
  sessions: number;
  availability: MentorAvailability;
  linkedTeams: string[];
  requestStatus: MentorRequestStatus;
  mentorshipRequestId: string | null;
};

export type MentorCardProps = {
  mentor: Mentor;
  isMentorshipActionPending: boolean;
  onActionClick: (mentorId: string) => void;
};

export type { WizardStep };
