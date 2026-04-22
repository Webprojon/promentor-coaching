import { useCallback, useMemo, useRef, useState } from "react";
import { Typography } from "@promentorapp/ui-kit";
import type { CreateTacticalBoardBody, TacticalBoardRecord } from "@/entities/boards";
import {
  useCreateTacticalBoardMutation,
  useDeleteTacticalBoardMutation,
  useTacticalBoardsListQuery,
  useUpdateTacticalBoardMutation,
} from "@/entities/boards";
import { useTeamsListQuery } from "@/entities/teams";
import { useHostAuthSession } from "@/features/auth";
import { serializeEditorForDirty } from "@/pages/boards/lib/editor-state-snapshot";
import { type BoardAssignFormValues } from "@/pages/boards/model/schema/board-assign";
import { useBoardsTactics } from "@/pages/boards/model/useBoardsTactics";
import {
  BoardCard,
  BoardDetailsModal,
  BoardTypeSwitch,
  CreateBoardCard,
  DeleteBoardConfirmModal,
  SaveBoardModal,
} from "@/pages/boards/ui/components";
import { TacticsCanvas } from "@/pages/boards/ui/components/TacticsCanvas";
import { TacticsToolbar } from "@/pages/boards/ui/components/TacticsToolbar";
import { EmptyListingState } from "@/shared/ui/EmptyListingState";
import { PageHeader } from "@/shared/ui";

type ViewMode = "list" | "editor" | "viewer";

const EMPTY_TACTICAL_BOARDS: TacticalBoardRecord[] = [];

function BoardsListIntro() {
  return (
    <PageHeader
      title="Tactical Boards"
      description="Browse plans shared in this space. Mentors can create and edit boards; everyone can open a board to read the details."
    />
  );
}

function BoardsEditorIntro() {
  return (
    <PageHeader
      title="Tactical Boards"
      description="Draw and plan hockey or football tactical scenarios. Use Save when you are ready to name the board and assign it to a team."
      actions={<BoardTypeSwitch />}
    />
  );
}

function BoardsViewerIntro({ boardTitle }: { boardTitle: string }) {
  return (
    <PageHeader
      title={boardTitle}
      description="View the tactical layout as saved on the server. This is the same board mentors edit; interaction is off in this mode."
    />
  );
}

function buildPayloadFromTactics(
  values: BoardAssignFormValues,
): CreateTacticalBoardBody {
  const tactics = useBoardsTactics.getState();
  return {
    name: values.boardName,
    teamId: values.teamId,
    sessionDate: values.sessionDate,
    boardType: tactics.boardType,
    objects: tactics.objects,
    stroke: tactics.stroke,
    strokeWidth: tactics.strokeWidth,
  };
}

export default function BoardsPage() {
  const { session, isHydrating } = useHostAuthSession();
  const authed = session.isAuthenticated;
  const isMentor = session.user?.role === "MENTOR";

  const teamsQuery = useTeamsListQuery(!isHydrating && authed);
  const teams = teamsQuery.data ?? [];

  const boardsQuery = useTacticalBoardsListQuery(!isHydrating && authed);
  const data = boardsQuery.data;
  const boards = data ?? EMPTY_TACTICAL_BOARDS;

  const createBoardMutation = useCreateTacticalBoardMutation();
  const updateBoardMutation = useUpdateTacticalBoardMutation();
  const deleteBoardMutation = useDeleteTacticalBoardMutation();

  const loadEditorState = useBoardsTactics((s) => s.loadEditorState);
  const resetForNewBoard = useBoardsTactics((s) => s.resetForNewBoard);

  const [view, setView] = useState<ViewMode>("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const editorBaselineRef = useRef<string | null>(null);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [boardInDetails, setBoardInDetails] =
    useState<TacticalBoardRecord | null>(null);
  const [boardPendingDelete, setBoardPendingDelete] =
    useState<TacticalBoardRecord | null>(null);

  const isDirty = useBoardsTactics(
    useCallback(
      (state) =>
        editorBaselineRef.current !== null &&
        serializeEditorForDirty(state) !== editorBaselineRef.current,
      [],
    ),
  );

  const saveFormDefaults: BoardAssignFormValues = useMemo(() => {
    const board =
      editingId && data ? (data.find((b) => b.id === editingId) ?? null) : null;
    return {
      boardName: board?.name ?? "",
      teamId: board?.teamId ?? "",
      sessionDate: board?.sessionDate ?? "",
    };
  }, [editingId, data]);

  const saveInFlight =
    createBoardMutation.isPending || updateBoardMutation.isPending;

  const startCreate = () => {
    resetForNewBoard();
    setEditingId(null);
    setView("editor");
    editorBaselineRef.current = serializeEditorForDirty(
      useBoardsTactics.getState(),
    );
  };

  function openBoardFromRecord(board: TacticalBoardRecord) {
    loadEditorState({
      boardType: board.boardType,
      objects: board.objects,
      stroke: board.stroke,
      strokeWidth: board.strokeWidth,
    });
    setEditingId(board.id);
  }

  function exitEditor() {
    editorBaselineRef.current = null;
    setView("list");
    setEditingId(null);
    resetForNewBoard();
  }

  const onBackFromEditor = () => {
    if (isDirty) {
      const ok = window.confirm(
        "Discard your changes and go back to the board list?",
      );
      if (!ok) {
        return;
      }
    }
    exitEditor();
  };

  const openSaveModal = () => {
    if (!isMentor) {
      return;
    }
    setSaveModalOpen(true);
  };

  const onSubmitSave = async (values: BoardAssignFormValues) => {
    const body = buildPayloadFromTactics(values);
    if (editingId) {
      await updateBoardMutation.mutateAsync({ id: editingId, body });
    } else {
      await createBoardMutation.mutateAsync(body);
    }
    setSaveModalOpen(false);
    exitEditor();
  };

  const startViewFromDetails = (board: TacticalBoardRecord) => {
    openBoardFromRecord(board);
    setBoardInDetails(null);
    setView("viewer");
    editorBaselineRef.current = null;
  };

  const startEditFromDetails = (board: TacticalBoardRecord) => {
    openBoardFromRecord(board);
    setBoardInDetails(null);
    setView("editor");
    editorBaselineRef.current = serializeEditorForDirty(
      useBoardsTactics.getState(),
    );
  };

  const activeBoardName =
    editingId && data
      ? (data.find((b) => b.id === editingId)?.name ?? "Tactical board")
      : "Tactical board";

  if (view === "editor" && isMentor) {
    return (
      <section className="space-y-5">
        <BoardsEditorIntro />

        <TacticsToolbar
          variant="editor"
          onBack={onBackFromEditor}
          onSave={openSaveModal}
          canSave={isDirty}
          isSaveBusy={saveInFlight}
        />

        <TacticsCanvas />

        <SaveBoardModal
          open={saveModalOpen}
          onClose={() => setSaveModalOpen(false)}
          isBusy={saveInFlight}
          defaultValues={saveFormDefaults}
          teams={teams}
          teamsLoading={teamsQuery.isPending}
          onSave={onSubmitSave}
        />
      </section>
    );
  }

  if (view === "viewer" && authed) {
    return (
      <section className="space-y-5">
        <BoardsViewerIntro boardTitle={activeBoardName} />

        <TacticsToolbar variant="viewer" onBack={exitEditor} />

        <TacticsCanvas readOnly />
      </section>
    );
  }

  if (authed && boardsQuery.isPending) {
    return (
      <section className="space-y-5">
        <BoardsListIntro />
        <Typography component="p" className="text-sm text-slate-400">
          Loading boards…
        </Typography>
      </section>
    );
  }

  if (authed && boardsQuery.isError) {
    return (
      <section className="space-y-5">
        <BoardsListIntro />
        <Typography component="p" className="text-sm text-rose-300">
          Could not load boards. Try again later.
        </Typography>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <BoardsListIntro />

      {boards.length === 0 && !isMentor ? (
        <EmptyListingState
          title="No tactical boards yet"
          description="When a mentor creates a plan, it will show up here for everyone on the team to review."
        />
      ) : (
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {boards.map((board) => (
            <li key={board.id} className="flex h-full min-h-0 p-0">
              <BoardCard
                board={board}
                onMore={() => setBoardInDetails(board)}
              />
            </li>
          ))}
          {isMentor ? (
            <li
              className="flex h-full min-h-0 p-0"
              key="create-tactical-board"
            >
              <CreateBoardCard onCreate={startCreate} />
            </li>
          ) : null}
        </ul>
      )}

      <BoardDetailsModal
        open={Boolean(boardInDetails)}
        board={boardInDetails}
        isMentor={isMentor}
        onClose={() => setBoardInDetails(null)}
        onViewBoard={() => {
          if (boardInDetails) {
            startViewFromDetails(boardInDetails);
          }
        }}
        onEdit={() => {
          if (boardInDetails) {
            startEditFromDetails(boardInDetails);
          }
        }}
        onRequestDelete={() => {
          if (boardInDetails) {
            setBoardPendingDelete(boardInDetails);
            setBoardInDetails(null);
          }
        }}
      />

      <DeleteBoardConfirmModal
        open={Boolean(boardPendingDelete)}
        boardName={boardPendingDelete?.name ?? ""}
        isDeleting={deleteBoardMutation.isPending}
        onCancel={() => setBoardPendingDelete(null)}
        onConfirm={async () => {
          if (boardPendingDelete) {
            await deleteBoardMutation.mutateAsync(boardPendingDelete.id);
          }
          setBoardPendingDelete(null);
        }}
      />
    </section>
  );
}
