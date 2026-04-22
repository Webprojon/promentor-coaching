import { useQuery } from "@tanstack/react-query";
import { fetchExploreTeams } from "@/entities/explore-teams/api/explore-teams-api";
import { exploreTeamsQueryKeys } from "@/entities/explore-teams/model/explore-teams.keys";

const STALE_MS = 30_000;

export function useExploreTeamsQuery(enabled: boolean) {
  return useQuery({
    queryKey: exploreTeamsQueryKeys.list(),
    queryFn: fetchExploreTeams,
    enabled,
    staleTime: STALE_MS,
    meta: { notifyErrorToastId: "teams-explore" },
  });
}
