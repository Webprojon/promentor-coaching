import { useCallback, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import type {
  RequestDraft,
  WizardStep,
} from "@/features/requests/send-request-flow/model/types";
import {
  canProceedWizardStep,
  FIRST_WIZARD_STEP,
  getNextWizardStep,
  getPreviousWizardStep,
} from "@/features/requests/send-request-flow/model/utils";

export function useSendRequestWizardState(
  createEmptyDraft: () => RequestDraft,
) {
  const requestWizardForm = useForm<RequestDraft>({
    defaultValues: createEmptyDraft(),
    mode: "onChange",
  });
  const { control, reset } = requestWizardForm;

  const [wizardStep, setWizardStep] = useState<WizardStep>(FIRST_WIZARD_STEP);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const draft = useWatch({
    control,
    defaultValue: createEmptyDraft(),
  }) as RequestDraft;

  const closeWizard = useCallback(() => {
    setIsWizardOpen(false);
    setWizardStep(FIRST_WIZARD_STEP);
    reset(createEmptyDraft());
  }, [createEmptyDraft, reset]);

  const prepareAndOpen = useCallback(
    (patch: Partial<RequestDraft>) => {
      reset({ ...createEmptyDraft(), ...patch });
      setWizardStep(FIRST_WIZARD_STEP);
      setIsWizardOpen(true);
    },
    [createEmptyDraft, reset],
  );

  const goNext = () => setWizardStep((previous) => getNextWizardStep(previous));
  const goBack = () =>
    setWizardStep((previous) => getPreviousWizardStep(previous));
  const canGoNext = canProceedWizardStep(wizardStep, draft);

  return {
    requestWizardForm,
    wizardStep,
    isWizardOpen,
    draft,
    prepareAndOpen,
    closeWizard,
    goNext,
    goBack,
    canGoNext,
  };
}
