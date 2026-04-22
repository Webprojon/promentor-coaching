import { Button, Typography } from "@promentorapp/ui-kit";
import type { SuggestionHistoryProps } from "@/pages/suggestion/model/types";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { Badge } from "@/shared/ui";

export default function SuggestionHistory({
  items,
  editingId,
  isLoading,
  onEdit,
  onDelete,
  isDeletingId,
}: SuggestionHistoryProps) {
  return (
    <section className="mt-4 rounded-lg border border-white/10 bg-blue-900/5 p-4">
      {isLoading ? (
        <Typography component="p" className="text-sm text-slate-400">
          Loading history…
        </Typography>
      ) : items.length > 0 ? (
        <>
          <Typography
            component="h2"
            className="text-sm font-semibold uppercase tracking-wide text-slate-300"
          >
            History
          </Typography>
          <div className="mt-3 grid max-h-[min(50vh,320px)] gap-3 overflow-y-auto pr-1 hide-scrollbar">
            {items.map(
              ({ id, title, priority, detail, targetLabel }) => (
                <article
                  key={id}
                  className="rounded-lg border border-white/10 p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <Typography
                        component="p"
                        className="truncate text-sm font-semibold text-white"
                        title={title}
                      >
                        {title}
                      </Typography>
                      {editingId === id ? (
                        <Badge
                          toneClassName="border-amber-400/40 bg-amber-500/15 text-amber-200"
                        >
                          Editing
                        </Badge>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        color="success"
                        aria-label="Edit suggestion"
                        disabled={Boolean(isDeletingId)}
                        onClick={() => onEdit(id)}
                        className="!min-w-0 px-2"
                      >
                        <RiEdit2Fill className="h-4 w-4" />
                      </Button>

                      <Button
                        type="button"
                        color="error"
                        aria-label="Delete suggestion"
                        disabled={isDeletingId === id}
                        onClick={() => onDelete(id)}
                        className="!min-w-0 px-2"
                      >
                        <RiDeleteBin6Line className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Typography
                    component="p"
                    className="mt-1 text-xs text-slate-500"
                  >
                    {targetLabel} · {priority} priority
                  </Typography>

                  <Typography
                    component="p"
                    className="mt-2 text-sm leading-relaxed text-slate-400"
                  >
                    {detail}
                  </Typography>
                </article>
              ),
            )}
          </div>
        </>
      ) : (
        <div className="p-4 text-center">
          <Typography component="p">No suggestions yet.</Typography>
          <Typography component="p" className="mt-1 text-xs text-slate-400">
            Share your first idea and your history will start building right
            here.
          </Typography>
        </div>
      )}
    </section>
  );
}
