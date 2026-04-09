import { useMemo, useState } from "react";
import type { RequestDraft } from "../../../shared/model/types";
import { EXPLORE_TEAM_ROWS } from "./constants";
import type { ExploreTeam } from "./types";

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
  const [exploreRows, setExploreRows] = useState<ExploreTeam[]>(EXPLORE_TEAM_ROWS);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [draft, setDraft] = useState<RequestDraft>(createEmptyDraft);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const rows = exploreRows;

  const metrics = useMemo(() => {
    return exploreRows.reduce(
      (acc, row) => {
        if (row.visibility === "Open") acc.openTeams += 1;
        if (row.requestStatus === "Pending") acc.pendingRequests += 1;
        if (row.requestStatus === "Accepted") acc.joinedTeams += 1;
        return acc;
      },
      { openTeams: 0, pendingRequests: 0, joinedTeams: 0 },
    );
  }, [exploreRows]);

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
      previous.map((row) => (row.id === draft.targetId ? { ...row, requestStatus: "Pending" } : row)),
    );
    onCloseWizard();
  };

  const goNext = () => setWizardStep((previous) => (previous < 3 ? ((previous + 1) as 1 | 2 | 3) : previous));
  const goBack = () => setWizardStep((previous) => (previous > 1 ? ((previous - 1) as 1 | 2 | 3) : previous));

  const canGoNext =
    (wizardStep === 1 && draft.goal.trim().length > 0) ||
    (wizardStep === 2 && draft.reason.trim().length > 0 && draft.weeklyAvailability.trim().length > 0) ||
    wizardStep === 3;

  return {
    metrics,
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

