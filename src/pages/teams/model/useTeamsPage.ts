import { startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useInviteRegularUserMutation,
  useRegularUsersDirectoryQuery,
  useTeamDetailQuery,
  useTeamsListQuery,
  useUpdateTeamMutation,
} from "@/entities/teams";
import {
  mapListItemToTeamRow,
  mapUserToMemberOption,
} from "@/pages/teams/model/lib/map-team";
import {
  addManualMemberSchema,
  createTeamSchema,
  type AddManualMemberFormValues,
  type CreateTeamFormValues,
} from "@/pages/teams/model/schema/team-creator";
import { useHostAuthSession } from "@/features/auth";

export function useTeamsPage() {
  const { session, isHydrating } = useHostAuthSession();
  const isAuthenticated = session.isAuthenticated;
  const isMentor = session.user?.role === "MENTOR";

  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [isManualMemberFormOpen, setIsManualMemberFormOpen] = useState(false);
  const [deletingTeamId, setDeletingTeamId] = useState<string | null>(null);
  const [pendingDeleteTeamId, setPendingDeleteTeamId] = useState<string | null>(
    null,
  );

  const teamsQuery = useTeamsListQuery(!isHydrating && isAuthenticated);
  const directoryQuery = useRegularUsersDirectoryQuery(
    !isHydrating && isAuthenticated && isMentor,
  );
  const teamDetailQuery = useTeamDetailQuery(
    editingTeamId,
    isCreatorOpen && Boolean(editingTeamId),
  );

  const createMutation = useCreateTeamMutation();
  const updateMutation = useUpdateTeamMutation();
  const deleteMutation = useDeleteTeamMutation();
  const inviteMutation = useInviteRegularUserMutation();

  const createTeamForm = useForm<CreateTeamFormValues>({
    resolver: zodResolver(createTeamSchema),
    mode: "onChange",
    defaultValues: { teamName: "" },
  });

  const manualMemberForm = useForm<AddManualMemberFormValues>({
    resolver: zodResolver(addManualMemberSchema),
    mode: "onChange",
    defaultValues: { fullName: "", email: "" },
  });

  const teamRows = (teamsQuery.data ?? []).map(mapListItemToTeamRow);

  const hasTeams = teamRows.length > 0;
  const isLoadingTeams = teamsQuery.isPending;

  const memberOptions = (directoryQuery.data ?? []).map(mapUserToMemberOption);

  useEffect(() => {
    const detail = teamDetailQuery.data;
    if (!editingTeamId || !detail || detail.id !== editingTeamId) {
      return;
    }
    createTeamForm.reset({ teamName: detail.name });
    const memberIds = detail.members.map((m) => m.id);
    startTransition(() => {
      setSelectedMemberIds(memberIds);
    });
  }, [editingTeamId, teamDetailQuery.data, createTeamForm]);

  const resetCreatorForm = () => {
    setSelectedMemberIds([]);
    setIsManualMemberFormOpen(false);
    setEditingTeamId(null);
    createTeamForm.reset();
    manualMemberForm.reset();
  };

  const closeCreator = () => {
    setIsCreatorOpen(false);
    resetCreatorForm();
  };

  const openCreator = () => {
    setEditingTeamId(null);
    setSelectedMemberIds([]);
    setIsManualMemberFormOpen(false);
    createTeamForm.reset({ teamName: "" });
    manualMemberForm.reset();
    setIsCreatorOpen(true);
  };

  const openEditor = (teamId: string) => {
    setEditingTeamId(teamId);
    setSelectedMemberIds([]);
    setIsManualMemberFormOpen(false);
    createTeamForm.reset({ teamName: "" });
    manualMemberForm.reset();
    setIsCreatorOpen(true);
  };

  const isEditingDetailLoading =
    Boolean(editingTeamId) && teamDetailQuery.isPending;

  const membersRequirementMet = selectedMemberIds.length >= 2;

  const canSave =
    createTeamForm.formState.isValid &&
    membersRequirementMet &&
    !createMutation.isPending &&
    !updateMutation.isPending &&
    !isEditingDetailLoading;

  const saveCreator = createTeamForm.handleSubmit(async (values) => {
    if (selectedMemberIds.length < 2) {
      return;
    }
    const memberUserIds = [...new Set(selectedMemberIds)];
    if (editingTeamId) {
      await updateMutation.mutateAsync({
        teamId: editingTeamId,
        body: { name: values.teamName, memberUserIds },
      });
    } else {
      await createMutation.mutateAsync({
        name: values.teamName,
        memberUserIds,
      });
    }
    closeCreator();
  });

  const toggleMember = (memberId: string) => {
    setSelectedMemberIds((previous) =>
      previous.includes(memberId)
        ? previous.filter((id) => id !== memberId)
        : [...previous, memberId],
    );
  };

  const toggleManualMemberForm = () =>
    setIsManualMemberFormOpen((open) => !open);

  const addManualMember = manualMemberForm.handleSubmit(async (values) => {
    const user = await inviteMutation.mutateAsync({
      fullName: values.fullName.trim(),
      email: values.email.trim().toLowerCase(),
    });
    setSelectedMemberIds((previous) => [...new Set([...previous, user.id])]);
    setIsManualMemberFormOpen(false);
    manualMemberForm.reset();
  });

  const requestDeleteTeam = (teamId: string) => {
    setPendingDeleteTeamId(teamId);
  };

  const closeDeleteTeamModal = () => {
    if (deletingTeamId !== null) {
      return;
    }
    setPendingDeleteTeamId(null);
  };

  const confirmDeleteTeam = () => {
    if (!pendingDeleteTeamId) {
      return;
    }
    const teamId = pendingDeleteTeamId;
    setDeletingTeamId(teamId);
    deleteMutation.mutate(teamId, {
      onSuccess: () => setPendingDeleteTeamId(null),
      onSettled: () => setDeletingTeamId(null),
    });
  };

  const pendingDeleteTeamName =
    pendingDeleteTeamId === null
      ? ""
      : (teamRows.find((row) => row.id === pendingDeleteTeamId)?.teamName ??
        "");

  const createErrors = createTeamForm.formState.errors;
  const manualErrors = manualMemberForm.formState.errors;

  const modalTitle = editingTeamId ? "Edit Team" : "Create Team";
  const primaryLabel = editingTeamId ? "Save changes" : "Confirm";

  return {
    addManualMember,
    canAddManualMember: manualMemberForm.formState.isValid,
    canSave,
    closeCreator,
    createTeamFormRegister: createTeamForm.register,
    deletingTeamId,
    errors: {
      teamName: createErrors.teamName?.message,
      fullName: manualErrors.fullName?.message,
      email: manualErrors.email?.message,
    },
    hasTeams,
    inviteUserPending: inviteMutation.isPending,
    isDirectoryError: directoryQuery.isError,
    isDirectoryLoading: directoryQuery.isPending,
    isCreatorOpen,
    isLoadingTeams,
    isManualMemberFormOpen,
    isMentor,
    manualMemberFormRegister: manualMemberForm.register,
    memberOptions,
    closeDeleteTeamModal,
    confirmDeleteTeam,
    deleteTeamModalOpen: pendingDeleteTeamId !== null,
    deleteTeamModalName: pendingDeleteTeamName,
    modalTitle,
    onDeleteTeam: requestDeleteTeam,
    onEditTeam: openEditor,
    openCreator,
    primaryLabel,
    saveCreator,
    selectedMemberIds,
    teamRows,
    toggleManualMemberForm,
    toggleMember,
  };
}

export type TeamCreatorSectionProps = Omit<
  ReturnType<typeof useTeamsPage>,
  | "canSave"
  | "closeCreator"
  | "closeDeleteTeamModal"
  | "confirmDeleteTeam"
  | "deleteTeamModalName"
  | "deleteTeamModalOpen"
  | "deletingTeamId"
  | "hasTeams"
  | "isCreatorOpen"
  | "isLoadingTeams"
  | "isMentor"
  | "modalTitle"
  | "onDeleteTeam"
  | "onEditTeam"
  | "openCreator"
  | "primaryLabel"
  | "saveCreator"
  | "teamRows"
>;
