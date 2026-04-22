import { useState } from "react";
import { TextField, Typography } from "@promentorapp/ui-kit";
import {
  useCreateMentorBroadcastRequestMutation,
  useMentorBroadcastTargetsQuery,
} from "@/entities/requests";
import { useTeamsListQuery } from "@/entities/teams";
import { MENTOR_BROADCAST_ALL_INTERN_VALUE } from "@/pages/requests/model/constants/mentor-broadcast-ui";
import type { MentorSentTargetKind } from "@/pages/requests/model/types";
import {
  MENTOR_SENT_KIND_META,
  MENTOR_SENT_REQUEST_SEND_FIELDSET,
} from "@/pages/requests/model/constants";
import { SHARED_TEXT_FIELD_CLASS } from "@/shared/model/constants";
import { FormField, Modal, Select, Textarea } from "@/shared/ui";

type RequestSendModalProps = {
  open: boolean;
  targetKind: MentorSentTargetKind;
  onClose: () => void;
};

const EMPTY = "";

function targetKindToScope(
  k: MentorSentTargetKind,
): "TEAM" | "INTERN" | "BOARD" {
  switch (k) {
    case "teams":
      return "TEAM";
    case "interns":
      return "INTERN";
    case "boards":
      return "BOARD";
  }
}

export function RequestSendModal({
  open,
  targetKind,
  onClose,
}: RequestSendModalProps) {
  const meta = MENTOR_SENT_KIND_META[targetKind];
  const fieldset = MENTOR_SENT_REQUEST_SEND_FIELDSET[targetKind];

  const loadTeams = open && targetKind === "teams";
  const loadInternTargets = open && targetKind === "interns";
  const loadBoardTargets = open && targetKind === "boards";

  const teamsQuery = useTeamsListQuery(loadTeams);
  const internTargets = useMentorBroadcastTargetsQuery(
    "interns",
    loadInternTargets,
  );
  const boardTargets = useMentorBroadcastTargetsQuery("boards", loadBoardTargets);

  const [primaryPick, setPrimaryPick] = useState(EMPTY);
  const [angle, setAngle] = useState(EMPTY);
  const [detail, setDetail] = useState(EMPTY);

  const createMutation = useCreateMentorBroadcastRequestMutation();

  const internList = internTargets.data ?? [];

  let primaryOptions: { value: string; label: string }[];
  if (targetKind === "teams") {
    const list = teamsQuery.data ?? [];
    primaryOptions = [
      { value: EMPTY, label: fieldset.emptyPrimaryLabel },
      ...list.map((t) => ({ value: t.id, label: t.name })),
    ];
  } else if (targetKind === "interns") {
    const allRow =
      internList.length > 0
        ? [
            {
              value: MENTOR_BROADCAST_ALL_INTERN_VALUE,
              label: "All interns",
            },
          ]
        : [];
    primaryOptions = [
      { value: EMPTY, label: fieldset.emptyPrimaryLabel },
      ...allRow,
      ...internList.map((t) => ({ value: t.id, label: t.label })),
    ];
  } else {
    const list = boardTargets.data ?? [];
    primaryOptions = [
      { value: EMPTY, label: fieldset.emptyPrimaryLabel },
      ...list.map((t) => ({ value: t.id, label: t.label })),
    ];
  }

  const selectedLabel =
    primaryOptions.find((o) => o.value === primaryPick)?.label ?? "";

  const canSubmit =
    primaryPick.length > 0 &&
    detail.trim().length > 0 &&
    !createMutation.isPending;

  const isCompactIntro = targetKind === "interns";
  const kindIntro = isCompactIntro ? (
    <div
      className={`rounded-md border px-3 py-2.5 text-xs leading-snug text-slate-300 ${meta.chipClass}`}
    >
      Send to <span className="font-semibold text-white">one</span> intern or{" "}
      <span className="font-semibold text-white">all</span> of your{" "}
      <span className="font-semibold text-white">accepted</span> interns. Be
      specific and actionable.
    </div>
  ) : (
    <div
      className={`rounded-lg border px-4 py-3 text-sm leading-relaxed text-slate-300 ${meta.chipClass}`}
    >
      <Typography component="p">
        You are sending a{" "}
        <span className="font-semibold text-white">request</span> scoped to{" "}
        <span className="font-semibold text-white">{meta.label}</span>. Keep it
        clear and actionable.
      </Typography>
    </div>
  );

  const handleSend = () => {
    if (!canSubmit) return;
    const scope = targetKindToScope(targetKind);
    const contextLine = angle.trim() || undefined;
    const bodyText = detail.trim();
    void (async () => {
      try {
        if (scope === "TEAM") {
          await createMutation.mutateAsync({
            scope: "TEAM",
            teamId: primaryPick,
            targetLabel: selectedLabel,
            body: bodyText,
            ...(contextLine ? { contextLine } : {}),
          });
        } else if (scope === "INTERN") {
          if (primaryPick === MENTOR_BROADCAST_ALL_INTERN_VALUE) {
            await createMutation.mutateAsync({
              scope: "INTERN",
              allInterns: true,
              body: bodyText,
              ...(contextLine ? { contextLine } : {}),
            });
          } else {
            await createMutation.mutateAsync({
              scope: "INTERN",
              menteeId: primaryPick,
              targetLabel: selectedLabel,
              body: bodyText,
              ...(contextLine ? { contextLine } : {}),
            });
          }
        } else {
          await createMutation.mutateAsync({
            scope,
            targetLabel: selectedLabel,
            body: bodyText,
            ...(contextLine ? { contextLine } : {}),
          });
        }
        setPrimaryPick(EMPTY);
        setAngle(EMPTY);
        setDetail(EMPTY);
        onClose();
      } catch {
        /* toast via mutation meta */
      }
    })();
  };

  const targetsLoading =
    targetKind === "teams"
      ? teamsQuery.isLoading
      : targetKind === "interns"
        ? internTargets.isLoading
        : boardTargets.isLoading;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`New request · ${meta.label}`}
      secondaryAction={{
        label: "Cancel",
        onClick: onClose,
        variant: "outlined",
        disabled: createMutation.isPending,
      }}
      primaryAction={{
        label: "Send request",
        onClick: handleSend,
        variant: "contained",
        disabled: !canSubmit,
      }}
    >
      <div
        className={`max-h-[min(70vh,540px)] overflow-y-auto pr-1 ${
          isCompactIntro ? "mt-0" : ""
        }`}
      >
        {kindIntro}
        <div
          className={`grid ${isCompactIntro ? "mt-3 gap-3" : "mt-5 gap-4"}`}
        >
          <FormField label={fieldset.primaryLabel}>
            <Select
              fieldSize="md"
              value={primaryPick}
              onChange={(e) => setPrimaryPick(e.target.value)}
              aria-label={fieldset.primaryAriaLabel}
              disabled={targetsLoading}
            >
              {primaryOptions.map((opt) => (
                <option key={opt.value || "__empty"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
            {targetKind === "teams" &&
            !targetsLoading &&
            primaryOptions.length <= 1 ? (
              <Typography component="p" className="mt-2 text-xs text-slate-500">
                Create a team on the Teams page to send a request.
              </Typography>
            ) : null}
            {targetKind === "interns" && !targetsLoading && internList.length === 0 ? (
              <Typography component="p" className="mt-2 text-xs text-slate-500">
                No accepted interns yet. Accept a mentorship on the received
                requests flow to see people here, or use &quot;All interns&quot; for a
                future broadcast.
              </Typography>
            ) : null}
            {targetKind === "boards" &&
            !targetsLoading &&
            primaryOptions.length <= 1 ? (
              <Typography component="p" className="mt-2 text-xs text-slate-500">
                No {meta.label.toLowerCase()} are available from the server yet.
              </Typography>
            ) : null}
          </FormField>
          <TextField
            label={fieldset.angleField.label}
            aria-label={fieldset.angleField.ariaLabel}
            placeholder={fieldset.angleField.placeholder}
            className={SHARED_TEXT_FIELD_CLASS}
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            disabled={createMutation.isPending}
          />
          <FormField label="Request details">
            <Textarea
              placeholder={fieldset.detailPlaceholder}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              aria-label="Request details"
              disabled={createMutation.isPending}
            />
          </FormField>
        </div>
      </div>
    </Modal>
  );
}
