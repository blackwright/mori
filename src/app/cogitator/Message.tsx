import { type UIMessage } from 'ai';

type Props = {
  data: UIMessage;
};

export function Message({ data: { role, parts } }: Props) {
  if (role === 'user') {
    return (
      <div className="text-3xl text-slate-200">
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
    <div className="text-base text-green-400">
      {parts.map((part, i) => {
        if (part.type === 'text' || part.type === 'reasoning') {
          return (
            <>
              <span key={i}>{part.text}</span>

              {part.state === 'streaming' && (
                <span className="text-xs select-none">█</span>
              )}
            </>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
