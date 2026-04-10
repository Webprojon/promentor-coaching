import {
  PROFILE_FOCUS,
  PROFILE_HEADER,
  PROFILE_MILESTONES,
  PROFILE_QUICK_LINKS,
  PROFILE_STATS,
  PROFILE_WEEK_RHYTHM,
} from "@/pages/profile/model/constants";

export function useProfilePage() {
  return {
    profileHeader: PROFILE_HEADER,
    stats: PROFILE_STATS,
    focusAreas: PROFILE_FOCUS,
    milestones: PROFILE_MILESTONES,
    quickLinks: PROFILE_QUICK_LINKS,
    weekRhythm: PROFILE_WEEK_RHYTHM,
  };
}
