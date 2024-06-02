import { useFrame, useThree } from '@react-three/fiber';
import * as React from 'react';
import { type Group } from 'three';
import { usePauseOnHide } from '@/utils/three';
import { Cloud } from './Cloud';

type Props = {
  count: number;
};

export function CloudsGroup({ count }: Props) {
  const { camera, clock } = useThree();

  const groupRef = React.useRef<Group | null>(null);

  usePauseOnHide(clock);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotateX(0.025 * delta);
      groupRef.current.rotateY(0.05 * delta);
      groupRef.current.rotateZ(0.003 * delta);

      groupRef.current.children.forEach((cloud) => {
        cloud.lookAt(camera.position);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {new Array(count).fill(undefined).map((_, i) => {
        const asset =
          Math.random() < 0.5 ? '/assets/cloud.png' : '/assets/smoke.png';

        const zPosition = Math.random() * 15 + 10;

        const x = Math.random() * 100 - 50;
        const y = Math.random() * 100 - 50;
        const z = Math.random() < 0.5 ? zPosition : -zPosition;

        return <Cloud key={i} asset={asset} x={x} y={y} z={z} />;
      })}
    </group>
  );
}
