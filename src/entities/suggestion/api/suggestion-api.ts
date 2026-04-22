import type {
  CreateUserBoardBody,
  CreateUserSuggestionBody,
  UpdateUserSuggestionBody,
  UserSuggestionBoardTarget,
  UserSuggestionInbox,
  UserSuggestionMentorTarget,
  UserSuggestionSent,
} from "@/entities/suggestion/model/suggestion.types";
import { apiRequest } from "@/shared/api/base-api";

export async function fetchMyUserSuggestions(): Promise<UserSuggestionSent[]> {
  return apiRequest<UserSuggestionSent[]>("/user-suggestions", { method: "GET" });
}

export async function createUserSuggestion(
  body: CreateUserSuggestionBody,
): Promise<UserSuggestionSent> {
  return apiRequest<UserSuggestionSent>("/user-suggestions", {
    method: "POST",
    body,
  });
}

export async function updateUserSuggestion(
  id: string,
  body: UpdateUserSuggestionBody,
): Promise<UserSuggestionSent> {
  return apiRequest<UserSuggestionSent>(`/user-suggestions/${id}`, {
    method: "PATCH",
    body,
  });
}

export async function deleteUserSuggestion(id: string): Promise<void> {
  await apiRequest<unknown>(`/user-suggestions/${id}`, { method: "DELETE" });
}

export async function fetchMentorTargetsForSuggestion(): Promise<
  UserSuggestionMentorTarget[]
> {
  return apiRequest<UserSuggestionMentorTarget[]>(
    "/user-suggestions/mentor-targets/mentors",
    { method: "GET" },
  );
}

export async function fetchBoardTargetsForSuggestion(): Promise<
  UserSuggestionBoardTarget[]
> {
  return apiRequest<UserSuggestionBoardTarget[]>(
    "/user-suggestions/mentor-targets/boards",
    { method: "GET" },
  );
}

export async function createUserBoard(
  body: CreateUserBoardBody,
): Promise<UserSuggestionBoardTarget> {
  return apiRequest<UserSuggestionBoardTarget>(
    "/user-suggestions/mentor-targets/boards",
    { method: "POST", body },
  );
}

export async function fetchReceivedUserSuggestions(): Promise<
  UserSuggestionInbox[]
> {
  return apiRequest<UserSuggestionInbox[]>(
    "/user-suggestions/received",
    { method: "GET" },
  );
}
