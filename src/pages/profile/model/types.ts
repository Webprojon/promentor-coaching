import type { BaseSyntheticEvent } from "react";
import type { UseFormRegister } from "react-hook-form";

export type ProfileHeader = {
  name: string;
  role: string;
  tagline: string;
  avatarUrl?: string | null;
  memberSince: string;
  timezone: string;
};

export type ProfileQuickLinkId =
  | "teams"
  | "mentors"
  | "requests"
  | "explore"
  | "boards"
  | "workouts";

export type ProfileQuickLink = {
  to: string;
  label: string;
  description: string;
  id: ProfileQuickLinkId;
};

export type ProfileChangeFormValues = {
  firstName: string;
  lastName: string;
  jobTitle: string;
};

export type ProfileHeroProps = {
  header: ProfileHeader;
  onOpenPhotoModal: () => void;
};

export type ProfilePhotoModalProps = {
  open: boolean;
  onClose: () => void;
  name: string;
  avatarUrl?: string | null;
  avatarDraftDataUrl: string;
  isPhotoRemoved: boolean;
  isDisabled: boolean;
  isSaving: boolean;
  onAvatarDraftChange: (dataUrl: string) => void;
  onRemovePhoto: () => void;
  onSave: () => void;
};

export type ProfileAboutSectionProps = {
  draftBio: string;
  isChanged: boolean;
  isDisabled: boolean;
  isSaving: boolean;
  onDraftBioChange: (value: string) => void;
  onSave: () => void;
};

export type ProfileChangeFormProps = {
  register: UseFormRegister<ProfileChangeFormValues>;
  canSave: boolean;
  isDisabled: boolean;
  isSaving: boolean;
  onSubmit: (event?: BaseSyntheticEvent) => void | Promise<void>;
};

export type ProfileDangerZoneProps = {
  isDisabled: boolean;
  isDeleting: boolean;
  onOpenDeleteConfirm: () => void;
};

export type ProfileDeleteAccountModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
};

export type ProfilePageUiModel = {
  header: ProfileHeader;
  aboutEditor: ProfileAboutSectionProps;
  profileChangeForm: ProfileChangeFormProps;
  profilePhotoModal: ProfilePhotoModalProps;
  deleteAccountModal: ProfileDeleteAccountModalProps;
  dangerZone: ProfileDangerZoneProps;
  openPhotoModal: () => void;
};
