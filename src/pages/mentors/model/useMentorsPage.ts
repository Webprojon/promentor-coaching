import { useSendRequestWizardState } from "@/features/requests/send-request-flow/model/useSendRequestWizardState";
import { createEmptyMentorRequestDraft } from "@/features/requests/send-request-flow/model/empty-drafts";
import { useHostAuthSession } from "@/features/auth";
import {
  useCreateMentorshipRequestMutation,
  useDeleteMentorshipRequestMutation,
} from "@/entities/requests";
import { useMentorsQuery } from "@/entities/mentors";
import { buildRequestMessage } from "@/features/requests/send-request-flow/model/build-request-message";
import { mapMentorFromApi } from "@/pages/mentors/model/lib/map-mentor";
import type { Mentor } from "@/pages/mentors/model/types";

export function useMentorsPage() {
  const { session, isHydrating } = useHostAuthSession();
  const canLoad = !isHydrating && session.isAuthenticated;
  const isRegularUser = session.user?.role === "REGULAR_USER";

  const mentorsQuery = useMentorsQuery(canLoad);
  const createMutation = useCreateMentorshipRequestMutation();
  const deleteMutation = useDeleteMentorshipRequestMutation();

  const rows: Mentor[] = (mentorsQuery.data ?? []).map(mapMentorFromApi);

  const {
    requestWizardForm,
    wizardStep,
    isWizardOpen,
    prepareAndOpen,
    closeWizard,
    goNext,
    goBack,
    canGoNext,
  } = useSendRequestWizardState(createEmptyMentorRequestDraft);

  const isMentorsLoading = isHydrating || (canLoad && mentorsQuery.isPending);
  const isMentorshipActionPending =
    createMutation.isPending || deleteMutation.isPending;

  const onRequestClick = (mentorId: string) => {
    const mentor = rows.find((item) => item.id === mentorId);
    if (!mentor || !isRegularUser) return;
    prepareAndOpen({ targetId: mentor.id, targetName: mentor.name });
  };

  const onCloseWizard = closeWizard;

  const onSubmitRequest = () => {
    const values = requestWizardForm.getValues();
    if (!values.targetId || !isRegularUser) return;
    createMutation.mutate(
      {
        mentorId: values.targetId,
        message: buildRequestMessage(values, "Mentorship request"),
      },
      { onSuccess: closeWizard },
    );
  };

  const onMentorActionClick = (mentorId: string) => {
    const mentor = rows.find((item) => item.id === mentorId);
    if (!mentor || !isRegularUser) return;

    if (mentor.requestStatus === "NotRequested") {
      onRequestClick(mentorId);
      return;
    }

    if (mentor.requestStatus === "Declined") {
      onRequestClick(mentorId);
      return;
    }

    const requestId = mentor.mentorshipRequestId;
    if (!requestId) return;

    if (mentor.requestStatus === "Pending" || mentor.requestStatus === "Accepted") {
      deleteMutation.mutate(requestId);
    }
  };

  return {
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
    isSendingMentorship: createMutation.isPending,
  };
}
