import { Button } from '@/components';
import { cn } from '@/utils/cn';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import { ChevronDown } from 'react-feather';

const MAX_PARAGRAPHS = 4;

const OPTIONS = Array.from({ length: MAX_PARAGRAPHS }, (_, i) => i + 1);

type Props = {
  count: number;
  onChange: (count: number) => void;
  disabled?: boolean;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export function ParagraphCount({
  className,
  count,
  onChange,
  disabled,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (value: number) => {
    if (disabled) {
      return;
    }

    onChange(value);
  };

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (!ref.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <Button
      ref={ref}
      className={className}
      onClick={handleToggleOpen}
      disabled={disabled}
    >
      <span className="flex items-center gap-1">
        <ChevronDown />
        <span>{count}</span>
      </span>

      <ul
        className={cn(
          'absolute top-10 left-0',
          'flex flex-col',
          'w-full',
          'rounded border border-slate-100',
          'transition-all',
          isOpen && !disabled ? 'visible' : 'hidden',
        )}
      >
        {OPTIONS.map((num) => (
          <li
            key={num}
            onClick={() => handleOptionClick(num)}
            className="flex w-full items-center justify-center p-1 transition-all hover:bg-slate-100/20"
          >
            {num}
          </li>
        ))}
      </ul>
    </Button>
  );
}
