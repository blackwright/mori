import { Button } from '@/components';
import { CopyButton } from './CopyButton';

type Props = {
  text: string;
  onGenerate: () => Promise<void>;
  disabled: boolean;
};

export function Controls({ text, onGenerate, disabled }: Props) {
  return (
    <div className="flex items-stretch justify-center gap-3 py-8 lg:py-16">
      <Button onClick={onGenerate} disabled={disabled}>
        other memory
      </Button>

      <CopyButton text={text} />
    </div>
  );
}
