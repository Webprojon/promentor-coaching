import { Typography } from "@promentorapp/ui-kit";
import { PROFILE_IDEAS_TEASERS } from "@/pages/profile/model/constants";

export function ProfileIdeasTeaser() {
  return (
    <section className="rounded-2xl border border-dashed border-white/15 bg-slate-950/40 p-5 backdrop-blur-sm">
      <Typography
        component="h3"
        className="text-sm! font-bold uppercase tracking-wider text-slate-500"
      >
        On the roadmap
      </Typography>
      <Typography component="p" className="mt-1 text-sm text-slate-600">
        Ideas for richer profiles — no wiring yet, just the shape of what could
        ship next.
      </Typography>
      <ul className="mt-4 space-y-3">
        {PROFILE_IDEAS_TEASERS.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.title}
              className="flex gap-3 rounded-xl border border-white/5 bg-white/2 p-3"
            >
              <Typography
                component="span"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-slate-900/60 text-slate-400"
              >
                <Icon className="text-lg" aria-hidden />
              </Typography>
              <div>
                <Typography
                  component="p"
                  className="text-sm! font-semibold text-slate-300"
                >
                  {item.title}
                </Typography>
                <Typography component="p" className="mt-0.5 text-xs text-slate-500">
                  {item.body}
                </Typography>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
