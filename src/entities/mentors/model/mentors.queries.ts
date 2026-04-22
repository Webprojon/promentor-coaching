import { useQuery } from "@tanstack/react-query";
import { fetchMentors } from "@/entities/mentors/api/mentors.api";
import { mentorQueryKeys } from "@/entities/mentors/model/mentor.keys";

export function useMentorsQuery(enabled: boolean) {
  return useQuery({
    queryKey: mentorQueryKeys.list(),
    queryFn: fetchMentors,
    enabled,
    staleTime: 30000,
    meta: { notifyErrorToastId: "mentors-list" },
  });
}
