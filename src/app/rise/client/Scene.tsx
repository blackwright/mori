import { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Mesh, type BoxGeometry, type ShaderMaterial } from 'three';
import {
  clampNumberRange,
  type Clamp,
  type ClampRanges,
} from '@/utils/numbers';
import { shader } from './shaders';

const INCLINATION = 0.47;
const AZIMUTH = 0.25;
const MAX_Y_POSITION = 0.4;
const MIN_Y_POSITION = -MAX_Y_POSITION / 9;
const MAX_EXPOSURE = 0.5;
const MIN_EXPOSURE = 0.01;

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
  const { camera } = useThree();

  const meshRef = useRef<Mesh<BoxGeometry, ShaderMaterial> | null>(null);

  const lightPosition = useMemo(() => {
    const theta = Math.PI * (INCLINATION - 0.5);
    const phi = 2 * Math.PI * (AZIMUTH - 0.5);

    return new Vector3(
      Math.cos(phi),
      MAX_Y_POSITION,
      Math.sin(phi) * Math.cos(theta),
    );
  }, []);

  useLayoutEffect(() => {
    meshRef.current?.material.uniforms.lightPosition.value.copy(lightPosition);

    meshRef.current?.scale.setScalar(450_000);

    camera.lookAt(0, 20, 0);
  }, [camera]);

  useFrame(state => {
    const sinValue = Math.sin(state.clock.getElapsedTime());

    lightPosition.y = clampNumberRange(sinValue, cosToPositionYClamp);

    state.gl.toneMappingExposure = clampNumberRange(
      sinValue,
      cosToExposureClamp,
    );

    meshRef.current?.material.uniforms.lightPosition.value.copy(lightPosition);
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <shaderMaterial attach="material" args={[shader]} toneMapped />
    </mesh>
  );
}
