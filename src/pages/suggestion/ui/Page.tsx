import PageForShell from "../../../shared/ui/PageForShell";
import { useSuggestionPage } from "../model/useSuggestionPage";
import JoinedTeamsPanel from "./components/JoinedTeamsPanel";
import SuggestionComposer from "./components/SuggestionComposer";
import SuggestionHistory from "./components/SuggestionHistory";

export default function SuggestionPage() {
  const state = useSuggestionPage();

  return (
    <PageForShell
      title="Suggestion Hub"
      description="Send focused suggestions to teams you already joined and track what gets reviewed or applied."
    >
      <section className="mt-6 grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <JoinedTeamsPanel
          joinedTeams={state.joinedTeams}
          selectedTeamId={state.selectedTeamId}
          selectedTeam={state.selectedTeam}
          onTeamChange={state.onTeamChange}
        />

        <SuggestionComposer
          draft={state.draft}
          priorities={state.priorities}
          canSend={state.canSend}
          onDraftChange={state.onDraftChange}
          onSend={state.onSend}
        />
      </section>

      <SuggestionHistory history={state.history} />
    </PageForShell>
  );
}
