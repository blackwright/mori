import { useEffect, useState } from 'react';
import { Incoming } from './Incoming';
import { Outgoing } from './Outgoing';
import type { BufferAttributes } from './types';
import { createBufferAttributes } from './utils';

type Props = {
  position: Float32Array;
  incomingDelay: number;
  onComplete?: () => void;
};

type State = {
  incoming?: BufferAttributes;
  outgoing?: BufferAttributes;
  maxVisibleTime?: number;
};

export function Text({ position, incomingDelay, onComplete }: Props) {
  const [state, setState] = useState<State>({
    incoming: undefined,
    outgoing: undefined,
    maxVisibleTime: undefined,
  });

  useEffect(() => {
    setState((prevState) => {
      const { attributes: incoming, maxVisibleTime } =
        createBufferAttributes(position);

      return {
        outgoing: prevState.incoming ? prevState.incoming : undefined,
        incoming,
        maxVisibleTime,
      };
    });
  }, [position]);

  return (
    <>
      {state.incoming && state.maxVisibleTime && (
        <Incoming
          attributes={state.incoming}
          incomingDelay={incomingDelay}
          maxVisibleTime={state.maxVisibleTime}
          onComplete={onComplete}
        />
      )}

      {state.outgoing && <Outgoing attributes={state.outgoing} />}
    </>
  );
}
