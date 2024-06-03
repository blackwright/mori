'use client';

import tw, { css, styled, theme } from 'twin.macro';
import { MoreHorizontal } from 'react-feather';
import { keyframes } from 'styled-components';
import { FullScreenMain } from '@/components';

export default function Loading() {
  return (
    <FullScreenMain tw="flex items-center justify-center">
      <Spinner />

      <MoreHorizontal tw="absolute" />
    </FullScreenMain>
  );
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div(() => [
  tw`
    absolute
    transform-gpu
    w-12
    h-12
    rounded-full

    before:(
      absolute
      [content: '']
      top-1/2
      left-1/2
      -translate-x-1/2
      -translate-y-1/2
      [width: calc(3rem - 1px)]
      [height: calc(3rem - 1px)]
      bg-slate-900
      rounded-full
    )
  `,

  css`
    background: conic-gradient(
      from 90deg at 50% 50%,
      rgba(10, 10, 10, 0) 0deg,
      ${theme('colors.slate.50')} 360deg
    );
    animation: ${rotate} 1s infinite linear;
  `,
]);
