import type { useTeamsPage } from "@/pages/teams/model/useTeamsPage";
import type { TeamStatus } from "@/shared/model/types";

export type TeamRow = {
  id: string;
  teamName: string;
  status: TeamStatus;
  membersCount: number;
  memberAvatars: string[];
};

export type TeamMemberOption = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type TeamsPageState = ReturnType<typeof useTeamsPage>;

export type TeamCreatorSectionProps = {
  state: TeamsPageState;
};

export type TeamTableProps = {
  rows: TeamRow[];
};

export type FieldErrorProps = {
  message?: string;
};
