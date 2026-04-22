import { apiRequest } from "@/shared/api/base.api";

type AuthRole = import("shell/authBridge").AuthRole;

export type CurrentUser = {
  id: string;
  email: string;
  fullName: string;
  role: AuthRole;
  avatarUrl?: string | null;
  jobTitle?: string | null;
  about?: string | null;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function normalizeCurrentUser(
  user: CurrentUser | null | undefined,
): CurrentUser | null {
  if (!user || !isNonEmptyString(user.id) || !isNonEmptyString(user.email)) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    avatarUrl: user.avatarUrl ?? null,
    jobTitle: user.jobTitle ?? null,
    about: user.about ?? null,
  };
}

export async function fetchCurrentUser(): Promise<CurrentUser> {
  const raw = await apiRequest<CurrentUser>("/auth/me", { method: "GET" });
  const user = normalizeCurrentUser(raw);
  if (!user) {
    throw new Error("Profile response was empty.");
  }
  return user;
}
