import type { CoachingTeamListItem } from "@/entities/team/model/team.types";
import type { CurrentUser } from "@/shared/api/current-user";
import type { TeamMemberOption, TeamRow } from "@/pages/teams/model/types";

export function displayFirstName(fullName: string): string {
  const t = fullName.trim();
  if (!t) {
    return "";
  }
  return t.split(/\s+/)[0] ?? "";
}

function avatarFallback(firstName: string): string {
  const seed = firstName.trim() || "User";
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(seed)}&length=1&size=64&background=1e293b&color=e2e8f0`;
}

export function mapListItemToTeamRow(item: CoachingTeamListItem): TeamRow {
  const firstNames = item.memberFirstNames ?? [];
  const memberStackNames = item.memberAvatarUrls.map((_, index) => {
    const word = firstNames[index]?.trim() ?? "";
    return word.length > 0 ? word : `User ${index + 1}`;
  });

  const memberAvatars = item.memberAvatarUrls.map((url, index) => {
    if (url && url.trim().length > 0) {
      return url;
    }
    const seed = firstNames[index]?.trim() || `User${index + 1}`;
    return avatarFallback(seed);
  });

  return {
    id: item.id,
    teamName: item.name,
    status: item.status === "ACTIVE" ? "Active" : "Pending",
    membersCount: item.membersCount,
    memberAvatars,
    memberStackNames,
  };
}

export function mapUserToMemberOption(user: CurrentUser): TeamMemberOption {
  const first = displayFirstName(user.fullName);
  const label = first || user.fullName.trim() || "User";
  const raw = user.avatarUrl?.trim() ?? "";
  return {
    id: user.id,
    name: label,
    avatarUrl: raw,
  };
}
