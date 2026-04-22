import { describe, expect, it } from "vitest";
import {
  canProceedWizardStep,
  getNextWizardStep,
  getPreviousWizardStep,
} from "@/features/requests/send-request-flow/model/utils";
import type { RequestDraft } from "@/features/requests/send-request-flow/model/types";

const baseDraft = (): RequestDraft => ({
  targetType: "mentor",
  targetId: "x",
  targetName: "Name",
  goal: "",
  reason: "",
  weeklyAvailability: "",
  note: "",
});

describe("send-request wizard utils", () => {
  it("clamps getNextWizardStep and getPreviousWizardStep", () => {
    expect(getNextWizardStep(3)).toBe(3);
    expect(getPreviousWizardStep(1)).toBe(1);
    expect(getNextWizardStep(1)).toBe(2);
    expect(getPreviousWizardStep(2)).toBe(1);
  });

  it("canProceedWizardStep: step 1 requires goal", () => {
    const d = baseDraft();
    expect(canProceedWizardStep(1, d)).toBe(false);
    expect(canProceedWizardStep(1, { ...d, goal: "x" })).toBe(true);
  });

  it("canProceedWizardStep: step 2 requires reason and weeklyAvailability", () => {
    const d = { ...baseDraft(), goal: "g", reason: "r", weeklyAvailability: "" };
    expect(canProceedWizardStep(2, d)).toBe(false);
    expect(
      canProceedWizardStep(2, { ...d, weeklyAvailability: "5h" }),
    ).toBe(true);
  });

  it("canProceedWizardStep: step 3 is always allowed", () => {
    expect(canProceedWizardStep(3, baseDraft())).toBe(true);
  });
});
