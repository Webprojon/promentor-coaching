import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMentorshipRequest,
  decideMentorshipRequest,
  deleteMentorshipRequest,
  fetchReceivedMentorshipRequests,
} from "@/entities/requests/api/mentorshipRequest.api";
import { mentorQueryKeys } from "@/entities/mentors/model/mentor.keys";
import { mentorshipRequestQueryKeys } from "@/entities/requests/model/mentorshipRequest.keys";
import { notifyOk } from "@/shared/feedback/notify";

export function useReceivedMentorshipRequestsQuery(enabled: boolean) {
  return useQuery({
    queryKey: mentorshipRequestQueryKeys.received(),
    queryFn: fetchReceivedMentorshipRequests,
    enabled,
    staleTime: 15_000,
    meta: { notifyErrorToastId: "mentorship-requests-received" },
  });
}

export function useCreateMentorshipRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMentorshipRequest,
    meta: { notifyErrorToastId: "mentorship-request-create" },
    onSuccess: async () => {
      notifyOk("Mentorship request sent.");
      await queryClient.invalidateQueries({ queryKey: mentorQueryKeys.list() });
      await queryClient.invalidateQueries({
        queryKey: mentorshipRequestQueryKeys.received(),
      });
    },
  });
}

export function useDeleteMentorshipRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMentorshipRequest,
    meta: { notifyErrorToastId: "mentorship-request-delete" },
    onSuccess: async () => {
      notifyOk("Updated.");
      await queryClient.invalidateQueries({ queryKey: mentorQueryKeys.list() });
    },
  });
}

export function useDecideMentorshipRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      requestId,
      action,
    }: {
      requestId: string;
      action: "accept" | "reject";
    }) => decideMentorshipRequest(requestId, action),
    meta: { notifyErrorToastId: "mentorship-request-decide" },
    onSuccess: async (_data, variables) => {
      notifyOk(
        variables.action === "accept"
          ? "Mentorship accepted."
          : "Request declined.",
      );
      await queryClient.invalidateQueries({
        queryKey: mentorshipRequestQueryKeys.received(),
      });
      await queryClient.invalidateQueries({ queryKey: mentorQueryKeys.list() });
    },
  });
}
