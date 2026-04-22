import { Typography } from "@promentorapp/ui-kit";
import { SendRequestWizardModal } from "@/features/requests/send-request-flow";
import { useMentorsPage } from "@/pages/mentors/model/useMentorsPage";
import { MentorCard } from "@/pages/mentors/ui/components/MentorCard";
import { EmptyListingState, PageHeader } from "@/shared/ui";

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

      <SendRequestWizardModal
        form={requestWizardForm}
        open={isWizardOpen}
        onClose={onCloseWizard}
        wizardStep={wizardStep}
        goNext={goNext}
        goBack={goBack}
        canGoNext={canGoNext}
        onSubmitRequest={onSubmitRequest}
        titlePrefix="Mentorship request"
        isSending={isSendingMentorship}
      />
    </>
  );
}
