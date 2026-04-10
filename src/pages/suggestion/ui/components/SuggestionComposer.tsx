import { Button, TextField, Typography } from "@promentorapp/ui-kit";
import type { SuggestionComposerProps } from "@/pages/suggestion/model/types";
import {
  PRIORITY_BADGE_CLASS,
  PRIORITY_SELECTED_BORDER_CLASS,
} from "@/pages/suggestion/model/constants";

export default function SuggestionComposer({
  draft,
  priorities,
  canSend,
  onDraftChange,
  onSend,
}: SuggestionComposerProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-slate-900/55 p-4">
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
        <label className="grid gap-2">
          <Typography variantStyle="label" className="pm-text-secondary">
            Detail
          </Typography>
          <textarea
            className="min-h-28 rounded-lg border border-white/20 bg-(--pm-surface) px-3 py-2 text-sm text-slate-100 outline-none transition-all placeholder:pm-text-muted focus:border-(--pm-accent-cyan) focus:ring-2 focus:ring-cyan-500/25"
            placeholder="Explain what should change and why."
            value={draft.detail}
            onChange={(event) => onDraftChange("detail", event.target.value)}
          />
        </label>

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
