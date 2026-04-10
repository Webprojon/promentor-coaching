import { Typography } from "@promentorapp/ui-kit";
import {
  REQUEST_CATEGORY_META,
  REQUEST_CATEGORY_ORDER,
} from "@/pages/mentorship-requests/model/constants";
import type { RequestCategoryFilter } from "@/pages/mentorship-requests/model/types";

type RequestsCategoryFilterProps = {
  value: RequestCategoryFilter;
  onChange: (value: RequestCategoryFilter) => void;
};

export function RequestsCategoryFilter({
  value,
  onChange,
}: RequestsCategoryFilterProps) {
  return (
    <section className="mt-5">
      <Typography
        component="h2"
        className="text-xs! font-bold uppercase tracking-wider text-slate-500"
      >
        Request type
      </Typography>
      <Typography component="p" className="mt-1 text-sm text-slate-500">
        Three lanes members use: team access, mentorship, and suggestions.
      </Typography>
      <div
        className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Filter by request category"
      >
        <button
          type="button"
          role="tab"
          aria-selected={value === "all"}
          onClick={() => onChange("all")}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
            value === "all"
              ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-100"
              : "border-white/10 bg-slate-900/50 text-slate-400 hover:border-white/20 hover:text-slate-200"
          }`}
        >
          All
        </button>
        {REQUEST_CATEGORY_ORDER.map((key) => {
          const meta = REQUEST_CATEGORY_META[key];
          const Icon = meta.Icon;
          const active = value === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(key)}
              title={meta.hint}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                active
                  ? `${meta.chipClass} shadow-[0_0_20px_rgba(34,211,238,0.08)]`
                  : "border-white/10 bg-slate-900/50 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              <Icon className="text-base opacity-90" aria-hidden />
              {meta.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
