'use client';

import { cn } from '@/utils/cn';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';

const slidingAnimation = {
  initial: {
    bottom: '-100%',
  },
  animate: {
    bottom: '0%',
  },
  exit: {
    bottom: '-100%',
  },
};

type Props = Omit<
  ComponentProps<'div'>,
  'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationEnd'
>;

export function Drawer({ className, ...props }: Props) {
  return (
    <motion.div
      className={cn(
        'absolute bottom-0 left-0 [z-index:2] flex h-dvh w-dvw flex-col gap-4 overflow-auto border-t border-slate-200 bg-slate-800/90 px-8 pt-16 pb-20 text-slate-200 md:h-[75%] md:rounded-t-lg lg:h-[50%] 2xl:h-[33%]',
        className,
      )}
      {...slidingAnimation}
      {...props}
    />
  );
}
