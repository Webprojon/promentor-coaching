import type { CoachingTeamListItem } from "@/entities/teams/model/team.types";

export type ExploreJoinUiApi =
  | "send_request"
  | "pending"
  | "joined"
  | "declined"
  | "your_team"
  | "ineligible"
  | "hidden";

export type ExploreTeamListItem = CoachingTeamListItem & {
  joinUi: ExploreJoinUiApi;
};
