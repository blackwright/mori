'use client';

import { Button } from '@/components';
import { cn } from '@/utils/cn';
import { useDetailsSearchParams } from './hooks';

export function DetailsButton() {
  const [areDetailsOpen, handleToggleDetails] = useDetailsSearchParams();

  return (
    <Button
      onClick={handleToggleDetails}
      className={cn(
        'pointer-events-auto absolute right-4 bottom-5 z-10 inline-flex h-8 w-8 cursor-pointer items-center justify-center p-0',
        areDetailsOpen && 'bg-slate-200/30',
      )}
    >
      i
    </Button>
  );
}
