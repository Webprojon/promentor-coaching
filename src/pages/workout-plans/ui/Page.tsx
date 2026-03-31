import PageForShell from "../../../shared/ui/page-for-shell/PageForShell";
import { workoutPlans } from "../model/constants";

export default function WorkoutPlansPage() {
  return (
    <PageForShell
      title="Workout Plans"
      description="Define focused learning routines with measurable sessions and clear outcomes for each learner path."
    >
      <section className="mt-6 space-y-4">
        {workoutPlans.map((plan) => (
          <article
            key={plan.id}
            className="rounded-xl border border-white/10 bg-slate-900/55 p-5 shadow-sm backdrop-blur"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-cyan-200/80">
                  {plan.id}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-white">
                  {plan.title}
                </h2>
              </div>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                {plan.track}
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-300">{plan.focus}</p>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-200">
              <span className="font-semibold text-white">{plan.sessions}</span>
              <span>sessions scheduled this week</span>
            </div>
          </article>
        ))}
      </section>
    </PageForShell>
  );
}
