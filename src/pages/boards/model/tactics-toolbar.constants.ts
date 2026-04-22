import type { ComponentType } from "react";
import { IoIosFootball } from "react-icons/io";
import {
  LuArrowUpRight,
  LuCircle,
  LuEraser,
  LuMinus,
  LuMousePointer2,
  LuRadio,
  LuRectangleHorizontal,
  LuSpline,
  LuTriangle,
  LuUserRound,
} from "react-icons/lu";
import type { ToolKind } from "@/pages/boards/model/types";

export const TACTICS_TOOLBAR_DRAW_TOOLS: Array<{
  value: ToolKind;
  label: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  { value: "select", label: "Select", icon: LuMousePointer2 },
  { value: "line", label: "Line", icon: LuMinus },
  { value: "freehand", label: "Free", icon: LuSpline },
  { value: "arrow", label: "Arrow", icon: LuArrowUpRight },
  { value: "rect", label: "Rect", icon: LuRectangleHorizontal },
  { value: "circle", label: "Circle", icon: LuCircle },
  { value: "eraser", label: "Eraser", icon: LuEraser },
];

export const TACTICS_TOOLBAR_STICKER_TOOLS: Array<{
  value: ToolKind;
  label: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  { value: "puck", label: "Puck", icon: LuRadio },
  { value: "cone", label: "Cone", icon: LuTriangle },
  { value: "ball", label: "Ball", icon: IoIosFootball },
  { value: "player", label: "Player", icon: LuUserRound },
];

export const TACTICS_TOOLBAR_CHIP_NEUTRAL =
  "border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10";

export const TACTICS_TOOLBAR_CHIP_BASE =
  "flex items-center gap-2 rounded-lg border p-2 text-sm transition ";

export function getTacticsToolButtonClass(
  tool: ToolKind,
  value: ToolKind,
  palette: "draw" | "sticker",
): string {
  if (tool === value) {
    return palette === "draw"
      ? "border-slate-300/60 bg-slate-500/20 text-slate-50"
      : "border-emerald-300/70 bg-emerald-400/10 text-emerald-100";
  }

  return TACTICS_TOOLBAR_CHIP_NEUTRAL;
}
