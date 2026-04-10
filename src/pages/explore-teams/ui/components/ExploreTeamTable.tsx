import { Button } from "@promentorapp/ui-kit";
import {
  REQUEST_STATUS_BADGE_CLASS,
  TEAM_STATUS_BADGE_CLASS,
} from "@/shared/model/constants";
import type {
  ExploreTeam,
  ExploreTeamTableProps,
} from "@/pages/explore-teams/model/types";
import { TABLE_COLUMNS } from "@/pages/explore-teams/model/constants";
import { Badge, MemberAvatarStack, Table } from "@/shared/ui";

const REQUEST_ACTION_LABEL: Partial<
  Record<ExploreTeam["requestStatus"], string>
> = {
  Pending: "Pending",
  Accepted: "Joined",
};

export function ExploreTeamTable({
  rows,
  onRequestClick,
}: ExploreTeamTableProps) {
  return (
    <Table
      columns={TABLE_COLUMNS}
      rows={rows}
      getRowKey={(row) => row.id}
      renderRow={({
        id,
        teamName,
        status,
        memberAvatars,
        membersCount,
        requestStatus,
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
            />
          </td>
          <td className="px-4 py-3 text-sm">
            <div className="flex items-center justify-end">
              {REQUEST_ACTION_LABEL[requestStatus] ? (
                <Badge
                  toneClassName={REQUEST_STATUS_BADGE_CLASS[requestStatus]}
                >
                  {REQUEST_ACTION_LABEL[requestStatus]}
                </Badge>
              ) : (
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => onRequestClick(id)}
                >
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
