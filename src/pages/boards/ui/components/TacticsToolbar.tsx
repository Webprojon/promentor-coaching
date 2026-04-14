import type { ComponentType } from "react";
import { Button, Typography } from "@promentorapp/ui-kit";
import { IoIosFootball } from "react-icons/io";
import {
  LuArrowUpRight,
  LuCircle,
  LuEraser,
  LuMinus,
  LuMousePointer2,
  LuRadio,
  LuRectangleHorizontal,
  LuRedo2,
  LuRotateCcw,
  LuTrash2,
  LuTriangle,
  LuUndo2,
  LuUserRound,
} from "react-icons/lu";
import { useBoardsTactics } from "@/pages/boards/model/useBoardsTactics";
import type { ToolKind } from "@/pages/boards/model/types";

const DRAW_TOOLS: Array<{ value: ToolKind; label: string; icon: ComponentType<{ className?: string }> }> = [
  { value: "select", label: "Select", icon: LuMousePointer2 },
  { value: "line", label: "Line", icon: LuMinus },
  { value: "arrow", label: "Arrow", icon: LuArrowUpRight },
  { value: "rect", label: "Rect", icon: LuRectangleHorizontal },
  { value: "circle", label: "Circle", icon: LuCircle },
  { value: "eraser", label: "Eraser", icon: LuEraser },
];

const STICKER_TOOLS: Array<{ value: ToolKind; label: string; icon: ComponentType<{ className?: string }> }> = [
  { value: "puck", label: "Puck", icon: LuRadio },
  { value: "cone", label: "Cone", icon: LuTriangle },
  { value: "ball", label: "Ball", icon: IoIosFootball },
  { value: "player", label: "Player", icon: LuUserRound },
];

function getToolButtonClass(tool: ToolKind, value: ToolKind, palette: "draw" | "sticker") {
  if (tool === value) {
    return palette === "draw"
      ? "border-cyan-300/70 bg-cyan-400/10 text-cyan-100"
      : "border-emerald-300/70 bg-emerald-400/10 text-emerald-100";
  }

  return "border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10";
}

export function TacticsToolbar() {
  const {
    tool,
    stroke,
    strokeWidth,
    setTool,
    setStroke,
    setStrokeWidth,
    undo,
    redo,
    clearBoard,
    history,
    future,
    objects,
  } = useBoardsTactics();

  return (
    <div className="rounded-lg border border-white/10 bg-slate-900/30 p-3 shadow-lg">
      <div className="flex flex-wrap items-center gap-2">
        {DRAW_TOOLS.map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            type="button"
            onClick={() => setTool(value)}
            className={`flex items-center gap-2 rounded-lg border p-2 text-sm transition ${getToolButtonClass(tool, value, "draw")}`}
            aria-label={label}
          >
            <Icon className="size-4" />
            <Typography component="span" className="text-sm">
              {label}
            </Typography>
          </Button>
        ))}

        <div className="mx-1 h-8 w-0.5 bg-white/30" />

        {STICKER_TOOLS.map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            type="button"
            onClick={() => setTool(value)}
            className={`flex items-center gap-2 rounded-lg border p-2 text-sm transition ${getToolButtonClass(tool, value, "sticker")}`}
            aria-label={label}
          >
            <Icon className="size-4" />
            <Typography component="span" className="text-sm">
              {label}
            </Typography>
          </Button>
        ))}

        <div className="mx-1 h-8 w-0.5 bg-white/30" />

        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-slate-200">
          <LuRotateCcw className="size-4" />
          <Typography component="span" className="text-sm text-slate-200">
            Color
          </Typography>
          <input
            type="color"
            value={stroke}
            onChange={(event) => setStroke(event.target.value)}
            className="h-6 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
          />
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-slate-200">
          <Typography component="span" className="text-sm text-slate-200">
            Size
          </Typography>
          <input
            type="range"
            min={1}
            max={10}
            value={strokeWidth}
            className="w-24 accent-cyan-400"
            onChange={(event) => setStrokeWidth(Number(event.target.value))}
          />
          <Typography component="span" className="w-2 text-right text-xs text-slate-200">
            {strokeWidth}
          </Typography>
        </div>

        <Button
          type="button"
          onClick={undo}
          disabled={history.length === 0}
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200 transition enabled:hover:border-white/20 enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Undo"
        >
          <LuUndo2 className="size-4" />
        </Button>

        <Button
          type="button"
          onClick={redo}
          disabled={future.length === 0}
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200 transition enabled:hover:border-white/20 enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Redo"
        >
          <LuRedo2 className="size-4" />
        </Button>

        <Button
          type="button"
          onClick={clearBoard}
          disabled={objects.length === 0}
          className="rounded-lg border border-rose-300/30 bg-rose-500/10 p-2 text-rose-100 transition enabled:hover:border-rose-300/60 enabled:hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Clear board"
        >
          <LuTrash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
