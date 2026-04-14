import type { DrawableObject } from "@/pages/boards/model/types";

const HIT_TOLERANCE = 10;

function distanceToSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) {
    return Math.hypot(px - x1, py - y1);
  }

  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)));
  const projX = x1 + t * dx;
  const projY = y1 + t * dy;
  return Math.hypot(px - projX, py - projY);
}

function isPointInsideLine(points: number[], x: number, y: number) {
  for (let i = 0; i < points.length - 2; i += 2) {
    const x1 = points[i];
    const y1 = points[i + 1];
    const x2 = points[i + 2];
    const y2 = points[i + 3];
    if (distanceToSegment(x, y, x1, y1, x2, y2) <= HIT_TOLERANCE) {
      return true;
    }
  }
  return false;
}

export function isObjectHit(object: DrawableObject, x: number, y: number) {
  if (object.kind === "sticker") {
    const half = object.size / 2 + HIT_TOLERANCE;
    return x >= object.x - half && x <= object.x + half && y >= object.y - half && y <= object.y + half;
  }

  if (object.kind === "circle") {
    return Math.hypot(x - object.x, y - object.y) <= object.radius + HIT_TOLERANCE;
  }

  if (object.kind === "rect") {
    const left = Math.min(object.x, object.x + object.width) - HIT_TOLERANCE;
    const right = Math.max(object.x, object.x + object.width) + HIT_TOLERANCE;
    const top = Math.min(object.y, object.y + object.height) - HIT_TOLERANCE;
    const bottom = Math.max(object.y, object.y + object.height) + HIT_TOLERANCE;
    return x >= left && x <= right && y >= top && y <= bottom;
  }

  return isPointInsideLine(object.points, x, y);
}
