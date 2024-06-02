'use client';

import 'twin.macro';
import { Canvas } from '@react-three/fiber';
import { FullScreenMain } from '@/components/FullScreenMain';
import { Scene } from './Scene';

export function Rise() {
  return (
    <FullScreenMain>
      <Canvas
        camera={{
          position: [0, 0, 100],
          fov: 60,
          far: 200,
        }}
        resize={{
          scroll: true,
          debounce: { scroll: 50, resize: 0 },
        }}
      >
        <Scene />
      </Canvas>
    </FullScreenMain>
  );
}
