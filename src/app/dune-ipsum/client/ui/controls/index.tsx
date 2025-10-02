import { Button } from '@/components';
import { write } from '../../../actions';
import { CopyButton } from './CopyButton';

type Props = {
  text: string;
  onGenerate: (newText: string) => void;
  disabled: boolean;
};

export function Controls({ text, onGenerate, disabled }: Props) {
  const handleGenerate = async () => {
    const newText = await write();
    onGenerate(newText);
  };

  return (
    <div className="flex items-stretch justify-center gap-3 py-8 lg:py-16">
      <Button onClick={handleGenerate} disabled={disabled}>
        other memory
      </Button>

      <CopyButton text={text} />
    </div>
  );
}
