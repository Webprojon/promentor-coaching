import { Navigate, useParams } from "react-router-dom";
import {
  isRequestInboxDirection,
  MENTOR_SENT_FILTER_OPTIONS,
  REQUEST_CATEGORY_FILTER_OPTIONS,
  requestsPathForDirection,
} from "@/pages/requests/model/constants";
import { useRequestsPage } from "@/pages/requests/model/useRequestsPage";
import type { RequestInboxDirection } from "@/pages/requests/model/types";
import {
  RequestCard,
  RequestSendModal,
  RequestSlotCard,
  RequestsEmptyCard,
  RequestsTabFilter,
  RequestsViewNav,
} from "@/pages/requests/ui/components";

function RequestsPageContent({ direction }: { direction: RequestInboxDirection }) {
  const {
    receivedCategoryFilter,
    setReceivedCategoryFilter,
    mentorSentFilter,
    setMentorSentFilter,
    receivedCardRows,
    mentorSentCardRows,
    slotCardViewModel,
    createModalKind,
    setCreateModalKind,
    isGridEmpty,
    emptyCard,
  } = useRequestsPage(direction);

  const gridItems =
    direction === "received"
      ? receivedCardRows.map((viewModel) => (
          <RequestCard key={viewModel.id} viewModel={viewModel} />
        ))
      : [
          ...mentorSentCardRows.map((viewModel) => (
            <RequestCard key={viewModel.id} viewModel={viewModel} />
          )),
          ...(slotCardViewModel
            ? [
                <RequestSlotCard
                  key="create-slot"
                  viewModel={slotCardViewModel}
                  onClick={() =>
                    setCreateModalKind(slotCardViewModel.targetKind)
                  }
                />,
              ]
            : []),
        ];

  return (
    <>
      <RequestsViewNav />

      {direction === "received" ? (
        <RequestsTabFilter
          value={receivedCategoryFilter}
          onChange={setReceivedCategoryFilter}
          options={REQUEST_CATEGORY_FILTER_OPTIONS}
        />
      ) : (
        <RequestsTabFilter
          value={mentorSentFilter}
          onChange={setMentorSentFilter}
          options={MENTOR_SENT_FILTER_OPTIONS}
        />
      )}

      {isGridEmpty ? (
        <RequestsEmptyCard {...emptyCard} />
      ) : (
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {gridItems}
        </section>
      )}

      {createModalKind ? (
        <RequestSendModal
          open
          targetKind={createModalKind}
          onClose={() => setCreateModalKind(null)}
        />
      ) : null}
    </>
  );
}

export default function RequestsPage() {
  const { direction: directionParam } = useParams<{ direction: string }>();
  if (!directionParam || !isRequestInboxDirection(directionParam)) {
    return (
      <Navigate to={requestsPathForDirection("sent")} replace />
    );
  }
  return <RequestsPageContent direction={directionParam} />;
}
