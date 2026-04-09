import { Button, Typography } from "@promentorapp/ui-kit";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { TABLE_COLUMNS } from "../../model/constants";
import { TEAM_STATUS_BADGE_CLASS } from "../../../../shared/model/constants";
import type { TeamTableProps } from "../../model/types";
import { Table } from "../../../../shared/ui/Table";

export function TeamTable({ rows }: TeamTableProps) {
  return (
    <Table
      columns={TABLE_COLUMNS}
      rows={rows}
      getRowKey={(row) => row.id}
      renderRow={({ id, teamName, status, memberAvatars, membersCount }) => (
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
            <div className="flex items-center justify-end gap-2">
              <Button type="button" color="success" aria-label="Edit team" onClick={() => undefined}>
                <RiEdit2Fill className="h-4 w-4" />
              </Button>

              <Button type="button" color="error" aria-label="Delete team" onClick={() => undefined}>
                <RiDeleteBin6Line className="h-4 w-4" />
              </Button>
            </div>
          </td>
        </>
      )}
    />
  );
}
