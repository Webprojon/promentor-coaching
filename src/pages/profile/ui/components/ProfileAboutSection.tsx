import { Typography } from "@promentorapp/ui-kit";
import { RiSparkling2Line } from "react-icons/ri";
import type { ProfileFocusArea } from "@/pages/profile/model/types";

type ProfileAboutSectionProps = {
  bio: string;
  focusAreas: ProfileFocusArea[];
};

export function ProfileAboutSection({
  bio,
  focusAreas,
}: ProfileAboutSectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/55 p-5 shadow-[0_12px_30px_rgba(2,6,23,0.35)] backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <RiSparkling2Line className="text-lg text-cyan-300/90" aria-hidden />
        <Typography
          component="h3"
          className="text-sm! font-bold uppercase tracking-wider text-slate-400"
        >
          About you
        </Typography>
      </div>
      <Typography component="p" className="mt-3 text-sm leading-relaxed text-slate-300">
        {bio}
      </Typography>
      <Typography
        component="p"
        className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-500"
      >
        Focus areas
      </Typography>
      <ul className="mt-2 flex flex-wrap gap-2">
        {focusAreas.map((area) => (
          <li key={area.label}>
            <Typography
              component="span"
              className="inline-flex rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-3 py-1.5 text-xs! font-medium text-cyan-100/95"
            >
              {area.label}
            </Typography>
          </li>
        ))}
      </ul>
    </section>
  );
}
