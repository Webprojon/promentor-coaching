import { z } from "zod";

export const requestSendModalSchema = z.object({
  primaryPick: z.string().min(1, "Choose who this request is for."),
  angle: z.string(),
  detail: z.string().trim().min(1, "Add request details."),
});

export type RequestSendModalFormValues = z.infer<typeof requestSendModalSchema>;
