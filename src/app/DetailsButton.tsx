'use client';

import tw, { styled } from 'twin.macro';
import { Button } from '@/components';
import { useDetailsSearchParams } from './hooks';

type StyledButtonProps = {
  $isActive: boolean;
};

const StyledButton = styled(Button)<StyledButtonProps>(({ $isActive }) => [
  tw`
    absolute
    right-4
    bottom-5
    inline-flex
    items-center
    justify-center
    cursor-pointer
    pointer-events-auto
    w-8
    h-8
    p-0
    z-10
  `,

  $isActive && tw`bg-slate-200/30`,
]);

export function DetailsButton() {
  const [areDetailsOpen, handleToggleDetails] = useDetailsSearchParams();

  return (
    <StyledButton onClick={handleToggleDetails} $isActive={areDetailsOpen}>
      i
    </StyledButton>
  );
}