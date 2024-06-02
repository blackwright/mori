import tw, { css, styled } from 'twin.macro';
import { keyframes } from 'styled-components';
import { DOT_SIZE, LINK_PADDING } from './constants';

export const Background = tw.main`
  relative
  w-screen
  h-screen
  [background-image: radial-gradient(
    ellipse at bottom left,
    #b5becf 0%,
    #505976 50%,
    #000 100%
  )]

  after:(
    absolute
    top-0
    left-0
    w-screen
    h-screen
    [content: '']
    [background-image: linear-gradient(
      5deg,
      #a1a8c0 0%,
      #5d6683 25%,
      #273343 70%
    )]
  )
`;

export const BeamOverlay = tw.div`
  absolute
  top-0
  left-0
  w-full
  h-full
  opacity-50
  [background-image: radial-gradient(
    ellipse at bottom left,
    #b5becf 0%,
    #273343 80%,
    #000 100%
  )]
  z-1
`;

export const Beam = styled.div<{
  $left: string;
  $width: string;
  $rotate: string;
  $alpha: number;
}>((props) => [
  tw`
    absolute
    top-1/2
    [height: 150%]
    z-1
  `,

  css`
    width: ${props.$width};
    transform: translate3d(0, -50%, 0) rotateZ(${props.$rotate});
    left: ${props.$left};
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 225, 225, ${props.$alpha}) 40%,
      rgba(255, 225, 225, ${props.$alpha}) 60%,
      transparent 100%
    );
  `,
]);

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
`;

export const Dot = styled.div(() => [
  tw`
    absolute
    [top: 36%]
    [left: 45%]
    rounded-full
    bg-slate-50
    [box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.5)]
  `,

  css`
    width: ${DOT_SIZE}px;
    height: ${DOT_SIZE}px !important;
    animation: ${blink} 8s ease infinite;
  `,
]);

const translate = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-2%, -3%);
  }
  20% {
    transform: translate(-5%, 2%);
  }
  30% {
    transform: translate(2%, -3%);
  }
  40% {
    transform: translate(-3%, 4%);
  }
  50% {
    transform: translate(0%, 1%);
  }
  60% {
    transform: translate(2%, -2%);
  }
  70% {
    transform: translate(4%, -5%);
  }
  80% {
    transform: translate(1%, -3%);
  }
  90% {
    transform: translate(-2%, 1%);
  }
`;

export const Grain = styled.div(() => [
  tw`
    fixed
    -top-1/2
    -left-1/2
    [width: 200%]
    [height: 200%]
    mix-blend-color-burn
    [background-image: url('/pale/cork.png')]
    z-1
  `,

  css`
    animation: ${translate} 0.25s steps(10) infinite;
  `,
]);

export const PaddedLink = styled.a`
  padding: ${LINK_PADDING}px;
  position: absolute;
  z-index: 1;
`;
