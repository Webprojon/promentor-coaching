import { Button, Typography } from "@promentorapp/ui-kit";
import { RiAddLine } from "react-icons/ri";
import { MENTOR_SENT_KIND_META } from "@/pages/requests/model/constants";
import type { MentorSentTargetKind } from "@/pages/requests/model/types";

type CreateMentorRequestSlotCardProps = {
  targetKind: MentorSentTargetKind;
  onClick: () => void;
};

export function CreateMentorRequestSlotCard({
  targetKind,
  onClick,
}: CreateMentorRequestSlotCardProps) {
  const meta = MENTOR_SENT_KIND_META[targetKind];
  const Icon = meta.Icon;

  return (
    <article
      className={`flex min-h-[220px] flex-col justify-center rounded-lg border border-dashed border-white/25 bg-linear-to-br from-slate-900/40 via-slate-950/70 to-slate-950/90 p-6 transition hover:border-cyan-400/45 hover:shadow-[0_0_32px_rgba(34,211,238,0.08)]`}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${meta.chipClass}`}
        >
          <Icon className="text-2xl" aria-hidden />
        </div>
        <div>
          <Typography
            component="h3"
            className="text-base font-bold tracking-tight text-white"
          >
            Draft something new
          </Typography>
          <Typography component="p" className="mt-1 text-sm text-slate-500">
            {meta.hint}
          </Typography>
        </div>
        <Button
          type="button"
          onClick={onClick}
          className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/50 bg-linear-to-r from-cyan-500/20 to-indigo-500/15 px-5 py-2.5 text-sm font-semibold text-cyan-50 shadow-[0_8px_28px_rgba(2,6,23,0.45)] transition hover:border-cyan-300/70 hover:from-cyan-500/30 hover:to-indigo-500/25"
        >
          <RiAddLine className="text-lg" aria-hidden />
          Create New Request
        </Button>
      </div>
    </article>
  );
}
