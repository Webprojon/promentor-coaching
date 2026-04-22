import type { CoachingTeamListItem } from "@/entities/team/model/team.types";
import type { JoinedTeam } from "@/pages/suggestion/model/types";

export function mapListItemToJoinedTeam(
  item: CoachingTeamListItem,
): JoinedTeam {
  const membersLabel =
    item.memberFirstNames.length > 0
      ? item.memberFirstNames.join(", ")
      : "—";
  return {
    id: item.id,
    name: item.name,
    membersCount: item.membersCount,
    membersLabel,
  };
}
