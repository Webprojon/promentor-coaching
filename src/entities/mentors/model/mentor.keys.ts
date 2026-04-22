export const mentorQueryKeys = {
  all: ["mentors"] as const,
  list: () => [...mentorQueryKeys.all, "list"] as const,
};
