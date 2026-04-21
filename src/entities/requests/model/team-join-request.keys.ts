export const teamJoinRequestQueryKeys = {
  all: ["team-join-requests"] as const,
  received: () => [...teamJoinRequestQueryKeys.all, "received"] as const,
};
