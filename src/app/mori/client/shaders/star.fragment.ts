export const starFragmentShader = `
uniform vec3 color;
varying float vAlpha;

void main() {
  float r = 0.0;

  vec2 cxy = 2.0 * gl_PointCoord - 1.0;

  r = dot(cxy, cxy);
  
  if (r > 1.0) {
    discard;
  }

  gl_FragColor = vec4(color, vAlpha);
}
`;
