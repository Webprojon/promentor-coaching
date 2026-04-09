import PageForShell from "../../../shared/ui/PageForShell";
import { Modal } from "../../../shared/ui/Modal";
import { RequestFlowWizard } from "../../requests/ui/components/RequestFlowWizard";
import { useMentorsPage } from "../model/useMentorsPage";
import { MentorCard } from "./components/MentorCard";

export default function MentorsPage() {
  const {
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
      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
