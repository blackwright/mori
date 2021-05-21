import * as React from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { Group, Clock } from 'three';
import { usePauseOnHide } from 'utils/three';
import { Cloud } from './Cloud';
import cloud from './assets/cloud.png';
import smoke from './assets/smoke.png';

type Props = {
  count: number;
};

export const CloudsGroup: React.FC<Props> = ({ count }) => {
  const { camera, clock } = useThree();

  const groupRef = React.useRef<Group>(null);

  usePauseOnHide(clock);

  useFrame((state, delta) => {
    groupRef.current.rotateX(0.025 * delta);
    groupRef.current.rotateY(0.05 * delta);
    groupRef.current.rotateZ(0.003 * delta);

    groupRef.current.children.forEach((cloud) => {
      cloud.lookAt(camera.position);
    });
  });

  return (
    <group ref={groupRef}>
      {new Array(count).fill(undefined).map((_, i) => {
        const asset = Math.random() < 0.5 ? cloud : smoke;

        const zPosition = Math.random() * 15 + 10;

        const x = Math.random() * 100 - 50;
        const y = Math.random() * 100 - 50;
        const z = Math.random() < 0.5 ? zPosition : -zPosition;

        return <Cloud key={i} asset={asset} x={x} y={y} z={z} />;
      })}
    </group>
  );
};
