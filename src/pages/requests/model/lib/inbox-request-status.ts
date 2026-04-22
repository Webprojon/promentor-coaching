import type { RequestStatus } from "@/shared/model/types";

export function toRequestCardStatus(
  s: "PENDING" | "ACCEPTED" | "REJECTED",
): RequestStatus {
  if (s === "PENDING") {
    return "Pending";
  }
  if (s === "ACCEPTED") {
    return "Accepted";
  }
  return "Declined";
}
