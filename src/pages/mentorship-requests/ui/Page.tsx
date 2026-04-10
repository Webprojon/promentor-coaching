import { Typography } from "@promentorapp/ui-kit";
import { PageForShell } from "@/shared/ui";
import { useRequestsPage } from "@/pages/mentorship-requests/model/useRequestsPage";
import { RequestInboxCard } from "@/pages/mentorship-requests/ui/components/RequestInboxCard";
import { RequestsCategoryFilter } from "@/pages/mentorship-requests/ui/components/RequestsCategoryFilter";
import { RequestsEmptyState } from "@/pages/mentorship-requests/ui/components/RequestsEmptyState";
import { RequestsSummaryStrip } from "@/pages/mentorship-requests/ui/components/RequestsSummaryStrip";
import { RequestsViewToggle } from "@/pages/mentorship-requests/ui/components/RequestsViewToggle";

export default function RequestsPage() {
  const {
    overview,
    direction,
    setDirection,
    categoryFilter,
    setCategoryFilter,
    filteredRows,
  } = useRequestsPage();

  return (
    <PageForShell
      title="Requests"
      description="One inbox for team joins, mentorship asks, and suggestions. Sent items show your outreach; received items are where mentors and leads accept or decline."
    >
      <RequestsSummaryStrip overview={overview} />

      <RequestsViewToggle
        direction={direction}
        onDirectionChange={setDirection}
      />

      <RequestsCategoryFilter
        value={categoryFilter}
        onChange={setCategoryFilter}
      />

      {filteredRows.length === 0 ? (
        <RequestsEmptyState
          direction={direction}
          categoryFilter={categoryFilter}
        />
      ) : (
        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-2">
          {filteredRows.map((row) => (
            <RequestInboxCard key={row.id} row={row} />
          ))}
        </section>
      )}

      <Typography
        component="p"
        className="mt-8 text-center text-xs text-slate-600"
      >
        Actions and live data are stubbed for now — this layout is ready to wire
        to your API.
      </Typography>
    </PageForShell>
  );
}
