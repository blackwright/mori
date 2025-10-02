type Dimensions = {
  width: number;
  height: number;
};

export function getParticleCount({ width, height }: Dimensions): number {
  return Math.floor((width * height) / 1000);
}
