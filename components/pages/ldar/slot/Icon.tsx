import * as React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
  children: string;
};

const Component = React.forwardRef<HTMLElement, Props>(
  ({ className, children }, ref) => {
    return (
      <i ref={ref} className={className}>
        {children}
      </i>
    );
  }
);

export const Icon = styled(Component)`
  font-family: 'ldr-ofer-michael';
  color: white;
  font-style: normal;
  font-weight: normal;
  font-size: 6rem;
  text-align: center;
  line-height: 6rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8rem;
  backface-visibility: hidden;
`;
