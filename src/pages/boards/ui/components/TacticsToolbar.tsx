import { Button, Typography } from "@promentorapp/ui-kit";
import {
  LuArrowLeft,
  LuRedo2,
  LuRotateCcw,
  LuSave,
  LuTrash2,
  LuUndo2,
} from "react-icons/lu";
import {
  getTacticsToolButtonClass,
  TACTICS_TOOLBAR_CHIP_BASE,
  TACTICS_TOOLBAR_CHIP_NEUTRAL,
  TACTICS_TOOLBAR_DRAW_TOOLS,
  TACTICS_TOOLBAR_STICKER_TOOLS,
} from "@/pages/boards/model/constants/tactics-toolbar";
import { useBoardsTactics } from "@/pages/boards/model/useBoardsTactics";

type TacticsToolbarProps =
  | {
      variant: "viewer";
      onBack: () => void;
    }
  | {
      variant: "editor";
      onBack: () => void;
      onSave: () => void;
      canSave: boolean;
      isSaveBusy?: boolean;
    };

function TacticsBackButton({ onBack }: { onBack: () => void }) {
  return (
    <Button
      type="button"
      onClick={onBack}
      className={`order-first shrink-0 ${TACTICS_TOOLBAR_CHIP_BASE} ${TACTICS_TOOLBAR_CHIP_NEUTRAL}`}
      aria-label="Back to board list"
    >
      <LuArrowLeft className="size-4 shrink-0" aria-hidden />
      <Typography component="span" className="whitespace-nowrap text-sm">
        Back to boards
      </Typography>
    </Button>
  );
}

export function TacticsToolbar(props: TacticsToolbarProps) {
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

  if (props.variant === "viewer") {
    return (
      <div className="rounded-lg border border-white/10 bg-slate-900/30 p-3 shadow-lg">
        <div className="flex flex-wrap items-center gap-2">
          <TacticsBackButton onBack={props.onBack} />
        </div>
      </div>
    );
  }

  const { onBack, onSave, canSave, isSaveBusy = false } = props;

  return (
    <div className="rounded-lg border border-white/10 bg-slate-900/30 p-3 shadow-lg">
      <div className="flex flex-wrap items-center gap-2">
        <TacticsBackButton onBack={onBack} />

        <div className="mx-0.5 h-8 w-px shrink-0 bg-white/20" aria-hidden />

        {TACTICS_TOOLBAR_DRAW_TOOLS.map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            type="button"
            onClick={() => setTool(value)}
            className={`${TACTICS_TOOLBAR_CHIP_BASE} ${getTacticsToolButtonClass(tool, value, "draw")}`}
            aria-label={label}
          >
            <Icon className="size-4" />
            <Typography component="span" className="text-sm">
              {label}
            </Typography>
          </Button>
        ))}

        <div className="mx-1 h-8 w-0.5 bg-white/30" />

        {TACTICS_TOOLBAR_STICKER_TOOLS.map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            type="button"
            onClick={() => setTool(value)}
            className={`${TACTICS_TOOLBAR_CHIP_BASE} ${getTacticsToolButtonClass(tool, value, "sticker")}`}
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
            className="w-24 accent-neutral-300"
            onChange={(event) => setStrokeWidth(Number(event.target.value))}
          />
          <Typography
            component="span"
            className="w-2 text-right text-xs text-slate-200"
          >
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
          onClick={onSave}
          disabled={!canSave || isSaveBusy}
          className="inline-flex min-w-22 items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/12 px-3 py-2 text-sm font-medium text-emerald-50/95 shadow-sm transition enabled:hover:border-emerald-400/60 enabled:hover:bg-emerald-500/22 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Save board"
        >
          <LuSave className="size-4 shrink-0" aria-hidden />
          Save
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
