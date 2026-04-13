import Button, { Avatar, Typography } from "@promentorapp/ui-kit";
import { useState } from "react";
import { MENTOR_SENT_DELIVERED_BADGE_CLASS } from "@/pages/requests/model/constants";
import type {
  RequestSentCardViewModel,
  RequestSuggestionCardViewModel,
} from "@/pages/requests/model/types";
import { RequestViewModal } from "@/pages/requests/ui/components/RequestViewModal";
import { Badge } from "@/shared/ui";

function isSentCardViewModel(
  vm: RequestSentCardViewModel | RequestSuggestionCardViewModel,
): vm is RequestSentCardViewModel {
  return "KindIcon" in vm;
}

type RequestCardProps = {
  viewModel: RequestSentCardViewModel | RequestSuggestionCardViewModel;
  onSentEdit?: () => void;
  onSentDelete?: () => void;
};

export function RequestCard({
  viewModel,
  onSentEdit,
  onSentDelete,
}: RequestCardProps) {
  const [detailOpen, setDetailOpen] = useState(false);

  const {
    cardAccentClass,
    chipClass,
    shortLabel,
    title,
    counterpartName,
    createdLabel,
    summary,
  } = viewModel;

  const avatarUser = isSentCardViewModel(viewModel)
    ? {
        name: viewModel.mentorName,
        avatarUrl: viewModel.mentorAvatarUrl,
      }
    : {
        name: viewModel.counterpartName,
        avatarUrl: viewModel.counterpartAvatarUrl,
      };

  const counterpartRelationLabel = isSentCardViewModel(viewModel)
    ? "To"
    : viewModel.direction === "sent"
      ? "To"
      : "From";

  const handleSentEdit = () => {
    setDetailOpen(false);
    onSentEdit?.();
  };

  const handleSentDelete = () => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Delete this request? This cannot be undone.")
    ) {
      setDetailOpen(false);
      onSentDelete?.();
    }
  };

  return (
    <>
      <article
        className={`flex h-full flex-col rounded-lg border border-white/10 p-4 transition hover:border-white/20 ${cardAccentClass}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <Avatar user={avatarUser} size="md" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {isSentCardViewModel(viewModel) ? (
                  <>
                    <Badge
                      toneClassName={`${chipClass} gap-1 border`}
                      className="inline-flex items-center"
                    >
                      <viewModel.KindIcon className="text-sm" aria-hidden />
                      {shortLabel}
                    </Badge>
                    <Badge toneClassName={MENTOR_SENT_DELIVERED_BADGE_CLASS}>
                      Delivered
                    </Badge>
                  </>
                ) : (
                  <>
                    <Badge
                      toneClassName={`${chipClass} gap-1 border`}
                      className="inline-flex items-center"
                    >
                      <viewModel.CategoryIcon className="text-sm" aria-hidden />
                      {shortLabel}
                    </Badge>
                    <Badge toneClassName={viewModel.statusBadgeClass}>
                      {viewModel.status}
                    </Badge>
                  </>
                )}
              </div>
              <Typography
                component="h3"
                className="mt-2 font-bold leading-snug text-white"
              >
                {title}
              </Typography>
              <Typography component="span" className="text-slate-500 text-sm">
                {counterpartRelationLabel}:
              </Typography>{" "}
              <Typography component="span" className="text-slate-300 text-sm">
                {counterpartName}
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
          className="mt-3 line-clamp-1 text-sm leading-relaxed text-slate-300"
        >
          {summary}
        </Typography>
        <div className="mt-2 flex justify-end">
          <Button
            type="button"
            variant="text"
            onClick={() => setDetailOpen(true)}
            className="min-w-0 px-2 py-1 text-xs font-medium text-slate-400 normal-case hover:bg-white/5 hover:text-slate-200"
            aria-label="View full request"
          >
            More
          </Button>
        </div>
      </article>

      <RequestViewModal
        open={detailOpen}
        viewModel={viewModel}
        onClose={() => setDetailOpen(false)}
        onEditSent={
          isSentCardViewModel(viewModel) ? handleSentEdit : undefined
        }
        onDeleteSent={
          isSentCardViewModel(viewModel) ? handleSentDelete : undefined
        }
      />
    </>
  );
}
