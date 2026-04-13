import { Button, Typography } from "@promentorapp/ui-kit";
import {
  REQUEST_VIEW_TOGGLE_BUTTON_CLASS,
  REQUEST_VIEW_TOGGLE_OPTIONS,
} from "@/pages/mentorship-requests/model/constants";
import type { RequestInboxDirection } from "@/pages/mentorship-requests/model/types";

type RequestsViewToggleProps = {
  direction: RequestInboxDirection;
  onDirectionChange: (value: RequestInboxDirection) => void;
};

export function RequestsViewToggle({
  direction,
  onDirectionChange,
}: RequestsViewToggleProps) {
  return (
    <section className="mt-6 rounded-lg sm:inline-flex sm:flex-row">
      <Typography component="div" className="grid gap-2 sm:grid-cols-2">
        {REQUEST_VIEW_TOGGLE_OPTIONS.map(({ value, label, Icon }) => {
          const isActive = direction === value;
          return (
            <Button
              key={value}
              type="button"
              onClick={() => onDirectionChange(value)}
              className={`${REQUEST_VIEW_TOGGLE_BUTTON_CLASS} ${
                isActive
                  ? "bg-linear-to-r from-cyan-500/25 to-indigo-500/20 text-white shadow-[0_8px_24px_rgba(2,6,23,0.4)]"
                  : "text-slate-400 bg-white/5 hover:text-slate-200"
              }`}
            >
              <Icon className="text-lg" aria-hidden />
              {label}
            </Button>
          );
        })}
      </Typography>
    </section>
  );
}
