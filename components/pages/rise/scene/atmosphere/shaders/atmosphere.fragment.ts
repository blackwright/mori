export const atmosphereFragmentShader = `
uniform float mieDirectionalG;
uniform vec3 up;

varying vec3 vWorldPosition;
varying vec3 vLightDirection;
varying float vLightFade;
varying vec3 vBetaR;
varying vec3 vBetaM;
varying float vLightE;

const float pi = 3.141592653589793238462643383279502884197169;
const float THREE_OVER_SIXTEEN_PI = 0.05968310365946075;
const float ONE_OVER_FOUR_PI = 0.07957747154594767;
const float n = 1.0003;
const float N = 2.545E25;
const float rayleighZenithLength = 8.4E3;
const float mieZenithLength = 1.25E3;
const float lightAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;
const vec3 cameraPos = vec3(0.0, 0.0, 0.0);

float rayleighPhase(float cosTheta) {
  return THREE_OVER_SIXTEEN_PI * (1.0 + pow(cosTheta, 2.0));
}

float hgPhase(float cosTheta, float g) {
  float gSquared = pow(g, 2.0);
  float inverse = 1.0 / pow(1.0 - 2.0 * g * cosTheta + gSquared, 1.5);
  return ONE_OVER_FOUR_PI * ((1.0 - gSquared) * inverse);
}

void main() {
  vec3 direction = normalize(vWorldPosition - cameraPos);

  float zenithAngle = acos(max(0.0, dot(up, direction)));
  float inverse = 1.0 / (cos(zenithAngle) + 0.15 * pow(93.885 - ((zenithAngle * 180.0) / pi), -1.253));
  float sR = rayleighZenithLength * inverse;
  float sM = mieZenithLength * inverse;

  vec3 Fex = exp(-(vBetaR * sR + vBetaM * sM));

  float cosTheta = dot(direction, vLightDirection);

  float rPhase = rayleighPhase(cosTheta * 0.5 + 0.5);
  vec3 betaRTheta = vBetaR * rPhase;

  float mPhase = hgPhase(cosTheta, mieDirectionalG);
  vec3 betaMTheta = vBetaM * mPhase;

  vec3 Lin = pow(vLightE * ((betaRTheta + betaMTheta) / (vBetaR + vBetaM)) * (1.0 - Fex), vec3(1.5));
  Lin *= mix(vec3(1.0), pow(vLightE * ((betaRTheta + betaMTheta) / (vBetaR + vBetaM)) * Fex, vec3(1.0 / 2.0)), clamp(pow(1.0 - dot(up, vLightDirection), 5.0), 0.0, 1.0));

  float theta = acos(direction.y);
  float phi = atan(direction.z, direction.x);
  vec2 uv = vec2(phi, theta) / vec2(2.0 * pi, pi) + vec2(0.5, 0.0);
  vec3 L0 = vec3(0.1) * Fex;

  float lightDisc = smoothstep(lightAngularDiameterCos, lightAngularDiameterCos + 0.00002, cosTheta);
  L0 += (vLightE * 19000.0 * Fex) * lightDisc;

  vec3 texColor = (Lin + L0) * 0.04 + vec3(0.0, 0.0003, 0.00075);

  vec3 retColor = pow(texColor, vec3(1.0 / (1.2 + (1.2 * vLightFade))));

  gl_FragColor = vec4(retColor, 1.0);

#include <tonemapping_fragment>
#include <encodings_fragment>
}
`;
