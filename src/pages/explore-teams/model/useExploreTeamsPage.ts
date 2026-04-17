import { useState } from "react";
import type {
  RequestDraft,
  WizardStep,
} from "@/features/send-request-flow/model/types";
import {
  canProceedWizardStep,
  getNextWizardStep,
  getPreviousWizardStep,
} from "@/features/send-request-flow/model/utils";
import { EXPLORE_TEAM_ROWS } from "@/pages/explore-teams/model/constants";
import type { ExploreTeam } from "@/pages/explore-teams/model/types";

const createEmptyDraft = (): RequestDraft => ({
  targetType: "team",
  targetId: "",
  targetName: "",
  goal: "",
  reason: "",
  weeklyAvailability: "",
  note: "",
});

export function useExploreTeamsPage() {
  const [exploreRows, setExploreRows] =
    useState<ExploreTeam[]>(EXPLORE_TEAM_ROWS);
  const [wizardStep, setWizardStep] = useState<WizardStep>(1);
  const [draft, setDraft] = useState<RequestDraft>(createEmptyDraft);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const rows = exploreRows;

  const onRequestClick = (targetId: string) => {
    const target = exploreRows.find((row) => row.id === targetId);
    if (!target) return;
    setDraft({
      ...createEmptyDraft(),
      targetId: target.id,
      targetName: target.teamName,
    });
    setWizardStep(1);
    setIsWizardOpen(true);
  };

  const onCloseWizard = () => {
    setIsWizardOpen(false);
    setWizardStep(1);
    setDraft(createEmptyDraft());
  };

  const onChangeDraft = (field: keyof RequestDraft, value: string) => {
    setDraft((previous) => ({ ...previous, [field]: value }));
  };

  const onSubmitRequest = () => {
    if (!draft.targetId) return;

    setExploreRows((previous) =>
      previous.map((row) =>
        row.id === draft.targetId ? { ...row, requestStatus: "Pending" } : row,
      ),
    );
    onCloseWizard();
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
    onRequestClick,
    onCloseWizard,
    onChangeDraft,
    onSubmitRequest,
    goNext,
    goBack,
    canGoNext,
  };
}
