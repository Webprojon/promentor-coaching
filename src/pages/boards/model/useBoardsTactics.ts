import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isObjectHit } from "@/pages/boards/lib/hitTest";
import {
  DEFAULT_BOARD_TYPE,
  DEFAULT_STROKE,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_TOOL,
  TACTICS_BOARD_STORAGE_KEY,
} from "@/pages/boards/model/constants";
import type {
  BoardType,
  DrawableObject,
  ToolKind,
} from "@/pages/boards/model/types";

type DraftObject = DrawableObject | null;

type TacticsBoardState = {
  boardType: BoardType;
  tool: ToolKind;
  stroke: string;
  strokeWidth: number;
  objects: DrawableObject[];
  draftObject: DraftObject;
  history: DrawableObject[][];
  future: DrawableObject[][];
  setBoardType: (value: BoardType) => void;
  setTool: (value: ToolKind) => void;
  setStroke: (value: string) => void;
  setStrokeWidth: (value: number) => void;
  setDraftObject: (value: DraftObject) => void;
  clearDraftObject: () => void;
  commitObject: (value: DrawableObject) => void;
  clearBoard: () => void;
  eraseObjectAt: (x: number, y: number) => void;
  undo: () => void;
  redo: () => void;
};

function snapshot(state: TacticsBoardState) {
  return [...state.objects];
}

export const useBoardsTactics = create<TacticsBoardState>()(
  persist(
    (set) => ({
      boardType: DEFAULT_BOARD_TYPE,
      tool: DEFAULT_TOOL,
      stroke: DEFAULT_STROKE,
      strokeWidth: DEFAULT_STROKE_WIDTH,
      objects: [],
      draftObject: null,
      history: [],
      future: [],
      setBoardType: (value) => set({ boardType: value }),
      setTool: (value) => set({ tool: value }),
      setStroke: (value) => set({ stroke: value }),
      setStrokeWidth: (value) => set({ strokeWidth: value }),
      setDraftObject: (value) => set({ draftObject: value }),
      clearDraftObject: () => set({ draftObject: null }),
      commitObject: (value) =>
        set((state) => ({
          objects: [...state.objects, value],
          history: [...state.history, snapshot(state)],
          future: [],
          draftObject: null,
        })),
      clearBoard: () =>
        set((state) => ({
          objects: [],
          draftObject: null,
          history: [...state.history, snapshot(state)],
          future: [],
        })),
      eraseObjectAt: (x, y) =>
        set((state) => {
          const targetIndex = [...state.objects]
            .reverse()
            .findIndex((object) => isObjectHit(object, x, y));

          if (targetIndex === -1) {
            return state;
          }

          const indexFromStart = state.objects.length - 1 - targetIndex;
          return {
            objects: state.objects.filter(
              (_, index) => index !== indexFromStart,
            ),
            history: [...state.history, snapshot(state)],
            future: [],
          };
        }),
      undo: () =>
        set((state) => {
          const prev = state.history[state.history.length - 1];
          if (!prev) {
            return state;
          }

          return {
            objects: prev,
            history: state.history.slice(0, -1),
            future: [snapshot(state), ...state.future],
            draftObject: null,
          };
        }),
      redo: () =>
        set((state) => {
          const next = state.future[0];
          if (!next) {
            return state;
          }

          return {
            objects: next,
            history: [...state.history, snapshot(state)],
            future: state.future.slice(1),
            draftObject: null,
          };
        }),
    }),
    {
      name: TACTICS_BOARD_STORAGE_KEY,
      partialize: (state) => ({
        boardType: state.boardType,
        objects: state.objects,
        stroke: state.stroke,
        strokeWidth: state.strokeWidth,
      }),
    },
  ),
);
