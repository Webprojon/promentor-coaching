import { Button, Typography } from "@promentorapp/ui-kit";
import {
  REQUEST_CATEGORY_FILTER_BASE_BUTTON_CLASS,
  REQUEST_CATEGORY_FILTER_INACTIVE_BUTTON_CLASS,
} from "@/pages/requests/model/constants";
import type { RequestsTabFilterOption } from "@/pages/requests/model/types";

type RequestsTabFilterProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: readonly RequestsTabFilterOption<T>[];
};

export function RequestsTabFilter<T extends string>({
  value,
  onChange,
  options,
}: RequestsTabFilterProps<T>) {
  return (
    <section className="mt-7">
      <Typography
        component="h2"
        className="text-xs font-bold uppercase tracking-wider text-slate-500"
      >
        Request type
      </Typography>

      <div
        className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Filter by request category"
      >
        {options.map((option) => {
          const isActive = value === option.value;
          const Icon = option.Icon;

          return (
            <Button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(option.value)}
              title={option.hint}
              className={`${REQUEST_CATEGORY_FILTER_BASE_BUTTON_CLASS} ${
                isActive
                  ? option.activeClassName
                  : REQUEST_CATEGORY_FILTER_INACTIVE_BUTTON_CLASS
              }`}
            >
              {Icon ? (
                <Icon className="text-base opacity-90" aria-hidden />
              ) : null}
              {option.label}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
