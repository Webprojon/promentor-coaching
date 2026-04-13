import { TextField, Typography } from "@promentorapp/ui-kit";
import { SEND_REQUEST_REVIEW_FIELDS } from "@/features/send-request-flow/model/constants";
import type { SendRequestFlowProps } from "@/features/send-request-flow/model/types";
import { SHARED_TEXT_FIELD_CLASS } from "@/shared/model/constants";

export function SendRequestFlow({
  step,
  targetLabel,
  draft,
  onChange,
}: SendRequestFlowProps) {
  const REVIEW_ITEMS = SEND_REQUEST_REVIEW_FIELDS.map((field) => ({
    label: field.label,
    value:
      field.key === "targetLabel"
        ? targetLabel
        : (draft[field.key] as string) || "-",
  }));

  if (step === 1) {
    return (
      <section className="grid gap-3">
        <Typography component="p" className="text-sm text-slate-300">
          You are requesting to join{" "}
          <span className="font-semibold text-white">{targetLabel}</span>.
        </Typography>
        <TextField
          label="Goal"
          aria-label="Goal"
          placeholder="What do you want to achieve in the next 4 weeks?"
          className={SHARED_TEXT_FIELD_CLASS}
          value={draft.goal}
          onChange={(event) => onChange("goal", event.target.value)}
        />
      </section>
    );
  }

  if (step === 2) {
    return (
      <section className="grid gap-3">
        <TextField
          label="Reason"
          aria-label="Reason"
          placeholder="Why is this team or mentor the best fit?"
          className={SHARED_TEXT_FIELD_CLASS}
          value={draft.reason}
          onChange={(event) => onChange("reason", event.target.value)}
        />
        <TextField
          label="Weekly availability"
          aria-label="Weekly availability"
          placeholder="e.g. Tue/Thu evening, 6h weekly"
          className={SHARED_TEXT_FIELD_CLASS}
          value={draft.weeklyAvailability}
          onChange={(event) => onChange("weeklyAvailability", event.target.value)}
        />
        <label className="grid gap-2">
          <Typography variantStyle="label" className="pm-text-secondary">
            Note (optional)
          </Typography>
          <textarea
            className="min-h-24 rounded-lg border border-white/20 bg-(--pm-surface) px-3 py-2 text-sm text-slate-100 outline-none transition-all placeholder:pm-text-muted focus:border-(--pm-accent-cyan) focus:ring-2 focus:ring-cyan-500/25"
            placeholder="Extra context for the team or mentor."
            value={draft.note}
            onChange={(event) => onChange("note", event.target.value)}
          />
        </label>
      </section>
    );
  }

  return (
    <section className="grid gap-3">
      <Typography component="p" className="text-sm text-slate-300">
        Confirm your request details before sending.
      </Typography>
      <div className="rounded-lg border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-200">
        {REVIEW_ITEMS.map((item, index) => (
          <p key={item.label} className={index === 0 ? undefined : "mt-2"}>
            <span className="text-slate-400">{item.label}:</span> {item.value}
          </p>
        ))}
      </div>
    </section>
  );
}
