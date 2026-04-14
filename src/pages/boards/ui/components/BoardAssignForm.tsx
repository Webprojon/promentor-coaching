import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@promentorapp/ui-kit";
import {
  boardAssignSchema,
  type BoardAssignFormValues,
} from "@/pages/boards/model/boardAssignSchema";
import { joinedTeams } from "@/pages/suggestion/model/constants";
import { FieldError } from "@/pages/teams/ui/components/FieldError";
import { SHARED_TEXT_FIELD_CLASS } from "@/shared/model/constants";
import { FormField, Select } from "@/shared/ui";

export function BoardAssignForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BoardAssignFormValues>({
    resolver: zodResolver(boardAssignSchema),
    mode: "onChange",
    defaultValues: { boardName: "", teamId: "" },
  });

  const onAssignBoard = handleSubmit(() => {});

  return (
    <div className="rounded-lg border border-white/10 bg-linear-to-b from-slate-900/70 to-slate-950/80 p-5 shadow-[0_12px_30px_rgba(2,6,23,0.35)] backdrop-blur-sm sm:p-6">
      <Typography
        component="h2"
        className="text-sm font-semibold uppercase tracking-wide text-slate-200"
      >
        Board details
      </Typography>
      <Typography
        component="p"
        className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400"
      >
        Name the board and choose which team it belongs to.
      </Typography>

      <form className="mt-5 grid gap-6" onSubmit={onAssignBoard} noValidate>
        <div className="grid gap-5 md:grid-cols-2 md:items-start md:gap-6">
          <div className="grid min-w-0 gap-2">
            <TextField
              label="Board name"
              aria-label="Board name"
              placeholder="e.g. Saturday match plan"
              className={SHARED_TEXT_FIELD_CLASS}
              {...register("boardName")}
            />
            <FieldError message={errors.boardName?.message} />
          </div>

          <div className="grid min-w-0 gap-2">
            <FormField label="Team">
              <Select
                fieldSize="md"
                aria-label="Assign board to team"
                {...register("teamId")}
              >
                <option value="" disabled>
                  Choose a team
                </option>
                {joinedTeams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </Select>
            </FormField>
            <FieldError message={errors.teamId?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid}
            className="h-11 w-full rounded-lg! px-6 sm:w-auto sm:min-w-44"
          >
            Save board
          </Button>
        </div>
      </form>
    </div>
  );
}
