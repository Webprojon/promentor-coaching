import { Button, Typography } from "@promentorapp/ui-kit";
import { useTeamsPage } from "../model/useTeamsPage";
import { TeamCreatorSection } from "./components/TeamCreatorSection";
import { TeamTable } from "./components/TeamTable";
import { EmptyState } from "./components/EmptyState";
import { Modal } from "../../../shared/ui/Modal";

export default function TeamsPage() {
  const state = useTeamsPage();

  return (
    <main className="flex flex-col gap-6 w-full mx-auto max-w-7xl min-h-screen text-slate-100 px-4 lg:px-0">
      <Typography
        component="h2"
        variantStyle="title"
        className="flex flex-wrap items-center justify-between gap-3 text-xl text-white"
      >
        Team management
        <Button type="button" variant="contained" onClick={state.openCreator}>
          Create Team
        </Button>
      </Typography>

      {state.hasTeams ? <TeamTable rows={state.teamRows} /> : <EmptyState />}

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
    </main>
  );
}
