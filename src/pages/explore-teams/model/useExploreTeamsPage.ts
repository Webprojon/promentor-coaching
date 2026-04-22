import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { createEmptyTeamJoinRequestDraft } from "@/features/requests/send-request-flow/model/empty-drafts";
import type {
  RequestDraft,
  WizardStep,
} from "@/features/requests/send-request-flow/model/types";
import {
  canProceedWizardStep,
  getNextWizardStep,
  getPreviousWizardStep,
} from "@/features/requests/send-request-flow/model/utils";
import { useHostAuthSession } from "@/features/auth";
import { useExploreTeamsQuery } from "@/entities/explore-teams";
import { useCreateTeamJoinRequestMutation } from "@/entities/requests";
import { buildRequestMessage } from "@/features/requests/send-request-flow/model/build-request-message";
import { mapExploreTeamFromApi } from "@/pages/explore-teams/model/lib/map-explore-team";

export function useExploreTeamsPage() {
  const { session, isHydrating } = useHostAuthSession();
  const canLoad = !isHydrating && session.isAuthenticated;

  const exploreQuery = useExploreTeamsQuery(canLoad);
  const joinMutation = useCreateTeamJoinRequestMutation();

  const rows = (exploreQuery.data ?? []).map(mapExploreTeamFromApi);

  const requestWizardForm = useForm<RequestDraft>({
    defaultValues: createEmptyTeamJoinRequestDraft(),
    mode: "onChange",
  });

  const [wizardStep, setWizardStep] = useState<WizardStep>(1);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const draft = useWatch({
    control: requestWizardForm.control,
    defaultValue: createEmptyTeamJoinRequestDraft(),
  }) as RequestDraft;

  const onRequestClick = (targetId: string) => {
    const target = rows.find((row) => row.id === targetId);
    if (
      !target ||
      (target.joinUi !== "send_request" && target.joinUi !== "declined")
    ) {
      return;
    }
    requestWizardForm.reset({
      ...createEmptyTeamJoinRequestDraft(),
      targetId: target.id,
      targetName: target.teamName,
    });
    setWizardStep(1);
    setIsWizardOpen(true);
  };

  const onCloseWizard = () => {
    setIsWizardOpen(false);
    setWizardStep(1);
    requestWizardForm.reset(createEmptyTeamJoinRequestDraft());
  };

  const onSubmitRequest = () => {
    const values = requestWizardForm.getValues();
    if (!values.targetId) {
      return;
    }
    joinMutation.mutate(
      {
        teamId: values.targetId,
        body: { message: buildRequestMessage(values, "Team join request") },
      },
      { onSuccess: onCloseWizard },
    );
  };

  const goNext = () => setWizardStep((previous) => getNextWizardStep(previous));
  const goBack = () =>
    setWizardStep((previous) => getPreviousWizardStep(previous));

  const canGoNext = canProceedWizardStep(wizardStep, draft);

  const isExploreLoading =
    isHydrating || (canLoad && exploreQuery.isPending);
  const showExploreEmpty =
    !isExploreLoading && rows.length === 0;

  return {
    rows,
    wizardStep,
    requestWizardForm,
    isWizardOpen,
    onRequestClick,
    onCloseWizard,
    onSubmitRequest,
    goBack,
    goNext,
    canGoNext,
    isSendingJoin: joinMutation.isPending,
    isExploreLoading,
    showExploreEmpty,
  };
}
