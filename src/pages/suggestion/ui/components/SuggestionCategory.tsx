import { Typography } from "@promentorapp/ui-kit";
import { FormField, Select } from "@/shared/ui";

export type SuggestionCategoryOption = { id: string; label: string };

type SuggestionCategoryProps = {
  isTargetsLoading: boolean;
  teams: SuggestionCategoryOption[];
  mentors: SuggestionCategoryOption[];
  boards: SuggestionCategoryOption[];
  teamId: string;
  mentorId: string;
  boardId: string;
  onTeamChange: (id: string) => void;
  onMentorChange: (id: string) => void;
  onBoardChange: (id: string) => void;
  selectionError: string | null;
  disabled?: boolean;
};

function SelectWithEmptyState({
  label,
  ariaLabel,
  placeholder,
  options,
  value,
  onChange,
  emptyHint,
  disabled,
  isLoading,
}: {
  label: string;
  ariaLabel: string;
  placeholder: string;
  options: SuggestionCategoryOption[];
  value: string;
  onChange: (id: string) => void;
  emptyHint: string;
  disabled: boolean;
  isLoading: boolean;
}) {
  const noOptions = options.length === 0;
  const selectDisabled = disabled || isLoading || noOptions;

  return (
    <FormField label={label}>
      {isLoading ? (
        <Select
          fieldSize="sm"
          value=""
          onChange={() => {}}
          aria-label={ariaLabel}
          disabled
          aria-busy
        >
          <option value="">{placeholder}</option>
        </Select>
      ) : noOptions ? (
        <Typography component="p" className="text-sm text-slate-500">
          {emptyHint}
        </Typography>
      ) : (
        <Select
          fieldSize="sm"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={ariaLabel}
          disabled={selectDisabled}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </Select>
      )}
    </FormField>
  );
}

export default function SuggestionCategory({
  isTargetsLoading,
  teams,
  mentors,
  boards,
  teamId,
  mentorId,
  boardId,
  onTeamChange,
  onMentorChange,
  onBoardChange,
  selectionError,
  disabled = false,
}: SuggestionCategoryProps) {
  return (
    <aside className="rounded-lg border border-white/10 bg-cyan-900/10 p-4">
      <Typography
        component="h2"
        className="text-sm font-semibold uppercase tracking-wide text-slate-300"
      >
        Suggestion category
      </Typography>

      <div className="mt-3 grid gap-3">
        <SelectWithEmptyState
          label="Teams"
          ariaLabel="Choose team target"
          placeholder="Select a team"
          options={teams}
          value={teamId}
          onChange={onTeamChange}
          emptyHint="No joined teams yet."
          disabled={disabled}
          isLoading={isTargetsLoading}
        />
        <SelectWithEmptyState
          label="Mentors"
          ariaLabel="Choose mentor target"
          placeholder="Select a mentor"
          options={mentors}
          value={mentorId}
          onChange={onMentorChange}
          emptyHint="No accepted mentors yet."
          disabled={disabled}
          isLoading={isTargetsLoading}
        />
        <SelectWithEmptyState
          label="Boards"
          ariaLabel="Choose board target"
          placeholder="Select a board"
          options={boards}
          value={boardId}
          onChange={onBoardChange}
          emptyHint="No boards yet."
          disabled={disabled}
          isLoading={isTargetsLoading}
        />
        {selectionError ? (
          <Typography
            component="p"
            className="text-sm font-medium text-rose-300"
            role="alert"
          >
            {selectionError}
          </Typography>
        ) : null}
      </div>
    </aside>
  );
}
