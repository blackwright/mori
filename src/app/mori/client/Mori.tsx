'use client';

import { Canvas } from '@react-three/fiber';
import { FullScreenMain } from '@/components/FullScreenMain';
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
      >
        <color attach="background" args={[0, 0, 0.05]} />
        <Scene />
      </Canvas>
    </FullScreenMain>
  );
}
