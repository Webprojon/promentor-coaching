import type { ReactNode } from "react";
import { Typography } from "@promentorapp/ui-kit";

type PageForShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function PageForShell({
  title,
  description,
  children,
}: PageForShellProps) {
  return (
    <main className="min-h-screen text-slate-100 mx-auto max-w-7xl w-full px-4 pb-4 lg:px-0 ">
        <section className="flex flex-col gap-2 rounded-lg border border-white/10 bg-linear-to-br from-cyan-500/12 via-slate-900/55 to-indigo-500/10 p-6 shadow-[0_0_0_1px_rgba(56,189,248,0.1),0_12px_50px_rgba(0,0,0,0.45)] backdrop-blur-sm">
          <Typography
            component="h1"
            variantStyle="title"
            className="text-2xl! font-extrabold tracking-tight text-slate-50 sm:text-4xl"
          >
            {title}
          </Typography>
          <Typography
            component="p"
            variantStyle="body"
            className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base"
          >
            {description}
          </Typography>
        </section>
        {children}
    </main>
  );
}
