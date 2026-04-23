import axios from "axios";
import { env } from "@/shared/config/env";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl || undefined,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});
