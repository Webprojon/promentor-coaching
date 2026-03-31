import PageForShell from "../../../shared/ui/page-for-shell/PageForShell";
import { members } from "../model/constants";

export default function TeamsPage() {
  return (
    <PageForShell
      title="Teams Workspace"
      description="Build focused learning squads, track mentor availability, and keep collaboration flowing inside one consistent Promentor workflow."
    >
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-white/10 bg-slate-900/50 p-4 shadow-sm backdrop-blur">
          <p className="text-xs uppercase tracking-wider text-cyan-200/80">
            Active Mentors
          </p>
          <p className="mt-2 text-2xl font-bold text-white">12</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-slate-900/50 p-4 shadow-sm backdrop-blur">
          <p className="text-xs uppercase tracking-wider text-cyan-200/80">
            Teams Running
          </p>
          <p className="mt-2 text-2xl font-bold text-white">5</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-slate-900/50 p-4 shadow-sm backdrop-blur">
          <p className="text-xs uppercase tracking-wider text-cyan-200/80">
            Weekly Check-ins
          </p>
          <p className="mt-2 text-2xl font-bold text-white">28</p>
        </article>
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/55 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        <table className="w-full border-collapse">
          <thead className="bg-slate-800/70">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white/90">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                className="border-t border-white/10 hover:bg-slate-800/45"
              >
                <td className="px-4 py-3 text-sm text-slate-300">{member.id}</td>
                <td className="px-4 py-3 text-sm font-semibold text-slate-100">
                  {member.name}
                </td>
                <td className="px-4 py-3 text-sm text-slate-300">{member.role}</td>
                <td className="px-4 py-3 text-sm">
                  <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-xs font-medium text-white">
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageForShell>
  );
}
