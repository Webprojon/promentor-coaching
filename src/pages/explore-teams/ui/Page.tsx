import PageForShell from "../../../shared/ui/page-for-shell/PageForShell";
import { featuredTeams } from "../model/constants";

export default function ExploreTeamsPage() {
  return (
    <PageForShell
      title="Explore Teams"
      description="Discover active learning teams, compare focus areas, and join the cohort that best matches your goals."
    >
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {featuredTeams.map((team) => (
          <article
            key={team.id}
            className="rounded-xl border border-white/10 bg-slate-900/55 p-5 shadow-sm backdrop-blur"
          >
            <p className="text-xs uppercase tracking-wider text-cyan-200/80">
              {team.id}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white">{team.name}</h2>
            <p className="mt-2 text-sm text-slate-300">{team.focus}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-200">
              <span>{team.members} members</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">
                Match {team.match}
              </span>
            </div>
          </article>
        ))}
      </section>
    </PageForShell>
  );
}
