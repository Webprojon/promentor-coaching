import { ExploreTeamTable } from "./components/ExploreTeamTable";
import { useExploreTeamsPage } from "../model/useExploreTeamsPage";
import PageForShell from "../../../shared/ui/PageForShell";
import { Modal } from "../../../shared/ui/Modal";
import { RequestFlowWizard } from "../../requests/ui/components/RequestFlowWizard";

export default function ExploreTeamsPage() {
  const state = useExploreTeamsPage();

  return (
    <PageForShell
      title="Explore Teams"
      description="Find active teams, compare fit, and send structured join requests with clear goals and availability."
    >
      <section className="mt-6">
        <ExploreTeamTable rows={state.rows} onRequestClick={state.onRequestClick} />
      </section>

      <Modal
        open={state.isWizardOpen}
        onClose={state.onCloseWizard}
        title={`Team request · Step ${state.wizardStep}/3`}
        secondaryAction={{
          label: state.wizardStep === 1 ? "Cancel" : "Back",
          onClick: state.wizardStep === 1 ? state.onCloseWizard : state.goBack,
          variant: "outlined",
        }}
        primaryAction={{
          label: state.wizardStep === 3 ? "Send request" : "Continue",
          onClick: state.wizardStep === 3 ? state.onSubmitRequest : state.goNext,
          variant: "contained",
          disabled: !state.canGoNext,
        }}
      >
        <RequestFlowWizard
          step={state.wizardStep}
          targetLabel={state.draft.targetName}
          draft={state.draft}
          onChange={state.onChangeDraft}
        />
      </Modal>
    </PageForShell>
  );
}
