import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TEAM_MEMBER_OPTIONS, TEAM_ROWS } from "./constants";
import {
  addManualMemberSchema,
  createTeamSchema,
  type AddManualMemberFormValues,
  type CreateTeamFormValues,
} from "./teamCreatorSchema";

export function useTeamsPage() {
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [memberOptions, setMemberOptions] = useState(TEAM_MEMBER_OPTIONS);
  const [isManualMemberFormOpen, setIsManualMemberFormOpen] = useState(false);

  const createTeamForm = useForm<CreateTeamFormValues>({
    resolver: zodResolver(createTeamSchema),
    mode: "onChange",
    defaultValues: { teamName: "" },
  });

  const manualMemberForm = useForm<AddManualMemberFormValues>({
    resolver: zodResolver(addManualMemberSchema),
    mode: "onChange",
    defaultValues: { memberEmail: "", memberName: "" },
  });

  const hasTeams = TEAM_ROWS.length > 0;
  const canSave = createTeamForm.formState.isValid && selectedMemberIds.length > 0;

  const resetCreatorForm = () => {
    setSelectedMemberIds([]);
    setIsManualMemberFormOpen(false);
    createTeamForm.reset();
    manualMemberForm.reset();
  };

  const openCreator = () => setIsCreatorOpen(true);

  const closeCreator = () => {
    setIsCreatorOpen(false);
    resetCreatorForm();
  };

  const saveCreator = createTeamForm.handleSubmit(() => {
    if (selectedMemberIds.length === 0) return;
    setIsCreatorOpen(false);
    resetCreatorForm();
  });

  const toggleMember = (memberId: string) => {
    setSelectedMemberIds((previous) =>
      previous.includes(memberId) ? previous.filter((id) => id !== memberId) : [...previous, memberId],
    );
  };

  const toggleManualMemberForm = () => setIsManualMemberFormOpen((open) => !open);

  const addManualMember = manualMemberForm.handleSubmit((values) => {
    const normalizedEmail = values.memberEmail.trim().toLowerCase();
    const manualMember = {
      id: `manual-member-${crypto.randomUUID()}`,
      name: values.memberName.trim(),
      avatarUrl: `https://i.pravatar.cc/64?u=${encodeURIComponent(normalizedEmail)}`,
    };

    setMemberOptions((previous) => [...previous, manualMember]);
    setIsManualMemberFormOpen(false);
    manualMemberForm.reset();
  });

  const createErrors = createTeamForm.formState.errors;
  const manualErrors = manualMemberForm.formState.errors;

  return {
    addManualMember,
    canAddManualMember: manualMemberForm.formState.isValid,
    canSave,
    closeCreator,
    createTeamFormRegister: createTeamForm.register,
    errors: {
      teamName: createErrors.teamName?.message,
      memberName: manualErrors.memberName?.message,
      memberEmail: manualErrors.memberEmail?.message,
    },
    hasTeams,
    isCreatorOpen,
    isManualMemberFormOpen,
    manualMemberFormRegister: manualMemberForm.register,
    memberOptions,
    openCreator,
    saveCreator,
    selectedMemberIds,
    teamRows: TEAM_ROWS,
    toggleManualMemberForm,
    toggleMember,
  };
}

