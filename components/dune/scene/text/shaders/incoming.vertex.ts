export const incomingVertexShader = `
uniform float u_time;
uniform float u_delay;

attribute float visible_time;

varying float v_visible_diff;

void main() {
  v_visible_diff = u_time - visible_time - u_delay;

  gl_PointSize = 4.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
