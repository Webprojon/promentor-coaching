import { Avatar, Typography } from "@promentorapp/ui-kit";
import {
  MENTOR_SENT_DELIVERED_BADGE_CLASS,
  MENTOR_SENT_KIND_META,
} from "@/pages/requests/model/constants";
import type {
  RequestSentCardViewModel,
  RequestSuggestionCardViewModel,
} from "@/pages/requests/model/types";
import { Badge, Modal } from "@/shared/ui";

function isSentViewModel(
  vm: RequestSentCardViewModel | RequestSuggestionCardViewModel,
): vm is RequestSentCardViewModel {
  return "KindIcon" in vm;
}

type RequestViewModalProps = {
  open: boolean;
  onClose: () => void;
  viewModel: RequestSentCardViewModel | RequestSuggestionCardViewModel | null;
  onDecline?: () => void;
  onAccept?: () => void;
};

export function RequestViewModal({
  open,
  onClose,
  viewModel,
  onDecline,
  onAccept,
}: RequestViewModalProps) {
  if (!viewModel) {
    return null;
  }

  const closeAction = {
    label: "Close",
    onClick: onClose,
    variant: "outlined" as const,
  };

  if (isSentViewModel(viewModel)) {
    const {
      cardAccentClass,
      chipClass,
      shortLabel,
      KindIcon,
      targetKind,
      mentorName,
      mentorAvatarUrl,
      title,
      counterpartName,
      targetLabel,
      createdLabel,
      summary,
    } = viewModel;

    const kindLabel = MENTOR_SENT_KIND_META[targetKind].label;

    return (
      <Modal
        open={open}
        onClose={onClose}
        title={title}
        secondaryAction={closeAction}
      >
        <div className="max-h-[min(70vh,560px)] overflow-y-auto pr-1">
          <div
            className={`rounded-lg border border-white/10 p-4 ${cardAccentClass}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <Avatar
                  user={{
                    name: mentorName,
                    avatarUrl: mentorAvatarUrl,
                  }}
                  size="md"
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      toneClassName={`${chipClass} gap-1 border`}
                      className="inline-flex items-center"
                    >
                      <KindIcon className="text-sm" aria-hidden />
                      {shortLabel}
                    </Badge>
                    <Badge toneClassName={MENTOR_SENT_DELIVERED_BADGE_CLASS}>
                      Delivered
                    </Badge>
                  </div>
                  <Typography
                    component="p"
                    className="mt-2 text-xs text-slate-500"
                  >
                    Sent by{" "}
                    <Typography component="span" className="text-slate-300">
                      {mentorName}
                    </Typography>
                    {" · "}
                    <Typography component="span" className="text-slate-500">
                      {kindLabel}
                    </Typography>
                  </Typography>
                  <Typography
                    component="p"
                    className="mt-3 text-xs text-slate-400"
                  >
                    <Typography component="span" className="text-slate-500">
                      To:
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

            <div className="mt-4 border-t border-white/10 pt-4">
              <Typography
                component="p"
                variantStyle="label"
                className="pm-text-secondary"
              >
                Message
              </Typography>
              <Typography
                component="p"
                className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-300"
              >
                {summary}
              </Typography>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  const {
    cardAccentClass,
    chipClass,
    shortLabel,
    CategoryIcon,
    direction,
    counterpartName,
    counterpartAvatarUrl,
    title,
    targetLabel,
    createdLabel,
    summary,
    status,
    statusBadgeClass,
  } = viewModel;

  const relationLabel = direction === "sent" ? "To" : "From";
  const showMentorActions =
    direction === "received" && status === "Pending";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      secondaryAction={
        showMentorActions
          ? {
              label: "Decline",
              onClick: () => {
                onDecline?.();
                onClose();
              },
              variant: "outlined",
              color: "error",
            }
          : closeAction
      }
      primaryAction={
        showMentorActions
          ? {
              label: "Accept",
              onClick: () => {
                onAccept?.();
                onClose();
              },
              variant: "contained",
              color: "success",
            }
          : undefined
      }
    >
      <div className="max-h-[min(70vh,560px)] overflow-y-auto pr-1">
        <div
          className={`rounded-lg border border-white/10 p-4 ${cardAccentClass}`}
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
                  component="p"
                  className="mt-3 text-xs text-slate-400"
                >
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

          <div className="mt-4 border-t border-white/10 pt-4">
            <Typography
              component="p"
              variantStyle="label"
              className="pm-text-secondary"
            >
              Message
            </Typography>
            <Typography
              component="p"
              className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-300"
            >
              {summary}
            </Typography>
          </div>
        </div>
      </div>
    </Modal>
  );
}
