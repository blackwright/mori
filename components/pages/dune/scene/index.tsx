import * as React from 'react';
import { Text } from './text';
import { Wind } from './wind';

type Props = {
  position: Float32Array;
  isRendering: boolean;
  onComplete?: () => void;
};

export const Scene: React.FC<Props> = ({
  position,
  isRendering,
  onComplete
}) => {
  return (
    <React.Suspense fallback={null}>
      <Text position={position} incomingDelay={2} onComplete={onComplete} />
      <Wind isRendering={isRendering} />
    </React.Suspense>
  );
};
