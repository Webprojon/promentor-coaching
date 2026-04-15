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
import { PageHeader } from "@/shared/ui";

const normalizeIdPart = (id: string) => id.replace(/[^a-zA-Z0-9-_]/g, "-");

function RequestsPageContent({
  direction,
}: {
  direction: RequestInboxDirection;
}) {
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
      <PageHeader
        title="Requests"
        description="Move between sent and received mentor traffic, filter the list, and open a card for full context."
        className="mb-5"
      />
      <RequestsViewNav />

      {direction === "received" ? (
        <RequestsTabFilter
          idBase="requests-received-category"
          value={receivedCategoryFilter}
          onChange={setReceivedCategoryFilter}
          options={REQUEST_CATEGORY_FILTER_OPTIONS}
        />
      ) : (
        <RequestsTabFilter
          idBase="requests-sent-category"
          value={mentorSentFilter}
          onChange={setMentorSentFilter}
          options={MENTOR_SENT_FILTER_OPTIONS}
        />
      )}

      {direction === "received"
        ? REQUEST_CATEGORY_FILTER_OPTIONS.map((option) => {
            const optionIdPart = normalizeIdPart(option.value);
            const panelId = `requests-received-category-panel-${optionIdPart}`;
            const tabId = `requests-received-category-tab-${optionIdPart}`;
            const isActive = receivedCategoryFilter === option.value;

            return (
              <section
                key={option.value}
                id={panelId}
                role="tabpanel"
                aria-labelledby={tabId}
                hidden={!isActive}
              >
                {isActive &&
                  (isGridEmpty ? (
                    <RequestsEmptyCard {...emptyCard} />
                  ) : (
                    <section className="mt-6 grid gap-4 md:grid-cols-2">
                      {gridItems}
                    </section>
                  ))}
              </section>
            );
          })
        : MENTOR_SENT_FILTER_OPTIONS.map((option) => {
            const optionIdPart = normalizeIdPart(option.value);
            const panelId = `requests-sent-category-panel-${optionIdPart}`;
            const tabId = `requests-sent-category-tab-${optionIdPart}`;
            const isActive = mentorSentFilter === option.value;

            return (
              <section
                key={option.value}
                id={panelId}
                role="tabpanel"
                aria-labelledby={tabId}
                hidden={!isActive}
              >
                {isActive &&
                  (isGridEmpty ? (
                    <RequestsEmptyCard {...emptyCard} />
                  ) : (
                    <section className="mt-6 grid gap-4 md:grid-cols-2">
                      {gridItems}
                    </section>
                  ))}
              </section>
            );
          })}

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
    return <Navigate to={requestsPathForDirection("sent")} replace />;
  }
  return <RequestsPageContent direction={directionParam} />;
}
