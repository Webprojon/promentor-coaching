import { Button, Typography } from "@promentorapp/ui-kit";
import { RiSparkling2Line } from "react-icons/ri";
import type { ProfileAboutSectionProps } from "@/pages/profile/model/types";

export function ProfileAboutSection({
  draftBio,
  isChanged,
  isDisabled,
  isSaving,
  onDraftBioChange,
  onSave,
}: ProfileAboutSectionProps) {
  return (
    <section className="rounded-lg bg-cyan-900/15 border border-white/10 p-5 shadow-[0_12px_30px_rgba(2,6,23,0.35)] transition">
      <div className="flex items-center gap-2">
        <RiSparkling2Line className="text-lg text-cyan-300/90" aria-hidden />
        <Typography
          component="h3"
          className="text-sm! font-bold uppercase tracking-wider text-slate-400"
        >
          About you
        </Typography>
      </div>
      <textarea
        value={draftBio}
        aria-label="About you"
        placeholder="Tell us about yourself"
        disabled={isDisabled || isSaving}
        onChange={(event) => onDraftBioChange(event.target.value)}
        className="mt-2 min-h-20 w-full resize-none overflow-y-auto text-sm text-slate-200 outline-none transition placeholder:text-slate-500 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      />
      {isChanged ? (
        <div className="mt-2">
          <Button
            type="button"
            variant="contained"
            disabled={isDisabled || isSaving}
            onClick={() => {
              void onSave();
            }}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
