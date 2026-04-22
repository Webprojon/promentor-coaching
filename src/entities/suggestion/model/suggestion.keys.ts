export const suggestionQueryKeys = {
  all: ["suggestions", "data"] as const,
  my: () => [...suggestionQueryKeys.all, "my"] as const,
  mentorTargets: () => [...suggestionQueryKeys.all, "mentor-targets"] as const,
  boardTargets: () => [...suggestionQueryKeys.all, "board-targets"] as const,
  received: () => [...suggestionQueryKeys.all, "received"] as const,
};
