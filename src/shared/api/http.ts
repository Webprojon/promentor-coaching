import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { AppApiError, getApiErrorMessage } from "@/shared/api/errors";

function resolveApiBaseUrl(): string {
  const fromEnv = (import.meta.env.VITE_API_URL ?? "")
    .trim()
    .replace(/\/$/, "");
  if (fromEnv) {
    return fromEnv;
  }

  if (typeof globalThis !== "undefined" && "location" in globalThis) {
    const origin = (globalThis as unknown as { location?: { origin?: string } })
      .location?.origin;
    if (origin) {
      return origin.replace(/\/$/, "");
    }
  }

  return "";
}

const API_BASE_URL = resolveApiBaseUrl();
const AUTH_REFRESH_PATH = "/auth/refresh";
const SKIP_REFRESH_PATHS = new Set([
  AUTH_REFRESH_PATH,
  "/auth/login",
  "/auth/register",
  "/auth/logout",
]);

type RequestOptions = Omit<AxiosRequestConfig, "url" | "data"> & {
  body?: unknown;
};
const apiClient = axios.create({
  baseURL: API_BASE_URL || undefined,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

function toAppApiError(error: unknown): AppApiError {
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

async function rawRequest(
  path: string,
  { body, headers, ...init }: RequestOptions = {},
) {
  return apiClient.request({
    ...init,
    url: path,
    headers,
    data: body,
    validateStatus: () => true,
  });
}

async function requestWithRefresh(path: string, options: RequestOptions = {}) {
  const response = await rawRequest(path, options);
  if (response.status !== 401 || SKIP_REFRESH_PATHS.has(path)) {
    return response;
  }

  const refreshResponse = await rawRequest(AUTH_REFRESH_PATH, {
    method: "POST",
  }).catch(() => null);

  if (
    !refreshResponse ||
    refreshResponse.status < 200 ||
    refreshResponse.status >= 300
  ) {
    return response;
  }

  return rawRequest(path, options);
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  try {
    const response = await requestWithRefresh(path, options);
    const payload = response.data ?? null;

    if (response.status < 200 || response.status >= 300) {
      throw new AppApiError(
        getApiErrorMessage(payload),
        response.status,
        payload,
      );
    }

    return payload as T;
  } catch (error) {
    throw toAppApiError(error);
  }
}
