import { FormProvider, type UseFormReturn } from "react-hook-form";
import { SendRequestFlow } from "@/features/requests/send-request-flow/ui/SendRequestFlow";
import type {
  RequestDraft,
  WizardStep,
} from "@/features/requests/send-request-flow/model/types";
import { Modal } from "@/shared/ui";

type SendRequestWizardModalProps = {
  form: UseFormReturn<RequestDraft>;
  open: boolean;
  onClose: () => void;
  wizardStep: WizardStep;
  goNext: () => void;
  goBack: () => void;
  canGoNext: boolean;
  onSubmitRequest: () => void;
  titlePrefix: string;
  isSending: boolean;
};

export function SendRequestWizardModal({
  form,
  open,
  onClose,
  wizardStep,
  goNext,
  goBack,
  canGoNext,
  onSubmitRequest,
  titlePrefix,
  isSending,
}: SendRequestWizardModalProps) {
  return (
    <FormProvider {...form}>
      <Modal
        open={open}
        onClose={onClose}
        title={`${titlePrefix} · Step ${wizardStep}/3`}
        secondaryAction={{
          label: wizardStep === 1 ? "Cancel" : "Back",
          onClick: wizardStep === 1 ? onClose : goBack,
          variant: "outlined",
        }}
        primaryAction={{
          label: wizardStep === 3 ? "Send request" : "Continue",
          onClick: wizardStep === 3 ? onSubmitRequest : goNext,
          variant: "contained",
          disabled: wizardStep === 3 ? !canGoNext || isSending : !canGoNext,
        }}
      >
        <SendRequestFlow step={wizardStep} />
      </Modal>
    </FormProvider>
  );
}
