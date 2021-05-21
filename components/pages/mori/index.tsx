import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import { Scene } from './scene';

export const Mori: React.FC = () => {
  const pixelRatio =
    typeof window === 'undefined' ? undefined : window.devicePixelRatio;

  return (
    <Canvas
      concurrent={true}
      camera={{ far: 100 }}
      resize={{
        scroll: true,
        debounce: { scroll: 50, resize: 0 }
      }}
      pixelRatio={pixelRatio}
    >
      <color attach="background" args={[0, 0, 0.05]} />
      <Scene />
    </Canvas>
  );
};
