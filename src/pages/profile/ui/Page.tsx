import {
  PROFILE_HEADER,
  PROFILE_QUICK_LINKS,
} from "@/pages/profile/model/constants";
import { PageHeader } from "@/shared/ui";
import { useProfilePage } from "@/pages/profile/model/useProfilePage";
import { ProfileAboutSection } from "@/pages/profile/ui/components/ProfileAboutSection";
import { ProfileHero } from "@/pages/profile/ui/components/ProfileHero";
import { ProfilePhotoModal } from "@/pages/profile/ui/components/ProfilePhotoModal";
import { ProfileQuickLinks } from "@/pages/profile/ui/components/ProfileQuickLinks";
import { ProfileChangeForm } from "./components/ProfileChangeForm";

export default function ProfilePage() {
  const {
    aboutEditor,
    profileChangeForm,
    profilePhotoModal,
    openPhotoModal,
  } = useProfilePage(PROFILE_HEADER);

  return (
    <>
      <PageHeader
        title="Profile"
        description="Review your public coach card, update contact details, and jump to the areas you use most."
        className="mb-5"
      />
      <ProfileHero
        header={PROFILE_HEADER}
        onOpenPhotoModal={openPhotoModal}
      />
      <ProfilePhotoModal {...profilePhotoModal} />

      <div className="grid mt-6 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-5 xl:col-span-4">
          <ProfileAboutSection {...aboutEditor} />
          <ProfileChangeForm {...profileChangeForm} />
        </div>
        <div className="lg:col-span-7 xl:col-span-8">
          <ProfileQuickLinks links={PROFILE_QUICK_LINKS} />
        </div>
      </div>
    </>
  );
}
