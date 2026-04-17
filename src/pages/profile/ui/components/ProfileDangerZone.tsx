import { Button, Typography } from "@promentorapp/ui-kit";
import { RiAlarmWarningLine } from "react-icons/ri";
import type { ProfileDangerZoneProps } from "@/pages/profile/model/types";

export function ProfileDangerZone({
  isDisabled,
  isDeleting,
  onOpenDeleteConfirm,
}: ProfileDangerZoneProps) {
  return (
    <section className="rounded-lg border border-rose-500/40 bg-linear-to-b from-rose-500/10 to-slate-950/80 p-5 shadow-[0_12px_30px_rgba(2,6,23,0.35)] backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <RiAlarmWarningLine className="text-lg text-rose-200" aria-hidden />
        <Typography
          component="h3"
          className="text-sm! font-bold uppercase tracking-wider text-rose-200"
        >
          Danger Zone
        </Typography>
      </div>
      <Typography component="p" className="mt-1 text-sm text-rose-100/80">
        Permanently remove your profile and all account data.
      </Typography>
      <div className="mt-4">
        <Button
          type="button"
          variant="contained"
          disabled={isDisabled || isDeleting}
          onClick={onOpenDeleteConfirm}
          className="bg-rose-600! hover:bg-rose-500! focus-visible:ring-rose-400/60!"
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </Button>
      </div>
    </section>
  );
}
