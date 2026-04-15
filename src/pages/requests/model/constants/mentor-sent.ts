import type { IconType } from "react-icons";
import {
  RiLayoutGridLine,
  RiPlantLine,
  RiRunLine,
  RiTeamLine,
} from "react-icons/ri";
import type {
  MentorSentFilter,
  MentorSentRequestSendFieldset,
  MentorSentTargetKind,
  RequestsTabFilterOption,
} from "@/pages/requests/model/types";
import type { ModalAction } from "@/shared/ui/Modal";

const MENTOR_SENT_FILTER_ORDER: MentorSentFilter[] = [
  "all",
  "teams",
  "interns",
  "boards",
  "workout_plans",
];

export const MENTOR_SENT_DEFAULT_FILTER: MentorSentFilter = "all";

export const MENTOR_SENT_DELIVERED_BADGE_CLASS =
  "border-slate-500/45 bg-slate-500/10 text-slate-200 shadow-[0_0_16px_rgba(148,163,184,0.12)]";

export const MENTOR_SENT_REQUEST_VIEW_MODAL_FOOTER_LABELS = {
  cancel: "Cancel",
  edit: "Edit",
  delete: "Delete",
} as const;

export type MentorSentRequestViewModalFooterHandlers = {
  onClose: () => void;
  onEditSent?: () => void;
  onDeleteSent?: () => void;
};

export function mentorSentRequestViewModalFooterActions(
  handlers: MentorSentRequestViewModalFooterHandlers,
): ModalAction[] {
  const { onClose, onEditSent, onDeleteSent } = handlers;
  return [
    {
      id: "request-view-cancel",
      label: MENTOR_SENT_REQUEST_VIEW_MODAL_FOOTER_LABELS.cancel,
      onClick: onClose,
      variant: "outlined",
    },
    {
      id: "request-view-edit",
      label: MENTOR_SENT_REQUEST_VIEW_MODAL_FOOTER_LABELS.edit,
      onClick: () => onEditSent?.(),
      variant: "outlined",
      disabled: !onEditSent,
    },
    {
      id: "request-view-delete",
      label: MENTOR_SENT_REQUEST_VIEW_MODAL_FOOTER_LABELS.delete,
      onClick: () => onDeleteSent?.(),
      variant: "outlined",
      color: "error",
      disabled: !onDeleteSent,
    },
  ];
}

export const MENTOR_SENT_KIND_META: Record<
  MentorSentTargetKind,
  {
    label: string;
    shortLabel: string;
    hint: string;
    Icon: IconType;
    cardAccentClass: string;
    chipClass: string;
  }
> = {
  teams: {
    label: "Teams",
    shortLabel: "Team",
    hint: "Requests visible to your team leads and members.",
    Icon: RiTeamLine,
    cardAccentClass:
      "border-l-4 border-l-cyan-400/80 bg-linear-to-br from-cyan-500/12 via-slate-900/70 to-slate-950/80",
    chipClass: "border-cyan-400/35 bg-cyan-500/12 text-cyan-100",
  },
  interns: {
    label: "Interns",
    shortLabel: "Intern",
    hint: "Requests for your intern cohort and mentors-of-record.",
    Icon: RiPlantLine,
    cardAccentClass:
      "border-l-4 border-l-emerald-400/75 bg-linear-to-br from-emerald-500/12 via-slate-900/70 to-slate-950/80",
    chipClass: "border-emerald-400/35 bg-emerald-500/12 text-emerald-100",
  },
  boards: {
    label: "Boards",
    shortLabel: "Board",
    hint: "Requests tied to delivery boards and rituals.",
    Icon: RiLayoutGridLine,
    cardAccentClass:
      "border-l-4 border-l-indigo-400/80 bg-linear-to-br from-indigo-500/12 via-slate-900/70 to-slate-950/80",
    chipClass: "border-indigo-400/35 bg-indigo-500/12 text-indigo-100",
  },
  workout_plans: {
    label: "Workout plans",
    shortLabel: "Workout",
    hint: "Training-load and recovery requests for shared plans.",
    Icon: RiRunLine,
    cardAccentClass:
      "border-l-4 border-l-fuchsia-400/75 bg-linear-to-br from-fuchsia-500/12 via-slate-900/70 to-slate-950/80",
    chipClass: "border-fuchsia-400/35 bg-fuchsia-500/12 text-fuchsia-100",
  },
};

export const MENTOR_SENT_REQUEST_SEND_FIELDSET: Record<
  MentorSentTargetKind,
  MentorSentRequestSendFieldset
> = {
  teams: {
    primaryLabel: "Team",
    primaryAriaLabel: "Choose team",
    primaryOptions: [
      { value: "", label: "Select a team you mentor" },
      { value: "core", label: "Core Delivery Guild" },
      { value: "design", label: "Design Systems Guild" },
      { value: "mobile", label: "Mobile Platform Guild" },
    ],
    angleField: {
      label: "Ritual or workflow",
      ariaLabel: "Ritual or workflow",
      placeholder: "e.g. Sprint planning, backlog scrub",
    },
    detailPlaceholder:
      "What should change, and why does it help the whole team?",
  },
  interns: {
    primaryLabel: "Cohort",
    primaryAriaLabel: "Choose intern cohort",
    primaryOptions: [
      { value: "", label: "Pick a cohort" },
      { value: "summer-design", label: "Summer · Design" },
      { value: "summer-eng", label: "Summer · Engineering" },
      { value: "returning", label: "Returning interns" },
    ],
    angleField: {
      label: "Focus skill",
      ariaLabel: "Focus skill",
      placeholder: "e.g. Storytelling, critique, async updates",
    },
    detailPlaceholder:
      "What practice, template, or cadence would accelerate their growth?",
    extraFields: [
      {
        label: "Optional office hours",
        ariaLabel: "Optional office hours",
        placeholder: "e.g. Fri 15:00-16:00 UTC",
      },
    ],
  },
  boards: {
    primaryLabel: "Board",
    primaryAriaLabel: "Choose board",
    primaryOptions: [
      { value: "", label: "Select a board" },
      { value: "release", label: "Release train board" },
      { value: "portfolio", label: "Portfolio kanban" },
      { value: "risk", label: "Risk radar" },
    ],
    angleField: {
      label: "Column or swimlane",
      ariaLabel: "Column or swimlane",
      placeholder: "Where should this request apply?",
    },
    detailPlaceholder:
      "Describe the tweak - fewer columns, clearer WIP limits, new signal...",
  },
  workout_plans: {
    primaryLabel: "Plan",
    primaryAriaLabel: "Choose workout plan",
    primaryOptions: [
      { value: "", label: "Shared plan" },
      { value: "guild", label: "Guild resilience track" },
      { value: "sprint", label: "Sprint surge block" },
      { value: "recovery", label: "Recovery micro-cycle" },
    ],
    angleField: {
      label: "Load focus",
      ariaLabel: "Load focus",
      placeholder: "e.g. Deload week, mobility emphasis",
    },
    detailPlaceholder:
      "How should intensity, rest, or shared accountability shift?",
    extraFields: [
      {
        label: "Time horizon",
        ariaLabel: "Time horizon",
        placeholder: "e.g. Next 2 micro-cycles",
      },
    ],
  },
};

export const MENTOR_SENT_FILTER_OPTIONS: RequestsTabFilterOption<MentorSentFilter>[] =
  MENTOR_SENT_FILTER_ORDER.map((key) => {
    if (key === "all") {
      return {
        value: key,
        label: "All",
        activeClassName: "border-cyan-400/50 bg-cyan-500/15 text-cyan-100",
      };
    }
    const meta = MENTOR_SENT_KIND_META[key];
    return {
      value: key,
      label: meta.label,
      hint: meta.hint,
      Icon: meta.Icon,
      activeClassName: `${meta.chipClass} shadow-[0_0_20px_rgba(34,211,238,0.08)]`,
    };
  });
