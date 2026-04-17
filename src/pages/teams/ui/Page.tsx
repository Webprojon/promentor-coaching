import { Button } from "@promentorapp/ui-kit";
import { useTeamsPage } from "@/pages/teams/model/useTeamsPage";
import { TeamCreatorSection } from "@/pages/teams/ui/components/TeamCreatorSection";
import { TeamTable } from "@/pages/teams/ui/components/TeamTable";
import { EmptyState } from "@/pages/teams/ui/components/EmptyState";
import { Modal, PageHeader } from "@/shared/ui";

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
    <>
      <section className="flex flex-col gap-6">
        <PageHeader
          title="Teams"
          description="Create and manage coaching teams, memberships, and roster details."
          actions={
            <Button type="button" variant="contained" onClick={openCreator}>
              Create Team
            </Button>
          }
        />

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
    </>
  );
}
