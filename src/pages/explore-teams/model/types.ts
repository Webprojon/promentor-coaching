import type { RequestStatus, TeamStatus } from "../../../shared/model/types";

export type ExploreVisibility = "Open" | "Limited";

export type ExploreTeam = {
  id: string;
  teamName: string;
  visibility: ExploreVisibility;
  status: TeamStatus;
  membersCount: number;
  memberAvatars: string[];
  requestStatus: RequestStatus;
};

export type ExploreTeamTableProps = {
  rows: ExploreTeam[];
  onRequestClick: (id: string) => void;
};
