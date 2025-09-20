'use client';

import 'twin.macro';
import { AnimatePresence } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDetailsSearchParams } from '@/app/hooks';
import { Drawer } from '@/components';
import { LINK_POSITION_OFFSET } from './constants';
import {
  Background,
  Beam,
  BeamOverlay,
  Dot,
  Grain,
  PaddedLink,
} from './styled';

type DotPosition = {
  top: number;
  left: number;
};

export function PaleBlueDot() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  const [dotPosition, setDotPosition] = useState<DotPosition | null>(null);

  const [areDetailsOpen] = useDetailsSearchParams();

  const calculateDotPosition = useCallback(() => {
    if (dotRef.current) {
      const { top, left } = dotRef.current.getBoundingClientRect();
      setDotPosition({ top, left });
    }
  }, []);

  useEffect(() => {
    calculateDotPosition();

    window.addEventListener('resize', calculateDotPosition);

    return () => {
      window.removeEventListener('resize', calculateDotPosition);
    };
  }, [calculateDotPosition]);

  return (
    <Background>
      <Beam $left="6%" $width="13%" $rotate="14deg" $alpha={0.07} />
      <Beam $left="22%" $width="12%" $rotate="12deg" $alpha={0.08} />
      <Beam $left="30%" $width="12%" $rotate="12deg" $alpha={0.08} />
      <Beam $left="53%" $width="8%" $rotate="10deg" $alpha={0.3}>
        <Dot ref={dotRef} />
      </Beam>

      <BeamOverlay />

      <Grain />

      {!!dotPosition && (
        <PaddedLink
          as="a"
          href="https://solarsystem.nasa.gov/resources/536/voyager-1s-pale-blue-dot/"
          target="_blank"
          style={{
            top: dotPosition.top - LINK_POSITION_OFFSET,
            left: dotPosition.left - LINK_POSITION_OFFSET,
          }}
        >
          <Dot
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate3d(-50%, -50%, 0)',
            }}
          />
        </PaddedLink>
      )}

      <AnimatePresence>
        {areDetailsOpen && (
          <Drawer>
            <p>
              <em>The Pale Blue Dot</em> is a photo of Earth taken by space
              probe Voyager 1 from a distance of 3.7 billion miles, as proposed
              by{' '}
              <a
                href="https://www.youtube.com/watch?v=wupToqz1e2g"
                target="_blank"
              >
                Carl Sagan
              </a>
              , who said:
            </p>
            <blockquote tw="bg-slate-900/50 p-4 border-l-4 border-slate-900 rounded-r-lg">
              To me, it underscores our responsibility to deal more kindly with
              one another, and to preserve and cherish the pale blue dot, the
              only home we've ever known.
            </blockquote>
            <p>
              This is a recreation of NASA's <em>Pale Blue Dot Revisited</em>{' '}
              image in HTML and CSS, implemented with gradients and a keyframe
              animation on an image texture to simulate film grain noise.
            </p>
          </Drawer>
        )}
      </AnimatePresence>
    </Background>
  );
}
