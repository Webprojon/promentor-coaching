export const teamQueryKeys = {
  all: ["teams"] as const,
  list: () => [...teamQueryKeys.all, "list"] as const,
  explore: () => [...teamQueryKeys.all, "explore"] as const,
  detail: (teamId: string) => [...teamQueryKeys.all, "detail", teamId] as const,
};
