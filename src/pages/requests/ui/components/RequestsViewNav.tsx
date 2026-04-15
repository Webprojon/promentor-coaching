import { Typography } from "@promentorapp/ui-kit";
import { NavLink } from "react-router-dom";
import {
  REQUEST_VIEW_TOGGLE_BUTTON_CLASS,
  REQUEST_VIEW_TOGGLE_OPTIONS,
  requestsPathForDirection,
} from "@/pages/requests/model/constants";

export function RequestsViewNav() {
  return (
    <section className="rounded-lg sm:inline-flex sm:flex-row">
      <Typography component="div" className="grid gap-2 sm:grid-cols-2">
        {REQUEST_VIEW_TOGGLE_OPTIONS.map(({ value, label, Icon }) => (
          <NavLink
            key={value}
            to={requestsPathForDirection(value)}
            end
            className={({ isActive }) =>
              `${REQUEST_VIEW_TOGGLE_BUTTON_CLASS} ${
                isActive
                  ? "bg-linear-to-r from-cyan-500/25 to-indigo-500/20 text-white shadow-[0_8px_24px_rgba(2,6,23,0.4)]"
                  : "text-slate-400 bg-white/5 hover:text-slate-200"
              }`
            }
          >
            <Icon className="text-lg" aria-hidden />
            {label}
          </NavLink>
        ))}
      </Typography>
    </section>
  );
}
