import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useHostAuthSession } from "@/features/auth";
import {
  updateUserProfileMutationOptions,
  useDeleteUserAccountMutation,
  useMyProfileQuery,
  useUpdateUserProfileMutation,
} from "@/entities/profile";
import { PROFILE_SUCCESS_MESSAGES } from "@/pages/profile/model/constants";
import {
  buildProfileHeader,
  joinFullName,
  splitFullNameToForm,
  trimToOptional,
} from "@/pages/profile/model/lib/profile-utils";
import type {
  ProfileAboutFormValues,
  ProfileChangeFormValues,
  ProfilePageUiModel,
  ProfilePhotoFormValues,
} from "@/pages/profile/model/types";
import { notifyOk } from "@/shared/feedback/notify";

export function useProfilePage(): ProfilePageUiModel {
  const { session, isHydrating } = useHostAuthSession();
  const { data: profile } = useMyProfileQuery(session, isHydrating);
  const updateBioMutation = useUpdateUserProfileMutation(
    updateUserProfileMutationOptions.bio,
  );
  const updateDetailsMutation = useUpdateUserProfileMutation(
    updateUserProfileMutationOptions.details,
  );
  const updatePhotoMutation = useUpdateUserProfileMutation(
    updateUserProfileMutationOptions.photo,
  );
  const deleteAccountMutation = useDeleteUserAccountMutation();

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  const aboutForm = useForm<ProfileAboutFormValues>({
    defaultValues: { about: "" },
    mode: "onChange",
  });

  const detailsForm = useForm<ProfileChangeFormValues>({
    defaultValues: splitFullNameToForm("", undefined),
    mode: "onChange",
  });

  const photoForm = useForm<ProfilePhotoFormValues>({
    defaultValues: { draftDataUrl: "", photoRemoved: false },
    mode: "onChange",
  });

  const fullName = profile?.fullName ?? "";
  const jobTitle = profile?.jobTitle;
  const savedBio = profile?.about ?? "";
  const profileHeader = buildProfileHeader(profile);
  const draftDataUrl =
    useWatch({ control: photoForm.control, name: "draftDataUrl" }) ?? "";
  const isPhotoRemoved =
    useWatch({ control: photoForm.control, name: "photoRemoved" }) ?? false;

  useEffect(() => {
    aboutForm.reset({ about: savedBio });
  }, [savedBio, aboutForm]);

  useEffect(() => {
    detailsForm.reset(splitFullNameToForm(fullName, jobTitle));
  }, [fullName, jobTitle, detailsForm]);

  const canEdit = session.isAuthenticated && Boolean(profile);
  const isAboutDirty = aboutForm.formState.isDirty;
  const canSaveDetails = detailsForm.formState.isDirty && canEdit;

  const handleBioFormSubmit = aboutForm.handleSubmit((values) => {
    if (!canEdit) {
      return;
    }
    const aboutPayload = trimToOptional(values.about);
    updateBioMutation.mutate(
      { about: aboutPayload },
      {
        onSuccess: () => {
          notifyOk(PROFILE_SUCCESS_MESSAGES.bioSaved);
          aboutForm.reset({ about: aboutPayload ?? "" });
        },
      },
    );
  });

  const handleDetailsFormSubmit = detailsForm.handleSubmit((values) => {
    if (!canEdit) {
      return;
    }
    updateDetailsMutation.mutate(
      {
        fullName: joinFullName(values),
        jobTitle: trimToOptional(values.jobTitle),
      },
      {
        onSuccess: (updated) => {
          notifyOk(PROFILE_SUCCESS_MESSAGES.detailsUpdated);
          detailsForm.reset(
            splitFullNameToForm(updated.fullName, updated.jobTitle),
          );
        },
      },
    );
  });

  const handlePhotoFormSubmit = photoForm.handleSubmit((values) => {
    if (!canEdit) {
      return;
    }
    const hasNewPhoto = Boolean(values.draftDataUrl.trim());
    if (!values.photoRemoved && !hasNewPhoto) {
      setIsPhotoModalOpen(false);
      return;
    }
    const removed = values.photoRemoved;
    updatePhotoMutation.mutate(
      {
        avatarUrl: removed ? null : trimToOptional(values.draftDataUrl),
      },
      {
        onSuccess: () => {
          notifyOk(
            removed
              ? PROFILE_SUCCESS_MESSAGES.photoRemoved
              : PROFILE_SUCCESS_MESSAGES.photoUpdated,
          );
          setIsPhotoModalOpen(false);
          photoForm.reset({ draftDataUrl: "", photoRemoved: false });
        },
      },
    );
  });

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
    deleteAccountMutation.mutate();
  };

  return {
    header: profileHeader,
    aboutEditor: {
      register: aboutForm.register,
      isChanged: isAboutDirty,
      isDisabled: !canEdit,
      isSaving: updateBioMutation.isPending,
      onSave: () => {
        void handleBioFormSubmit();
      },
    },
    profileChangeForm: {
      register: detailsForm.register,
      canSave: canSaveDetails,
      isDisabled: !canEdit,
      isSaving: updateDetailsMutation.isPending,
      onSubmit: handleDetailsFormSubmit,
    },
    profilePhotoModal: {
      open: isPhotoModalOpen,
      onClose: () => setIsPhotoModalOpen(false),
      name: profileHeader.name,
      avatarUrl: profile?.avatarUrl,
      avatarDraftDataUrl: draftDataUrl,
      isPhotoRemoved,
      isDisabled: !canEdit,
      isSaving: updatePhotoMutation.isPending,
      onAvatarDraftChange: (dataUrl) => {
        photoForm.setValue("draftDataUrl", dataUrl, { shouldDirty: true });
        photoForm.setValue("photoRemoved", false, { shouldDirty: true });
      },
      onRemovePhoto: () => {
        photoForm.setValue("draftDataUrl", "", { shouldDirty: true });
        photoForm.setValue("photoRemoved", true, { shouldDirty: true });
      },
      onSave: () => {
        void handlePhotoFormSubmit();
      },
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
      photoForm.reset({ draftDataUrl: "", photoRemoved: false });
      setIsPhotoModalOpen(true);
    },
  };
}
