'use client';

import { useDetailsSearchParams } from '@/app/hooks';
import { Drawer, FullScreenMain } from '@/components';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence } from 'motion/react';
import { Scene } from './Scene';

export function Rise() {
  const [areDetailsOpen] = useDetailsSearchParams();

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

      <AnimatePresence>
        {areDetailsOpen && (
          <Drawer>
            <p>
              An exercise in lighting with react-three-fiber (borrowing heavily
              from the Three.js{' '}
              <a
                href="https://threejs.org/examples/webgl_shaders_sky.html"
                target="_blank"
              >
                sky shader example
              </a>
              ).
            </p>
            <p>
              The light source is mapped to a sine wave function for movement
              and the position of the light source determines its intensity.
              Simultaneously, tone mapping exposure is adjusted for overall
              lighting.
            </p>
            <p>
              A vertex shader calculates Rayleigh scattering and Mie scattering
              coefficients, which are used by the fragment shader to simulate
              the physical lighting of a sky, the glow around the light source,
              and the visual haze of light as it travels through the atmosphere.
            </p>
          </Drawer>
        )}
      </AnimatePresence>
    </FullScreenMain>
  );
}
