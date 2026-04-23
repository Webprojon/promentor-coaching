import type { Mentor } from "@/pages/mentors/model/types";

export const ACTION_LABEL_BY_STATUS: Record<Mentor["requestStatus"], string> = {
  Pending: "Cancel Request",
  Accepted: "Remove Mentorship",
  Declined: "Resend Request",
  NotRequested: "Request Mentorship",
};

export const ACTION_BUTTON_PROPS_BY_STATUS: Record<
  Mentor["requestStatus"],
  { variant: "outlined" | "contained"; color: "warning" | "error" | "info" }
> = {
  Pending: { variant: "outlined", color: "warning" },
  Accepted: { variant: "outlined", color: "error" },
  Declined: { variant: "contained", color: "info" },
  NotRequested: { variant: "outlined", color: "info" },
};
