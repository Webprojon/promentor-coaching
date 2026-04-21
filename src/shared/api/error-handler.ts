import { AxiosError } from "axios";
import {
  AppApiError,
  getApiErrorMessage,
} from "@/shared/api/errors";

export function axiosErrorToAppApiError(error: unknown): AppApiError {
  if (error instanceof AppApiError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 0;
    const payload = error.response?.data ?? null;
    return new AppApiError(getApiErrorMessage(payload), status, payload);
  }

  if (error instanceof Error) {
    return new AppApiError(error.message, 0, null);
  }

  return new AppApiError("Request failed. Please try again.", 0, null);
}
