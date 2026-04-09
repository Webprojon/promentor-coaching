import type { RequestStatus, TeamStatus } from "@/shared/model/types";

export const REQUEST_STATUS_BADGE_CLASS: Record<RequestStatus, string> = {
  Pending: "border-amber-400/40 bg-amber-500/15 text-amber-200",
  Accepted: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
  Declined: "border-rose-400/40 bg-rose-500/15 text-rose-200",
};

export const TEAM_STATUS_BADGE_CLASS: Record<TeamStatus, string> = {
  Active: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
  Pending: "border-amber-400/40 bg-amber-500/15 text-amber-200",
};

export const SHARED_TEXT_FIELD_CLASS = "border-white/20 h-12!";
