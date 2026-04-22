import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTeamJoinRequest,
  decideTeamJoinRequest,
  fetchReceivedTeamJoinRequests,
} from "@/entities/requests/api/teamJoinRequest.api";
import type { CreateTeamJoinRequestBody } from "@/entities/requests/model/team-join-request.types";
import { teamJoinRequestQueryKeys } from "@/entities/requests/model/teamJoinRequest.keys";
import { exploreTeamsQueryKeys } from "@/entities/explore-teams/model/exploreTeams.keys";
import { teamQueryKeys } from "@/entities/teams/model/team.keys";
import { notifyOk } from "@/shared/feedback/notify";

export function useReceivedTeamJoinRequestsQuery(enabled: boolean) {
  return useQuery({
    queryKey: teamJoinRequestQueryKeys.received(),
    queryFn: fetchReceivedTeamJoinRequests,
    enabled,
    staleTime: 15_000,
    meta: { notifyErrorToastId: "team-join-requests-received" },
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
      await queryClient.invalidateQueries({
        queryKey: exploreTeamsQueryKeys.list(),
      });
      await queryClient.invalidateQueries({
        queryKey: teamJoinRequestQueryKeys.received(),
      });
    },
  });
}

export function useDecideTeamJoinRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      requestId,
      action,
    }: {
      requestId: string;
      action: "accept" | "reject";
    }) => decideTeamJoinRequest(requestId, action),
    meta: { notifyErrorToastId: "team-join-request-decide" },
    onSuccess: async (_data, variables) => {
      notifyOk(
        variables.action === "accept"
          ? "Member added to your team."
          : "Request declined.",
      );
      await queryClient.invalidateQueries({
        queryKey: teamJoinRequestQueryKeys.received(),
      });
      await queryClient.invalidateQueries({
        queryKey: exploreTeamsQueryKeys.list(),
      });
      await queryClient.invalidateQueries({ queryKey: teamQueryKeys.list() });
      await queryClient.invalidateQueries({ queryKey: teamQueryKeys.all });
    },
  });
}
