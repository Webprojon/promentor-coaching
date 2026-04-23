import type { BoardType, DrawableObject } from "@/pages/boards/model/types";

export type TacticalBoardRecord = {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  sessionDate: string;
  boardType: BoardType;
  objects: DrawableObject[];
  stroke: string;
  strokeWidth: number;
  updatedAt: string;
  createdById?: string;
};
