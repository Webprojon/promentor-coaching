import { Modal } from "@/shared/ui";
import { SendRequestFlow } from "@/features/send-request-flow";
import { useMentorsPage } from "@/pages/mentors/model/useMentorsPage";
import { MentorCard } from "@/pages/mentors/ui/components/MentorCard";

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
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            onActionClick={onMentorActionClick}
          />
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
        <SendRequestFlow
          step={wizardStep}
          targetLabel={draft.targetName}
          draft={draft}
          onChange={onChangeDraft}
        />
      </Modal>
    </>
  );
}
