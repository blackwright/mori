import { useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import type { BufferGeometry, ShaderMaterial } from 'three';
import { outgoingShader } from './shaders';
import type { BufferAttributes } from './types';

type Props = {
  attributes: BufferAttributes;
};

export function Outgoing({ attributes }: Props) {
  const geometryRef = useRef<BufferGeometry | null>(null);

  const materialRef = useRef<ShaderMaterial | null>(null);

  useLayoutEffect(() => {
    if (geometryRef.current) {
      const [position, visibleTime, color] = attributes;

      geometryRef.current.setAttribute('position', position);
      geometryRef.current.setAttribute('visible_time', visibleTime);
      geometryRef.current.setAttribute('color', color);
    }

    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = 0.0;
    }
  }, [attributes]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta;
    }
  });

  return (
    <points>
      <bufferGeometry ref={geometryRef} attach="geometry" />
      <shaderMaterial
        ref={materialRef}
        attach="material"
        args={[outgoingShader]}
      />
    </points>
  );
}
