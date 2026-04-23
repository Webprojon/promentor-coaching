export type BoardType = "hockey" | "football";

export type ToolKind =
  | "select"
  | "line"
  | "freehand"
  | "arrow"
  | "rect"
  | "circle"
  | "eraser"
  | "puck"
  | "cone"
  | "ball"
  | "player";

type BaseObject = {
  id: string;
  stroke: string;
  strokeWidth: number;
};

export type LineObject = BaseObject & {
  kind: "line";
  points: number[];
};

export type FreehandObject = BaseObject & {
  kind: "freehand";
  points: number[];
};

export type ArrowObject = BaseObject & {
  kind: "arrow";
  points: number[];
};

export type RectObject = BaseObject & {
  kind: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
};

export type CircleObject = BaseObject & {
  kind: "circle";
  x: number;
  y: number;
  radius: number;
};

export type StickerKind = "puck" | "cone" | "ball" | "player";

export type StickerObject = BaseObject & {
  kind: "sticker";
  sticker: StickerKind;
  x: number;
  y: number;
  size: number;
  label?: string;
};

export type DrawableObject =
  | LineObject
  | FreehandObject
  | ArrowObject
  | RectObject
  | CircleObject
  | StickerObject;
