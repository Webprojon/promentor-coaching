export type MentorBroadcastScopeDto = "TEAM" | "INTERN" | "BOARD";

export type MentorBroadcastStatusDto = "DELIVERED" | "CANCELLED";

export type MentorBroadcastRequestSentItem = {
  id: string;
  scope: MentorBroadcastScopeDto;
  teamId: string | null;
  menteeId: string | null;
  boardId: string | null;
  targetLabel: string;
  contextLine: string | null;
  body: string;
  status: MentorBroadcastStatusDto;
  createdAt: string;
  updatedAt: string;
};

export type CreateMentorBroadcastRequestBody = {
  scope: MentorBroadcastScopeDto;
  teamId?: string;
  menteeId?: string;
  allInterns?: boolean;
  boardId?: string;
  targetLabel?: string;
  contextLine?: string;
  body: string;
};

export type MentorBroadcastTargetOption = {
  id: string;
  label: string;
};
