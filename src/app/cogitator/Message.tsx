import { cn } from '@/utils/cn';
import { clampNumberRange } from '@/utils/numbers';
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
      <div ref={elementRef} className="text-2xl text-slate-200 uppercase">
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

function getClassNameByLevel(level: number) {
  if (Number.isNaN(level) || level < 3) {
    return 'text-green-400';
  } else if (level < 5) {
    return 'text-yellow-400';
  } else {
    return 'text-red-600';
  }
}

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

  const [className, outputText] = useMemo(() => {
    let result = children.replace(/^␁\d?␄?\s?/g, '');

    const level = children.charAt(1);

    if (!level) {
      return [undefined, null];
    }

    const levelNumber = Number(level);

    const className = getClassNameByLevel(levelNumber);

    if (levelNumber >= 6) {
      const zalgoLevel = clampNumberRange(levelNumber, {
        input: [6, 9],
        output: [1, 5],
      });

      result = zalgoize(result, zalgoLevel);
    }

    return [className, result];
  }, [children]);

  useEffect(() => {
    if (children.includes('␄') && state && endingStateRef.current !== state) {
      onEnd(state);
      endingStateRef.current = state;
    }
  }, [children, state, onEnd]);

  return <span className={cn('font-mono', className)}>{outputText}</span>;
}
