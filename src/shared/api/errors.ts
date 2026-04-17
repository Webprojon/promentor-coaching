export class AppApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details: unknown,
  ) {
    super(message);
    this.name = "AppApiError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((entry): entry is string => typeof entry === "string");
}

export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
) {
  if (error instanceof AppApiError) {
    return error.message;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  if (isRecord(error) && typeof error.message === "string") {
    return error.message;
  }

  return fallback;
}

export function getApiErrorMessage(
  payload: unknown,
  fallback = "Request failed. Please try again.",
) {
  if (!isRecord(payload)) {
    return fallback;
  }

  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const errors = toStringList(payload.errors);

  if (errors.length > 0) {
    if (message && !errors.includes(message)) {
      return `${message} ${errors.join(" ")}`.trim();
    }
    return errors.join(" ");
  }

  if (message) {
    return message;
  }

  return fallback;
}
