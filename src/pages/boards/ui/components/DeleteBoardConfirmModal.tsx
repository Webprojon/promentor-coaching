import { Modal } from "@/shared/ui";

type DeleteBoardConfirmModalProps = {
  open: boolean;
  boardName: string;
  isDeleting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteBoardConfirmModal({
  open,
  boardName,
  isDeleting = false,
  onCancel,
  onConfirm,
}: DeleteBoardConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="Delete board?"
      primaryAction={{
        label: "Delete",
        onClick: onConfirm,
        variant: "contained",
        color: "error",
        disabled: isDeleting,
      }}
      secondaryAction={{
        label: "Cancel",
        onClick: onCancel,
        variant: "outlined",
        disabled: isDeleting,
      }}
    >
      <p className="text-sm text-slate-300">
        &ldquo;{boardName}&rdquo; will be deleted for everyone. This cannot be
        undone.
      </p>
    </Modal>
  );
}
