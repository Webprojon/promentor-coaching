import { Button } from "@promentorapp/ui-kit";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { TABLE_COLUMNS } from "@/pages/teams/model/constants";
import { TEAM_STATUS_BADGE_CLASS } from "@/shared/model/constants";
import type { TeamTableProps } from "@/pages/teams/model/types";
import { Badge, MemberAvatarStack, Table } from "@/shared/ui";

export function TeamTable({
  rows,
  showActions,
  onEdit,
  onDelete,
  deletingTeamId,
}: TeamTableProps) {
  return (
    <Table
      caption="Teams list with status, members, and actions."
      columns={TABLE_COLUMNS}
      rows={rows}
      getRowKey={(row) => row.id}
      renderRow={({
        id,
        teamName,
        status,
        memberAvatars,
        memberStackNames,
        membersCount,
      }) => (
        <>
          <td className="px-4 py-3 text-sm font-semibold text-slate-100">
            {teamName}
          </td>
          <td className="px-4 py-3 text-sm">
            <Badge toneClassName={TEAM_STATUS_BADGE_CLASS[status]}>
              {status}
            </Badge>
          </td>
          <td className="px-4 py-3 text-sm">
            <MemberAvatarStack
              id={id}
              avatarUrls={memberAvatars}
              totalCount={membersCount}
              memberNames={memberStackNames}
            />
          </td>
          <td className="px-4 py-3 text-sm">
            {showActions ? (
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  color="success"
                  aria-label="Edit team"
                  onClick={() => onEdit(id)}
                  disabled={deletingTeamId !== null}
                >
                  <RiEdit2Fill className="h-4 w-4" />
                </Button>

                <Button
                  type="button"
                  color="error"
                  aria-label="Delete team"
                  onClick={() => onDelete(id)}
                  disabled={deletingTeamId !== null}
                >
                  <RiDeleteBin6Line className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <span className="text-slate-500">—</span>
            )}
          </td>
        </>
      )}
    />
  );
}
