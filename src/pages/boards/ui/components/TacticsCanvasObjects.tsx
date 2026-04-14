import {
  Arrow,
  Circle,
  Group,
  Line,
  Rect,
  RegularPolygon,
  Text,
} from "react-konva";
import { STICKER_TOOL_VALUES } from "@/pages/boards/model/constants";
import type {
  DrawableObject,
  StickerKind,
  ToolKind,
} from "@/pages/boards/model/types";

export function toStickerKind(tool: ToolKind): StickerKind | null {
  return STICKER_TOOL_VALUES.find((value) => value === tool) ?? null;
}

function stickerGlyph(sticker: StickerKind) {
  if (sticker === "puck") return "◉";
  if (sticker === "cone") return "▲";
  return "";
}

function renderSticker(object: Extract<DrawableObject, { kind: "sticker" }>) {
  const half = object.size / 2;
  const centerX = object.x;
  const centerY = object.y;

  if (object.sticker === "ball") {
    return (
      <Group key={object.id}>
        <Circle
          x={centerX}
          y={centerY}
          radius={half}
          fill="#ffffff"
          stroke="#0f172a"
          strokeWidth={2}
        />
        <RegularPolygon
          x={centerX}
          y={centerY}
          sides={5}
          radius={half * 0.3}
          fill="#111827"
        />
        <Circle
          x={centerX - half * 0.5}
          y={centerY - half * 0.18}
          radius={half * 0.12}
          fill="#111827"
        />
        <Circle
          x={centerX + half * 0.5}
          y={centerY - half * 0.18}
          radius={half * 0.12}
          fill="#111827"
        />
        <Circle
          x={centerX - half * 0.28}
          y={centerY + half * 0.45}
          radius={half * 0.1}
          fill="#111827"
        />
        <Circle
          x={centerX + half * 0.28}
          y={centerY + half * 0.45}
          radius={half * 0.1}
          fill="#111827"
        />
      </Group>
    );
  }

  if (object.sticker === "player") {
    return (
      <Group key={object.id}>
        {object.label ? (
          <Group>
            <Rect
              x={centerX - Math.max(36, object.label.length * 3.8)}
              y={centerY - half - 22}
              width={Math.max(72, object.label.length * 7.6)}
              height={18}
              cornerRadius={6}
              fill="#0f172a"
              opacity={0.85}
            />
            <Text
              x={centerX - Math.max(36, object.label.length * 3.8)}
              y={centerY - half - 20}
              width={Math.max(72, object.label.length * 7.6)}
              height={16}
              align="center"
              verticalAlign="middle"
              fontSize={11}
              fill="#e2e8f0"
              text={object.label}
            />
          </Group>
        ) : null}

        <Circle
          x={centerX}
          y={centerY - half * 0.45}
          radius={half * 0.22}
          fill={object.stroke}
        />
        <Line
          points={[
            centerX,
            centerY - half * 0.2,
            centerX,
            centerY + half * 0.25,
            centerX - half * 0.32,
            centerY + half * 0.65,
            centerX,
            centerY + half * 0.25,
            centerX + half * 0.32,
            centerY + half * 0.65,
          ]}
          stroke={object.stroke}
          strokeWidth={2.2}
          lineCap="round"
          lineJoin="round"
        />
        <Line
          points={[
            centerX - half * 0.45,
            centerY + half * 0.05,
            centerX + half * 0.45,
            centerY + half * 0.05,
          ]}
          stroke={object.stroke}
          strokeWidth={2.2}
          lineCap="round"
        />
      </Group>
    );
  }

  return (
    <Text
      key={object.id}
      x={object.x - object.size / 2}
      y={object.y - object.size / 2}
      width={object.size}
      height={object.size}
      align="center"
      verticalAlign="middle"
      fontSize={Math.max(16, object.size * 0.85)}
      text={stickerGlyph(object.sticker)}
      fill={object.stroke}
    />
  );
}

export function renderDrawableObject(object: DrawableObject) {
  if (object.kind === "line") {
    return (
      <Line
        key={object.id}
        points={object.points}
        stroke={object.stroke}
        strokeWidth={object.strokeWidth}
        lineCap="round"
        lineJoin="round"
      />
    );
  }

  if (object.kind === "arrow") {
    return (
      <Arrow
        key={object.id}
        points={object.points}
        stroke={object.stroke}
        fill={object.stroke}
        strokeWidth={object.strokeWidth}
        pointerLength={10}
        pointerWidth={10}
        lineCap="round"
        lineJoin="round"
      />
    );
  }

  if (object.kind === "rect") {
    return (
      <Rect
        key={object.id}
        x={object.x}
        y={object.y}
        width={object.width}
        height={object.height}
        stroke={object.stroke}
        strokeWidth={object.strokeWidth}
      />
    );
  }

  if (object.kind === "sticker") {
    return renderSticker(object);
  }

  return (
    <Circle
      key={object.id}
      x={object.x}
      y={object.y}
      radius={object.radius}
      stroke={object.stroke}
      strokeWidth={object.strokeWidth}
    />
  );
}
