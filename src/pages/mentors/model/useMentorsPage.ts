import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { RequestDraft } from "@/features/requests/send-request-flow/model/types";
import { createEmptyMentorRequestDraft } from "@/features/requests/send-request-flow/model/empty-drafts";
import {
  canProceedWizardStep,
  FIRST_WIZARD_STEP,
  getNextWizardStep,
  getPreviousWizardStep,
} from "@/features/requests/send-request-flow/model/utils";
import { useHostAuthSession } from "@/features/auth";
import {
  useCreateMentorshipRequestMutation,
  useDeleteMentorshipRequestMutation,
} from "@/entities/requests";
import { useMentorsQuery } from "@/entities/mentors";
import { buildRequestMessage } from "@/features/requests/send-request-flow/model/build-request-message";
import { mapMentorFromApi } from "@/pages/mentors/model/lib/map-mentor";
import type { Mentor, WizardStep } from "@/pages/mentors/model/types";

export function useMentorsPage() {
  const { session, isHydrating } = useHostAuthSession();
  const canLoad = !isHydrating && session.isAuthenticated;
  const isRegularUser = session.user?.role === "REGULAR_USER";

  const mentorsQuery = useMentorsQuery(canLoad);
  const createMutation = useCreateMentorshipRequestMutation();
  const deleteMutation = useDeleteMentorshipRequestMutation();

  const rows: Mentor[] = (mentorsQuery.data ?? []).map(mapMentorFromApi);

  const requestWizardForm = useForm<RequestDraft>({
    defaultValues: createEmptyMentorRequestDraft(),
    mode: "onChange",
  });

  const [wizardStep, setWizardStep] = useState<WizardStep>(FIRST_WIZARD_STEP);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const draft = useWatch({
    control: requestWizardForm.control,
    defaultValue: createEmptyMentorRequestDraft(),
  }) as RequestDraft;
  const isMentorsLoading = isHydrating || (canLoad && mentorsQuery.isPending);
  const isMentorshipActionPending =
    createMutation.isPending || deleteMutation.isPending;

  const onRequestClick = (mentorId: string) => {
    const mentor = rows.find((item) => item.id === mentorId);
    if (!mentor || !isRegularUser) return;
    requestWizardForm.reset({
      ...createEmptyMentorRequestDraft(),
      targetId: mentor.id,
      targetName: mentor.name,
    });
    setWizardStep(FIRST_WIZARD_STEP);
    setIsWizardOpen(true);
  };

  const onCloseWizard = () => {
    setIsWizardOpen(false);
    setWizardStep(FIRST_WIZARD_STEP);
    requestWizardForm.reset(createEmptyMentorRequestDraft());
  };

  const onSubmitRequest = () => {
    const values = requestWizardForm.getValues();
    if (!values.targetId || !isRegularUser) return;
    createMutation.mutate(
      {
        mentorId: values.targetId,
        message: buildRequestMessage(values, "Mentorship request"),
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
