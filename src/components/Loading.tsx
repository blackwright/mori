'use client';

import { cn } from '@/utils/cn';
import { MoreHorizontal } from 'react-feather';
import { FullScreenMain } from './FullScreenMain';
import styles from './loading.module.css';

export default function Loading() {
  return (
    <FullScreenMain className="flex items-center justify-center">
      <div
        className={cn(
          'absolute h-12 w-12 transform-gpu rounded-full',
          styles.spinningGradient,
        )}
      />

      <MoreHorizontal className="absolute" />
    </FullScreenMain>
  );
}
