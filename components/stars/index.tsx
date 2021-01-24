import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import { Scene } from './scene';

export const Stars: React.FC = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <Canvas
      concurrent={true}
      camera={{ far: 100 }}
      resize={{
        scroll: true,
        debounce: { scroll: 50, resize: 0 }
      }}
      pixelRatio={window.devicePixelRatio}
    >
      <color attach="background" args={[0, 0, 0.05]} />
      <Scene />
    </Canvas>
  );
};
