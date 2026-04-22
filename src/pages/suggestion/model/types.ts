export type SuggestionPriority = "High" | "Medium" | "Low";
export type SuggestionStatus = "Sent" | "Accepted" | "Not Accepted";

export type SuggestionDraft = {
  teamId: string;
  teamName: string;
  title: string;
  detail: string;
  priority: SuggestionPriority;
  mentorTarget: string;
};

export type JoinedTeam = {
  id: string;
  name: string;
  membersCount: number;
  membersLabel: string;
};

export type SuggestionHistoryItem = {
  id: string;
  teamId: string;
  title: string;
  detail: string;
  priority: SuggestionPriority;
  status: SuggestionStatus;
};

export type JoinedTeamsPanelProps = {
  joinedTeams: JoinedTeam[];
  isTeamsLoading?: boolean;
  selectedTeamId: string;
  selectedTeam?: JoinedTeam;
  onTeamChange: (teamId: string) => void;
};

export type SuggestionComposerProps = {
  draft: SuggestionDraft;
  priorities: SuggestionPriority[];
  canSend: boolean;
  onDraftChange: (field: keyof SuggestionDraft, value: string) => void;
  onSend: () => void;
};

export type SuggestionHistoryProps = {
  history: SuggestionHistoryItem[];
};
