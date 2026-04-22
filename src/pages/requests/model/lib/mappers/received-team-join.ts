import type { TeamJoinRequestInboxItem } from "@/entities/requests/model/team-join-request.types";
import { toRequestCardStatus } from "@/pages/requests/model/lib/inbox-request-status";
import type { RequestInboxRow } from "@/pages/requests/model/types";
import { formatRequestDateTime } from "@/shared/lib/format-request-datetime";

export function mapTeamJoinInboxItemToRow(
  item: TeamJoinRequestInboxItem,
): RequestInboxRow {
  const labelIso = item.createdAt ?? item.updatedAt ?? "";
  return {
    id: item.id,
    category: "team_join",
    direction: "received",
    title: `Join request for ${item.teamName}`,
    counterpartName: item.requesterName,
    summary: item.message?.trim() ? item.message : "—",
    status: toRequestCardStatus(item.status),
    createdLabel: formatRequestDateTime(labelIso),
    counterpartAvatarUrl: item.requesterAvatarUrl,
  };
}
