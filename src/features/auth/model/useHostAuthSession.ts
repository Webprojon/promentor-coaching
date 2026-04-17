import { useCallback, useEffect, useRef, useState } from "react";
import type {
  HostAuthBridge,
  HostAuthSession,
} from "@/features/auth/model/types";
import {
  fetchCurrentUser,
  normalizeCurrentUser,
} from "@/shared/api/current-user";
import { AppApiError } from "@/shared/api/errors";
import { profileQueryKeys } from "@/shared/query/profileQueryKeys";
import { queryClient } from "@/shared/query/queryClient";

const fallbackSession: HostAuthSession = {
  isAuthenticated: false,
  user: null,
};

const STANDALONE_AUTH_MAX_ATTEMPTS = 3;
const STANDALONE_AUTH_BASE_DELAY_MS = 400;

type LoadFallbackSessionResult =
  | { ok: true; session: HostAuthSession }
  | { ok: false; error: unknown };

function isRetryableStandaloneAuthError(error: unknown): boolean {
  if (error instanceof AppApiError) {
    if (error.status === 401) {
      return false;
    }
    if (error.status === 0) {
      return true;
    }
    return error.status >= 500 && error.status < 600;
  }
  return false;
}

async function loadFallbackSession(): Promise<LoadFallbackSessionResult> {
  let lastError: unknown;

  for (let attempt = 0; attempt < STANDALONE_AUTH_MAX_ATTEMPTS; attempt++) {
    try {
      const profile = await fetchCurrentUser();
      queryClient.setQueryData(profileQueryKeys.me(), profile);
      return {
        ok: true,
        session: {
          isAuthenticated: true,
          user: profile,
        },
      };
    } catch (error) {
      lastError = error;
      if (error instanceof AppApiError && error.status === 401) {
        return { ok: true, session: fallbackSession };
      }

      const canRetry =
        attempt < STANDALONE_AUTH_MAX_ATTEMPTS - 1 &&
        isRetryableStandaloneAuthError(error);
      if (canRetry) {
        await new Promise((resolve) =>
          setTimeout(resolve, STANDALONE_AUTH_BASE_DELAY_MS * (attempt + 1)),
        );
        continue;
      }

      return { ok: false, error: lastError };
    }
  }

  return { ok: false, error: lastError };
}

let bridgeLoadPromise: Promise<HostAuthBridge | null> | null = null;

export async function loadHostAuthBridge(): Promise<HostAuthBridge | null> {
  if (!bridgeLoadPromise) {
    bridgeLoadPromise = import("shell/authBridge")
      .then((module) => {
        const mod = module as {
          authBridge?: HostAuthBridge;
          default?: HostAuthBridge | { authBridge?: HostAuthBridge };
        };
        const candidate =
          mod.authBridge ??
          (typeof mod.default === "object" && mod.default !== null
            ? "authBridge" in mod.default
              ? (mod.default.authBridge ?? null)
              : (mod.default as HostAuthBridge)
            : null);

        if (candidate) {
          return candidate;
        }
        return null;
      })
      .catch(() => {
        bridgeLoadPromise = null;
        return null;
      });
  }

  return bridgeLoadPromise;
}

export function useHostAuthSession() {
  const [session, setSession] = useState<HostAuthSession>(fallbackSession);
  const [isBridgeAvailable, setIsBridgeAvailable] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);
  const [standaloneAuthError, setStandaloneAuthError] = useState<unknown>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    void loadHostAuthBridge().then((bridge) => {
      if (!mountedRef.current) {
        return;
      }

      if (bridge) {
        setIsBridgeAvailable(true);
        setStandaloneAuthError(null);
        const initialSession = bridge.getSession();
        if (initialSession.isAuthenticated && initialSession.user) {
          const profile = normalizeCurrentUser(initialSession.user);
          if (profile) {
            queryClient.setQueryData(profileQueryKeys.me(), profile);
          }
        }
        setSession(initialSession);
        unsubscribe = bridge.subscribe((nextSession) => {
          setSession(nextSession);
        });
        setIsHydrating(false);
        return;
      }

      void loadFallbackSession().then((result) => {
        if (!mountedRef.current) {
          return;
        }

        if (result.ok) {
          setStandaloneAuthError(null);
          setSession(result.session);
        } else {
          setStandaloneAuthError(result.error);
        }
        setIsHydrating(false);
      });
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const retryStandaloneAuthLoad = useCallback(() => {
    if (isBridgeAvailable) {
      return;
    }
    setStandaloneAuthError(null);
    setIsHydrating(true);
    void loadFallbackSession().then((result) => {
      if (!mountedRef.current) {
        return;
      }
      if (result.ok) {
        setStandaloneAuthError(null);
        setSession(result.session);
      } else {
        setStandaloneAuthError(result.error);
      }
      setIsHydrating(false);
    });
  }, [isBridgeAvailable]);

  return {
    session,
    isBridgeAvailable,
    isHydrating,
    standaloneAuthError,
    retryStandaloneAuthLoad,
  };
}
