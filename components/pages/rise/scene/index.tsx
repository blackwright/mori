import * as React from 'react';
import { useFrame, useThree, useUpdate } from 'react-three-fiber';
import { Vector3, Mesh, BoxGeometry, ShaderMaterial } from 'three';
import { clampNumberRange } from 'utils/numbers';
import { Atmosphere } from './atmosphere';
import type { Clamp, ClampRanges } from 'utils/numbers';

const INCLINATION = 0.47;
const AZIMUTH = 0.25;
const MAX_Y_POSITION = 0.4;
const MIN_Y_POSITION = -MAX_Y_POSITION / 9;
const MAX_EXPOSURE = 0.5;
const MIN_EXPOSURE = 0.01;

const sinRange: Clamp = [1, -1];

const cosToPositionYClamp: ClampRanges = {
  input: sinRange,
  output: [MAX_Y_POSITION, MIN_Y_POSITION]
};

const cosToExposureClamp: ClampRanges = {
  input: sinRange,
  output: [MAX_EXPOSURE, MIN_EXPOSURE]
};

export const Scene: React.FC = () => {
  const { camera } = useThree();

  React.useEffect(() => {
    camera.lookAt(0, 20, 0);
  }, [camera]);

  const lightPosition = React.useMemo(() => new Vector3(), []);

  const atmosphereRef = useUpdate<Mesh<BoxGeometry, ShaderMaterial>>((mesh) => {
    const theta = Math.PI * (INCLINATION - 0.5);
    const phi = 2 * Math.PI * (AZIMUTH - 0.5);

    lightPosition.x = Math.cos(phi);
    lightPosition.y = MAX_Y_POSITION;
    lightPosition.z = Math.sin(phi) * Math.cos(theta);

    mesh.material.uniforms.lightPosition.value.copy(lightPosition);
  }, []);

  useFrame((state) => {
    const sinValue = Math.sin(state.clock.getElapsedTime());

    lightPosition.y = clampNumberRange(sinValue, cosToPositionYClamp);

    state.gl.toneMappingExposure = clampNumberRange(sinValue, cosToExposureClamp);

    atmosphereRef.current.material.uniforms.lightPosition.value.copy(lightPosition);
  });

  return <Atmosphere ref={atmosphereRef} />;
};
