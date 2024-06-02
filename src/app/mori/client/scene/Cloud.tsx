import { useLoader } from '@react-three/fiber';
import * as React from 'react';
import { TextureLoader } from 'three';

type Props = {
  asset: string;
  x: number;
  y: number;
  z: number;
};

export function Cloud({ asset, x, y, z }: Props) {
  const texture = useLoader(TextureLoader, asset);

  return (
    <mesh position={[x, y, z]}>
      <planeGeometry attach="geometry" args={[50, 50]} />
      <meshLambertMaterial
        attach="material"
        args={[
          {
            map: texture,
            transparent: true,
            opacity: 0.1,
            depthTest: false,
          },
        ]}
      />
    </mesh>
  );
}
