import type { JoinedTeam, SuggestionHistoryItem, SuggestionPriority, SuggestionStatus } from "./types";

export const PRIORITY_BADGE_CLASS: Record<SuggestionPriority, string> = {
  High: "bg-emerald-500/20 text-emerald-200",
  Medium: "bg-amber-500/20 text-amber-200",
  Low: "bg-red-500/20 text-red-200",
};

export const PRIORITY_SELECTED_BORDER_CLASS: Record<SuggestionPriority, string> = {
  High: "border-emerald-400",
  Medium: "border-amber-400",
  Low: "border-red-400",
};

export const SUGGESTION_STATUS_BADGE_CLASS: Record<SuggestionStatus, string> = {
  Sent: "border-blue-400/40 bg-blue-500/15 text-blue-200",
  Accepted: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
  "Not Accepted": "border-rose-400/40 bg-rose-500/15 text-rose-200",
};

export const joinedTeams: JoinedTeam[] = [
  {
    id: "team-002",
    name: "Product Ninjas",
    mentors: ["Ethan Brooks"],
    weeklyGoal: "Ship API contract docs",
    progress: "2/4 milestones completed",
  },
  {
    id: "team-001",
    name: "Growth Mentors",
    mentors: ["Olivia Turner"],
    weeklyGoal: "Complete design system tickets",
    progress: "1/3 milestones completed",
  },
];

export const suggestionHistory: SuggestionHistoryItem[] = [
  {
    id: "s-301",
    teamId: "team-002",
    title: "Split backlog by API domain",
    detail:
      "Right now work is mixed across domains, which makes ownership fuzzy and slows down reviews. Grouping backlog items by API domain (auth, billing, notifications, etc.) would make it obvious who decides on scope, who reviews changes, and how we sequence releases. It also reduces cross-team thrash when a single PR touches unrelated surfaces.",
    priority: "High",
    status: "Accepted",
  },
  {
    id: "s-302",
    teamId: "team-001",
    title: "Set 30 min daily UI refactor slot",
    detail:
      "UI debt tends to snowball when we only refactor during big features. A fixed 30-minute daily window keeps improvements incremental and predictable: rename confusing components, tighten types, remove dead styles, and chip away at accessibility issues. Over a sprint, that compounds without blocking delivery or forcing a risky “big bang” refactor.",
    priority: "Medium",
    status: "Not Accepted",
  },
  {
    id: "s-303",
    teamId: "team-002",
    title: "Schedule Friday mentor sync",
    detail:
      "Friday is when we have the clearest picture of what shipped, what blocked, and what we should carry into next week. A short, recurring mentor sync at the end of the week would close the loop on feedback, unblock decisions before Monday, and align priorities for the upcoming sprint. Even 20 minutes beats a long thread of async messages that gets lost over the weekend.",
    priority: "High",
    status: "Sent",
  },
];
