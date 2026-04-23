import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTeamsListQuery } from "@/entities/teams";
import {
  useCreateUserSuggestionMutation,
  useDeleteUserSuggestionMutation,
  useMentorTargetsForSuggestionQuery,
  useMyUserSuggestionsQuery,
  useUpdateUserSuggestionMutation,
} from "@/entities/suggestion";
import type { UserSuggestionSent } from "@/entities/suggestion/model/suggestion.types";
import { useHostAuthSession } from "@/features/auth";
import {
  SUGGESTION_FORM_DEFAULT_VALUES,
  suggestionComposerSchema,
  type SuggestionComposerFormValues,
} from "@/pages/suggestion/model/schema/suggestion-composer";
import {
  SUGGESTION_PRIORITIES_UI,
  suggestionPriorityFromApi,
  suggestionPriorityToApi,
} from "@/pages/suggestion/model/lib/suggestion-priority";
import type { SuggestionHistoryItemVm } from "@/pages/suggestion/model/types";

function targetLabelFromSent(row: UserSuggestionSent): string {
  if (row.scope === "TEAM") {
    return row.teamName ? `Team · ${row.teamName}` : "Team";
  }
  if (row.scope === "MENTOR") {
    return row.targetMentorName ? `Mentor · ${row.targetMentorName}` : "Mentor";
  }
  return row.boardName ? `Board · ${row.boardName}` : "Board";
}

export function useSuggestionPage() {
  const { session, isHydrating } = useHostAuthSession();
  const authed = session.isAuthenticated;

  const enabled = !isHydrating && authed;

  const teamsQuery = useTeamsListQuery(enabled);
  const mentorTargetsQuery = useMentorTargetsForSuggestionQuery(enabled);
  const mySuggestionsQuery = useMyUserSuggestionsQuery(enabled);

  const createMutation = useCreateUserSuggestionMutation();
  const updateMutation = useUpdateUserSuggestionMutation();
  const deleteMutation = useDeleteUserSuggestionMutation();

  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<SuggestionComposerFormValues>({
    resolver: zodResolver(suggestionComposerSchema),
    defaultValues: SUGGESTION_FORM_DEFAULT_VALUES,
    mode: "onChange",
  });

  const {
    formState: { isValid, errors },
  } = form;

  const teams = (teamsQuery.data ?? []).map((t) => ({
    id: t.id,
    label: t.name,
  }));
  const mentors = (mentorTargetsQuery.data ?? []).map((m) => ({
    id: m.id,
    label: m.label,
  }));
  const isTargetsLoading =
    enabled && (teamsQuery.isPending || mentorTargetsQuery.isPending);

  const targetError = errors.teamId?.message ?? null;

  const anyNewTargetOption = teams.length > 0 || mentors.length > 0;

  const canSend =
    enabled &&
    isValid &&
    (Boolean(editingId) || anyNewTargetOption) &&
    !createMutation.isPending &&
    !updateMutation.isPending;

  const historyItems: SuggestionHistoryItemVm[] = (
    mySuggestionsQuery.data ?? []
  ).map((row) => ({
    id: row.id,
    title: row.title,
    detail: row.detail,
    priority: suggestionPriorityFromApi(row.priority),
    targetLabel: targetLabelFromSent(row),
  }));

  const applySentToForm = (row: UserSuggestionSent) => {
    form.reset({
      title: row.title,
      detail: row.detail,
      priority: suggestionPriorityFromApi(row.priority),
      teamId: row.scope === "TEAM" && row.teamId ? row.teamId : "",
      mentorId: row.scope === "MENTOR" ? row.recipientMentorId : "",
      boardId: row.scope === "BOARD" && row.boardId ? row.boardId : "",
    });
    setEditingId(row.id);
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
        form.reset(SUGGESTION_FORM_DEFAULT_VALUES);
      }
    });
  };

  const resetAfterSuccess = () => {
    setEditingId(null);
    form.reset(SUGGESTION_FORM_DEFAULT_VALUES);
  };

  const onCancelEdit = () => {
    if (createMutation.isPending || updateMutation.isPending) {
      return;
    }
    resetAfterSuccess();
  };

  const onValidSubmit = (data: SuggestionComposerFormValues) => {
    if (!enabled) {
      return;
    }
    const bodyBase = {
      title: data.title.trim(),
      detail: data.detail.trim(),
      priority: suggestionPriorityToApi(data.priority),
    };

    if (editingId) {
      void updateMutation
        .mutateAsync({ id: editingId, body: bodyBase })
        .then(resetAfterSuccess);
      return;
    }

    if (data.teamId) {
      void createMutation
        .mutateAsync({
          scope: "TEAM",
          teamId: data.teamId,
          ...bodyBase,
        })
        .then(resetAfterSuccess);
      return;
    }

    if (data.mentorId) {
      void createMutation
        .mutateAsync({
          scope: "MENTOR",
          targetMentorId: data.mentorId,
          ...bodyBase,
        })
        .then(resetAfterSuccess);
    }
  };

  return {
    isAuthReady: !isHydrating && authed,
    teams,
    mentors,
    isTargetsLoading,
    control: form.control,
    targetError,
    canSend,
    register: form.register,
    submitSuggestion: form.handleSubmit(onValidSubmit),
    sendLabel: editingId ? "Update suggestion" : "Send Suggestion",
    isSending: createMutation.isPending || updateMutation.isPending,
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
