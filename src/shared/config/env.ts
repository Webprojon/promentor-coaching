const DEFAULT_LOCAL_API_ORIGIN = "http://localhost:3000";

function normalizeTrustedHttpOrigin(raw: string): string {
  const trimmed = raw.trim().replace(/\/$/, "");
  if (!trimmed) {
    return "";
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "";
    }
    return parsed.origin;
  } catch {
    return "";
  }
}

function isCoachingLocalStandalone(): boolean {
  if (typeof globalThis === "undefined" || !("location" in globalThis)) {
    return false;
  }
  const loc = (globalThis as { location: Location }).location;
  if (loc.hostname !== "localhost" && loc.hostname !== "127.0.0.1") {
    return false;
  }
  return loc.port === "4175";
}

function resolveApiBaseUrl(): string {
  const fromEnv = normalizeTrustedHttpOrigin(
    String(import.meta.env.VITE_API_URL ?? ""),
  );
  if (fromEnv) {
    return fromEnv;
  }
  if (import.meta.env.DEV || isCoachingLocalStandalone()) {
    return DEFAULT_LOCAL_API_ORIGIN;
  }
  if (typeof globalThis !== "undefined" && "location" in globalThis) {
    const origin = (
      globalThis as unknown as { location?: { origin?: string } }
    ).location?.origin;
    if (origin) {
      return normalizeTrustedHttpOrigin(origin);
    }
  }
  return "";
}

export const env = {
  apiBaseUrl: resolveApiBaseUrl(),
  isProd: import.meta.env.PROD,
} as const;
