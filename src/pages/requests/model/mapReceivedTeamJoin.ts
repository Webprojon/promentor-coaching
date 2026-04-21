import type { TeamJoinRequestInboxItem } from "@/entities/requests/model/team-join-request.types";
import { formatRequestDateTime } from "@/shared/lib/format-request-datetime";
import type { RequestInboxRow } from "@/pages/requests/model/types";
import type { RequestStatus } from "@/shared/model/types";

function inboxStatusToCardStatus(
  s: TeamJoinRequestInboxItem["status"],
): RequestStatus {
  if (s === "PENDING") {
    return "Pending";
  }
  if (s === "ACCEPTED") {
    return "Accepted";
  }
  return "Declined";
}

export function mapTeamJoinInboxItemToRow(
  item: TeamJoinRequestInboxItem,
): RequestInboxRow {
  const labelIso = item.updatedAt ?? item.createdAt;
  return {
    id: item.id,
    category: "team_join",
    direction: "received",
    title: `Join request for ${item.teamName}`,
    counterpartName: item.requesterName,
    summary: item.message?.trim() ? item.message : "—",
    status: inboxStatusToCardStatus(item.status),
    createdLabel: formatRequestDateTime(labelIso),
    counterpartAvatarUrl: item.requesterAvatarUrl,
  };
}
