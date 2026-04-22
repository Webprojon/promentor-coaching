import { z } from "zod";

const SUGGESTION_MULTI_TARGET_ERROR =
  "Please select only one target: a team, a mentor, or a board.";

export const suggestionComposerSchema = z
  .object({
    teamId: z.string(),
    mentorId: z.string(),
    boardId: z.string(),
    title: z.string().trim().min(1, "Add a title."),
    detail: z.string().trim().min(1, "Add detail."),
    priority: z.enum(["High", "Medium", "Low"]),
  })
  .superRefine((data, ctx) => {
    const n = [data.teamId, data.mentorId, data.boardId].filter(Boolean).length;
    if (n !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: SUGGESTION_MULTI_TARGET_ERROR,
        path: ["teamId"],
      });
    }
  });

export type SuggestionComposerFormValues = z.infer<typeof suggestionComposerSchema>;

export const SUGGESTION_FORM_DEFAULT_VALUES: SuggestionComposerFormValues = {
  teamId: "",
  mentorId: "",
  boardId: "",
  title: "",
  detail: "",
  priority: "Medium",
};
