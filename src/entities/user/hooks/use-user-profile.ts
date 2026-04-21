import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteUserAccount,
  fetchUserProfile,
  normalizeUserProfile,
  updateUserProfile,
  type UserProfile,
} from "@/entities/user/api/user-profile-api";
import {
  HOST_APP_LOGIN_REDIRECT_PATH,
  loadHostAuthBridge,
  type HostAuthSession,
} from "@/features/auth";
import { notifyOk } from "@/shared/feedback/notify";
import { profileQueryKeys } from "@/shared/query/profile-query-keys";

export type { UserProfile };

export function useMyProfileQuery(
  session: HostAuthSession,
  isAuthHydrating: boolean,
) {
  const isAuthenticated = session.isAuthenticated;

  return useQuery<UserProfile>({
    queryKey: profileQueryKeys.me(),
    queryFn: fetchUserProfile,
    enabled: !isAuthHydrating && isAuthenticated,
    placeholderData: () =>
      isAuthenticated
        ? (normalizeUserProfile(session.user) ?? undefined)
        : undefined,
    meta: {
      notifyErrorToastId: "profile-query-error",
    },
  });
}

export type UseUpdateUserProfileMutationOptions = {
  notifyErrorToastId?: string;
};

export const updateUserProfileMutationOptions = {
  bio: { notifyErrorToastId: "profile-patch-bio" },
  details: { notifyErrorToastId: "profile-patch-details" },
  photo: { notifyErrorToastId: "profile-patch-photo" },
} as const satisfies Record<string, UseUpdateUserProfileMutationOptions>;

export function useUpdateUserProfileMutation(
  options: UseUpdateUserProfileMutationOptions = {},
) {
  const queryClient = useQueryClient();
  const notifyErrorToastId = options.notifyErrorToastId ?? "profile-patch";

  return useMutation({
    mutationFn: updateUserProfile,
    meta: {
      notifyErrorToastId,
    },
    onSuccess: async (profile) => {
      queryClient.setQueryData(profileQueryKeys.me(), profile);
      const bridge = await loadHostAuthBridge().catch(() => null);
      if (bridge) {
        bridge.setSession(profile);
      }
    },
  });
}

export function useDeleteUserAccountMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserAccount,
    meta: {
      notifyErrorToastId: "profile-delete",
    },
    onSuccess: async () => {
      notifyOk("Account deleted.");
      queryClient.removeQueries({ queryKey: profileQueryKeys.all });
      const bridge = await loadHostAuthBridge().catch(() => null);
      if (bridge) {
        await bridge.logout();
        return;
      }
      window.location.replace(
        `${window.location.origin}${HOST_APP_LOGIN_REDIRECT_PATH}`,
      );
    },
  });
}
