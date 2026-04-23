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

const MEMBER_AVATAR_MAX_VISIBLE = 3;

export function ExploreTeamTable({
  rows,
  onRequestClick,
  isSendingJoin,
}: ExploreTeamTableProps) {
  function renderRow({
    id,
    teamName,
    status,
    memberAvatars,
    membersCount,
    joinUi,
  }: ExploreTeam) {
    return (
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
            maxVisible={MEMBER_AVATAR_MAX_VISIBLE}
            ariaLabel={`${teamName}: ${membersCount} members, ${Math.min(memberAvatars.length, MEMBER_AVATAR_MAX_VISIBLE)} shown${membersCount > MEMBER_AVATAR_MAX_VISIBLE ? `, ${membersCount - MEMBER_AVATAR_MAX_VISIBLE} more` : ""}`}
          />
        </td>
        <td className="px-4 py-3 text-sm">
          <div className="flex items-center justify-end">
            {joinUi === "your_team" ? (
              <span
                className="text-xs font-medium text-slate-400"
                title="You created this team"
              >
                Your team
              </span>
            ) : joinUi === "ineligible" ? (
              <span
                className="max-w-44 text-right text-xs leading-snug text-slate-500"
                title="Only regular user accounts can send a join request from Explore teams"
              >
                Regular account only
              </span>
            ) : joinUi === "pending" ? (
              <Badge toneClassName={REQUEST_STATUS_BADGE_CLASS.Pending}>
                Pending
              </Badge>
            ) : joinUi === "joined" ? (
              <Badge toneClassName={REQUEST_STATUS_BADGE_CLASS.Accepted}>
                Joined
              </Badge>
            ) : joinUi === "declined" ? (
              <div className="flex max-w-xs flex-col items-end gap-2 sm:max-w-none sm:flex-row sm:items-center sm:gap-3">
                <Badge toneClassName={REQUEST_STATUS_BADGE_CLASS.Declined}>
                  Declined
                </Badge>
                <Button
                  type="button"
                  variant="outlined"
                  disabled={Boolean(isSendingJoin)}
                  onClick={() => onRequestClick(id)}
                >
                  Send request
                </Button>
              </div>
            ) : joinUi === "send_request" ? (
              <Button
                type="button"
                variant="outlined"
                disabled={Boolean(isSendingJoin)}
                onClick={() => onRequestClick(id)}
              >
                Send request
              </Button>
            ) : (
              <span className="text-xs font-medium text-slate-500">—</span>
            )}
          </div>
        </td>
      </>
    );
  }

  return (
    <Table
      caption="Explore teams list with status, members, and request actions."
      columns={TABLE_COLUMNS}
      rows={rows}
      getRowKey={(row) => row.id}
      renderRow={renderRow}
    />
  );
}
