import type { ExploreJoinUiApi } from "@/entities/team/model/team.types";
import type { TeamStatus } from "@/shared/model/types";

export type ExploreTeam = {
  id: string;
  teamName: string;
  status: TeamStatus;
  membersCount: number;
  memberAvatars: (string | null)[];
  joinUi: ExploreJoinUiApi;
};

export type ExploreTeamTableProps = {
  rows: ExploreTeam[];
  onRequestClick: (id: string) => void;
  isSendingJoin?: boolean;
};
