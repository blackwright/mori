type Dimensions = {
  width: number;
  height: number;
};

export function getParticleCount({ width, height }: Dimensions): number {
  return (width * height) / 1000;
}
