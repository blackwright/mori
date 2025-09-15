'use client';

import tw from 'twin.macro';

export const AboutContainer = tw.div`
  flex
  flex-col
  items-start
  justify-center
  p-4
  [max-width: 650px]
  gap-6
  mt-12
  text-xl
  leading-relaxed
  mx-auto
`;

export const Callout = tw.div`
  flex
  flex-col
  gap-1
  bg-zinc-800
  [width: calc(100% + 3rem)]
  p-6
  -mx-6
  rounded-lg
`;

export const CalloutParagraph = tw.p`
  flex
  items-center
  gap-2
`;
