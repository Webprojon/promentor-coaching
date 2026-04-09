import { Typography } from "@promentorapp/ui-kit";
import { ExploreTeamTable } from "./components/ExploreTeamTable";
import { useExploreTeamsPage } from "../model/useExploreTeamsPage";
import PageForShell from "../../../shared/ui/PageForShell";
import { Modal } from "../../../shared/ui/Modal";
import { RequestFlowWizard } from "../../requests/ui/components/RequestFlowWizard";
import { EXPLORE_METRIC_KEYS } from "../model/constants";

export default function ExploreTeamsPage() {
  const state = useExploreTeamsPage();

  return (
    <PageForShell
      title="Explore Teams"
      description="Find active teams, compare fit, and send structured join requests with clear goals and availability."
    >
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {EXPLORE_METRIC_KEYS.map((metric) => (
          <article key={metric.key} className="rounded-xl border border-white/10 bg-slate-900/55 p-4">
            <Typography component="p" className="text-xs uppercase tracking-wide text-slate-400">
              {metric.label}
            </Typography>
            <Typography component="p" className="mt-2 text-2xl font-bold text-white">
              {state.metrics[metric.key]}
            </Typography>
          </article>
        ))}
      </section>

      <section className="mt-4">
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
