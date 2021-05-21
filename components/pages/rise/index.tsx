import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import { sRGBEncoding, ACESFilmicToneMapping } from 'three';
import { Scene } from './scene';

export const Rise: React.FC = () => {
  const pixelRatio =
    typeof window === 'undefined' ? undefined : window.devicePixelRatio;

  return (
    <Canvas
      concurrent={true}
      camera={{
        position: [0, 0, 100],
        fov: 60,
        far: 200
      }}
      resize={{
        scroll: true,
        debounce: { scroll: 50, resize: 0 }
      }}
      pixelRatio={pixelRatio}
      onCreated={({ gl }) => {
        gl.outputEncoding = sRGBEncoding;
        gl.toneMapping = ACESFilmicToneMapping;
      }}
    >
      <Scene />
    </Canvas>
  );
};
