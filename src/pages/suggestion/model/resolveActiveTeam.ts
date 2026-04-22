import type { JoinedTeam } from "@/pages/suggestion/model/types";

export function resolveActiveTeam(
  teams: readonly JoinedTeam[],
  selectedId: string | null,
): JoinedTeam | null {
  if (teams.length === 0) {
    return null;
  }
  if (selectedId) {
    const found = teams.find((t) => t.id === selectedId);
    if (found) {
      return found;
    }
  }
  return teams[0] ?? null;
}

export function firstMemberName(team: JoinedTeam): string {
  return team.membersLabel.split(", ")[0]?.trim() ?? "";
}
