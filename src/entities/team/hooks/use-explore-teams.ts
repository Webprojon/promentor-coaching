import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTeamJoinRequest,
  fetchExploreTeams,
} from "@/entities/team/api/team-api";
import type { CreateTeamJoinRequestBody } from "@/entities/team/model/team.types";
import { teamQueryKeys } from "@/entities/team/model/team.keys";
import { teamJoinRequestQueryKeys } from "@/entities/team-join-request/model/team-join-request.keys";
import { notifyOk } from "@/shared/feedback/notify";

const STALE_MS = 30_000;

export function useExploreTeamsQuery(enabled: boolean) {
  return useQuery({
    queryKey: teamQueryKeys.explore(),
    queryFn: fetchExploreTeams,
    enabled,
    staleTime: STALE_MS,
    meta: { notifyErrorToastId: "teams-explore" },
  });
}

export function useCreateTeamJoinRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      teamId,
      body,
    }: {
      teamId: string;
      body: CreateTeamJoinRequestBody;
    }) => createTeamJoinRequest(teamId, body),
    meta: { notifyErrorToastId: "teams-join-request-create" },
    onSuccess: async () => {
      notifyOk("Join request sent.");
      await queryClient.invalidateQueries({ queryKey: teamQueryKeys.explore() });
      await queryClient.invalidateQueries({
        queryKey: teamJoinRequestQueryKeys.received(),
      });
    },
  });
}
