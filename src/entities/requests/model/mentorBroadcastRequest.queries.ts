import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelMentorBroadcastRequest,
  createMentorBroadcastRequest,
  fetchMentorBroadcastTargets,
  fetchSentMentorBroadcastRequests,
} from "@/entities/requests/api/mentorBroadcastRequest.api";
import type { CreateMentorBroadcastRequestBody } from "@/entities/requests/model/mentorBroadcastRequest.types";
import { mentorBroadcastRequestQueryKeys } from "@/entities/requests/model/mentorBroadcastRequest.keys";
import { notifyOk } from "@/shared/feedback/notify";

export function useSentMentorBroadcastRequestsQuery(enabled: boolean) {
  return useQuery({
    queryKey: mentorBroadcastRequestQueryKeys.sent(),
    queryFn: fetchSentMentorBroadcastRequests,
    enabled,
    staleTime: 15_000,
    meta: { notifyErrorToastId: "mentor-broadcast-requests-sent" },
  });
}

export function useMentorBroadcastTargetsQuery(
  kind: "interns" | "boards",
  enabled: boolean,
) {
  return useQuery({
    queryKey: mentorBroadcastRequestQueryKeys.targets(kind),
    queryFn: () => fetchMentorBroadcastTargets(kind),
    enabled,
    staleTime: 60_000,
    meta: { notifyErrorToastId: "mentor-broadcast-request-targets" },
  });
}

export function useCreateMentorBroadcastRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateMentorBroadcastRequestBody) =>
      createMentorBroadcastRequest(body),
    meta: { notifyErrorToastId: "mentor-broadcast-request-create" },
    onSuccess: async () => {
      notifyOk("Successfully sent");
      await queryClient.invalidateQueries({
        queryKey: mentorBroadcastRequestQueryKeys.sent(),
      });
    },
  });
}

export function useCancelMentorBroadcastRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId: string) => cancelMentorBroadcastRequest(requestId),
    meta: { notifyErrorToastId: "mentor-broadcast-request-cancel" },
    onSuccess: async () => {
      notifyOk("Request cancelled.");
      await queryClient.invalidateQueries({
        queryKey: mentorBroadcastRequestQueryKeys.sent(),
      });
    },
  });
}
