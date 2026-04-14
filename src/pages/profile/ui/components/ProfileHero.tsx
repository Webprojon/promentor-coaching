import { Avatar, Button, Typography } from "@promentorapp/ui-kit";
import {
  RiCalendarScheduleLine,
  RiEdit2Line,
} from "react-icons/ri";
import { Badge } from "@/shared/ui";
import type { ProfileHeroProps } from "@/pages/profile/model/types";
 
export function ProfileHero({ header, onOpenPhotoModal }: ProfileHeroProps) {
  const { name, role, tagline, avatarUrl, memberSince } = header;

  return (
    <section className="relative overflow-hidden rounded-lg border border-white/10 bg-linear-to-br from-cyan-500/15 via-slate-900/80 to-indigo-500/12 shadow-[0_12px_40px_rgba(2,6,23,0.45)] backdrop-blur-sm p-4">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"
        aria-hidden
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-cyan-400/40 to-indigo-500/30 blur-md" />
            <Avatar user={{ name, avatarUrl }} size="md" />
          </div>
          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Typography
                component="h2"
                className="font-bold tracking-tight text-white sm:text-2xl"
              >
                {name}
              </Typography>
              <Badge toneClassName="border border-cyan-400/35 bg-cyan-500/15 text-cyan-100">
                {role}
              </Badge>
            </div>
            <Typography
              component="p"
              className="max-w-xl text-base text-slate-200 sm:text-lg"
            >
              {tagline}
            </Typography>
            
              <Typography
                component="span"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400"
              >
                <RiCalendarScheduleLine
                  className="shrink-0 text-cyan-300/80"
                  aria-hidden
                />
                Member since {memberSince}
              </Typography>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
          <Button
            type="button"
            variant="outlined"
            className="gap-2"
            onClick={onOpenPhotoModal}
          >
            <RiEdit2Line className="text-lg" aria-hidden />
            Change Photo
          </Button>
        </div>
      </div>
    </section>
  );
}
