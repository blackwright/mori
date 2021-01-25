import * as React from 'react';
import { useFrame } from 'react-three-fiber';
import { Points, Clock, Color, BufferAttribute } from 'three';
import { usePauseOnHide } from 'utils/react';
import { starVertexShader } from '../shaders/star.vertex';
import { starFragmentShader } from '../shaders/star.fragment';

type Props = {
  count: number;
};

export const StarsPointCloud: React.FC<Props> = ({ count }) => {
  const pointsRef = React.useRef<Points>(null);

  const alphasRef = React.useRef<BufferAttribute>(null);

  const clock = React.useMemo(() => new Clock(), []);

  usePauseOnHide(clock);

  const [positions, alphas] = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    const alphas = new Float32Array(count);

    for (let i = 0; i < count; i += 3) {
      positions[i] = Math.random() * 100 - 50;
      positions[i + 1] = Math.random() * 100 - 50;
      positions[i + 2] = Math.random() * 100 - 50;

      alphas[i / 3] = Math.random();
      alphas[i / 3 + 1] = Math.random();
      alphas[i / 3 + 2] = Math.random();
    }

    return [positions, alphas];
  }, [count]);

  const alphaDirections = React.useMemo(() => {
    const alphaDirections = new Float32Array(alphas.length);

    for (let i = 0; i < alphaDirections.length; i++) {
      alphaDirections[i] = Math.random() < 0.5 ? 1 : -1;
    }

    return alphaDirections;
  }, [alphas]);

  // const handleUpdateAlphas = React.useCallback((self: BufferAttribute) => {
  //   self.needsUpdate = true;
  // }, []);

  useFrame(() => {
    const delta = clock.getDelta();

    pointsRef.current.rotateX(0.001 * delta);
    pointsRef.current.rotateY(0.025 * delta);
    pointsRef.current.rotateZ(0.005 * delta);

    const attributeAlphas = alphasRef.current.array as Float32Array;

    for (let i = 0; i < attributeAlphas.length; i++) {
      if (alphaDirections[i] > 0) {
        attributeAlphas[i] *= 1 + delta * 0.75;

        if (attributeAlphas[i] > 1) {
          alphaDirections[i] = -1;
        }
      } else {
        attributeAlphas[i] *= 1 - delta * 0.75;

        if (attributeAlphas[i] < 0.2) {
          alphaDirections[i] = 1;
        }
      }
    }

    alphasRef.current.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          ref={alphasRef}
          attachObject={['attributes', 'alpha']}
          array={alphas}
          count={alphas.length}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        attach="material"
        args={[
          {
            uniforms: {
              color: { value: new Color(0xffffff) }
            },
            vertexShader: starVertexShader,
            fragmentShader: starFragmentShader,
            transparent: true
          }
        ]}
      />
    </points>
  );
};
