import { useEffect, useState } from "react";
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

async function loadFallbackSession(): Promise<HostAuthSession> {
  try {
    const profile = await fetchCurrentUser();
    queryClient.setQueryData(profileQueryKeys.me(), profile);
    return {
      isAuthenticated: true,
      user: profile,
    };
  } catch (error) {
    if (error instanceof AppApiError && error.status === 401) {
      return fallbackSession;
    }
    return fallbackSession;
  }
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

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | null = null;

    void loadHostAuthBridge().then((bridge) => {
      if (!isMounted) {
        return;
      }

      if (bridge) {
        setIsBridgeAvailable(true);
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

      void loadFallbackSession().then((nextSession) => {
        if (!isMounted) {
          return;
        }

        setSession(nextSession);
        setIsHydrating(false);
      });
    });

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return { session, isBridgeAvailable, isHydrating };
}
