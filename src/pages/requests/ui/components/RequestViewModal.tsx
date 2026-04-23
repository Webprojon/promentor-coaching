import type { ReactNode } from "react";
import { Avatar, Typography } from "@promentorapp/ui-kit";
import {
  MENTOR_SENT_DELIVERED_BADGE_CLASS,
  mentorSentRequestViewModalFooterActions,
} from "@/pages/requests/model/constants";
import {
  SUGGESTION_PRIORITY_API_BADGE,
  SUGGESTION_PRIORITY_API_LABEL,
} from "@/shared/model/constants";
import type { SuggestionPriorityApi } from "@/entities/suggestion/model/suggestion.types";
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

type RequestViewModalCardProps = {
  cardAccentClass: string;
  avatar: { name: string; avatarUrl?: string | null };
  badges: ReactNode;
  relationLabel: string;
  counterpartName: string;
  createdLabel: string;
  summary: string;
  priorityLevel?: SuggestionPriorityApi;
};

function RequestViewModalCard({
  cardAccentClass,
  avatar,
  badges,
  relationLabel,
  counterpartName,
  createdLabel,
  summary,
  priorityLevel,
}: RequestViewModalCardProps) {
  return (
    <div className="max-h-[min(70vh,560px)] overflow-y-auto pr-1">
      <div
        className={`rounded-lg border border-white/10 p-4 ${cardAccentClass}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <Avatar user={avatar} size="md" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">{badges}</div>

              <div className="mt-2 flex items-center gap-1">
                <Typography component="span" className="text-xs text-slate-500">
                  {relationLabel}
                </Typography>
                <Typography
                  component="span"
                  className="text-xs font-bold text-slate-300"
                >
                  {counterpartName}
                </Typography>
              </div>
            </div>
          </div>

          <Typography
            component="span"
            className="shrink-0 text-xs font-medium text-slate-500"
          >
            {createdLabel}
          </Typography>
        </div>

        {priorityLevel ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Typography
              component="p"
              variantStyle="label"
              className="pm-text-secondary"
            >
              Priority
            </Typography>
            <Badge toneClassName={SUGGESTION_PRIORITY_API_BADGE[priorityLevel]}>
              {SUGGESTION_PRIORITY_API_LABEL[priorityLevel]}
            </Badge>
          </div>
        ) : null}

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
  );
}

type RequestViewModalProps = {
  open: boolean;
  onClose: () => void;
  viewModel: RequestSentCardViewModel | RequestSuggestionCardViewModel | null;
  onDecline?: () => void;
  onAccept?: () => void;
  onEditSent?: () => void;
  onDeleteSent?: () => void;
};

export function RequestViewModal({
  open,
  onClose,
  viewModel,
  onDecline,
  onAccept,
  onEditSent,
  onDeleteSent,
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
      mentorName,
      mentorAvatarUrl,
      title,
      counterpartName,
      createdLabel,
      summary,
    } = viewModel;

    return (
      <Modal
        open={open}
        onClose={onClose}
        title={title}
        footerActions={mentorSentRequestViewModalFooterActions({
          onClose,
          onEditSent,
          onDeleteSent,
        })}
      >
        <RequestViewModalCard
          cardAccentClass={cardAccentClass}
          avatar={{ name: mentorName, avatarUrl: mentorAvatarUrl }}
          relationLabel="To"
          counterpartName={counterpartName}
          createdLabel={createdLabel}
          summary={summary}
          badges={
            <>
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
            </>
          }
        />
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
    createdLabel,
    summary,
    status,
    statusBadgeClass,
    priorityLevel,
  } = viewModel;

  const relationLabel = direction === "sent" ? "To" : "From";
  const showMentorActions =
    direction === "received" &&
    status === "Pending" &&
    typeof onAccept === "function" &&
    typeof onDecline === "function";

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
                void (async () => {
                  await onDecline?.();
                  onClose();
                })();
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
                void (async () => {
                  await onAccept?.();
                  onClose();
                })();
              },
              variant: "contained",
              color: "success",
            }
          : undefined
      }
    >
      <RequestViewModalCard
        cardAccentClass={cardAccentClass}
        avatar={{
          name: counterpartName,
          avatarUrl: counterpartAvatarUrl,
        }}
        relationLabel={relationLabel}
        counterpartName={counterpartName}
        createdLabel={createdLabel}
        summary={summary}
        priorityLevel={priorityLevel}
        badges={
          <>
            <Badge
              toneClassName={`${chipClass} gap-1 border`}
              className="inline-flex items-center"
            >
              <CategoryIcon className="text-sm" aria-hidden />
              {shortLabel}
            </Badge>
            <Badge toneClassName={statusBadgeClass}>{status}</Badge>
          </>
        }
      />
    </Modal>
  );
}
