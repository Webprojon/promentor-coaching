export const profileQueryKeys = {
  all: ["profile"] as const,
  me: () => ["profile", "me"] as const,
};

export const userDirectoryQueryKeys = {
  all: ["users", "directory"] as const,
  regularUsers: () => [...userDirectoryQueryKeys.all, "regular"] as const,
};
