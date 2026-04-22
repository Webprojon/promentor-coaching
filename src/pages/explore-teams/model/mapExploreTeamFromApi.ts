import type { ExploreTeamListItem } from "@/entities/teams/model/team.types";
import type { ExploreTeam } from "@/pages/explore-teams/model/types";

export function mapExploreTeamFromApi(row: ExploreTeamListItem): ExploreTeam {
  const joinUi: ExploreTeam["joinUi"] =
    row.joinUi === "hidden" ? "ineligible" : row.joinUi;

  return {
    id: row.id,
    teamName: row.name,
    status: row.status === "ACTIVE" ? "Active" : "Pending",
    membersCount: row.membersCount,
    memberAvatars: row.memberAvatarUrls,
    joinUi,
  };
}
