export type { CreateTacticalBoardBody } from "@/entities/tactical-board/api/tactical-board-api";
export {
  createTacticalBoard,
  deleteTacticalBoard,
  fetchTacticalBoard,
  fetchTacticalBoards,
  updateTacticalBoard,
} from "@/entities/tactical-board/api/tactical-board-api";
export {
  useCreateTacticalBoardMutation,
  useDeleteTacticalBoardMutation,
  useTacticalBoardsListQuery,
  useUpdateTacticalBoardMutation,
} from "@/entities/tactical-board/hooks/use-tactical-board-queries";
export { tacticalBoardQueryKeys } from "@/entities/tactical-board/model/tactical-board.keys";
export type { TacticalBoardRecord } from "@/entities/tactical-board/model/tactical-board.types";
