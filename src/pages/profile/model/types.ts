import type { BaseSyntheticEvent } from "react";
import type { UseFormRegister } from "react-hook-form";

export type ProfileHeader = {
  name: string;
  role: string;
  tagline: string;
  bio: string;
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
  photoUrlDraft: string;
  isPhotoRemoved: boolean;
  onPhotoUrlChange: (value: string) => void;
  onRemovePhoto: () => void;
};

export type ProfileAboutSectionProps = {
  draftBio: string;
  isChanged: boolean;
  onDraftBioChange: (value: string) => void;
  onSave: () => void;
};

export type ProfileChangeFormProps = {
  register: UseFormRegister<ProfileChangeFormValues>;
  canSave: boolean;
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>;
};

export type ProfilePageUiModel = {
  aboutEditor: ProfileAboutSectionProps;
  profileChangeForm: ProfileChangeFormProps;
  profilePhotoModal: ProfilePhotoModalProps;
  openPhotoModal: () => void;
};
