import { Button, TextField, Typography } from "@promentorapp/ui-kit";
import { RiEdit2Line } from "react-icons/ri";
import type { ProfileChangeFormProps } from "@/pages/profile/model/types";

export function ProfileChangeForm({
  register,
  canSave,
  onSubmit,
}: ProfileChangeFormProps) {
  return (
    <section className="rounded-lg bg-indigo-900/10 border border-white/10 p-5 shadow-[0_12px_30px_rgba(2,6,23,0.35)] transition">
      <div className="flex items-center gap-2">
        <RiEdit2Line className="text-lg text-indigo-300/90" aria-hidden />
        <Typography
          component="h3"
          className="text-sm! font-bold uppercase tracking-wider text-slate-400"
        >
          Profile details
        </Typography>
      </div>
      <Typography component="p" className="mt-1 text-sm text-slate-500">
        Update your profile details.
      </Typography>
      <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
        <TextField
          label="First name"
          aria-label="First name"
          placeholder="Enter first name"
          className="border-white/20"
          {...register("firstName")}
        />
        <TextField
          label="Last name"
          aria-label="Last name"
          placeholder="Enter last name"
          className="border-white/20"
          {...register("lastName")}
        />
        <div className="pt-1">
          <Button type="submit" variant="contained" disabled={!canSave}>
            Save Changes
          </Button>
        </div>
      </form>
    </section>
  );
}
