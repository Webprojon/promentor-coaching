import { Button, Typography } from "@promentorapp/ui-kit";
import dayjs from "dayjs";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import type { TacticalBoardRecord } from "@/entities/boards";
import { getBoardTypeLabel } from "@/pages/boards/lib/board-type-label";
import { Modal } from "@/shared/ui";

type BoardDetailsModalProps = {
  open: boolean;
  board: TacticalBoardRecord | null;
  isMentor: boolean;
  onClose: () => void;
  onViewBoard: () => void;
  onEdit: () => void;
  onRequestDelete: () => void;
};

function formatDetailDate(ymd: string) {
  const parsed = dayjs(ymd, "YYYY-MM-DD", true);
  return parsed.isValid() ? parsed.format("MMMM D, YYYY") : ymd;
}

export function BoardDetailsModal({
  open,
  board,
  isMentor,
  onClose,
  onViewBoard,
  onEdit,
  onRequestDelete,
}: BoardDetailsModalProps) {
  if (!open || !board) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={board.name}
      footerActions={
        isMentor
          ? undefined
          : [
              {
                id: "close-user",
                label: "Close",
                onClick: onClose,
                variant: "contained",
              },
            ]
      }
    >
      <div className="space-y-4">
        <Typography component="p" className="text-sm text-slate-400">
          View tactical board details for your team. Changes sync across members
          from the server.
        </Typography>
        <dl className="grid gap-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-white/10 py-2">
            <dt className="text-slate-500">Team</dt>
            <dd className="text-right font-medium text-slate-200">
              {board.teamName}
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-white/10 py-2">
            <dt className="text-slate-500">Session date</dt>
            <dd className="text-right font-medium text-slate-200">
              {formatDetailDate(board.sessionDate)}
            </dd>
          </div>
          <div className="flex justify-between gap-4 py-2">
            <dt className="text-slate-500">Surface</dt>
            <dd className="text-right font-medium text-slate-200">
              {getBoardTypeLabel(board.boardType)}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-white/10 pt-4">
          <Button
            type="button"
            onClick={onViewBoard}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-200 transition hover:border-white/20 hover:bg-white/10"
            aria-label="View board"
          >
            <LuEye className="size-4" />
            View board
          </Button>
          {isMentor ? (
            <>
              <Button
                type="button"
                onClick={onEdit}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-emerald-400/10 px-3 py-2 text-emerald-200 transition hover:bg-emerald-400/15"
                aria-label="Edit board"
              >
                <LuPencil className="size-4" />
                Edit
              </Button>
              <Button
                type="button"
                onClick={onRequestDelete}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-rose-400/10 px-3 py-2 text-rose-200 transition hover:bg-rose-400/15"
                aria-label="Delete board"
              >
                <LuTrash2 className="size-4" />
                Delete
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
