import { useCallback, useEffect, useMemo, useRef } from 'react';
import Paragraph from './paragraph';

type Props = {
  paragraphs: number;
  minSentences: number;
  maxSentences: number;
  onChange: (text: string) => void;
  children: (onClick: () => void) => React.ReactElement;
};

export function Generator({
  paragraphs,
  minSentences,
  maxSentences,
  onChange,
  children,
}: Props) {
  const initialRenderRef = useRef(true);

  const prevParagraphsRef = useRef(paragraphs);

  const paragraphBuilder = useMemo(
    () => new Paragraph({ min: minSentences, max: maxSentences }),
    [minSentences, maxSentences],
  );

  const generate = useCallback(
    (count: number) => {
      return [...new Array(count)]
        .map(() => paragraphBuilder.build().toString())
        .join('\n\n');
    },
    [paragraphBuilder],
  );

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    if (prevParagraphsRef.current === paragraphs) {
      return;
    }

    onChange(generate(paragraphs));
    prevParagraphsRef.current = paragraphs;
  }, [paragraphs, onChange, generate]);

  const handleClick = () => {
    onChange(generate(paragraphs));
  };

  return children(handleClick);
}
