import { Typography } from "@promentorapp/ui-kit";
import { FormProvider } from "react-hook-form";
import { EmptyListingState, Modal, PageHeader } from "@/shared/ui";
import { SendRequestFlow } from "@/features/requests/send-request-flow";
import { useMentorsPage } from "@/pages/mentors/model/useMentorsPage";
import { MentorCard } from "@/pages/mentors/ui/components/MentorCard";

export default function MentorsPage() {
  const {
    rows,
    wizardStep,
    requestWizardForm,
    isWizardOpen,
    onMentorActionClick,
    onCloseWizard,
    onSubmitRequest,
    goNext,
    goBack,
    canGoNext,
    isMentorsLoading,
    isMentorshipActionPending,
    isSendingMentorship,
  } = useMentorsPage();

  return (
    <>
      <PageHeader
        title="Mentors"
        description="Browse mentors, compare focus areas, and send structured mentorship requests."
        className="mb-5"
      />
      {isMentorsLoading ? (
        <Typography component="p" variantStyle="body" className="text-slate-400">
          Loading mentors…
        </Typography>
      ) : rows.length === 0 ? (
        <EmptyListingState
          title="No mentors yet"
          description="No mentors are available to browse yet."
        />
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              isMentorshipActionPending={isMentorshipActionPending}
              onActionClick={onMentorActionClick}
            />
          ))}
        </section>
      )}

      <FormProvider {...requestWizardForm}>
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
            disabled:
              wizardStep === 3
                ? !canGoNext || isSendingMentorship
                : !canGoNext,
          }}
        >
          <SendRequestFlow step={wizardStep} />
        </Modal>
      </FormProvider>
    </>
  );
}
