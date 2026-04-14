import { Circle, Group, Line, Rect } from "react-konva";
import { BOARD_FIELD_CORNER_RADIUS_PX } from "@/pages/boards/model/constants";
import type { BoardType } from "@/pages/boards/model/types";

type Props = {
  boardType: BoardType;
  width: number;
  height: number;
};

function HockeyBackground({ width, height }: Omit<Props, "boardType">) {
  const centerX = width / 2;
  const centerY = height / 2;
  const leftZone = width * 0.35;
  const rightZone = width * 0.65;
  const leftEndLine = width * 0.05;
  const rightEndLine = width * 0.95;
  const red = "#f43f5e";
  const blue = "#2563eb";
  const creaseFill = "#bfdbfe";
  const goalHeight = height * 0.08;
  const goalWidth = width * 0.022;
  const creaseRadius = height * 0.052;
  const faceoffRadius = height * 0.11;

  const topInset = 8;
  const bottomInset = height - 8;

  return (
    <Group>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#f8fafc"
        cornerRadius={BOARD_FIELD_CORNER_RADIUS_PX}
      />
      <Rect
        x={4}
        y={4}
        width={width - 8}
        height={height - 8}
        stroke="#111827"
        cornerRadius={BOARD_FIELD_CORNER_RADIUS_PX}
        strokeWidth={3}
      />

      <Line points={[leftEndLine, topInset, leftEndLine, bottomInset]} stroke={red} strokeWidth={1.5} />
      <Line points={[rightEndLine, topInset, rightEndLine, bottomInset]} stroke={red} strokeWidth={1.5} />

      <Line points={[centerX, topInset, centerX, bottomInset]} stroke={red} strokeWidth={4} />
      <Line points={[leftZone, topInset, leftZone, bottomInset]} stroke={blue} strokeWidth={4} />
      <Line points={[rightZone, topInset, rightZone, bottomInset]} stroke={blue} strokeWidth={4} />
      <Circle x={centerX} y={centerY} radius={height * 0.12} stroke={blue} strokeWidth={2} />

      <Circle x={width * 0.22} y={height * 0.24} radius={faceoffRadius} stroke={red} strokeWidth={2} />
      <Circle x={width * 0.22} y={height * 0.76} radius={faceoffRadius} stroke={red} strokeWidth={2} />
      <Circle x={width * 0.78} y={height * 0.24} radius={faceoffRadius} stroke={red} strokeWidth={2} />
      <Circle x={width * 0.78} y={height * 0.76} radius={faceoffRadius} stroke={red} strokeWidth={2} />

      <Rect
        x={leftEndLine - goalWidth * 0.5}
        y={centerY - goalHeight / 2}
        width={goalWidth}
        height={goalHeight}
        fill={creaseFill}
        stroke={red}
        strokeWidth={1}
      />
      <Rect
        x={rightEndLine - goalWidth * 0.5}
        y={centerY - goalHeight / 2}
        width={goalWidth}
        height={goalHeight}
        fill={creaseFill}
        stroke={red}
        strokeWidth={1}
      />

      <Line
        points={[leftEndLine, centerY - creaseRadius, leftEndLine + creaseRadius * 0.9, centerY - creaseRadius, leftEndLine + creaseRadius * 0.9, centerY + creaseRadius, leftEndLine, centerY + creaseRadius]}
        stroke={red}
        strokeWidth={1.5}
      />
      <Line
        points={[rightEndLine, centerY - creaseRadius, rightEndLine - creaseRadius * 0.9, centerY - creaseRadius, rightEndLine - creaseRadius * 0.9, centerY + creaseRadius, rightEndLine, centerY + creaseRadius]}
        stroke={red}
        strokeWidth={1.5}
      />

    </Group>
  );
}

function FootballBackground({ width, height }: Omit<Props, "boardType">) {
  const line = "#d1fae5";
  const centerX = width / 2;
  const centerY = height / 2;
  const penaltyHeight = height * 0.36;
  const penaltyTop = (height - penaltyHeight) / 2;
  const smallBoxHeight = penaltyHeight * 0.5;
  const smallBoxTop = (height - smallBoxHeight) / 2;

  return (
    <Group>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#15803d"
        cornerRadius={BOARD_FIELD_CORNER_RADIUS_PX}
      />
      <Rect
        x={8}
        y={8}
        width={width - 16}
        height={height - 16}
        stroke={line}
        strokeWidth={2}
        cornerRadius={BOARD_FIELD_CORNER_RADIUS_PX}
      />
      <Line points={[centerX, 10, centerX, height - 10]} stroke={line} strokeWidth={2} />
      <Circle x={centerX} y={centerY} radius={height * 0.14} stroke={line} strokeWidth={2} />
      <Circle x={centerX} y={centerY} radius={4} fill={line} />

      <Rect x={8} y={penaltyTop} width={width * 0.16} height={penaltyHeight} stroke={line} strokeWidth={2} />
      <Rect x={width - width * 0.16 - 8} y={penaltyTop} width={width * 0.16} height={penaltyHeight} stroke={line} strokeWidth={2} />
      <Rect x={8} y={smallBoxTop} width={width * 0.08} height={smallBoxHeight} stroke={line} strokeWidth={2} />
      <Rect x={width - width * 0.08 - 8} y={smallBoxTop} width={width * 0.08} height={smallBoxHeight} stroke={line} strokeWidth={2} />

      <Circle x={width * 0.13} y={centerY} radius={3} fill={line} />
      <Circle x={width * 0.87} y={centerY} radius={3} fill={line} />
    </Group>
  );
}

export function BoardBackground({ boardType, width, height }: Props) {
  if (boardType === "football") {
    return <FootballBackground width={width} height={height} />;
  }

  return <HockeyBackground width={width} height={height} />;
}
