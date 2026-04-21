import { Button, Typography } from "@promentorapp/ui-kit";
import { useTeamsPage } from "@/pages/teams/model/useTeamsPage";
import { TeamCreatorSection } from "@/pages/teams/ui/components/TeamCreatorSection";
import { TeamTable } from "@/pages/teams/ui/components/TeamTable";
import { EmptyState } from "@/pages/teams/ui/components/EmptyState";
import { Modal, PageHeader } from "@/shared/ui";
import { DeleteTeamModal } from "@/pages/teams/ui/components/DeleteTeamModal";

export default function TeamsPage() {
  const {
    openCreator,
    closeCreator,
    saveCreator,
    canSave,
    teamRows,
    hasTeams,
    isCreatorOpen,
    isLoadingTeams,
    isMentor,
    modalTitle,
    primaryLabel,
    onEditTeam,
    onDeleteTeam,
    deletingTeamId,
    closeDeleteTeamModal,
    confirmDeleteTeam,
    deleteTeamModalOpen,
    deleteTeamModalName,
    ...teamCreatorSectionProps
  } = useTeamsPage();

  return (
    <>
      <section className="flex flex-col gap-6">
        <PageHeader
          title="Teams"
          description="Create and manage coaching teams, memberships, and roster details."
          actions={
            isMentor ? (
              <Button type="button" variant="contained" onClick={openCreator}>
                Create Team
              </Button>
            ) : null
          }
        />

        {isLoadingTeams ? (
          <Typography component="p" variantStyle="body" className="text-slate-400">
            Loading teams…
          </Typography>
        ) : hasTeams ? (
          <TeamTable
            rows={teamRows}
            showActions={isMentor}
            onEdit={onEditTeam}
            onDelete={onDeleteTeam}
            deletingTeamId={deletingTeamId}
          />
        ) : (
          <EmptyState />
        )}
      </section>

      <DeleteTeamModal
        open={deleteTeamModalOpen}
        teamName={deleteTeamModalName}
        onClose={closeDeleteTeamModal}
        onConfirm={confirmDeleteTeam}
        isDeleting={deletingTeamId !== null}
      />

      <Modal
        open={isCreatorOpen}
        onClose={closeCreator}
        title={modalTitle}
        secondaryAction={{
          label: "Cancel",
          onClick: closeCreator,
          variant: "outlined",
        }}
        primaryAction={{
          label: primaryLabel,
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
