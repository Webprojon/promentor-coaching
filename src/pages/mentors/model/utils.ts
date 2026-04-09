import type { RequestDraft, RequestStatus } from "../../../shared/model/types";
import type { WizardStep } from "./types";

export const FIRST_WIZARD_STEP: WizardStep = 1;
export const LAST_WIZARD_STEP: WizardStep = 3;

export const createEmptyMentorDraft = (): RequestDraft => ({
  targetType: "mentor",
  targetId: "",
  targetName: "",
  goal: "",
  reason: "",
  weeklyAvailability: "",
  note: "",
});

export const getNextWizardStep = (step: WizardStep): WizardStep =>
  step < LAST_WIZARD_STEP ? ((step + 1) as WizardStep) : step;

export const getPreviousWizardStep = (step: WizardStep): WizardStep =>
  step > FIRST_WIZARD_STEP ? ((step - 1) as WizardStep) : step;

export const canProceedWizardStep = (step: WizardStep, draft: RequestDraft) =>
  (step === 1 && draft.goal.trim().length > 0) ||
  (step === 2 && draft.reason.trim().length > 0 && draft.weeklyAvailability.trim().length > 0) ||
  step === 3;

export const getMentorActionStatus = (status: RequestStatus): RequestStatus =>
  status === "Pending" || status === "Accepted" ? "Declined" : "Pending";
