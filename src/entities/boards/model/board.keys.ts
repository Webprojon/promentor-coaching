export const tacticalBoardQueryKeys = {
  all: ["boards"] as const,
  list: () => [...tacticalBoardQueryKeys.all, "list"] as const,
  detail: (id: string) =>
    [...tacticalBoardQueryKeys.all, "detail", id] as const,
};
