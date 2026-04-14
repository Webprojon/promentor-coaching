import { useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { Button, Typography } from "@promentorapp/ui-kit";
import type { KonvaEventObject } from "konva/lib/Node";
import {
  CANVAS_ASPECT_RATIO,
  CANVAS_MIN_HEIGHT,
  PLAYER_BASE_SIZE,
  PLAYER_MODAL_HEIGHT,
  PLAYER_MODAL_PADDING,
  PLAYER_MODAL_WIDTH,
  STICKER_BASE_SIZE,
} from "@/pages/boards/model/constants";
import { BoardBackground } from "@/pages/boards/ui/components/BoardBackground";
import {
  renderDrawableObject,
  toStickerKind,
} from "@/pages/boards/ui/components/TacticsCanvasObjects";
import { useBoardsTactics } from "@/pages/boards/model/useBoardsTactics";

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

function getModalPosition(x: number, y: number, width: number, height: number) {
  return {
    modalX: Math.max(PLAYER_MODAL_PADDING, Math.min(x + PLAYER_MODAL_PADDING, width - PLAYER_MODAL_WIDTH)),
    modalY: Math.max(PLAYER_MODAL_PADDING, Math.min(y + PLAYER_MODAL_PADDING, height - PLAYER_MODAL_HEIGHT)),
  };
}

export function TacticsCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(920);
  const [isDrawing, setIsDrawing] = useState(false);
  const [playerNameDraft, setPlayerNameDraft] = useState("");
  const [pendingPlayer, setPendingPlayer] = useState<{
    x: number;
    y: number;
    modalX: number;
    modalY: number;
  } | null>(null);

  const {
    boardType,
    tool,
    stroke,
    strokeWidth,
    objects,
    draftObject,
    setDraftObject,
    clearDraftObject,
    commitObject,
    eraseObjectAt,
  } = useBoardsTactics();

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setWidth(entry.contentRect.width);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const height = Math.max(CANVAS_MIN_HEIGHT, width / CANVAS_ASPECT_RATIO);

  const getPointer = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    return stage?.getPointerPosition() ?? null;
  };

  const handlePointerDown = (event: KonvaEventObject<MouseEvent>) => {
    const point = getPointer(event);
    if (!point) {
      return;
    }

    if (tool === "select") {
      clearDraftObject();
      return;
    }

    if (tool === "eraser") {
      eraseObjectAt(point.x, point.y);
      return;
    }

    const sticker = toStickerKind(tool);
    if (sticker) {
      if (sticker === "player") {
        const { modalX, modalY } = getModalPosition(point.x, point.y, width, height);
        setPendingPlayer({
          x: point.x,
          y: point.y,
          modalX,
          modalY,
        });
        setPlayerNameDraft("");
        return;
      }

      commitObject({
        id: createId(),
        kind: "sticker",
        sticker,
        x: point.x,
        y: point.y,
        size: STICKER_BASE_SIZE + strokeWidth * 2,
        stroke,
        strokeWidth,
      });
      return;
    }

    setIsDrawing(true);

    if (tool === "line" || tool === "arrow") {
      setDraftObject({
        id: createId(),
        kind: tool,
        points: [point.x, point.y, point.x, point.y],
        stroke,
        strokeWidth,
      });
      return;
    }

    if (tool === "rect") {
      setDraftObject({
        id: createId(),
        kind: "rect",
        x: point.x,
        y: point.y,
        width: 0,
        height: 0,
        stroke,
        strokeWidth,
      });
      return;
    }

    setDraftObject({
      id: createId(),
      kind: "circle",
      x: point.x,
      y: point.y,
      radius: 1,
      stroke,
      strokeWidth,
    });
  };

  const handlePointerMove = (event: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing || !draftObject) {
      return;
    }

    const point = getPointer(event);
    if (!point) {
      return;
    }

    if (draftObject.kind === "line" || draftObject.kind === "arrow") {
      setDraftObject({
        ...draftObject,
        points: [draftObject.points[0], draftObject.points[1], point.x, point.y],
      });
      return;
    }

    if (draftObject.kind === "rect") {
      setDraftObject({
        ...draftObject,
        width: point.x - draftObject.x,
        height: point.y - draftObject.y,
      });
      return;
    }

    if (draftObject.kind !== "circle") {
      return;
    }

    setDraftObject({
      ...draftObject,
      radius: Math.max(1, Math.hypot(point.x - draftObject.x, point.y - draftObject.y)),
    });
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    if (!draftObject) {
      return;
    }
    commitObject(draftObject);
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden shadow-2xl">
      <Stage
        width={width}
        height={height}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
      >
        <Layer listening={false}>
          <BoardBackground boardType={boardType} width={width} height={height} />
        </Layer>
        <Layer>
          {objects.map(renderDrawableObject)}
          {draftObject ? renderDrawableObject(draftObject) : null}
        </Layer>
      </Stage>

      {pendingPlayer && (
        <form
          className="absolute z-20 w-44 rounded-lg border border-white/15 bg-slate-950/95 p-3 shadow-xl"
          style={{ left: pendingPlayer.modalX, top: pendingPlayer.modalY }}
          onSubmit={(event) => {
            event.preventDefault();
            commitObject({
              id: createId(),
              kind: "sticker",
              sticker: "player",
              x: pendingPlayer.x,
              y: pendingPlayer.y,
              size: PLAYER_BASE_SIZE + strokeWidth * 2,
              stroke,
              strokeWidth,
              label: playerNameDraft.trim() || undefined,
            });
            setPendingPlayer(null);
            setPlayerNameDraft("");
          }}
        >
          <Typography component="p" className="text-xs font-medium uppercase tracking-wide text-slate-300">
            Player name
          </Typography>
          <input
            autoFocus
            aria-label="Player name"
            value={playerNameDraft}
            onChange={(event) => setPlayerNameDraft(event.target.value)}
            placeholder="e.g. john"
            className="mt-2 w-full rounded-md border border-white/15 bg-slate-900/80 px-2 py-1 text-sm text-white outline-none ring-cyan-300/70 placeholder:text-slate-500 focus:ring-2"
          />
          <div className="mt-3 flex justify-end gap-2">
            <Button
              type="button"
              onClick={() => {
                setPendingPlayer(null);
                setPlayerNameDraft("");
              }}
              className="cursor-pointer border-white/15 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="cursor-pointer border-cyan-300/50 bg-cyan-400/15 px-2.5 py-1.5 text-xs text-cyan-100 hover:bg-cyan-400/25"
            >
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
