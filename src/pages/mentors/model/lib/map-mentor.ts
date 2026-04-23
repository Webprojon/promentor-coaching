import type { MentorExploreApiRow } from "@/entities/mentors/model/mentor.types";
import type { Mentor } from "@/pages/mentors/model/types";

function apiStatusToCard(
  s: MentorExploreApiRow["requestStatus"],
): Mentor["requestStatus"] {
  if (s === "NONE") return "NotRequested";
  if (s === "PENDING") return "Pending";
  if (s === "ACCEPTED") return "Accepted";
  return "Declined";
}

export function mapMentorFromApi(row: MentorExploreApiRow): Mentor {
  const focus = row.jobTitle?.trim() || "Mentor";
  return {
    id: row.id,
    name: row.fullName,
    avatarUrl: row.avatarUrl ?? "",
    expertiseLabel: focus,
    sessions: row.sessionsThisWeek,
    availability: row.availabilityLabel,
    linkedTeams: row.linkedTeams,
    requestStatus: apiStatusToCard(row.requestStatus),
    mentorshipRequestId: row.mentorshipRequestId,
  };
}
