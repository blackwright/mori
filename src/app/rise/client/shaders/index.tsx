import { BackSide, Vector3 } from 'three';
import { atmosphereFragmentShader } from './atmosphere.fragment';
import { atmosphereVertexShader } from './atmosphere.vertex';

export const shader = {
  uniforms: {
    turbidity: { value: 0.4 },
    rayleigh: { value: 0.03 },
    mieCoefficient: { value: 0.085 },
    mieDirectionalG: { value: 0.995 },
    lightPosition: { value: new Vector3() },
    up: { value: new Vector3(0, 1, 0) },
  },
  vertexShader: atmosphereVertexShader,
  fragmentShader: atmosphereFragmentShader,
  side: BackSide,
  depthWrite: false,
};
