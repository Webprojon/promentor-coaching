import type {
  CoachingTeamDetail,
  CoachingTeamListItem,
  CreateTeamBody,
  CreateTeamJoinRequestBody,
  ExploreTeamListItem,
  InviteRegularUserBody,
  UpdateTeamBody,
} from "@/entities/teams/model/team.types";
import type { CurrentUser } from "@/shared/api/current-user";
import { apiRequest } from "@/shared/api/base-api";

export async function fetchTeams(): Promise<CoachingTeamListItem[]> {
  return apiRequest<CoachingTeamListItem[]>("/teams", { method: "GET" });
}

export async function fetchExploreTeams(): Promise<ExploreTeamListItem[]> {
  return apiRequest<ExploreTeamListItem[]>("/teams/explore", {
    method: "GET",
  });
}

export async function createTeamJoinRequest(
  teamId: string,
  body: CreateTeamJoinRequestBody,
): Promise<{ id: string; status: string }> {
  return apiRequest<{ id: string; status: string }>(
    `/teams/${teamId}/join-requests`,
    { method: "POST", body },
  );
}

export async function fetchTeamDetail(
  teamId: string,
): Promise<CoachingTeamDetail> {
  return apiRequest<CoachingTeamDetail>(`/teams/${teamId}`, { method: "GET" });
}

export async function createTeam(
  body: CreateTeamBody,
): Promise<CoachingTeamListItem> {
  return apiRequest<CoachingTeamListItem>("/teams", {
    method: "POST",
    body,
  });
}

export async function updateTeam(
  teamId: string,
  body: UpdateTeamBody,
): Promise<CoachingTeamListItem> {
  return apiRequest<CoachingTeamListItem>(`/teams/${teamId}`, {
    method: "PATCH",
    body,
  });
}

export async function deleteTeam(teamId: string): Promise<void> {
  await apiRequest<unknown>(`/teams/${teamId}`, { method: "DELETE" });
}

export async function inviteRegularUser(
  body: InviteRegularUserBody,
): Promise<CurrentUser> {
  return apiRequest<CurrentUser>("/teams/invite-user", {
    method: "POST",
    body,
  });
}
