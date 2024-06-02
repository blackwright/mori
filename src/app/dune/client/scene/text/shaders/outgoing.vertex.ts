export const outgoingVertexShader = `
uniform float u_time;

attribute float visible_time;

varying float v_visible_diff;

void main () {
  v_visible_diff = visible_time - u_time;

  gl_PointSize = 4.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
