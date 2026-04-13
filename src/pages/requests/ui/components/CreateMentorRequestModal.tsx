import { TextField, Typography } from "@promentorapp/ui-kit";
import { useEffect, useState, type ReactNode } from "react";
import { MENTOR_SENT_KIND_META } from "@/pages/requests/model/constants";
import type { MentorSentTargetKind } from "@/pages/requests/model/types";
import { SHARED_TEXT_FIELD_CLASS } from "@/shared/model/constants";
import { Modal } from "@/shared/ui";

type CreateMentorRequestModalProps = {
  open: boolean;
  targetKind: MentorSentTargetKind;
  onClose: () => void;
};

const SELECT_CLASS =
  "h-12 w-full rounded-lg border border-white/20 bg-(--pm-surface) px-3 text-sm text-slate-100 outline-none transition-all focus:border-(--pm-accent-cyan) focus:ring-2 focus:ring-cyan-500/25";

const TEXTAREA_CLASS =
  "min-h-28 w-full rounded-lg border border-white/20 bg-(--pm-surface) px-3 py-2 text-sm text-slate-100 outline-none transition-all placeholder:pm-text-muted focus:border-(--pm-accent-cyan) focus:ring-2 focus:ring-cyan-500/25";

export function CreateMentorRequestModal({
  open,
  targetKind,
  onClose,
}: CreateMentorRequestModalProps) {
  const meta = MENTOR_SENT_KIND_META[targetKind];

  const [primaryPick, setPrimaryPick] = useState("");
  const [angle, setAngle] = useState("");
  const [detail, setDetail] = useState("");
  const [extra, setExtra] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }
    setPrimaryPick("");
    setAngle("");
    setDetail("");
    setExtra("");
  }, [open, targetKind]);

  const onSubmit = () => {
    onClose();
  };

  const kindIntro = (
    <div
      className={`rounded-xl border px-4 py-3 text-sm leading-relaxed text-slate-300 ${meta.chipClass}`}
    >
      <Typography component="p">
        You are sending a <span className="font-semibold text-white">request</span>{" "}
        scoped to <span className="font-semibold text-white">{meta.label}</span>. Keep it
        clear and actionable — recipients can thread replies when the backend is live.
      </Typography>
    </div>
  );

  const fieldsByKind: Record<MentorSentTargetKind, ReactNode> = {
    teams: (
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2">
          <Typography variantStyle="label" className="pm-text-secondary">
            Team
          </Typography>
          <select
            className={SELECT_CLASS}
            value={primaryPick}
            onChange={(e) => setPrimaryPick(e.target.value)}
            aria-label="Choose team"
          >
            <option value="">Select a team you mentor</option>
            <option value="core">Core Delivery Guild</option>
            <option value="design">Design Systems Guild</option>
            <option value="mobile">Mobile Platform Guild</option>
          </select>
        </label>
        <TextField
          label="Ritual or workflow"
          aria-label="Ritual or workflow"
          placeholder="e.g. Sprint planning, backlog scrub"
          className={SHARED_TEXT_FIELD_CLASS}
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
        />
        <label className="grid gap-2">
          <Typography variantStyle="label" className="pm-text-secondary">
            Request details
          </Typography>
          <textarea
            className={TEXTAREA_CLASS}
            placeholder="What should change, and why does it help the whole team?"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            aria-label="Request details"
          />
        </label>
      </div>
    ),
    interns: (
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2">
          <Typography variantStyle="label" className="pm-text-secondary">
            Cohort
          </Typography>
          <select
            className={SELECT_CLASS}
            value={primaryPick}
            onChange={(e) => setPrimaryPick(e.target.value)}
            aria-label="Choose intern cohort"
          >
            <option value="">Pick a cohort</option>
            <option value="summer-design">Summer · Design</option>
            <option value="summer-eng">Summer · Engineering</option>
            <option value="returning">Returning interns</option>
          </select>
        </label>
        <TextField
          label="Focus skill"
          aria-label="Focus skill"
          placeholder="e.g. Storytelling, critique, async updates"
          className={SHARED_TEXT_FIELD_CLASS}
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
        />
        <label className="grid gap-2">
          <Typography variantStyle="label" className="pm-text-secondary">
            Request details
          </Typography>
          <textarea
            className={TEXTAREA_CLASS}
            placeholder="What practice, template, or cadence would accelerate their growth?"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            aria-label="Request details"
          />
        </label>
        <TextField
          label="Optional office hours"
          aria-label="Optional office hours"
          placeholder="e.g. Fri 15:00–16:00 UTC"
          className={SHARED_TEXT_FIELD_CLASS}
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
        />
      </div>
    ),
    boards: (
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2">
          <Typography variantStyle="label" className="pm-text-secondary">
            Board
          </Typography>
          <select
            className={SELECT_CLASS}
            value={primaryPick}
            onChange={(e) => setPrimaryPick(e.target.value)}
            aria-label="Choose board"
          >
            <option value="">Select a board</option>
            <option value="release">Release train board</option>
            <option value="portfolio">Portfolio kanban</option>
            <option value="risk">Risk radar</option>
          </select>
        </label>
        <TextField
          label="Column or swimlane"
          aria-label="Column or swimlane"
          placeholder="Where should this request apply?"
          className={SHARED_TEXT_FIELD_CLASS}
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
        />
        <label className="grid gap-2">
          <Typography variantStyle="label" className="pm-text-secondary">
            Request details
          </Typography>
          <textarea
            className={TEXTAREA_CLASS}
            placeholder="Describe the tweak — fewer columns, clearer WIP limits, new signal..."
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            aria-label="Request details"
          />
        </label>
      </div>
    ),
    workout_plans: (
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2">
          <Typography variantStyle="label" className="pm-text-secondary">
            Plan
          </Typography>
          <select
            className={SELECT_CLASS}
            value={primaryPick}
            onChange={(e) => setPrimaryPick(e.target.value)}
            aria-label="Choose workout plan"
          >
            <option value="">Shared plan</option>
            <option value="guild">Guild resilience track</option>
            <option value="sprint">Sprint surge block</option>
            <option value="recovery">Recovery micro-cycle</option>
          </select>
        </label>
        <TextField
          label="Load focus"
          aria-label="Load focus"
          placeholder="e.g. Deload week, mobility emphasis"
          className={SHARED_TEXT_FIELD_CLASS}
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
        />
        <label className="grid gap-2">
          <Typography variantStyle="label" className="pm-text-secondary">
            Request details
          </Typography>
          <textarea
            className={TEXTAREA_CLASS}
            placeholder="How should intensity, rest, or shared accountability shift?"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            aria-label="Request details"
          />
        </label>
        <TextField
          label="Time horizon"
          aria-label="Time horizon"
          placeholder="e.g. Next 2 micro-cycles"
          className={SHARED_TEXT_FIELD_CLASS}
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
        />
      </div>
    ),
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`New request · ${meta.label}`}
      secondaryAction={{
        label: "Cancel",
        onClick: onClose,
        variant: "outlined",
      }}
      primaryAction={{
        label: "Send request",
        onClick: onSubmit,
        variant: "contained",
        disabled: !primaryPick.trim() || !detail.trim(),
      }}
    >
      <div className="max-h-[min(70vh,540px)] overflow-y-auto pr-1">
        {kindIntro}
        {fieldsByKind[targetKind]}
      </div>
    </Modal>
  );
}
