import type { MentorSentRequestRow, RequestInboxRow } from "../types";

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
    counterpartName: "Leads: Mara Chen",
    summary:
      "Propose a lighter pre-planning packet so async updates stay under five minutes.",
    createdLabel: "6h ago",
  },
  {
    id: "ms-interns-1",
    targetKind: "interns",
    title: "Request · Portfolio reviews",
    counterpartName: "Cohort anchor: Jordan Lee",
    summary:
      "Offer a rotating critique lane for figma files before final sign-off.",
    createdLabel: "1d ago",
  },
  {
    id: "ms-boards-1",
    targetKind: "boards",
    title: "Request · Risk radar",
    counterpartName: "Facilitator: Samira Ortiz",
    summary:
      'Tighten the "at risk" column so blocked work bubbles up without noise.',
    createdLabel: "3d ago",
  },
];

export const MOCK_REQUEST_INBOX: RequestInboxRow[] = [
  {
    id: "r1",
    category: "team_join",
    direction: "received",
    title: "Join request for your team",
    counterpartName: "Samira Ortiz",
    summary:
      "Interested in pairing on release train rituals and risk boards, with lighter pre-planning packets.",
    status: "Pending",
    createdLabel: "5h ago",
  },
  {
    id: "r2",
    category: "mentorship",
    direction: "received",
    title: "Mentorship ask",
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
    counterpartName: "Elena Vogt",
    summary:
      "Idea: add a shared doc for retro action items visible to the cohort.",
    status: "Pending",
    createdLabel: "3d ago",
  },
];
