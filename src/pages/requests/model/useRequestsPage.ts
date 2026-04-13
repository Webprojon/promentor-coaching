import { useMemo, useState } from "react";
import {
  MENTOR_SENT_DEFAULT_FILTER,
  MOCK_MENTOR_SENT_REQUESTS,
  MOCK_REQUEST_INBOX,
  REQUEST_DEFAULT_CATEGORY_FILTER,
} from "@/pages/requests/model/constants";
import type {
  MentorSentFilter,
  RequestCategoryFilter,
  RequestInboxDirection,
} from "@/pages/requests/model/types";

export function useRequestsPage() {
  const inboxRows = MOCK_REQUEST_INBOX;
  const mentorSentRows = MOCK_MENTOR_SENT_REQUESTS;

  const [direction, setDirection] = useState<RequestInboxDirection>("sent");
  const [receivedCategoryFilter, setReceivedCategoryFilter] =
    useState<RequestCategoryFilter>(REQUEST_DEFAULT_CATEGORY_FILTER);
  const [mentorSentFilter, setMentorSentFilter] =
    useState<MentorSentFilter>(MENTOR_SENT_DEFAULT_FILTER);

  const filteredReceivedRows = useMemo(
    () =>
      inboxRows.filter((r) => {
        if (r.direction !== "received") {
          return false;
        }
        if (
          receivedCategoryFilter !== "all" &&
          r.category !== receivedCategoryFilter
        ) {
          return false;
        }
        return true;
      }),
    [inboxRows, receivedCategoryFilter],
  );

  const filteredMentorSentRows = useMemo(() => {
    if (mentorSentFilter === "all") {
      return mentorSentRows;
    }
    return mentorSentRows.filter((r) => r.targetKind === mentorSentFilter);
  }, [mentorSentRows, mentorSentFilter]);

  return {
    direction,
    setDirection,
    receivedCategoryFilter,
    setReceivedCategoryFilter,
    mentorSentFilter,
    setMentorSentFilter,
    filteredReceivedRows,
    filteredMentorSentRows,
  };
}
