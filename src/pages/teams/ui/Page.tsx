import { Button } from "@promentorapp/ui-kit";
import { useTeamsPage } from "../model/useTeamsPage";
import { TeamCreatorSection } from "./components/TeamCreatorSection";
import { TeamTable } from "./components/TeamTable";
import { EmptyState } from "./components/EmptyState";
import { Modal } from "../../../shared/ui/Modal";
import PageForShell from "../../../shared/ui/PageForShell";

export default function TeamsPage() {
  const state = useTeamsPage();

  return (
    <PageForShell
      title="Team management"
      description="Build and manage your teams, invite members, and keep delivery aligned."
    >
      <section className="mt-6 flex flex-col gap-6">
        <div className="flex justify-end">
          <Button type="button" variant="contained" onClick={state.openCreator}>
            Create Team
          </Button>
        </div>

        {state.hasTeams ? <TeamTable rows={state.teamRows} /> : <EmptyState />}
      </section>

      <Modal
        open={state.isCreatorOpen}
        onClose={state.closeCreator}
        title="Create Team"
        secondaryAction={{ label: "Cancel", onClick: state.closeCreator, variant: "outlined" }}
        primaryAction={{
          label: "Confirm",
          onClick: state.saveCreator,
          variant: "contained",
          disabled: !state.canSave,
        }}
      >
        <TeamCreatorSection state={state} />
      </Modal>
    </PageForShell>
  );
}
