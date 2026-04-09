import PageForShell from "../../../shared/ui/PageForShell";
import { Modal } from "../../../shared/ui/Modal";
import { RequestFlowWizard } from "../../requests/ui/components/RequestFlowWizard";
import { useMentorsPage } from "../model/useMentorsPage";
import { MentorCard } from "./components/MentorCard";
import { METRIC_CARDS } from "../model/constants";
import { Typography } from "@promentorapp/ui-kit";

export default function MentorsPage() {
  const {
    metrics,
    rows,
    wizardStep,
    draft,
    isWizardOpen,
    onMentorActionClick,
    onCloseWizard,
    onChangeDraft,
    onSubmitRequest,
    goNext,
    goBack,
    canGoNext,
  } = useMentorsPage();

  return (
    <PageForShell
      title="Mentors"
      description="Compare mentors by expertise and availability, then send a structured mentorship request."
    >
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {METRIC_CARDS.map((metric) => (
          <article key={metric.key} className="rounded-xl border border-white/10 bg-slate-900/55 p-4">
            <Typography component="p" className="text-xs uppercase tracking-wide text-slate-400">
              {metric.label}
            </Typography>
            <Typography component="p" className="mt-2 text-2xl font-bold text-white">
              {metrics[metric.key]}
            </Typography>
          </article>
        ))}
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} onActionClick={onMentorActionClick} />
        ))}
      </section>

      <Modal
        open={isWizardOpen}
        onClose={onCloseWizard}
        title={`Mentorship request · Step ${wizardStep}/3`}
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
