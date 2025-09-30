export function hexToRgb(hex: string) {
  const int = parseInt(hex.slice(1), 16);
  return [
    (int >> 16) & 255, // R
    (int >> 8) & 255, // G
    int & 255, // B
  ];
}

function rgbToHex([r, g, b]: [number, number, number]) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

export function interpolateColors(
  color1: string,
  color2: string,
  steps: number,
) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  const result: string[] = [];

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
    const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
    const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);

    result.push(rgbToHex([r, g, b]));
  }

  return result;
}
