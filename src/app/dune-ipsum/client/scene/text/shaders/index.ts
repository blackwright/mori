import { incomingVertexShader } from './incoming.vertex';
import { outgoingVertexShader } from './outgoing.vertex';
import { textFragmentShader } from './text.fragment';

export const incomingShader = (uDelay: number) => {
  return {
    uniforms: {
      u_time: { value: 0.0 },
      u_delay: { value: uDelay },
    },
    vertexShader: incomingVertexShader,
    fragmentShader: textFragmentShader,
  };
};

export const outgoingShader = {
  uniforms: {
    u_time: { value: 0.0 },
  },
  vertexShader: outgoingVertexShader,
  fragmentShader: textFragmentShader,
};
