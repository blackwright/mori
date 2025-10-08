import { forwardRef } from 'react';

type Props = {
  children: string;
};

export const Icon = forwardRef<HTMLElement, Props>(function Icon(
  { children },
  ref,
) {
  return (
    <i
      ref={ref}
      className="absolute top-0 left-0 h-32 w-full text-center text-8xl leading-24 text-white not-italic backface-hidden"
    >
      {children}
    </i>
  );
});
