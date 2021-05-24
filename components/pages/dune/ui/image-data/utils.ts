import { clampNumberRange } from 'utils/numbers';

export function getParticleGap(text: string): number {
  const gap = clampNumberRange(text.length, {
    input: [50, 500],
    output: [12, 4]
  });

  return gap;
}
