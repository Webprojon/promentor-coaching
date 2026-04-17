import { PROFILE_QUICK_LINKS } from "@/pages/profile/model/constants";
import { useProfilePage } from "@/pages/profile/model/useProfilePage";
import { ProfileAboutSection } from "@/pages/profile/ui/components/ProfileAboutSection";
import { ProfileHero } from "@/pages/profile/ui/components/ProfileHero";
import { ProfilePhotoModal } from "@/pages/profile/ui/components/ProfilePhotoModal";
import { ProfileQuickLinks } from "@/pages/profile/ui/components/ProfileQuickLinks";
import { ProfileDeleteAccountModal } from "@/pages/profile/ui/components/ProfileDeleteAccountModal";
import { ProfileDangerZone } from "@/pages/profile/ui/components/ProfileDangerZone";
import { ProfileChangeForm } from "./components/ProfileChangeForm";

export default function ProfilePage() {
  const {
    header,
    aboutEditor,
    profileChangeForm,
    profilePhotoModal,
    deleteAccountModal,
    dangerZone,
    openPhotoModal,
  } = useProfilePage();

  return (
    <>
      <ProfileHero header={header} onOpenPhotoModal={openPhotoModal} />
      <ProfilePhotoModal {...profilePhotoModal} />
      <ProfileDeleteAccountModal {...deleteAccountModal} />

      <div className="grid mt-6 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-5 xl:col-span-4">
          <ProfileAboutSection {...aboutEditor} />
          <ProfileChangeForm {...profileChangeForm} />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-7 xl:col-span-8">
          <ProfileQuickLinks links={PROFILE_QUICK_LINKS} />
          <ProfileDangerZone {...dangerZone} />
        </div>
      </div>
    </>
  );
}
