import type { RequestDraft } from "@/features/send-request-flow/model/types";
import type { RequestStatus } from "@/shared/model/types";
export {
  FIRST_WIZARD_STEP,
  canProceedWizardStep,
  getNextWizardStep,
  getPreviousWizardStep,
} from "@/features/send-request-flow/model/utils";

export const createEmptyMentorDraft = (): RequestDraft => ({
  targetType: "mentor",
  targetId: "",
  targetName: "",
  goal: "",
  reason: "",
  weeklyAvailability: "",
  note: "",
});

export const getMentorActionStatus = (status: RequestStatus): RequestStatus =>
  status === "Pending" || status === "Accepted" ? "Declined" : "Pending";
