export type { CreateTacticalBoardBody } from "@/entities/boards/api/tactical-board-api";
export {
  createTacticalBoard,
  deleteTacticalBoard,
  fetchTacticalBoard,
  fetchTacticalBoards,
  updateTacticalBoard,
} from "@/entities/boards/api/tactical-board-api";
export {
  useCreateTacticalBoardMutation,
  useDeleteTacticalBoardMutation,
  useTacticalBoardsListQuery,
  useUpdateTacticalBoardMutation,
} from "@/entities/boards/hooks/use-tactical-board-queries";
export { tacticalBoardQueryKeys } from "@/entities/boards/model/tactical-board.keys";
export type { TacticalBoardRecord } from "@/entities/boards/model/tactical-board.types";
