'use client';

import 'twin.macro';
import { CameraControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { AnimatePresence } from 'motion/react';
import { Texture, TextureLoader } from 'three';
import { useDetailsSearchParams } from '@/app/hooks';
import { Drawer, FullScreenMain } from '@/components';
import { Scene } from './scene';

const CANVAS_CAMERA_OPTIONS = {
  far: 100,
};

const CANVAS_RESIZE_OPTIONS = {
  scroll: true,
  debounce: { scroll: 50, resize: 0 },
};

export function Mori() {
  const [areDetailsOpen] = useDetailsSearchParams();

  const textures = useLoader(TextureLoader, [
    '/assets/cloud.png',
    '/assets/smoke.png',
  ]) as [Texture, Texture];

  return (
    <FullScreenMain>
      <Canvas
        camera={CANVAS_CAMERA_OPTIONS}
        resize={CANVAS_RESIZE_OPTIONS}
        tw="cursor-pointer"
      >
        <color attach="background" args={[0, 0, 0.01]} />
        <Scene textures={textures} />
        <CameraControls minDistance={0} maxDistance={25} />
      </Canvas>

      <AnimatePresence>
        {areDetailsOpen && (
          <Drawer>
            <p>
              A twinkling night sky rendered with react-three-fiber &mdash; try
              looking around.
            </p>
            <p>
              Clouds use one of two sprite images, and are randomly positioned
              and rotated to break up visual consistency.
            </p>
            <p>
              Stars are a slowly rotating point cloud where each point is
              assigned a randomized <code>alpha</code> value that waxes and
              wanes over time.
            </p>
            <p>
              This value is used by a vertex shader to determine the size of
              each point and a fragment shader to determine its transparency.
            </p>
          </Drawer>
        )}
      </AnimatePresence>
    </FullScreenMain>
  );
}
