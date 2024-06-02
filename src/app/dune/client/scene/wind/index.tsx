import { useRef, useMemo, useLayoutEffect } from 'react';
import {
  MathUtils,
  Color,
  BufferGeometry,
  PointsMaterial,
  Float32BufferAttribute,
  type Points,
} from 'three';
import { useThree, useFrame } from '@react-three/fiber';
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

      geometry.setAttribute(
        'position',
        new Float32BufferAttribute(particleCount, 3),
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
