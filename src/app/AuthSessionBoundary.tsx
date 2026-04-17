import type { ReactNode } from "react";
import { Button, Typography } from "@promentorapp/ui-kit";
import {
  AUTH_SESSION_HYDRATING_TEXT,
  AUTH_SESSION_WAITING_TEXT,
  useHostAuthSession,
} from "@/features/auth";
import { getErrorMessage } from "@/shared/api/errors";

function AuthSessionStatus({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return (
    <section className={className} aria-live="polite" aria-atomic="true">
      <Typography component="p" variantStyle="body">
        {text}
      </Typography>
    </section>
  );
}

export default function AuthSessionBoundary({
  children,
}: {
  children: ReactNode;
}) {
  const {
    session,
    isBridgeAvailable,
    isHydrating,
    standaloneAuthError,
    retryStandaloneAuthLoad,
  } = useHostAuthSession();
  const showGuestState = isBridgeAvailable && !session.isAuthenticated;

  if (isHydrating) {
    return (
      <AuthSessionStatus
        text={AUTH_SESSION_HYDRATING_TEXT}
        className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-4 text-sm text-cyan-100"
      />
    );
  }

  if (standaloneAuthError && !isBridgeAvailable) {
    return (
      <section
        className="rounded-lg border border-red-300/30 bg-red-300/10 p-4 text-sm text-red-100"
        aria-live="assertive"
        aria-atomic="true"
      >
        <Typography component="p" variantStyle="body" className="mb-3">
          We could not verify your session with the server. You may be offline,
          or the service may be temporarily unavailable.
        </Typography>
        <Typography
          component="p"
          variantStyle="body"
          className="mb-4 opacity-90"
        >
          {getErrorMessage(standaloneAuthError)}
        </Typography>
        <Button
          variant="outlined"
          type="button"
          onClick={retryStandaloneAuthLoad}
        >
          Try again
        </Button>
      </section>
    );
  }

  if (!showGuestState) {
    return children;
  }

  return (
    <AuthSessionStatus
      text={AUTH_SESSION_WAITING_TEXT}
      className="rounded-lg border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100"
    />
  );
}
