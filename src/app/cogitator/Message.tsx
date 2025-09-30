import { cn } from '@/utils/cn';
import { interpolateColors } from '@/utils/colors';
import { type UIMessage } from 'ai';
import { Fragment, useEffect, useMemo, useRef } from 'react';
import { zalgoize } from './utils';

type Props = {
  data: UIMessage;
  onEnd: (endingState: 'streaming' | 'done') => void;
};

export function Message({ data: { role, parts }, onEnd }: Props) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    elementRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [parts]);

  if (role === 'user') {
    return (
      <div
        ref={elementRef}
        className="text-lg text-slate-200 uppercase md:text-2xl"
      >
        {parts.map((part, i) => {
          if (part.type === 'text') {
            return <span key={i}>{part.text}</span>;
          }

          return null;
        })}
      </div>
    );
  }

  return (
    <div ref={elementRef}>
      {parts.map((part, i) => {
        if (part.type === 'text') {
          return (
            <Fragment key={i}>
              <ParsedText onEnd={onEnd} state={part.state}>
                {part.text}
              </ParsedText>

              {part.state === 'streaming' && (
                <span className="text-xs select-none">█</span>
              )}
            </Fragment>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

const colorsByLevel = interpolateColors('#34D399', '#DC2626', 10);

function ParsedText({
  children,
  state,
  onEnd,
}: {
  children: string;
  state: 'streaming' | 'done' | undefined;
  onEnd: (endingState: 'streaming' | 'done') => void;
}) {
  const endingStateRef = useRef<'streaming' | 'done' | null>(null);

  const [level, outputText] = useMemo(() => {
    const level = children.charAt(1);

    if (!level) {
      return [undefined, null];
    }

    const levelNumber = Number(level);

    const result = zalgoize(children.replace(/^␁\d+?\s?/g, ''), levelNumber);

    return [levelNumber, result];
  }, [children]);

  const color = useMemo(
    () => (level != null ? colorsByLevel[level] : colorsByLevel[9]),
    [level],
  );

  useEffect(() => {
    if (level && level > 7 && state && endingStateRef.current !== state) {
      onEnd(state);
      endingStateRef.current = state;
    }
  }, [level, state, onEnd]);

  return (
    <span className={cn('font-mono')} style={{ color }}>
      {outputText}
    </span>
  );
}
