import type { IconType } from "react-icons";
import {
  RiInboxArchiveLine,
  RiLayoutGridLine,
  RiLightbulbLine,
  RiPlantLine,
  RiRunLine,
  RiSendPlaneLine,
  RiTeamLine,
  RiUserStarLine,
} from "react-icons/ri";
import type {
  EmptyStateActionLink,
  MentorSentFilter,
  MentorSentRequestRow,
  MentorSentTargetKind,
  RequestCategory,
  RequestCategoryFilter,
  RequestInboxRow,
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

export const EMPTY_STATE_MESSAGE_BY_DIRECTION: Record<
  RequestInboxDirection,
  string
> = {
  sent:
    "Share concise requests with your teams, interns, boards, and workout plans. They land in one place until responses sync from the server.",
  received:
    "When someone targets you or your team, their request will land here for review.",
};

const MENTOR_SENT_FILTER_ORDER: MentorSentFilter[] = [
  "all",
  "teams",
  "interns",
  "boards",
  "workout_plans",
];

export const MENTOR_SENT_DEFAULT_FILTER: MentorSentFilter = "all";

export const MENTOR_SENT_DELIVERED_BADGE_CLASS =
  "border-slate-500/45 bg-slate-500/10 text-slate-200 shadow-[0_0_16px_rgba(148,163,184,0.12)]";

export const MENTOR_SENT_KIND_META: Record<
  MentorSentTargetKind,
  {
    label: string;
    shortLabel: string;
    hint: string;
    Icon: IconType;
    cardAccentClass: string;
    chipClass: string;
  }
> = {
  teams: {
    label: "Teams",
    shortLabel: "Team",
    hint: "Requests visible to your team leads and members.",
    Icon: RiTeamLine,
    cardAccentClass:
      "border-l-4 border-l-cyan-400/80 bg-linear-to-br from-cyan-500/12 via-slate-900/70 to-slate-950/80",
    chipClass: "border-cyan-400/35 bg-cyan-500/12 text-cyan-100",
  },
  interns: {
    label: "Interns",
    shortLabel: "Intern",
    hint: "Requests for your intern cohort and mentors-of-record.",
    Icon: RiPlantLine,
    cardAccentClass:
      "border-l-4 border-l-emerald-400/75 bg-linear-to-br from-emerald-500/12 via-slate-900/70 to-slate-950/80",
    chipClass: "border-emerald-400/35 bg-emerald-500/12 text-emerald-100",
  },
  boards: {
    label: "Boards",
    shortLabel: "Board",
    hint: "Requests tied to delivery boards and rituals.",
    Icon: RiLayoutGridLine,
    cardAccentClass:
      "border-l-4 border-l-indigo-400/80 bg-linear-to-br from-indigo-500/12 via-slate-900/70 to-slate-950/80",
    chipClass: "border-indigo-400/35 bg-indigo-500/12 text-indigo-100",
  },
  workout_plans: {
    label: "Workout plans",
    shortLabel: "Workout",
    hint: "Training-load and recovery requests for shared plans.",
    Icon: RiRunLine,
    cardAccentClass:
      "border-l-4 border-l-fuchsia-400/75 bg-linear-to-br from-fuchsia-500/12 via-slate-900/70 to-slate-950/80",
    chipClass: "border-fuchsia-400/35 bg-fuchsia-500/12 text-fuchsia-100",
  },
};

export const MENTOR_SENT_FILTER_OPTIONS: RequestsTabFilterOption<MentorSentFilter>[] =
  MENTOR_SENT_FILTER_ORDER.map((key) => {
    if (key === "all") {
      return {
        value: key,
        label: "All",
        activeClassName: "border-cyan-400/50 bg-cyan-500/15 text-cyan-100",
      };
    }
    const meta = MENTOR_SENT_KIND_META[key];
    return {
      value: key,
      label: meta.label,
      hint: meta.hint,
      Icon: meta.Icon,
      activeClassName: `${meta.chipClass} shadow-[0_0_20px_rgba(34,211,238,0.08)]`,
    };
  });

export const EMPTY_STATE_ACTION_LINKS: EmptyStateActionLink[] = [
  {
    to: "/explore-teams",
    label: "Explore teams",
    className:
      "rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-cyan-100 transition hover:bg-cyan-500/20",
  },
  {
    to: "/mentors",
    label: "Mentors",
    className:
      "rounded-lg border border-indigo-400/40 bg-indigo-500/10 px-4 py-2 text-indigo-100 transition hover:bg-indigo-500/20",
  },
  {
    to: "/suggestion",
    label: "Suggestion hub",
    className:
      "rounded-lg border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-violet-100 transition hover:bg-violet-500/20",
  },
];

export const MOCK_CURRENT_MENTOR_SENDER = {
  name: "Alex Kim",
  avatarUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face",
} as const;

export const MOCK_MENTOR_SENT_REQUESTS: MentorSentRequestRow[] = [
  {
    id: "ms-teams-1",
    targetKind: "teams",
    title: "Request · Sprint hygiene",
    targetLabel: "Core Delivery Guild",
    counterpartName: "Leads: Mara Chen",
    summary:
      "Propose a lighter pre-planning packet so async updates stay under five minutes. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae cum similique blanditiis officia? Earum, dolorum asperiores. Eveniet perferendis doloremque corporis quidem consectetur officia, laborum alias unde ut nihil rem iure incidunt magnam consequatur voluptatem esse explicabo ratione fugiat. Quibusdam animi suscipit magni tempore quidem rerum. Vero dolor eum maxime neque illo aperiam sed ipsam quibusdam molestias enim fuga veritatis omnis distinctio assumenda atque nulla temporibus, ex odio. Incidunt iusto reprehenderit molestiae quia ratione quam, sequi dolore a similique doloribus velit nemo architecto magni harum, suscipit quisquam nam eos amet cum et! Porro numquam fuga, animi eum quisquam dolor laudantium cum.",
    createdLabel: "6h ago",
  },
  {
    id: "ms-interns-1",
    targetKind: "interns",
    title: "Request · Portfolio reviews",
    targetLabel: "Summer cohort · design",
    counterpartName: "Cohort anchor: Jordan Lee",
    summary:
      "Offer a rotating critique lane for figma files before final sign-off.",
    createdLabel: "1d ago",
  },
  {
    id: "ms-boards-1",
    targetKind: "boards",
    title: "Request · Risk radar",
    targetLabel: "Release train board",
    counterpartName: "Facilitator: Samira Ortiz",
    summary:
      "Tighten the “at risk” column so blocked work bubbles up without noise.",
    createdLabel: "3d ago",
  },
  {
    id: "ms-workout-1",
    targetKind: "workout_plans",
    title: "Request · Deload micro-cycle",
    targetLabel: "Team resilience plan",
    counterpartName: "Shared with: mobile guild",
    summary:
      "Slot a down week after major launches — swap two hard sessions for mobility.",
    createdLabel: "1w ago",
  },
];

export const MOCK_REQUEST_INBOX: RequestInboxRow[] = [
  {
    id: "r1",
    category: "team_join",
    direction: "received",
    title: "Join request for your team",
    targetLabel: "Core Delivery · your team",
    counterpartName: "Samira Ortiz",
    summary: "Interested in pairing on release train rituals and risk boards. Propose a lighter pre-planning packet so async updates stay under five minutes. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae cum similique blanditiis officia? Earum, dolorum asperiores. Eveniet perferendis doloremque corporis quidem consectetur officia, laborum alias unde ut nihil rem iure incidunt magnam consequatur voluptatem esse explicabo ratione fugiat.",
    status: "Pending",
    createdLabel: "5h ago",
  },
  {
    id: "r2",
    category: "mentorship",
    direction: "received",
    title: "Mentorship ask",
    targetLabel: "You · as mentor",
    counterpartName: "Noah Patel",
    summary:
      "Wants a monthly cadence on stakeholder storytelling and exec updates.",
    status: "Pending",
    createdLabel: "1d ago",
    counterpartAvatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face",
  },
  {
    id: "r3",
    category: "suggestion",
    direction: "received",
    title: "Suggestion for you",
    targetLabel: "Your mentee context",
    counterpartName: "Elena Vogt",
    summary:
      "Idea: add a shared doc for retro action items visible to the cohort.",
    status: "Pending",
    createdLabel: "3d ago",
  },
];
