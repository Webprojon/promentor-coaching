import { TextField, Typography } from "@promentorapp/ui-kit";
import {
  MENTOR_SENT_KIND_META,
  MENTOR_SENT_REQUEST_SEND_FIELDSET,
} from "@/pages/requests/model/constants";
import type { MentorSentTargetKind } from "@/pages/requests/model/types";
import { useRequestModalForm } from "@/pages/requests/model/useRequestsPage";
import { SHARED_TEXT_FIELD_CLASS } from "@/shared/model/constants";
import { FormField, Modal, Select, Textarea } from "@/shared/ui";

type RequestSendModalProps = {
  open: boolean;
  targetKind: MentorSentTargetKind;
  onClose: () => void;
};

export function RequestSendModal({
  open,
  targetKind,
  onClose,
}: RequestSendModalProps) {
  const meta = MENTOR_SENT_KIND_META[targetKind];
  const fieldset = MENTOR_SENT_REQUEST_SEND_FIELDSET[targetKind];

  const {
    primaryPick,
    setPrimaryPick,
    angle,
    setAngle,
    detail,
    setDetail,
    extra,
    setExtra,
    submit,
    canSubmit,
  } = useRequestModalForm(onClose);

  const kindIntro = (
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

  const [extraField] = fieldset.extraFields ?? [];

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
        onClick: submit,
        variant: "contained",
        disabled: !canSubmit,
      }}
    >
      <div className="max-h-[min(70vh,540px)] overflow-y-auto pr-1">
        {kindIntro}
        <div className="mt-5 grid gap-4">
          <FormField label={fieldset.primaryLabel}>
            <Select
              fieldSize="md"
              value={primaryPick}
              onChange={(e) => setPrimaryPick(e.target.value)}
              aria-label={fieldset.primaryAriaLabel}
            >
              {fieldset.primaryOptions.map((opt) => (
                <option key={opt.value || "__empty"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </FormField>
          <TextField
            label={fieldset.angleField.label}
            aria-label={fieldset.angleField.ariaLabel}
            placeholder={fieldset.angleField.placeholder}
            className={SHARED_TEXT_FIELD_CLASS}
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
          />
          <FormField label="Request details">
            <Textarea
              placeholder={fieldset.detailPlaceholder}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              aria-label="Request details"
            />
          </FormField>
          {extraField ? (
            <TextField
              label={extraField.label}
              aria-label={extraField.ariaLabel}
              placeholder={extraField.placeholder}
              className={SHARED_TEXT_FIELD_CLASS}
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
            />
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
