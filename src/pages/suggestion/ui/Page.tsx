import PageForShell from "../../../shared/ui/page-for-shell/PageForShell";
import { suggestions } from "../model/constants";

export default function SuggestionPage() {
  return (
    <PageForShell
      title="Suggestion Hub"
      description="Personalized suggestions to improve consistency, learning speed, and mentor feedback quality."
    >
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {suggestions.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-white/10 bg-slate-900/55 p-5 shadow-sm backdrop-blur"
          >
            <p className="text-xs uppercase tracking-wider text-cyan-200/80">
              {item.id}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{item.detail}</p>
            <span className="mt-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
              Priority: {item.priority}
            </span>
          </article>
        ))}
      </section>
    </PageForShell>
  );
}
