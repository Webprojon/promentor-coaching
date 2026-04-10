import type { IconType } from "react-icons";
import { RiLightbulbLine, RiTeamLine, RiUserStarLine } from "react-icons/ri";
import type {
  RequestCategory,
  RequestInboxRow,
  RequestsOverviewStats,
} from "@/pages/mentorship-requests/model/types";

export const REQUEST_CATEGORY_ORDER: RequestCategory[] = [
  "team_join",
  "mentorship",
  "suggestion",
];

export const REQUESTS_SUMMARY_STRIP_ITEMS: {
  overviewKey: keyof RequestsOverviewStats;
  label: string;
  sub: string;
}[] = [
  { overviewKey: "pending", label: "Pending", sub: "all directions" },
  { overviewKey: "accepted", label: "Accepted", sub: "cleared path" },
  { overviewKey: "declined", label: "Declined", sub: "closed out" },
  {
    overviewKey: "needsResponse",
    label: "Needs you",
    sub: "incoming · pending",
  },
];

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

export const MOCK_REQUEST_INBOX: RequestInboxRow[] = [
  {
    id: "s1",
    category: "team_join",
    direction: "sent",
    title: "Join · Design Systems Guild",
    targetLabel: "Design Systems Guild",
    counterpartName: "Leads: Mara Chen",
    summary:
      "Want to help with token rollout and Figma libraries — ~6h/week, Tue/Thu evenings.",
    status: "Pending",
    createdLabel: "2d ago",
  },
  {
    id: "s2",
    category: "mentorship",
    direction: "sent",
    title: "Mentorship · Product discovery",
    targetLabel: "Jordan Lee",
    counterpartName: "Jordan Lee",
    summary:
      "Looking for structured critique on interview scripts and synthesis habits.",
    status: "Accepted",
    createdLabel: "1w ago",
    counterpartAvatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face",
  },
  {
    id: "s3",
    category: "suggestion",
    direction: "sent",
    title: "Suggestion · Mobile guild",
    targetLabel: "Mobile Platform Guild",
    counterpartName: "Mobile Platform Guild",
    summary: "Propose shorter async standup template for distributed members.",
    status: "Declined",
    createdLabel: "3d ago",
  },
  {
    id: "r1",
    category: "team_join",
    direction: "received",
    title: "Join request for your team",
    targetLabel: "Core Delivery · your team",
    counterpartName: "Samira Ortiz",
    summary: "Interested in pairing on release train rituals and risk boards.",
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
