import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { BufferGeometry, ShaderMaterial } from 'three';
import { createIncomingShader } from './shaders';

type Props = {
  geometry: BufferGeometry;
  incomingDelay: number;
  maxVisibleTime: number;
  onComplete: () => void;
};

export function Incoming({
  geometry,
  incomingDelay,
  maxVisibleTime,
  onComplete,
}: Props) {
  const hasCompletedRef = useRef(false);

  const materialRef = useRef<ShaderMaterial | null>(null);

  const shader = useMemo(
    () => createIncomingShader(incomingDelay),
    [incomingDelay],
  );

  useFrame((_, delta) => {
    if (materialRef.current && !hasCompletedRef.current) {
      materialRef.current.uniforms.u_time.value += delta;

      if (
        materialRef.current.uniforms.u_time.value >
        maxVisibleTime + incomingDelay
      ) {
        hasCompletedRef.current = true;
        onComplete();
      }
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial ref={materialRef} attach="material" args={[shader]} />
    </points>
  );
}
