import type { TeamStatus } from "@/shared/model/types";

export type TeamRow = {
  id: string;
  teamName: string;
  status: TeamStatus;
  membersCount: number;
  memberAvatars: string[];
  memberStackNames: string[];
};

export type TeamMemberOption = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type TeamTableProps = {
  rows: TeamRow[];
  showActions: boolean;
  onEdit: (teamId: string) => void;
  onDelete: (teamId: string) => void;
  deletingTeamId: string | null;
};

export type FieldErrorProps = {
  message?: string;
};
