import { useSuggestionPage } from "@/pages/suggestion/model/useSuggestionPage";
import SuggestionCategory from "@/pages/suggestion/ui/components/SuggestionCategory";
import SuggestionComposer from "@/pages/suggestion/ui/components/SuggestionComposer";
import SuggestionHistory from "@/pages/suggestion/ui/components/SuggestionHistory";
import { PageHeader } from "@/shared/ui";

export default function SuggestionPage() {
  const state = useSuggestionPage();

  return (
    <>
      <PageHeader
        title="Suggestions"
        description="Choose a single target (team, mentor, or board), write a clear note with priority, and review your history here. If no targets are available below yet, send the necessary requests first."
        className="mb-5"
      />
      <section className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <SuggestionCategory
          isTargetsLoading={state.isTargetsLoading}
          teams={state.teams}
          mentors={state.mentors}
          boards={state.boards}
          teamId={state.teamId}
          mentorId={state.mentorId}
          boardId={state.boardId}
          onTeamChange={state.onTeamChange}
          onMentorChange={state.onMentorChange}
          onBoardChange={state.onBoardChange}
          selectionError={state.selectionError}
          disabled={Boolean(state.editingId)}
        />

        <SuggestionComposer
          fields={state.fields}
          priorities={state.priorities}
          canSend={state.canSend}
          sendLabel={state.sendLabel}
          isSending={state.isSending}
          isEditing={Boolean(state.editingId)}
          onFieldChange={state.onFieldChange}
          onSend={state.onSend}
          onCancelEdit={state.onCancelEdit}
        />
      </section>

      {state.isAuthReady ? (
        <SuggestionHistory
          items={state.historyItems}
          editingId={state.editingId}
          isLoading={state.isHistoryLoading}
          onEdit={state.onEdit}
          onDelete={state.onDelete}
          isDeletingId={state.isDeletingId}
        />
      ) : null}
    </>
  );
}
