import { Button } from "@promentorapp/ui-kit";
import { useTeamsPage } from "@/pages/teams/model/useTeamsPage";
import { TeamCreatorSection } from "@/pages/teams/ui/components/TeamCreatorSection";
import { TeamTable } from "@/pages/teams/ui/components/TeamTable";
import { EmptyState } from "@/pages/teams/ui/components/EmptyState";
import { Modal, PageForShell } from "@/shared/ui";

export default function TeamsPage() {
  const {
    openCreator,
    closeCreator,
    saveCreator,
    canSave,
    teamRows,
    hasTeams,
    isCreatorOpen,
    ...teamCreatorSectionProps
  } = useTeamsPage();

  return (
    <PageForShell
      title="Team management"
      description="Build and manage your teams, invite members, and keep delivery aligned."
    >
      <section className="mt-6 flex flex-col gap-6">
        <div className="flex justify-end">
          <Button type="button" variant="contained" onClick={openCreator}>
            Create Team
          </Button>
        </div>

        {hasTeams ? <TeamTable rows={teamRows} /> : <EmptyState />}
      </section>

      <Modal
        open={isCreatorOpen}
        onClose={closeCreator}
        title="Create Team"
        secondaryAction={{
          label: "Cancel",
          onClick: closeCreator,
          variant: "outlined",
        }}
        primaryAction={{
          label: "Confirm",
          onClick: saveCreator,
          variant: "contained",
          disabled: !canSave,
        }}
      >
        <TeamCreatorSection {...teamCreatorSectionProps} />
      </Modal>
    </PageForShell>
  );
}
