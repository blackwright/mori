import * as React from 'react';
import { type Texture } from 'three';

type Props = {
  texture: Texture;
  x: number;
  y: number;
  z: number;
};

export function Cloud({ texture, x, y, z }: Props) {
  return (
    <mesh position={[x, y, z]}>
      <planeGeometry attach="geometry" args={[50, 50]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        transparent
        opacity={0.1}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
