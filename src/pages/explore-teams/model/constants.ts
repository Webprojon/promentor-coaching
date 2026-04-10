import type { ExploreTeam } from "@/pages/explore-teams/model/types";

export const EXPLORE_TEAM_ROWS: ExploreTeam[] = [
  {
    id: "team-001",
    teamName: "Growth Mentors",
    visibility: "Open",
    status: "Active",
    membersCount: 12,
    memberAvatars: [
      "https://i.pravatar.cc/64?img=11",
      "https://i.pravatar.cc/64?img=18",
      "https://i.pravatar.cc/64?img=24",
    ],
    requestStatus: "Pending",
  },
  {
    id: "team-002",
    teamName: "Product Ninjas",
    visibility: "Open",
    status: "Pending",
    membersCount: 8,
    memberAvatars: [
      "https://i.pravatar.cc/64?img=34",
      "https://i.pravatar.cc/64?img=47",
      "https://i.pravatar.cc/64?img=53",
    ],
    requestStatus: "Accepted",
  },
  {
    id: "team-003",
    teamName: "Career Boosters",
    visibility: "Limited",
    status: "Active",
    membersCount: 9,
    memberAvatars: [
      "https://i.pravatar.cc/64?img=2",
      "https://i.pravatar.cc/64?img=14",
      "https://i.pravatar.cc/64?img=28",
    ],
    requestStatus: "Declined",
  },
];

export const TABLE_COLUMNS = [
  { key: "teamName", label: "Team Name", className: "w-[35%] text-left" },
  { key: "status", label: "Status", className: "w-[20%] text-left" },
  { key: "members", label: "Members", className: "w-[20%] text-left" },
  { key: "joinUs", label: "JOIN US", className: "w-[20%] text-right" },
] as const;
