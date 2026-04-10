import type { IconType } from "react-icons";
import {
  RiCalendarEventLine,
  RiCompass3Line,
  RiLayoutGridLine,
  RiMailSendLine,
  RiNotification3Line,
  RiRunLine,
  RiShieldKeyholeLine,
  RiTeamLine,
  RiUserStarLine,
} from "react-icons/ri";
import type {
  ProfileFocusArea,
  ProfileHeader,
  ProfileIdeaTeaser,
  ProfileMilestone,
  ProfileQuickLink,
  ProfileQuickLinkId,
  ProfileStat,
  ProfileWeekDay,
} from "@/pages/profile/model/types";

export const PROFILE_AVATAR_IMAGE_URL =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&h=256&fit=crop&crop=face";

export const PROFILE_HEADER: ProfileHeader = {
  name: "Alex Morgan",
  role: "Learner · Product cohort",
  tagline: "Turning weekly coaching into shipped outcomes.",
  bio: "Focused on facilitation, async communication, and keeping mentorship requests crisp. Open to peer swaps on discovery and roadmap storytelling.",
  avatarUrl: PROFILE_AVATAR_IMAGE_URL,
  memberSince: "Mar 2025",
  timezone: "Asia/Tashkent · UTC+5",
};

export const PROFILE_WEEK_INTENSITY_BAR_CLASS: Record<
  ProfileWeekDay["intensity"],
  string
> = {
  0: "bg-slate-700/50",
  1: "bg-cyan-500/25",
  2: "bg-cyan-400/50",
  3: "bg-cyan-300/85 shadow-[0_0_12px_rgba(34,211,238,0.35)]",
};

export const PROFILE_IDEAS_TEASERS: ProfileIdeaTeaser[] = [
  {
    icon: RiNotification3Line,
    title: "Smart nudges",
    body: "Digest before sessions, recap after — tuned to your timezone.",
  },
  {
    icon: RiCalendarEventLine,
    title: "Office hours",
    body: "Publish windows so mentors and teams know when you are reachable.",
  },
  {
    icon: RiShieldKeyholeLine,
    title: "Privacy controls",
    body: "Choose what appears on your public card vs. cohort-only views.",
  },
];

export const PROFILE_QUICK_LINK_ICONS: Record<ProfileQuickLinkId, IconType> = {
  teams: RiTeamLine,
  mentors: RiUserStarLine,
  requests: RiMailSendLine,
  explore: RiCompass3Line,
  boards: RiLayoutGridLine,
  workouts: RiRunLine,
};

export const PROFILE_QUICK_LINK_ICON_CLASSNAME =
  "text-xl text-cyan-200/90" as const;

export const PROFILE_STATS: ProfileStat[] = [
  { label: "Sessions", value: "12", sublabel: "last 30 days" },
  { label: "Active streak", value: "5 wks", sublabel: "mentorship rhythm" },
  { label: "Teams", value: "3", sublabel: "you collaborate in" },
  { label: "Goals", value: "2", sublabel: "in progress" },
];

export const PROFILE_FOCUS: ProfileFocusArea[] = [
  { label: "Facilitation" },
  { label: "Career narrative" },
  { label: "Discovery interviews" },
  { label: "Stakeholder comms" },
];

export const PROFILE_MILESTONES: ProfileMilestone[] = [
  {
    title: "First mentorship match",
    date: "Jan 2025",
    complete: true,
  },
  {
    title: "Joined cross-team cohort",
    date: "Mar 2025",
    complete: true,
  },
  {
    title: "Lead a team ritual",
    date: "Target · Q2",
    complete: false,
  },
];

export const PROFILE_QUICK_LINKS: ProfileQuickLink[] = [
  {
    id: "teams",
    to: "/teams",
    label: "Your teams",
    description: "Invite, roles, and delivery context.",
  },
  {
    id: "mentors",
    to: "/mentors",
    label: "Mentors",
    description: "Compare fit and send structured asks.",
  },
  {
    id: "requests",
    to: "/requests",
    label: "Requests inbox",
    description: "Track mentorship and team joins.",
  },
  {
    id: "explore",
    to: "/explore-teams",
    label: "Explore teams",
    description: "Find groups aligned to your goals.",
  },
  {
    id: "boards",
    to: "/boards",
    label: "Boards",
    description: "Visualize progress and commitments.",
  },
  {
    id: "workouts",
    to: "/workout-plans",
    label: "Workout plans",
    description: "Structured practice between sessions.",
  },
];

export const PROFILE_WEEK_RHYTHM: ProfileWeekDay[] = [
  { label: "M", intensity: 2 },
  { label: "T", intensity: 3 },
  { label: "W", intensity: 1 },
  { label: "T", intensity: 2 },
  { label: "F", intensity: 3 },
  { label: "S", intensity: 0 },
  { label: "S", intensity: 1 },
];
