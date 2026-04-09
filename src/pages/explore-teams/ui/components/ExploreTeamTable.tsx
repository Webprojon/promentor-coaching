import { Button, Typography } from "@promentorapp/ui-kit";
import { REQUEST_STATUS_BADGE_CLASS, TEAM_STATUS_BADGE_CLASS } from "../../../../shared/model/constants";
import type { ExploreTeam, ExploreTeamTableProps } from "../../model/types";
import { TABLE_COLUMNS } from "../../model/constants";
import { Table } from "../../../../shared/ui/Table";

const REQUEST_ACTION_LABEL: Partial<Record<ExploreTeam["requestStatus"], string>> = {
  Pending: "Pending",
  Accepted: "Joined",
};

export function ExploreTeamTable({ rows, onRequestClick }: ExploreTeamTableProps) {
  return (
    <Table
      columns={TABLE_COLUMNS}
      rows={rows}
      getRowKey={(row) => row.id}
      renderRow={({ id, teamName, status, memberAvatars, membersCount, requestStatus }) => (
        <>
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
        </>
      )}
    />
  );
}
