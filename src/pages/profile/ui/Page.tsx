import { Typography } from "@promentorapp/ui-kit";
import PageForShell from "../../../shared/ui/PageForShell";
import { useProfilePage } from "../model/useProfilePage";

export default function ProfilePage() {
  const { profileHeader } = useProfilePage();

  return (
    <PageForShell
      title="Profile"
      description="View your basic profile information."
    >
      <section className="mt-6 rounded-xl border border-white/10 bg-slate-900/55 p-5">
        <Typography component="h2" className="text-lg font-semibold text-white">
          {profileHeader.name}
        </Typography>
        <Typography component="p" className="mt-2 text-sm text-slate-300">
          Role: {profileHeader.role}
        </Typography>
      </section>
    </PageForShell>
  );
}
