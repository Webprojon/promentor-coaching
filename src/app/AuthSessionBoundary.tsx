import type { ReactNode } from "react";
import { Typography } from "@promentorapp/ui-kit";
import {
  AUTH_SESSION_ENDED_DESCRIPTION,
  AUTH_SESSION_ENDED_TITLE,
  AUTH_SESSION_WAITING_TEXT,
  useHostAuthSession,
} from "../shared/auth";
import PageForShell from "../shared/ui/page-for-shell/PageForShell";

type AuthSessionBoundaryProps = {
  children: ReactNode;
};

export default function AuthSessionBoundary({
  children,
}: AuthSessionBoundaryProps) {
  const { session, isBridgeAvailable } = useHostAuthSession();
  const showGuestState = isBridgeAvailable && !session.isAuthenticated;

  if (!showGuestState) {
    return children;
  }

  return (
    <PageForShell
      title={AUTH_SESSION_ENDED_TITLE}
      description={AUTH_SESSION_ENDED_DESCRIPTION}
    >
      <div className="mt-4 rounded-xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">
        <Typography component="p" variantStyle="body" className="text-amber-100">
          {AUTH_SESSION_WAITING_TEXT}
        </Typography>
      </div>
    </PageForShell>
  );
}
