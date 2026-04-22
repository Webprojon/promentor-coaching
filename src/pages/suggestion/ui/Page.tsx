import { Typography } from "@promentorapp/ui-kit";
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
      {state.isAuthReady && !state.isRegularUser ? (
        <Typography
          component="p"
          className="mb-4 rounded-md border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-sm text-amber-100"
          role="status"
        >
          Suggestions are available to regular users. Switch account or use the
          member app to send feedback to your team or mentor.
        </Typography>
      ) : null}
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
          disabled={!state.isRegularUser || Boolean(state.editingId)}
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

      <SuggestionHistory
        items={state.historyItems}
        editingId={state.editingId}
        isLoading={state.isHistoryLoading}
        onEdit={state.onEdit}
        onDelete={state.onDelete}
        isDeletingId={state.isDeletingId}
      />
    </>
  );
}
