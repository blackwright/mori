import { useEffect, useState } from 'react';
import type { BufferGeometry } from 'three';
import { Incoming } from './Incoming';
import { Outgoing } from './Outgoing';
import { createIncomingTextGeometry } from './utils';

type Props = {
  position: Float32Array;
  incomingDelay: number;
  onComplete?: () => void;
};

type State = {
  key: number;
  incoming: BufferGeometry | null;
  outgoing: BufferGeometry | null;
  maxVisibleTime: number | null;
};

export function Text({ position, incomingDelay, onComplete }: Props) {
  const [state, setState] = useState<State>({
    key: 0,
    incoming: null,
    outgoing: null,
    maxVisibleTime: null,
  });

  useEffect(() => {
    setState((prevState) => {
      const { geometry: incoming, maxVisibleTime } =
        createIncomingTextGeometry(position);

      return {
        key: prevState.key + 1,
        outgoing: prevState.incoming ? prevState.incoming : null,
        incoming,
        maxVisibleTime,
      };
    });
  }, [position]);

  return (
    <>
      {state.incoming && state.maxVisibleTime && (
        <Incoming
          key={`incoming-${state.key}`}
          geometry={state.incoming}
          incomingDelay={incomingDelay}
          maxVisibleTime={state.maxVisibleTime}
          onComplete={onComplete}
        />
      )}

      {state.outgoing && (
        <Outgoing key={`outgoing-${state.key}`} geometry={state.outgoing} />
      )}
    </>
  );
}
