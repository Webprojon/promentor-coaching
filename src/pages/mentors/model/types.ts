import type { WizardStep } from "@/features/send-request-flow/model/types";
import type { RequestStatus } from "@/shared/model/types";

export type MentorExpertise = "Frontend" | "Backend" | "Career";
export type MentorAvailability = "High" | "Medium";

export type MentorRequestStatus = RequestStatus | "NotRequested";

export type Mentor = {
  id: string;
  name: string;
  avatarUrl: string;
  expertise: MentorExpertise;
  sessions: number;
  availability: MentorAvailability;
  linkedTeams: string[];
  requestStatus: MentorRequestStatus;
};

export type MentorCardProps = {
  mentor: Mentor;
  onActionClick: (mentorId: string) => void;
};

export type { WizardStep };
