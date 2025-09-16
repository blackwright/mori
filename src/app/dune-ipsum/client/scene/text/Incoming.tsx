import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef } from 'react';
import type { BufferGeometry, ShaderMaterial } from 'three';
import { incomingShader } from './shaders';
import type { BufferAttributes } from './types';

type Props = {
  attributes: BufferAttributes;
  incomingDelay: number;
  maxVisibleTime: number;
  onComplete?: () => void;
};

export function Incoming({
  attributes,
  incomingDelay,
  maxVisibleTime,
  onComplete,
}: Props) {
  const hasCompletedRef = useRef(false);

  const geometryRef = useRef<BufferGeometry | null>(null);

  const materialRef = useRef<ShaderMaterial | null>(null);

  const shader = useMemo(() => incomingShader(incomingDelay), [incomingDelay]);

  useLayoutEffect(() => {
    if (geometryRef.current) {
      const [position, visibleTime, color] = attributes;

      geometryRef.current.setAttribute('position', position);
      geometryRef.current.setAttribute('visible_time', visibleTime);
      geometryRef.current.setAttribute('color', color);
    }

    if (materialRef.current) {
      hasCompletedRef.current = false;
      materialRef.current.uniforms.u_time.value = 0.0;
    }
  }, [attributes]);

  useFrame((_, delta) => {
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
}
