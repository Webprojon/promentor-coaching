import type { IconType } from "react-icons";
import {
  RiInboxArchiveLine,
  RiLightbulbLine,
  RiSendPlaneLine,
  RiTeamLine,
  RiUserStarLine,
} from "react-icons/ri";
import type {
  RequestCategory,
  RequestCategoryFilter,
  RequestInboxDirection,
  RequestViewToggleOption,
  RequestsTabFilterOption,
} from "@/pages/requests/model/types";

const REQUEST_CATEGORY_FILTER_ORDER: RequestCategoryFilter[] = [
  "all",
  "team_join",
  "mentorship",
  "suggestion",
];

export const REQUEST_DEFAULT_CATEGORY_FILTER: RequestCategoryFilter = "all";

export const REQUEST_VIEW_TOGGLE_OPTIONS: RequestViewToggleOption[] = [
  { value: "sent", label: "Sent", Icon: RiSendPlaneLine },
  { value: "received", label: "Received", Icon: RiInboxArchiveLine },
];

const REQUESTS_PATH_PREFIX = "/requests" as const;

export function requestsPathForDirection(
  direction: RequestInboxDirection,
): string {
  return `${REQUESTS_PATH_PREFIX}/${direction}`;
}

export function isRequestInboxDirection(
  value: string,
): value is RequestInboxDirection {
  return value === "sent" || value === "received";
}

export const REQUEST_VIEW_TOGGLE_BUTTON_CLASS =
  "flex items-center justify-center gap-2 cursor-pointer rounded-lg px-4 py-3 text-sm font-semibold transition sm:justify-start sm:px-5";

export const REQUEST_CATEGORY_FILTER_BASE_BUTTON_CLASS =
  "flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition";

export const REQUEST_CATEGORY_FILTER_INACTIVE_BUTTON_CLASS =
  "border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200";

export const REQUEST_CATEGORY_META: Record<
  RequestCategory,
  {
    label: string;
    shortLabel: string;
    hint: string;
    Icon: IconType;
    cardAccentClass: string;
    chipClass: string;
  }
> = {
  team_join: {
    label: "Team join",
    shortLabel: "Team",
    hint: "Ask to join a team you do not belong to yet.",
    Icon: RiTeamLine,
    cardAccentClass:
      "border-l-4 border-l-cyan-400/80 bg-linear-to-br from-cyan-500/12 via-slate-900/70 to-slate-950/80",
    chipClass: "border-cyan-400/35 bg-cyan-500/12 text-cyan-100",
  },
  mentorship: {
    label: "Mentorship",
    shortLabel: "Mentor",
    hint: "Invite a mentor to work with you on goals and cadence.",
    Icon: RiUserStarLine,
    cardAccentClass:
      "border-l-4 border-l-indigo-400/80 bg-linear-to-br from-indigo-500/12 via-slate-900/70 to-slate-950/80",
    chipClass: "border-indigo-400/35 bg-indigo-500/12 text-indigo-100",
  },
  suggestion: {
    label: "Suggestion",
    shortLabel: "Suggest",
    hint: "Feedback-style note to a team or your mentor, like Suggestion Hub.",
    Icon: RiLightbulbLine,
    cardAccentClass:
      "border-l-4 border-l-violet-400/80 bg-linear-to-br from-violet-500/12 via-slate-900/70 to-slate-950/80",
    chipClass: "border-violet-400/35 bg-violet-500/12 text-violet-100",
  },
};

export const REQUEST_CATEGORY_FILTER_OPTIONS: RequestsTabFilterOption<RequestCategoryFilter>[] =
  REQUEST_CATEGORY_FILTER_ORDER.map((key) => {
    if (key === "all") {
      return {
        value: key,
        label: "All",
        activeClassName: "border-cyan-400/50 bg-cyan-500/15 text-cyan-100",
      };
    }

    const meta = REQUEST_CATEGORY_META[key];
    return {
      value: key,
      label: meta.label,
      hint: meta.hint,
      Icon: meta.Icon,
      activeClassName: `${meta.chipClass} shadow-[0_0_20px_rgba(34,211,238,0.08)]`,
    };
  });
