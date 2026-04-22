import type { TacticalBoardRecord } from "@/entities/tactical-board/model/tactical-board.types";
import { apiRequest } from "@/shared/api/base-api";

export type CreateTacticalBoardBody = {
  name: string;
  teamId: string;
  sessionDate: string;
  boardType: "hockey" | "football";
  objects: unknown[];
  stroke: string;
  strokeWidth: number;
};

export async function fetchTacticalBoards(): Promise<TacticalBoardRecord[]> {
  return apiRequest<TacticalBoardRecord[]>("/boards", { method: "GET" });
}

export async function fetchTacticalBoard(
  id: string,
): Promise<TacticalBoardRecord> {
  return apiRequest<TacticalBoardRecord>(`/boards/${id}`, {
    method: "GET",
  });
}

export async function createTacticalBoard(
  body: CreateTacticalBoardBody,
): Promise<TacticalBoardRecord> {
  return apiRequest<TacticalBoardRecord>("/boards", {
    method: "POST",
    body,
  });
}

export async function updateTacticalBoard(
  id: string,
  body: Partial<CreateTacticalBoardBody>,
): Promise<TacticalBoardRecord> {
  return apiRequest<TacticalBoardRecord>(`/boards/${id}`, {
    method: "PATCH",
    body,
  });
}

export async function deleteTacticalBoard(id: string): Promise<void> {
  await apiRequest<unknown>(`/boards/${id}`, { method: "DELETE" });
}
