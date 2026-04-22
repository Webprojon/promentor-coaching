import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createTeam,
  deleteTeam,
  fetchTeamDetail,
  fetchTeams,
  inviteRegularUser,
  updateTeam,
} from "@/entities/teams/api/team.api";
import { fetchRegularUsersDirectory } from "@/entities/profile/api/profile.api";
import type {
  CreateTeamBody,
  InviteRegularUserBody,
  UpdateTeamBody,
} from "@/entities/teams/model/team.types";
import { teamQueryKeys } from "@/entities/teams/model/team.keys";
import { userDirectoryQueryKeys } from "@/entities/profile/model/profile.keys";
import { notifyOk } from "@/shared/feedback/notify";

const TEAMS_STALE_MS = 30_000;
const DIRECTORY_STALE_MS = 5 * 60_000;

export function useTeamsListQuery(enabled: boolean) {
  return useQuery({
    queryKey: teamQueryKeys.list(),
    queryFn: fetchTeams,
    enabled,
    staleTime: TEAMS_STALE_MS,
    meta: { notifyErrorToastId: "teams-list" },
  });
}

export function useTeamDetailQuery(teamId: string | null, enabled: boolean) {
  const shouldLoad = Boolean(teamId) && enabled;
  return useQuery({
    queryKey: teamId
      ? teamQueryKeys.detail(teamId)
      : ["teams", "detail", "idle"],
    queryFn: teamId ? () => fetchTeamDetail(teamId) : skipToken,
    enabled: shouldLoad,
    staleTime: TEAMS_STALE_MS,
    meta: { notifyErrorToastId: "teams-detail" },
  });
}

export function useRegularUsersDirectoryQuery(enabled: boolean) {
  return useQuery({
    queryKey: userDirectoryQueryKeys.regularUsers(),
    queryFn: fetchRegularUsersDirectory,
    enabled,
    staleTime: DIRECTORY_STALE_MS,
    meta: { notifyErrorToastId: "users-directory-regular" },
  });
}

export function useCreateTeamMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateTeamBody) => createTeam(body),
    meta: { notifyErrorToastId: "teams-create" },
    onSuccess: async () => {
      notifyOk("Team created.");
      await queryClient.invalidateQueries({ queryKey: teamQueryKeys.all });
    },
  });
}

export function useUpdateTeamMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teamId, body }: { teamId: string; body: UpdateTeamBody }) =>
      updateTeam(teamId, body),
    meta: { notifyErrorToastId: "teams-update" },
    onSuccess: async (_data, variables) => {
      notifyOk("Team updated.");
      await queryClient.invalidateQueries({ queryKey: teamQueryKeys.all });
      await queryClient.invalidateQueries({
        queryKey: teamQueryKeys.detail(variables.teamId),
      });
    },
  });
}

export function useDeleteTeamMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (teamId: string) => deleteTeam(teamId),
    meta: { notifyErrorToastId: "teams-delete" },
    onSuccess: async () => {
      notifyOk("Team deleted.");
      await queryClient.invalidateQueries({ queryKey: teamQueryKeys.all });
    },
  });
}

export function useInviteRegularUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: InviteRegularUserBody) => inviteRegularUser(body),
    meta: { notifyErrorToastId: "teams-invite-user" },
    onSuccess: async () => {
      notifyOk("User added to the directory.");
      await queryClient.invalidateQueries({
        queryKey: userDirectoryQueryKeys.all,
      });
    },
  });
}
