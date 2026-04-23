import {
  fetchCurrentUser,
  normalizeCurrentUser,
  type CurrentUser,
} from "@/shared/api/current-user";
import { apiRequest } from "@/shared/api/base.api";

export type UserProfile = CurrentUser;

export type UpdateUserProfileInput = {
  fullName?: string;
  avatarUrl?: string | null;
  jobTitle?: string | null;
  about?: string | null;
};

type UpdateUserProfileResponse = UserProfile & { message: string };

type DeleteMyAccountResponse = {
  message?: string;
};

type UsersListResponse = {
  items: CurrentUser[];
  total: number;
  limit: number;
  offset: number;
};

const REGULAR_USER_DIRECTORY_LIMIT = 100;

export const normalizeUserProfile = normalizeCurrentUser;

export async function fetchUserProfile(): Promise<UserProfile> {
  return fetchCurrentUser();
}

function profileFromPatchResponse(res: UpdateUserProfileResponse): UserProfile {
  const profile = normalizeCurrentUser(res);
  if (!profile) {
    throw new Error("Updated profile response was empty.");
  }
  return profile;
}

export async function updateUserProfile(
  body: UpdateUserProfileInput,
): Promise<UserProfile> {
  const res = await apiRequest<UpdateUserProfileResponse>("/users/me", {
    method: "PATCH",
    body,
  });
  return profileFromPatchResponse(res);
}

export async function deleteUserAccount(): Promise<void> {
  await apiRequest<DeleteMyAccountResponse>("/users/me", {
    method: "DELETE",
  });
}

export async function fetchRegularUsersDirectory(): Promise<CurrentUser[]> {
  const params = new URLSearchParams({
    role: "REGULAR_USER",
    limit: String(REGULAR_USER_DIRECTORY_LIMIT),
    offset: "0",
  });
  const res = await apiRequest<UsersListResponse>(
    `/users?${params.toString()}`,
    {
      method: "GET",
    },
  );
  return res.items;
}
