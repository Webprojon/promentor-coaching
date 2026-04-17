import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useHostAuthSession } from "@/features/auth";
import {
  useDeleteMyAccountMutation,
  useMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/features/profile/api";
import {
  buildProfileHeader,
  joinFullName,
  splitFullNameToForm,
  trimToOptional,
} from "@/pages/profile/model/profilePageUtils";
import type {
  ProfileChangeFormValues,
  ProfilePageUiModel,
} from "@/pages/profile/model/types";
import { notifyOk } from "@/shared/feedback/notify";

const msg = {
  bioSaved: "Your about section was saved.",
  detailsUpdated: "Profile details were updated.",
  photoRemoved: "Profile photo was removed.",
  photoUpdated: "Profile photo was updated.",
  accountDeleted: "Account deleted.",
} as const;

export function useProfilePage(): ProfilePageUiModel {
  const { session, isHydrating } = useHostAuthSession();
  const { data: profile } = useMyProfileQuery(session, isHydrating);
  const updateProfileMutation = useUpdateMyProfileMutation();
  const deleteAccountMutation = useDeleteMyAccountMutation();

  const [draftBioOverride, setDraftBioOverride] = useState<string | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);
  const [avatarDraftDataUrl, setAvatarDraftDataUrl] = useState("");
  const [isPhotoRemoved, setIsPhotoRemoved] = useState(false);

  const fullName = profile?.fullName ?? "";
  const jobTitle = profile?.jobTitle;

  const { register, formState, handleSubmit, reset } =
    useForm<ProfileChangeFormValues>({
      defaultValues: splitFullNameToForm(fullName, jobTitle),
      mode: "onChange",
    });

  useEffect(() => {
    reset(splitFullNameToForm(fullName, jobTitle));
  }, [fullName, jobTitle, reset]);

  const canEdit = session.isAuthenticated && Boolean(profile);
  const savedBio = profile?.about ?? "";
  const draftBio = draftBioOverride ?? savedBio;
  const profileHeader = useMemo(() => buildProfileHeader(profile), [profile]);

  const handleBioSave = () => {
    if (!canEdit) {
      return;
    }
    updateProfileMutation.mutate(
      { about: trimToOptional(draftBio) },
      {
        onSuccess: () => {
          notifyOk(msg.bioSaved);
          setDraftBioOverride(null);
        },
      },
    );
  };

  const handleChangeFormSubmit = handleSubmit((values) => {
    if (!canEdit) {
      return;
    }
    updateProfileMutation.mutate(
      {
        fullName: joinFullName(values),
        jobTitle: trimToOptional(values.jobTitle),
      },
      {
        onSuccess: (updated) => {
          notifyOk(msg.detailsUpdated);
          reset(splitFullNameToForm(updated.fullName, updated.jobTitle));
        },
      },
    );
  });

  const handlePhotoSave = () => {
    if (!canEdit) {
      return;
    }

    const hasNewPhoto = Boolean(avatarDraftDataUrl.trim());
    if (!isPhotoRemoved && !hasNewPhoto) {
      setIsPhotoModalOpen(false);
      return;
    }

    const removed = isPhotoRemoved;
    updateProfileMutation.mutate(
      {
        avatarUrl: removed ? null : trimToOptional(avatarDraftDataUrl),
      },
      {
        onSuccess: () => {
          notifyOk(removed ? msg.photoRemoved : msg.photoUpdated);
          setIsPhotoModalOpen(false);
          setAvatarDraftDataUrl("");
          setIsPhotoRemoved(false);
        },
      },
    );
  };

  const openDeleteAccountModal = () => {
    if (!canEdit) {
      return;
    }
    setIsDeleteAccountModalOpen(true);
  };

  const closeDeleteAccountModal = () => {
    if (deleteAccountMutation.isPending) {
      return;
    }
    setIsDeleteAccountModalOpen(false);
  };

  const confirmDeleteAccount = () => {
    if (!canEdit) {
      return;
    }
    deleteAccountMutation.mutate(undefined, {
      onSuccess: () => {
        notifyOk(msg.accountDeleted);
        setIsDeleteAccountModalOpen(false);
      },
    });
  };

  return {
    header: profileHeader,
    aboutEditor: {
      draftBio,
      isChanged: draftBio !== savedBio,
      isDisabled: !canEdit,
      isSaving: updateProfileMutation.isPending,
      onDraftBioChange: setDraftBioOverride,
      onSave: handleBioSave,
    },
    profileChangeForm: {
      register,
      canSave: formState.isDirty && canEdit,
      isDisabled: !canEdit,
      isSaving: updateProfileMutation.isPending,
      onSubmit: handleChangeFormSubmit,
    },
    profilePhotoModal: {
      open: isPhotoModalOpen,
      onClose: () => setIsPhotoModalOpen(false),
      name: profileHeader.name,
      avatarUrl: profile?.avatarUrl,
      avatarDraftDataUrl,
      isPhotoRemoved,
      isDisabled: !canEdit,
      isSaving: updateProfileMutation.isPending,
      onAvatarDraftChange: (dataUrl: string) => {
        setAvatarDraftDataUrl(dataUrl);
        setIsPhotoRemoved(false);
      },
      onRemovePhoto: () => {
        setAvatarDraftDataUrl("");
        setIsPhotoRemoved(true);
      },
      onSave: handlePhotoSave,
    },
    deleteAccountModal: {
      open: isDeleteAccountModalOpen,
      onClose: closeDeleteAccountModal,
      onConfirm: confirmDeleteAccount,
      isDeleting: deleteAccountMutation.isPending,
    },
    dangerZone: {
      isDisabled: !canEdit,
      isDeleting: deleteAccountMutation.isPending,
      onOpenDeleteConfirm: openDeleteAccountModal,
    },
    openPhotoModal: () => {
      setAvatarDraftDataUrl("");
      setIsPhotoRemoved(false);
      setIsPhotoModalOpen(true);
    },
  };
}
