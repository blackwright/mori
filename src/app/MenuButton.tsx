'use client';

import tw, { styled } from 'twin.macro';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Plus } from 'react-feather';
import { Button } from '@/components';
import { NAV_SEARCH_PARAM_KEY, NAV_SEARCH_PARAM_VALUE } from './constants';
import type { StyledNavProps } from './types';

const StyledButton = styled(Button)<StyledNavProps>(({ $isNavOpen }) => [
  tw`
    inline-flex
    items-center
    justify-center
    cursor-pointer
    pointer-events-auto
    w-8
    h-8
    p-0
    transition-all
  `,

  $isNavOpen && tw`rotate-45`,
]);

type Props = {
  className?: string;
};

export function MenuButton({ className }: Props) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isNavOpen =
    searchParams.get(NAV_SEARCH_PARAM_KEY) === NAV_SEARCH_PARAM_VALUE;

  const handleToggleIsNavOpen = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    const newIsNavOpen = !isNavOpen;

    if (newIsNavOpen) {
      newSearchParams.set(NAV_SEARCH_PARAM_KEY, NAV_SEARCH_PARAM_VALUE);
    } else {
      newSearchParams.delete(NAV_SEARCH_PARAM_KEY);
    }

    replace(`${pathname}?${newSearchParams}`);
  };

  return (
    <StyledButton
      $isNavOpen={isNavOpen}
      onClick={handleToggleIsNavOpen}
      className={className}
    >
      <Plus />
    </StyledButton>
  );
}
