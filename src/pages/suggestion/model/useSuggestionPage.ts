import { useMemo, useState } from "react";
import type { SuggestionDraft, SuggestionPriority } from "./types";
import { joinedTeams, suggestionHistory } from "./constants";

const DEFAULT_TEAM = joinedTeams[0];

const EMPTY_DRAFT: SuggestionDraft = {
  teamId: DEFAULT_TEAM?.id ?? "",
  teamName: DEFAULT_TEAM?.name ?? "",
  title: "",
  detail: "",
  priority: "Medium",
  mentorTarget: "",
};

export function useSuggestionPage() {
  const [selectedTeamId, setSelectedTeamId] = useState<string>(DEFAULT_TEAM?.id ?? "");
  const [draft, setDraft] = useState<SuggestionDraft>(EMPTY_DRAFT);

  const selectedTeam = useMemo(
    () => joinedTeams.find((team) => team.id === selectedTeamId) ?? joinedTeams[0],
    [selectedTeamId],
  );

  const history = useMemo(
    () => suggestionHistory.filter((item) => item.teamId === selectedTeam?.id),
    [selectedTeam],
  );

  const onTeamChange = (teamId: string) => {
    const nextTeam = joinedTeams.find((team) => team.id === teamId);
    if (!nextTeam) return;
    setSelectedTeamId(nextTeam.id);
    setDraft((previous) => ({
      ...previous,
      teamId: nextTeam.id,
      teamName: nextTeam.name,
      mentorTarget: nextTeam.mentors[0] ?? "",
    }));
  };

  const onDraftChange = (field: keyof SuggestionDraft, value: string) => {
    setDraft((previous) => ({ ...previous, [field]: value }));
  };

  const priorities: SuggestionPriority[] = ["High", "Medium", "Low"];

  const canSend = draft.title.trim().length > 0 && draft.detail.trim().length > 0;

  const onSend = () => {
    setDraft((previous) => ({
      ...previous,
      title: "",
      detail: "",
      priority: "Medium",
    }));
  };

  return {
    joinedTeams,
    selectedTeam,
    selectedTeamId,
    draft,
    history,
    priorities,
    onTeamChange,
    onDraftChange,
    canSend,
    onSend,
  };
}

