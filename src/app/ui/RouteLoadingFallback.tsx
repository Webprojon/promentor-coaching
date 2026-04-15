export function RouteLoadingFallback() {
  return (
    <section role="status" aria-live="polite" aria-atomic="true">
      <span className="sr-only">Loading page...</span>

      <div className="flex flex-col gap-6" aria-hidden="true">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-8 w-52 animate-pulse rounded-md bg-slate-300/20" />
            <div className="h-4 w-full max-w-xl animate-pulse rounded-md bg-slate-300/15" />
          </div>
          <div className="h-10 w-28 animate-pulse rounded-lg bg-slate-300/20" />
        </div>

        <div className="rounded-lg border border-white/10 bg-slate-800/10 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded-md bg-slate-300/15" />
            <div className="h-4 w-11/12 animate-pulse rounded-md bg-slate-300/15" />
            <div className="h-4 w-9/12 animate-pulse rounded-md bg-slate-300/15" />
            <div className="h-4 w-10/12 animate-pulse rounded-md bg-slate-300/15" />
          </div>
        </div>
      </div>
    </section>
  );
}
