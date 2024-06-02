import { useRef, useState } from 'react';
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
      <svg
        width={12}
        height={12}
        x="0px"
        y="0px"
        viewBox="0 0 24 24"
        fill="#fff"
      >
        <path d={justClickedCopy ? tickedVectorPath : copyVectorPath} />
      </svg>
    </Button>
  );
}

const copyVectorPath = `M13.5,8.5 L6.5,8.5 L6.5,19.5 L13.5,19.5 L13.5,8.5 Z M16,15.5 L17.5,15.5
L17.5,4.5 L10.5,4.5 L10.5,6 L14.5,6 C15.3284271,6 16,6.67157288 16,7.5 L16,15.5 Z M16,20.5
C16,21.3284271 15.3284271,22 14.5,22 L5.5,22 C4.67157288,22 4,21.3284271 4,20.5 L4,7.5 C4,6.67157288
4.67157288,6 5.5,6 L8,6 L8,3.5 C8,2.67157288 8.67157288,2 9.5,2 L18.5,2 C19.3284271,2 20,2.67157288
20,3.5 L20,16.5 C20,17.3284271 19.3284271,18 18.5,18 L16,18 L16,20.5 Z`;

const tickedVectorPath = `M10.1513,16.49025 L6.51715,12.98865 C6.36095,12.8324 6.36095,12.57915
6.51715,12.42295 L7.623,11.31715 C7.7792,11.16095 8.03245,11.16095 8.18865,11.31715 L10.3023,13.29775
L14.891,7.34395 C15.0324,7.17425 15.28465,7.1513 15.45435,7.2927 L16.65605,8.2939 C16.8258,8.43535
16.8487,8.6876 16.7073,8.8573 L10.74145,16.4635 C10.59085,16.6442 10.3176,16.6566 10.1513,16.49025
M12,2 C6.47715,2 2,6.47715 2,12 C2,17.5228 6.47715,22 12,22 C17.52285,22 22,17.5228 22,12 C22,6.47715
17.52285,2 12,2`;
