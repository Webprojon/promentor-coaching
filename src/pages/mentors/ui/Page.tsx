import PageForShell from "../../../shared/ui/page-for-shell/PageForShell";
import { Typography } from "@promentorapp/ui-kit";
import { mentors } from "../model/constants";

export default function MentorsPage() {
  return (
    <PageForShell
      title="Mentors"
      description="Connect with mentors based on technical depth, coaching style, and weekly availability."
    >
      <section className="mt-6 space-y-4">
        {mentors.map((mentor) => (
          <article
            key={mentor.id}
            className="rounded-xl border border-white/10 bg-slate-900/55 p-5 shadow-sm backdrop-blur"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <Typography
                  component="p"
                  className="text-xs uppercase tracking-wider text-cyan-200/80"
                >
                  {mentor.id}
                </Typography>
                <Typography
                  component="h2"
                  className="mt-2 text-lg font-semibold text-white"
                >
                  {mentor.name}
                </Typography>
                <Typography
                  component="p"
                  className="mt-1 text-sm text-slate-300"
                >
                  {mentor.expertise}
                </Typography>
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                {mentor.rating} rating
              </span>
            </div>
            <Typography component="p" className="mt-4 text-sm text-slate-200">
              {mentor.sessions} sessions available this week
            </Typography>
          </article>
        ))}
      </section>
    </PageForShell>
  );
}
