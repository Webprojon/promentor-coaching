import { Button, TextField, Typography } from "@promentorapp/ui-kit";
import type { SuggestionComposerProps } from "@/pages/suggestion/model/types";
import {
  PRIORITY_BADGE_CLASS,
  PRIORITY_SELECTED_BORDER_CLASS,
} from "@/pages/suggestion/model/constants";
import { FormField, Textarea } from "@/shared/ui";

export default function SuggestionComposer({
  draft,
  priorities,
  canSend,
  onDraftChange,
  onSend,
}: SuggestionComposerProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-blue-900/5 p-4">
      <Typography
        component="h2"
        className="text-sm font-semibold uppercase tracking-wide text-slate-300"
      >
        Suggestion composer
      </Typography>
      <div className="mt-3 grid gap-3">
        <TextField
          label="Title"
          aria-label="Suggestion title"
          placeholder="e.g. Narrow sprint scope to 2 critical deliverables"
          className="border-white/20 h-12!"
          value={draft.title}
          onChange={(event) => onDraftChange("title", event.target.value)}
        />
        <FormField label="Detail">
          <Textarea
            placeholder="Explain what should change and why."
            value={draft.detail}
            onChange={(event) => onDraftChange("detail", event.target.value)}
            aria-label="Suggestion detail"
          />
        </FormField>

        <div className="flex justify-between items-end mt-2">
          <div className="grid gap-2 text-sm text-slate-300">
            <Typography variantStyle="label" className="pm-text-secondary">
              Priority
            </Typography>
            <div className="flex flex-wrap gap-2">
              {priorities.map((priority) => {
                const isActive = draft.priority === priority;
                return (
                  <button
                    key={priority}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => onDraftChange("priority", priority)}
                    className={`rounded-lg border px-6 py-2 text-xs cursor-pointer transition outline-none focus:outline-none focus-visible:ring-0 ${
                      PRIORITY_BADGE_CLASS[priority]
                    } ${isActive ? PRIORITY_SELECTED_BORDER_CLASS[priority] : "border-transparent"}`}
                  >
                    {priority}
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            type="button"
            variant="contained"
            disabled={!canSend}
            onClick={onSend}
          >
            Send Suggestion
          </Button>
        </div>
      </div>
    </article>
  );
}
