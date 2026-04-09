import { Button, Typography } from "@promentorapp/ui-kit";
import { REQUEST_STATUS_BADGE_CLASS } from "@/shared/model/constants";
import { ACTION_BUTTON_PROPS_BY_STATUS, ACTION_LABEL_BY_STATUS } from "@/pages/mentors/model/constants";
import type { MentorCardProps } from "@/pages/mentors/model/types";
import { Badge } from "@/shared/ui";

export function MentorCard({ mentor, onActionClick }: MentorCardProps) {
  const actionButtonProps = ACTION_BUTTON_PROPS_BY_STATUS[mentor.requestStatus];

  return (
    <article className="flex h-full flex-col rounded-lg border border-white/10 bg-linear-to-br from-cyan-500/10 via-slate-900/70 to-indigo-500/10 p-4 shadow-[0_12px_30px_rgba(2,6,23,0.35)] backdrop-blur-sm transition hover:border-cyan-300/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <img
            src={mentor.avatarUrl}
            alt={mentor.name}
            className="h-12 w-12 shrink-0 rounded-full border border-white/20 object-cover"
          />
          <div className="min-w-0">
            <Typography component="h2" className="truncate text-base! font-bold text-white">
              {mentor.name}
            </Typography>
            <Typography component="p" className="mt-1 text-sm text-slate-300">
              {mentor.expertise} coaching
            </Typography>
            <Typography component="p" className="mt-1 text-xs text-cyan-200/80">
              Availability: {mentor.availability}
            </Typography>
          </div>
        </div>
        {mentor.requestStatus !== "NotRequested" ? (
          <Badge toneClassName={REQUEST_STATUS_BADGE_CLASS[mentor.requestStatus]}>
            {mentor.requestStatus}
          </Badge>
        ) : null}
      </div>

      <div className="mt-4 space-y-1">
        <Typography component="p" className="text-sm text-slate-200">
          {mentor.sessions} sessions this week
        </Typography>
        <Typography component="p" className="line-clamp-2 text-sm text-slate-300">
          Linked teams: {mentor.linkedTeams.join(", ")}
        </Typography>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          variant={actionButtonProps.variant}
          color={actionButtonProps.color}
          onClick={() => onActionClick(mentor.id)}
        >
          {ACTION_LABEL_BY_STATUS[mentor.requestStatus]}
        </Button>
      </div>
    </article>
  );
}

