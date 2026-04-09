import { Typography } from "@promentorapp/ui-kit";
import type { JoinedTeamsPanelProps } from "../../model/types";

export default function JoinedTeamsPanel({
  joinedTeams,
  selectedTeamId,
  selectedTeam,
  onTeamChange,
}: JoinedTeamsPanelProps) {
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
        <div className="text-sm text-slate-300 mt-3">
          <p>
            <span className="text-slate-400">Weekly goal:</span> {selectedTeam?.weeklyGoal}
          </p>
          <p className="mt-2">
            <span className="text-slate-400">Progress:</span> {selectedTeam?.progress}
          </p>
          <p className="mt-2">
            <span className="text-slate-400">Mentors:</span> {selectedTeam?.mentors.join(", ")}
          </p>
        </div>
      </div>
    </aside>
  );
}
