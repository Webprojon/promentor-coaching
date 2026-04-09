import { Typography } from "@promentorapp/ui-kit";
import { PageForShell } from "@/shared/ui";
import { useRequestsPage } from "@/pages/requests/model/useRequestsPage";

export default function RequestsPage() {
  const { overview } = useRequestsPage();

  return (
    <PageForShell
      title="Requests"
      description="Track your request activity."
    >
      <section className="mt-6 rounded-xl border border-white/10 bg-slate-900/55 p-5">
        <Typography component="p" className="text-sm text-slate-300">
          Total requests: {overview.total}
        </Typography>
        <Typography component="p" className="mt-2 text-sm text-slate-300">
          Pending requests: {overview.pending}
        </Typography>
      </section>
    </PageForShell>
  );
}
