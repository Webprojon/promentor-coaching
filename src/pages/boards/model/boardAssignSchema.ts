import { z } from "zod";

export const boardAssignSchema = z.object({
  boardName: z.string().trim().min(1, "Enter a board name."),
  teamId: z.string().min(1, "Choose a team."),
});

export type BoardAssignFormValues = z.infer<typeof boardAssignSchema>;
