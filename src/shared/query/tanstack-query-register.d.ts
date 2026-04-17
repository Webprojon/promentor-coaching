export {};

declare module "@tanstack/query-core" {
  interface Register {
    queryMeta: {
      notifyErrorToastId?: string;
    };
    mutationMeta: {
      notifyErrorToastId?: string;
    };
  }
}
