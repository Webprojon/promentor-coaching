import type { IconType } from "react-icons";
import { RiLayoutGridLine, RiPlantLine, RiTeamLine } from "react-icons/ri";
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
];

export const MENTOR_SENT_DEFAULT_FILTER: MentorSentFilter = "all";

export const MENTOR_SENT_DELIVERED_BADGE_CLASS =
  "border-slate-500/45 bg-slate-500/10 text-slate-200 shadow-[0_0_16px_rgba(148,163,184,0.12)]";

export const MENTOR_SENT_REQUEST_VIEW_MODAL_FOOTER_LABELS = {
  cancel: "Cancel",
  edit: "Edit",
  delete: "Cancel request",
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
    hint: "Requests to your accepted interns, or to everyone at once.",
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
};

export const MENTOR_SENT_REQUEST_SEND_FIELDSET: Record<
  MentorSentTargetKind,
  MentorSentRequestSendFieldset
> = {
  teams: {
    primaryLabel: "Team",
    primaryAriaLabel: "Choose team",
    emptyPrimaryLabel: "Select a team you mentor",
    angleField: {
      label: "Ritual or workflow",
      ariaLabel: "Ritual or workflow",
      placeholder: "e.g. Sprint planning, backlog scrub",
    },
    detailPlaceholder:
      "What should change, and why does it help the whole team?",
  },
  interns: {
    primaryLabel: "Interns",
    primaryAriaLabel: "Choose an intern or All",
    emptyPrimaryLabel: "Select an intern or All",
    angleField: {
      label: "Focus skill",
      ariaLabel: "Focus skill",
      placeholder: "e.g. Storytelling, critique, async updates",
    },
    detailPlaceholder:
      "What practice, template, or cadence would accelerate their growth?",
  },
  boards: {
    primaryLabel: "Board",
    primaryAriaLabel: "Choose board",
    emptyPrimaryLabel: "Select a board",
    angleField: {
      label: "Column or swimlane",
      ariaLabel: "Column or swimlane",
      placeholder: "Where should this request apply?",
    },
    detailPlaceholder:
      "Describe the tweak - fewer columns, clearer WIP limits, new signal...",
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
