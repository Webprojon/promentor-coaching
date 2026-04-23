import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/shared/api/errors";
import { toast } from "react-toastify";

function readErrorToastId(
  meta: { notifyErrorToastId?: string } | undefined,
): string | undefined {
  const id = meta?.notifyErrorToastId;
  return typeof id === "string" && id.length > 0 ? id : undefined;
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const toastId = readErrorToastId(query.meta);
      if (toastId) {
        toast.error(getErrorMessage(error), { toastId });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      const toastId = readErrorToastId(mutation.meta);
      if (toastId) {
        toast.error(getErrorMessage(error), { toastId });
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 30_000,
    },
    mutations: {
      retry: false,
    },
  },
});
