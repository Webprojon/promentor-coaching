import { Typography } from "@promentorapp/ui-kit";
import { RiAlarmWarningLine } from "react-icons/ri";
import { PROFILE_DELETE_ACCOUNT_CONSEQUENCES } from "@/pages/profile/model/constants";
import type { ProfileDeleteAccountModalProps } from "@/pages/profile/model/types";
import { Modal } from "@/shared/ui";

export function ProfileDeleteAccountModal({
  open,
  onClose,
  onConfirm,
  isDeleting,
}: ProfileDeleteAccountModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete your account?"
      secondaryAction={{
        label: "Cancel",
        variant: "text",
        onClick: onClose,
        disabled: isDeleting,
      }}
      primaryAction={{
        label: isDeleting ? "Deleting…" : "Delete account",
        color: "error",
        onClick: onConfirm,
        disabled: isDeleting,
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 rounded-lg border border-rose-500/35 bg-rose-500/10 p-4">
          <RiAlarmWarningLine
            className="mt-0.5 shrink-0 text-xl text-rose-200"
            aria-hidden
          />
          <Typography
            component="p"
            className="text-sm leading-relaxed text-rose-50/95"
          >
            You are about to permanently delete your ProMentor account. If you
            are sure, continue below.
          </Typography>
        </div>
        <Typography
          component="p"
          className="text-sm font-medium text-slate-200"
        >
          What happens next
        </Typography>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-slate-400">
          {PROFILE_DELETE_ACCOUNT_CONSEQUENCES.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
