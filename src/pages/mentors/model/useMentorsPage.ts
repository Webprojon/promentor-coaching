import { useState } from "react";
import type { RequestDraft } from "@/shared/model/types";
import { MENTOR_ROWS } from "@/pages/mentors/model/constants";
import type { Mentor, WizardStep } from "@/pages/mentors/model/types";
import {
  canProceedWizardStep,
  createEmptyMentorDraft,
  FIRST_WIZARD_STEP,
  getMentorActionStatus,
  getNextWizardStep,
  getPreviousWizardStep,
} from "@/pages/mentors/model/utils";

const updateMentorStatus = (
  rows: Mentor[],
  mentorId: string,
  requestStatus: Mentor["requestStatus"],
) =>
  rows.map((mentor) =>
    mentor.id === mentorId ? { ...mentor, requestStatus } : mentor,
  );

export function useMentorsPage() {
  const [mentorRows, setMentorRows] = useState<Mentor[]>(MENTOR_ROWS);
  const [wizardStep, setWizardStep] = useState<WizardStep>(FIRST_WIZARD_STEP);
  const [draft, setDraft] = useState<RequestDraft>(createEmptyMentorDraft);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const onRequestClick = (mentorId: string) => {
    const mentor = mentorRows.find((item) => item.id === mentorId);
    if (!mentor) return;
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
    if (!draft.targetId) return;
    setMentorRows((previous) =>
      updateMentorStatus(previous, draft.targetId, "Pending"),
    );
    onCloseWizard();
  };

  const onMentorActionClick = (mentorId: string) => {
    const mentor = mentorRows.find((item) => item.id === mentorId);
    if (!mentor) return;

    if (mentor.requestStatus === "NotRequested") {
      onRequestClick(mentorId);
      return;
    }

    const nextStatus = getMentorActionStatus(mentor.requestStatus);
    setMentorRows((previous) =>
      updateMentorStatus(previous, mentorId, nextStatus),
    );
  };

  const goNext = () => setWizardStep((previous) => getNextWizardStep(previous));
  const goBack = () =>
    setWizardStep((previous) => getPreviousWizardStep(previous));
  const canGoNext = canProceedWizardStep(wizardStep, draft);

  return {
    rows: mentorRows,
    wizardStep,
    draft,
    isWizardOpen,
    onRequestClick,
    onMentorActionClick,
    onCloseWizard,
    onChangeDraft,
    onSubmitRequest,
    goNext,
    goBack,
    canGoNext,
  };
}
