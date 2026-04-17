import { loadHostAuthBridge } from "@/features/auth";
import {
  fetchCurrentUser,
  normalizeCurrentUser,
  type CurrentUser,
} from "@/shared/api/current-user";
import { apiRequest } from "@/shared/api/http";

export type Profile = CurrentUser;

export type UpdateMyProfileInput = {
  fullName?: string;
  avatarUrl?: string | null;
  jobTitle?: string | null;
  about?: string | null;
};

type UpdateMyProfileResponse = Profile & { message: string };

type DeleteMyAccountResponse = {
  message?: string;
};

export const normalizeProfile = normalizeCurrentUser;

export async function fetchMyProfile(): Promise<Profile> {
  return fetchCurrentUser();
}

function profileFromPatchResponse(res: UpdateMyProfileResponse): Profile {
  const profile = normalizeCurrentUser(res);
  if (!profile) {
    throw new Error("Updated profile response was empty.");
  }
  return profile;
}

export async function updateMyProfile(
  body: UpdateMyProfileInput,
): Promise<Profile> {
  const res = await apiRequest<UpdateMyProfileResponse>("/users/me", {
    method: "PATCH",
    body,
  });
  return profileFromPatchResponse(res);
}

export async function deleteMyAccount(): Promise<void> {
  await apiRequest<DeleteMyAccountResponse>("/users/me", {
    method: "DELETE",
  });
}

export async function pushProfileToHostBridge(
  profile: Profile | null,
): Promise<void> {
  const bridge = await loadHostAuthBridge();
  if (!bridge) {
    return;
  }
  bridge.setSession(profile);
}
