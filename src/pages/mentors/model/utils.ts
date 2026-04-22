import type { RequestDraft } from "@/features/send-request-flow/model/types";

export const createEmptyMentorDraft = (): RequestDraft => ({
  targetType: "mentor",
  targetId: "",
  targetName: "",
  goal: "",
  reason: "",
  weeklyAvailability: "",
  note: "",
});
