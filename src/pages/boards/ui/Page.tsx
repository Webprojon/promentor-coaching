import { Typography } from "@promentorapp/ui-kit";
import { useBoardsPage } from "@/pages/boards/model/useBoardsPage";

export default function BoardsPage() {
  const { boards } = useBoardsPage();

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {boards.map((board) => (
        <article
          key={board.id}
          className="rounded-xl border border-white/10 bg-slate-900/55 p-5 shadow-sm backdrop-blur"
        >
          <Typography
            component="p"
            className="text-xs uppercase tracking-wider text-cyan-200/80"
          >
            {board.id}
          </Typography>
          <Typography
            component="p"
            className="mt-2 text-lg font-semibold text-white"
          >
            {board.title}
          </Typography>
          <Typography component="p" className="mt-1 text-sm text-slate-300">
            Owner: {board.owner}
          </Typography>
          <Typography component="p" className="mt-1 text-sm text-slate-300">
            Tasks this week: {board.tasks}
          </Typography>
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
  );
}
