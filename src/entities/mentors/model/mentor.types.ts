export type MentorExploreApiRow = {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  jobTitle: string | null;
  availabilityLabel: "High" | "Medium" | "Low";
  sessionsThisWeek: number;
  linkedTeams: string[];
  requestStatus: "NONE" | "PENDING" | "ACCEPTED" | "REJECTED";
  mentorshipRequestId: string | null;
};
