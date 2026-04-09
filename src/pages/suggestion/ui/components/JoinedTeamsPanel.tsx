import { Typography } from "@promentorapp/ui-kit";
import type { JoinedTeamsPanelProps } from "@/pages/suggestion/model/types";

export default function JoinedTeamsPanel({
  joinedTeams,
  selectedTeamId,
  selectedTeam,
  onTeamChange,
}: JoinedTeamsPanelProps) {
  const teamMetaRows = [
    { label: "Weekly goal", value: selectedTeam?.weeklyGoal },
    { label: "Progress", value: selectedTeam?.progress },
    { label: "Mentors", value: selectedTeam?.mentors.join(", ") },
  ];

  return (
    <aside className="rounded-lg border border-white/10 bg-slate-900/55 p-4">
      <Typography component="h2" className="text-sm font-semibold uppercase tracking-wide text-slate-300">
        Joined teams
      </Typography>
      
      <div className="mt-3 grid gap-3">
        <label className="grid gap-1 text-sm text-slate-300">
          Team
          <select
            className="h-10 rounded-lg border border-white/15 bg-slate-900/70 px-3 text-sm text-slate-100 outline-none"
            value={selectedTeamId}
            onChange={(event) => onTeamChange(event.target.value)}
          >
            {joinedTeams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-3 text-sm text-slate-300">
          {teamMetaRows.map((row, index) => (
            <p key={row.label} className={index > 0 ? "mt-2" : undefined}>
              <span className="text-slate-400">{row.label}:</span> {row.value}
            </p>
          ))}
        </div>
      </div>
    </aside>
  );
}
