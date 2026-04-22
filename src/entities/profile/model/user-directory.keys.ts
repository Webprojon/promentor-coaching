export const userDirectoryQueryKeys = {
  all: ["users", "directory"] as const,
  regularUsers: () => [...userDirectoryQueryKeys.all, "regular"] as const,
};
