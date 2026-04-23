export const mentorshipRequestQueryKeys = {
  all: ["mentorship-requests"] as const,
  received: () => [...mentorshipRequestQueryKeys.all, "received"] as const,
};
