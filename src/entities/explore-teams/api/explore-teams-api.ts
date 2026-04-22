import type { ExploreTeamListItem } from "@/entities/explore-teams/model/explore-teams.types";
import { apiRequest } from "@/shared/api/base-api";

export async function fetchExploreTeams(): Promise<ExploreTeamListItem[]> {
  return apiRequest<ExploreTeamListItem[]>("/teams/explore", {
    method: "GET",
  });
}
