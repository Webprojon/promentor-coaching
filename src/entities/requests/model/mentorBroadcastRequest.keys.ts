export const mentorBroadcastRequestQueryKeys = {
  all: ["mentor-broadcast-requests"] as const,
  sent: () => [...mentorBroadcastRequestQueryKeys.all, "sent"] as const,
  targets: (kind: "interns" | "boards") =>
    [...mentorBroadcastRequestQueryKeys.all, "targets", kind] as const,
};
