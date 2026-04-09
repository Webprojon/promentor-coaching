import { Typography } from "@promentorapp/ui-kit";

export function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return (
      <Typography component="p" variantStyle="caption" className="text-xs! text-rose-300">
        {message}
      </Typography>
    );
  }