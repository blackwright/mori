export const starVertexShader = `
attribute float alpha;
varying float vAlpha;

void main() {
  vAlpha = alpha;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = 4.0 * alpha;
  gl_Position = projectionMatrix * mvPosition;
}
`;
