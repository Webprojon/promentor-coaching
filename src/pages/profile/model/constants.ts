import type { IconType } from "react-icons";
import {
  RiCompass3Line,
  RiLayoutGridLine,
  RiMailSendLine,
  RiRunLine,
  RiTeamLine,
  RiUserStarLine,
} from "react-icons/ri";
import type {
  ProfileHeader,
  ProfileQuickLink,
  ProfileQuickLinkId,
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

