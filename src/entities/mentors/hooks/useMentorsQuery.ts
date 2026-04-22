import { useQuery } from "@tanstack/react-query";
import { fetchMentors } from "@/entities/mentors/api/mentors-api";
import { mentorQueryKeys } from "@/entities/mentors/model/mentor.keys";

const STALE_MS = 30_000;

export function useMentorsQuery(enabled: boolean) {
  return useQuery({
    queryKey: mentorQueryKeys.list(),
    queryFn: fetchMentors,
    enabled,
    staleTime: STALE_MS,
    meta: { notifyErrorToastId: "mentors-list" },
  });
}
