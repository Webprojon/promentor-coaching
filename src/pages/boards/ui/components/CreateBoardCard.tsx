import { Button, Typography } from "@promentorapp/ui-kit";
import { LuPlus } from "react-icons/lu";

type CreateBoardCardProps = {
  onCreate: () => void;
};

export function CreateBoardCard({ onCreate }: CreateBoardCardProps) {
  return (
    <Button
      type="button"
      variant="text"
      onClick={onCreate}
      aria-label="Create new tactical board"
      className="group flex h-full min-h-0 w-full min-w-0 flex-col items-center justify-center gap-0 rounded-lg border border-dashed border-slate-500/40 bg-cyan-900/10 px-3 py-3 text-center text-[13px] normal-case shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] transition hover:border-cyan-400/35 sm:px-4 sm:py-3.5"
    >
      <div className="flex max-w-sm flex-1 flex-col items-center justify-center gap-2.5 sm:gap-3">
        <div className="min-w-0 px-0.5 text-center">
          <Typography
            component="span"
            className="block text-base font-semibold tracking-tight text-white sm:text-lg"
          >
            New tactical board
          </Typography>
          <Typography
            component="span"
            className="mt-1 block text-xs leading-snug text-slate-400 sm:mt-1.5 sm:text-sm sm:leading-relaxed"
          >
            Open the editor, then save with a name, team, and date.
          </Typography>
        </div>

        <span
          className="mt-0.5 inline-flex max-w-full items-center justify-center gap-1.5 rounded-lg border border-cyan-400/55 bg-linear-to-b from-cyan-600/30 via-teal-900/25 to-slate-950/50 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition group-hover:from-cyan-500/35 group-hover:border-cyan-300/50 sm:px-5 sm:py-2 sm:text-sm"
        >
          <LuPlus className="size-3.5 shrink-0 sm:size-4" strokeWidth={2.5} aria-hidden />
          Create new board
        </span>
      </div>
    </Button>
  );
}
