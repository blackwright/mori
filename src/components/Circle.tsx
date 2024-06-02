import { useState } from 'react';
import tw, { styled, css } from 'twin.macro';
import { keyframes } from 'styled-components';
import { Check } from 'react-feather';

type Props = {
  color: string;
  index: number;
};

export function Circle({ color, index }: Props) {
  const [hasHovered, setHasHovered] = useState(false);

  return (
    <OuterCircle
      $color={color}
      $hasHovered={hasHovered}
      className="group"
      onMouseEnter={() => setHasHovered(true)}
    >
      <InnerCircle $color={color} $index={index} $hasHovered={hasHovered}>
        <div css={hasHovered ? tw`visible` : tw`invisible`}>
          <Check size="0.75rem" />
        </div>
      </InnerCircle>
    </OuterCircle>
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

const OuterCircle = styled.div<{
  $color: string;
  $hasHovered: boolean;
}>(({ $color, $hasHovered }) => [
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
  `,

  $hasHovered
    ? tw`border-slate-100`
    : css`
        border-color: ${$color};
      `,
]);

const InnerCircle = styled.div<{
  $color: string;
  $index: number;
  $hasHovered: boolean;
}>(({ $color, $index, $hasHovered }) => [
  tw`
    flex
    items-center
    justify-center
    w-full
    aspect-square
    rounded-full
    transition-all
    transform-gpu
  `,

  $hasHovered
    ? tw`
        bg-slate-50/10
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
