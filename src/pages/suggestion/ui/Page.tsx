import { useSuggestionPage } from "@/pages/suggestion/model/useSuggestionPage";
import { PageHeader } from "@/shared/ui";
import JoinedTeamsPanel from "@/pages/suggestion/ui/components/JoinedTeamsPanel";
import SuggestionComposer from "@/pages/suggestion/ui/components/SuggestionComposer";
import SuggestionHistory from "@/pages/suggestion/ui/components/SuggestionHistory";

export default function SuggestionPage() {
  const state = useSuggestionPage();

  return (
    <>
      <PageHeader
        title="Suggestions"
        description="Pick a team, write a clear suggestion with priority, and review what you have already sent."
        className="mb-5"
      />
      <section className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
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
    </>
  );
}
