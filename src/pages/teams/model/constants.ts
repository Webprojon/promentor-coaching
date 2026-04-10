import type { TeamMemberOption, TeamRow } from "@/pages/teams/model/types";

export const TEAM_ROWS: TeamRow[] = [
  {
    id: "team-001",
    teamName: "Growth Mentors",
    status: "Active",
    membersCount: 12,
    memberAvatars: [
      "https://i.pravatar.cc/64?img=11",
      "https://i.pravatar.cc/64?img=18",
      "https://i.pravatar.cc/64?img=24",
    ],
  },
  {
    id: "team-002",
    teamName: "Product Ninjas",
    status: "Pending",
    membersCount: 8,
    memberAvatars: [
      "https://i.pravatar.cc/64?img=34",
      "https://i.pravatar.cc/64?img=47",
      "https://i.pravatar.cc/64?img=53",
    ],
  },
];

export const TEAM_MEMBER_OPTIONS: TeamMemberOption[] = [
  {
    id: "user-001",
    name: "Ava Carter",
    avatarUrl: "https://i.pravatar.cc/64?img=5",
  },
  {
    id: "user-002",
    name: "Noah Brooks",
    avatarUrl: "https://i.pravatar.cc/64?img=12",
  },
  {
    id: "user-003",
    name: "Sofia Reed",
    avatarUrl: "https://i.pravatar.cc/64?img=20",
  },
  {
    id: "user-004",
    name: "Mason Lee",
    avatarUrl: "https://i.pravatar.cc/64?img=31",
  },
  {
    id: "user-005",
    name: "Isabella James",
    avatarUrl: "https://i.pravatar.cc/64?img=44",
  },
  {
    id: "user-006",
    name: "Liam Ward",
    avatarUrl: "https://i.pravatar.cc/64?img=56",
  },
];

export const TABLE_COLUMNS = [
  { key: "teamName", label: "Team Name", className: "w-[40%] text-left" },
  { key: "status", label: "Status", className: "w-[20%] text-left" },
  { key: "members", label: "Members", className: "w-[20%] text-left" },
  { key: "actions", label: "Actions", className: "w-[20%] text-right" },
] as const;
