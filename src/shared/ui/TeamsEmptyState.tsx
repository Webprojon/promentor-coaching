import { Typography } from "@promentorapp/ui-kit";
import { IoIosPeople } from "react-icons/io";

export type TeamsEmptyStateProps = {
  description: string;
};

export function TeamsEmptyState({ description }: TeamsEmptyStateProps) {
  return (
    <section
      className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-white/10 bg-slate-800/10 px-6 py-14 text-center sm:px-10"
      aria-labelledby="teams-empty-state-title"
    >
      <IoIosPeople
        className="size-12 text-white/90"
        aria-hidden
      />
      <Typography
        id="teams-empty-state-title"
        component="h2"
        variantStyle="title"
        className="text-balance text-white"
      >
        No teams yet
      </Typography>
      <Typography
        component="p"
        variantStyle="caption"
        className="max-w-md text-pretty text-slate-400"
      >
        {description}
      </Typography>
    </section>
  );
}
