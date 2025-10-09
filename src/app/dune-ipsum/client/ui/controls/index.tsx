import { Button, LoadingIndicator } from '@/components';
import { CopyButton } from './CopyButton';

type Props = {
  text: string;
  onGenerate: () => Promise<void>;
  isLoading: boolean;
};

export function Controls({ text, onGenerate, isLoading }: Props) {
  return (
    <div className="flex items-stretch justify-center gap-3 py-8 lg:py-16">
      <Button onClick={onGenerate} disabled={isLoading} className="w-36">
        {isLoading ? <LoadingIndicator className="size-4" /> : 'other memory'}
      </Button>

      <CopyButton text={text} />
    </div>
  );
}
