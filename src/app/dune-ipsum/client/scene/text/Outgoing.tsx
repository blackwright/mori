import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { BufferGeometry, ShaderMaterial } from 'three';
import { createOutgoingShader } from './shaders';

type Props = {
  geometry: BufferGeometry;
};

export function Outgoing({ geometry }: Props) {
  const materialRef = useRef<ShaderMaterial | null>(null);

  const shader = useMemo(() => createOutgoingShader(), []);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta;
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial ref={materialRef} attach="material" args={[shader]} />
    </points>
  );
}
