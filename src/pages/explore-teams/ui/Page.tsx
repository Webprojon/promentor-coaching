import { Typography } from "@promentorapp/ui-kit";
import { FormProvider } from "react-hook-form";
import { SendRequestFlow } from "@/features/requests/send-request-flow";
import { useExploreTeamsPage } from "@/pages/explore-teams/model/useExploreTeamsPage";
import { ExploreTeamTable } from "@/pages/explore-teams/ui/components/ExploreTeamTable";
import { EmptyListingState, Modal, PageHeader } from "@/shared/ui";

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

      <FormProvider {...requestWizardForm}>
        <Modal
          open={isWizardOpen}
          onClose={onCloseWizard}
          title={`Team request · Step ${wizardStep}/3`}
          secondaryAction={{
            label: wizardStep === 1 ? "Cancel" : "Back",
            onClick: wizardStep === 1 ? onCloseWizard : goBack,
            variant: "outlined",
          }}
          primaryAction={{
            label: wizardStep === 3 ? "Send request" : "Continue",
            onClick: wizardStep === 3 ? onSubmitRequest : goNext,
            variant: "contained",
            disabled:
              wizardStep === 3 ? isSendingJoin || !canGoNext : !canGoNext,
          }}
        >
          <SendRequestFlow step={wizardStep} />
        </Modal>
      </FormProvider>
    </>
  );
}
