import type {
  RequestDraft,
  WizardStep,
} from "@/features/requests/send-request-flow/model/types";

export const FIRST_WIZARD_STEP: WizardStep = 1;
const LAST_WIZARD_STEP: WizardStep = 3;

export const getNextWizardStep = (step: WizardStep): WizardStep =>
  step < LAST_WIZARD_STEP ? ((step + 1) as WizardStep) : step;

export const getPreviousWizardStep = (step: WizardStep): WizardStep =>
  step > FIRST_WIZARD_STEP ? ((step - 1) as WizardStep) : step;

export const canProceedWizardStep = (step: WizardStep, draft: RequestDraft) =>
  (step === 1 && draft.goal.trim().length > 0) ||
  (step === 2 &&
    draft.reason.trim().length > 0 &&
    draft.weeklyAvailability.trim().length > 0) ||
  step === 3;
