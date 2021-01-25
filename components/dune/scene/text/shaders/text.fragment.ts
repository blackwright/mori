export const textFragmentShader = `
varying float v_visible_diff;

void main() {
  if (v_visible_diff < 0.0) {
    discard;
  }

  vec2 cxy = 4.0 * gl_PointCoord - 2.0;

  float r = dot(cxy, cxy);

  if (r > 2.0) {
    discard;
  }

  gl_FragColor = vec4(0.9, 0.3, 0.0, 1.0);
}
`;
