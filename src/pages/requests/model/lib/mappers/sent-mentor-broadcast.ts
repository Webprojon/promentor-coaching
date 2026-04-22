import type { MentorBroadcastRequestSentItem } from "@/entities/requests/model/mentorBroadcastRequest.types";
import { MENTOR_SENT_KIND_META } from "@/pages/requests/model/constants/mentor-sent";
import type {
  MentorSentRequestRow,
  MentorSentTargetKind,
} from "@/pages/requests/model/types";
import { formatRequestDateTime } from "@/shared/lib/format-request-datetime";

function scopeToTargetKind(
  scope: MentorBroadcastRequestSentItem["scope"],
): MentorSentTargetKind {
  switch (scope) {
    case "TEAM":
      return "teams";
    case "INTERN":
      return "interns";
    case "BOARD":
      return "boards";
  }
}

export function mapMentorBroadcastToSentRow(
  item: MentorBroadcastRequestSentItem,
  onCancel: (id: string) => Promise<void>,
): MentorSentRequestRow {
  const targetKind = scopeToTargetKind(item.scope);
  const short = MENTOR_SENT_KIND_META[targetKind].shortLabel;
  return {
    id: item.id,
    targetKind,
    title: item.contextLine
      ? `${item.targetLabel} · ${item.contextLine}`
      : `${short} request · ${item.targetLabel}`,
    counterpartName: item.targetLabel,
    summary: item.body,
    createdLabel: formatRequestDateTime(item.createdAt),
    onCancelRequest: () => onCancel(item.id),
  };
}
