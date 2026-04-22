import type { UserSuggestionInbox } from "@/entities/suggestion/model/suggestion.types";
import type { RequestInboxRow } from "@/pages/requests/model/types";
import { formatRequestDateTime } from "@/shared/lib/format-request-datetime";

export function mapReceivedUserSuggestionToRow(
  item: UserSuggestionInbox,
): RequestInboxRow {
  const labelIso = item.createdAt ?? item.updatedAt ?? "";
  return {
    id: item.id,
    category: "suggestion",
    direction: "received",
    title: item.title,
    counterpartName: item.sender.fullName,
    summary: item.detail?.trim() ? item.detail : "—",
    status: "Delivered",
    createdLabel: formatRequestDateTime(labelIso),
    counterpartAvatarUrl: item.sender.avatarUrl,
    priorityLevel: item.priority,
  };
}
