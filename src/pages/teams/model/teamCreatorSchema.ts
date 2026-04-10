import { z } from "zod";

export const createTeamSchema = z.object({
  teamName: z
    .string()
    .trim()
    .min(2, "Team name must be at least 2 characters."),
});

export const addManualMemberSchema = z.object({
  memberName: z
    .string()
    .trim()
    .min(2, "Member name must be at least 2 characters."),
  memberEmail: z.string().trim().email("Enter a valid email address."),
});

export type CreateTeamFormValues = z.infer<typeof createTeamSchema>;
export type AddManualMemberFormValues = z.infer<typeof addManualMemberSchema>;
