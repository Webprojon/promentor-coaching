import { Button, Typography } from "@promentorapp/ui-kit";
import { RiAddLine } from "react-icons/ri";
import type { RequestSlotCardViewModel } from "@/pages/requests/model/types";

type RequestSlotCardProps = {
  viewModel: RequestSlotCardViewModel;
  onClick: () => void;
};

export function RequestSlotCard({ viewModel, onClick }: RequestSlotCardProps) {
  const { hint, chipClass, Icon } = viewModel;

  return (
    <article
      className={`flex flex-col justify-center rounded-lg border border-dashed border-white/25 bg-linear-to-br from-slate-900/40 via-slate-950/70 to-slate-950/90 p-6 transition hover:border-cyan-400/45 hover:shadow-[0_0_32px_rgba(34,211,238,0.08)]`}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg border ${chipClass}`}
        >
          <Icon className="text-xl" aria-hidden />
        </div>
        <div>
          <Typography
            component="h3"
            className="text-base font-bold tracking-tight text-white"
          >
            Draft something new
          </Typography>
          <Typography component="p" className="mt-1 text-sm text-slate-500">
            {hint}
          </Typography>
        </div>
        <Button
          type="button"
          onClick={onClick}
          className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/50 bg-linear-to-r from-cyan-500/20 to-indigo-500/15 px-3 py-2.5 text-sm font-semibold text-cyan-50 shadow-[0_8px_28px_rgba(2,6,23,0.45)] transition hover:border-cyan-300/70 hover:from-cyan-500/30 hover:to-indigo-500/25"
        >
          <RiAddLine className="text-lg" aria-hidden />
          Create New Request
        </Button>
      </div>
    </article>
  );
}
