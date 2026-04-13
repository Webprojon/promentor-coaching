import { useMemo, useState } from "react";
import {
  MOCK_REQUEST_INBOX,
  REQUEST_DEFAULT_CATEGORY_FILTER,
} from "@/pages/mentorship-requests/model/constants";
import type {
  RequestCategoryFilter,
  RequestInboxDirection,
  RequestInboxRow,
  RequestsOverviewStats,
} from "@/pages/mentorship-requests/model/types";

function computeOverview(rows: RequestInboxRow[]): RequestsOverviewStats {
  let pending = 0;
  let accepted = 0;
  let declined = 0;
  let needsResponse = 0;
  for (const r of rows) {
    if (r.status === "Pending") {
      pending += 1;
      if (r.direction === "received") {
        needsResponse += 1;
      }
    } else if (r.status === "Accepted") {
      accepted += 1;
    } else {
      declined += 1;
    }
  }
  return { pending, accepted, declined, needsResponse };
}

export function useRequestsPage() {
  const rows = MOCK_REQUEST_INBOX;
  const [direction, setDirection] = useState<RequestInboxDirection>("sent");
  const [categoryFilter, setCategoryFilter] =
    useState<RequestCategoryFilter>(REQUEST_DEFAULT_CATEGORY_FILTER);

  const overview = useMemo(() => computeOverview(rows), [rows]);

  const filteredRows = useMemo(
    () =>
      rows.filter((r) => {
        if (r.direction !== direction) {
          return false;
        }
        if (categoryFilter !== "all" && r.category !== categoryFilter) {
          return false;
        }
        return true;
      }),
    [rows, direction, categoryFilter],
  );

  return {
    overview,
    direction,
    setDirection,
    categoryFilter,
    setCategoryFilter,
    filteredRows,
  };
}
