import { ExploreTeamTable } from "@/pages/explore-teams/ui/components/ExploreTeamTable";
import { useExploreTeamsPage } from "@/pages/explore-teams/model/useExploreTeamsPage";
import { Modal, PageForShell } from "@/shared/ui";
import { RequestFlowWizard } from "@/pages/mentorship-requests/ui/components/RequestFlowWizard";

export default function ExploreTeamsPage() {
  const {
    rows,
    isWizardOpen,
    wizardStep,
    draft,
    onChangeDraft,
    onRequestClick,
    onCloseWizard,
    onSubmitRequest,
    goBack,
    goNext,
    canGoNext,
  } = useExploreTeamsPage();

  return (
    <PageForShell
      title="Explore Teams"
      description="Find active teams, compare fit, and send structured join requests with clear goals and availability."
    >
      <section className="mt-6">
        <ExploreTeamTable rows={rows} onRequestClick={onRequestClick} />
      </section>

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
          disabled: !canGoNext,
        }}
      >
        <RequestFlowWizard
          step={wizardStep}
          targetLabel={draft.targetName}
          draft={draft}
          onChange={onChangeDraft}
        />
      </Modal>
    </PageForShell>
  );
}
