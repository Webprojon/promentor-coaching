import { Typography } from "@promentorapp/ui-kit";
import { IoIosPeople } from "react-icons/io";

export function EmptyState() {
  return (
    <section className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 p-8 sm:p-12">
      <IoIosPeople className="size-12" />
      <Typography component="h3" variantStyle="title">
        No teams yet
      </Typography>
      <Typography component="p" variantStyle="caption">
        Create your first team to get started.
      </Typography>
    </section>
  );
}
