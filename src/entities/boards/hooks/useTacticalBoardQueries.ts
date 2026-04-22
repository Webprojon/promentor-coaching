import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTacticalBoard,
  deleteTacticalBoard,
  type CreateTacticalBoardBody,
  fetchTacticalBoards,
  updateTacticalBoard,
} from "@/entities/boards/api/tactical-board-api";
import { tacticalBoardQueryKeys } from "@/entities/boards/model/tactical-board.keys";
import { notifyOk } from "@/shared/feedback/notify";

const STALE_MS = 30_000;

export function useTacticalBoardsListQuery(enabled: boolean) {
  return useQuery({
    queryKey: tacticalBoardQueryKeys.list(),
    queryFn: fetchTacticalBoards,
    enabled,
    staleTime: STALE_MS,
    meta: { notifyErrorToastId: "boards-list" },
  });
}

export function useCreateTacticalBoardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateTacticalBoardBody) => createTacticalBoard(body),
    meta: { notifyErrorToastId: "boards-create" },
    onSuccess: async () => {
      notifyOk("Board saved.");
      await queryClient.invalidateQueries({ queryKey: tacticalBoardQueryKeys.all });
    },
  });
}

export function useUpdateTacticalBoardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: Partial<CreateTacticalBoardBody>;
    }) => updateTacticalBoard(id, body),
    meta: { notifyErrorToastId: "boards-update" },
    onSuccess: async () => {
      notifyOk("Board updated.");
      await queryClient.invalidateQueries({ queryKey: tacticalBoardQueryKeys.all });
    },
  });
}

export function useDeleteTacticalBoardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTacticalBoard(id),
    meta: { notifyErrorToastId: "boards-delete" },
    onSuccess: async () => {
      notifyOk("Board deleted.");
      await queryClient.invalidateQueries({ queryKey: tacticalBoardQueryKeys.all });
    },
  });
}
