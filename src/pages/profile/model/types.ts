import type { IconType } from "react-icons";

export type ProfileIdeaTeaser = {
  icon: IconType;
  title: string;
  body: string;
};

export type ProfileHeader = {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  avatarUrl?: string | null;
  memberSince: string;
  timezone: string;
};

export type ProfileStat = {
  label: string;
  value: string;
  sublabel: string;
};

export type ProfileFocusArea = {
  label: string;
};

export type ProfileMilestone = {
  title: string;
  date: string;
  complete: boolean;
};

export type ProfileQuickLinkId =
  | "teams"
  | "mentors"
  | "requests"
  | "explore"
  | "boards"
  | "workouts";

export type ProfileQuickLink = {
  to: string;
  label: string;
  description: string;
  id: ProfileQuickLinkId;
};

export type ProfileWeekDay = {
  label: string;
  intensity: 0 | 1 | 2 | 3;
};
