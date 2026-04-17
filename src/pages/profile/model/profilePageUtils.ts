import type { Profile } from "@/features/profile/api";
import { PROFILE_HEADER_FALLBACK } from "@/pages/profile/model/constants";
import type {
  ProfileChangeFormValues,
  ProfileHeader,
} from "@/pages/profile/model/types";

export function splitFullNameToForm(
  fullName: string,
  jobTitle?: string | null,
): ProfileChangeFormValues {
  const [firstName = "", ...rest] = fullName.trim().split(" ");
  return {
    firstName,
    lastName: rest.join(" "),
    jobTitle: jobTitle ?? "",
  };
}

export function formatProfileRole(role: Profile["role"] | undefined): string {
  if (role === "MENTOR") {
    return "Mentor";
  }
  if (role === "REGULAR_USER") {
    return "Learner";
  }
  return PROFILE_HEADER_FALLBACK.role;
}

export function trimToOptional(value: string): string | null {
  const trimmed = value.trim();
  return trimmed || null;
}

export function joinFullName(values: ProfileChangeFormValues): string {
  return [values.firstName.trim(), values.lastName.trim()]
    .filter(Boolean)
    .join(" ");
}

export function buildProfileHeader(
  profile: Profile | null | undefined,
): ProfileHeader {
  return {
    ...PROFILE_HEADER_FALLBACK,
    name: profile?.fullName ?? PROFILE_HEADER_FALLBACK.name,
    role: profile?.jobTitle?.trim() || formatProfileRole(profile?.role),
    avatarUrl: profile?.avatarUrl ?? PROFILE_HEADER_FALLBACK.avatarUrl,
  };
}
