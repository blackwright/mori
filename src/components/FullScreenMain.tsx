import { cn } from '@/utils/cn';
import { type ComponentProps } from 'react';

type Props = ComponentProps<'main'>;

export function FullScreenMain({ className, ...props }: Props) {
  return (
    <main
      className={cn(
        'relative h-dvh w-dvw overflow-hidden bg-gray-950',
        className,
      )}
      {...props}
    />
  );
}
