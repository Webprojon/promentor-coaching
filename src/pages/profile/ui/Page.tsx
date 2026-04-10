import { PageForShell } from "@/shared/ui";
import { useProfilePage } from "@/pages/profile/model/useProfilePage";
import { ProfileAboutSection } from "@/pages/profile/ui/components/ProfileAboutSection";
import { ProfileHero } from "@/pages/profile/ui/components/ProfileHero";
import { ProfileIdeasTeaser } from "@/pages/profile/ui/components/ProfileIdeasTeaser";
import { ProfileMilestones } from "@/pages/profile/ui/components/ProfileMilestones";
import { ProfileQuickLinks } from "@/pages/profile/ui/components/ProfileQuickLinks";
import { ProfileStatStrip } from "@/pages/profile/ui/components/ProfileStatStrip";
import { ProfileWeekRhythm } from "@/pages/profile/ui/components/ProfileWeekRhythm";

export default function ProfilePage() {
  const {
    profileHeader,
    stats,
    focusAreas,
    milestones,
    quickLinks,
    weekRhythm,
  } = useProfilePage();

  return (
    <PageForShell
      title="Profile"
      description="Your coaching identity, progress cues, and shortcuts — tuned to match the rest of ProMentor."
    >
      <ProfileHero header={profileHeader} />
      <ProfileStatStrip stats={stats} />

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-5 xl:col-span-4">
          <ProfileAboutSection
            bio={profileHeader.bio}
            focusAreas={focusAreas}
          />
          <ProfileMilestones milestones={milestones} />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-7 xl:col-span-8">
          <ProfileQuickLinks links={quickLinks} />
          <div className="grid gap-6 md:grid-cols-2">
            <ProfileWeekRhythm days={weekRhythm} />
            <ProfileIdeasTeaser />
          </div>
        </div>
      </div>
    </PageForShell>
  );
}
