import { Suspense } from 'react';
import { Text } from './text';
import { Wind } from './wind';

type Props = {
  position: Float32Array;
  isRendering: boolean;
  onComplete: () => void;
};

export function Scene({ position, isRendering, onComplete }: Props) {
  return (
    <Suspense fallback={null}>
      <Text position={position} incomingDelay={2} onComplete={onComplete} />
      <Wind isRendering={isRendering} />
    </Suspense>
  );
}
