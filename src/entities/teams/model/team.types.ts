export type CoachingTeamStatusApi = "ACTIVE" | "PENDING";

export type CoachingTeamListItem = {
  id: string;
  name: string;
  status: CoachingTeamStatusApi;
  membersCount: number;
  memberAvatarUrls: (string | null)[];
  memberFirstNames: string[];
};

export type CoachingTeamDetail = {
  id: string;
  name: string;
  status: CoachingTeamStatusApi;
  members: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
  }[];
};

export type CreateTeamBody = {
  name: string;
  memberUserIds: string[];
};

export type UpdateTeamBody = {
  name?: string;
  memberUserIds?: string[];
};

export type InviteRegularUserBody = {
  fullName: string;
  email: string;
};
