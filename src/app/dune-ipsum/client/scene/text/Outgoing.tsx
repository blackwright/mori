import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { BufferGeometry, ShaderMaterial } from 'three';
import { outgoingShader } from './shaders';

type Props = {
  geometry: BufferGeometry;
};

export function Outgoing({ geometry }: Props) {
  const materialRef = useRef<ShaderMaterial | null>(null);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta;
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        attach="material"
        args={[outgoingShader]}
      />
    </points>
  );
}
