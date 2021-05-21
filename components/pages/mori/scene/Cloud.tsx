import * as React from 'react';
import { TextureLoader } from 'three';
import { useLoader, useUpdate } from 'react-three-fiber';

type Props = {
  asset: string;
  x: number;
  y: number;
  z: number;
};

export const Cloud: React.FC<Props> = ({ asset, x, y, z }) => {
  const texture = useLoader(TextureLoader, asset);

  const meshRef = useUpdate<THREE.Mesh>((mesh) => {
    mesh.position.set(x, y, z);
  }, []);

  return (
    <mesh ref={meshRef}>
      <planeGeometry attach="geometry" args={[50, 50]} />
      <meshLambertMaterial
        attach="material"
        args={[
          {
            map: texture,
            transparent: true,
            opacity: 0.1,
            depthTest: false
          }
        ]}
      />
    </mesh>
  );
};
