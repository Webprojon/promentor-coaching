import { Avatar, Typography } from "@promentorapp/ui-kit";
import {
  MENTOR_SENT_DELIVERED_BADGE_CLASS,
  MENTOR_SENT_KIND_META,
  MOCK_CURRENT_MENTOR_SENDER,
} from "@/pages/requests/model/constants";
import type { MentorSentRequestRow } from "@/pages/requests/model/types";
import { Badge } from "@/shared/ui";

type MentorSentRequestCardProps = {
  row: MentorSentRequestRow;
};

export function MentorSentRequestCard({ row }: MentorSentRequestCardProps) {
  const meta = MENTOR_SENT_KIND_META[row.targetKind];
  const KindIcon = meta.Icon;

  return (
    <article
      className={`flex h-full flex-col rounded-lg border border-white/10 p-4 transition hover:border-white/20 ${meta.cardAccentClass}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <Avatar
            user={{
              name: MOCK_CURRENT_MENTOR_SENDER.name,
              avatarUrl: MOCK_CURRENT_MENTOR_SENDER.avatarUrl,
            }}
            size="md"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                toneClassName={`${meta.chipClass} gap-1 border`}
                className="inline-flex items-center"
              >
                <KindIcon className="text-sm" aria-hidden />
                {meta.shortLabel}
              </Badge>
              <Badge toneClassName={MENTOR_SENT_DELIVERED_BADGE_CLASS}>
                Delivered
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
                To:
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
    </article>
  );
}
