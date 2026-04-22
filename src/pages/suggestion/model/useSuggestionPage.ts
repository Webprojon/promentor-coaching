import { useState } from "react";
import { useTeamsListQuery } from "@/entities/team/hooks/use-team-queries";
import { useHostAuthSession } from "@/features/auth/model/useHostAuthSession";
import { mapListItemToJoinedTeam } from "@/pages/suggestion/model/mapJoinedTeamFromApi";
import { firstMemberName, resolveActiveTeam } from "@/pages/suggestion/model/resolveActiveTeam";
import type {
  SuggestionDraft,
  SuggestionHistoryItem,
  SuggestionPriority,
} from "@/pages/suggestion/model/types";

function createEmptyFields(): {
  title: string;
  detail: string;
  priority: SuggestionPriority;
} {
  return { title: "", detail: "", priority: "Medium" };
}

export function useSuggestionPage() {
  const { session, isHydrating } = useHostAuthSession();
  const authed = session.isAuthenticated;

  const teamsQuery = useTeamsListQuery(!isHydrating && authed);
  const joinedTeams = (teamsQuery.data ?? []).map(mapListItemToJoinedTeam);

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [fields, setFields] = useState(createEmptyFields);

  const activeTeam = resolveActiveTeam(joinedTeams, selectedTeamId);

  const draft: SuggestionDraft = !activeTeam
    ? {
        teamId: "",
        teamName: "",
        title: fields.title,
        detail: fields.detail,
        priority: fields.priority,
        mentorTarget: "",
      }
    : {
        teamId: activeTeam.id,
        teamName: activeTeam.name,
        title: fields.title,
        detail: fields.detail,
        priority: fields.priority,
        mentorTarget: firstMemberName(activeTeam),
      };

  const onTeamChange = (teamId: string) => {
    setSelectedTeamId(teamId);
  };

  const onDraftChange = (key: keyof SuggestionDraft, value: string) => {
    if (key === "title") {
      setFields((prev) => ({ ...prev, title: value }));
      return;
    }
    if (key === "detail") {
      setFields((prev) => ({ ...prev, detail: value }));
      return;
    }
    if (key === "priority") {
      setFields((prev) => ({
        ...prev,
        priority: value as SuggestionPriority,
      }));
    }
  };

  const onSend = () => {
    setFields(createEmptyFields());
  };

  const priorities: SuggestionPriority[] = ["High", "Medium", "Low"];

  const canSend =
    activeTeam !== null &&
    fields.title.trim().length > 0 &&
    fields.detail.trim().length > 0;

  const history: SuggestionHistoryItem[] = [];

  return {
    joinedTeams,
    isTeamsLoading: teamsQuery.isPending,
    selectedTeam: activeTeam ?? undefined,
    selectedTeamId: activeTeam?.id ?? "",
    draft,
    history,
    priorities,
    onTeamChange,
    onDraftChange,
    canSend,
    onSend,
  };
}
