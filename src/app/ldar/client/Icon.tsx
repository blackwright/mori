import { cn } from '@/utils/cn';
import { forwardRef } from 'react';
import styles from './icon.module.css';

type Props = {
  className?: string;
  children: string;
};

export const Icon = forwardRef<HTMLElement, Props>(
  ({ className, children }, ref) => {
    return (
      <i
        ref={ref}
        className={cn(
          'absolute top-0 left-0 w-full text-center text-white not-italic',
          styles.icon,
          className,
        )}
      >
        {children}
      </i>
    );
  },
);
