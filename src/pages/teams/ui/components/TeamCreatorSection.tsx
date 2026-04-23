import { Button, TextField, Typography } from "@promentorapp/ui-kit";
import { SHARED_TEXT_FIELD_CLASS } from "@/shared/model/constants";
import { FieldError } from "@/pages/teams/ui/components/FieldError";
import { TeamMemberChipAvatar } from "@/pages/teams/ui/components/TeamMemberChipAvatar";
import type { TeamCreatorSectionProps } from "@/pages/teams/model/useTeamsPage";

export function TeamCreatorSection({
  addManualMember,
  canAddManualMember,
  createTeamFormRegister,
  errors,
  inviteUserPending,
  isDirectoryError,
  isDirectoryLoading,
  isManualMemberFormOpen,
  manualMemberFormRegister,
  memberOptions,
  selectedMemberIds,
  toggleManualMemberForm,
  toggleMember,
}: TeamCreatorSectionProps) {
  const poolSize = memberOptions.length;
  const selectedLabel =
    selectedMemberIds.length > 0
      ? `${selectedMemberIds.length} ${selectedMemberIds.length > 1 ? "members" : "member"} selected`
      : null;

  return (
    <section className="grid gap-4">
      <div className="grid gap-2">
        <TextField
          label="Team name"
          aria-label="Team name"
          placeholder="e.g. Frontend Growth Squad"
          className={SHARED_TEXT_FIELD_CLASS}
          {...createTeamFormRegister("teamName")}
        />
        <FieldError message={errors.teamName} />

        <div className="flex items-center justify-between gap-2">
          <Typography id="invite-members-label" variantStyle="label">
            Add members
          </Typography>

          {isDirectoryLoading ? (
            <Typography className="text-xs! text-slate-400!" component="span">
              Loading directory…
            </Typography>
          ) : isDirectoryError ? (
            <Typography className="text-xs! text-red-400!" component="span">
              Directory could not be loaded.
            </Typography>
          ) : selectedLabel ? (
            <Typography className="text-xs! text-green-600!">
              {selectedLabel}{" "}
              <span className="text-slate-400!">out of {poolSize}</span>
            </Typography>
          ) : null}
        </div>

        <div className="hide-scrollbar flex max-h-[100px] min-h-12 flex-1 flex-wrap items-center gap-2 overflow-y-auto pb-1 pr-1">
          {isDirectoryLoading ? null : isDirectoryError ? null : (
            <>
              {memberOptions.map(({ id, avatarUrl, name }) => {
                const isSelected = selectedMemberIds.includes(id);
                return (
                  <Button
                    key={id}
                    type="button"
                    aria-pressed={isSelected}
                    aria-label={name}
                    onClick={() => toggleMember(id)}
                    className={`h-9 border px-2! ${isSelected ? "border-[#2a6de5]!" : "border-white/20!"}`}
                  >
                    <TeamMemberChipAvatar
                      firstName={name}
                      avatarUrl={avatarUrl}
                    />
                    <Typography
                      component="span"
                      variantStyle="label"
                      className="text-xs!"
                    >
                      {name}
                    </Typography>
                  </Button>
                );
              })}
            </>
          )}
        </div>
      </div>

      {isManualMemberFormOpen ? (
        <div className="mt-2 grid gap-3">
          <TextField
            label="Full name"
            aria-label="Full name"
            placeholder="e.g. John Carter"
            className={SHARED_TEXT_FIELD_CLASS}
            {...manualMemberFormRegister("fullName")}
          />
          <FieldError message={errors.fullName} />

          <TextField
            label="User email"
            aria-label="User email"
            type="email"
            placeholder="e.g. john@example.com"
            className={SHARED_TEXT_FIELD_CLASS}
            {...manualMemberFormRegister("email")}
          />
          <FieldError message={errors.email} />

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="contained"
              onClick={addManualMember}
              disabled={!canAddManualMember || inviteUserPending}
            >
              Add New User
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={toggleManualMemberForm}
              disabled={inviteUserPending}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Typography
            component="p"
            variantStyle="caption"
            className="mt-4 text-xs! text-slate-400!"
          >
            If there are no members that you are looking for in your directory,
            add new user manually to the system and they will be automatically
            added to this team.
          </Typography>

          <Button
            type="button"
            variant="outlined"
            onClick={toggleManualMemberForm}
          >
            Add New User
          </Button>
        </>
      )}
    </section>
  );
}
