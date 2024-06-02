import { randomNumberBetween } from '@/utils/numbers';

export type CornerRadii = {
  tl: number;
  tr: number;
  br: number;
  bl: number;
};

const defaultCornerRadii = {
  tl: 0,
  tr: 0,
  br: 0,
  bl: 0,
};

export function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: CornerRadii = defaultCornerRadii,
  stroke = false,
) {
  ctx.beginPath();

  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);

  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height,
  );

  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);

  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);

  ctx.closePath();
  ctx.fill();
  stroke && ctx.stroke();
}

export function distanceBetween(
  point1: { x: number; y: number },
  point2: { x: number; y: number },
) {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2),
  );
}

// where 0 degrees corresponds to positive direction of x-axis
export function radiansBetween(
  point1: { x: number; y: number },
  point2: { x: number; y: number },
) {
  const deltaX = point2.x - point1.x;
  const deltaY = point2.y - point1.y;
  return Math.atan2(deltaY, deltaX);
}

const colors = [
  '#006E71',
  '#005D6B',
  '#003F55',
  '#372804',
  '#221208',
  '#6D5741',
  '#351B05',
  '#492C0A',
  '#BE5B0E',
  '#761300',
  '#995503',
  '#451401',
  '#3A1905',
];

export function getRandomColor() {
  return colors[randomNumberBetween(0, colors.length - 1)];
}
