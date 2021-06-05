import * as React from 'react';
import { LINK_POSITION_OFFSET } from './constants';
import {
  Background,
  BeamOverlay,
  Beam,
  Dot,
  Grain,
  PaddedLink
} from './styled';

type DotPosition = {
  top?: number;
  left?: number;
};

export const Pale: React.FC = () => {
  const dotRef = React.useRef<HTMLDivElement>(null);

  const [dotPosition, setDotPosition] = React.useState<DotPosition>({});

  const calculateDotPosition = React.useCallback(() => {
    const { top, left } = dotRef.current.getBoundingClientRect();
    setDotPosition({ top, left });
  }, []);

  React.useEffect(() => {
    calculateDotPosition();

    window.addEventListener('resize', calculateDotPosition);

    return () => {
      window.removeEventListener('resize', calculateDotPosition);
    };
  }, [calculateDotPosition]);

  return (
    <>
      <Background>
        <Beam left="6%" width="13%" rotate="14deg" alpha={0.07} />
        <Beam left="22%" width="12%" rotate="12deg" alpha={0.08} />
        <Beam left="30%" width="12%" rotate="12deg" alpha={0.08} />
        <Beam left="53%" width="8%" rotate="10deg" alpha={0.3}>
          <Dot ref={dotRef} />
        </Beam>
        <BeamOverlay />
      </Background>
      <Grain />

      {!!dotPosition.top && (
        <PaddedLink
          as="a"
          href="https://solarsystem.nasa.gov/resources/536/voyager-1s-pale-blue-dot/"
          target="_blank"
          style={{
            top: dotPosition.top - LINK_POSITION_OFFSET,
            left: dotPosition.left - LINK_POSITION_OFFSET
          }}
        >
          <Dot
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate3d(-50%, -50%, 0)'
            }}
          />
        </PaddedLink>
      )}
    </>
  );
};
