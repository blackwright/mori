import tw, { css, styled } from 'twin.macro';
import { forwardRef } from 'react';

type Props = {
  className?: string;
  children: string;
};

const Component = forwardRef<HTMLElement, Props>(
  ({ className, children }, ref) => {
    return (
      <i ref={ref} className={className}>
        {children}
      </i>
    );
  },
);

export const Icon = styled(Component)(() => [
  tw`
    absolute
    top-0
    left-0
    w-full
    [height: 8rem]
    text-white
    text-center
    [font-size: 6rem]
    not-italic
    [line-height: 6rem]
    [backface-visibility: hidden]
  `,

  css`
    font-family: 'ldr-ofer-michael';
  `,
]);
