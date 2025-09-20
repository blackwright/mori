import { useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef } from 'react';
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  MathUtils,
  PointsMaterial,
  type Points,
} from 'three';
import { getParticleCount } from './utils';

const COLOR = new Color(0xeeeeee);

type Props = {
  isRendering: boolean;
};

export function Wind({ isRendering }: Props) {
  const { size } = useThree();

  const pointsRef = useRef<Points | null>(null);

  const materialRef = useRef<PointsMaterial | null>(null);

  const rotationDiffRef = useRef(0.1);

  useLayoutEffect(() => {
    if (pointsRef.current) {
      const geometry = new BufferGeometry();

      const maxX = size.width / 2;
      const maxY = size.height / 2;

      const particleCount = getParticleCount({
        width: size.width,
        height: size.height,
      });

      const positions = new Float32Array(particleCount * 3);
      geometry.setAttribute(
        'position',
        new Float32BufferAttribute(positions, 3),
      );

      for (let i = 0; i < particleCount; i++) {
        geometry.attributes.position.setXYZ(
          i,
          MathUtils.randInt(-maxX, maxX),
          MathUtils.randInt(-maxY, maxY),
          MathUtils.randInt(-maxX, maxX),
        );
      }

      geometry.attributes.position.needsUpdate = true;

      const oldGeometry = pointsRef.current.geometry;

      pointsRef.current.geometry = geometry;

      oldGeometry.dispose();
    }
  }, [size]);

  useFrame(() => {
    if (pointsRef.current) {
      const newRotationDiff = MathUtils.lerp(
        rotationDiffRef.current,
        isRendering ? 1.0 : 0.1,
        isRendering ? 0.1 : 0.05,
      );

      rotationDiffRef.current = newRotationDiff;

      pointsRef.current.rotation.y -= newRotationDiff / 12;
    }
  });

  return (
    <points ref={pointsRef}>
      <pointsMaterial
        ref={materialRef}
        attach="material"
        args={[{ size: 1 }]}
        color={COLOR}
      />
    </points>
  );
}
