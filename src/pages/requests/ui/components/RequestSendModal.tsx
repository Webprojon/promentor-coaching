import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { TextField, Typography } from "@promentorapp/ui-kit";
import {
  type CreateMentorBroadcastRequestBody,
  useCreateMentorBroadcastRequestMutation,
  useMentorBroadcastTargetsQuery,
} from "@/entities/requests";
import { useTeamsListQuery } from "@/entities/teams";
import { MENTOR_BROADCAST_ALL_INTERN_VALUE } from "@/pages/requests/model/constants/mentor-broadcast-ui";
import {
  type RequestSendModalFormValues,
  requestSendModalSchema,
} from "@/pages/requests/model/schema/request-send-modal";
import type { MentorSentTargetKind } from "@/pages/requests/model/types";
import {
  MENTOR_SENT_KIND_META,
  MENTOR_SENT_REQUEST_SEND_FIELDSET,
} from "@/pages/requests/model/constants";
import { FieldError } from "@/pages/teams/ui/components/FieldError";
import { SHARED_TEXT_FIELD_CLASS } from "@/shared/model/constants";
import { FormField, Modal, Select, Textarea } from "@/shared/ui";

type RequestSendModalProps = {
  open: boolean;
  targetKind: MentorSentTargetKind;
  onClose: () => void;
};

const EMPTY = "";

const DEFAULT_FORM: RequestSendModalFormValues = {
  primaryPick: "",
  angle: "",
  detail: "",
};

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

function buildCreateMentorBroadcastBody(
  targetKind: MentorSentTargetKind,
  values: RequestSendModalFormValues,
  selectedLabel: string,
): CreateMentorBroadcastRequestBody {
  const scope = targetKindToScope(targetKind);
  const contextLine = values.angle.trim() || undefined;
  const bodyText = values.detail.trim();
  const contextOpt = contextLine ? { contextLine } : {};

  if (scope === "TEAM") {
    return {
      scope: "TEAM",
      teamId: values.primaryPick,
      targetLabel: selectedLabel,
      body: bodyText,
      ...contextOpt,
    };
  }

  if (scope === "INTERN") {
    if (values.primaryPick === MENTOR_BROADCAST_ALL_INTERN_VALUE) {
      return {
        scope: "INTERN",
        allInterns: true,
        body: bodyText,
        ...contextOpt,
      };
    }
    return {
      scope: "INTERN",
      menteeId: values.primaryPick,
      targetLabel: selectedLabel,
      body: bodyText,
      ...contextOpt,
    };
  }

  if (scope === "BOARD") {
    return {
      scope: "BOARD",
      boardId: values.primaryPick,
      body: bodyText,
      ...contextOpt,
    };
  }

  return {
    scope,
    targetLabel: selectedLabel,
    body: bodyText,
    ...contextOpt,
  };
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
  const boardTargets = useMentorBroadcastTargetsQuery(
    "boards",
    loadBoardTargets,
  );

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<RequestSendModalFormValues>({
    resolver: zodResolver(requestSendModalSchema),
    mode: "onChange",
    defaultValues: DEFAULT_FORM,
  });

  const primaryPick = useWatch({
    control,
    name: "primaryPick",
    defaultValue: DEFAULT_FORM.primaryPick,
  });

  useEffect(() => {
    if (open) {
      reset(DEFAULT_FORM);
    }
  }, [open, targetKind, reset]);

  const createMutation = useCreateMentorBroadcastRequestMutation();

  const tryClose = useCallback(() => {
    if (!createMutation.isPending) {
      onClose();
    }
  }, [createMutation.isPending, onClose]);

  const internList = internTargets.data ?? [];

  let primaryOptions: { value: string; label: string }[];
  if (targetKind === "teams") {
    const list = teamsQuery.data ?? [];
    primaryOptions = [
      { value: EMPTY, label: fieldset.emptyPrimaryLabel },
      ...list.map((t) => ({ value: t.id, label: t.name })),
    ];
  } else if (targetKind === "interns") {
    const allInternsOption = {
      value: MENTOR_BROADCAST_ALL_INTERN_VALUE,
      label: "All interns",
    };
    primaryOptions = [
      { value: EMPTY, label: fieldset.emptyPrimaryLabel },
      allInternsOption,
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

  const canSubmit = isValid && !createMutation.isPending;

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

  const onValidSubmit = (values: RequestSendModalFormValues) => {
    const payload = buildCreateMentorBroadcastBody(
      targetKind,
      values,
      selectedLabel,
    );
    createMutation.mutate(payload, {
      onSuccess: () => {
        reset(DEFAULT_FORM);
        onClose();
      },
    });
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
      onClose={tryClose}
      title={`New request · ${meta.label}`}
      secondaryAction={{
        label: "Cancel",
        onClick: tryClose,
        variant: "outlined",
        disabled: createMutation.isPending,
      }}
      primaryAction={{
        label: "Send request",
        onClick: handleSubmit(onValidSubmit),
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
        <div className={`grid ${isCompactIntro ? "mt-3 gap-3" : "mt-5 gap-4"}`}>
          <FormField label={fieldset.primaryLabel}>
            <Controller
              name="primaryPick"
              control={control}
              render={({ field }) => (
                <Select
                  fieldSize="md"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  aria-label={fieldset.primaryAriaLabel}
                  disabled={targetsLoading}
                >
                  {primaryOptions.map((opt) => (
                    <option key={opt.value || "__empty"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              )}
            />
            <FieldError message={errors.primaryPick?.message} />
            {targetKind === "teams" &&
            !targetsLoading &&
            primaryOptions.length <= 1 ? (
              <Typography component="p" className="mt-2 text-xs text-slate-500">
                Create a team on the Teams page to send a request.
              </Typography>
            ) : null}
            {targetKind === "interns" &&
            !targetsLoading &&
            internList.length === 0 ? (
              <Typography component="p" className="mt-2 text-xs text-slate-500">
                No accepted interns yet. Accept a mentorship on the received
                requests flow to see people here, or use &quot;All interns&quot;
                for a future broadcast.
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
            {...register("angle")}
            disabled={createMutation.isPending}
          />
          <FormField label="Request details">
            <Textarea
              placeholder={fieldset.detailPlaceholder}
              {...register("detail")}
              aria-label="Request details"
              disabled={createMutation.isPending}
            />
            <FieldError message={errors.detail?.message} />
          </FormField>
        </div>
      </div>
    </Modal>
  );
}
