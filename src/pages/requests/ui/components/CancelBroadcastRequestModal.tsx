import { Typography } from "@promentorapp/ui-kit";
import { Modal } from "@/shared/ui";

type CancelBroadcastRequestModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
};

export function CancelBroadcastRequestModal({
  open,
  onClose,
  onConfirm,
  isPending,
}: CancelBroadcastRequestModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Cancel this request?"
      secondaryAction={{
        label: "Keep request",
        variant: "outlined",
        onClick: onClose,
        disabled: isPending,
      }}
      primaryAction={{
        label: isPending ? "Cancelling…" : "Cancel request",
        color: "error",
        onClick: onConfirm,
        disabled: isPending,
      }}
    >
      <Typography component="p" variantStyle="body" className="text-slate-300">
        This will be withdrawn for all recipients. You can send a new request
        later if you change your mind.
      </Typography>
    </Modal>
  );
}
