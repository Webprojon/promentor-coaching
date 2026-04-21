import { apiRequest } from "@/shared/api/base-api";
import type { CurrentUser } from "@/shared/api/current-user";

type UsersListResponse = {
  items: CurrentUser[];
  total: number;
  limit: number;
  offset: number;
};

const REGULAR_USER_DIRECTORY_LIMIT = 100;

export async function fetchRegularUsersDirectory(): Promise<CurrentUser[]> {
  const params = new URLSearchParams({
    role: "REGULAR_USER",
    limit: String(REGULAR_USER_DIRECTORY_LIMIT),
    offset: "0",
  });
  const res = await apiRequest<UsersListResponse>(
    `/users?${params.toString()}`,
    {
      method: "GET",
    },
  );
  return res.items;
}
