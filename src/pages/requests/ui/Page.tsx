import { useState } from "react";
import {
  MENTOR_SENT_FILTER_OPTIONS,
  REQUEST_CATEGORY_FILTER_OPTIONS,
} from "@/pages/requests/model/constants";
import { useRequestsPage } from "@/pages/requests/model/useRequestsPage";
import type { MentorSentTargetKind } from "@/pages/requests/model/types";
import { CreateMentorRequestModal } from "@/pages/requests/ui/components/CreateMentorRequestModal";
import { CreateMentorRequestSlotCard } from "@/pages/requests/ui/components/CreateMentorRequestSlotCard";
import { MentorSentRequestCard } from "@/pages/requests/ui/components/MentorSentRequestCard";
import { RequestInboxCard } from "@/pages/requests/ui/components/RequestInboxCard";
import { RequestsEmptyState } from "@/pages/requests/ui/components/RequestsEmptyState";
import { RequestsPillFilter } from "@/pages/requests/ui/components/RequestsPillFilter";
import { RequestsViewToggle } from "@/pages/requests/ui/components/RequestsViewToggle";
import { PageForShell } from "@/shared/ui";

export default function RequestsPage() {
  const {
    direction,
    setDirection,
    receivedCategoryFilter,
    setReceivedCategoryFilter,
    mentorSentFilter,
    setMentorSentFilter,
    filteredReceivedRows,
    filteredMentorSentRows,
  } = useRequestsPage();

  const [createModalKind, setCreateModalKind] =
    useState<MentorSentTargetKind | null>(null);

  const showMentorCreateSlot =
    direction === "sent" && mentorSentFilter !== "all";

  const receivedCards = filteredReceivedRows.map((row) => (
    <RequestInboxCard key={row.id} row={row} />
  ));

  const sentCards = [
    ...filteredMentorSentRows.map((row) => (
      <MentorSentRequestCard key={row.id} row={row} />
    )),
    ...(showMentorCreateSlot
      ? [
          <CreateMentorRequestSlotCard
            key="create-slot"
            targetKind={mentorSentFilter}
            onClick={() => setCreateModalKind(mentorSentFilter)}
          />,
        ]
      : []),
  ];

  const gridItems = direction === "received" ? receivedCards : sentCards;
  const isEmpty = gridItems.length === 0;

  return (
    <PageForShell
      title="Requests"
      description="Received keeps joins, mentorship asks, and suggestions awaiting your answer — members often share suggestions with mentors out of respect. Sent is for your own requests to teams, interns, boards, and workout plans."
    >
      <RequestsViewToggle direction={direction} onDirectionChange={setDirection} />

      {direction === "received" ? (
        <RequestsPillFilter
          value={receivedCategoryFilter}
          onChange={setReceivedCategoryFilter}
          options={REQUEST_CATEGORY_FILTER_OPTIONS}
          sectionTitle="Request type"
          ariaLabel="Filter by request category"
        />
      ) : (
        <RequestsPillFilter
          value={mentorSentFilter}
          onChange={setMentorSentFilter}
          options={MENTOR_SENT_FILTER_OPTIONS}
          sectionTitle="Request type"
          ariaLabel="Filter mentor requests by destination"
        />
      )}

      {isEmpty ? (
        <RequestsEmptyState
          direction={direction}
          categoryFilter={receivedCategoryFilter}
          mentorSentFilter={mentorSentFilter}
        />
      ) : (
        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-2">
          {gridItems}
        </section>
      )}

      {createModalKind ? (
        <CreateMentorRequestModal
          open
          targetKind={createModalKind}
          onClose={() => setCreateModalKind(null)}
        />
      ) : null}
    </PageForShell>
  );
}
