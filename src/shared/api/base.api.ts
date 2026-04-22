import type { AxiosRequestConfig } from "axios";
import { apiClient } from "@/shared/api/axios-instance";
import {
  AppApiError,
  axiosErrorToAppApiError,
  getApiErrorMessage,
} from "@/shared/api/errors";
import { env } from "@/shared/config/env";

const MAX_PATH_LENGTH = 8192;
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

function hasAsciiControlOrDelete(path: string): boolean {
  for (let i = 0; i < path.length; i += 1) {
    const code = path.charCodeAt(i);
    if (code <= 0x1f || code === 0x7f) {
      return true;
    }
  }
  return false;
}

function assertSafeRelativePath(path: string): void {
  if (path.length === 0 || path.length > MAX_PATH_LENGTH) {
    throw new AppApiError("Invalid request path", 0, null);
  }
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new AppApiError("Invalid request path", 0, null);
  }
  if (path.includes("..") || path.includes("\\")) {
    throw new AppApiError("Invalid request path", 0, null);
  }
  if (hasAsciiControlOrDelete(path)) {
    throw new AppApiError("Invalid request path", 0, null);
  }
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

let refreshInFlight: Promise<boolean> | null = null;

async function refreshSession(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = rawRequest(AUTH_REFRESH_PATH, { method: "POST" })
      .then((res) => res.status >= 200 && res.status < 300)
      .catch(() => false)
      .finally(() => {
        refreshInFlight = null;
      });
  }

  return refreshInFlight;
}

async function requestWithRefresh(path: string, options: RequestOptions = {}) {
  const response = await rawRequest(path, options);
  if (response.status !== 401 || SKIP_REFRESH_PATHS.has(path)) {
    return response;
  }

  const refreshSucceeded = await refreshSession();
  if (!refreshSucceeded) {
    return response;
  }

  return rawRequest(path, options);
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  assertSafeRelativePath(path);
  if (env.isProd && !env.apiBaseUrl) {
    throw new AppApiError("API URL is not configured", 0, null);
  }
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
    throw axiosErrorToAppApiError(error);
  }
}
