import type { BoardType, StickerKind, ToolKind } from "@/pages/boards/model/types";

export const TACTICS_BOARD_STORAGE_KEY = "tactics-board-storage";

export const DEFAULT_BOARD_TYPE: BoardType = "hockey";
export const DEFAULT_TOOL: ToolKind = "select";
export const DEFAULT_STROKE = "#ef4444";
export const DEFAULT_STROKE_WIDTH = 3;

export const BOARD_FIELD_CORNER_RADIUS_PX = 8;

export const CANVAS_MIN_HEIGHT = 420;
export const CANVAS_ASPECT_RATIO = 2;
export const STICKER_BASE_SIZE = 28;
export const PLAYER_BASE_SIZE = 32;

export const PLAYER_MODAL_WIDTH = 176;
export const PLAYER_MODAL_HEIGHT = 132;
export const PLAYER_MODAL_PADDING = 12;

export const STICKER_TOOL_VALUES: readonly StickerKind[] = ["puck", "cone", "ball", "player"];

export const BOARD_VARIANTS: ReadonlyArray<{
  value: BoardType;
  label: string;
  accentClassName: string;
}> = [
  { value: "hockey", label: "Hockey board", accentClassName: "text-rose-200" },
  { value: "football", label: "Football board", accentClassName: "text-emerald-200" },
];
