'use client';

import { Button } from '@/components';
import { cn } from '@/utils/cn';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Plus } from 'react-feather';
import { NAV_SEARCH_PARAM } from './constants';

type Props = {
  className?: string;
};

export function MenuButton({ className }: Props) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isNavOpen =
    searchParams.get(NAV_SEARCH_PARAM.key) === NAV_SEARCH_PARAM.value;

  const handleToggleIsNavOpen = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    const newIsNavOpen = !isNavOpen;

    if (newIsNavOpen) {
      newSearchParams.set(NAV_SEARCH_PARAM.key, NAV_SEARCH_PARAM.value);
    } else {
      newSearchParams.delete(NAV_SEARCH_PARAM.key);
    }

    replace(`${pathname}?${newSearchParams}`);
  };

  return (
    <Button
      onClick={handleToggleIsNavOpen}
      className={cn(
        'pointer-events-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center p-0 transition-all',
        isNavOpen && 'rotate-45',
        className,
      )}
    >
      <Plus />
    </Button>
  );
}
