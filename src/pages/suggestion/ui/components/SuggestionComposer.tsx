import { Button, TextField, Typography } from "@promentorapp/ui-kit";
import type { SuggestionComposerProps } from "@/pages/suggestion/model/types";
import {
  PRIORITY_BADGE_CLASS,
  PRIORITY_SELECTED_BORDER_CLASS,
} from "@/pages/suggestion/model/constants";
import { FormField, Textarea } from "@/shared/ui";

export default function SuggestionComposer({
  fields,
  priorities,
  canSend,
  sendLabel,
  isSending,
  isEditing,
  onFieldChange,
  onSend,
  onCancelEdit,
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
          value={fields.title}
          onChange={(event) => onFieldChange("title", event.target.value)}
        />
        <FormField label="Detail">
          <Textarea
            placeholder="Explain what should change and why."
            value={fields.detail}
            onChange={(event) => onFieldChange("detail", event.target.value)}
            aria-label="Suggestion detail"
          />
        </FormField>

        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div className="grid gap-2 text-sm text-slate-300">
            <Typography variantStyle="label" className="pm-text-secondary">
              Priority
            </Typography>
            <div className="flex flex-wrap gap-2">
              {priorities.map((priority) => {
                const isActive = fields.priority === priority;
                return (
                  <button
                    key={priority}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => onFieldChange("priority", priority)}
                    className={`cursor-pointer rounded-lg border px-6 py-2 text-xs transition outline-none focus:outline-none focus-visible:ring-0 ${
                      PRIORITY_BADGE_CLASS[priority]
                    } ${
                      isActive
                        ? PRIORITY_SELECTED_BORDER_CLASS[priority]
                        : "border-transparent"
                    }`}
                  >
                    {priority}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {isEditing ? (
              <Button
                type="button"
                variant="outlined"
                disabled={isSending}
                onClick={onCancelEdit}
                className="normal-case"
              >
                Cancel edit
              </Button>
            ) : null}
            <Button
              type="button"
              variant="contained"
              disabled={!canSend || isSending}
              onClick={onSend}
            >
              {isSending ? "Saving…" : sendLabel}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
