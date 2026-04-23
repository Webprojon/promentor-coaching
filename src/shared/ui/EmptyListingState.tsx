import { Typography } from "@promentorapp/ui-kit";
import { useId } from "react";
import { IoIosPeople } from "react-icons/io";

export type EmptyListingStateProps = {
  title: string;
  description: string;
};

export function EmptyListingState({
  title,
  description,
}: EmptyListingStateProps) {
  const titleId = useId();
  return (
    <section
      className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-white/10 bg-slate-800/10 px-6 py-14 text-center shadow-[0_10px_40px_rgba(0,0,0,0.35)] sm:px-10"
      aria-labelledby={titleId}
    >
      <IoIosPeople className="size-12 text-white/90" aria-hidden />
      <Typography
        id={titleId}
        component="h2"
        variantStyle="title"
        className="text-balance text-white"
      >
        {title}
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
