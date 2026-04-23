import { z } from "zod";

const ymd = /^\d{4}-\d{2}-\d{2}$/;

export const boardAssignSchema = z.object({
  boardName: z.string().trim().min(1, "Enter a board name."),
  teamId: z.string().min(1, "Choose a team."),
  sessionDate: z
    .string()
    .min(1, "Choose a session date.")
    .regex(ymd, "Choose a valid date."),
});

export type BoardAssignFormValues = z.infer<typeof boardAssignSchema>;
