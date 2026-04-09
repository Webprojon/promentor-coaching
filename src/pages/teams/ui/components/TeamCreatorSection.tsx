import { Button, TextField, Typography } from "@promentorapp/ui-kit";
import { SHARED_TEXT_FIELD_CLASS } from "@/shared/model/constants";
import { FieldError } from "@/pages/teams/ui/components/FieldError";
import { useTeamsPage } from "@/pages/teams/model/useTeamsPage";

export function TeamCreatorSection() {
  const {
    addManualMember,
    canAddManualMember,
    createTeamFormRegister,
    errors,
    isManualMemberFormOpen,
    manualMemberFormRegister,
    memberOptions,
    selectedMemberIds,
    toggleManualMemberForm,
    toggleMember,
  } = useTeamsPage();

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
          {memberOptions.length > 0 ? (
            <Typography id="invite-members-label" variantStyle="label">
              Add members
            </Typography>
          ) : null}

          {selectedLabel ? (
            <Typography className="text-xs! text-green-600!">
              {selectedLabel}{" "}
              <span className="text-red-400!">out of {memberOptions.length}</span>
            </Typography>
          ) : null}
        </div>

        <div className="hide-scrollbar flex items-center max-h-[100px] min-h-12 pb-1 flex-1 flex-wrap gap-2 overflow-y-auto pr-1">
          {memberOptions.map(({id, avatarUrl, name}) => {
            const isSelected = selectedMemberIds.includes(id);
            return (
              <Button
                key={id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleMember(id)}
                className={`h-9 border px-2! ${isSelected ? "border-[#2a6de5]!" : "border-white/20!"}`}
              >
                <img src={avatarUrl} alt={name} className="h-5 w-5 rounded-full object-cover" />
                <Typography component="span" variantStyle="label" className="text-xs!">
                  {name}
                </Typography>
              </Button>
            );
          })}
        </div>
      </div>

      {isManualMemberFormOpen ? (
        <div className="grid gap-3 mt-2">
          <TextField
            label="User name"
            aria-label="Username"
            placeholder="e.g. John Carter"
            className={SHARED_TEXT_FIELD_CLASS}
            {...manualMemberFormRegister("memberName")}
          />
          <FieldError message={errors.memberName} />

          <TextField
            label="User email"
            aria-label="User email"
            type="email"
            placeholder="e.g. john@example.com"
            className={SHARED_TEXT_FIELD_CLASS}
            {...manualMemberFormRegister("memberEmail")}
          />
          <FieldError message={errors.memberEmail} />

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="contained" onClick={addManualMember} disabled={!canAddManualMember}>
              Add New User
            </Button>
            <Button type="button" variant="outlined" onClick={toggleManualMemberForm}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Typography component="p" variantStyle="caption" className="mt-4 text-xs! text-slate-400!">
            If there are no members that you are looking for in your directory, add new user manually to the system
            and they will be automatically added to this team.
          </Typography>

          <Button type="button" variant="outlined" onClick={toggleManualMemberForm}>
            Add New User
          </Button>
        </>
      )}
    </section>
  );
}
