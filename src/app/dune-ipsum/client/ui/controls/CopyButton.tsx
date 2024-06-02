import { useRef, useState } from 'react';
import { Check, Copy } from 'react-feather';
import { Button } from '@/components';

type Props = {
  text: string;
};

export function CopyButton({ text }: Props) {
  const timeoutIdRef = useRef<number>();

  const [justClickedCopy, setJustClickedCopy] = useState(false);

  const handleCopy = () => {
    const textarea = document.createElement('textarea');
    textarea.value = text;

    textarea.style.position = 'fixed';
    textarea.style.height = '0';
    textarea.style.top = '0';
    textarea.style.left = '0';

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const handleClickCopy = () => {
    window.clearTimeout(timeoutIdRef.current);

    handleCopy();

    setJustClickedCopy(true);

    window.setTimeout(() => {
      setJustClickedCopy(false);
    }, 1_500);
  };

  return (
    <Button onClick={handleClickCopy}>
      {justClickedCopy ? <Check /> : <Copy />}
    </Button>
  );
}
