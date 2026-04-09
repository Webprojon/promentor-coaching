import { Button, Typography } from "@promentorapp/ui-kit";
import { SUGGESTION_STATUS_BADGE_CLASS } from "@/pages/suggestion/model/constants";
import type { SuggestionHistoryProps } from "@/pages/suggestion/model/types";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { Badge } from "@/shared/ui";

export default function SuggestionHistory({ history }: SuggestionHistoryProps) {

  return (
    <section className="mt-4 rounded-lg border border-white/10 bg-slate-900/55 p-4">
      <Typography component="h2" className="text-sm font-semibold uppercase tracking-wide text-slate-300">
        Sent suggestion history
      </Typography>
      <div className="mt-3 grid gap-3 max-h-[220px] overflow-y-auto hide-scrollbar">
        {history.map((item) => {
          return (
            <article key={item.id} className="rounded-lg border border-white/10 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Typography component="p" className="text-sm font-semibold text-white">
                    {item.title}
                  </Typography>
                  <Badge toneClassName={SUGGESTION_STATUS_BADGE_CLASS[item.status]}>
                    {item.status}
                  </Badge>
                </div>

                <div className="flex items-center">
                  <Button type="button" color="success" aria-label="Edit team" onClick={() => undefined}>
                    <RiEdit2Fill className="h-4 w-4" />
                  </Button>

                  <Button type="button" color="error" aria-label="Delete team" onClick={() => undefined}>
                    <RiDeleteBin6Line className="h-4 w-4" />
                  </Button>
                </div>
              </div>

                <Typography component="p" className="text-xs uppercase tracking-wide text-slate-400">
                  Priority: {item.priority}
                </Typography>

                <Typography component="p" className="mt-2! text-slate-500!">
                  {item.detail}
                </Typography>
            </article>
          );
        })}
      </div>
    </section>
  );
}
