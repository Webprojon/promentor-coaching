import { BOARD_VARIANTS } from "@/pages/boards/model/constants";
import type { BoardType } from "@/pages/boards/model/types";

export function getBoardTypeLabel(type: BoardType) {
  return BOARD_VARIANTS.find((v) => v.value === type)?.label ?? type;
}
