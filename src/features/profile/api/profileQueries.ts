import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HOST_APP_LOGIN_REDIRECT_PATH,
  loadHostAuthBridge,
  type HostAuthSession,
} from "@/features/auth";
import { notifyOk } from "@/shared/feedback/notify";
import { profileQueryKeys } from "@/shared/query/profileQueryKeys";
import {
  deleteMyAccount,
  fetchMyProfile,
  normalizeProfile,
  pushProfileToHostBridge,
  updateMyProfile,
  type Profile,
} from "@/features/profile/api/profileRequests";

export function useMyProfileQuery(
  session: HostAuthSession,
  isAuthHydrating: boolean,
) {
  const isAuthenticated = session.isAuthenticated;

  return useQuery<Profile>({
    queryKey: profileQueryKeys.me(),
    queryFn: fetchMyProfile,
    enabled: !isAuthHydrating && isAuthenticated,
    placeholderData: () =>
      isAuthenticated
        ? (normalizeProfile(session.user) ?? undefined)
        : undefined,
    meta: {
      notifyErrorToastId: "profile-query-error",
    },
  });
}

export type UseUpdateMyProfileMutationOptions = {
  notifyErrorToastId?: string;
};

export const updateMyProfileMutationOptions = {
  bio: { notifyErrorToastId: "profile-patch-bio" },
  details: { notifyErrorToastId: "profile-patch-details" },
  photo: { notifyErrorToastId: "profile-patch-photo" },
} as const satisfies Record<string, UseUpdateMyProfileMutationOptions>;

export function useUpdateMyProfileMutation(
  options: UseUpdateMyProfileMutationOptions = {},
) {
  const queryClient = useQueryClient();
  const notifyErrorToastId = options.notifyErrorToastId ?? "profile-patch";

  return useMutation({
    mutationFn: updateMyProfile,
    meta: {
      notifyErrorToastId,
    },
    onSuccess: async (profile) => {
      queryClient.setQueryData(profileQueryKeys.me(), profile);
      await pushProfileToHostBridge(profile);
    },
  });
}

export function useDeleteMyAccountMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyAccount,
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
