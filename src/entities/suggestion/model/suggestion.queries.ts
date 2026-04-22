import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUserBoard,
  createUserSuggestion,
  deleteUserSuggestion,
  fetchBoardTargetsForSuggestion,
  fetchMentorTargetsForSuggestion,
  fetchMyUserSuggestions,
  fetchReceivedUserSuggestions,
  updateUserSuggestion,
} from "@/entities/suggestion/api/suggestion.api";
import type {
  CreateUserBoardBody,
  CreateUserSuggestionBody,
  UpdateUserSuggestionBody,
} from "@/entities/suggestion/model/suggestion.types";
import { suggestionQueryKeys } from "@/entities/suggestion/model/suggestion.keys";
import { notifyOk } from "@/shared/feedback/notify";

export function useMyUserSuggestionsQuery(enabled: boolean) {
  return useQuery({
    queryKey: suggestionQueryKeys.my(),
    queryFn: fetchMyUserSuggestions,
    enabled,
    staleTime: 10_000,
    meta: { notifyErrorToastId: "suggestions-my" },
  });
}

export function useMentorTargetsForSuggestionQuery(enabled: boolean) {
  return useQuery({
    queryKey: suggestionQueryKeys.mentorTargets(),
    queryFn: fetchMentorTargetsForSuggestion,
    enabled,
    staleTime: 30_000,
    meta: { notifyErrorToastId: "suggestion-mentor-targets" },
  });
}

export function useBoardTargetsForSuggestionQuery(enabled: boolean) {
  return useQuery({
    queryKey: suggestionQueryKeys.boardTargets(),
    queryFn: fetchBoardTargetsForSuggestion,
    enabled,
    staleTime: 30_000,
    meta: { notifyErrorToastId: "suggestion-board-targets" },
  });
}

export function useCreateUserBoardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateUserBoardBody) => createUserBoard(body),
    meta: { notifyErrorToastId: "suggestion-user-board-create" },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: suggestionQueryKeys.boardTargets(),
      });
    },
  });
}

export function useCreateUserSuggestionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateUserSuggestionBody) => createUserSuggestion(body),
    meta: { notifyErrorToastId: "suggestion-create" },
    onSuccess: async () => {
      notifyOk("Successfully sent");
      await queryClient.invalidateQueries({
        queryKey: suggestionQueryKeys.my(),
      });
    },
  });
}

export function useUpdateUserSuggestionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: UpdateUserSuggestionBody;
    }) => updateUserSuggestion(id, body),
    meta: { notifyErrorToastId: "suggestion-update" },
    onSuccess: async () => {
      notifyOk("Updated");
      await queryClient.invalidateQueries({
        queryKey: suggestionQueryKeys.my(),
      });
      await queryClient.invalidateQueries({
        queryKey: suggestionQueryKeys.received(),
      });
    },
  });
}

export function useDeleteUserSuggestionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUserSuggestion(id),
    meta: { notifyErrorToastId: "suggestion-delete" },
    onSuccess: async () => {
      notifyOk("Deleted");
      await queryClient.invalidateQueries({
        queryKey: suggestionQueryKeys.my(),
      });
      await queryClient.invalidateQueries({
        queryKey: suggestionQueryKeys.received(),
      });
    },
  });
}

export function useReceivedUserSuggestionsQuery(enabled: boolean) {
  return useQuery({
    queryKey: suggestionQueryKeys.received(),
    queryFn: fetchReceivedUserSuggestions,
    enabled,
    staleTime: 10_000,
    meta: { notifyErrorToastId: "suggestions-received" },
  });
}
