import type { ReactNode } from "react";
import { Typography } from "@promentorapp/ui-kit";
import {
  AUTH_SESSION_HYDRATING_TEXT,
  AUTH_SESSION_WAITING_TEXT,
  useHostAuthSession,
} from "@/features/auth";

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
  const { session, isBridgeAvailable, isHydrating } = useHostAuthSession();
  const showGuestState = isBridgeAvailable && !session.isAuthenticated;

  if (isHydrating) {
    return (
      <AuthSessionStatus
        text={AUTH_SESSION_HYDRATING_TEXT}
        className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-4 text-sm text-cyan-100"
      />
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
