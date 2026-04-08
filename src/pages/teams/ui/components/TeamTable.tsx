import { Button, Typography } from "@promentorapp/ui-kit";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { TABLE_COLUMNS, TEAM_STATUS_BADGE_CLASS, type TeamRow } from "../../model/constants";

export function TeamTable({ rows }: { rows: TeamRow[] }) {
  return (
    <section className="overflow-hidden rounded-lg border border-white/10 bg-slate-900/55 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm">
      <table className="w-full table-fixed border-collapse">
        <thead className="bg-slate-800/70">
          <tr>
            {TABLE_COLUMNS.map((column) => (
              <th key={column.key} className={`p-4 text-xs font-semibold uppercase tracking-wide text-white/90 ${column.className}`}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ id, teamName, status, memberAvatars, membersCount }) => (
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
                <div className="flex items-center justify-end gap-2">
                  <Button type="button" color="success" aria-label="Edit team" onClick={() => undefined}>
                    <RiEdit2Fill className="h-4 w-4" />
                  </Button>

                  <Button type="button" color="error" aria-label="Delete team" onClick={() => undefined}>
                    <RiDeleteBin6Line className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
