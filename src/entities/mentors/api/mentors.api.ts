import type { MentorExploreApiRow } from "@/entities/mentors/model/mentor.types";
import { apiRequest } from "@/shared/api/base.api";

export async function fetchMentors(): Promise<MentorExploreApiRow[]> {
  return apiRequest<MentorExploreApiRow[]>("/mentors", { method: "GET" });
}
