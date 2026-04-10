import { Typography } from "@promentorapp/ui-kit";
import { Link } from "react-router-dom";
import { RiArrowRightUpLine } from "react-icons/ri";
import {
  PROFILE_QUICK_LINK_ICON_CLASSNAME,
  PROFILE_QUICK_LINK_ICONS,
} from "@/pages/profile/model/constants";
import type { ProfileQuickLink } from "@/pages/profile/model/types";

type ProfileQuickLinksProps = {
  links: ProfileQuickLink[];
};

export function ProfileQuickLinks({ links }: ProfileQuickLinksProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-linear-to-b from-slate-900/70 to-slate-950/80 p-5 shadow-[0_12px_30px_rgba(2,6,23,0.35)] backdrop-blur-sm">
      <Typography
        component="h3"
        className="text-sm! font-bold uppercase tracking-wider text-slate-400"
      >
        Shortcuts
      </Typography>
      <Typography component="p" className="mt-1 text-sm text-slate-500">
        Jump back into the parts of ProMentor you use most.
      </Typography>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {links.map((item) => {
          const Icon = PROFILE_QUICK_LINK_ICONS[item.id];
          return (
            <li key={item.id}>
              <Link
                to={item.to}
                className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/3 p-3 transition hover:border-cyan-400/30 hover:bg-cyan-500/10"
              >
                <Typography
                  component="span"
                  className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-slate-900/80"
                >
                  <Icon
                    className={PROFILE_QUICK_LINK_ICON_CLASSNAME}
                    aria-hidden
                  />
                </Typography>
                <Typography component="span" className="block min-w-0 flex-1">
                  <Typography
                    component="span"
                    className="flex items-center justify-between gap-2"
                  >
                    <Typography
                      component="span"
                      className="text-sm! font-semibold text-white"
                    >
                      {item.label}
                    </Typography>
                    <RiArrowRightUpLine
                      className="shrink-0 text-slate-500 transition group-hover:text-cyan-300"
                      aria-hidden
                    />
                  </Typography>
                  <Typography
                    component="span"
                    className="mt-0.5 block text-xs leading-snug text-slate-400"
                  >
                    {item.description}
                  </Typography>
                </Typography>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
