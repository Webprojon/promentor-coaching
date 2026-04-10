import { Typography } from "@promentorapp/ui-kit";
import { REQUESTS_SUMMARY_STRIP_ITEMS } from "@/pages/mentorship-requests/model/constants";
import type { RequestsOverviewStats } from "@/pages/mentorship-requests/model/types";

type RequestsSummaryStripProps = {
  overview: RequestsOverviewStats;
};

export function RequestsSummaryStrip({ overview }: RequestsSummaryStripProps) {
  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {REQUESTS_SUMMARY_STRIP_ITEMS.map((item) => (
        <article
          key={item.overviewKey}
          className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition hover:border-cyan-300/25"
        >
          <Typography
            component="p"
            className="text-xs font-medium uppercase tracking-wider text-slate-500"
          >
            {item.label}
          </Typography>
          <Typography
            component="p"
            className="mt-1 text-2xl! font-bold tabular-nums text-white"
          >
            {String(overview[item.overviewKey])}
          </Typography>
          <Typography component="p" className="mt-0.5 text-xs text-slate-400">
            {item.sub}
          </Typography>
        </article>
      ))}
    </section>
  );
}
