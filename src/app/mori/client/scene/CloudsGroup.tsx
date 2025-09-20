import { useFrame, useThree } from '@react-three/fiber';
import * as React from 'react';
import { type Group, type Texture } from 'three';
import { usePauseOnHide } from '@/utils/three';
import { Cloud } from './Cloud';

type Props = {
  count: number;
  textures: [Texture, Texture];
};

export function CloudsGroup({ count, textures }: Props) {
  const { camera, clock } = useThree();
  const [cloudTexture, smokeTexture] = textures;

  const groupRef = React.useRef<Group | null>(null);

  const clouds = React.useMemo(() => {
    return new Array(count).fill(undefined).map((_, i) => {
      const texture = Math.random() < 0.5 ? cloudTexture : smokeTexture;

      const zPosition = Math.random() * 15 + 10;

      const x = Math.random() * 100 - 50;
      const y = Math.random() * 100 - 50;
      const z = Math.random() < 0.5 ? zPosition : -zPosition;

      return <Cloud key={i} texture={texture} x={x} y={y} z={z} />;
    });
  }, [count, cloudTexture, smokeTexture]);

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

  return <group ref={groupRef}>{clouds}</group>;
}
