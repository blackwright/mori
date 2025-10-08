import {
  clampNumberRange,
  type Clamp,
  type ClampRanges,
} from '@/utils/numbers';
import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import { Mesh, Vector3, type BoxGeometry, type ShaderMaterial } from 'three';
import { shader } from './shaders';

const INCLINATION = 0.47;
const AZIMUTH = 0.25;
const MAX_Y_POSITION = 0.4;
const MIN_Y_POSITION = 0.05;
const MAX_EXPOSURE = 0.5;
const MIN_EXPOSURE = 0.01;

const THETA = Math.PI * (INCLINATION - 0.5);
const PHI = 2 * Math.PI * (AZIMUTH - 0.5);
const LIGHT_POSITION = new Vector3(
  Math.cos(PHI),
  MAX_Y_POSITION,
  Math.sin(PHI) * Math.cos(THETA),
);

const sinRange: Clamp = [1, -1];

const cosToPositionYClamp: ClampRanges = {
  input: sinRange,
  output: [MAX_Y_POSITION, MIN_Y_POSITION],
};

const cosToExposureClamp: ClampRanges = {
  input: sinRange,
  output: [MAX_EXPOSURE, MIN_EXPOSURE],
};

export function Scene() {
  const meshRef = useRef<Mesh<BoxGeometry, ShaderMaterial> | null>(null);

  useLayoutEffect(() => {
    meshRef.current?.material.uniforms.lightPosition.value.copy(LIGHT_POSITION);

    meshRef.current?.scale.setScalar(450_000);
  }, []);

  useFrame((state) => {
    const sinValue = Math.sin(state.clock.getElapsedTime());

    LIGHT_POSITION.y = clampNumberRange(sinValue, cosToPositionYClamp);

    state.gl.toneMappingExposure = clampNumberRange(
      sinValue,
      cosToExposureClamp,
    );

    meshRef.current?.material.uniforms.lightPosition.value.copy(LIGHT_POSITION);
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <shaderMaterial attach="material" args={[shader]} toneMapped />
    </mesh>
  );
}
