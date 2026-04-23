import { Typography } from "@promentorapp/ui-kit";
import { Modal } from "@/shared/ui";

type DeleteTeamModalProps = {
  open: boolean;
  teamName: string;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
};

export function DeleteTeamModal({
  open,
  teamName,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteTeamModalProps) {
  const label =
    teamName.trim().length > 0 ? `“${teamName.trim()}”` : "this team";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete team?"
      secondaryAction={{
        label: "Cancel",
        variant: "outlined",
        onClick: onClose,
        disabled: isDeleting,
      }}
      primaryAction={{
        label: isDeleting ? "Deleting…" : "Delete",
        color: "error",
        onClick: onConfirm,
        disabled: isDeleting,
      }}
    >
      <Typography component="p" variantStyle="body" className="text-slate-300">
        Delete {label}? This cannot be undone.
      </Typography>
    </Modal>
  );
}
