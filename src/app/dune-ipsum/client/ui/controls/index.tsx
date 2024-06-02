import tw from 'twin.macro';
import { Button } from '@/components';
import { ParagraphCount } from './ParagraphCount';
import { CopyButton } from './CopyButton';

type Props = {
  text: string;
  count: number;
  onChangeCount: (count: number) => void;
  onGenerate: () => void;
  disabled?: boolean;
};

export function Controls({
  text,
  count,
  onChangeCount,
  onGenerate,
  disabled,
}: Props) {
  return (
    <Wrapper>
      <ParagraphCount
        count={count}
        onChange={onChangeCount}
        disabled={disabled}
      />

      <Button onClick={onGenerate} disabled={disabled}>
        other memory
      </Button>

      <CopyButton text={text} />
    </Wrapper>
  );
}

const Wrapper = tw.div`
  flex
  items-stretch
  justify-center
  gap-3
  py-8
  lg:py-16
`;
