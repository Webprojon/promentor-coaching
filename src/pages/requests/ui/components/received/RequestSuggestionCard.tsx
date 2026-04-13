import { Avatar, Button, Typography } from "@promentorapp/ui-kit";
import type { RequestSuggestionCardViewModel } from "@/pages/requests/model/types";
import { Badge } from "@/shared/ui";

type RequestSuggestionCardProps = {
  viewModel: RequestSuggestionCardViewModel;
};

export function RequestSuggestionCard({ viewModel }: RequestSuggestionCardProps) {
  const {
    cardAccentClass,
    chipClass,
    shortLabel,
    CategoryIcon,
    showMentorActions,
    relationLabel,
    counterpartName,
    counterpartAvatarUrl,
    title,
    targetLabel,
    createdLabel,
    summary,
    status,
    statusBadgeClass,
  } = viewModel;

  return (
    <article
      className={`flex h-full flex-col rounded-lg border border-white/10 p-4 transition hover:border-white/20 ${cardAccentClass}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <Avatar
            user={{
              name: counterpartName,
              avatarUrl: counterpartAvatarUrl,
            }}
            size="md"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                toneClassName={`${chipClass} gap-1 border`}
                className="inline-flex items-center"
              >
                <CategoryIcon className="text-sm" aria-hidden />
                {shortLabel}
              </Badge>
              <Badge toneClassName={statusBadgeClass}>{status}</Badge>
            </div>
            <Typography
              component="h3"
              className="mt-2 font-bold leading-snug text-white"
            >
              {title}
            </Typography>
            <Typography component="p" className="mt-1 text-xs text-slate-400">
              <Typography component="span" className="text-slate-500">
                {relationLabel}:
              </Typography>{" "}
              <Typography component="span" className="text-slate-300">
                {counterpartName}
              </Typography>
              {" · "}
              <Typography component="span" className="text-slate-500">
                {targetLabel}
              </Typography>
            </Typography>
          </div>
        </div>
        <Typography
          component="span"
          className="shrink-0 text-xs font-medium text-slate-500"
        >
          {createdLabel}
        </Typography>
      </div>

      <Typography
        component="p"
        className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-300"
      >
        {summary}
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
