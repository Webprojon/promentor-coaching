import { Typography } from "@promentorapp/ui-kit";
import { RiCheckboxCircleFill, RiFlagLine } from "react-icons/ri";
import type { ProfileMilestone } from "@/pages/profile/model/types";

type ProfileMilestonesProps = {
  milestones: ProfileMilestone[];
};

export function ProfileMilestones({ milestones }: ProfileMilestonesProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-linear-to-br from-indigo-500/10 via-slate-900/70 to-slate-950/80 p-5 shadow-[0_12px_30px_rgba(2,6,23,0.35)] backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <RiFlagLine className="text-lg text-indigo-300/90" aria-hidden />
        <Typography
          component="h3"
          className="text-sm! font-bold uppercase tracking-wider text-slate-400"
        >
          Milestones
        </Typography>
      </div>
      <Typography component="p" className="mt-1 text-sm text-slate-500">
        A lightweight trail of how you are growing inside the program.
      </Typography>
      <ol className="relative mt-5 space-y-4 border-l border-white/10 pl-5">
        {milestones.map((m, index) => (
          <li key={`${m.title}-${index}`} className="relative">
            <span
              className={`absolute -left-[21px] top-1.5 flex h-2.5 w-2.5 rounded-full border-2 border-slate-950 ${
                m.complete
                  ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  : "bg-slate-600"
              }`}
              aria-hidden
            />
            <div className="flex flex-wrap items-start justify-between gap-2">
              <Typography
                component="span"
                className={`text-sm! font-semibold ${m.complete ? "text-white" : "text-slate-400"}`}
              >
                {m.title}
              </Typography>
              {m.complete ? (
                <RiCheckboxCircleFill
                  className="shrink-0 text-cyan-400/90"
                  aria-label="Completed"
                />
              ) : null}
            </div>
            <Typography
              component="span"
              className="mt-0.5 block text-xs text-slate-500"
            >
              {m.date}
            </Typography>
          </li>
        ))}
      </ol>
    </section>
  );
}
