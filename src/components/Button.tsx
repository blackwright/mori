import { cn } from '@/utils/cn';
import { type ComponentProps } from 'react';

type Props = ComponentProps<'button'>;

export function Button({ className, ...props }: Props) {
  return (
    <button
      className={cn(
        'relative flex min-h-8 min-w-8 cursor-pointer items-center justify-center rounded border border-slate-100 bg-slate-200/10 px-4 py-0.5 text-slate-100 hover:bg-slate-200/40 active:bg-slate-200/20 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
