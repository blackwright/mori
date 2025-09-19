'use client';

import tw from 'twin.macro';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

const slidingAnimation = {
  initial: {
    bottom: '-100%'
  },
  animate: {
    bottom: '0%',
  },
  exit: {
    bottom: '-100%'
  }
};

const StyledDrawer = tw(motion.div)`
  absolute
  bottom-0
  left-0
  flex
  flex-col
  gap-4
  text-slate-200
  w-dvw
  h-dvh
  overflow-auto
  bg-slate-800/90
  pt-16
  px-8
  pb-20
  border-t
  border-slate-200
  md:(
    [height: 75%]
    rounded-t-lg
  )
  lg:[height: 50%]
  2xl:[height: 33%]
  [z-index: 2]
`;

type Props = {
  children: ReactNode;
};

export function Drawer({ children }: Props) {
  return (
    <StyledDrawer {...slidingAnimation}>
      {children}
    </StyledDrawer>
  );
}