import { createEmptyTeamJoinRequestDraft } from "@/features/requests/send-request-flow/model/empty-drafts";
import { useSendRequestWizardState } from "@/features/requests/send-request-flow/model/useSendRequestWizardState";
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

  const {
    requestWizardForm,
    wizardStep,
    isWizardOpen,
    prepareAndOpen,
    closeWizard,
    goNext,
    goBack,
    canGoNext,
  } = useSendRequestWizardState(createEmptyTeamJoinRequestDraft);

  const onRequestClick = (targetId: string) => {
    const target = rows.find((row) => row.id === targetId);
    if (
      !target ||
      (target.joinUi !== "send_request" && target.joinUi !== "declined")
    ) {
      return;
    }
    prepareAndOpen({ targetId: target.id, targetName: target.teamName });
  };

  const onCloseWizard = closeWizard;

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
      { onSuccess: closeWizard },
    );
  };

  const isExploreLoading = isHydrating || (canLoad && exploreQuery.isPending);
  const showExploreEmpty = !isExploreLoading && rows.length === 0;

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
