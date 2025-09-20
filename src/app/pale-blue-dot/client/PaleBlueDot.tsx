'use client';

import { useDetailsSearchParams } from '@/app/hooks';
import { Drawer } from '@/components';
import { cn } from '@/utils/cn';
import { AnimatePresence } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DOT_SIZE, LINK_POSITION_OFFSET } from './constants';
import styles from './pale-blue-dot.module.css';

type DotPosition = {
  top: number;
  left: number;
};

type BeamProps = {
  left: string;
  width: string;
  rotate: string;
  alpha: number;
  children?: React.ReactNode;
};

function Beam({ left, width, rotate, alpha, children }: BeamProps) {
  return (
    <div
      className="absolute top-1/2 z-1 [height:150%]"
      style={{
        width,
        left,
        transform: `translate3d(0, -50%, 0) rotateZ(${rotate})`,
        background: `linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 225, 225, ${alpha}) 40%,
          rgba(255, 225, 225, ${alpha}) 60%,
          transparent 100%
        )`,
      }}
    >
      {children}
    </div>
  );
}

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
    <main className={cn('relative h-screen w-screen', styles.background)}>
      <Beam left="6%" width="13%" rotate="14deg" alpha={0.07} />
      <Beam left="22%" width="12%" rotate="12deg" alpha={0.08} />
      <Beam left="30%" width="12%" rotate="12deg" alpha={0.08} />
      <Beam left="53%" width="8%" rotate="10deg" alpha={0.3}>
        <div
          ref={dotRef}
          className={cn('absolute rounded-full bg-slate-50', styles.dot)}
          style={{ top: '36%', left: '45%' }}
        />
      </Beam>

      <div
        className={cn(
          'absolute top-0 left-0 z-1 h-full w-full opacity-50',
          styles.beamOverlay,
        )}
      />

      <div
        className={cn(
          'fixed -top-1/2 -left-1/2 z-1 [height:200%] [width:200%] mix-blend-color-burn',
          styles.grain,
        )}
      />

      {!!dotPosition && (
        <a
          className="absolute z-1"
          href="https://solarsystem.nasa.gov/resources/536/voyager-1s-pale-blue-dot/"
          target="_blank"
          style={{
            top: dotPosition.top - LINK_POSITION_OFFSET,
            left: dotPosition.left - LINK_POSITION_OFFSET,
            padding: LINK_POSITION_OFFSET,
          }}
        >
          <div
            className={cn('absolute rounded-full bg-slate-50', styles.dot)}
            style={{
              top: '50%',
              left: '50%',
              width: DOT_SIZE,
              height: DOT_SIZE,
              transform: 'translate3d(-50%, -50%, 0)',
            }}
          />
        </a>
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
            <blockquote className="rounded-r-lg border-l-4 border-slate-900 bg-slate-900/50 p-4">
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
    </main>
  );
}
