import { Button, Typography } from "@promentorapp/ui-kit";
import dayjs from "dayjs";
import { LuUsers } from "react-icons/lu";
import { getBoardTypeLabel } from "@/pages/boards/lib/board-type-label";
import type { TacticalBoardRecord } from "@/entities/boards";

type BoardCardProps = {
  board: TacticalBoardRecord;
  onMore: () => void;
};

function formatSession(ymd: string) {
  const parsed = dayjs(ymd, "YYYY-MM-DD", true);
  return parsed.isValid() ? parsed.format("MMM D, YYYY") : ymd;
}

function formatUpdated(iso: string) {
  const d = dayjs(iso);
  return d.isValid() ? d.format("DD.MM.YYYY [at] HH:mm") : "";
}


export function BoardCard({ board, onMore }: BoardCardProps) {
  const typeLabel = getBoardTypeLabel(board.boardType);
  const updatedLabel = formatUpdated(board.updatedAt);

  return (
    <article
      className="relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-lg border border-white/10 bg-cyan-800/5 shadow-[0_16px_40px_rgba(2,6,23,0.55)] transition hover:border-white/15"
    >
      <div
        className="absolute left-0 top-0 h-full w-1 bg-cyan-900"
        aria-hidden
      />

      <div className="flex flex-col pl-3 pr-3 pb-2.5 pt-3 sm:pl-4 sm:pr-4 sm:pt-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-start gap-2">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-1.5">
              <span className="inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-100">
                <LuUsers className="size-3.5 shrink-0 opacity-90" aria-hidden />
                <span className="truncate">Team</span>
              </span>
              <span className="inline-flex w-fit max-w-full rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-100">
                <span className="truncate">{typeLabel}</span>
              </span>
            </div>
          </div>
          {updatedLabel ? (
            <time
              dateTime={board.updatedAt}
              className="shrink-0 text-right text-[11px] leading-tight text-slate-500 sm:text-xs"
            >
              {updatedLabel}
            </time>
          ) : null}
        </div>

        <div className="mt-2 min-w-0">
          <Typography
            component="h3"
            className="line-clamp-2 text-left text-base font-semibold leading-snug text-white"
          >
            {board.name}
          </Typography>
          <Typography
            component="p"
            className="mt-0.5 truncate text-sm text-slate-400"
          >
            Created for: <span className="font-bold text-slate-200">{board.teamName}</span> team
          </Typography>
        </div>

        <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-slate-300/90">
          <span className="text-slate-500">Session: </span>
          {formatSession(board.sessionDate)}
          <span className="mx-1.5 text-slate-600" aria-hidden>
            ·
          </span>
          <span className="text-slate-500">Surface: </span>
          {typeLabel}
          <span className="mx-1.5 text-slate-600" aria-hidden>
            ·
          </span>
          <span className="text-slate-500">Elements: </span>
          {board.objects.length}
        </p>

        <div className="mt-1.5 flex justify-end">
          <Button
            type="button"
            variant="text"
            onClick={onMore}
            className="min-w-0 px-2 py-0.5 text-xs font-medium text-slate-400 normal-case hover:bg-white/5 hover:text-slate-200"
            aria-label={`More about ${board.name}`}
          >
            More
          </Button>
        </div>
      </div>
    </article>
  );
}
