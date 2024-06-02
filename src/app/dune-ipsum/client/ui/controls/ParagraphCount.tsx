import tw, { styled } from 'twin.macro';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import { Button } from '@/components';

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
    console.log('toggle');
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
      <span tw="flex items-center gap-1">
        <span tw="font-sans text-xs font-semibold select-none">▼</span>
        <span>{count}</span>
      </span>

      <Dropdown $isOpen={isOpen && !disabled}>
        {OPTIONS.map((num) => (
          <Option key={num} onClick={() => handleOptionClick(num)}>
            {num}
          </Option>
        ))}
      </Dropdown>
    </Button>
  );
}

const Dropdown = styled.ul<{ $isOpen: boolean }>(({ $isOpen }) => [
  tw`
    absolute
    top-10
    left-0
    flex
    flex-col
    w-full
    border
    border-slate-100
    rounded
    transition-all
  `,

  $isOpen ? tw`visible` : tw`hidden`,
]);

const Option = tw.li`
  flex
  items-center
  justify-center
  p-1
  w-full
  transition-all
  hover:bg-slate-100/20
`;
