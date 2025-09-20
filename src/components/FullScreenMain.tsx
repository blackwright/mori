import { cn } from '@/utils/cn';
import { type ComponentProps } from 'react';

type Props = ComponentProps<'main'>;

export function FullScreenMain({ className, ...props }: Props) {
  return (
    <main
      className={cn(
        'relative h-screen w-screen overflow-hidden bg-slate-900',
        className,
      )}
      {...props}
    />
  );
}
