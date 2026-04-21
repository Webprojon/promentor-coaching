import type { TeamJoinRequestInboxItem } from "@/entities/team-join-request/model/team-join-request.types";
import { apiRequest } from "@/shared/api/base-api";

export async function fetchReceivedTeamJoinRequests(): Promise<
  TeamJoinRequestInboxItem[]
> {
  return apiRequest<TeamJoinRequestInboxItem[]>(
    "/team-join-requests/received",
    { method: "GET" },
  );
}

export async function decideTeamJoinRequest(
  requestId: string,
  action: "accept" | "reject",
): Promise<void> {
  await apiRequest<unknown>(`/team-join-requests/${requestId}`, {
    method: "PATCH",
    body: { action },
  });
}
