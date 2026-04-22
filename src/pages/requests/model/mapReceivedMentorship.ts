import type { MentorshipRequestInboxItem } from "@/entities/requests/model/mentorship-request.types";
import { toRequestCardStatus } from "@/pages/requests/model/inbox-request-status";
import type { RequestInboxRow } from "@/pages/requests/model/types";
import { formatRequestDateTime } from "@/shared/lib/format-request-datetime";

export function mapMentorshipInboxItemToRow(
  item: MentorshipRequestInboxItem,
): RequestInboxRow {
  const labelIso = item.createdAt ?? item.updatedAt ?? "";
  return {
    id: item.id,
    category: "mentorship",
    direction: "received",
    title: `Mentorship · ${item.menteeName}`,
    counterpartName: item.menteeName,
    summary: item.message?.trim() ? item.message : "—",
    status: toRequestCardStatus(item.status),
    createdLabel: formatRequestDateTime(labelIso),
    counterpartAvatarUrl: item.menteeAvatarUrl,
  };
}
