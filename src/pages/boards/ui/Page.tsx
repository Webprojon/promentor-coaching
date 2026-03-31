import PageForShell from "../../../shared/ui/page-for-shell/PageForShell";
import { boards } from "../model/constants";

export default function BoardsPage() {
  return (
    <PageForShell
      title="Boards"
      description="Organize learner goals into structured boards and monitor delivery quality week by week."
    >
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {boards.map((board) => (
          <article
            key={board.id}
            className="rounded-xl border border-white/10 bg-slate-900/55 p-5 shadow-sm backdrop-blur"
          >
            <p className="text-xs uppercase tracking-wider text-cyan-200/80">
              {board.id}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white">{board.title}</h2>
            <p className="mt-1 text-sm text-slate-300">Owner: {board.owner}</p>
            <p className="mt-1 text-sm text-slate-300">
              Tasks this week: {board.tasks}
            </p>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                <span>Completion</span>
                <span>{board.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-cyan-300"
                  style={{ width: `${board.progress}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </section>
    </PageForShell>
  );
}
