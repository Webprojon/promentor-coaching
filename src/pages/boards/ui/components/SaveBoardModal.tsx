import { zodResolver } from "@hookform/resolvers/zod";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField, Typography } from "@promentorapp/ui-kit";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { isDayjs } from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FieldError } from "@/pages/teams/ui/components/FieldError";
import {
  type BoardAssignFormValues,
  boardAssignSchema,
} from "@/pages/boards/model/schema/board-assign";
import { SHARED_TEXT_FIELD_CLASS } from "@/shared/model/constants";
import { FormField, Modal, Select } from "@/shared/ui";

const FORM_ID = "tactical-board-save-form";

const dateFieldTheme = createTheme({
  palette: { mode: "dark", primary: { main: "#3b82f6" } },
  shape: { borderRadius: 10 },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": { borderColor: "rgba(147, 197, 253, 0.35)" },
          "&:hover fieldset": { borderColor: "rgba(147, 197, 253, 0.55)" },
        },
      },
    },
  },
});

const muiTextFieldSlotSx = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(147, 197, 253, 0.35)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(147, 197, 253, 0.55)",
  },
  "& .MuiInputLabel-root": { color: "rgba(226, 232, 240, 0.85)" },
} as const;

type TeamOption = { id: string; name: string };

type SaveBoardModalProps = {
  open: boolean;
  onClose: () => void;
  isBusy?: boolean;
  defaultValues: BoardAssignFormValues;
  title?: string;
  teams: TeamOption[];
  teamsLoading: boolean;
  onSave: (values: BoardAssignFormValues) => void | Promise<void>;
};

export function SaveBoardModal({
  open,
  onClose,
  isBusy = false,
  defaultValues,
  title = "Board details",
  teams,
  teamsLoading,
  onSave,
}: SaveBoardModalProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<BoardAssignFormValues>({
    resolver: zodResolver(boardAssignSchema),
    mode: "onChange",
    defaultValues,
  });

  const defaultsSignature = `${defaultValues.boardName}\0${defaultValues.teamId}\0${defaultValues.sessionDate}`;

  useEffect(() => {
    if (!open) return;
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- defaultValues tracked via defaultsSignature
  }, [open, defaultsSignature, reset]);

  const handleClose = () => {
    if (!isBusy) onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={title}
      secondaryAction={{
        id: "save-board-cancel",
        label: "Cancel",
        onClick: handleClose,
        disabled: isBusy,
      }}
      primaryAction={{
        id: "save-board-submit",
        label: "Save board",
        disabled: !isValid || teams.length === 0 || isBusy,
        onClick: () => {
          const form = document.getElementById(FORM_ID);
          if (form instanceof HTMLFormElement) {
            form.requestSubmit();
          }
        },
      }}
    >
      <Typography
        component="p"
        className="mb-4 max-w-2xl text-sm leading-relaxed text-slate-400"
      >
        Name the board, assign a team, and set the session date.
      </Typography>

      <form
        id={FORM_ID}
        className="grid gap-5 md:grid-cols-2 md:items-start md:gap-6"
        onSubmit={handleSubmit(async (values) => {
          await onSave(values);
        })}
        noValidate
      >
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
            {teamsLoading ? (
              <Typography component="p" className="text-sm text-slate-500">
                Loading teams…
              </Typography>
            ) : teams.length === 0 ? (
              <Typography component="p" className="text-sm text-slate-500">
                No teams available. Create a team on the Teams page first.
              </Typography>
            ) : (
              <Select
                fieldSize="md"
                aria-label="Assign board to team"
                {...register("teamId")}
              >
                <option value="" disabled>
                  Choose a team
                </option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </Select>
            )}
          </FormField>
          <FieldError message={errors.teamId?.message} />
        </div>

        <div className="min-w-0 md:col-span-2">
          <ThemeProvider theme={dateFieldTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="sessionDate"
                control={control}
                render={({ field, fieldState }) => (
                  <DatePicker
                    label="Session date"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(v) => {
                      field.onChange(
                        v && isDayjs(v) ? v.format("YYYY-MM-DD") : "",
                      );
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: Boolean(fieldState.error),
                        helperText: fieldState.error?.message,
                        sx: muiTextFieldSlotSx,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </ThemeProvider>
        </div>
      </form>
    </Modal>
  );
}
