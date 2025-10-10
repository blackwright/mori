'use client';

import { cn } from '@/utils/cn';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export function ErrorMessage({ children, className }: Props) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded border-t border-slate-200/25 bg-red-800/25 px-8 py-4',
        className,
      )}
    >
      {children}
    </div>
  );
}
