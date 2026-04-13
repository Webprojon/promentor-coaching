import { Avatar, Button, Typography } from "@promentorapp/ui-kit";
import { REQUEST_CATEGORY_META } from "@/pages/requests/model/constants";
import type { RequestInboxRow } from "@/pages/requests/model/types";
import { REQUEST_STATUS_BADGE_CLASS } from "@/shared/model/constants";
import { Badge } from "@/shared/ui";

type RequestInboxCardProps = {
  row: RequestInboxRow;
};

export function RequestInboxCard({ row }: RequestInboxCardProps) {
  const meta = REQUEST_CATEGORY_META[row.category];
  const CategoryIcon = meta.Icon;
  const showMentorActions =
    row.direction === "received" && row.status === "Pending";
  const relationLabel = row.direction === "sent" ? "To" : "From";

  return (
    <article
      className={`flex h-full flex-col rounded-lg border border-white/10 p-4 transition hover:border-white/20 ${meta.cardAccentClass}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <Avatar
            user={{
              name: row.counterpartName,
              avatarUrl: row.counterpartAvatarUrl,
            }}
            size="md"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                toneClassName={`${meta.chipClass} gap-1 border`}
                className="inline-flex items-center"
              >
                <CategoryIcon className="text-sm" aria-hidden />
                {meta.shortLabel}
              </Badge>
              <Badge toneClassName={REQUEST_STATUS_BADGE_CLASS[row.status]}>
                {row.status}
              </Badge>
            </div>
            <Typography
              component="h3"
              className="mt-2 font-bold leading-snug text-white"
            >
              {row.title}
            </Typography>
            <Typography component="p" className="mt-1 text-xs text-slate-400">
              <Typography component="span" className="text-slate-500">
                {relationLabel}:
              </Typography>{" "}
              <Typography component="span" className="text-slate-300">
                {row.counterpartName}
              </Typography>
              {" · "}
              <Typography component="span" className="text-slate-500">
                {row.targetLabel}
              </Typography>
            </Typography>
          </div>
        </div>
        <Typography
          component="span"
          className="shrink-0 text-xs font-medium text-slate-500"
        >
          {row.createdLabel}
        </Typography>
      </div>

      <Typography
        component="p"
        className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-300"
      >
        {row.summary}
      </Typography>

      {showMentorActions && (
        <div className="mt-4 flex flex-wrap justify-end gap-2 border-t border-white/10 pt-4">
          <Button type="button" variant="outlined" color="error">
            Decline
          </Button>
          <Button type="button" variant="contained" color="success">
            Accept
          </Button>
        </div>
      )}
    </article>
  );
}
