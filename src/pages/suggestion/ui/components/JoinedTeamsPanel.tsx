import { Typography } from "@promentorapp/ui-kit";
import type { JoinedTeamsPanelProps } from "@/pages/suggestion/model/types";
import { FormField, Select } from "@/shared/ui";

export default function JoinedTeamsPanel({
  joinedTeams,
  isTeamsLoading,
  selectedTeamId,
  selectedTeam,
  onTeamChange,
}: JoinedTeamsPanelProps) {
  const teamMetaRows = selectedTeam
    ? [
        { label: "Members", value: String(selectedTeam.membersCount) },
        { label: "Roster", value: selectedTeam.membersLabel },
      ]
    : [];

  return (
    <aside className="rounded-lg border border-white/10 bg-cyan-900/10 p-4">
      <Typography
        component="h2"
        className="text-sm font-semibold uppercase tracking-wide text-slate-300"
      >
        Joined teams
      </Typography>

      <div className="mt-3 grid gap-3">
        <FormField label="Team">
          {isTeamsLoading ? (
            <Typography component="p" className="text-sm text-slate-500">
              Loading teams…
            </Typography>
          ) : joinedTeams.length === 0 ? (
            <Typography
              component="p"
              className="text-sm text-slate-500"
            >
              No teams yet. Create a team on the Teams page, then return here to
              send a suggestion.
            </Typography>
          ) : (
            <Select
              fieldSize="sm"
              value={selectedTeamId}
              onChange={(event) => onTeamChange(event.target.value)}
              aria-label="Choose team"
            >
              {joinedTeams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </Select>
          )}
        </FormField>
        {teamMetaRows.length > 0 ? (
          <div className="mt-3 text-sm text-slate-300">
            {teamMetaRows.map((row, index) => (
              <p key={row.label} className={index > 0 ? "mt-2" : undefined}>
                <span className="text-slate-400">{row.label}:</span> {row.value}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
