import type { RequestDraft } from "@/features/send-request-flow/model/types";

export function buildTeamJoinMessage(draft: RequestDraft): string {
  const lines = [
    draft.goal.trim() && `Goal: ${draft.goal.trim()}`,
    draft.reason.trim() && `Context: ${draft.reason.trim()}`,
    draft.weeklyAvailability.trim() &&
      `Availability: ${draft.weeklyAvailability.trim()}`,
    draft.note.trim() && `Note: ${draft.note.trim()}`,
  ].filter(Boolean) as string[];
  return lines.length > 0 ? lines.join("\n\n") : "Team join request";
}
