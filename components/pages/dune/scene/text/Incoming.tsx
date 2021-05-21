import React from 'react';
import { BufferGeometry, ShaderMaterial } from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';
import { incomingShader } from './shaders';
import type { BufferAttributes } from './types';

type Props = {
  attributes: BufferAttributes;
  incomingDelay: number;
  maxVisibleTime: number;
  onComplete?: () => void;
};

export const Incoming: React.FC<Props> = ({
  attributes,
  incomingDelay,
  maxVisibleTime,
  onComplete
}) => {
  const hasCompletedRef = React.useRef(false);

  React.useEffect(() => {
    hasCompletedRef.current = false;
  }, [attributes]);

  const geometryRef = useUpdate<BufferGeometry>(
    (geometry) => {
      const [position, visibleTime, color] = attributes;

      geometry.setAttribute('position', position);
      geometry.setAttribute('visible_time', visibleTime);
      geometry.setAttribute('color', color);
    },
    [attributes]
  );

  const materialRef = useUpdate<ShaderMaterial>(
    (material) => {
      material.uniforms.u_time.value = 0.0;
    },
    [attributes]
  );

  const shader = React.useMemo(() => incomingShader(incomingDelay), [
    incomingDelay
  ]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta;

      if (
        materialRef.current.uniforms.u_time.value >
          maxVisibleTime + incomingDelay &&
        !hasCompletedRef.current
      ) {
        hasCompletedRef.current = true;
        onComplete?.();
      }
    }
  });

  return (
    <points>
      <bufferGeometry ref={geometryRef} attach="geometry" />
      <shaderMaterial ref={materialRef} attach="material" args={[shader]} />
    </points>
  );
};
