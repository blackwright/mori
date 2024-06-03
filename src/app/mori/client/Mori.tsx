'use client';

import 'twin.macro';
import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FullScreenMain } from '@/components';
import { Scene } from './scene';

export function Mori() {
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
        <Scene />
        <CameraControls />
      </Canvas>
    </FullScreenMain>
  );
}
