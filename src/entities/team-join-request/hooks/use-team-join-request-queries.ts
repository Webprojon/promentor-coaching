import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  decideTeamJoinRequest,
  fetchReceivedTeamJoinRequests,
} from "@/entities/team-join-request/api/team-join-request-api";
import { teamJoinRequestQueryKeys } from "@/entities/team-join-request/model/team-join-request.keys";
import { teamQueryKeys } from "@/entities/team/model/team.keys";
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
      await queryClient.invalidateQueries({ queryKey: teamQueryKeys.explore() });
      await queryClient.invalidateQueries({ queryKey: teamQueryKeys.list() });
      await queryClient.invalidateQueries({ queryKey: teamQueryKeys.all });
    },
  });
}
