import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type {
  ProfileChangeFormValues,
  ProfileHeader,
  ProfilePageUiModel,
} from "@/pages/profile/model/types";

const getNameParts = (fullName: string): ProfileChangeFormValues => {
  const [firstName = "", ...rest] = fullName.trim().split(" ");
  return {
    firstName,
    lastName: rest.join(" "),
  };
};

export function useProfilePage(
  profileHeader: ProfileHeader,
): ProfilePageUiModel {
  const [savedBio, setSavedBio] = useState(profileHeader.bio);
  const [draftBio, setDraftBio] = useState(profileHeader.bio);

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoUrlDraft, setPhotoUrlDraft] = useState(
    profileHeader.avatarUrl ?? "",
  );
  const [isPhotoRemoved, setIsPhotoRemoved] = useState(false);

  const defaultNameValues = useMemo(
    () => getNameParts(profileHeader.name),
    [profileHeader.name],
  );
  const { register, formState, handleSubmit, reset } =
    useForm<ProfileChangeFormValues>({
      defaultValues: defaultNameValues,
      mode: "onChange",
    });

  const openPhotoModal = () => {
    setPhotoUrlDraft(profileHeader.avatarUrl ?? "");
    setIsPhotoRemoved(false);
    setIsPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsPhotoModalOpen(false);
  };

  const handlePhotoUrlChange = (value: string) => {
    setPhotoUrlDraft(value);
    setIsPhotoRemoved(false);
  };

  const handleRemovePhoto = () => {
    setPhotoUrlDraft("");
    setIsPhotoRemoved(true);
  };

  const handleBioSave = () => {
    setSavedBio(draftBio);
  };

  const handleChangeFormSubmit = handleSubmit(async (values) => {
    reset(values);
  });

  return {
    aboutEditor: {
      draftBio,
      isChanged: draftBio !== savedBio,
      onDraftBioChange: setDraftBio,
      onSave: handleBioSave,
    },
    profileChangeForm: {
      register,
      canSave: formState.isDirty,
      onSubmit: handleChangeFormSubmit,
    },
    profilePhotoModal: {
      open: isPhotoModalOpen,
      onClose: closePhotoModal,
      name: profileHeader.name,
      avatarUrl: profileHeader.avatarUrl,
      photoUrlDraft,
      isPhotoRemoved,
      onPhotoUrlChange: handlePhotoUrlChange,
      onRemovePhoto: handleRemovePhoto,
    },
    openPhotoModal,
  };
}
