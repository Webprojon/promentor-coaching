export type {
  UpdateUserProfileInput as UpdateMyProfileInput,
  UserProfile as Profile,
} from "@/entities/profile/api/user-profile-api";
export type { UseUpdateUserProfileMutationOptions as UseUpdateMyProfileMutationOptions } from "@/entities/profile/hooks/use-user-profile";
export {
  updateUserProfileMutationOptions as updateMyProfileMutationOptions,
  useDeleteUserAccountMutation as useDeleteMyAccountMutation,
  useMyProfileQuery,
  useUpdateUserProfileMutation as useUpdateMyProfileMutation,
} from "@/entities/profile/hooks/use-user-profile";
