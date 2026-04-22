import { useState } from "react";
import type {
  RequestDraft,
  WizardStep,
} from "@/features/send-request-flow/model/types";
import {
  canProceedWizardStep,
  getNextWizardStep,
  getPreviousWizardStep,
} from "@/features/send-request-flow/model/utils";
import { useHostAuthSession } from "@/features/auth";
import {
  useCreateTeamJoinRequestMutation,
  useExploreTeamsQuery,
} from "@/entities/team/hooks/use-explore-teams";
import { buildRequestMessage } from "@/features/send-request-flow/model/build-request-message";
import { mapExploreTeamFromApi } from "@/pages/explore-teams/model/mapExploreTeamFromApi";

const createEmptyDraft = (): RequestDraft => ({
  targetType: "team",
  targetId: "",
  targetName: "",
  goal: "",
  reason: "",
  weeklyAvailability: "",
  note: "",
});

export function useExploreTeamsPage() {
  const { session, isHydrating } = useHostAuthSession();
  const canLoad = !isHydrating && session.isAuthenticated;

  const exploreQuery = useExploreTeamsQuery(canLoad);
  const joinMutation = useCreateTeamJoinRequestMutation();

  const rows = (exploreQuery.data ?? []).map(mapExploreTeamFromApi);

  const [wizardStep, setWizardStep] = useState<WizardStep>(1);
  const [draft, setDraft] = useState<RequestDraft>(createEmptyDraft);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const onRequestClick = (targetId: string) => {
    const target = rows.find((row) => row.id === targetId);
    if (
      !target ||
      (target.joinUi !== "send_request" && target.joinUi !== "declined")
    ) {
      return;
    }
    setDraft({
      ...createEmptyDraft(),
      targetId: target.id,
      targetName: target.teamName,
    });
    setWizardStep(1);
    setIsWizardOpen(true);
  };

  const onCloseWizard = () => {
    setIsWizardOpen(false);
    setWizardStep(1);
    setDraft(createEmptyDraft());
  };

  const onChangeDraft = (field: keyof RequestDraft, value: string) => {
    setDraft((previous) => ({ ...previous, [field]: value }));
  };

  const onSubmitRequest = () => {
    if (!draft.targetId) {
      return;
    }
    joinMutation.mutate(
      {
        teamId: draft.targetId,
        body: { message: buildRequestMessage(draft, "Team join request") },
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
    draft,
    isWizardOpen,
    onRequestClick,
    onCloseWizard,
    onChangeDraft,
    onSubmitRequest,
    goNext,
    goBack,
    canGoNext,
    isSendingJoin: joinMutation.isPending,
    isExploreLoading,
    showExploreEmpty,
  };
}
