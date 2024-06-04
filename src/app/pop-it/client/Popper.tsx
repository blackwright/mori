import tw, { css, styled } from 'twin.macro';
import { useState } from 'react';
import { Check } from 'react-feather';
import { keyframes } from 'styled-components';
import { Ripples } from './Ripples';

type Props = {
  color: string;
  index: number;
};

export function Popper({ color, index }: Props) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Button
      $color={color}
      $isPressed={isPressed}
      className="group"
      onPointerDown={() => setIsPressed(true)}
    >
      <InnerCircle $color={color} $index={index} $isPressed={isPressed}>
        <div css={isPressed ? tw`visible` : tw`invisible`}>
          <Check size="0.75rem" />
        </div>
      </InnerCircle>

      <Ripples />
    </Button>
  );
}

const backgroundFade = keyframes`
  0% {
    transform: scale(75%);
    background-color: transparent;
  }
  
  50% {
    transform: scale(100%);
    background-color: var(--bg-color);
  }
  
  100% {
    transform: scale(75%);
    background-color: transparent;
  }
`;

const Button = styled.button<{
  $color: string;
  $isPressed: boolean;
}>(({ $color, $isPressed }) => [
  tw`
    relative
    cursor-pointer
    flex
    items-center
    justify-center
    text-slate-100
    w-full
    aspect-square
    border
    rounded-full
    overflow-hidden
    [transition: all 1s ease-in-out]
  `,

  $isPressed
    ? tw`border-slate-100/100`
    : css`
        border-color: ${$color};
      `,
]);

const InnerCircle = styled.div<{
  $color: string;
  $index: number;
  $isPressed: boolean;
}>(({ $color, $index, $isPressed }) => [
  tw`
    flex
    items-center
    justify-center
    w-full
    aspect-square
    rounded-full
    transition-all
    transform-gpu
    pointer-events-none
  `,

  $isPressed
    ? tw`
        bg-slate-200/10
      `
    : css`
        --bg-color: ${$color};
        animation: ${backgroundFade} 1.5s ease-in infinite;
        animation-delay: ${$index * 50}ms;
        mask: radial-gradient(
          ellipse at center,
          rgba(0, 0, 0, 1) 0,
          rgba(0, 0, 0, 1) 75%,
          rgba(0, 0, 0, 0) 100%
        );
      `,
]);
