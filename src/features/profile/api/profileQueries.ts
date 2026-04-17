import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HOST_APP_LOGIN_REDIRECT_PATH,
  loadHostAuthBridge,
  type HostAuthSession,
} from "@/features/auth";
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

export function useUpdateMyProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,
    meta: {
      notifyErrorToastId: "profile-patch",
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
