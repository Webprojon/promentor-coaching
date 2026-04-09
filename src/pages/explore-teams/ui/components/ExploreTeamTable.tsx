import { Button, Typography } from "@promentorapp/ui-kit";
import { REQUEST_STATUS_BADGE_CLASS, TEAM_STATUS_BADGE_CLASS } from "../../../../shared/model/constants";
import type { ExploreTeam, ExploreTeamTableProps } from "../../model/types";
import { TABLE_COLUMNS } from "../../model/constants";

const REQUEST_ACTION_LABEL: Partial<Record<ExploreTeam["requestStatus"], string>> = {
  Pending: "Pending",
  Accepted: "Joined",
};

export function ExploreTeamTable({ rows, onRequestClick }: ExploreTeamTableProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-white/10 bg-slate-900/55 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm">
      <table className="w-full table-fixed border-collapse">
        <thead className="bg-slate-800/70">
          <tr>
            {TABLE_COLUMNS.map((column) => (
              <th
                key={column.key}
                className={`p-4 text-xs font-semibold uppercase tracking-wide text-white/90 ${column.className}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ id, teamName, status, memberAvatars, membersCount, requestStatus }) => (
            <tr key={id} className="border-t border-white/10 hover:bg-slate-800/45">
              <td className="px-4 py-3 text-sm font-semibold text-slate-100">{teamName}</td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${TEAM_STATUS_BADGE_CLASS[status]}`}
                >
                  {status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center">
                  <div className="flex">
                    {memberAvatars.slice(0, 3).map((avatar, index) => (
                      <div key={`${id}-avatar-${index}`} className={index > 0 ? "-ml-2" : ""}>
                        <img
                          src={avatar}
                          alt="Member avatar"
                          className="h-8 w-8 rounded-full border-2 border-slate-900 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <Typography component="span" variantStyle="caption" className="ml-2 text-slate-300">
                    +{Math.max(membersCount - 3, 0)}
                  </Typography>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center justify-end">
                  {REQUEST_ACTION_LABEL[requestStatus] ? (
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${REQUEST_STATUS_BADGE_CLASS[requestStatus]}`}
                    >
                      {REQUEST_ACTION_LABEL[requestStatus]}
                    </span>
                  ) : (
                    <Button type="button" variant="outlined" onClick={() => onRequestClick(id)}>
                      Send request
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
