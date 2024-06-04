import tw, { css, styled } from 'twin.macro';
import { useLayoutEffect, useState, type PointerEvent } from 'react';
import { keyframes } from 'styled-components';

const DURATION = 1_000;

type Ripple = {
  top: number;
  left: number;
  size: number;
  timeoutId?: number;
};

export function Ripples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useLayoutEffect(() => {
    let timeoutId: number | undefined;

    if (ripples.length) {
      window.clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        setRipples([]);
      }, DURATION * 2);
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [ripples]);

  const handlePointerDown = (e: PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);

    const newRipple: Ripple = {
      top: e.clientY - rect.top - size / 2,
      left: e.clientX - rect.left - size / 2,
      size,
    };

    setRipples((prevRipples) => prevRipples.concat(newRipple));
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      tw="absolute top-0 right-0 bottom-0 left-0"
    >
      {ripples.map((ripple, i) => (
        <StyledRipple
          key={i}
          style={{
            top: ripple.top,
            left: ripple.left,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </div>
  );
}

const ripple = keyframes`
  to {
    opacity: 0;
    transform: scale(2);
  }
`;

const StyledRipple = styled.div(() => [
  tw`
    absolute
    [transform: scale(0)]
    origin-center
    opacity-50
    bg-slate-50
    rounded-full
    transform-gpu
  `,

  css`
    animation: ${ripple} ${DURATION}ms;
  `,
]);
