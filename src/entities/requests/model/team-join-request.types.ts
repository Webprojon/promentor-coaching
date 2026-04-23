export type CreateTeamJoinRequestBody = {
  message?: string;
};

export type TeamJoinRequestInboxItem = {
  id: string;
  teamId: string;
  teamName: string;
  requesterId: string;
  requesterName: string;
  requesterAvatarUrl: string | null;
  message: string | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
};
