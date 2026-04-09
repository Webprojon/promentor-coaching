import type { Mentor } from "@/pages/mentors/model/types";

export const MENTOR_ROWS: Mentor[] = [
  {
    id: "m-001",
    name: "Olivia Turner",
    avatarUrl: "https://i.pravatar.cc/96?img=32",
    expertise: "Frontend",
    sessions: 6,
    availability: "High",
    linkedTeams: ["Growth Mentors", "Design Sprint Squad"],
    requestStatus: "Pending",
  },
  {
    id: "m-002",
    name: "Ethan Brooks",
    avatarUrl: "https://i.pravatar.cc/96?img=51",
    expertise: "Backend",
    sessions: 5,
    availability: "Medium",
    linkedTeams: ["Product Ninjas", "API Builders"],
    requestStatus: "Accepted",
  },
  {
    id: "m-003",
    name: "Sophia Reed",
    avatarUrl: "https://i.pravatar.cc/96?img=47",
    expertise: "Career",
    sessions: 4,
    availability: "High",
    linkedTeams: ["Career Boosters", "Interview Drill Club"],
    requestStatus: "Declined",
  },
  {
    id: "m-004",
    name: "Ava Wilson",
    avatarUrl: "https://i.pravatar.cc/96?img=48",
    expertise: "Backend",
    sessions: 3,
    availability: "High",
    linkedTeams: ["Product Ninjas", "API Builders"],
    requestStatus: "NotRequested",
  },
];

export const ACTION_LABEL_BY_STATUS: Record<Mentor["requestStatus"], string> = {
  Pending: "Cancel Request",
  Accepted: "Remove Mentorship",
  Declined: "Resend Request",
  NotRequested: "Request Mentorship",
};

export const ACTION_BUTTON_PROPS_BY_STATUS: Record<
  Mentor["requestStatus"],
  { variant: "outlined" | "contained"; color: "warning" | "error" | "info" }
> = {
  Pending: { variant: "outlined", color: "warning" },
  Accepted: { variant: "outlined", color: "error" },
  Declined: { variant: "contained", color: "info" },
  NotRequested: { variant: "outlined", color: "info" },
};