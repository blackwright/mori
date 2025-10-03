import { BufferGeometry, Float32BufferAttribute, MathUtils } from 'three';

export function createIncomingTextGeometry(position: Float32Array): {
  geometry: BufferGeometry;
  maxVisibleTime: number;
} {
  let maxVisibleTime = 0;

  const vertexCount = position.length / 3;

  const color = new Float32Array(vertexCount);
  const visibleTime = new Float32Array(vertexCount);

  const minX = position[0];

  const xOffset = Math.abs(minX);

  for (let i = 0; i < vertexCount; i++) {
    const newVisibleTime =
      (MathUtils.randFloat(-200.0, 200.0) + (position[i * 3] + xOffset)) / 500;
    maxVisibleTime = Math.max(maxVisibleTime, newVisibleTime);
    visibleTime[i] = newVisibleTime;
  }

  const geometry = new BufferGeometry();

  geometry.setAttribute('position', new Float32BufferAttribute(position, 3));
  geometry.setAttribute(
    'visible_time',
    new Float32BufferAttribute(visibleTime, 1),
  );
  geometry.setAttribute('color', new Float32BufferAttribute(color, 1));

  return {
    geometry,
    maxVisibleTime,
  };
}
