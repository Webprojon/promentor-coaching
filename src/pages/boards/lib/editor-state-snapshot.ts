import type { TacticsEditorSnapshot } from "@/pages/boards/model/useBoardsTactics";

type DraftedSnapshot = TacticsEditorSnapshot & {
  draftObjectJson: string | null;
};

export function serializeEditorForDirty(
  state: TacticsEditorSnapshot & { draftObject: unknown },
) {
  const snap: DraftedSnapshot = {
    boardType: state.boardType,
    objects: state.objects,
    stroke: state.stroke,
    strokeWidth: state.strokeWidth,
    draftObjectJson: state.draftObject
      ? JSON.stringify(state.draftObject)
      : null,
  };
  return JSON.stringify(snap);
}
