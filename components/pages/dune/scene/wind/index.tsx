import * as React from 'react';
import { Geometry, MathUtils, Vector3, Color } from 'three';
import { useThree, useUpdate, useFrame } from 'react-three-fiber';
import { getParticleCount } from './utils';

type Props = {
  isRendering: boolean;
};

export const Wind: React.FC<Props> = ({ isRendering }) => {
  const { size } = useThree();

  const rotationDiffRef = React.useRef(0.1);

  const { slowColor, fastColor } = React.useMemo(
    () => ({
      slowColor: new Color(0xe54c02),
      fastColor: new Color(0xeeeeee)
    }),
    []
  );

  const pointsRef = useUpdate<THREE.Points>(
    (points) => {
      const geometry = new Geometry();

      const maxX = size.width / 2;
      const maxY = size.height / 2;

      const particleCount = getParticleCount({
        width: size.width,
        height: size.height
      });

      for (let i = 0; i < particleCount; i++) {
        geometry.vertices.push(
          new Vector3(
            MathUtils.randInt(-maxX, maxX),
            MathUtils.randInt(-maxY, maxY),
            MathUtils.randInt(-maxX, maxX)
          )
        );
      }

      const oldGeometry = points.geometry as Geometry | null;

      points.geometry = geometry;

      oldGeometry?.dispose();
    },
    [size]
  );

  const materialRef = useUpdate<THREE.PointsMaterial>((material) => {
    material.color = slowColor.clone();
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      const newRotationDiff = MathUtils.lerp(
        rotationDiffRef.current,
        isRendering ? 1.0 : 0.1,
        isRendering ? 0.1 : 0.05
      );

      rotationDiffRef.current = newRotationDiff;

      pointsRef.current.rotation.y -= newRotationDiff / 12;

      materialRef.current.color.lerp(
        isRendering ? fastColor : slowColor,
        isRendering ? 0.1 : 0.05
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <pointsMaterial
        ref={materialRef}
        attach="material"
        args={[{ size: 1 }]}
      />
    </points>
  );
};
