export type SuggestionTargetScope = "TEAM" | "MENTOR" | "BOARD";

export type SuggestionPriorityApi = "HIGH" | "MEDIUM" | "LOW";

export type UserSuggestionSent = {
  id: string;
  scope: SuggestionTargetScope;
  recipientMentorId: string;
  teamId: string | null;
  boardId: string | null;
  teamName: string | null;
  boardName: string | null;
  targetMentorName: string | null;
  title: string;
  detail: string;
  priority: SuggestionPriorityApi;
  createdAt: string;
  updatedAt: string;
};

export type UserSuggestionMentorTarget = { id: string; label: string };
export type UserSuggestionBoardTarget = {
  id: string;
  name: string;
  mentorId: string;
};

export type UserSuggestionInbox = {
  id: string;
  scope: SuggestionTargetScope;
  title: string;
  detail: string;
  priority: SuggestionPriorityApi;
  sender: { id: string; fullName: string; avatarUrl: string | null };
  teamName: string | null;
  boardName: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserSuggestionBody = {
  scope: SuggestionTargetScope;
  teamId?: string;
  targetMentorId?: string;
  boardId?: string;
  title: string;
  detail: string;
  priority: SuggestionPriorityApi;
};

export type UpdateUserSuggestionBody = {
  title: string;
  detail: string;
  priority: SuggestionPriorityApi;
};

export type CreateUserBoardBody = { name: string; mentorId: string };
