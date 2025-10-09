'use client';

import { cn } from '@/utils/cn';
import { MoreHorizontal } from 'react-feather';
import styles from './loading.module.css';

type Props = {
  className?: string;
};

export function LoadingIndicator({ className }: Props) {
  return (
    <div
      className={cn(
        'relative flex size-12 items-center justify-center overflow-hidden rounded-full',
        className,
      )}
    >
      <div
        className={cn('size-full transform-gpu', styles['spinning-gradient'])}
      />

      <MoreHorizontal className="absolute" />
    </div>
  );
}
