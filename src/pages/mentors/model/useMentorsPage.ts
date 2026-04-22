import { useState } from "react";
import type { RequestDraft } from "@/features/send-request-flow/model/types";
import {
  canProceedWizardStep,
  FIRST_WIZARD_STEP,
  getNextWizardStep,
  getPreviousWizardStep,
} from "@/features/send-request-flow/model/utils";
import { useHostAuthSession } from "@/features/auth";
import {
  useCreateMentorshipRequestMutation,
  useDeleteMentorshipRequestMutation,
} from "@/entities/requests/hooks/use-mentorship-request-queries";
import { useMentorsQuery } from "@/entities/mentors/hooks/use-mentors-query";
import { buildRequestMessage } from "@/features/send-request-flow/model/build-request-message";
import { mapMentorFromApi } from "@/pages/mentors/model/mapMentorFromApi";
import {
  createEmptyMentorDraft,
} from "@/pages/mentors/model/utils";
import type { Mentor, WizardStep } from "@/pages/mentors/model/types";

export function useMentorsPage() {
  const { session, isHydrating } = useHostAuthSession();
  const canLoad = !isHydrating && session.isAuthenticated;
  const isRegularUser = session.user?.role === "REGULAR_USER";

  const mentorsQuery = useMentorsQuery(canLoad);
  const createMutation = useCreateMentorshipRequestMutation();
  const deleteMutation = useDeleteMentorshipRequestMutation();

  const rows: Mentor[] = (mentorsQuery.data ?? []).map(mapMentorFromApi);

  const [wizardStep, setWizardStep] = useState<WizardStep>(FIRST_WIZARD_STEP);
  const [draft, setDraft] = useState<RequestDraft>(createEmptyMentorDraft);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const isMentorsLoading = isHydrating || (canLoad && mentorsQuery.isPending);
  const isMentorshipActionPending =
    createMutation.isPending || deleteMutation.isPending;

  const onRequestClick = (mentorId: string) => {
    const mentor = rows.find((item) => item.id === mentorId);
    if (!mentor || !isRegularUser) return;
    setDraft({
      ...createEmptyMentorDraft(),
      targetId: mentor.id,
      targetName: mentor.name,
    });
    setWizardStep(FIRST_WIZARD_STEP);
    setIsWizardOpen(true);
  };

  const onCloseWizard = () => {
    setIsWizardOpen(false);
    setWizardStep(FIRST_WIZARD_STEP);
    setDraft(createEmptyMentorDraft());
  };

  const onChangeDraft = (field: keyof RequestDraft, value: string) => {
    setDraft((previous) => ({ ...previous, [field]: value }));
  };

  const onSubmitRequest = () => {
    if (!draft.targetId || !isRegularUser) return;
    createMutation.mutate(
      {
        mentorId: draft.targetId,
        message: buildRequestMessage(draft, "Mentorship request"),
      },
      { onSuccess: onCloseWizard },
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

  const goNext = () => setWizardStep((previous) => getNextWizardStep(previous));
  const goBack = () =>
    setWizardStep((previous) => getPreviousWizardStep(previous));
  const canGoNext = canProceedWizardStep(wizardStep, draft);

  return {
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
    isMentorsLoading,
    isMentorshipActionPending,
    isSendingMentorship: createMutation.isPending,
  };
}
