export type {
  UpdateUserProfileInput as UpdateMyProfileInput,
  UserProfile as Profile,
} from "@/entities/user/api/user-profile-api";
export type { UseUpdateUserProfileMutationOptions as UseUpdateMyProfileMutationOptions } from "@/entities/user/hooks/use-user-profile";
export {
  updateUserProfileMutationOptions as updateMyProfileMutationOptions,
  useDeleteUserAccountMutation as useDeleteMyAccountMutation,
  useMyProfileQuery,
  useUpdateUserProfileMutation as useUpdateMyProfileMutation,
} from "@/entities/user/hooks/use-user-profile";
