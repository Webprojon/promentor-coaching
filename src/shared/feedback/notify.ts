import { toast } from "react-toastify";

export function notifyOk(message: string): void {
  toast.success(message);
}
