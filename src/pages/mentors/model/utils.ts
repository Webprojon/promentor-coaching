import type { RequestDraft } from "@/features/send-request-flow/model/types";
import type { RequestStatus } from "@/shared/model/types";

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
