'use client';

import 'twin.macro';
import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FullScreenMain, Drawer } from '@/components';
import { useDetailsSearchParams } from '@/app/hooks';
import { AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { Scene } from './scene';

export function Mori() {
  const [areDetailsOpen] = useDetailsSearchParams();

  // Search param updates unexpectedly cause clouds to reinstantiate.
  // Investigate whether updating r3f resolves this.
  const scene = useMemo(() => <Scene />, []);

  return (
    <FullScreenMain>
      <Canvas
        camera={{ far: 100 }}
        resize={{
          scroll: true,
          debounce: { scroll: 50, resize: 0 },
        }}
        tw="cursor-pointer"
      >
        <color attach="background" args={[0, 0, 0.01]} />
        {scene}
        <CameraControls minDistance={0} maxDistance={25} />
      </Canvas>

      <AnimatePresence>
        {areDetailsOpen && (
          <Drawer>
            <p>A twinkling night sky rendered with react-three-fiber &mdash; try looking around.</p>
            <p>Clouds use one of two sprite images, and are randomly positioned and rotated to break up visual consistency.</p>
            <p>Stars are a slowly rotating spherical point cloud where each point is assigned a randomized `alpha` value that waxes and wanes over time.</p>
            <p>This value is used by a vertex shader to determine the size of each point and a fragment shader to determine its transparency.</p>
          </Drawer>
        )}
      </AnimatePresence>
    </FullScreenMain>
  );
}
