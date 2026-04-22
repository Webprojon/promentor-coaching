import type { IconType } from "react-icons";
import {
  RiCompass3Line,
  RiLayoutGridLine,
  RiMailSendLine,
  RiTeamLine,
  RiUserStarLine,
} from "react-icons/ri";
import type {
  ProfileHeader,
  ProfileQuickLink,
  ProfileQuickLinkId,
} from "@/pages/profile/model/types";

export const PROFILE_DELETE_ACCOUNT_CONSEQUENCES = [
  "Your profile, preferences, and saved content will be removed.",
  "You may lose access to teams, sessions, and history tied to this account.",
  "This action cannot be reversed.",
] as const;

export const PROFILE_HEADER_FALLBACK: ProfileHeader = {
  name: "Your profile",
  role: "Learner",
  tagline: "Turning weekly coaching into shipped outcomes.",
  avatarUrl: null,
  memberSince: "Recently joined",
  timezone: "UTC+5",
};

export const PROFILE_QUICK_LINK_ICONS: Record<ProfileQuickLinkId, IconType> = {
  teams: RiTeamLine,
  mentors: RiUserStarLine,
  requests: RiMailSendLine,
  explore: RiCompass3Line,
  boards: RiLayoutGridLine,
};

export const PROFILE_QUICK_LINK_ICON_CLASSNAME =
  "text-xl text-cyan-200/90" as const;

export const PROFILE_SUCCESS_MESSAGES = {
  bioSaved: "Your about section was saved.",
  detailsUpdated: "Profile details were updated.",
  photoRemoved: "Profile photo was removed.",
  photoUpdated: "Profile photo was updated.",
} as const;

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
];
