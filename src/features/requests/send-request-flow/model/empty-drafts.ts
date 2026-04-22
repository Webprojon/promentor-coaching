import type { RequestDraft } from "@/features/requests/send-request-flow/model/types";

export function createEmptyMentorRequestDraft(): RequestDraft {
  return {
    targetType: "mentor",
    targetId: "",
    targetName: "",
    goal: "",
    reason: "",
    weeklyAvailability: "",
    note: "",
  };
}

export function createEmptyTeamJoinRequestDraft(): RequestDraft {
  return {
    targetType: "team",
    targetId: "",
    targetName: "",
    goal: "",
    reason: "",
    weeklyAvailability: "",
    note: "",
  };
}
