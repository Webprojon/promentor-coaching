import { Typography } from "@promentorapp/ui-kit";
import { RiInboxArchiveLine, RiSendPlaneLine } from "react-icons/ri";
import type { RequestInboxDirection } from "@/pages/mentorship-requests/model/types";

type RequestsViewToggleProps = {
  direction: RequestInboxDirection;
  onDirectionChange: (value: RequestInboxDirection) => void;
};

export function RequestsViewToggle({
  direction,
  onDirectionChange,
}: RequestsViewToggleProps) {
  return (
    <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/40 p-1.5 backdrop-blur-sm sm:inline-flex sm:flex-row">
      <Typography component="div" className="grid gap-1.5 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onDirectionChange("sent")}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition sm:justify-start sm:px-5 ${
            direction === "sent"
              ? "bg-linear-to-r from-cyan-500/25 to-indigo-500/20 text-white shadow-[0_8px_24px_rgba(2,6,23,0.4)]"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }`}
        >
          <RiSendPlaneLine className="text-lg" aria-hidden />
          Sent
        </button>
        <button
          type="button"
          onClick={() => onDirectionChange("received")}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition sm:justify-start sm:px-5 ${
            direction === "received"
              ? "bg-linear-to-r from-cyan-500/25 to-indigo-500/20 text-white shadow-[0_8px_24px_rgba(2,6,23,0.4)]"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }`}
        >
          <RiInboxArchiveLine className="text-lg" aria-hidden />
          Received
        </button>
      </Typography>
    </section>
  );
}
