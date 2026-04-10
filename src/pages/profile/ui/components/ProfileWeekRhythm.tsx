import { Typography } from "@promentorapp/ui-kit";
import { RiPulseLine } from "react-icons/ri";
import { PROFILE_WEEK_INTENSITY_BAR_CLASS } from "@/pages/profile/model/constants";
import type { ProfileWeekDay } from "@/pages/profile/model/types";

type ProfileWeekRhythmProps = {
  days: ProfileWeekDay[];
};

export function ProfileWeekRhythm({ days }: ProfileWeekRhythmProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/55 p-5 shadow-[0_12px_30px_rgba(2,6,23,0.35)] backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <RiPulseLine className="text-lg text-cyan-300/90" aria-hidden />
        <Typography
          component="h3"
          className="text-sm! font-bold uppercase tracking-wider text-slate-400"
        >
          Weekly rhythm
        </Typography>
      </div>
      <Typography component="p" className="mt-1 text-sm text-slate-500">
        Mock heatmap — later this can reflect sessions, check-ins, or async
        replies.
      </Typography>
      <div className="mt-4 flex items-end justify-between gap-1.5 sm:gap-2">
        {days.map((d, index) => (
          <div
            key={`${d.label}-${index}`}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div
              className={`h-16 w-full max-w-10 rounded-md sm:h-20 ${PROFILE_WEEK_INTENSITY_BAR_CLASS[d.intensity]}`}
              title={`${d.label}: intensity ${d.intensity}`}
            />
            <Typography
              component="span"
              className="text-[10px] font-medium uppercase text-slate-500 sm:text-xs"
            >
              {d.label}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  );
}
