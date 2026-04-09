import { Typography } from "@promentorapp/ui-kit";
import type { FieldErrorProps } from "@/pages/teams/model/types";

export function FieldError({ message }: FieldErrorProps) {
    if (!message) return null;
    return (
      <Typography component="p" variantStyle="caption" className="text-xs! text-rose-300">
        {message}
      </Typography>
    );
  }