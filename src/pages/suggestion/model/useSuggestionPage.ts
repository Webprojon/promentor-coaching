import { useState } from "react";
import { useTeamsListQuery } from "@/entities/teams/hooks/use-team-queries";
import {
  useBoardTargetsForSuggestionQuery,
  useCreateUserSuggestionMutation,
  useDeleteUserSuggestionMutation,
  useMentorTargetsForSuggestionQuery,
  useMyUserSuggestionsQuery,
  useUpdateUserSuggestionMutation,
} from "@/entities/suggestion/hooks/use-suggestion-queries";
import type { UserSuggestionSent } from "@/entities/suggestion/model/suggestion.types";
import { useHostAuthSession } from "@/features/auth/model/useHostAuthSession";
import {
  SUGGESTION_PRIORITIES_UI,
  suggestionPriorityFromApi,
  suggestionPriorityToApi,
} from "@/pages/suggestion/model/suggestionPriority";
import type {
  SuggestionComposerFields,
  SuggestionHistoryItemVm,
  SuggestionPriority,
} from "@/pages/suggestion/model/types";

function emptyFields(): SuggestionComposerFields {
  return { title: "", detail: "", priority: "Medium" };
}

function targetLabelFromSent(row: UserSuggestionSent): string {
  if (row.scope === "TEAM") {
    return row.teamName ? `Team · ${row.teamName}` : "Team";
  }
  if (row.scope === "MENTOR") {
    return row.targetMentorName
      ? `Mentor · ${row.targetMentorName}`
      : "Mentor";
  }
  return row.boardName ? `Board · ${row.boardName}` : "Board";
}

const MULTI_TARGET_ERROR =
  "Please select only one target: a team, a mentor, or a board.";

export function useSuggestionPage() {
  const { session, isHydrating } = useHostAuthSession();
  const authed = session.isAuthenticated;

  const enabled = !isHydrating && authed;

  const teamsQuery = useTeamsListQuery(enabled);
  const mentorTargetsQuery = useMentorTargetsForSuggestionQuery(enabled);
  const boardTargetsQuery = useBoardTargetsForSuggestionQuery(enabled);
  const mySuggestionsQuery = useMyUserSuggestionsQuery(enabled);

  const createMutation = useCreateUserSuggestionMutation();
  const updateMutation = useUpdateUserSuggestionMutation();
  const deleteMutation = useDeleteUserSuggestionMutation();

  const [teamId, setTeamId] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [boardId, setBoardId] = useState("");
  const [fields, setFields] = useState(emptyFields);
  const [editingId, setEditingId] = useState<string | null>(null);

  const teams = (teamsQuery.data ?? []).map((t) => ({
    id: t.id,
    label: t.name,
  }));
  const mentors = (mentorTargetsQuery.data ?? []).map((m) => ({
    id: m.id,
    label: m.label,
  }));
  const boards = (boardTargetsQuery.data ?? []).map((b) => ({
    id: b.id,
    label: b.name,
  }));

  const isTargetsLoading =
    enabled &&
    (teamsQuery.isPending ||
      mentorTargetsQuery.isPending ||
      boardTargetsQuery.isPending);

  const targetCount = [teamId, mentorId, boardId].filter(Boolean).length;
  const selectionError =
    targetCount > 1 ? MULTI_TARGET_ERROR : null;

  const canSubmitBase =
    enabled &&
    targetCount === 1 &&
    fields.title.trim().length > 0 &&
    fields.detail.trim().length > 0 &&
    !selectionError;

  const anyOptionAvailable = teams.length > 0 || mentors.length > 0 || boards.length > 0;

  const canSend =
    canSubmitBase &&
    anyOptionAvailable &&
    !createMutation.isPending &&
    !updateMutation.isPending;

  const historyItems: SuggestionHistoryItemVm[] = (mySuggestionsQuery.data ?? []).map(
    (row) => ({
      id: row.id,
      title: row.title,
      detail: row.detail,
      priority: suggestionPriorityFromApi(row.priority),
      targetLabel: targetLabelFromSent(row),
    }),
  );

  const applySentToForm = (row: UserSuggestionSent) => {
    setFields({
      title: row.title,
      detail: row.detail,
      priority: suggestionPriorityFromApi(row.priority),
    });
    setTeamId(row.scope === "TEAM" && row.teamId ? row.teamId : "");
    setMentorId(row.scope === "MENTOR" ? row.recipientMentorId : "");
    setBoardId(row.scope === "BOARD" && row.boardId ? row.boardId : "");
    setEditingId(row.id);
  };

  const onFieldChange = (
    key: keyof SuggestionComposerFields,
    value: string,
  ) => {
    setFields((prev) => ({
      ...prev,
      [key]: key === "priority" ? (value as SuggestionPriority) : value,
    }));
  };

  const onEdit = (id: string) => {
    const row = (mySuggestionsQuery.data ?? []).find((r) => r.id === id);
    if (row) {
      applySentToForm(row);
    }
  };

  const onDelete = (id: string) => {
    void deleteMutation.mutateAsync(id).then(() => {
      if (editingId === id) {
        setEditingId(null);
        setFields(emptyFields());
        setTeamId("");
        setMentorId("");
        setBoardId("");
      }
    });
  };

  const resetAfterSuccess = () => {
    setEditingId(null);
    setFields(emptyFields());
    setTeamId("");
    setMentorId("");
    setBoardId("");
  };

  const onCancelEdit = () => {
    if (createMutation.isPending || updateMutation.isPending) {
      return;
    }
    resetAfterSuccess();
  };

  const onSend = () => {
    if (!canSubmitBase) {
      return;
    }
    const bodyBase = {
      title: fields.title.trim(),
      detail: fields.detail.trim(),
      priority: suggestionPriorityToApi(fields.priority),
    };

    if (editingId) {
      void updateMutation
        .mutateAsync({ id: editingId, body: bodyBase })
        .then(resetAfterSuccess);
      return;
    }

    if (teamId) {
      void createMutation
        .mutateAsync({
          scope: "TEAM",
          teamId,
          ...bodyBase,
        })
        .then(resetAfterSuccess);
      return;
    }

    if (mentorId) {
      void createMutation
        .mutateAsync({
          scope: "MENTOR",
          targetMentorId: mentorId,
          ...bodyBase,
        })
        .then(resetAfterSuccess);
      return;
    }

    if (boardId) {
      void createMutation
        .mutateAsync({
          scope: "BOARD",
          boardId,
          ...bodyBase,
        })
        .then(resetAfterSuccess);
    }
  };

  return {
    isAuthReady: !isHydrating && authed,
    teams,
    mentors,
    boards,
    isTargetsLoading,
    teamId,
    mentorId,
    boardId,
    onTeamChange: setTeamId,
    onMentorChange: setMentorId,
    onBoardChange: setBoardId,
    selectionError,
    fields,
    onFieldChange,
    canSend,
    sendLabel: editingId ? "Update suggestion" : "Send Suggestion",
    isSending: createMutation.isPending || updateMutation.isPending,
    onSend,
    historyItems,
    editingId,
    onEdit,
    onDelete,
    isDeletingId:
      deleteMutation.isPending && deleteMutation.variables
        ? deleteMutation.variables
        : null,
    priorities: SUGGESTION_PRIORITIES_UI,
    isHistoryLoading: enabled && mySuggestionsQuery.isPending,
    onCancelEdit,
  };
}
