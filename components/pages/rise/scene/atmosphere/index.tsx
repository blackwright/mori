import * as React from 'react';
import { useUpdate } from 'react-three-fiber';
import { Mesh } from 'three';
import { mergeRefs } from 'utils/react';
import { shader } from './shaders';

export const Atmosphere = React.forwardRef(({}, ref: React.Ref<Mesh>) => {
  const meshRef = useUpdate<Mesh>((mesh) => {
    mesh.scale.setScalar(450_000);
  }, []);

  return (
    <mesh ref={mergeRefs([ref, meshRef])}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <shaderMaterial attach="material" args={[shader]} />
    </mesh>
  );
});
