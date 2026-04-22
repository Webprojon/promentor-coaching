import type { MentorshipRequestInboxItem } from "@/entities/requests/model/mentorship-request.types";
import { apiRequest } from "@/shared/api/base.api";

export type CreateMentorshipRequestBody = {
  mentorId: string;
  message?: string;
};

export async function fetchReceivedMentorshipRequests(): Promise<
  MentorshipRequestInboxItem[]
> {
  return apiRequest<MentorshipRequestInboxItem[]>(
    "/mentorship-requests/received",
    { method: "GET" },
  );
}

export async function createMentorshipRequest(
  body: CreateMentorshipRequestBody,
): Promise<{ id: string; status: string }> {
  return apiRequest<{ id: string; status: string }>("/mentorship-requests", {
    method: "POST",
    body,
  });
}

export async function decideMentorshipRequest(
  requestId: string,
  action: "accept" | "reject",
): Promise<void> {
  await apiRequest<unknown>(`/mentorship-requests/${requestId}`, {
    method: "PATCH",
    body: { action },
  });
}

export async function deleteMentorshipRequest(
  requestId: string,
): Promise<void> {
  await apiRequest<unknown>(`/mentorship-requests/${requestId}`, {
    method: "DELETE",
  });
}
