import { Typography } from "@promentorapp/ui-kit";
import type { ProfileStat } from "@/pages/profile/model/types";

type ProfileStatStripProps = {
  stats: ProfileStat[];
};

export function ProfileStatStrip({ stats }: ProfileStatStripProps) {
  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition hover:border-cyan-300/25"
        >
          <Typography
            component="p"
            className="text-xs font-medium uppercase tracking-wider text-slate-500"
          >
            {stat.label}
          </Typography>
          <Typography
            component="p"
            className="mt-1 text-2xl! font-bold tabular-nums text-white"
          >
            {stat.value}
          </Typography>
          <Typography component="p" className="mt-0.5 text-xs text-slate-400">
            {stat.sublabel}
          </Typography>
        </article>
      ))}
    </section>
  );
}
