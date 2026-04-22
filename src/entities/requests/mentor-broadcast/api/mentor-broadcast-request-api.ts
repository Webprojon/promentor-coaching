import type {
  CreateMentorBroadcastRequestBody,
  MentorBroadcastRequestSentItem,
  MentorBroadcastTargetOption,
} from "@/entities/requests/mentor-broadcast/model/mentor-broadcast-request.types";
import { apiRequest } from "@/shared/api/base-api";

export async function fetchSentMentorBroadcastRequests(): Promise<
  MentorBroadcastRequestSentItem[]
> {
  return apiRequest<MentorBroadcastRequestSentItem[]>(
    "/mentor-broadcast-requests/sent",
    { method: "GET" },
  );
}

export async function createMentorBroadcastRequest(
  body: CreateMentorBroadcastRequestBody,
): Promise<MentorBroadcastRequestSentItem> {
  return apiRequest<MentorBroadcastRequestSentItem>(
    "/mentor-broadcast-requests",
    { method: "POST", body },
  );
}

export async function cancelMentorBroadcastRequest(
  requestId: string,
): Promise<void> {
  await apiRequest<unknown>(`/mentor-broadcast-requests/${requestId}`, {
    method: "DELETE",
  });
}

export async function fetchMentorBroadcastTargets(
  kind: "interns" | "boards",
): Promise<MentorBroadcastTargetOption[]> {
  const res = await apiRequest<{ items: MentorBroadcastTargetOption[] }>(
    `/mentor-broadcast-requests/targets?kind=${encodeURIComponent(kind)}`,
    { method: "GET" },
  );
  return res.items;
}
