import { Typography } from "@promentorapp/ui-kit";
import { SendRequestWizardModal } from "@/features/requests/send-request-flow";
import { useExploreTeamsPage } from "@/pages/explore-teams/model/useExploreTeamsPage";
import { ExploreTeamTable } from "@/pages/explore-teams/ui/components/ExploreTeamTable";
import { EmptyListingState, PageHeader } from "@/shared/ui";

export default function ExploreTeamsPage() {
  const {
    rows,
    isWizardOpen,
    wizardStep,
    requestWizardForm,
    onRequestClick,
    onCloseWizard,
    onSubmitRequest,
    goBack,
    goNext,
    canGoNext,
    isSendingJoin,
    isExploreLoading,
    showExploreEmpty,
  } = useExploreTeamsPage();

  return (
    <>
      <PageHeader
        title="Explore teams"
        description="Discover teams that are open to requests and start a short join conversation."
        className="mb-5"
      />
      {isExploreLoading ? (
        <Typography component="p" variantStyle="body" className="text-slate-400">
          Loading teams…
        </Typography>
      ) : showExploreEmpty ? (
        <EmptyListingState
          title="No teams yet"
          description="Once a team is created, it will appear here."
        />
      ) : (
        <ExploreTeamTable
          rows={rows}
          onRequestClick={onRequestClick}
          isSendingJoin={isSendingJoin}
        />
      )}

      <SendRequestWizardModal
        form={requestWizardForm}
        open={isWizardOpen}
        onClose={onCloseWizard}
        wizardStep={wizardStep}
        goNext={goNext}
        goBack={goBack}
        canGoNext={canGoNext}
        onSubmitRequest={onSubmitRequest}
        titlePrefix="Team request"
        isSending={isSendingJoin}
      />
    </>
  );
}
