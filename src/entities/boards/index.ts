export type { CreateTacticalBoardBody } from "@/entities/boards/api/board.api";
export {
  createTacticalBoard,
  deleteTacticalBoard,
  fetchTacticalBoard,
  fetchTacticalBoards,
  updateTacticalBoard,
} from "@/entities/boards/api/board.api";
export {
  useCreateTacticalBoardMutation,
  useDeleteTacticalBoardMutation,
  useTacticalBoardsListQuery,
  useUpdateTacticalBoardMutation,
} from "@/entities/boards/model/board.queries";
export { tacticalBoardQueryKeys } from "@/entities/boards/model/board.keys";
export type { TacticalBoardRecord } from "@/entities/boards/model/board.types";
