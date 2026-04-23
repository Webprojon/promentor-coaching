export const exploreTeamsQueryKeys = {
  all: ["explore-teams"] as const,
  list: () => [...exploreTeamsQueryKeys.all, "list"] as const,
};
