export type MentorshipRequestInboxItem = {
  id: string;
  mentorId: string;
  menteeId: string;
  menteeName: string;
  menteeAvatarUrl: string | null;
  message: string | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
};
